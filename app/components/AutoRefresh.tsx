"use client";
import { useState, useEffect } from "react";

interface AutoRefreshProps {
  onRefresh: () => void;
  intervalSeconds: number;
}

export default function AutoRefresh({ onRefresh, intervalSeconds }: AutoRefreshProps) {
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onRefresh();
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEnabled, intervalSeconds, onRefresh]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-2 text-gray-400">
        <span>Auto-refresh:</span>
        <span className="text-white font-mono">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>

      <button
        onClick={() => {
          onRefresh();
          setSecondsLeft(intervalSeconds);
        }}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
      >
        Refresh Now
      </button>

      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={
          "px-3 py-1 rounded-lg text-xs " +
          (isEnabled
            ? "bg-green-900/30 text-green-400 border border-green-500/30"
            : "bg-gray-800 text-gray-400 border border-gray-600")
        }
      >
        {isEnabled ? "Auto ON" : "Auto OFF"}
      </button>
    </div>
  );
}