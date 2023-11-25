import "~/styles/globals.css";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

// Can be imported from a shared config
// const locales = ["en", "es"];

export const metadata = {
  title: "Front App",
  description: "Front App description",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  // if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body className={GeistSans.className}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
          <Toaster closeButton />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
