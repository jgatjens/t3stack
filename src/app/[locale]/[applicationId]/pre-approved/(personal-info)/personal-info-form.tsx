"use client";

import * as React from "react";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ClientsType } from "~/server/db/org-schema";
// import { api } from "~/trpc/react";
import * as z from "zod";
import { cn } from "@/lib/utils";

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
import { useToast } from "@/components/ui/use-toast";
import { searchClientSchema } from "~/lib/validations/client";

interface PersonalInfoFormProps extends React.HTMLAttributes<HTMLFormElement> {
  client?: ClientsType;
}

type FormData = z.infer<typeof searchClientSchema>;

export function PersonalInfoForm({ className, client }: PersonalInfoFormProps) {
  // const router = useRouter();
  // const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(searchClientSchema),
    defaultValues: {
      name: client?.name,
      email: client?.email,
      client_id: client?.client_id,
      client_id_type: client?.client_id_type,
      legal_representative: client?.legal_representative ?? "",
      business_name: client?.business_name,
      personal_phone: client?.personal_phone,
      business_phone: client?.business_phone ?? "",
      website: client?.website ?? "",
    },
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  // const createUser = api.user.create.useMutation({
  //   onSuccess: () => {
  //     toast({ title: "Su usuario fue creado exitosamente." });
  //     setTimeout(() => {
  //       setIsSaving(false);
  //       router.push("/settings/users");
  //     }, 1500);
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

  function onSubmit(data: FormData) {
    setIsSaving(true);
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
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Ingrese o actualice los detalles de este cliente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-2 lg:gap-x-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Nombre del cliente / Razón social</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legal_representative"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Representante legal</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Representante legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Identificación</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificación legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Nombre Comercial</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificación legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personal_phone"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Teléfono personal</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificación legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business_phone"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Teléfono empresa</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Teléfono empresa legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Sitio WEB</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Teléfono empresa legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="n.a" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email empresa legal del cliente para esta solicitud.
                  </FormDescription>
                  <FormMessage />
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
              <span>Guardar cliente</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
