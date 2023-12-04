"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { OrganizationType, UsersType } from "~/server/db/schema";
import { api } from "~/trpc/react";
import * as z from "zod";
import { cn } from "@/lib/utils";

import { userAdminSchema } from "~/lib/validations/user";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Icons } from "~/components/icons";
import { UserRole } from "~/constans";
import { useToast } from "@/components/ui/use-toast";

interface UserFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user?: Pick<UsersType, "id" | "name" | "email" | "role" | "organization_id">;
  organizations: OrganizationType[];
}

const roles = [
  {
    id: UserRole.User,
    name: "Usuario",
  },
  {
    id: UserRole.Admin,
    name: "Administrador",
  },
];

type FormData = z.infer<typeof userAdminSchema>;

export function UserAdminForm({
  user,
  organizations,
  className,
}: UserFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(userAdminSchema),
    defaultValues: {
      id: user?.id,
      name: user?.name,
      role: user?.role,
      email: user?.email,
    },
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  // const updateUser = api.user.update.useMutation({
  //   onSuccess: () => {
  //     toast({ title: "El usuario a sido creado." });
  //     setIsSaving(false);
  //     setTimeout(() => {
  //       router.push("/settings/users");
  //     }, 3000);
  //   },
  //   onError: (error) => {
  //     toast({
  //       variant: "destructive",
  //       title: "¡Oh, oh! Algo salió mal.",
  //       description: error.message,
  //     });
  //     setIsSaving(false);
  //   },
  // });

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      toast({ title: "Su usuario fue creado exitosamente." });
      setTimeout(() => {
        setIsSaving(false);
        router.push("/settings/users");
      }, 1500);
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

  function onSubmit(data: z.infer<typeof userAdminSchema>) {
    setIsSaving(true);

    if (user?.id) {
      // updateUser.mutate({
      //   name: data.name,
      //   organization_id: user.organization_id,
      //   email: user.email,
      //   role: data.role,
      // });
    } else {
      createUser.mutate({
        name: data.name,
        organization_id: data?.organization_id ?? "USER",
        email: data?.email ?? "",
        role: data.role,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
        // {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informacion de Usuario</CardTitle>
            <CardDescription>
              Ingrese o actualice los detalles de este usuario.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-2 lg:gap-x-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Nombre público del usuario.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      size={32}
                      placeholder="johndo@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Correo electrónico del usuario, necesita ser un correo
                    válido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Organización</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la organización para este usuario." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org?.id ?? ""}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Organizacion a la que pertence el usuario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el rol para el usuario." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role?.id ?? ""}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Permisos dados al usuario</FormDescription>
                  <FormMessage aria-required="true" />
                </FormItem>
              )}
            />
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
              <span>Crear usuario</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
