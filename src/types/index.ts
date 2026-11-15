export type AssistanceCategory =
  | 'food_water'
  | 'emergency_shelter'
  | 'medical_support'
  | 'clothing_hygiene'
  | 'elderly_care'
  | 'child_protection'
  | 'identity_docs'
  | 'education'
  | 'skill_development'
  | 'employment'
  | 'rehabilitation';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

// Feature 4 required statuses
export type StandardCaseStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Matched'
  | 'Referral Initiated'
  | 'Assistance In Progress'
  | 'Completed';

// Backward compatible type alias
export type CaseStatus = StandardCaseStatus | string;

export type StandardReferralStatus =
  | 'Pending'
  | 'Accepted'
  | 'In Progress'
  | 'Completed'
  | 'Rejected';

export type UserRole =
  | 'beneficiary'
  | 'ngo_partner'
  | 'volunteer'
  | 'administrator'
  | 'social_worker';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  zone: string;
  landmark?: string;
  address?: string;
}

export interface BeneficiaryRequest {
  id: string;
  identifierName?: string;
  isAnonymous: boolean;
  preferredLanguage: 'en' | 'kn' | 'hi';
  contactMethod?: string;
  approximateLocation: LocationCoordinates;
  categories: AssistanceCategory[];
  numberOfPeople: number;
  description: string;
  immediateDanger: boolean;
  accessibilityNeeds?: string;
  additionalRequirements?: string;
  reportedByRole: 'self' | 'volunteer' | 'citizen' | 'field_worker';
  reporterName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIStructuredAssessment {
  food_assistance: 'required' | 'recommended' | 'not_indicated';
  shelter: 'required' | 'recommended' | 'not_indicated';
  medical_evaluation: 'required' | 'recommended' | 'not_indicated';
  clothing_hygiene: 'required' | 'recommended' | 'not_indicated';
  identity_docs: 'required' | 'recommended' | 'not_indicated';
  elderly_care: 'required' | 'recommended' | 'not_indicated';
  child_protection: 'required' | 'recommended' | 'not_indicated';
  education: 'required' | 'recommended' | 'not_indicated';
  employment: 'required' | 'recommended' | 'not_indicated';
  rehabilitation: 'required' | 'recommended' | 'not_indicated';
  urgency: UrgencyLevel;
  human_review: boolean;
  numberOfPeople: number;
  extractedLocation: string;
  assistanceTypes: string[];
  safety_alert?: string;
  detected_needs_summary: string;
  suggested_action_steps: string[];
  vulnerability_indicators: string[];
  ethical_safeguard_note: string;
  confidence_score: number;
}

export interface AgentRecommendation {
  agentId: string;
  agentName: string;
  role: string;
  icon: string;
  status: 'idle' | 'analyzing' | 'completed' | 'flagged';
  verdict: string;
  actionRequired: boolean;
  details: string;
  confidence: number;
  matchedResourceIds: string[];
  suggestedSteps: string[];
  timestamp: string;
}

export interface MatchedResource {
  resource: ResourceItem;
  matchScore: number; // 0 to 100
  matchReasons: string[];
  missingRequirements: string[];
  proximityKm: number;
  status: 'recommended' | 'accepted' | 'pending_referral' | 'rejected';
  rejectionReason?: string;
}

export interface Referral {
  id: string;
  caseId: string;
  resourceId: string;
  organisationId: string;
  organisationName: string;
  category: AssistanceCategory;
  urgency: UrgencyLevel;
  status: StandardReferralStatus;
  rejectionReason?: string;
  approvedByCoordinator: boolean;
  approvedBySocialWorker?: boolean;
  coordinatorName?: string;
  createdAt: string;
  updatedAt: string;
  completionNotes?: string;
}

export interface AssistanceCase {
  id: string;
  beneficiary: BeneficiaryRequest;
  aiAssessment: AIStructuredAssessment;
  agentRecommendations: AgentRecommendation[];
  status: StandardCaseStatus;
  urgency: UrgencyLevel;
  assignedWorker?: {
    id: string;
    name: string;
    role: string;
    phone: string;
  };
  assignedOrganisationId?: string;
  assignedOrganisationName?: string;
  matchedResources: MatchedResource[];
  referrals: Referral[];
  rehabilitationPlanId?: string;
  humanReviewApproved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  consentGranted: boolean;
  timeline: {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    note?: string;
  }[];
  auditLogs: {
    timestamp: string;
    actorId: string;
    action: string;
    details: string;
  }[];
}

export interface ResourceItem {
  id: string;
  organisationId: string;
  organisationName: string;
  category: AssistanceCategory;
  name: string;
  description: string;
  location: LocationCoordinates;
  totalCapacity: number;
  availableCapacity: number;
  unit: string;
  verifiedStatus: 'verified' | 'pending_verification' | 'unverified';
  verifiedAt: string;
  operatingHours: string;
  accessibilityFeatures: string[];
  eligibilityCriteria: string[];
  emergencyContact: string;
  distanceKm?: number;
}

export interface Organisation {
  id: string;
  name: string;
  registrationNumber: string;
  serviceCategories: AssistanceCategory[];
  coverageZones: string[];
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  operatingHours: string;
  verifiedStatus: 'verified' | 'pending_verification';
  activeSheltersCount: number;
  activeMealProgramsCount: number;
  rating: number;
  referralsReceived: number;
  referralsFulfilled: number;
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  languages: ('en' | 'kn' | 'hi' | 'te' | 'ta')[];
  assignedZones: string[];
  skills: string[];
  availability: 'available' | 'busy' | 'offline';
  verificationStatus: 'verified' | 'pending';
  activeTasksCount: number;
  completedInterventions: number;
  joinedDate: string;
}

export interface VolunteerTask {
  id: string;
  volunteerId: string;
  volunteerName: string;
  caseId: string;
  beneficiaryName: string;
  title: string;
  description: string;
  location: string;
  urgency: UrgencyLevel;
  status: 'Assigned' | 'Accepted' | 'In Progress' | 'Completed';
  assignedAt: string;
  completedAt?: string;
  notes?: string;
}

export interface RehabilitationStage {
  stageNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string;
    completedAt?: string;
    verifiedByWorker?: string;
    notes?: string;
  }[];
}

export interface RehabilitationPlan {
  id: string;
  caseId: string;
  beneficiaryName: string;
  assignedCaseworker: string;
  assignedSocialWorker?: string;
  startedAt: string;
  targetCompletionDate: string;
  currentStage: number; // 1 to 5
  stages: RehabilitationStage[];
  caseworkerNotes: string[];
  socialWorkerNotes?: string[];
  aiNextStepRecommendations: string[];
  outcomeIndicators: {
    immediateReliefProvided: boolean;
    identityAndWelfareRestored: boolean;
    skillCertified: boolean;
    employedOrSelfSufficient: boolean;
    independentHousingSecured: boolean;
    healthStabilized?: boolean;
    shelterSecured?: boolean;
    identityRestored?: boolean;
    independentHousing?: boolean;
  };
}

export interface CityZoneMetrics {
  id: string;
  name: string;
  coordinates: [number, number];
  radius: number;
  unresolvedRequests: number;
  activeCases: number;
  foodDemand: number;
  foodCapacity: number;
  shelterDemand: number;
  shelterCapacity: number;
  healthcareAccessIndex: number;
  volunteerCoverageCount: number;
  outreachNeededUrgency: UrgencyLevel;
  shortageSummary: string;
  verifiedOrganisationsCount: number;
}
