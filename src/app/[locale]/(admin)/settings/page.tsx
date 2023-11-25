import { Metadata } from "next";
import { UserRole } from "~/constans";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "Admin - settings",
  description: "Admin settings Front App System",
};

export default async function SettingsPage() {
  const session = await getServerAuthSession();

  if (session?.user.role !== UserRole.Admin) {
    return <h1> Please login</h1>;
  }

  return <h1> Only admin users</h1>;
}
