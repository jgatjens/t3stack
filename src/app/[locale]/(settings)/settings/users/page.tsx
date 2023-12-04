import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { ShowUsers } from "~/components/show-users";
import { Link } from "~/navigation";
import { Plus as PlusIcon } from "lucide-react";
import { UserRole } from "~/constans";

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
        heading="Usuarios"
        text="Administre usuarios, cree nuevos y más."
      >
        <Link href="/settings/users/admin">
          <Button className="py-5">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nuevo usuario
          </Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-10">
        <ShowUsers users={users} />
      </div>
    </DashboardShell>
  );
}
