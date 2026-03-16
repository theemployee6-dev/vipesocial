import { z } from "zod";

export const loginSchemas = z.object({
  email: z.email("E-mail inválido").transform((val) => val.toLowerCase()),

  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchemas>;
