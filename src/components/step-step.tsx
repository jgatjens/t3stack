// import { User as IconUser } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SidebarNavItem } from "~/types";

interface StepByStepProps {
  items: SidebarNavItem[];
}

export function StepByStep({ items, ...props }: StepByStepProps) {
  return (
    <ul className="relative flex flex-row gap-x-2">
      {items.map((item, i) => (
        <li className="group flex-1 shrink basis-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex min-h-[28px] w-full min-w-[28px] items-center align-middle text-xs">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-800 dark:bg-gray-700 dark:text-white">
                    {i + 1}
                  </span>
                  <div className="ms-2 h-px w-full flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  );
}
