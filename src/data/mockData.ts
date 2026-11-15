import {
  ResourceItem,
  Organisation,
  Volunteer,
  VolunteerTask,
  AssistanceCase,
  RehabilitationPlan
} from '../types';

export const INITIAL_ORGANISATIONS: Organisation[] = [
  {
    id: 'org-samarthanam',
    name: 'Samarthanam Trust for Human Welfare',
    registrationNumber: 'NGO-KA-BLR-1997-0482',
    serviceCategories: ['emergency_shelter', 'elderly_care', 'skill_development', 'food_water'],
    coverageZones: ['Majestic / KSR Hub', 'Kalasipalya / KR Market', 'Koramangala / Dairy Circle'],
    address: 'CA: 39, 15th Cross, 16th Main, Sector 4, HSR Layout, Bengaluru 560102',
    contactPerson: 'Prashanth Kumar (Field Director)',
    email: 'field@samarthanam.org',
    phone: '+91 80 2572 1444',
    operatingHours: '24/7 for Emergency Shelter; 09:00 - 18:00 for Day Centre',
    verifiedStatus: 'verified',
    activeSheltersCount: 3,
    activeMealProgramsCount: 2,
    rating: 4.9,
    referralsReceived: 312,
    referralsFulfilled: 298
  },
  {
    id: 'org-bosco',
    name: 'BOSCO Mane Child & Youth Care',
    registrationNumber: 'NGO-KA-BLR-1980-0112',
    serviceCategories: ['child_protection', 'emergency_shelter', 'education', 'rehabilitation'],
    coverageZones: ['Majestic / KSR Hub', 'Shivajinagar / Cantonment', 'Kalasipalya / KR Market'],
    address: '106, 2nd Cross, Kalasipalya, New Extension, Bengaluru 560002',
    contactPerson: 'Fr. Mathew Thomas (Child Welfare Officer)',
    email: 'helpline@boscobangalore.org',
    phone: '+91 80 2670 0767',
    operatingHours: '24/7 Helpline & Crisis Reception Unit',
    verifiedStatus: 'verified',
    activeSheltersCount: 4,
    activeMealProgramsCount: 1,
    rating: 4.8,
    referralsReceived: 420,
    referralsFulfilled: 405
  },
  {
    id: 'org-bowring',
    name: 'Bowring & Lady Curzon Charitable Community Health Unit',
    registrationNumber: 'GOV-HOSP-KA-BLR-004',
    serviceCategories: ['medical_support', 'clothing_hygiene', 'rehabilitation'],
    coverageZones: ['Shivajinagar / Cantonment', 'Majestic / KSR Hub', 'Yeshwanthpur Junction'],
    address: 'Lady Curzon Road, Shivajinagar, Bengaluru 560001',
    contactPerson: 'Dr. Aruna Shenoy (Nodal Medical Officer)',
    email: 'community.health@bowringhospital.org',
    phone: '+91 80 2559 1325',
    operatingHours: '24/7 Emergency Casualty; 08:30 - 16:00 Free OPD',
    verifiedStatus: 'verified',
    activeSheltersCount: 0,
    activeMealProgramsCount: 0,
    rating: 4.7,
    referralsReceived: 560,
    referralsFulfilled: 532
  },
  {
    id: 'org-rha-blr',
    name: 'Robin Hood Army & Janaseva Food Relief',
    registrationNumber: 'VOL-KA-BLR-2015-8821',
    serviceCategories: ['food_water', 'clothing_hygiene'],
    coverageZones: ['Majestic / KSR Hub', 'Kalasipalya / KR Market', 'Yeshwanthpur Junction', 'Peenya Industrial Area'],
    address: 'Distribution Hubs across Majestic, KR Market & Yeshwanthpur',
    contactPerson: 'Sandeep Hegde (City Logistics Lead)',
    email: 'bangalore@robinhoodarmy.com',
    phone: '+91 98450 11920',
    operatingHours: 'Morning Distribution 07:30 - 10:00; Evening 19:30 - 22:30',
    verifiedStatus: 'verified',
    activeSheltersCount: 0,
    activeMealProgramsCount: 6,
    rating: 4.9,
    referralsReceived: 890,
    referralsFulfilled: 875
  },
  {
    id: 'org-hasiru-dala',
    name: 'Hasiru Dala Social Security & Documentation Cell',
    registrationNumber: 'NGO-KA-BLR-2011-0983',
    serviceCategories: ['identity_docs', 'skill_development', 'employment', 'rehabilitation'],
    coverageZones: ['Kalasipalya / KR Market', 'Peenya Industrial Area', 'Whitefield / KR Puram Hub'],
    address: '38/1, 2nd Main, Vyalikaval, Malleshwaram, Bengaluru 560003',
    contactPerson: 'Nalini Shekar (Legal Aid & Documentation Lead)',
    email: 'idcards@hasirudala.in',
    phone: '+91 80 2346 8812',
    operatingHours: 'Monday - Saturday: 09:30 - 17:30',
    verifiedStatus: 'verified',
    activeSheltersCount: 0,
    activeMealProgramsCount: 0,
    rating: 4.8,
    referralsReceived: 380,
    referralsFulfilled: 360
  },
  {
    id: 'org-bbmp-majestic',
    name: 'BBMP Urban Homeless Shelter — Subhash Nagar',
    registrationNumber: 'GOV-BBMP-UHS-2019-012',
    serviceCategories: ['emergency_shelter', 'clothing_hygiene', 'food_water'],
    coverageZones: ['Majestic / KSR Hub'],
    address: 'Behind Kempegowda Bus Station, Tank Bund Road, Majestic, Bengaluru 560009',
    contactPerson: 'Rangaswamy M. (Superintendent)',
    email: 'majestic.shelter@bbmp.gov.in',
    phone: '+91 94806 85201',
    operatingHours: '24/7 Open Shelter Intake',
    verifiedStatus: 'verified',
    activeSheltersCount: 1,
    activeMealProgramsCount: 1,
    rating: 4.4,
    referralsReceived: 490,
    referralsFulfilled: 460
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-sh-01',
    organisationId: 'org-bbmp-majestic',
    organisationName: 'BBMP Urban Homeless Shelter — Subhash Nagar',
    category: 'emergency_shelter',
    name: 'Subhash Nagar Emergency Night Shelter (Men & Elderly Wing)',
    description: 'Direct BBMP transit shelter with mattresses, clean drinking water, hot shower facilities and emergency clothing locker.',
    location: {
      lat: 12.9782,
      lng: 77.5719,
      zone: 'Majestic / KSR Hub',
      address: 'Behind Kempegowda Bus Station, Tank Bund Road, Majestic'
    },
    totalCapacity: 60,
    availableCapacity: 8,
    unit: 'beds',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-15T16:30:00Z',
    operatingHours: '24/7 intake; quiet hours 22:00 - 06:00',
    accessibilityFeatures: ['Wheelchair ground ramp', 'Accessible western commode', 'Staff 24/7 on site'],
    eligibilityCriteria: ['Homeless adult or elderly in need', 'No Aadhaar required for emergency 72h stay', 'Non-intoxicated on premises'],
    emergencyContact: '+91 94806 85201'
  },
  {
    id: 'res-sh-02',
    organisationId: 'org-samarthanam',
    organisationName: 'Samarthanam Trust for Human Welfare',
    category: 'emergency_shelter',
    name: 'Samarthanam Elderly Care & Convalescent Shelter',
    description: 'Dedicated residential shelter with nursing care, physical therapy, geriatric nutritional food and medical supervision.',
    location: {
      lat: 12.9645,
      lng: 77.5782,
      zone: 'Kalasipalya / KR Market',
      address: 'Near Victoria Hospital South Gate, Kalasipalya'
    },
    totalCapacity: 40,
    availableCapacity: 5,
    unit: 'beds',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-15T18:00:00Z',
    operatingHours: '24/7 Intake with field social worker referral',
    accessibilityFeatures: ['Full elevator access', 'Elderly handrails', 'Doctor on call', 'Bedridden care capability'],
    eligibilityCriteria: ['Abandoned elderly (60+)', 'Differently abled individuals', 'Referral by NGO or police welfare desk'],
    emergencyContact: '+91 80 2572 1444'
  },
  {
    id: 'res-fd-01',
    organisationId: 'org-rha-blr',
    organisationName: 'Robin Hood Army & Janaseva Food Relief',
    category: 'food_water',
    name: 'Majestic Railway Station Evening Nutritious Food Kitchen',
    description: 'Hot vegetarian balanced meals: rice, sambar, boiled eggs/banana, and potable mineral water pouches.',
    location: {
      lat: 12.9774,
      lng: 77.5685,
      zone: 'Majestic / KSR Hub',
      address: 'Near KSR Platform 10 Exit Subway, Sangolli Rayanna Circle'
    },
    totalCapacity: 350,
    availableCapacity: 65,
    unit: 'meals/day',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-15T17:15:00Z',
    operatingHours: '19:30 - 21:30 Every evening',
    accessibilityFeatures: ['Ground level mobile distribution van', 'Volunteer assistance to seated elderly'],
    eligibilityCriteria: ['Open to anyone hungry', 'No questions asked', 'Free of cost'],
    emergencyContact: '+91 98450 11920'
  },
  {
    id: 'res-med-01',
    organisationId: 'org-bowring',
    organisationName: 'Bowring & Lady Curzon Charitable Community Health Unit',
    category: 'medical_support',
    name: 'Rapid Wound Dressing, Geriatric & Orthopedic Care Desk',
    description: 'Free medical diagnosis, ulcer cleaning, diabetic foot management, basic pain relief and tetanus toxoid vaccination.',
    location: {
      lat: 12.9863,
      lng: 77.6047,
      zone: 'Shivajinagar / Cantonment',
      address: 'Lady Curzon Road, Shivajinagar'
    },
    totalCapacity: 80,
    availableCapacity: 22,
    unit: 'consultations/day',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-15T15:00:00Z',
    operatingHours: 'OPD 09:00 - 16:30; Emergency Casualty 24/7',
    accessibilityFeatures: ['Emergency ambulance pickup available', 'Stretcher and wheelchair bays', 'Social work desk'],
    eligibilityCriteria: ['Uninsured or indigent patients', 'No fee charged', 'Free pharmacy medicines provided'],
    emergencyContact: '+91 80 2559 1325'
  },
  {
    id: 'res-doc-01',
    organisationId: 'org-hasiru-dala',
    organisationName: 'Hasiru Dala Social Security & Documentation Cell',
    category: 'identity_docs',
    name: 'Mobile Legal Identity & Social Welfare Entitlement Camp',
    description: 'Assistance with Aadhaar enrolment without permanent address proof, Ayushman Bharat health card generation, senior citizen pension applications.',
    location: {
      lat: 12.9620,
      lng: 77.5750,
      zone: 'Kalasipalya / KR Market',
      address: 'Near Old Bus Stand Community Hall, Kalasipalya'
    },
    totalCapacity: 45,
    availableCapacity: 14,
    unit: 'cases/day',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-15T14:00:00Z',
    operatingHours: '10:00 - 17:00 Monday to Saturday',
    accessibilityFeatures: ['Kannada, Hindi, Tamil & Telugu paralegal volunteers', 'Biometric mobile kit'],
    eligibilityCriteria: ['Street dwellers, unorganized workers, abandoned elderly', 'No fee charged'],
    emergencyContact: '+91 80 2346 8812'
  },
  {
    id: 'res-ch-01',
    organisationId: 'org-bosco',
    organisationName: 'BOSCO Mane Child & Youth Care',
    category: 'child_protection',
    name: 'BOSCO 24/7 Child Protection & Railway Childline Station',
    description: 'Safe haven for runaway, lost, or vulnerable children found at railway stations or streets, with psycho-social counseling and family reunification.',
    location: {
      lat: 12.9770,
      lng: 77.5700,
      zone: 'Majestic / KSR Hub',
      address: 'KSR Bengaluru City Railway Station Platform 1 Child Assistance Booth'
    },
    totalCapacity: 25,
    availableCapacity: 9,
    unit: 'children accommodation',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-15T16:00:00Z',
    operatingHours: '24/7 Emergency Child Welfare Intake',
    accessibilityFeatures: ['Certified Child Welfare Committee (CWC) counselors', 'Separated boys & girls dormitories'],
    eligibilityCriteria: ['Under 18 years of age in need of care and protection (JJ Act 2015 compliant)'],
    emergencyContact: '+91 80 2670 0767'
  },
  {
    id: 'res-sk-01',
    organisationId: 'org-samarthanam',
    organisationName: 'Samarthanam Trust for Human Welfare',
    category: 'skill_development',
    name: 'Livelihood & Vocational Training Academy',
    description: 'Certification in computer basics, retail operations, packaging, tailoring, and micro-entrepreneurship support for rehabilitated youth and adults.',
    location: {
      lat: 12.9352,
      lng: 77.6245,
      zone: 'Koramangala / Dairy Circle',
      address: 'Sector 4, HSR Layout, Bengaluru'
    },
    totalCapacity: 50,
    availableCapacity: 18,
    unit: 'trainees/cohort',
    verifiedStatus: 'verified',
    verifiedAt: '2026-11-14T11:00:00Z',
    operatingHours: '09:30 - 17:00 Monday to Friday',
    accessibilityFeatures: ['Screen reader equipped PCs', 'Sign language interpreters', 'Stipend provided'],
    eligibilityCriteria: ['Individuals transitioning out of homelessness or rehabilitation'],
    emergencyContact: '+91 80 2572 1444'
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-001',
    name: 'Ananya Deshpande',
    phone: '+91 98451 90214',
    email: 'ananya.d@udaan-network.org',
    languages: ['kn', 'en', 'hi'],
    assignedZones: ['Majestic / KSR Hub', 'Malleshwaram / Rajajinagar'],
    skills: ['First Aid Certified', 'Geriatric Counseling', 'Kannada Native Speaker'],
    availability: 'available',
    verificationStatus: 'verified',
    activeTasksCount: 2,
    completedInterventions: 34,
    joinedDate: '2025-04-10'
  },
  {
    id: 'vol-002',
    name: 'Syed Zeeshan',
    phone: '+91 99014 33281',
    email: 'zeeshan.s@udaan-network.org',
    languages: ['hi', 'en', 'kn', 'ta'],
    assignedZones: ['Shivajinagar / Cantonment', 'Kalasipalya / KR Market'],
    skills: ['Emergency Food Logistics', 'Crisis De-escalation', 'Mobile Intake Navigation'],
    availability: 'available',
    verificationStatus: 'verified',
    activeTasksCount: 1,
    completedInterventions: 48,
    joinedDate: '2025-02-18'
  },
  {
    id: 'vol-003',
    name: 'Kavitha Ramesh',
    phone: '+91 97412 88719',
    email: 'kavitha.r@udaan-network.org',
    languages: ['kn', 'en', 'te'],
    assignedZones: ['Kalasipalya / KR Market', 'Koramangala / Dairy Circle'],
    skills: ['Social Welfare Documentation', 'Healthcare Liaison', 'Child Counseling'],
    availability: 'busy',
    verificationStatus: 'verified',
    activeTasksCount: 3,
    completedInterventions: 52,
    joinedDate: '2024-11-05'
  }
];

