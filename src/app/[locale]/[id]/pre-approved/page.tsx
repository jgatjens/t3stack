import { redirect } from "next/navigation";

import { getCurrentUser } from "~/lib/session";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { StepByStep } from "~/components/step-step";
import { api } from "~/trpc/server";
import { siteConfig } from "~/config/settings";

export const metadata = {
  title: "Pre Aprovado - Datos Personales",
  description: "Pre Aprovado - Analítica de Datos Financieros",
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
      {/* <DashboardHeader
        heading="Pre Aprovado - Datos Personales"
        text="Analítica de Datos Financieros"
      /> */}
      <div className="grid gap-10">
        {/* <StepByStep items={siteConfig.sidebarPreApproved} /> */}
      </div>
    </DashboardShell>
  );
}
