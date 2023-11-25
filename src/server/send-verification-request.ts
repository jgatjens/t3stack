import { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from "resend";
import MagicLinkEmail from "@/emails/magic-link";
import { env } from "~/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier, url } = params;

  // console.log("sendVerificationRequest ==>", identifier);
  // console.log("url", url);

  const { data, error } = await resend.emails.send({
    from: "Front <onboarding@resend.dev>",
    to: identifier,
    subject: "Resend - please use this magic link to login!",
    react: MagicLinkEmail({
      url: url,
      toEmail: identifier,
    }) as React.ReactElement,
  });

  if (error) {
    throw new Error(`Email(s) could (${error.message}) not be sent`);
  }
}