export const INITIAL_VOLUNTEER_TASKS: VolunteerTask[] = [
  {
    id: 'task-v-001',
    volunteerId: 'vol-001',
    volunteerName: 'Ananya Deshpande',
    caseId: 'CASE-2026-0891',
    beneficiaryName: 'Ramesh Rao',
    title: 'Food Delivery & Leg Wound Hospital Escort',
    description: 'Deliver hot meal packet from Robin Hood Army point at KSR Platform 10 subway, then escort to Bowring Community Health Desk for leg ulcer care.',
    location: 'Majestic Railway Station Underpass, Bengaluru',
    urgency: 'high',
    status: 'In Progress',
    assignedAt: '2026-11-15T17:35:00Z',
    notes: 'Food delivered successfully. Escort in transit.'
  },
  {
    id: 'task-v-002',
    volunteerId: 'vol-001',
    volunteerName: 'Ananya Deshpande',
    caseId: 'CASE-2026-0895',
    beneficiaryName: 'Laxmi Devi (72)',
    title: 'Warm Blanket & Night Shelter Verification',
    description: 'Distribute thermal fleece blanket and coordinate check-in at Subhash Nagar BBMP Shelter before temperature drops.',
    location: 'Near Sangolli Rayanna Bus Terminus, Majestic',
    urgency: 'medium',
    status: 'Completed',
    assignedAt: '2026-11-15T16:00:00Z',
    completedAt: '2026-11-15T18:30:00Z',
    notes: 'Beneficiary admitted safely to Subhash Nagar Shelter bed #14.'
  },
  {
    id: 'task-v-003',
    volunteerId: 'vol-002',
    volunteerName: 'Syed Zeeshan',
    caseId: 'CASE-2026-0899',
    beneficiaryName: 'Migrant Family (3 members)',
    title: 'Emergency Ration Packets & Child Milk Supply',
    description: 'Deliver 3 dry ration packages and fresh milk supply to temporary transit shed near Peenya 2nd Stage.',
    location: 'Peenya Industrial Area, Bengaluru',
    urgency: 'high',
    status: 'Assigned',
    assignedAt: '2026-11-15T18:00:00Z',
    notes: 'Awaiting volunteer pickup confirmation.'
  }
];

