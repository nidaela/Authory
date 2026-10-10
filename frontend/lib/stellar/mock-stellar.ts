import { getWork } from "@/lib/storage";
import type { RightsEvent } from "@/types/rights-event";
import type {
  StellarEvidence,
  VerificationInput,
  VerificationResult,
} from "@/types/stellar";
import type { Work } from "@/types/work";

const testnet = "testnet" as const;
const mockDelayMs = 350;
let sequence = 0;

const evidenceByWorkId = new Map<string, StellarEvidence>();
const evidenceByHash = new Map<string, StellarEvidence>();

function createHexValue(length: number): string {
  sequence += 1;
  const seed = `${Date.now().toString(16)}${sequence.toString(16)}${Math.random()
    .toString(16)
    .slice(2)}`;
  let value = "";

  while (value.length < length) {
    value += seed;
  }

  return value.slice(0, length);
}

function storeEvidence(
  evidence: StellarEvidence,
  setWorkReference = true,
): StellarEvidence {
  if (setWorkReference) {
    evidenceByWorkId.set(evidence.workId, evidence);
  }

  evidenceByHash.set(evidence.hash, evidence);
  return evidence;
}

function waitForMockLedger(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, mockDelayMs);
  });
}

function getVerificationInput(input: string | VerificationInput): VerificationInput {
  if (typeof input === "string") {
    return input.length === 64 ? { hash: input } : { workId: input };
  }

  return input;
}

function getStoredWorkEvidence(
  workId?: string,
  hash?: string,
): StellarEvidence | undefined {
  const work = getWork();
  const matchesWork = workId === work.id || hash === work.hash;

  if (
    !matchesWork ||
    !work.hash ||
    !work.stellarTransactionId ||
    !work.registeredAt
  ) {
    return undefined;
  }

  return {
    workId: work.id,
    hash: work.hash,
    transactionId: work.stellarTransactionId,
    network: work.network,
    registeredAt: work.registeredAt,
    status: "confirmed",
  };
}

export function createMockAuthoryId(): string {
  const year = new Date().getUTCFullYear();
  sequence += 1;
  const suffix = ((Date.now() + sequence) % 1_000_000)
    .toString()
    .padStart(6, "0");
  return `AUTH-${year}-${suffix}`;
}

export function generateMockHash(): string {
  return createHexValue(64);
}

export function generateMockTransactionId(): string {
  return `mock_testnet_tx_${createHexValue(64)}`;
}

export async function createMockEvidence(work: Work): Promise<StellarEvidence> {
  await waitForMockLedger();

  const evidence = storeEvidence({
    workId: work.id,
    hash: work.hash ?? generateMockHash(),
    transactionId: generateMockTransactionId(),
    network: testnet,
    registeredAt: new Date().toISOString(),
    status: "confirmed",
  });

  return evidence;
}

export async function verifyMockEvidence(
  input: string | VerificationInput,
): Promise<VerificationResult> {
  const { workId, hash } = getVerificationInput(input);
  const evidence =
    (workId ? evidenceByWorkId.get(workId) : undefined) ??
    (hash ? evidenceByHash.get(hash) : undefined) ??
    getStoredWorkEvidence(workId, hash);

  if (!evidence) {
    return {
      verified: false,
      message: "No matching evidence was found in the mocked Stellar Testnet.",
    };
  }

  return {
    verified: evidence.status === "confirmed",
    workId: evidence.workId,
    hash: evidence.hash,
    evidence,
    message: "Evidence verified against the mocked Stellar Testnet.",
  };
}

export async function createMockRightsEvidence(
  event: RightsEvent,
): Promise<StellarEvidence> {
  await waitForMockLedger();

  return storeEvidence(
    {
      workId: event.workId,
      hash: generateMockHash(),
      transactionId: generateMockTransactionId(),
      network: testnet,
      registeredAt: new Date().toISOString(),
      status: "confirmed",
    },
    false,
  );
}
