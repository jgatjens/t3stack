import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UserRole } from "~/constans";
import { UserAdminForm } from "~/components/user-admin-form";

export const metadata = {
  title: "New user",
  description: "New user.",
};

export default async function NewUserPage() {
  const userSession = await getCurrentUser();
  const organizations = await api.organization.getAll.query();

  if (userSession?.role !== UserRole.Admin) {
    redirect("/settings");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Usuario"
        text="Actualizar o crear nuevo usuario."
      ></DashboardHeader>
      <div className="grid gap-10">
        <UserAdminForm organizations={organizations} />
      </div>
    </DashboardShell>
  );
}
