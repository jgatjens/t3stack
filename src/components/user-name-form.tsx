"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UsersType } from "~/server/db/schema";
import { api } from "~/trpc/react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { userNameSchema } from "~/lib/validations/user";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "~/components/icons";
import { useToast } from "@/components/ui/use-toast";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<UsersType, "name" | "email">;
}

type FormData = z.infer<typeof userNameSchema>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const updateName = api.user.updateName.useMutation({
    onSuccess: () => {
      toast({ title: "Su nombre ha sido actualizado." });
      setIsSaving(false);
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "¡Oh, oh! Algo salió mal.",
        description: error.message,
      });
      setIsSaving(false);
    },
  });

  function onSubmit(data: FormData) {
    setIsSaving(true);
    updateName.mutate({ name: data.name, email: user?.email });
  }
  // debugger;

  return (
    <form
      className={cn(className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle>Tu nombre</CardTitle>
          <CardDescription>
            Por favor ingrese su nombre completo o un nombre para mostrar con el
            que se sienta cómodo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Nombre
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Guardar</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
