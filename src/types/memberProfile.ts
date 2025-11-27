export type MemberMissionExperienceLevel =
  | "none"
  | "basic"
  | "returnedMissionary"
  | "wardMissionLeader"
  | "stakeLeader";

export type MemberPreferredRole =
  | "companion"
  | "teacher"
  | "convertCare"
  | "service"
  | "onlineSharing"
  | "familyHistory";

export type MemberAvailability = {
  weekdaysEvenings: boolean;
  weekdaysMornings: boolean;
  weekends: boolean;
  onlineOnly: boolean;
  inPerson: boolean;
};

export type MemberRoleFlags = {
  isLeader: boolean; // Obispo, consejero, presidente de organización, etc.
  isWardMissionLeader?: boolean;
  isStakeLeader?: boolean;
  callings?: string[]; // "Obispo", "Presidente de Hombres Jóvenes", etc.
};

export type MemberMissionaryProfile = {
  uid: string; // mismo que el auth uid
  servedFullTimeMission: boolean;
  missionName?: string;
  missionCountry?: string;
  missionYears?: {
    startYear?: number;
    endYear?: number;
  };
  experienceLevel: MemberMissionExperienceLevel;
  preferredRoles: MemberPreferredRole[];
  languages: string[];
  availability: MemberAvailability;
  hasTempleRecommend?: boolean;
  willingToHostLessons?: boolean;
  willingToGiveRides?: boolean;
  maxInvitesPerMonth?: number;
  testimonyFocus?: string;
  notes?: string;

  roleFlags: MemberRoleFlags; // <-- aquí controlas quién ve la vista de líder

  createdAt: string; // ISO
  updatedAt: string; // ISO
};

