import { type Icons } from "~/components/icons";
import type { UserRole } from "~/constans";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    website: string;
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteNavConfig = {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
  sidebarPreApproved: SidebarNavItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      role?: UserRole;
      items?: never;
    }
  | {
      href?: string;
      role: UserRole;
      items: NavLink[];
    }
);