export const INITIAL_CASES: AssistanceCase[] = [
  {
    id: 'CASE-2026-0891',
    beneficiary: {
      id: 'ben-0891',
      identifierName: 'Ramesh Rao',
      isAnonymous: false,
      preferredLanguage: 'kn',
      contactMethod: 'In person via Volunteer Ananya (Majestic Hub)',
      approximateLocation: {
        lat: 12.9779,
        lng: 77.5714,
        zone: 'Majestic / KSR Hub',
        landmark: 'Platform 10 Outer Wall Subway, Sangolli Rayanna Station',
        address: 'Majestic Railway Station Underpass, Bengaluru'
      },
      categories: ['food_water', 'emergency_shelter', 'medical_support', 'elderly_care'],
      numberOfPeople: 1,
      description: 'Senior citizen (~68 yrs) sitting on sidewalk. Has not eaten in ~24 hours. Swollen right lower leg with infected laceration. Unable to walk comfortably. Speaks Kannada.',
      immediateDanger: false,
      accessibilityNeeds: 'Mobility impaired, needs wheelchair or arm support to walk',
      additionalRequirements: 'Kannada speaker, needs daily dressings for leg ulcer',
      reportedByRole: 'volunteer',
      reporterName: 'Ananya Deshpande (Volunteer #vol-001)',
      createdAt: '2026-11-15T17:30:00Z',
      updatedAt: '2026-11-15T18:15:00Z'
    },
    aiAssessment: {
      food_assistance: 'required',
      shelter: 'required',
      medical_evaluation: 'required',
      clothing_hygiene: 'recommended',
      identity_docs: 'recommended',
      elderly_care: 'required',
      child_protection: 'not_indicated',
      education: 'not_indicated',
      employment: 'not_indicated',
      rehabilitation: 'recommended',
      urgency: 'high',
      human_review: true,
      numberOfPeople: 1,
      extractedLocation: 'Majestic / KSR Hub, Bengaluru',
      assistanceTypes: ['food', 'shelter', 'medical', 'elderly_care'],
      safety_alert: 'Infected leg laceration in elderly individual requires urgent clinical wound dressing to prevent systemic sepsis.',
      detected_needs_summary: 'Elderly individual with acute starvation (24h+), lower limb ulcer/infection, and lacking shelter in high-traffic railway corridor.',
      suggested_action_steps: [
        'Immediate hydration and hot food provision via nearby Robin Hood Army evening point (250m)',
        'Dispatch field volunteer to coordinate transport to Bowring Hospital community desk or mobile clinic for leg wound dressing',
        'Secure emergency elderly-friendly bed at Samarthanam Shelter or BBMP Subhash Nagar',
        'Initiate documentation trace for senior citizen entitlement cards'
      ],
      vulnerability_indicators: ['Elderly (60+)', 'Physical wound infection', 'Dehydration / Food deprivation', 'Exposed to elements'],
      ethical_safeguard_note: 'AI evaluation provides triage support only. Medical assessment requires clinical examination by registered physician.',
      confidence_score: 96
    },
    agentRecommendations: [
      {
        agentId: 'agent-need-assessment',
        agentName: 'Need Assessment Agent',
        role: 'Semantic parsing & urgency classification',
        icon: 'Sparkles',
        status: 'completed',
        verdict: 'High urgency composite case: Acute nutritional deprivation + infected extremity + homelessness.',
        actionRequired: true,
        details: 'Classified 4 core assistance vectors. Multi-agent dispatch initiated with high priority flag.',
        confidence: 97,
        matchedResourceIds: [],
        suggestedSteps: ['Assign dedicated field case officer', 'Prioritize immediate food and wound dressing before nightfall'],
        timestamp: '2026-11-15T17:31:10Z'
      },
      {
        agentId: 'agent-food',
        agentName: 'Food Assistance Agent',
        role: 'Food provider matching & distribution tracking',
        icon: 'Utensils',
        status: 'completed',
        verdict: 'Robin Hood Army evening distribution point located 280m from subject coordinates.',
        actionRequired: true,
        details: 'Active meal program #res-fd-01 has 65 hot balanced meals available right now at KSR Platform 10 exit.',
        confidence: 99,
        matchedResourceIds: ['res-fd-01'],
        suggestedSteps: ['Alert on-duty volunteer Sandeep Hegde for meal handover'],
        timestamp: '2026-11-15T17:31:18Z'
      },
      {
        agentId: 'agent-shelter',
        agentName: 'Shelter Coordination Agent',
        role: 'Verified capacity & accessibility matching',
        icon: 'Home',
        status: 'completed',
        verdict: 'Samarthanam Elderly Care Shelter has 5 verified beds with geriatric accessibility.',
        actionRequired: true,
        details: 'BBMP Subhash Nagar shelter also available (8 beds, 600m away), but Samarthanam offers superior post-wound recovery nursing support.',
        confidence: 94,
        matchedResourceIds: ['res-sh-02', 'res-sh-01'],
        suggestedSteps: ['Hold 1 bed at Samarthanam for 2 hours pending transport arrival'],
        timestamp: '2026-11-15T17:31:25Z'
      },
      {
        agentId: 'agent-healthcare',
        agentName: 'Healthcare Coordination Agent',
        role: 'Referral routing without medical diagnosis',
        icon: 'Stethoscope',
        status: 'completed',
        verdict: 'Clinical evaluation required for right lower extremity wound.',
        actionRequired: true,
        details: 'Bowring Community Health OPD / Emergency Desk notified. Free wound dressing, tetanus vaccination and antibiotics available without cost.',
        confidence: 98,
        matchedResourceIds: ['res-med-01'],
        suggestedSteps: ['Arrange low-floor ambulance or auto-rickshaw transit to Bowring Hospital Casualty'],
        timestamp: '2026-11-15T17:31:32Z'
      },
      {
        agentId: 'agent-rehabilitation',
        agentName: 'Rehabilitation Agent',
        role: 'Long-term pathway & social integration',
        icon: 'Compass',
        status: 'completed',
        verdict: 'Long-term 5-Stage Rehabilitation Pathway initiated.',
        actionRequired: false,
        details: 'Individual is eligible for Karnataka Sandhya Suraksha / Old Age Pension once identity card is verified.',
        confidence: 91,
        matchedResourceIds: ['res-doc-01', 'res-sk-01'],
        suggestedSteps: ['Schedule paralegal volunteer visit after wound stabilizes in 48 hours'],
        timestamp: '2026-11-15T17:31:40Z'
      }
    ],
    status: 'Under Review',
    urgency: 'high',
    assignedWorker: {
      id: 'vol-001',
      name: 'Ananya Deshpande',
      role: 'Field Volunteer Officer',
      phone: '+91 98451 90214'
    },
    assignedOrganisationId: 'org-samarthanam',
    assignedOrganisationName: 'Samarthanam Trust for Human Welfare',
    matchedResources: [
      {
        resource: INITIAL_RESOURCES[2],
        matchScore: 98,
        matchReasons: ['Immediate geographic proximity (280m)', 'Active distribution occurring right now', 'Hot soft nutrition suitable for elderly'],
        missingRequirements: [],
        proximityKm: 0.28,
        status: 'accepted'
      },
      {
        resource: INITIAL_RESOURCES[3],
        matchScore: 95,
        matchReasons: ['Specialized community geriatric wound clinic', 'Free medicines and triage', 'Zero ID requirement for casualty care'],
        missingRequirements: ['Requires field transit assistance'],
        proximityKm: 2.1,
        status: 'accepted'
      },
      {
        resource: INITIAL_RESOURCES[1],
        matchScore: 92,
        matchReasons: ['Specialized geriatric nursing wing', 'Ramp & wheelchair accessibility', 'Verified available bed capacity'],
        missingRequirements: ['Requires intake social worker approval'],
        proximityKm: 2.4,
        status: 'recommended'
      }
    ],
    referrals: [
      {
        id: 'ref-0891-1',
        caseId: 'CASE-2026-0891',
        resourceId: 'res-fd-01',
        organisationId: 'org-rha-blr',
        organisationName: 'Robin Hood Army & Janaseva Food Relief',
        category: 'food_water',
        urgency: 'high',
        status: 'Completed',
        approvedByCoordinator: true,
        coordinatorName: 'Kavitha Ramesh (MSW)',
        createdAt: '2026-11-15T17:35:00Z',
        updatedAt: '2026-11-15T17:42:00Z',
        completionNotes: 'Volunteer Ananya delivered hot dal khichdi and potable water bottle.'
      },
      {
        id: 'ref-0891-2',
        caseId: 'CASE-2026-0891',
        resourceId: 'res-med-01',
        organisationId: 'org-bowring',
        organisationName: 'Bowring & Lady Curzon Charitable Community Health Unit',
        category: 'medical_support',
        urgency: 'high',
        status: 'In Progress',
        approvedByCoordinator: true,
        coordinatorName: 'Kavitha Ramesh (MSW)',
        createdAt: '2026-11-15T17:35:00Z',
        updatedAt: '2026-11-15T18:00:00Z',
        completionNotes: 'Beneficiary admitted to casualty wound clinic; dressings in progress.'
      },
      {
        id: 'ref-0891-3',
        caseId: 'CASE-2026-0891',
        resourceId: 'res-sh-02',
        organisationId: 'org-samarthanam',
        organisationName: 'Samarthanam Trust for Human Welfare',
        category: 'emergency_shelter',
        urgency: 'high',
        status: 'Pending',
        approvedByCoordinator: false,
        createdAt: '2026-11-15T17:35:00Z',
        updatedAt: '2026-11-15T17:35:00Z'
      }
    ],
    rehabilitationPlanId: 'rehab-plan-0891',
    humanReviewApproved: false,
    consentGranted: true,
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2026-11-15T17:30:00Z',
        actor: 'Volunteer Ananya Deshpande',
        action: 'Reported humanitarian need via mobile conversational intake',
        note: 'Elderly individual with visible distress and swollen leg.'
      },
      {
        id: 'tl-2',
        timestamp: '2026-11-15T17:31:50Z',
        actor: 'UDAAN Multi-Agent Orchestrator',
        action: 'AI Need Assessment & Resource Matching Completed',
        note: 'Matched 3 verified providers. Flagged for human review.'
      }
    ],
    auditLogs: [
      {
        timestamp: '2026-11-15T17:30:05Z',
        actorId: 'vol-001',
        action: 'CREATE_ASSISTANCE_REQUEST',
        details: 'Submitted beneficiary case CASE-2026-0891'
      }
    ]
  },
  {
    id: 'CASE-2026-0895',
    beneficiary: {
      id: 'ben-0895',
      identifierName: 'Laxmi Devi',
      isAnonymous: false,
      preferredLanguage: 'hi',
      contactMethod: 'Near Sangolli Rayanna Bus Terminus Platform 3',
      approximateLocation: {
        lat: 12.9765,
        lng: 77.5725,
        zone: 'Majestic / KSR Hub',
        landmark: 'Near Sangolli Rayanna Bus Terminus Platform 3',
        address: 'Majestic Area, Bengaluru'
      },
      categories: ['emergency_shelter', 'clothing_hygiene'],
      numberOfPeople: 1,
      description: 'Elderly widow (~72 yrs) from Uttar Pradesh, arrived alone by train, without shelter or warm clothing in the cold evening.',
      immediateDanger: false,
      accessibilityNeeds: 'Elderly walking stick',
      additionalRequirements: 'Hindi speaking caseworker needed',
      reportedByRole: 'citizen',
      reporterName: 'Rahul Verma (Commuter)',
      createdAt: '2026-11-15T15:30:00Z',
      updatedAt: '2026-11-15T18:30:00Z'
    },
    aiAssessment: {
      food_assistance: 'recommended',
      shelter: 'required',
      medical_evaluation: 'not_indicated',
      clothing_hygiene: 'required',
      identity_docs: 'recommended',
      elderly_care: 'required',
      child_protection: 'not_indicated',
      education: 'not_indicated',
      employment: 'not_indicated',
      rehabilitation: 'recommended',
      urgency: 'medium',
      human_review: true,
      numberOfPeople: 1,
      extractedLocation: 'Majestic Bus Terminus, Bengaluru',
      assistanceTypes: ['shelter', 'clothing', 'elderly_care'],
      detected_needs_summary: 'Elderly widow requiring overnight emergency shelter and warm clothing.',
      suggested_action_steps: ['Admit to Subhash Nagar BBMP night shelter', 'Distribute winter fleece blanket'],
      vulnerability_indicators: ['Elderly', 'Alone in city', 'Unsheltered'],
      ethical_safeguard_note: 'Triage evaluation verified.',
      confidence_score: 95
    },
    agentRecommendations: [],
    status: 'Completed',
    urgency: 'medium',
    assignedWorker: {
      id: 'vol-001',
      name: 'Ananya Deshpande',
      role: 'Field Volunteer Officer',
      phone: '+91 98451 90214'
    },
    assignedOrganisationId: 'org-bbmp-majestic',
    assignedOrganisationName: 'BBMP Urban Homeless Shelter — Subhash Nagar',
    matchedResources: [],
    referrals: [
      {
        id: 'ref-0895-1',
        caseId: 'CASE-2026-0895',
        resourceId: 'res-sh-01',
        organisationId: 'org-bbmp-majestic',
        organisationName: 'BBMP Urban Homeless Shelter — Subhash Nagar',
        category: 'emergency_shelter',
        urgency: 'medium',
        status: 'Completed',
        approvedByCoordinator: true,
        coordinatorName: 'Vivek Menon (Admin)',
        createdAt: '2026-11-15T16:00:00Z',
        updatedAt: '2026-11-15T18:30:00Z',
        completionNotes: 'Bed #14 allocated with hot shower and dinner.'
      }
    ],
    rehabilitationPlanId: 'rehab-plan-0895',
    humanReviewApproved: true,
    approvedBy: 'Dr. Vivek Menon',
    approvedAt: '2026-11-15T16:05:00Z',
    consentGranted: true,
    timeline: [
      {
        id: 'tl-895-1',
        timestamp: '2026-11-15T15:30:00Z',
        actor: 'Citizen Rahul Verma',
        action: 'Assistance request logged',
        note: 'Elderly woman sitting on bench with small cloth bag'
      },
      {
        id: 'tl-895-2',
        timestamp: '2026-11-15T18:30:00Z',
        actor: 'BBMP Shelter Desk',
        action: 'Shelter intake completed',
        note: 'Warm bed and food provided.'
      }
    ],
    auditLogs: []
  }
];

