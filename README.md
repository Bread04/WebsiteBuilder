# Beyond Binary

**Career intelligence and empowerment platform for female professionals in Singapore.**

Beyond Binary shifts the power dynamic from employers to talent — surfacing AI-driven workplace safety metrics, enabling anonymous incident reporting, facilitating job sharing, and providing financial clarity so women can make fully informed career decisions.

> Aligned with **UN SDG 5** (Gender Equality) and **UN SDG 8** (Decent Work and Economic Growth).

---

## Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Product Requirements Document](#product-requirements-document)

---

## What It Does

The Singapore labor market creates structural information asymmetry for women — employers know far more about their own culture than candidates ever could before joining. Beyond Binary closes that gap by:

- **Rating every job listing** with an AI-powered Safety and Flexibility score
- **Enabling anonymous reporting** of workplace misconduct with cryptographic privacy guarantees
- **Matching job-share partners** so senior roles become accessible to part-time professionals
- **Translating caregiving experience** into corporate-recognized language for CVs and portfolios
- **Calculating Total Professional Worth** including government subsidies, flexibility value, and gender pay gap context

---

## Features

### Safe-Flex Score System
Every job listing receives two scores (0–100) computed by AI:

| Score | What it measures |
|---|---|
| **Safety Score** | Workplace culture, psychological safety, absence of red flags |
| **Flexibility Score** | Hybrid/remote options, part-time availability, caregiving-friendly policies |

Scores are derived from NLP analysis of job descriptions, aggregated reviews, and verified incident reports. Red flags (e.g., "Maternity leave friction") and green flags (e.g., "4-day week pilot") are surfaced directly on each listing.

---

### Job Board
A curated job marketplace with Safe-Flex scores embedded on every card.

- Search by keyword, company, or role
- Filter by Safety Score, Flexibility Score, industry, location, and salary range
- Job detail view: full description, score breakdown, red/green flag chips, and apply button
- Apply links integrate with company ATS or direct URL

---

### Shield Protocol
A private, zero-knowledge incident reporting system built for women who have experienced workplace misconduct.

**How it works:**
1. Reporter verifies identity via **Singpass** (Singapore national ID) — confirming they are a real person
2. Identity is discarded post-verification; **no PII is stored**
3. Incident details are submitted through **end-to-end encryption**
4. Reports are recorded on an **immutable, append-only ledger**
5. When **3 or more verified reports** target the same manager or department within 90 days, a **collective action** is triggered
6. Collective actions feed back into the company's Safe-Flex Safety Score

Reporters receive an anonymous case ID for follow-up tracking. The platform cannot link a report to its author.

---

### Flex-Match
A job-sharing platform that pairs two professionals with complementary skills to jointly fill a single senior role.

- Create a profile with skills, availability, timezone, and caregiving context
- AI matching ranks partners by complementary skill coverage and schedule compatibility
- Schedule coordination view highlights handover windows and coverage gaps
- Joint application package exported as PDF for employer submission
- In-platform messaging between matched partners

---

### Amplify Portfolio
An AI-powered career narrative tool for women returning from caregiving breaks or non-traditional career paths.

**Example transformations:**

| Raw input | Transformed output |
|---|---|
| "Raised two children" | "Managed multi-stakeholder household operations and long-range developmental planning for two individuals" |
| "Volunteered at school" | "Led community engagement initiatives and coordinated cross-functional teams of 15+" |

Features:
- Dual-view toggle: **Candidate perspective** (authentic voice) vs. **Recruiter perspective** (corporate language)
- Auto-extracted skills tags (editable)
- Export as PDF or copy to clipboard
- Interview request tracker tied to each portfolio version

---

### Lumina Benefits Wallet
A financial visualization tool that computes **Total Professional Worth** — not just base salary.

**Inputs (interactive sliders):**
- Base salary
- Flexibility percentage
- Employment type

**Calculated outputs:**
- Working Mother Subsidy (S$7,200/year, Singapore government-sourced)
- GPMB Cap adjustment
- Unpaid labor value recovery (based on flexibility %)
- **Total Professional Worth** = base + subsidies + recovered value
- ROI % vs. market male rate
- Gender pay gap visualization against median male equivalent role

