import * as z from "zod";

export const searchClientSchema = z.object({
  name: z.string({
    required_error: "El nombre del cliente es requerido.",
  }),
  legal_representative: z.string(),
  client_id: z
    .string()
    .min(3, {
      message: "El client id debe tener al menos 3 caracteres.",
    })
    .max(32),
  client_id_type: z.string({
    required_error: "El tipo de documento es requerido.",
  }),
  business_name: z.string({
    required_error: "El nombre comercial es requerido.",
  }),
  personal_phone: z.string({
    required_error: "El teléfono personal es requerido.",
  }),
  business_phone: z.string(),
  email: z
    .string({
      required_error: "El nombre del cliente es requerido.",
    })
    .email({
      message: "El email no es válido.",
    }),
  website: z.string(),
});

export const campainSchema = z.object({
  id: z.string({
    required_error: "El id de campaña es requerido.",
  }),
});
