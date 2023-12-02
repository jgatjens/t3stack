import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
// import { api } from "~/trpc/server";
import { UserRole } from "~/constans";
// import { ShowUsers } from "~/components/show-users";
import { Link } from "~/navigation";
import { Plus as PlusIcon } from "lucide-react";

export const metadata = {
  title: "New user",
  description: "New user.",
};

export default async function NewUserPage() {
  const userSession = await getCurrentUser();

  // const users = await api.user.getAll.query();

  if (userSession?.role !== UserRole.Admin) {
    redirect("/settings");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Update or create new users.">
        <Link href="/settings/users/create">
          <Button className="py-5">
            <PlusIcon className="mr-2 h-4 w-4" />
            Save Information
          </Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-10">{/* <ShowUsers users={users} /> */}</div>
    </DashboardShell>
  );
}
