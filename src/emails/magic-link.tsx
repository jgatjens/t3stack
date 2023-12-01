import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  email?: string;
  url?: string;
}

export const MagicLinkEmail = ({
  email,
  url,
}: MagicLinkEmailProps): React.ReactNode => {
  const previewText = `Please use this magic link to login ${url}`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="my-[40px] ml-auto w-[465px] border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Container className="h-9 w-10 rounded bg-black"></Container>
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-left text-[24px] font-normal text-black">
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
              <span className="text-black">{email}</span>. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your {"account's"} safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
