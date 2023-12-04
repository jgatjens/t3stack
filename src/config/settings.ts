import { UserRole } from "~/constans";
import type { SettingsConfig } from "~/types";

export const settingsConfig: SettingsConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "AI Score",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Perfil",
      href: "/settings",
      icon: "settings",
    },
    {
      title: "Usuarios",
      role: UserRole.Admin,
      href: "/settings/users",
      icon: "post",
    },
  ],
};
