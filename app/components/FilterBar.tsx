"use client";
import { useState } from "react";
import { CVEFilters } from "../lib/nvdApi";

interface FilterBarProps {
  onFilter: (filters: CVEFilters) => void;
  isLoading: boolean;
}

export default function FilterBar({ onFilter, isLoading }: FilterBarProps) {
  const [keyword, setKeyword] = useState("");
  const [severity, setSeverity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  function handleApply() {
    onFilter({ keyword, severity, startDate, endDate, category });
  }

  function handleReset() {
    setKeyword("");
    setSeverity("");
    setStartDate("");
    setEndDate("");
    setCategory("");
    onFilter({});
  }

  return (
    <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        Search & Filters
      </p>
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search CVE ID or keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-48 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />

        {/* Severity */}
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="buffer overflow">Buffer Overflow</option>
          <option value="sql injection">SQL Injection</option>
          <option value="cross-site scripting">Cross-Site Scripting</option>
          <option value="denial of service">Denial of Service</option>
          <option value="remote code execution">Remote Code Execution</option>
          <option value="privilege escalation">Privilege Escalation</option>
          <option value="memory corruption">Memory Corruption</option>
          <option value="authentication">Authentication</option>
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />

        {/* End Date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />

        {/* Buttons */}
        <button
          onClick={handleApply}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          {isLoading ? "Loading..." : "Apply Filters"}
        </button>

        <button
          onClick={handleReset}
          disabled={isLoading}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}