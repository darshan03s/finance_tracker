# Finance Dashboard

A clean, interactive finance dashboard built using Next.js, TypeScript, Zustand, and TailwindCSS. This project focuses on intuitive UI design, structured state management, and meaningful financial insights.

**Live:** https://finance-tracker.darshans.site

## Features

- Balance tracking with real-time updates
- Income and expense summary (daily & monthly toggle)
- Add transactions (user), edit and delete transactions (admin)
- Search transactions (fuzzy search)
- Filter by type and category
- Income vs Expense trend chart (monthly & daily)
- Category-wise breakdown chart
- Insights:
  - Highest expense category
  - Largest expense
  - Monthly comparison

- Role-based UI:
  - User (view only)
  - Admin (manage transactions)

- Data management:
  - Export JSON
  - Import JSON
  - Reset data
  - Mock data toggle

- Dark / Light mode
- Responsive UI

---

## Implementation

- State managed using Zustand with persistence
- Transactions act as the single source of truth
- Balance updates derived from transaction changes
- Analytics (charts, insights) computed using utility functions
- Component-based architecture:
  - UI → components
  - Logic → lib
  - State → stores

- Fuzzy search implemented using Fuse.js
- Role-based behavior handled via global store
- Charts built using Recharts
- Form validation handled locally in components

---

## Tech Stack

- Next.js 16
- TypeScript
- Zustand
- TailwindCSS
- Radix UI
- Recharts
- Fuse.js

---

## Setup

### Clone repository

```bash
git clone https://github.com/darshan03s/finance_tracker.git

cd finance_tracker
```

### Install dependencies

```bash
pnpm install
```

Installs all required packages.

### Run development server

```bash
pnpm dev
```

Starts the app locally.

### Build for production

```bash
pnpm build
```

Creates optimized build.

### Start production server

```bash
pnpm start
```

Runs the production build.
