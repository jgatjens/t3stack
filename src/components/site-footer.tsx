import * as React from "react";

import { siteConfig } from "~/config/site";
import { cn } from "@/lib/utils";
import { Command as IconLogo } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 sm:h-16 sm:flex-row sm:py-0">
        <div className="flex flex-col items-center gap-4 px-8 sm:flex-row sm:gap-2 sm:px-0">
          <IconLogo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.website}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              lustudio
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
