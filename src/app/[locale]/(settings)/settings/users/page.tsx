import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UserRole } from "~/constans";
import { ShowUsers } from "~/components/show-users";
import { Link } from "~/navigation";
import { Plus as PlusIcon } from "lucide-react";

export const metadata = {
  title: "Users",
  description: "Manage users, create new users, and more.",
};

export default async function UsersPage() {
  const userSession = await getCurrentUser();

  const users = await api.user.getAll.query();

  if (userSession?.role !== UserRole.Admin) {
    redirect("/settings");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Users"
        text="Manage users, create new users, and more."
      >
        <Link href="/settings/users/create">
          <Button className="py-5">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create User
          </Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-10">
        <ShowUsers users={users} />
      </div>
    </DashboardShell>
  );
}