Supports saving and comparing up to 3 job offer scenarios side by side.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18.3 + TypeScript |
| **Build tool** | Vite 6.3 with SWC compiler |
| **Styling** | Tailwind CSS 4.1 with custom theme |
| **Component library** | Radix UI (accessible primitives) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Forms** | React Hook Form |
| **Routing** | React Router |
| **Notifications** | Sonner (toasts), Vaul (drawers) |
| **API layer** | Hono on Supabase Edge Functions |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth + Singpass OAuth |
| **AI** | Claude API (Anthropic) |
| **Storage** | Supabase Storage |

---

## Project Structure

```
WebsiteBuilder/
├── src/
│   ├── components/        # Reusable UI components (Radix-based)
│   ├── pages/             # Route-level page components
│   │   ├── JobBoard/      # Job listing + detail views
│   │   ├── ShieldProtocol/# Incident reporting flow
│   │   ├── FlexMatch/     # Partner matching UI
│   │   ├── Amplify/       # Portfolio transformation tool
│   │   └── Wallet/        # Lumina Benefits Wallet
│   ├── lib/               # Utilities, API clients, helpers
│   └── main.tsx           # App entry point
├── supabase/
│   └── functions/         # Hono edge function handlers
├── public/                # Static assets
├── PRD.md                 # Full product requirements document
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

> Never commit `.env.local` to version control.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│               React Frontend                │
│  (Vite + TypeScript + Tailwind + Radix UI)  │
└────────────────────┬────────────────────────┘
                     │ HTTPS
┌────────────────────▼────────────────────────┐
│         Supabase Edge Functions             │
│              (Hono framework)               │
│  /jobs  /reports  /match  /transform  /wallet│
└──────┬─────────────────────────┬────────────┘
       │                         │
┌──────▼──────┐         ┌────────▼────────┐
│  Supabase   │         │   Claude API    │
│ PostgreSQL  │         │  (Anthropic)    │
│  + Auth     │         │  Safe-Flex AI   │
│  + Storage  │         │  Amplify AI     │
└─────────────┘         │  Flex-Match AI  │
                        └─────────────────┘
```

**Data flow for Safe-Flex scoring:**
1. Job listing ingested (ATS partner or manual)
2. Claude API runs NLP analysis on job description
3. Shield Protocol incident feed checked for company/department
4. Combined score computed and stored in Supabase
5. Score served to frontend on job card and detail views
6. Score invalidated and recomputed within 24h of new verified reports

**Shield Protocol privacy flow:**
1. User authenticates with Singpass → identity verified
2. Singpass session discarded; anonymous session token issued
3. Incident submitted encrypted end-to-end
4. Encrypted record stored in immutable ledger
5. Collective action engine queries aggregated (non-identifying) metadata only

---

## Product Requirements Document

The full PRD is available in [`PRD.md`](./PRD.md). Summary below.

### Target Users

| Segment | Primary Pain Point |
|---|---|
| Active job seekers | Can't assess workplace culture before joining |
| Career returners | Resume gaps stigmatized; caregiving experience undervalued |
| Job sharers | Senior roles incompatible with caregiving schedules |
| Incident reporters | Fear of retaliation prevents reporting misconduct |

### Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page load (LCP) | < 2.5s on 4G mobile |
| API response (p95) | < 500ms |
| Score update latency | < 24h after triggering event |
| AI transformation latency | < 3s |
| Uptime | 99.5% monthly |
| Accessibility | WCAG 2.1 AA |
| Security | OWASP Top 10 mitigated |
| Privacy | Singapore PDPA compliant |

### Roadmap

| Milestone | Scope | Target |
|---|---|---|
| M1 — Auth & Data Foundation | Supabase auth, real job data pipeline, user profiles | Q2 2026 |
| M2 — Live Safe-Flex Scoring | AI scoring pipeline on real listings | Q3 2026 |
| M3 — Shield Protocol v1 | Encrypted reporting, Singpass, collective action | Q3 2026 |
| M4 — Amplify + Wallet | Live AI transformation, real MOM subsidy data | Q4 2026 |
| M5 — Flex-Match MVP | AI matching, schedule coordination, messaging | Q4 2026 |
| M6 — Public Launch | All features live, analytics, performance tuning | Q1 2027 |

### Success Metrics (6 months post-launch)

| Metric | Target |
|---|---|
| Registered users | 5,000 |
| Weekly job browsing sessions | 20,000 |
| Shield Protocol reports | 500 |
| Flex-Match pairs created | 200 |
| Amplify portfolios generated | 1,000 |
| D30 retention | ≥ 35% |

---

## Contributing

This is a private repository. To propose changes, open an issue or submit a pull request against the `main` branch. All PRs require review before merge.

---

## License

Private and confidential. All rights reserved.
