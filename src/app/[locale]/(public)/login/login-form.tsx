"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "~/constans";
import { env } from "~/env.mjs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  translateHeadline: string;
  translateSubheadline: string;
  translateEmailSent: string;
  translateCtaButton: string;
  translateInvalidEmail: string;
  translateNoUserFound: string;
}

export default function LoginForm({
  className,
  translateHeadline,
  translateSubheadline,
  translateCtaButton,
  translateEmailSent,
  translateInvalidEmail,
  translateNoUserFound,
  ...props
}: UserAuthFormProps) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const schema = z.object({
      email: z.string().email(),
    });

    try {
      schema.parse({ email });

      const callbackUrl = `${env.NEXT_PUBLIC_APP_URL}/settings`;
      const res = await signIn("email", {
        email,
        redirect: false,
        callbackUrl,
      });

      // If the user is not found, we show an error toast message
      if (res?.error === ErrorMessage.AccessDenied) {
        toast({
          variant: "destructive",
          title: "¡Oh, oh! Algo salió mal.",
          description: translateNoUserFound + email,
        });
        inputRef.current?.focus();
      }

      // If everything is fine, we show a success toast message
      if (!res?.error) {
        setIsEmailSent(true);
        toast({
          description: translateEmailSent,
        });
      }

      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "¡Oh, oh! Algo salió mal.",
        description: translateInvalidEmail,
      });
      setIsLoading(false);
      inputRef.current?.focus();
      return;
    }
  }

  return isEmailSent ? (
    <p className="text-left text-base text-black">{translateEmailSent}</p>
  ) : (
    <>
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold capitalize tracking-tight">
          {translateHeadline}
        </h1>
        <p className="text-sm text-muted-foreground">{translateSubheadline}</p>
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  ref={inputRef}
                  name="email"
                  className="py-6"
                  placeholder="ejecutivo@banco.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button className="py-6 uppercase" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {translateCtaButton}
              </Button>
            </>
          </div>
        </form>
      </div>
    </>
  );
}
