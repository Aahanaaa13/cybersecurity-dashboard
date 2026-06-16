"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CVE } from "../lib/nvdApi";

interface ScoreChartProps {
  cves: CVE[];
}

export default function ScoreChart({ cves }: ScoreChartProps) {
  const ranges = [
    { name: "0-2", min: 0, max: 2, color: "#22c55e" },
    { name: "3-4", min: 3, max: 4, color: "#84cc16" },
    { name: "5-6", min: 5, max: 6, color: "#eab308" },
    { name: "7-8", min: 7, max: 8, color: "#f97316" },
    { name: "9-10", min: 9, max: 10, color: "#ef4444" },
  ];

  const data = ranges.map((range) => ({
    name: range.name,
    count: cves.filter(
      (c) => c.cvssScore >= range.min && c.cvssScore <= range.max
    ).length,
    color: range.color,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <XAxis
          dataKey="name"
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          axisLine={{ stroke: "#374151" }}
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          axisLine={{ stroke: "#374151" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "white",
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}