"use client";

import type { SidebarNavItem } from "~/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "~/components/icons";
import type { UserRole } from "~/constans";

interface DashboardNavProps {
  items: SidebarNavItem[];
  role: UserRole.Admin | UserRole.User;
}

export function DashboardNav({ items, role }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  // console.log("path", path);
  return (
    <nav className="grid items-start gap-2">
      {items.map((item: SidebarNavItem, index) => {
        const Icon = Icons[item.icon ?? "arrowRight"];

        if (item.role && item.role !== role) {
          return null;
        }

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path.endsWith(item.href) ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
