# UDAAN — Humanitarian Intelligence Network
## Technical Architecture & Systems Design

> **Tagline:** *"No One Should Be Left Behind."*  
> **Mission:** An intelligent humanitarian infrastructure platform connecting homeless individuals, abandoned elderly, vulnerable children and those in acute distress with food, shelter, healthcare, and long-term independence through one coordinated ecosystem.

---

## 1. High-Level Architectural Overview

UDAAN bridges the gap between fragmented humanitarian charities and individuals in crisis through two interconnected intelligence systems:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               UDAAN HUMANITARIAN ECOSYSTEM                             │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌─────────────────────────────────────────┐   ┌──────────────────────────────────────────┐
│  SYSTEM A: HUMANITARIAN DIGITAL TWIN    │   │  SYSTEM B: AI ASSISTANCE COORDINATOR     │
│  (Macro-level City Intelligence)        │   │  (Micro-level Case Orchestration)        │
│                                         │   │                                          │
│  • Geospatial Telemetry (Leaflet/Carto) │   │  • Multilingual NLP (EN, KN, HI)         │
│  • Bed & Meal Capacity Tracking         │   │  • 8 Domain-Specific Agents              │
│  • Demand vs. Supply Analytics          │   │  • Algorithmic Resource Matcher          │
│  • Scenario Simulation Engine           │   │  • Human-in-the-Loop Approval Gate       │
│  • Shortage Zone & Dark Spot Detection  │   │  • 6-Stage Rehabilitation Engine         │
└─────────────────────────────────────────┘   └──────────────────────────────────────────┘
         ▲                                                     ▲
         │                                                     │
┌────────┴─────────────────────────────────────────────────────┴─────────────────────────┐
│                          UNIFIED SECURE STATE & API LAYER                              │
│  • Role-Based Access Control (Admin, Social Worker, Volunteer, NGO Partner, Beneficiary)│
│  • Zero-barrier intake (No Aadhaar, smartphone, or email required)                     │
│  • Privacy Protection: Geolocation fuzzing, immutable audit logs                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. System A: Humanitarian Digital Twin

The **Humanitarian Digital Twin** provides city administrators and field coordinators with an aggregated, privacy-protected mirror of humanitarian demand and supply across municipal sectors (demonstrated in Bengaluru, Karnataka across 8 focal zones).

### 2.1 Monitored Telemetry Layers
1. **Emergency Shelter Capacity:** Real-time verified bed availability across BBMP transit shelters, NGO elder-care homes, and women's crisis shelters.
2. **Food Assistance Availability:** Active community kitchens, Robin Hood Army distribution points, and meal portion tallies.
3. **Healthcare Access Index:** Free charitable OPDs, wound cleaning desks, and mobile medical vans.
4. **Volunteer Coverage:** Active on-duty responder headcounts per zone.
5. **Resource Shortage Zones:** Algorithmic calculation of unmet deficits:
   $$\text{Deficit}_{\text{Shelter}} = \max(0, \text{Demand}_{\text{Shelter}} - \text{Capacity}_{\text{Shelter}})$$
   $$\text{Deficit}_{\text{Food}} = \max(0, \text{Demand}_{\text{Food}} - \text{Capacity}_{\text{Food}})$$

### 2.2 Scenario Simulation Engine
Allows city planners to evaluate hypothetical resource allocations:
* *Hypothesis:* *"What happens if an additional 100 shelter beds become available?"*
* *Engine:* Calculates marginal relief per zone, prioritizes areas with critical deficits (e.g. Kalasipalya & Majestic), forecasts case impact, and outputs suggested allocation strategies without claiming guaranteed predictions.

---

## 3. System B: AI Assistance Coordinator & 8-Agent System

UDAAN implements a specialized **Multi-Agent Architecture** powered by Google Gemini and structured function calling:

```
                                  [Incoming Request]
                             (Voice / Guided Form in KN/HI/EN)
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   1. Need Assessment Agent      │
                         │   (Structured JSON Extraction)  │
                         └─────────────────────────────────┘
                                          │
                  ┌───────────────────────┼───────────────────────┐
                  ▼                       ▼                       ▼
      ┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────────┐
      │ 2. Food Assist. Agent │ │ 3. Shelter Agent  │ │ 4. Healthcare Agent   │
      └───────────────────────┘ └───────────────────┘ └───────────────────────┘
                  │                       │                       │
                  ▼                       ▼                       ▼
      ┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────────┐
      │ 5. Documentation Agt  │ │ 6. Rehab Agent    │ │ 7. Follow-up Agent    │
      └───────────────────────┘ └───────────────────┘ └───────────────────────┘
                  │                       │                       │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   8. Orchestrator Agent         │
                         │   (Consolidation & Verification)│
                         └─────────────────────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   HUMAN SOCIAL WORKER GATE      │
                         │   (Mandatory Clinical Sign-off) │
                         └─────────────────────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   Referrals Dispatched to NGOs  │
                         └─────────────────────────────────┘
```

