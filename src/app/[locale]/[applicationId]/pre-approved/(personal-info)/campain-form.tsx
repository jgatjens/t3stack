"use client";

import * as React from "react";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import type { ClientsType } from "~/server/db/org-schema";
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
// import { useToast } from "@/components/ui/use-toast";
import { campainSchema } from "~/lib/validations/client";

const campains = [
  {
    name: "General",
    value: "ci",
  },
  {
    name: "Elegir",
    value: "dimex",
  },
  {
    name: "Otras",
    value: "pp",
  },
  {
    name: "Super campaña",
    value: "ce",
  },
];

type FormData = z.infer<typeof campainSchema>;

export function CampainForm({
  className,
}: React.HTMLAttributes<HTMLFormElement>) {
  // const router = useRouter();
  // const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(campainSchema),
    defaultValues: {
      id: "",
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
            <CardTitle>Campaña inicial</CardTitle>
            <CardDescription>
              Aqui podra escoger la campaña para esta solicitud.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-2 lg:gap-x-5">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Campaña</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo de campaña." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campains.map((item) => (
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
              <span>Recomendar cliente</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
