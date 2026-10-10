import { LockKeyhole } from "lucide-react";

export interface PrivacyNoticeProps {
  className?: string;
}

export function PrivacyNotice({ className = "" }: PrivacyNoticeProps) {
  return (
    <aside
      className={`flex items-start gap-3 border-2 border-border bg-neutral p-4 ${className}`}
      role="note"
    >
      <LockKeyhole aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
      <p className="font-ui text-xs leading-5 text-ink">
        El archivo original permanece privado.
      </p>
    </aside>
  );
}
