import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AssistanceCase,
  ResourceItem,
  Organisation,
  Volunteer,
  VolunteerTask,
  RehabilitationPlan,
  CityZoneMetrics,
  BeneficiaryRequest,
  Referral,
  MatchedResource,
  StandardCaseStatus,
  StandardReferralStatus
} from '../types';
import {
  INITIAL_CASES,
  INITIAL_RESOURCES,
  INITIAL_ORGANISATIONS,
  INITIAL_VOLUNTEERS,
  INITIAL_VOLUNTEER_TASKS,
  INITIAL_REHAB_PLANS
} from '../data/mockData';
import { BENGALURU_ZONES } from '../data/bengaluruZones';
import { geminiService } from '../services/geminiService';
import { matchResourcesForRequest } from '../services/matchingEngine';

interface ScenarioSimulationResult {
  additionalBeds: number;
  additionalMeals: number;
  demandSurgePercent: number;
  targetZoneId?: string;
  improvedZones: {
    zoneName: string;
    priorShelterShortage: number;
    newShelterShortage: number;
    priorFoodShortage: number;
    newFoodShortage: number;
    casesPositivelyImpacted: number;
  }[];
  totalCasesRelieved: number;
  remainingCitywideShelterShortage: number;
  remainingCitywideFoodShortage: number;
  suggestedAllocationStrategy: string;
}

interface UDAANContextType {
  cases: AssistanceCase[];
  resources: ResourceItem[];
  organisations: Organisation[];
  volunteers: Volunteer[];
  volunteerTasks: VolunteerTask[];
  rehabPlans: RehabilitationPlan[];
  cityZones: CityZoneMetrics[];
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  // Core Actions
  submitAssistanceRequest: (req: Partial<BeneficiaryRequest>) => Promise<AssistanceCase>;
  approveCase: (caseId: string, approvedBy: string) => void;
  updateCaseStatus: (caseId: string, status: StandardCaseStatus) => void;
  initiateReferral: (caseId: string, resourceId: string, coordinatorName: string) => void;
  respondToReferral: (
    referralId: string,
    action: StandardReferralStatus,
    explanation?: string
  ) => void;
  updateReferralStatus: (referralId: string, status: StandardReferralStatus, notes?: string) => void;
  updateVolunteerTaskStatus: (taskId: string, status: VolunteerTask['status'], notes?: string) => void;
  updateMilestone: (planId: string, stageNumber: number, milestoneId: string, completed: boolean) => void;
  updateResourceCapacity: (resourceId: string, newAvailableCapacity: number) => void;
  addResource: (resource: Omit<ResourceItem, 'id'>) => void;
  addOrganisation: (org: Omit<Organisation, 'id'>) => void;
  verifyOrganisation: (orgId: string, isVerified: boolean) => void;
  runScenarioSimulation: (
    additionalBeds: number,
    additionalMeals: number,
    targetZoneId?: string,
    demandSurgePercent?: number
  ) => ScenarioSimulationResult;
  getCaseById: (caseId: string) => AssistanceCase | undefined;
  resetToDefaultData: () => void;
  // Guided Demo state
  guidedDemoActive: boolean;
  setGuidedDemoActive: (val: boolean) => void;
  activeDemoStep: number;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  resetDemoWorkflow: () => void;
}

const UDAANContext = createContext<UDAANContextType | undefined>(undefined);

