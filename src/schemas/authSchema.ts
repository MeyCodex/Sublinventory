import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .trim()
    .pipe(z.email("El correo es inválido")),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
