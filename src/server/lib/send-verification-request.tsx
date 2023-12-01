import type { SendVerificationRequestParams } from "next-auth/providers/email";
import nodemailer from "nodemailer";
// import { Resend } from "resend";
// import { env } from "~/env.mjs";
import MagicLinkEmail from "~/emails/magic-link";
import { render } from "@react-email/render";

// const resend = new Resend(env.RESEND_API_KEY);
// console.log(process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier, url } = params;

  try {
    const emailHtml = render(<MagicLinkEmail email={identifier} url={url} />);

    const options = {
      from: `Front ,${process.env.EMAIL_FROM_USER}>`,
      to: identifier,
      subject: "Please use this magic link to login!",
      html: emailHtml,
    };

    await transporter.sendMail(options);

    // await resend.emails.send({
    //   from: "Front <onboarding@resend.dev>",
    //   to: identifier,
    //   subject: "please use this magic link to login!",
    //   react: MagicLinkEmail({
    //     url: url,
    //     email: identifier,
    //   }) as React.ReactElement,
    // });
  } catch (error) {
    throw new Error(`Email could not be sent`);
  }
}
