import { WorkDetail } from "@/components/authory/work-detail";
import { AppHeader } from "@/components/layout/app-header";
import { PageShell } from "@/components/layout/page-shell";

export const instant = false;

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-dvh bg-white text-ink">
      <AppHeader />
      <PageShell className="max-w-7xl">
        <WorkDetail workId={id} />
      </PageShell>
    </div>
  );
}
