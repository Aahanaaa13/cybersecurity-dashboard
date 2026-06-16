
# 🛡️ CyberWatch — Real-time Cybersecurity Threat Dashboard

A modern cybersecurity monitoring dashboard that provides real-time vulnerability intelligence using live CVE data.

## 🌐 Live Dashboard
Built and running at `localhost:3000` using Next.js 14

## 🎯 Project Overview
This dashboard was built as part of Phase 1 of the Ultimez Technology cybersecurity project. It fetches real-time CVE (Common Vulnerabilities and Exposures) data from the NVD/NIST public API and displays it in an interactive, filterable dashboard.

## ✨ Features
- 🔴 Real-time CVE data from NVD/NIST API
- 📊 Severity distribution pie chart
- 📊 CVSS score bar chart
- 🔍 Search by CVE ID or keyword
- 🔽 Filter by severity (Critical/High/Medium/Low)
- 🗂️ Filter by category (SQL Injection, Buffer Overflow, etc.)
- 📅 Filter by date range
- 🔄 Auto-refresh every 5 minutes
- 📱 Fully responsive (desktop, tablet, mobile)
- 🌙 Dark theme UI

## 🛠️ Tech Stack
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **API:** NVD CVE API (NIST)

## 📦 Installation & Setup

### 1. Clone the repository
```
git clone https://github.com/Aahanaaa13/cybersecurity-dashboard.git
```

### 2. Navigate to project folder
```
cd cybersecurity-dashboard
```

### 3. Install dependencies
```
npm install
```

### 4. Run the development server
```
npm run dev
```

### 5. Open in browser
```
http://localhost:3000
```

## 📁 Project Structure
```
app/
├── components/
│   ├── AutoRefresh.tsx      # Auto-refresh timer component
│   ├── DashboardLayout.tsx  # Main layout wrapper
│   ├── FilterBar.tsx        # Search and filter controls
│   ├── ScoreChart.tsx       # CVSS score bar chart
│   ├── SeverityChart.tsx    # Severity pie chart
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── StatCard.tsx         # Summary stat cards
│   └── ThreatFeed.tsx       # CVE data table
├── lib/
│   └── nvdApi.ts            # NVD API service layer
├── types/
│   └── index.ts             # TypeScript type definitions
├── globals.css              # Global styles
├── layout.tsx               # Root layout
└── page.tsx                 # Main dashboard page
```

## 🔌 API Reference
Data is sourced from the National Vulnerability Database:
- **Base URL:** `https://services.nvd.nist.gov/rest/json/cves/2.0`
- **Auth:** No API key required (public API)
- **Rate Limit:** 5 requests per 30 seconds

## 📊 Dashboard Sections
| Section | Description |
|---|---|
| Stat Cards | Total CVEs, Critical, High, This Week counts |
| Severity Chart | Pie chart showing severity distribution |
| Score Chart | Bar chart showing CVSS score ranges |
| Filter Bar | Search and filter controls |
| Threat Feed | Live table of CVE vulnerabilities |

## 👩‍💻 Developer
**Aahana Mittal**
GitHub: [@Aahanaaa13](https://github.com/Aahanaaa13)

## 📄 License
MIT License
