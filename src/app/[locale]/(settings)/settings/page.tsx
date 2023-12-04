import { redirect } from "next/navigation";

import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { UserNameForm } from "~/components/user-name-form";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const userSession = await getCurrentUser();

  const user = await api.user.getUserByEmail.query({
    email: userSession?.email ?? "",
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Perfil"
        text="Actualice la configuración de usuario actual."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ email: user.email, name: user.name ?? "" }} />
      </div>
    </DashboardShell>
  );
}
