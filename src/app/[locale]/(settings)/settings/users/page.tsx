import { redirect } from "next/navigation";

import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UserRole } from "~/constans";
import { ShowUsers } from "~/components/show-users";
// import { UserNameForm } from "~/components/user-name-form";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const userSession = await getCurrentUser();

  const users = await api.user.getAll.query();

  if (userSession?.role !== UserRole.Admin) {
    redirect("/settings");
  }

  console.log(users);

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Add or remove users." />
      <div className="grid gap-10">
        <ShowUsers users={users} />
      </div>
    </DashboardShell>
  );
}
