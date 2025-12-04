/**
 * Data models for Member Leadership 2.0 module
 * All data is aggregated and non-sensitive, focused on support and coordination
 */

export interface AreaKPI {
  lessonsTotal: number;
  lessonsWithMember: number;
  investigatorsActive: number;
  investigatorsAttending: number;
  investigatorsWithDate: number;
  baptismsLast90Days: number;
  commitmentsCreated: number;
  commitmentsCompleted: number;
  newConvertsActive: number;
  memberParticipationThisWeek: number;
}

export interface AreaTrend {
  week: string; // "2025-W10"
  lessons: number;
  attendance: number;
  commitmentsCompleted: number;
}

export interface InvestigatorLeadershipView {
  id: string;
  alias: string;
  stage: string; // aggregated stage, not private notes
  lastContactDays: number;
  attendedLastSunday: boolean;
  needs: string[]; // "integration", "transport", "accompaniment", "teaching", "activities"
  assignedMember?: string;
  lessonsCompleted?: number;
  commitmentsActive?: number;
}

export interface NewConvertLeadershipView {
  id: string;
  alias: string;
  monthsSinceBaptism: number;
  active: boolean;
  lastContactDays: number;
  progressionStage: "baptism" | "confirmation" | "firstCalling" | "firstTemple" | "stabilizing";
  stepsCompleted: number;
  stepsTotal: number;
  attendanceLast4Sundays: number; // 0-4
  assignedMembers: string[];
}

export interface MissionaryReport {
  weekId: string;
  area: string;
  lessonsTaught: number;
  lessonsWithMember: number;
  investigatorsAttending: number;
  newConvertsActive: number;
  memberParticipants: number;
  keyNeeds: string[];
  suggestions: string[];
}

export interface LeadershipSupportTask {
  id: string;
  type: "accompanyLesson" | "transport" | "welcome" | "activityInvite" | "fellowship";
  status: "open" | "claimed" | "completed";
  investigatorAlias?: string;
  scheduledAt?: string;
  createdAt: string;
  claimedBy?: string;
}

export interface LeadershipAlert {
  id: string;
  type: "high" | "medium" | "low";
  category: "noContact" | "missingSundays" | "noMemberAssigned" | "lowIntegration" | "inconsistentLessons" | "transportNeeded";
  title: string;
  description: string;
  investigatorId?: string;
  newConvertId?: string;
  suggestedActions: string[];
  createdAt: string;
}

export interface ActionPlanObjective {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  status: "onTrack" | "atRisk" | "completed" | "delayed";
}

export interface ActionPlanWeeklyAction {
  id: string;
  week: string;
  title: string;
  description: string;
  completed: boolean;
  assignedTo?: string;
}

export interface ActionPlan {
  month: string; // "2025-03"
  objectives: ActionPlanObjective[];
  weeklyActions: ActionPlanWeeklyAction[];
}

