import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const otherLocale = locale === "en" ? "es" : "en";

  return (
    <Link
      href={`/${otherLocale}/login`}
      locale={false}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 uppercase md:right-8 md:top-8",
      )}
    >
      {otherLocale}
    </Link>
  );
}
