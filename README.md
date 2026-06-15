# cybersecurity-dashboard
# 🛡️ CyberWatch — Real-time Cybersecurity Threat Dashboard

A modern cybersecurity monitoring dashboard built with Next.js that provides real-time vulnerability intelligence.

## 🚀 Features

- Real-time CVE data from NVD/NIST API
- Severity distribution charts
- CVSS score visualization
- Search by CVE ID or keyword
- Filter by severity, category, and date range
- Auto-refresh every 5 minutes
- Responsive design for all screen sizes

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **API:** NVD CVE API (NIST)

## 📦 Installation

1. Clone the repository:
   git clone https://github.com/YOURUSERNAME/cybersecurity-dashboard.git

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open http://localhost:3000

## 📁 Project Structure

src/
├── app/
│   ├── components/
│   │   ├── AutoRefresh.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── FilterBar.tsx
│   │   ├── ScoreChart.tsx
│   │   ├── SeverityChart.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   └── ThreatFeed.tsx
│   ├── lib/
│   │   └── nvdApi.ts
│   ├── types/
│   │   └── index.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx

## 🔌 API Reference

Data is sourced from the National Vulnerability Database (NVD):
https://services.nvd.nist.gov/rest/json/cves/2.0

## 📄 License

MIT License
