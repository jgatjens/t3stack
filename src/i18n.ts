import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  const messages = (await import(`../messages/${locale}.json`)) as {
    default: Record<string, string>;
  };

  return {
    messages: messages.default,
  };
});
