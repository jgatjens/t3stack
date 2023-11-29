import { type DashboardConfig } from "~/types";

export const dashboardConfig: DashboardConfig = {
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
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
    {
      title: "Users",
      href: "/settings/users",
      icon: "post",
    },
  ],
};
