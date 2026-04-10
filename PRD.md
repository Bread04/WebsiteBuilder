# Product Requirements Document
## Beyond Binary — Career Intelligence Platform for Female Professionals

**Version:** 1.0  
**Date:** 2026-04-10  
**Status:** Draft

---

## 1. Overview

### 1.1 Product Vision

Beyond Binary is a career intelligence and empowerment platform built for female professionals in Singapore. It shifts the power dynamic from employers to talent by surfacing data-driven workplace safety metrics, anonymous incident reporting, job-sharing opportunities, and financial clarity tools — all in one cohesive experience.

### 1.2 Mission Statement

To eliminate information asymmetry in the labor market for women by providing the data, tools, and community infrastructure they need to make informed career decisions and hold employers accountable.

### 1.3 Strategic Alignment

Supports UN Sustainable Development Goals:
- **SDG 5** — Gender Equality
- **SDG 8** — Decent Work and Economic Growth

---

## 2. Target Users

| Segment | Description | Primary Pain Point |
|---|---|---|
| Active Job Seekers | Women actively searching for new roles | Can't assess workplace culture before joining |
| Career Returners | Women re-entering the workforce after caregiving gaps | Resume gaps stigmatized; undervalued experience |
| Job Sharers | Professionals seeking reduced-hours senior roles | Senior positions incompatible with caregiving |
| Incident Reporters | Women who have experienced workplace misconduct | Fear of retaliation prevents reporting |
| Employers (future) | Companies seeking to improve gender equity scores | No objective benchmark for culture improvement |

---

## 3. Core Features

### 3.1 Safe-Flex Score System

**What it does:** Assigns every job listing two AI-derived scores — a Safety Score (workplace culture, psychological safety) and a Flexibility Score (work-life balance, hybrid/remote arrangements).

**User Story:** As a job seeker, I want to see a workplace safety and flexibility rating on every job card so I can filter out toxic environments before applying.

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

### 3.2 Job Board

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

### 3.3 Shield Protocol

**What it does:** A private, anonymous incident reporting system that uses zero-knowledge proofs and Singpass verification to allow women to report workplace misconduct without fear of retaliation — and triggers collective action when multiple reports converge on the same actor.

**User Story:** As a user who experienced harassment at work, I want to file a confidential report that can contribute to collective action against repeat offenders, without my identity being exposed.

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

### 3.4 Flex-Match

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

### 3.5 Amplify Portfolio

**What it does:** An AI-powered career narrative tool that transforms caregiving gaps and non-traditional experience into corporate-valued language for CVs and LinkedIn profiles.

**User Story:** As a career returner, I want to convert my caregiving experience into professional language so I can present a competitive resume without hiding the gap.

**Requirements:**
- Input: raw experience entries (free text or structured: role, duration, activities)
- AI transformation: maps caregiving activities to transferable skills and corporate-recognized language
- Example transformations:
  - "Raised two children" → "Managed multi-stakeholder household operations and long-range developmental planning for two individuals"
  - "Volunteered at school" → "Led community engagement initiatives and coordinated cross-functional teams of 15+"
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

### 3.6 Lumina Benefits Wallet

**What it does:** A financial visualization tool that calculates a user's Total Professional Worth — combining base salary, government subsidies, flexibility-derived value recovery, and gender pay gap context.

**User Story:** As a professional evaluating a job offer, I want to see the full financial picture including subsidies and flexibility value so I can compare offers accurately.

**Requirements:**
- Inputs: base salary (slider), flexibility percentage (slider), employment type
- Calculated outputs:
  - Working Mother Subsidy (Singapore: S$7,200/year, government-sourced)
  - GPMB Cap adjustment
  - Unpaid labor value recovery (based on flexibility %)
  - Total Professional Worth = base + subsidies + recovered value
  - ROI % vs. baseline market male rate
- Gender pay parity comparison: highlight gap vs. median male equivalent role
- Market male rate sourced from MOM Singapore data (updated quarterly)
- Save and compare multiple job offer scenarios

**Acceptance Criteria:**
- [ ] All calculations update in real time as sliders move
- [ ] Government subsidy values sourced from live MOM API or quarterly-refreshed static data
- [ ] Scenario comparison supports up to 3 saved offers
- [ ] Pay gap visualization uses accessible color contrast ratios

---

## 4. Authentication & User Accounts

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

## 5. Backend & Data

### 5.1 Architecture

- **Frontend:** React 18 + TypeScript, Vite, Tailwind CSS
- **API Layer:** Hono on Supabase Edge Functions
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth + Singpass OAuth
- **AI:** Claude API (Anthropic) for Safe-Flex scoring, Amplify transformations, Flex-Match matching
- **Storage:** Supabase Storage for portfolio exports

### 5.2 Data Sources

| Data | Source | Refresh Cadence |
|---|---|---|
| Job listings | Partner ATSs + manual curation | Real-time / daily sync |
| Safe-Flex scores | AI analysis + incident feed | On-demand + nightly batch |
| Singapore subsidies | MOM Singapore API | Quarterly |
| Gender pay gap market rate | MOM Singapore / Comprehensive Labour Force Survey | Quarterly |
| Incident reports | User submissions (encrypted) | Real-time |

### 5.3 Privacy & Compliance

- Shield Protocol reports: zero-knowledge encryption, no PII stored post-verification
- Personal data handling compliant with Singapore PDPA
- Data retention policy: user data deleted within 30 days of account deletion request
- All API endpoints require authenticated session (except public job board read)

---

## 6. Non-Functional Requirements

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

---

## 7. Out of Scope (v1.0)

- Employer-facing dashboard (company profile management, score improvement tools)
- Direct messaging between users (outside Flex-Match partners)
- Salary negotiation coach
- Community forums / peer support groups
- Integration with LinkedIn or other external career platforms
- Multi-country expansion (outside Singapore)

---

## 8. Success Metrics

| Metric | Target (6 months post-launch) |
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

## 9. Milestones

| Milestone | Scope | Target Date |
|---|---|---|
| M1 — Auth & Data Foundation | Supabase auth, real job data pipeline, user profiles | Q2 2026 |
| M2 — Live Safe-Flex Scoring | AI scoring pipeline connected to real job listings | Q3 2026 |
| M3 — Shield Protocol v1 | Encrypted reporting, Singpass integration, collective action | Q3 2026 |
| M4 — Amplify + Wallet | Live AI transformation API, real subsidy data | Q4 2026 |
| M5 — Flex-Match MVP | Profile creation, AI matching, messaging | Q4 2026 |
| M6 — Public Launch | All features live, analytics, performance tuning | Q1 2027 |

---

## 10. Open Questions

1. **Singpass integration complexity:** What is the approval timeline for Singpass OAuth access for a private platform?
2. **AI model selection:** Use Claude API for all AI features, or specialized models per task (NLP for scoring, LLM for transformation)?
3. **Job listing sourcing:** Partner ATS integrations vs. manual curation — what's the realistic pipeline for launch?
4. **Zero-knowledge proof implementation:** Use existing ZKP libraries (e.g., snarkjs) or a managed service?
5. **Monetization model:** Free for users; employer-facing paid tier? Subscription? Grant-funded?
6. **Legal review:** Collective action triggers and employer flagging — any defamation risk under Singapore law?
