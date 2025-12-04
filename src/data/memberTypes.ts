/**
 * Data models for Member Mode 2.0
 * These models represent the member's view of investigators, support tasks, and new converts
 */

export type FriendStage =
  | "gettingToKnowChurch"
  | "learningActively"
  | "preparingForBaptism"
  | "attendingRegularly"
  | "recentConvert_0_3"
  | "recentConvert_3_12";

export interface MemberFriend {
  id: string;
  displayName: string; // safe name, alias if needed
  stage: FriendStage;
  // basic flags for what the member should focus on
  attendsSacrament?: boolean;
  attendsClass?: boolean;
  feelsIntegrated?: boolean;
  lastContactAt?: string; // ISO
  notes?: string;
  createdAt: string; // ISO
}

export type MemberSupportTaskType =
  | "accompanyLesson"
  | "transport"
  | "welcomeAtChurch"
  | "fellowship"
  | "activityInvite"
  | "service";

export type MemberSupportTaskStatus = "open" | "claimed" | "completed";

export interface MemberSupportTask {
  id: string;
  type: MemberSupportTaskType;
  status: MemberSupportTaskStatus;
  missionaryAreaId?: string;
  investigatorAlias?: string; // e.g. "Familia López", never raw PII
  description: string;
  scheduledAt?: string; // date/time if relevant
  createdAt: string;
  claimedByMemberId?: string; // optional
}

export type NewConvertStage = "baptism" | "confirmation" | "firstCalling" | "firstTemple" | "stabilizing";

export interface NewConvertCareStep {
  id: string;
  labelKey: string; // i18n key
  done: boolean;
}

export interface NewConvertCarePlan {
  id: string;
  friendId: string; // link to MemberFriend
  startedAt: string;
  stage: NewConvertStage;
  steps: NewConvertCareStep[];
}

export interface MemberDailyAction {
  id: string;
  date: string; // ISO for that day
  titleKey: string; // i18n
  actionKey: string; // i18n
  completed: boolean;
}

