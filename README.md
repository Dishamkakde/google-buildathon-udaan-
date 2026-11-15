# UDAAN — Humanitarian Intelligence Network
### *"No One Should Be Left Behind."*

[![Built with Google Cloud AI](https://img.shields.io/badge/Google%20Cloud-AI%20%26%20Gemini-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Executive Summary

**UDAAN** is an intelligent humanitarian infrastructure platform designed to connect homeless people, abandoned elderly individuals, vulnerable children, and indigent populations lacking access to basic life essentials with verified food, emergency shelter, healthcare, legal identity, and long-term rehabilitation.

Unlike ordinary NGO directories or donation websites, UDAAN functions as an **operational coordination engine**. It pairs a macro-level **Humanitarian Digital Twin** (monitoring citywide resource deficits and shelter capacity) with an agentic **AI Assistance Coordinator** (matching needs, orchestrating referrals, and guiding long-term rehabilitation).

---

## 🚀 The 6 Core Competition Features

### 1. FEATURE 1: AI-Powered Need Assessment
* **Conversational AI Assistant:** Multilingual natural language dialogue in **English**, **Kannada (ಕನ್ನಡ)**, and **Hindi (हिंदी)**.
* **Voice & Text Input:** Real-time Web Speech recognition API with audio fallback.
* **Structured Extraction:** Automatically parses primary needs (`food_water`, `emergency_shelter`, `medical_support`, `identity_docs`, etc.), urgency level (`critical`, `high`, `medium`, `low`), location/landmark, headcount, and vulnerability factors.
* **Review & Submit Card:** Beneficiaries and caseworkers can review, edit, and confirm details before submission. Generates a unique Case ID (e.g., `CASE-2026-0891`).

### 2. FEATURE 2: Smart Resource Matching
* **Verified Provider Database:** Catalogs verified NGOs, shelters, community kitchens, and hospitals across Bengaluru.
* **Multi-Factor Matching Engine:** Matches based on required service category, geographic proximity (Haversine formula), verified available capacity, and urgency.
* **Explanations:** Displays the rationale behind every recommended provider (distance, bed capacity, specialization).
* **5-Stage Referral Tracking:** Tracks referrals through `Pending` -> `Accepted` -> `In Progress` -> `Completed` (or `Rejected` with mandatory explanation).

### 3. FEATURE 3: Humanitarian Digital Twin
* **Bengaluru Geospatial Map:** Interactive city map displaying humanitarian demand hotspots and verified support centres across 8 Bengaluru zones.
* **Category Filters:** Live filters for Food, Shelter, Healthcare, Documentation, and Area Shortages.
* **Demand vs. Capacity Analytics:** Real-time visual comparison of shelter bed deficits and meal portions.
* **What-If Scenario Simulation:** Simulates impact scenarios, such as *"What happens if shelter demand increases by 30%?"*, recalculating area-wise resource gaps.
* **DEMO DATA Badges:** All simulated city data is visibly labeled as **DEMO DATA**.

### 4. FEATURE 4: Referral and Case Tracking
* **Unique Case IDs:** Systematic tracking via `CASE-2026-XXXX`.
* **Centralized Case Management:** Searchable dashboard with status and urgency filters.
* **6-Stage Standard Case Lifecycle:**
  1. `Submitted`
  2. `Under Review`
  3. `Matched`
  4. `Referral Initiated`
  5. `Assistance In Progress`
  6. `Completed`
* **Human Approval Gate:** Coordinators authorize sensitive referrals prior to dispatch.
* **Activity Audit Trail:** Chronological timeline of updates, notes, and caseworker actions.
* **Beneficiary Case Tracker:** Beneficiaries can track case status in real time using their Case ID.

### 5. FEATURE 5: Rehabilitation Pathway Engine
* **5-Stage Longitudinal Journey Tracker:**
  - **Stage 1: Immediate Relief** — Food, emergency shelter, and essential medical care.
  - **Stage 2: Stabilisation** — Identity document restoration (Aadhaar), welfare enrollment, and continued support.
  - **Stage 3: Skill Development** — Vocational training, adult education, and skill-building programs.
  - **Stage 4: Employment** — Livelihood preparation, job opportunities, and partner connections.
  - **Stage 5: Independent Living** — Permanent housing support and longitudinal caseworker follow-up.
* **Caseworker Milestones:** Caseworkers can check off milestones and record observational progress notes.

### 6. FEATURE 6: Role-Based Dashboards
Four distinct role experiences with 1-click instant switching:
* **A. Beneficiary Dashboard (`/dashboard/beneficiary`):** Conversational AI intake, live Case Tracker, matched services, and rehabilitation journey.
* **B. NGO Dashboard (`/dashboard/ngo`):** Manage organization profile & capacity, view incoming referrals, **Accept / Reject referrals with mandatory reason**, and update assistance progress.
* **C. Field Volunteer Dashboard (`/dashboard/volunteer`):** View assigned missions, accept/start/complete tasks, submit completion notes, and report persons in need.
* **D. Administrator Dashboard (`/dashboard/admin`):** Platform KPIs, NGO verification queue, user role management, Digital Twin map, and What-If scenario simulation.

---

## 🗺️ Complete Website Routes

| Route | Role / Purpose | Description |
|---|---|---|
| `/` | Public | Homepage with hero, impact metrics, 6-step coordination, and core modules |
| `/about` | Public | Mission, ethical principles, and zero-barrier guarantee |
| `/how-it-works` | Public | Visual workflow of Humanitarian Digital Twin & AI Coordinator |
| `/get-help` | Public & Beneficiary | Voice/text conversational AI intake, Case Tracker widget, and emergency form |
| `/report-need` | Citizen & Volunteer | Report an unsheltered individual or vulnerable child in distress |
| `/find-resources` | Public | Searchable directory of verified shelters, food points, and clinics |
| `/volunteer` | Volunteers | Volunteer registration, guidelines, and code of conduct |
| `/partner-with-us` | NGOs & Institutions | Onboard verified shelters, kitchens, and clinics |
| `/login` | Authentication | 1-click role logins for all 4 primary roles |
| `/register` | Authentication | Account registration |
| `/dashboard` | Operations Hub | Command Overview with instant 4-role switcher ribbon |
| `/dashboard/beneficiary` | Role A | Dedicated Beneficiary Portal |
| `/dashboard/ngo` | Role B | Dedicated NGO Partner Command Hub |
| `/dashboard/volunteer` | Role C | Dedicated Field Volunteer Dispatch Hub |
| `/dashboard/admin` | Role D | Dedicated Administrator Command Center |
| `/dashboard/city-intelligence` | System A | Humanitarian Digital Twin map, demand vs supply, scenario simulator |
| `/dashboard/assistance-cases` | Feature 4 | Centralized case queue, human review approvals, audit timeline |
| `/dashboard/ai-coordinator` | AI Multi-Agent | Agent telemetry, prompt testing, and structured outputs |
| `/dashboard/resources` | Feature 2 | Resource capacity editor, available beds and meal portions |
| `/dashboard/organisations` | Network | Verified partner list, verification workflow, ratings |
| `/dashboard/rehabilitation` | Feature 5 | 5-stage rehabilitation journey, milestone checklist, caseworker notes |
| `/dashboard/analytics` | Analytics | Citywide analytics, shortage breakdowns, and resolution curves |
| `/dashboard/settings` | Settings | Platform configuration, API keys, and demo data reset |

---

## 💻 Tech Stack

* **Frontend:** React 18, TypeScript 5.7, Vite 6, Tailwind CSS 3.4
* **Map & Geospatial:** Leaflet Maps with CartoDB Positron Cartography
* **Icons:** Lucide React
* **Backend:** Python 3.12, FastAPI, Pydantic v2, Uvicorn
* **AI & NLP:** Google Gemini structured extraction API with offline simulated fallback
* **Voice:** Web Speech Recognition API & SpeechSynthesis

---

## ⚡ Quick Start

### 1. Frontend Web Portal
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
# -> Opens http://localhost:5173
```

### 2. Backend API Service (FastAPI)
```bash
# Start FastAPI backend
python server/main.py
# -> Runs at http://localhost:8000
# -> Interactive Swagger documentation at http://localhost:8000/docs
```

---

## 🛡️ Ethical Guardrails & Safeguards

* **No Automated Denial:** AI cannot reject an assistance request. Rejections can only be made by human organizations with mandatory documented explanations.
* **Zero Medical Diagnosis:** Clinical evaluation is exclusively handled by licensed medical practitioners at registered partner clinics.
* **Prohibition of Biometrics:** No facial recognition or surveillance is used to track vulnerable individuals.
* **Child Protection Compliance:** Immediate routing of minors to authorized Child Welfare Committees (CWCs) under the Juvenile Justice Act 2015.
* **Transparency:** All simulated Bengaluru data is clearly marked as **DEMO DATA**.
