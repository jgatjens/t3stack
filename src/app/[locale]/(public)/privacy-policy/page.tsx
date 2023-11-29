import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
// import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service Front App System",
};

export default async function LoginPage() {
  const t = await getTranslations();

  // const hello = await api.post.hello.query({ text: "from tRPC" });

  // const user = await api.user.checkUserLogin.query({
  //   email: "jgatjens@gmail.com",
  // });

  // console.log(hello);

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center ">
        {/* <LocaleSwitcher /> */}

        <div className="px-6 py-6 text-left lg:py-10 lg:pt-10">
          {/* create react copy for terms of service */}

          <h1 className="mb-6 text-2xl font-semibold capitalize tracking-tight">
            {t("Privacy.headline")}
          </h1>

          <h3>General Site Usage</h3>
          <p>Last Revised: December 16, 2013</p>
          <p>
            Welcome to www.lorem-ipsum.info. This site is provided as a service
            to our visitors and may be used for informational purposes only.
            Because the Terms and Conditions contain legal obligations, please
            read them carefully.
          </p>
          <h2>1. YOUR AGREEMENT</h2>
          <p>
            By using this Site, you agree to be bound by, and to comply with,
            these Terms and Conditions. If you do not agree to these Terms and
            Conditions, please do not use this site.
          </p>
        </div>
      </div>
    </>
  );
}
