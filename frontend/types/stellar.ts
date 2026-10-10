export type StellarNetwork = "testnet";

export type StellarEvidenceStatus = "pending" | "confirmed" | "failed";

export interface StellarEvidence {
  workId: string;
  hash: string;
  transactionId: string;
  network: StellarNetwork;
  registeredAt: string;
  status: StellarEvidenceStatus;
}

export interface VerificationResult {
  verified: boolean;
  workId?: string;
  hash?: string;
  evidence?: StellarEvidence;
  message: string;
}

export interface VerificationInput {
  workId?: string;
  hash?: string;
}
