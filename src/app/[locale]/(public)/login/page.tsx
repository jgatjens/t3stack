import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { redirect } from "~/navigation";
import LoginForm from "./login-form";
import LocaleSwitcher from "~/components/locale-switcher";
import { ModeToggle } from "~/components/mode-toggle";

export const metadata: Metadata = {
  title: "login - frontapp",
  description: "Login Front App System.",
};

export default async function LoginPage() {
  const t = await getTranslations();

  const session = await getServerAuthSession();
  // redirect if user have a session
  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center lg:container lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <LocaleSwitcher />

        <div className="absolute bottom-4 right-4 mb-4 mr-4">
          <ModeToggle />
        </div>

        <div className="relative flex-col bg-muted p-6 py-10 text-white dark:border-r lg:flex lg:h-full lg:p-10">
          <div className="absolute inset-0 bg-zinc-900" />
          <Image
            src="/assets/login-3.jpg"
            width={1280}
            height={843}
            alt="working women"
            className="absolute inset-0 hidden h-full w-full object-cover opacity-40 lg:block"
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-10 w-10"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>

            <span>
              {t("Login.welcome")} <b>FRONT</b>
            </span>
          </div>
        </div>
        <div className="mt-10 px-6 lg:mt-0 lg:p-8 lg:px-0">
          <div className="flex w-full flex-col justify-start space-y-6 md:mx-auto md:w-[350px] md:justify-center">
            <LoginForm
              translateHeadline={t("Login.headline")}
              translateSubheadline={t("Login.subheadline")}
              translateCtaButton={t("Login.cta_button")}
              translateEmailSent={t("Login.email_sent")}
              translateInvalidEmail={t("Error.email_invalid")}
              translateNoUserFound={t("Error.user_not_found")}
            />

            <p className="text-left text-sm text-muted-foreground">
              {t("Login.continue")}{" "}
              <Link
                href="terms-of-service"
                className="underline underline-offset-4 hover:text-primary"
              >
                {t("Login.terms_of_service")}
              </Link>{" "}
              {t("Login.and")}{" "}
              <Link
                href="privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                {t("Login.privacy_policy")}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