export const INITIAL_REHAB_PLANS: RehabilitationPlan[] = [
  {
    id: 'rehab-plan-0891',
    caseId: 'CASE-2026-0891',
    beneficiaryName: 'Ramesh Rao',
    assignedCaseworker: 'Kavitha Ramesh (MSW Caseworker)',
    startedAt: '2026-11-15T18:00:00Z',
    targetCompletionDate: '2027-05-15T00:00:00Z',
    currentStage: 2,
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: Immediate Relief',
        description: 'Provide food, emergency shelter, and essential healthcare/wound treatment.',
        status: 'completed',
        milestones: [
          {
            id: 'm-1-1',
            title: 'Initial nutritious meal & clean drinking water',
            completed: true,
            completedAt: '2026-11-15T17:42:00Z',
            verifiedByWorker: 'Ananya Deshpande',
            notes: 'Meal received from Robin Hood Army point.'
          },
          {
            id: 'm-1-2',
            title: 'Emergency wound debridement & dressing at Bowring Hospital',
            completed: true,
            completedAt: '2026-11-15T19:10:00Z',
            verifiedByWorker: 'Dr. Aruna Shenoy',
            notes: 'Tetanus toxoid given and wound dressed.'
          },
          {
            id: 'm-1-3',
            title: 'Admission into verified safe overnight shelter',
            completed: true,
            completedAt: '2026-11-15T20:00:00Z',
            verifiedByWorker: 'Prashanth Kumar',
            notes: 'Bed reserved at Samarthanam Elderly Shelter.'
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Stabilisation',
        description: 'Documentation assistance (Aadhaar/pension), access to welfare services, continued support.',
        status: 'current',
        milestones: [
          {
            id: 'm-2-1',
            title: 'Address-less Aadhaar enrolment via Hasiru Dala',
            completed: false,
            notes: 'Paralegal visit scheduled for Day 2.'
          },
          {
            id: 'm-2-2',
            title: 'Application for Karnataka Sandhya Suraksha Senior Pension',
            completed: false,
            notes: 'Awaiting biometric confirmation.'
          },
          {
            id: 'm-2-3',
            title: 'Enrolment in Ayushman Bharat PM-JAY Free Health Scheme',
            completed: false
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Stage 3: Skill Development',
        description: 'Vocational training, education, and skill-building programmes tailored to individual capacity.',
        status: 'upcoming',
        milestones: [
          {
            id: 'm-3-1',
            title: 'Vocational interest & aptitude evaluation',
            completed: false
          },
          {
            id: 'm-3-2',
            title: 'Enrolment in light handicrafts / horticultural training cohort',
            completed: false
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Stage 4: Employment',
        description: 'Job opportunities, employment preparation, and partner organisation connections.',
        status: 'upcoming',
        milestones: [
          {
            id: 'm-4-1',
            title: 'Connection to senior-friendly micro-livelihood trust',
            completed: false
          },
          {
            id: 'm-4-2',
            title: 'First month stipend or pension direct deposit verified',
            completed: false
          }
        ]
      },
      {
        stageNumber: 5,
        title: 'Stage 5: Independent Living',
        description: 'Stable housing support, sustained progress, and long-term volunteer follow-up.',
        status: 'upcoming',
        milestones: [
          {
            id: 'm-5-1',
            title: 'Long-term assisted housing or family reunification finalized',
            completed: false
          },
          {
            id: 'm-5-2',
            title: 'Month 3 caseworker longitudinal wellbeing audit sign-off',
            completed: false
          }
        ]
      }
    ],
    caseworkerNotes: [
      'Beneficiary is alert and cooperative. Appreciated hot meal. Needs quiet rest and leg elevation.',
      'Approved initial referral for emergency wound dressing at Bowring Hospital.'
    ],
    aiNextStepRecommendations: [
      'Coordinate with volunteer Ananya to complete shelter bed intake at Samarthanam before 21:00.',
      'Notify Hasiru Dala legal aid team to initiate biometric Aadhaar retrieval using birth year verification.'
    ],
    outcomeIndicators: {
      immediateReliefProvided: true,
      identityAndWelfareRestored: false,
      skillCertified: false,
      employedOrSelfSufficient: false,
      independentHousingSecured: false
    }
  }
];
