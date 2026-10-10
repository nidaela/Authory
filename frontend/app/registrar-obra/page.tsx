import { RegisterWorkFlow } from "@/components/authory/register-work-flow";
import { AppHeader } from "@/components/layout/app-header";
import { PageShell } from "@/components/layout/page-shell";

export default function RegisterWorkPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-ink">
      <AppHeader activeHref="/registrar-obra" />
      <PageShell className="flex flex-1 flex-col max-w-7xl !py-4 sm:!py-4">
        <RegisterWorkFlow />
      </PageShell>
    </div>
  );
}
