import { CVE } from "../lib/nvdApi";

interface ThreatFeedProps {
  cves: CVE[];
  isLoading: boolean;
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    CRITICAL: "bg-red-500 text-white",
    HIGH: "bg-orange-500 text-white",
    MEDIUM: "bg-yellow-500 text-black",
    LOW: "bg-green-500 text-white",
    UNKNOWN: "bg-gray-500 text-white",
  };

  const color = colors[severity] || colors.UNKNOWN;

  return (
    <span className={"px-2 py-1 rounded text-xs font-bold " + color}>
      {severity}
    </span>
  );
}

export default function ThreatFeed({ cves, isLoading }: ThreatFeedProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Fetching live threat data...</p>
      </div>
    );
  }

  if (cves.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400">No vulnerabilities found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="pb-3 pr-4">CVE ID</th>
            <th className="pb-3 pr-4">Description</th>
            <th className="pb-3 pr-4">Severity</th>
            <th className="pb-3 pr-4">Score</th>
            <th className="pb-3">Published</th>
          </tr>
        </thead>
        <tbody>
          {cves.map((cve) => (
            <tr
              key={cve.id}
              className="border-b border-gray-800 hover:bg-gray-800/40"
            >
              <td className="py-3 pr-4 font-mono text-blue-400 text-xs whitespace-nowrap">
                {cve.id}
              </td>
              <td className="py-3 pr-4 text-gray-300 max-w-xs">
                <p className="line-clamp-2 text-xs">{cve.description}</p>
              </td>
              <td className="py-3 pr-4">
                <SeverityBadge severity={cve.severity} />
              </td>
              <td className="py-3 pr-4 text-white font-bold">
                {cve.cvssScore}
              </td>
              <td className="py-3 text-gray-400 text-xs whitespace-nowrap">
                {new Date(cve.publishedDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}