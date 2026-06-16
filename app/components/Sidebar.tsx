"use client";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/", icon: "🏠" },
  { label: "Threats", href: "/threats", icon: "⚠️" },
  { label: "Search CVEs", href: "/search", icon: "🔍" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button — only shows on small screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 border border-gray-700 rounded-lg md:hidden"
      >
        <div className="w-5 h-0.5 bg-white mb-1"></div>
        <div className="w-5 h-0.5 bg-white mb-1"></div>
        <div className="w-5 h-0.5 bg-white"></div>
      </button>

      {/* Dark overlay — shows behind sidebar on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={
          "fixed top-0 left-0 h-full w-64 z-50 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 " +
          (isOpen ? "translate-x-0" : "-translate-x-full") +
          " md:translate-x-0 md:static md:flex"
        }
      >
        {/* Logo + Close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white text-sm font-bold">
              CW
            </div>
            <div>
              <p className="font-bold text-white text-sm">CyberWatch</p>
              <p className="text-xs text-gray-400">Threat Intelligence</p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Live indicator */}
        <div className="mx-4 mt-4 p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 font-medium">
              Live Feed Active
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 mt-2">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 px-2">
            Navigation
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            Data from NVD / NIST
          </p>
        </div>
      </aside>
    </>
  );
}