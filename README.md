# UDAAN — Humanitarian Intelligence Network
### *"No One Should Be Left Behind."*

[![Built with Google Cloud AI](https://img.shields.io/badge/Google%20Cloud-AI%20%26%20Gemini-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Executive Summary

**UDAAN** is an intelligent humanitarian infrastructure platform designed to protect and support homeless people, abandoned elderly individuals, vulnerable children, and indigent populations lacking access to basic life essentials.

Unlike ordinary NGO directories or donation websites, UDAAN functions as an **operational coordination engine**. It pairs a macro-level **Humanitarian Digital Twin** (monitoring citywide resource deficits and shelter capacity) with a micro-level **AI Assistance Coordinator** (orchestrating 8 specialized domain agents to match needs, coordinate referrals, and guide 6-stage long-term rehabilitation).

---

## 🚀 Key Innovations & Core Systems

### 1. System A: Humanitarian Digital Twin (Macro Intelligence)
* **Citywide Geospatial Telemetry:** Interactive Leaflet/Carto map covering 8 focal sectors in Bengaluru (Majestic/KSR Station, Kalasipalya/KR Market, Shivajinagar, Yeshwanthpur, Koramangala, Peenya, Whitefield, Malleshwaram).
* **Demand vs. Supply Analytics:** Real-time visual comparison of shelter bed deficits and meal portions.
* **Scenario Simulator:** Empowers municipal administrators to test resource hypotheses (e.g. *"What happens if an additional 100 shelter beds become available?"*) with algorithmic impact forecasting.

### 2. System B: AI Assistance Coordinator (8 Specialized Agents)
* **Agent 1 (Need Assessment):** Multilingual extraction (Kannada, Hindi, English) of structured needs and urgency levels.
* **Agent 2 (Food Assistance):** Matches active community kitchens and mobile distribution points.
* **Agent 3 (Shelter Coordination):** Verifies bed availability and geriatric/mobility accessibility.
* **Agent 4 (Healthcare Coordination):** Directs to charitable hospital OPDs and wound dressing desks without diagnosing or prescribing.
* **Agent 5 (Documentation Assistance):** Coordinates address-less Aadhaar and pension enrolment.
* **Agent 6 (Rehabilitation Agent):** Synthesizes long-term social reintegration pathways.
* **Agent 7 (Follow-up Agent):** Enforces time-bound verification gates and monitors overdue check-ins.
* **Agent 8 (Orchestrator Agent):** Consolidates multi-domain findings into a unified plan and gates execution behind human sign-off.

### 3. Zero-Barrier Beneficiary Assistance Portal
* **Multilingual Voice Intake:** Web Speech recognition and text-to-speech feedback in Kannada, Hindi, and English.
* **No Mandatory ID Requirement:** Emergency food and shelter are accessible without requiring a smartphone, email address, Aadhaar, or identity document.
* **Volunteer Mode:** Authorized field volunteers can submit requests on behalf of vulnerable individuals found on the streets.

### 4. Smart Resource Matching Engine
* Proximity scoring via the Haversine formula combined with capacity verification, operating hours, and specialized accessibility features (wheelchair ramps, elderly handrails).

### 5. Rehabilitation & Independence Engine (Section 13)
* Tracks tangible humanitarian outcomes across a **6-Stage Longitudinal Journey**:
  1. *Immediate Safety & Crisis Stabilization*
  2. *Shelter & Essential Daily Needs*
  3. *Healthcare & Documentation Assistance (Aadhaar & Old Age Pension)*
  4. *Education, Skills & Psycho-social Wellbeing*
  5. *Livelihood & Assisted Living Placement*
  6. *Independent Living & Longitudinal Follow-up*

### 6. Interactive 8-Step Guided Demo Walkthrough
* A single click on **"Interactive Demo (8-Steps)"** walks evaluators step-by-step through a complete end-to-end case:
  1. *Volunteer reports elderly homeless individual (Ramesh Rao, 68, Majestic Station, leg wound)*
  2. *Multilingual AI extraction in Kannada and English*
  3. *5 domain agents formulate recommendations in parallel*
  4. *Smart proximity matching with Samarthanam Elder Shelter & Bowring Hospital*
  5. *Mandatory human approval gate (Social Worker Kavitha Ramesh)*
  6. *Referrals dispatched via partner web push*
  7. *Ground execution verified (hot meal delivered, wound dressed)*
  8. *Long-term rehabilitation pathway initiated with pension assistance*

---

## 🗺️ Complete Route Manifest (All 19 Routes Implemented)

| Route | View | Description |
|---|---|---|
| `/` | Public Landing Page | Premium humanitarian hero, impact metrics, 6-step protocol, modules |
| `/about` | Our Mission | Dignity-first philosophy, ethics pledge, zero-barrier guarantee |
| `/how-it-works` | How UDAAN Works | Architecture diagram of System A (Twin) & System B (Coordinator) |
| `/get-help` | Beneficiary Portal | Accessible voice-assisted and guided help request interface |
| `/report-need` | Citizen & Volunteer Report | Report an unsheltered person or vulnerable child in distress |
| `/find-resources` | Verified Directory | Searchable database of shelters, food points, and clinics |
| `/volunteer` | Volunteer Network | Responder registration, task verification, code of conduct |
| `/partner-with-us` | NGO Institutional Portal | Onboard shelters and kitchens with registration verification |
| `/login` | Staff & Partner Login | 1-click role logins for Admin, Social Worker, Volunteer, NGO |
| `/register` | Registration Page | Sign up for role-based responder accounts |
| `/dashboard` | Command Overview | Operations command center, priority triage queue, KPIs |
| `/dashboard/city-intelligence` | Digital Twin (System A) | Interactive geospatial map, demand vs supply, scenario simulator |
| `/dashboard/assistance-cases` | Assistance Cases | Active cases, audit logs, referral dispatch, human sign-off |
| `/dashboard/ai-coordinator` | AI Coordinator (System B) | The 8-agent system, live test prompt, JSON telemetry |
| `/dashboard/resources` | Resource Network | Facility capacity management, edit available beds & meals |
| `/dashboard/organisations` | Partner Organisations | Verified partner audit list, ratings, contact desk |
| `/dashboard/rehabilitation` | Rehabilitation Engine | 6-stage journey timeline, milestone tracking, outcome metrics |
| `/dashboard/analytics` | Analytics Command Hub | Interactive Recharts analytics, shortage breakdown, resolution curves |
| `/dashboard/settings` | System Settings | Gemini API key configuration, audit logs export, demo reset |

---

## 🛠️ Technology Stack

* **Frontend:** React 18, TypeScript 5.7, Vite 6, Tailwind CSS 3.4
* **Icons & Visuals:** Lucide React, Leaflet Maps with CartoDB Positron Cartography
* **Data Visualizations:** Recharts (BarChart, LineChart, PieChart)
* **Backend:** Python 3.12, FastAPI, Pydantic v2, Uvicorn
* **AI & NLP:** Google Gemini 1.5 Flash structured function calling with offline fallback
* **Voice Support:** Web Speech Recognition API & SpeechSynthesisUtterance

---

## 💻 Quick Start & Running Locally

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev
# -> Opens http://localhost:5173

# Run production build & preview
npm run build
npm run preview
```

### 2. Backend Setup (FastAPI Python Service)
```bash
# Run the FastAPI server directly with Python
python server/main.py
# -> Runs at http://localhost:8000
# -> Interactive Swagger OpenAPI docs at http://localhost:8000/docs
```

---

## 🛡️ Ethical Guardrails & Safeguards

* **No Automated Denial:** AI cannot reject an assistance request. Rejections can only be made by human organizations with documented explanations.
* **Zero Medical Diagnosis:** Clinical evaluation is exclusively handled by licensed medical practitioners at registered partner clinics.
* **Prohibition of Biometrics:** No facial recognition is utilized to scan or track vulnerable homeless populations.
* **Child Protection Compliance:** Automatic immediate routing of minors to authorized Child Welfare Committees (CWCs) under the Juvenile Justice Act 2015.
* **Transparency:** All simulated data is clearly labeled with **DEMO DATA** badges to uphold complete research and institutional integrity.
#   g o o g l e - b u i l d a t h o n - u d a a n -  
 