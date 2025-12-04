export type CommitmentType = "study" | "spiritual" | "attendance" | "service";

export type CommitmentState = "pending" | "today" | "completed";

export interface InvestigatorCommitment {
  id: string;
  text: string;
  type: CommitmentType;
  state: CommitmentState;
  createdAt: string;    // ISO string
  lessonId?: string;    // optional - ID of the lesson this commitment is related to
}

