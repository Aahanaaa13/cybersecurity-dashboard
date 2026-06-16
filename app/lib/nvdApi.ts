export interface CVE {
  id: string;
  description: string;
  severity: string;
  cvssScore: number;
  publishedDate: string;
}

export interface CVEFilters {
  keyword?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export async function fetchCVEs(filters: CVEFilters = {}): Promise<CVE[]> {
  try {
    const params = new URLSearchParams();
    params.append("resultsPerPage", "20");

    // If category is selected, use it as keyword
    // If both keyword and category exist, combine them
    const searchTerm = [filters.keyword, filters.category]
      .filter(Boolean)
      .join(" ");

    if (searchTerm) {
      params.append("keywordSearch", searchTerm);
    }
    if (filters.severity) {
      params.append("cvssV3Severity", filters.severity);
    }
    if (filters.startDate) {
      params.append("pubStartDate", filters.startDate + "T00:00:00.000");
    }
    if (filters.endDate) {
      params.append("pubEndDate", filters.endDate + "T23:59:59.000");
    }

    const response = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?${params.toString()}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    return data.vulnerabilities.map((item: any) => {
      const cve = item.cve;
      const metrics =
        cve.metrics?.cvssMetricV31?.[0] ||
        cve.metrics?.cvssMetricV2?.[0];

      const description =
        cve.descriptions?.find((d: any) => d.lang === "en")?.value ||
        "No description available";

      const severity = metrics?.cvssData?.baseSeverity || "UNKNOWN";
      const cvssScore = metrics?.cvssData?.baseScore || 0;

      return {
        id: cve.id,
        description,
        severity,
        cvssScore,
        publishedDate: cve.published,
      };
    });
  } catch (error) {
    console.error("Failed to fetch CVEs:", error);
    return [];
  }
}

export function calculateStats(cves: CVE[]) {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  return {
    total: cves.length,
    critical: cves.filter((c) => c.severity === "CRITICAL").length,
    high: cves.filter((c) => c.severity === "HIGH").length,
    medium: cves.filter((c) => c.severity === "MEDIUM").length,
    low: cves.filter((c) => c.severity === "LOW").length,
    recentCount: cves.filter(
      (c) => new Date(c.publishedDate) > sevenDaysAgo
    ).length,
  };
}