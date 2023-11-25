import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  toEmail?: string;
  url?: string;
  fromIp?: string;
  fromLocation?: string;
}

export const MagicLinkEmail = ({
  toEmail = "jgatjens@gmail.com",
  url = "http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fes%2Flogin&token=ac0937297c6b6f69f32fdb0f51e56c5fc9b3001e25ad7abe97ec87d537440e7c&email=jgatjens%40gmail.com",
}: // fromIp = "204.13.186.218",
// fromLocation = "San jose, Costa Rica",
MagicLinkEmailProps) => {
  const previewText = `Please use this magic link to login ${url}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Container className="h-9 w-10 bg-black"></Container>
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              <strong>Login</strong>
            </Heading>
            <Text className="text-[14px]  leading-[14px] text-black">
              Hello,
            </Text>
            <Text className="text-[14px]  leading-[14px] text-black">
              Click the button to log in with a magic link.
            </Text>

            <Section className=" mb-[20px] mt-[20px]">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Click here
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser{" "}
              <Link href={url} className="text-blue-600 no-underline">
                here
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{toEmail} </span>.
              {/* This invite was sent from <span className="text-black">{fromIp}</span> located in{" "}
              <span className="text-black">{fromLocation}</span>. If you were not expecting this */}
              invitation, you can ignore this email. If you are concerned about
              your account's safety, please reply to this email to get in touch
              with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
