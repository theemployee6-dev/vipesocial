// schemas/registerSchema.ts
import { z } from "zod";
import {
  cityRegex,
  countryRegex,
  fullnameRegex,
  passwordCapitalLetterRegex,
  passwordLowercaseLetterRegex,
  passwordNumbersRegex,
  passwordSpecialCharRegex,
  phoneRegex,
  usernameRegex,
} from "./helpers/regexHelpers";
import { maxBirthDate, minBirthDate } from "./helpers/dateHelpers";
import { brazilianStates } from "./constants/brazilianStates";

export const accountTypeEnum = ["pessoal", "criador", "marca"] as const;
export type AccountType = (typeof accountTypeEnum)[number];

const socialMediasSchema = z.object({
  instagram: z.string().max(100, "Muito longo").optional(),
  tiktok: z.string().max(100, "Muito longo").optional(),
  youtube: z.string().max(100, "Muito longo").optional(),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome muito longo")
      .regex(fullnameRegex, "Nome inválido — apenas letras e espaços"),

    username: z
      .string()
      .min(3, "Username deve ter pelo menos 3 caracteres")
      .max(30, "Username muito longo")
      .regex(usernameRegex, "Apenas letras, números, pontos e underscores")
      .transform((val) => val.toLowerCase()),

    city: z
      .string()
      .min(2, "Cidade deve ter pelo menos 2 caracteres")
      .max(100, "Cidade muito longa")
      .regex(cityRegex, "Cidade deve conter apenas letras e espaços")
      .transform((val) => val.toLowerCase()),

    uf: z.enum(brazilianStates, {
      error: "Selecione um estado válido",
    }),

    email: z.email("E-mail inválido").transform((val) => val.toLowerCase()),

    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(72, "Senha muito longa")
      .regex(
        passwordCapitalLetterRegex,
        "Deve conter pelo menos uma letra maiúscula",
      )
      .regex(
        passwordLowercaseLetterRegex,
        "Deve conter pelo menos uma letra minúscula",
      )
      .regex(passwordNumbersRegex, "Deve conter pelo menos um número")
      .regex(
        passwordSpecialCharRegex,
        "Deve conter pelo menos um caractere especial",
      ),

    confirmPassword: z.string(),

    birthDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Data inválida")
      .refine(
        (val) => new Date(val) >= minBirthDate,
        "Data de nascimento inválida",
      )
      .refine(
        (val) => new Date(val) <= maxBirthDate,
        "Você deve ter pelo menos 13 anos",
      ),

    gender: z.enum(
      [
        "agenero",
        "demigenero",
        "feminino",
        "genero_fluido",
        "genero_nao_conformista",
        "homem_trans",
        "intersexo",
        "masculino",
        "mulher_trans",
        "nao_binario",
        "outro",
        "queer",
        "transgenero",
        "travesti",
        "prefiro_nao_dizer",
      ],
      { error: "Selecione um gênero" },
    ),

    country: z
      .string()
      .min(2, "País deve ter pelo menos 2 caracteres")
      .max(100, "País muito longo")
      .regex(countryRegex, "País deve conter apenas letras e espaços")
      .transform((val) => val.toLowerCase()),

    phone: z
      .union([z.string().regex(phoneRegex, "Contato inválido"), z.literal("")])
      .optional(),

    avatar: z
      .instanceof(File, { error: "Arquivo inválido" })
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "Imagem deve ter no máximo 5MB",
      )
      .refine(
        (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
        "Formato inválido — use PNG, JPG ou WEBP",
      )
      .nullable()
      .optional(),

    bio: z
      .string()
      .min(50, "Biografia deve ter pelo menos 50 caracteres")
      .max(500, "Biografia deve ter no máximo 500 caracteres")
      .transform((val) => val.toLowerCase()),

    socialMedias: socialMediasSchema.optional(),

    interests: z
      .string()
      .min(20, "Interesses devem ter no mínimo 20 caracteres")
      .transform((val) => val.toLowerCase()),

    accountType: z.enum(["pessoal", "criador", "marca"], {
      error: "Selecione um tipo de conta",
    }),

    agreedToTerms: z
      .boolean({ error: "Você deve aceitar os termos de uso" })
      .refine((val) => val === true, {
        message: "Você deve aceitar os termos de uso",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterPayload = Omit<
  RegisterFormData,
  "confirmPassword" | "agreedToTerms" | "avatar" | "password"
> & {
  avatarUrl?: string;
};
