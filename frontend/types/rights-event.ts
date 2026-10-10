export type RightsEventType =
  | "registration"
  | "evidence"
  | "license"
  | "assignment"
  | "transfer";

export interface RightsEvent {
  id: string;
  workId: string;
  type: RightsEventType;
  actor: string;
  recipient?: string;
  effectiveDate: string;
  terms?: string;
  notes?: string;
  stellarTransactionId?: string;
  createdAt: string;
}
