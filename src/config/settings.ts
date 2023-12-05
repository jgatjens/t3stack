import { UserRole } from "~/constans";
import type { SiteNavConfig } from "~/types";

export const siteConfig: SiteNavConfig = {
  mainNav: [
    {
      title: "Pre Aprovado",
      href: "/pre-approved",
    },
  ],
  sidebarPreApproved: [
    {
      title: "Datos Personales",
      href: "/pre-approved",
      icon: "settings",
    },
    {
      title: "Actividad Económica",
      href: "/pre-approved/economic-activity",
      icon: "post",
    },
    {
      title: "Verificación de Normativa",
      href: "/pre-approved/regulatory-verification",
      icon: "post",
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
