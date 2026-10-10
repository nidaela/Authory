import { StatusBadge, type StatusBadgeVariant } from "@/components/ui/status-badge";
import type { StellarEvidence as StellarEvidenceRecord } from "@/types/stellar";

export interface StellarEvidenceProps {
  evidence: StellarEvidenceRecord;
  className?: string;
}

const statusVariants: Record<StellarEvidenceRecord["status"], StatusBadgeVariant> = {
  pending: "active",
  confirmed: "success",
  failed: "neutral",
};

export function StellarEvidence({ evidence, className = "" }: StellarEvidenceProps) {
  return (
    <section className={`border-2 border-border bg-white ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-border bg-neutral px-4 py-3">
        <div>
          <p className="font-ui text-[10px] font-bold tracking-[0.1em] text-ink/65">EVIDENCIA STELLAR</p>
          <p className="mt-1 font-ui text-[11px] text-ink">STELLAR TESTNET · SIMULADA PARA LA PRUEBA FUNCIONAL</p>
        </div>
        <StatusBadge variant={statusVariants[evidence.status]}>{evidence.status.toUpperCase()}</StatusBadge>
      </div>
      <dl className="grid sm:grid-cols-2">
        <div className="border-b-2 border-border p-4 sm:border-r-2">
          <dt className="font-ui text-[10px] font-bold tracking-[0.1em] text-ink/60">ID DE OBRA</dt>
          <dd className="mt-2 break-all font-ui text-xs text-ink">{evidence.workId}</dd>
        </div>
        <div className="border-b-2 border-border p-4">
          <dt className="font-ui text-[10px] font-bold tracking-[0.1em] text-ink/60">RED</dt>
          <dd className="mt-2 font-ui text-xs text-ink">{evidence.network.toUpperCase()}</dd>
        </div>
        <div className="border-b-2 border-border p-4 sm:border-r-2 sm:border-b-0">
          <dt className="font-ui text-[10px] font-bold tracking-[0.1em] text-ink/60">HASH SHA-256</dt>
          <dd className="mt-2 break-all font-ui text-xs leading-5 text-ink">{evidence.hash}</dd>
        </div>
        <div className="p-4">
          <dt className="font-ui text-[10px] font-bold tracking-[0.1em] text-ink/60">TRANSACCIÓN</dt>
          <dd className="mt-2 break-all font-ui text-xs leading-5 text-ink">{evidence.transactionId}</dd>
          <dt className="mt-4 font-ui text-[10px] font-bold tracking-[0.1em] text-ink/60">REGISTRADA</dt>
          <dd className="mt-2 font-ui text-xs leading-5 text-ink">{evidence.registeredAt}</dd>
        </div>
      </dl>
    </section>
  );
}
