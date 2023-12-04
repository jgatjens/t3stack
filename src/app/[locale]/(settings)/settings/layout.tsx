import { notFound } from "next/navigation";
import { settingsConfig } from "~/config/settings";
import { MainNav } from "~/components/main-nav";
import { DashboardNav } from "~/components/nav";
import { SiteFooter } from "~/components/site-footer";
import { UserAccountNav } from "~/components/user-account-nav";
import { getCurrentUser } from "~/lib/session";
import { api } from "~/trpc/server";

interface SettingsLayoutProps {
  children?: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const userSession = await getCurrentUser();

  if (!userSession) {
    return notFound();
  }

  const user = await api.user.getUserByEmail.query({
    email: userSession?.email ?? "",
  });

  // get random images from 01.png to 0.5.png
  const randomImage = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={settingsConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user?.name ?? "",
              image: user?.image ?? `/avatars/0${randomImage}.png`,
              email: user?.email ?? "",
              role: user?.role ?? "USER",
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav
            items={settingsConfig.sidebarNav}
            role={user?.role ?? "USER"}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="sm:border-t" />
    </div>
  );
}
