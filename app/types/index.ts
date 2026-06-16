export interface CVE {
  id: string;
  description: string;
  severity: SeverityLevel;
  cvssScore: number;
  publishedDate: string;
  lastModified: string;
}

export type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";

export interface CVEFilters {
  keyword: string;
  severity: string;
  startDate: string;
  endDate: string;
}

export interface DashboardStats {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  recentCount: number;
}