import { CardSkeleton } from "~/components/card-skeleton";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default function UsersLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Usuarios"
        text="Administre usuarios, cree nuevos y más."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
