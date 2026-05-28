# FoodStock Pro — Food Inventory Management Dashboard

A modern, enterprise-grade Food Stock & Inventory Management Admin Dashboard built with **React 18**, **Bootstrap 5**, and **Recharts**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

---

## 📦 Tech Stack

| Layer         | Technology                     |
|---------------|-------------------------------|
| UI Framework  | React 18                       |
| Styling       | Bootstrap 5 + Custom CSS       |
| Charts        | Recharts 2                     |
| Routing       | React Router v6                |
| Icons         | React Icons (Material Design)  |
| Fonts         | Inter (Google Fonts)           |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # Collapsible navigation sidebar
│   │   ├── Header.jsx        # Top bar with search & user menu
│   │   └── Layout.jsx        # App shell wrapper
│   └── common/
│       ├── KPICard.jsx       # Metric summary card
│       ├── DataTable.jsx     # Sortable, paginated table
│       ├── StatusBadge.jsx   # Color-coded status indicator
│       └── Modal.jsx         # Reusable dialog component
├── pages/
│   ├── Dashboard.jsx         # Overview with KPIs and charts
│   ├── Inventory.jsx         # Full inventory management
│   ├── PurchaseOrders.jsx    # PO tracking and creation
│   ├── Suppliers.jsx         # Supplier directory
│   ├── Wastage.jsx           # Wastage log and analytics
│   ├── Reports.jsx           # Report generator
│   └── Settings.jsx          # System configuration
├── data/
│   └── mockData.js           # Seed data & utility functions
└── styles/
    └── custom.css            # Design system (CSS variables + theme)
```

---

## 🎨 Design Theme

**Pure White + Indigo Blue**

| Token            | Value     |
|------------------|-----------|
| Primary          | `#4F46E5` |
| Sidebar BG       | `#1E1B4B` |
| Background       | `#F1F5F9` |
| Success          | `#10B981` |
| Warning          | `#F59E0B` |
| Danger           | `#EF4444` |

---

## ✅ Features

- **Dashboard** — KPI cards, stock trend line chart, category donut, top items bar chart, low-stock alerts, expiry warnings, live activity feed
- **Inventory** — Full CRUD, stock-level bars, expiry tracking, category & status filters, sortable paginated table
- **Purchase Orders** — Order creation, pipeline status tracker, supplier value chart, payment status
- **Suppliers** — Star ratings, contact directory, full CRUD, performance metrics
- **Wastage Log** — Reason-based logging, category analytics, monthly trend charts, cost impact tracking
- **Reports** — Report card grid, quick-insight charts
- **Settings** — Business config, notification toggles, security, inventory defaults
- **Sidebar** — Collapsible with icons, mobile drawer mode
- **Responsive** — Mobile-first design, works on all screen sizes
