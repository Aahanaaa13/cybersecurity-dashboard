"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchCVEs, calculateStats, CVE, CVEFilters } from "./lib/nvdApi";
import DashboardLayout from "./components/DashboardLayout";
import StatCard from "./components/StatCard";
import ThreatFeed from "./components/ThreatFeed";
import FilterBar from "./components/FilterBar";
import SeverityChart from "./components/SeverityChart";
import ScoreChart from "./components/ScoreChart";
import AutoRefresh from "./components/AutoRefresh";

export default function Home() {
  const [cves, setCves] = useState<CVE[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<CVEFilters>({});

  const loadCVEs = useCallback(async (filters: CVEFilters) => {
    setIsLoading(true);
    const data = await fetchCVEs(filters);
    setCves(data);
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadCVEs({});
  }, [loadCVEs]);

  function handleFilter(filters: CVEFilters) {
    setActiveFilters(filters);
    loadCVEs(filters);
  }

  function handleRefresh() {
    loadCVEs(activeFilters);
  }

  const stats = calculateStats(cves);

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Threat Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              {lastUpdated
                ? "Last updated: " + lastUpdated.toLocaleTimeString()
                : "Loading data..."}
            </p>
          </div>
          <AutoRefresh onRefresh={handleRefresh} intervalSeconds={300} />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total CVEs" value={stats.total} color="blue" icon="🔍" />
          <StatCard title="Critical" value={stats.critical} color="red" icon="🚨" />
          <StatCard title="High" value={stats.high} color="orange" icon="⚠️" />
          <StatCard title="This Week" value={stats.recentCount} color="yellow" icon="📅" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-white mb-1">
              Severity Distribution
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              Breakdown by severity level
            </p>
            <SeverityChart cves={cves} />
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-white mb-1">
              CVSS Score Distribution
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              Number of CVEs per score range
            </p>
            <ScoreChart cves={cves} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar onFilter={handleFilter} isLoading={isLoading} />
        </div>

        {/* Threat Feed */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Live Threat Feed
            </h2>
            <span className="text-xs text-gray-400">
              Showing {cves.length} results
            </span>
          </div>
          <ThreatFeed cves={cves} isLoading={isLoading} />
        </div>

      </div>
    </DashboardLayout>
  );
}