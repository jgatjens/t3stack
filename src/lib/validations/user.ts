import * as z from "zod";
import { roleEnum } from "~/server/db/schema";

export const userNameSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    })
    .max(32),
  email: z.string().email(),
});

export const userAdminSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    })
    .max(32),
  role: z.enum(roleEnum.enumValues, {
    required_error: "El rol es requerido.",
  }),
  email: z
    .string({
      required_error: "El email es requerido.",
    })
    .email({
      message: "El email no es válido.",
    }),
  organization_id: z
    .string({
      required_error: "La organización es requerida.",
    })
    .uuid(),
});