export const UDAANProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<AssistanceCase[]>(() => {
    const saved = localStorage.getItem('udaan_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('udaan_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [organisations, setOrganisations] = useState<Organisation[]>(() => {
    const saved = localStorage.getItem('udaan_organisations');
    return saved ? JSON.parse(saved) : INITIAL_ORGANISATIONS;
  });

  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => {
    const saved = localStorage.getItem('udaan_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [volunteerTasks, setVolunteerTasks] = useState<VolunteerTask[]>(() => {
    const saved = localStorage.getItem('udaan_volunteer_tasks');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_TASKS;
  });

  const [rehabPlans, setRehabPlans] = useState<RehabilitationPlan[]>(() => {
    const saved = localStorage.getItem('udaan_rehab_plans');
    return saved ? JSON.parse(saved) : INITIAL_REHAB_PLANS;
  });

  const [cityZones, setCityZones] = useState<CityZoneMetrics[]>(() => {
    const saved = localStorage.getItem('udaan_city_zones');
    return saved ? JSON.parse(saved) : BENGALURU_ZONES;
  });

  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [guidedDemoActive, setGuidedDemoActive] = useState<boolean>(false);
  const [activeDemoStep, setActiveDemoStep] = useState<number>(1);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('udaan_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('udaan_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('udaan_organisations', JSON.stringify(organisations));
  }, [organisations]);

  useEffect(() => {
    localStorage.setItem('udaan_volunteer_tasks', JSON.stringify(volunteerTasks));
  }, [volunteerTasks]);

  useEffect(() => {
    localStorage.setItem('udaan_rehab_plans', JSON.stringify(rehabPlans));
  }, [rehabPlans]);

  const getCaseById = (caseId: string): AssistanceCase | undefined => {
    const clean = caseId.trim().toLowerCase();
    return cases.find(c => c.id.toLowerCase() === clean);
  };

  /**
   * FEATURE 1: AI-Powered Need Assessment and Request Submission
   */
  const submitAssistanceRequest = async (
    reqData: Partial<BeneficiaryRequest>
  ): Promise<AssistanceCase> => {
    const now = new Date().toISOString();
    const caseId = `CASE-2026-${Date.now().toString().slice(-4)}`;

    const fullRequest: BeneficiaryRequest = {
      id: `ben-${Date.now().toString().slice(-4)}`,
      identifierName: reqData.identifierName || 'Anonymous Individual',
      isAnonymous: reqData.isAnonymous ?? false,
      preferredLanguage: reqData.preferredLanguage || 'en',
      contactMethod: reqData.contactMethod || 'Field volunteer intake',
      approximateLocation: reqData.approximateLocation || {
        lat: 12.9778,
        lng: 77.5713,
        zone: 'Majestic / KSR Hub',
        address: 'Majestic Area, Bengaluru'
      },
      categories: reqData.categories || ['food_water', 'emergency_shelter'],
      numberOfPeople: reqData.numberOfPeople || 1,
      description: reqData.description || 'Assistance requested.',
      immediateDanger: reqData.immediateDanger ?? false,
      accessibilityNeeds: reqData.accessibilityNeeds || '',
      additionalRequirements: reqData.additionalRequirements || '',
      reportedByRole: reqData.reportedByRole || 'citizen',
      reporterName: reqData.reporterName || 'Field Reporter',
      createdAt: now,
      updatedAt: now
    };

    // Run Gemini Multi-Agent Orchestrator
    const agentResult = await geminiService.runMultiAgentCoordination(fullRequest, resources);

    // Compute Resource Matches
    const matched = matchResourcesForRequest(fullRequest, resources);

    // Generate Initial Referrals based on top matches
    const referrals: Referral[] = matched.slice(0, 3).map((m, idx) => ({
      id: `ref-${caseId}-${idx + 1}`,
      caseId,
      resourceId: m.resource.id,
      organisationId: m.resource.organisationId,
      organisationName: m.resource.organisationName,
      category: m.resource.category,
      urgency: agentResult.structuredAssessment.urgency,
      status: 'Pending',
      approvedByCoordinator: false,
      createdAt: now,
      updatedAt: now
    }));

    // FEATURE 5: 5-Stage Rehabilitation Plan Template
    const planId = `rehab-plan-${caseId}`;
    const newRehabPlan: RehabilitationPlan = {
      id: planId,
      caseId,
      beneficiaryName: fullRequest.identifierName || 'Beneficiary',
      assignedCaseworker: 'Kavitha Ramesh (MSW Caseworker)',
      startedAt: now,
      targetCompletionDate: new Date(Date.now() + 180 * 86400000).toISOString(),
      currentStage: 1,
      stages: [
        {
          stageNumber: 1,
          title: 'Stage 1: Immediate Relief',
          description: 'Provide food, emergency shelter, and essential healthcare/wound treatment.',
          status: 'current',
          milestones: [
            {
              id: `m1-1-${caseId}`,
              title: 'Provide immediate nutritious food & clean drinking water',
              completed: false,
              notes: 'Pending initial delivery'
            },
            {
              id: `m1-2-${caseId}`,
              title: 'Health triage / physical examination at charitable hospital desk',
              completed: false
            },
            {
              id: `m1-3-${caseId}`,
              title: 'Intake into verified safe shelter accommodation',
              completed: false
            }
          ]
        },
        {
          stageNumber: 2,
          title: 'Stage 2: Stabilisation',
          description: 'Documentation assistance (Aadhaar/pension), access to welfare services, continued support.',
          status: 'upcoming',
          milestones: [
            { id: `m2-1-${caseId}`, title: 'Aadhaar biometric enrolment without address proof', completed: false },
            { id: `m2-2-${caseId}`, title: 'Social security welfare pension / Ayushman card linkage', completed: false }
          ]
        },
        {
          stageNumber: 3,
          title: 'Stage 3: Skill Development',
          description: 'Vocational training, education, and skill-building programmes tailored to individual capacity.',
          status: 'upcoming',
          milestones: [
            { id: `m3-1-${caseId}`, title: 'Vocational interest & aptitude assessment', completed: false },
            { id: `m3-2-${caseId}`, title: 'Enrolment in skill-training cohort', completed: false }
          ]
        },
        {
          stageNumber: 4,
          title: 'Stage 4: Employment',
          description: 'Job opportunities, employment preparation, and partner organisation connections.',
          status: 'upcoming',
          milestones: [
            { id: `m4-1-${caseId}`, title: 'Placement with supportive partner employer or livelihood trust', completed: false }
          ]
        },
        {
          stageNumber: 5,
          title: 'Stage 5: Independent Living',
          description: 'Stable housing support, sustained progress, and long-term volunteer follow-up.',
          status: 'upcoming',
          milestones: [
            { id: `m5-1-${caseId}`, title: 'Transition to stable long-term housing', completed: false },
            { id: `m5-2-${caseId}`, title: 'Month 3 caseworker longitudinal wellbeing audit sign-off', completed: false }
          ]
        }
      ],
      aiNextStepRecommendations: agentResult.structuredAssessment.suggested_action_steps,
      caseworkerNotes: ['Intake created automatically via AI Multi-Agent pipeline. Awaiting coordinator review.'],
      outcomeIndicators: {
        immediateReliefProvided: false,
        identityAndWelfareRestored: false,
        skillCertified: false,
        employedOrSelfSufficient: false,
        independentHousingSecured: false
      }
    };

    const newCase: AssistanceCase = {
      id: caseId,
      beneficiary: fullRequest,
      aiAssessment: agentResult.structuredAssessment,
      agentRecommendations: agentResult.agentRecommendations,
      status: 'Submitted',
      urgency: agentResult.structuredAssessment.urgency,
      matchedResources: matched,
      referrals,
      rehabilitationPlanId: planId,
      humanReviewApproved: false,
      consentGranted: true,
      timeline: [
        {
          id: `tl-create-${caseId}`,
          timestamp: now,
          actor: fullRequest.reporterName || 'Intake Reporter',
          action: 'Assistance request logged in UDAAN network (Status: Submitted)',
          note: fullRequest.description
        },
        {
          id: `tl-ai-${caseId}`,
          timestamp: now,
          actor: 'UDAAN Multi-Agent Orchestrator',
          action: 'AI Need Assessment & Smart Resource Matching Completed (Status: Under Review)',
          note: agentResult.structuredAssessment.detected_needs_summary
        }
      ],
      auditLogs: [
        {
          timestamp: now,
          actorId: 'system',
          action: 'ASSISTANCE_REQUEST_REGISTERED',
          details: `Case ${caseId} created for ${fullRequest.identifierName}`
        }
      ]
    };

    setCases(prev => [newCase, ...prev]);
    setRehabPlans(prev => [newRehabPlan, ...prev]);

    // Update zone metrics for the affected zone
    setCityZones(prev =>
      prev.map(z => {
        if (z.name === fullRequest.approximateLocation.zone) {
          return {
            ...z,
            unresolvedRequests: z.unresolvedRequests + 1,
            activeCases: z.activeCases + 1,
            foodDemand: fullRequest.categories.includes('food_water') ? z.foodDemand + 1 : z.foodDemand,
            shelterDemand: fullRequest.categories.includes('emergency_shelter') ? z.shelterDemand + 1 : z.shelterDemand
          };
        }
        return z;
      })
    );

    return newCase;
  };

  /**
   * FEATURE 4: Coordinator Review & Human Approval Gate
   */
  const approveCase = (caseId: string, approvedBy: string) => {
    const now = new Date().toISOString();
    setCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          const topOrg = c.matchedResources[0]?.resource;
          return {
            ...c,
            humanReviewApproved: true,
            approvedBy,
            approvedAt: now,
            status: 'Referral Initiated' as StandardCaseStatus,
            assignedOrganisationId: topOrg?.organisationId,
            assignedOrganisationName: topOrg?.organisationName,
            referrals: c.referrals.map(r => ({
              ...r,
              approvedByCoordinator: true,
              coordinatorName: approvedBy,
              updatedAt: now
            })),
            timeline: [
              ...c.timeline,
              {
                id: `tl-app-${Date.now()}`,
                timestamp: now,
                actor: approvedBy,
                action: 'Human Coordinator Approval Granted (Status: Referral Initiated)',
                note: 'Referrals authorized and dispatched to partner organizations.'
              }
            ],
            auditLogs: [
              ...c.auditLogs,
              {
                timestamp: now,
                actorId: approvedBy,
                action: 'HUMAN_APPROVAL_GRANTED',
                details: `Case ${caseId} authorized for partner referral fulfillment.`
              }
            ]
          };
        }
        return c;
      })
    );
  };

  const updateCaseStatus = (caseId: string, status: StandardCaseStatus) => {
    const now = new Date().toISOString();
    setCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            status,
            timeline: [
              ...c.timeline,
              {
                id: `tl-st-${Date.now()}`,
                timestamp: now,
                actor: 'System Coordinator',
                action: `Case status updated to ${status}`
              }
            ]
          };
        }
        return c;
      })
    );
  };

  /**
   * FEATURE 2: Coordinator Initiates a Referral
   */
  const initiateReferral = (caseId: string, resourceId: string, coordinatorName: string) => {
    const now = new Date().toISOString();
    const targetResource = resources.find(r => r.id === resourceId);
    if (!targetResource) return;

    setCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          const newRef: Referral = {
            id: `ref-${caseId}-${Date.now().toString().slice(-4)}`,
            caseId,
            resourceId,
            organisationId: targetResource.organisationId,
            organisationName: targetResource.organisationName,
            category: targetResource.category,
            urgency: c.urgency,
            status: 'Pending',
            approvedByCoordinator: true,
            coordinatorName,
            createdAt: now,
            updatedAt: now
          };

          return {
            ...c,
            status: 'Referral Initiated' as StandardCaseStatus,
            referrals: [newRef, ...c.referrals],
            timeline: [
              ...c.timeline,
              {
                id: `tl-ref-init-${Date.now()}`,
                timestamp: now,
                actor: coordinatorName,
                action: `Referral initiated to ${targetResource.organisationName}`
              }
            ]
          };
        }
        return c;
      })
    );
  };

  /**
   * FEATURE 2 & 6: NGO Responds to Referral (Accept / Reject / Update)
   */
  const respondToReferral = (
    referralId: string,
    action: StandardReferralStatus,
    explanation?: string
  ) => {
    const now = new Date().toISOString();
    setCases(prev =>
      prev.map(c => {
        const hasRef = c.referrals.some(r => r.id === referralId);
        if (!hasRef) return c;

        const updatedReferrals = c.referrals.map(r => {
          if (r.id === referralId) {
            return {
              ...r,
              status: action as StandardReferralStatus,
              rejectionReason: action === 'Rejected' ? explanation : undefined,
              completionNotes: action === 'Completed' ? explanation : r.completionNotes,
              updatedAt: now
            };
          }
          return r;
        });

        // Determine new Case Status based on prompt's 6 statuses
        let newCaseStatus: StandardCaseStatus = c.status as StandardCaseStatus;
        if (action === 'Accepted') {
          newCaseStatus = 'Assistance In Progress';
        } else if (action === 'In Progress') {
          newCaseStatus = 'Assistance In Progress';
        } else if (action === 'Completed') {
          const allCompleted = updatedReferrals.every(r => r.status === 'Completed' || r.status === 'Rejected');
          if (allCompleted) newCaseStatus = 'Completed';
        }

        return {
          ...c,
          status: newCaseStatus,
          referrals: updatedReferrals,
          timeline: [
            ...c.timeline,
            {
              id: `tl-ref-resp-${Date.now()}`,
              timestamp: now,
              actor: 'NGO Partner Desk',
              action: `Referral ${action.toUpperCase()}`,
              note: explanation
            }
          ]
        };
      })
    );
  };

  const updateReferralStatus = (
    referralId: string,
    status: StandardReferralStatus,
    notes?: string
  ) => {
    respondToReferral(referralId, status, notes);
  };

  /**
   * FEATURE 6: Volunteer Task Progress
   */
  const updateVolunteerTaskStatus = (
    taskId: string,
    status: VolunteerTask['status'],
    notes?: string
  ) => {
    const now = new Date().toISOString();
    setVolunteerTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status,
            completedAt: status === 'Completed' ? now : undefined,
            notes: notes || t.notes
          };
        }
        return t;
      })
    );
  };

  /**
   * FEATURE 5: Caseworker Updates Milestone in 5-Stage Pathway
   */
  const updateMilestone = (
    planId: string,
    stageNumber: number,
    milestoneId: string,
    completed: boolean
  ) => {
    const now = new Date().toISOString();
    setRehabPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;

        const updatedStages = p.stages.map(st => {
          if (st.stageNumber !== stageNumber) return st;

          const updatedMilestones = st.milestones.map(m => {
            if (m.id === milestoneId) {
              return {
                ...m,
                completed,
                completedAt: completed ? now : undefined
              };
            }
            return m;
          });

          const allMilestonesDone = updatedMilestones.every(m => m.completed);
          return {
            ...st,
            status: allMilestonesDone ? ('completed' as const) : ('current' as const),
            milestones: updatedMilestones
          };
        });

        // Advance currentStage if all milestones in current stage are completed
        const currentStageObj = updatedStages.find(s => s.stageNumber === p.currentStage);
        let nextStageNumber = p.currentStage;
        if (currentStageObj && currentStageObj.milestones.every(m => m.completed) && p.currentStage < 5) {
          nextStageNumber = p.currentStage + 1;
          const nextStageObj = updatedStages.find(s => s.stageNumber === nextStageNumber);
          if (nextStageObj && nextStageObj.status === 'upcoming') {
            nextStageObj.status = 'current';
          }
        }

        return {
          ...p,
          currentStage: nextStageNumber,
          stages: updatedStages
        };
      })
    );
  };

  const updateResourceCapacity = (resourceId: string, newAvailableCapacity: number) => {
    setResources(prev =>
      prev.map(r => (r.id === resourceId ? { ...r, availableCapacity: newAvailableCapacity } : r))
    );
  };

  const addResource = (res: Omit<ResourceItem, 'id'>) => {
    const newRes: ResourceItem = {
      ...res,
      id: `res-${Date.now().toString().slice(-4)}`
    };
    setResources(prev => [newRes, ...prev]);
  };

  const addOrganisation = (org: Omit<Organisation, 'id'>) => {
    const newOrg: Organisation = {
      ...org,
      id: `org-${Date.now().toString().slice(-4)}`
    };
    setOrganisations(prev => [newOrg, ...prev]);
  };

  const verifyOrganisation = (orgId: string, isVerified: boolean) => {
    setOrganisations(prev =>
      prev.map(o => (o.id === orgId ? { ...o, verifiedStatus: isVerified ? 'verified' : 'pending_verification' } : o))
    );
  };

  /**
   * FEATURE 3: Humanitarian Digital Twin Scenario Simulator
   * "What happens if shelter demand increases by 30%?" or additional capacity is introduced.
   */
  const runScenarioSimulation = (
    additionalBeds: number,
    additionalMeals: number,
    targetZoneId?: string,
    demandSurgePercent: number = 0
  ): ScenarioSimulationResult => {
    let remainingBeds = additionalBeds;
    let remainingMeals = additionalMeals;

    const filteredZones = targetZoneId
      ? cityZones.filter(z => z.id === targetZoneId)
      : [...cityZones].sort((a, b) => (b.shelterDemand - b.shelterCapacity) - (a.shelterDemand - a.shelterCapacity));

    let totalRelieved = 0;
    const improved = filteredZones.map(zone => {
      // Apply demand surge multiplier (e.g. +30% shelter demand)
      const adjustedShelterDemand = Math.round(zone.shelterDemand * (1 + demandSurgePercent / 100));
      const adjustedFoodDemand = Math.round(zone.foodDemand * (1 + demandSurgePercent / 100));

      const priorShelterDeficit = Math.max(0, adjustedShelterDemand - zone.shelterCapacity);
      const priorFoodDeficit = Math.max(0, adjustedFoodDemand - zone.foodCapacity);

      const allocatedBeds = Math.min(priorShelterDeficit, remainingBeds);
      remainingBeds -= allocatedBeds;

      const allocatedMeals = Math.min(priorFoodDeficit, remainingMeals);
      remainingMeals -= allocatedMeals;

      const newShelterShortage = priorShelterDeficit - allocatedBeds;
      const newFoodShortage = priorFoodDeficit - allocatedMeals;
      const casesRelieved = allocatedBeds + Math.floor(allocatedMeals / 2);

      totalRelieved += casesRelieved;

      return {
        zoneName: zone.name,
        priorShelterShortage: priorShelterDeficit,
        newShelterShortage,
        priorFoodShortage: priorFoodDeficit,
        newFoodShortage,
        casesPositivelyImpacted: casesRelieved
      };
    });

    const totalCitywideShelterShortage = improved.reduce((acc, curr) => acc + curr.newShelterShortage, 0);
    const totalCitywideFoodShortage = improved.reduce((acc, curr) => acc + curr.newFoodShortage, 0);

    return {
      additionalBeds,
      additionalMeals,
      demandSurgePercent,
      targetZoneId,
      improvedZones: improved,
      totalCasesRelieved: totalRelieved,
      remainingCitywideShelterShortage: totalCitywideShelterShortage,
      remainingCitywideFoodShortage: totalCitywideFoodShortage,
      suggestedAllocationStrategy:
        demandSurgePercent > 0
          ? `With a ${demandSurgePercent}% citywide demand surge, Kalasipalya and Majestic experience critical shelter shortages exceeding capacity. Strategic buffer allocation recommended.`
          : targetZoneId
          ? `Direct concentration of ${additionalBeds} beds into selected sector.`
          : `Prioritized allocation: Kalasipalya / KR Market received primary share (critical deficit), followed by Majestic Hub and Peenya Industrial Area.`
    };
  };

  const resetToDefaultData = () => {
    setCases(INITIAL_CASES);
    setResources(INITIAL_RESOURCES);
    setOrganisations(INITIAL_ORGANISATIONS);
    setVolunteers(INITIAL_VOLUNTEERS);
    setVolunteerTasks(INITIAL_VOLUNTEER_TASKS);
    setRehabPlans(INITIAL_REHAB_PLANS);
    setCityZones(BENGALURU_ZONES);
    localStorage.removeItem('udaan_cases');
    localStorage.removeItem('udaan_resources');
    localStorage.removeItem('udaan_organisations');
    localStorage.removeItem('udaan_volunteer_tasks');
    localStorage.removeItem('udaan_rehab_plans');
    localStorage.removeItem('udaan_city_zones');
  };

  const nextDemoStep = () => setActiveDemoStep(prev => Math.min(prev + 1, 8));
  const prevDemoStep = () => setActiveDemoStep(prev => Math.max(prev - 1, 1));
  const resetDemoWorkflow = () => setActiveDemoStep(1);

  return (
    <UDAANContext.Provider
      value={{
        cases,
        resources,
        organisations,
        volunteers,
        volunteerTasks,
        rehabPlans,
        cityZones,
        demoMode,
        setDemoMode,
        submitAssistanceRequest,
        approveCase,
        updateCaseStatus,
        initiateReferral,
        respondToReferral,
        updateReferralStatus,
        updateVolunteerTaskStatus,
        updateMilestone,
        updateResourceCapacity,
        addResource,
        addOrganisation,
        verifyOrganisation,
        runScenarioSimulation,
        getCaseById,
        resetToDefaultData,
        guidedDemoActive,
        setGuidedDemoActive,
        activeDemoStep,
        nextDemoStep,
        prevDemoStep,
        resetDemoWorkflow
      }}
    >
      {children}
    </UDAANContext.Provider>
  );
};

export const useUDAAN = () => {
  const context = useContext(UDAANContext);
  if (!context) {
    throw new Error('useUDAAN must be used within an UDAANProvider');
  }
  return context;
};