### The 8 Specialized Agents:
1. **Need Assessment Agent:** Parses multilingual unstructured descriptions into structured categories (`food_water`, `emergency_shelter`, `medical_support`, etc.) and determines urgency (`critical`, `high`, `medium`, `low`).
2. **Food Assistance Agent:** Matches active meal programs and hydration points within geographic proximity.
3. **Shelter Coordination Agent:** Matches verified bed inventory accounting for accessibility (wheelchair ramps, elderly handrails) and admission criteria.
4. **Healthcare Coordination Agent:** Identifies charitable hospital casualty desks and mobile clinics for wound dressing, avoiding medical diagnosis or prescription.
5. **Documentation Assistance Agent:** Coordinates address-less Aadhaar biometric enrolment and social security pension applications.
6. **Rehabilitation Agent:** Formulates personalized long-term recovery roadmaps.
7. **Follow-up Agent:** Tracks pending referrals, sets check-in timers, and flags overdue cases.
8. **Orchestrator Agent:** Synthesizes recommendations into a unified, human-reviewable action plan and enforces approval gates.

---

## 4. Smart Resource Matching Engine

Proximity and fit are evaluated using a multi-factor scoring function:
$$\text{Score} = \text{Base} + S_{\text{Proximity}} + S_{\text{Capacity}} + S_{\text{Verification}} + S_{\text{Accessibility}} + S_{\text{Specialty}}$$

* **Proximity ($S_{\text{Proximity}}$):** Computed via the Haversine formula:
  $$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)}\right)$$
  - $\le 1.0\text{ km}$: $+25\text{ pts}$
  - $\le 3.0\text{ km}$: $+18\text{ pts}$
  - $\le 7.0\text{ km}$: $+10\text{ pts}$
* **Capacity ($S_{\text{Capacity}}$):** $+15\text{ pts}$ if verified available capacity $> 10$; $-20\text{ pts}$ if capacity exhausted.
* **Verification ($S_{\text{Verification}}$):** $+10\text{ pts}$ for audited partner NGOs.
* **Accessibility ($S_{\text{Accessibility}}$):** $+10\text{ pts}$ for wheelchair/ramp verification matching beneficiary mobility needs.

---

## 5. The Rehabilitation & Independence Engine

UDAAN rejects arbitrary percentage metrics in favor of tangible, outcome-based milestones across a **6-Stage Longitudinal Journey**:
* **Stage 1: Immediate Safety & Crisis Stabilization:** Food, potable water, clinical wound dressing, removal from weather exposure.
* **Stage 2: Shelter & Daily Essentials:** 30 consecutive days of safe shelter, nutritious meals, and clean clothing.
* **Stage 3: Healthcare & Documentation Assistance:** Restoring Aadhaar without permanent address, Senior Citizen pension registration, Ayushman Bharat health card.
* **Stage 4: Education, Skills & Psycho-social Wellbeing:** Trauma counseling, day-care community, light craft or vocational assessment.
* **Stage 5: Livelihood & Housing Placement:** Transition from emergency night shelter to permanent elder home or assisted living.
* **Stage 6: Independent Living & Longitudinal Follow-up:** Quarterly volunteer visits at 1, 3, and 6 months to ensure dignity and prevent relapse.

---

## 6. Security, Ethics, and Privacy Guardrails

1. **Zero-Barrier Guarantee:** No smartphone, email, Aadhaar, or identity document is mandatory for receiving emergency food, shelter, or medical triage.
2. **Human-in-the-Loop Sign-off:** No autonomous dispatch of medical referrals or shelter admissions without human social-worker authorization.
3. **No Automated Denial:** AI systems cannot reject requests. Rejections can only be made by human organizations with explicit reasons.
4. **Prohibition of Biometrics:** No facial recognition or biometric scanning of homeless populations.
5. **Child Protection Compliance:** Automatic escalation of minor cases to authorized Child Welfare Committees under the Juvenile Justice Act 2015.
6. **Immutable Audit Logging:** Every intake, AI inference, and human sign-off generates an unalterable log record.
