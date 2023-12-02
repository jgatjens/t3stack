import { CardSkeleton } from "~/components/card-skeleton";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default function UsersLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Users"
        text="Manage users, create new users, and more."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
