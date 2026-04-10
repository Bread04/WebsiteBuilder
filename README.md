# Beyond Binary

**Career intelligence and empowerment platform for female professionals in Singapore.**

Beyond Binary shifts the power dynamic from employers to talent — surfacing AI-driven workplace safety metrics, enabling anonymous incident reporting, facilitating job sharing, and providing financial clarity so women can make fully informed career decisions.

> Aligned with **UN SDG 5** (Gender Equality) and **UN SDG 8** (Decent Work and Economic Growth).

---

## Table of Contents

- [Vision & Mission](#vision--mission)
- [What It Does](#what-it-does)
- [Target Users](#target-users)
- [Features](#features)
  - [Safe-Flex Score System](#safe-flex-score-system)
  - [Job Board](#job-board)
  - [Shield Protocol](#shield-protocol)
  - [Flex-Match](#flex-match)
  - [Amplify Portfolio](#amplify-portfolio)
  - [Lumina Benefits Wallet](#lumina-benefits-wallet)
- [Authentication & User Accounts](#authentication--user-accounts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Backend & Data](#backend--data)
- [Non-Functional Requirements](#non-functional-requirements)
- [Out of Scope (v1.0)](#out-of-scope-v10)
- [Roadmap](#roadmap)
- [Success Metrics](#success-metrics)
- [Open Questions](#open-questions)
- [Contributing](#contributing)
- [License](#license)

---

## Vision & Mission

### Vision

Beyond Binary is a career intelligence and empowerment platform built for female professionals in Singapore. It shifts the power dynamic from employers to talent by surfacing data-driven workplace safety metrics, anonymous incident reporting, job-sharing opportunities, and financial clarity tools — all in one cohesive experience.

### Mission

To eliminate information asymmetry in the labor market for women by providing the data, tools, and community infrastructure they need to make informed career decisions and hold employers accountable.

### Strategic Alignment

- **SDG 5** — Gender Equality
- **SDG 8** — Decent Work and Economic Growth

---

## What It Does

The Singapore labor market creates structural information asymmetry for women — employers know far more about their own culture than candidates ever could before joining. Beyond Binary closes that gap by:

- **Rating every job listing** with an AI-powered Safety and Flexibility score
- **Enabling anonymous reporting** of workplace misconduct with cryptographic privacy guarantees
- **Matching job-share partners** so senior roles become accessible to part-time professionals
- **Translating caregiving experience** into corporate-recognized language for CVs and portfolios
- **Calculating Total Professional Worth** including government subsidies, flexibility value, and gender pay gap context

---

## Target Users

| Segment | Description | Primary Pain Point |
|---|---|---|
| Active Job Seekers | Women actively searching for new roles | Can't assess workplace culture before joining |
| Career Returners | Women re-entering the workforce after caregiving gaps | Resume gaps stigmatized; undervalued experience |
| Job Sharers | Professionals seeking reduced-hours senior roles | Senior positions incompatible with caregiving |
| Incident Reporters | Women who have experienced workplace misconduct | Fear of retaliation prevents reporting |
| Employers (future) | Companies seeking to improve gender equity scores | No objective benchmark for culture improvement |

---

## Features

### Safe-Flex Score System

**What it does:** Assigns every job listing two AI-derived scores — a Safety Score (workplace culture, psychological safety) and a Flexibility Score (work-life balance, hybrid/remote arrangements).

**User Story:** As a job seeker, I want to see a workplace safety and flexibility rating on every job card so I can filter out toxic environments before applying.

Every job listing receives two scores (0–100) computed by AI:

| Score | What it measures |
|---|---|
| **Safety Score** | Workplace culture, psychological safety, absence of red flags |
| **Flexibility Score** | Hybrid/remote options, part-time availability, caregiving-friendly policies |

**Requirements:**
- Safety Score (0–100) and Flexibility Score (0–100) displayed on all job cards
- Score breakdown page showing contributing factors (red flags, green flags)
- Scoring methodology powered by NLP analysis of job descriptions, Glassdoor-equivalent reviews, and reported incidents
- Red flags: e.g., "Maternity leave friction," "No hybrid options"
- Green flags: e.g., "Mentorship for women," "4-day week pilot"
- Score recalculates when new Shield Protocol reports are filed against a company

**Acceptance Criteria:**
- [ ] Scores visible on job card list view and job detail view
- [ ] Score breakdown accessible from job detail
- [ ] Scores update within 24h of new verified incident reports

---

### Job Board

**What it does:** A curated job marketplace with Safe-Flex scores embedded on every listing.

**User Story:** As a job seeker, I want to search and filter jobs by safety score, flexibility score, role type, and industry so I can find opportunities that fit my values and needs.

**Requirements:**
- Search by keyword, company, role type
- Filter by Safety Score threshold, Flexibility Score threshold, industry, location, salary range
- Job cards show: title, company, location, salary range, Safe-Flex scores, posted date
- Job detail page shows: full description, score breakdown, red/green flags, apply button
- "Apply" integrates with company ATS or external link

**Acceptance Criteria:**
- [ ] Search returns results within 500ms
- [ ] Filters can be combined and persisted across sessions
- [ ] Job detail renders red/green flag chips
- [ ] Apply CTA tracks click events for analytics

---

### Shield Protocol

**What it does:** A private, zero-knowledge incident reporting system built for women who have experienced workplace misconduct — and triggers collective action when multiple reports converge on the same actor.

**User Story:** As a user who experienced harassment at work, I want to file a confidential report that can contribute to collective action against repeat offenders, without my identity being exposed.

**How it works:**
1. Reporter verifies identity via **Singpass** (Singapore national ID) — confirming they are a real person
2. Identity is discarded post-verification; **no PII is stored**
3. Incident details are submitted through **end-to-end encryption**
4. Reports are recorded on an **immutable, append-only ledger**
5. When **3 or more verified reports** target the same manager or department within 90 days, a **collective action** is triggered
6. Collective actions feed back into the company's Safe-Flex Safety Score

Reporters receive an anonymous case ID for follow-up tracking. The platform cannot link a report to its author.

**Requirements:**
- Singpass-verified anonymous identity (Singapore national ID confirmation, no stored PII)
- Zero-knowledge proof encryption so the platform cannot identify the reporter
- Reports captured: company, department, manager/actor (optional), incident category, description, date
- Collective action trigger: ≥3 verified reports on the same manager or department within 90 days
- Collective action surfaces on the company's Safe-Flex score
- Immutable incident ledger (append-only, cryptographically sealed)
- Dashboard showing: total reports filed, collective actions triggered, companies flagged
- Reporter receives anonymous case ID for follow-up

**Acceptance Criteria:**
- [ ] No PII stored post-verification
- [ ] Report submission is end-to-end encrypted
- [ ] Collective action threshold logic is tested and auditable
- [ ] Reporter dashboard allows status tracking by case ID only
- [ ] Flagged companies see Safe-Flex Safety Score reduced accordingly

---

### Flex-Match

**What it does:** A job-sharing matching platform that pairs two professionals with complementary skills so they can jointly fill a single senior role, enabling access to high-responsibility positions on a part-time basis.

**User Story:** As a senior professional with caregiving responsibilities, I want to find a job-share partner so I can apply for senior roles that would otherwise be incompatible with my schedule.

**Requirements:**
- Profile creation: skills, experience level, availability (days/hours), timezone, caregiving context (optional)
- AI matching algorithm: complementary skills weighting, schedule compatibility, timezone overlap
- Partner discovery: browse suggested matches with compatibility score
- Schedule coordination tools: handover notes, shared calendar view
- Employer-facing view: joint application package for both partners
- Messaging between matched partners

**Acceptance Criteria:**
- [ ] Profile creation takes <5 minutes
- [ ] Matching returns top 5 candidates ranked by compatibility score
- [ ] Schedule view highlights overlaps and gaps
- [ ] Joint application package exportable as PDF

---

### Amplify Portfolio

**What it does:** An AI-powered career narrative tool that transforms caregiving gaps and non-traditional experience into corporate-valued language for CVs and LinkedIn profiles.

**User Story:** As a career returner, I want to convert my caregiving experience into professional language so I can present a competitive resume without hiding the gap.

**Example transformations:**

| Raw input | Transformed output |
|---|---|
| "Raised two children" | "Managed multi-stakeholder household operations and long-range developmental planning for two individuals" |
| "Volunteered at school" | "Led community engagement initiatives and coordinated cross-functional teams of 15+" |

**Requirements:**
- Input: raw experience entries (free text or structured: role, duration, activities)
- AI transformation: maps caregiving activities to transferable skills and corporate-recognized language
- Dual view: Candidate perspective (authentic) / Recruiter perspective (translated)
- Skills extraction: auto-identify skills from transformed experience
- Export: download as PDF or copy to clipboard
- Interview request tracker: log inbound interest tied to portfolio version

**Acceptance Criteria:**
- [ ] Transformation API returns result within 3 seconds
- [ ] Dual-view toggle renders both perspectives without layout shift
- [ ] Exported PDF matches on-screen layout
- [ ] Skills tags are editable by the user

---

### Lumina Benefits Wallet

**What it does:** A financial visualization tool that calculates a user's Total Professional Worth — combining base salary, government subsidies, flexibility-derived value recovery, and gender pay gap context.

**User Story:** As a professional evaluating a job offer, I want to see the full financial picture including subsidies and flexibility value so I can compare offers accurately.

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

**Requirements:**
- Inputs: base salary (slider), flexibility percentage (slider), employment type
- Market male rate sourced from MOM Singapore data (updated quarterly)
- Gender pay parity comparison: highlight gap vs. median male equivalent role
- Save and compare multiple job offer scenarios

**Acceptance Criteria:**
- [ ] All calculations update in real time as sliders move
- [ ] Government subsidy values sourced from live MOM API or quarterly-refreshed static data
- [ ] Scenario comparison supports up to 3 saved offers
- [ ] Pay gap visualization uses accessible color contrast ratios

---

## Authentication & User Accounts

**Current state:** No authentication system exists. All data is demo/hardcoded.

**Requirements:**
- Email/password signup and login
- Singpass OAuth integration (for Singapore residents — required for Shield Protocol)
- Session persistence via Supabase Auth
- Profile: name, role, industry, skills, caregiving status (optional), notification preferences
- Data isolation: each user's reports, portfolio, wallet scenarios are private by default

**Acceptance Criteria:**
- [ ] Signup flow completable in under 2 minutes
- [ ] Singpass OAuth available as alternative login
- [ ] All user-generated data scoped to authenticated user ID
- [ ] Password reset via email

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

## Backend & Data

### Data Sources

| Data | Source | Refresh Cadence |
|---|---|---|
| Job listings | Partner ATSs + manual curation | Real-time / daily sync |
| Safe-Flex scores | AI analysis + incident feed | On-demand + nightly batch |
| Singapore subsidies | MOM Singapore API | Quarterly |
| Gender pay gap market rate | MOM Singapore / Comprehensive Labour Force Survey | Quarterly |
| Incident reports | User submissions (encrypted) | Real-time |

### Privacy & Compliance

- Shield Protocol reports: zero-knowledge encryption, no PII stored post-verification
- Personal data handling compliant with Singapore **PDPA** (Personal Data Protection Act)
- Data retention policy: user data deleted within 30 days of account deletion request
- All API endpoints require authenticated session (except public job board read)

---

## Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page load (LCP) | < 2.5s on 4G mobile |
| API response time (p95) | < 500ms |
| Safe-Flex score update latency | < 24h after triggering event |
| Amplify transformation latency | < 3s |
| Uptime | 99.5% monthly |
| Accessibility | WCAG 2.1 AA |
| Mobile responsiveness | iOS Safari 15+, Android Chrome 100+ |
| Security | OWASP Top 10 mitigated; annual penetration test |
| Privacy | Singapore PDPA compliant |

---

## Out of Scope (v1.0)

The following are explicitly deferred and will not ship in the initial version:

- Employer-facing dashboard (company profile management, score improvement tools)
- Direct messaging between users (outside Flex-Match partners)
- Salary negotiation coach
- Community forums / peer support groups
- Integration with LinkedIn or other external career platforms
- Multi-country expansion (outside Singapore)

---

## Roadmap

| Milestone | Scope | Target Date |
|---|---|---|
| M1 — Auth & Data Foundation | Supabase auth, real job data pipeline, user profiles | Q2 2026 |
| M2 — Live Safe-Flex Scoring | AI scoring pipeline connected to real job listings | Q3 2026 |
| M3 — Shield Protocol v1 | Encrypted reporting, Singpass integration, collective action | Q3 2026 |
| M4 — Amplify + Wallet | Live AI transformation API, real MOM subsidy data | Q4 2026 |
| M5 — Flex-Match MVP | Profile creation, AI matching, messaging | Q4 2026 |
| M6 — Public Launch | All features live, analytics, performance tuning | Q1 2027 |

---

## Success Metrics

Targets at 6 months post-launch:

| Metric | Target |
|---|---|
| Registered users | 5,000 |
| Jobs browsed / week | 20,000 sessions |
| Shield Protocol reports filed | 500 |
| Collective actions triggered | 10 |
| Flex-Match pairs created | 200 |
| Amplify portfolios generated | 1,000 |
| Wallet scenarios saved | 2,000 |
| D30 retention | ≥ 35% |

---

## Open Questions

1. **Singpass integration complexity:** What is the approval timeline for Singpass OAuth access for a private platform?
2. **AI model selection:** Use Claude API for all AI features, or specialized models per task (NLP for scoring, LLM for transformation)?
3. **Job listing sourcing:** Partner ATS integrations vs. manual curation — what's the realistic pipeline for launch?
4. **Zero-knowledge proof implementation:** Use existing ZKP libraries (e.g., snarkjs) or a managed service?
5. **Monetization model:** Free for users; employer-facing paid tier? Subscription? Grant-funded?
6. **Legal review:** Collective action triggers and employer flagging — any defamation risk under Singapore law?

---

## Contributing

This is a private repository. To propose changes, open an issue or submit a pull request against the `main` branch. All PRs require review before merge.

---

## License

Private and confidential. All rights reserved.
