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

interface SearchClientFormProps extends React.HTMLAttributes<HTMLFormElement> {
  client?: Pick<ClientsType, "client_id" | "client_id_type">;
}

const clientIdTypes = [
  {
    name: "Cédula",
    value: "ci",
  },
  {
    name: "Dimex",
    value: "dimex",
  },
  {
    name: "Pasaporte",
    value: "pp",
  },
  {
    name: "Cédula de Juridica",
    value: "ce",
  },
];

type FormData = z.infer<typeof searchClientSchema>;

export function SearchClientForm({ className, client }: SearchClientFormProps) {
  // const router = useRouter();
  // const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(searchClientSchema),
    defaultValues: {
      client_id: client?.client_id,
      client_id_type: client?.client_id_type,
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
            <CardTitle>Consultar cliente</CardTitle>
            <CardDescription>
              Ingrese o actualice los detalles de este usuario.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-2 lg:gap-x-5">
            <FormField
              control={form.control}
              name="client_id_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo Identificación</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo de identificación." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientIdTypes.map((item) => (
                        <SelectItem key={item.value} value={item?.value}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Escoga el tipo identificación para poder realizar la
                    busqueda del cliente.
                  </FormDescription>
                  <FormMessage aria-required="true" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Número Identificación</FormLabel>
                  <FormControl>
                    <Input size={32} placeholder="603650892" {...field} />
                  </FormControl>
                  <FormDescription>
                    Número identificación del cliente para crear solicitud.
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
              <span>Consultar cliente</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
