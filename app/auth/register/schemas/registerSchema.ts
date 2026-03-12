// // schemas/registerSchema.ts
// import { z } from "zod";
// import { phoneRegex } from "./helpers/regexHelpers";
// import { maxBirthDate, minBirthDate } from "./helpers/dateHelpers";

// const socialMediasSchema = z.object({
//   instagram: z
//     .union([z.string().url("URL do Instagram inválida"), z.literal("")])
//     .optional(),
//   tiktok: z
//     .union([z.string().url("URL do TikTok inválida"), z.literal("")])
//     .optional(),
//   youtube: z
//     .union([z.string().url("URL do YouTube inválida"), z.literal("")])
//     .optional(),
// });

// export const registerSchema = z
//   .object({
//     fullName: z
//       .string()
//       .min(3, "Nome deve ter pelo menos 3 caracteres")
//       .max(100, "Nome muito longo")
//       .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome inválido — apenas letras e espaços"),

//     username: z
//       .string()
//       .min(3, "Username deve ter pelo menos 3 caracteres")
//       .max(30, "Username muito longo")
//       .regex(
//         /^[a-z0-9._]+$/,
//         "Apenas letras minúsculas, números, pontos e underscores",
//       ),

//     age: z
//       .number({ error: "Idade inválida" })
//       .int("Idade deve ser número inteiro")
//       .min(13, "Você deve ter pelo menos 13 anos")
//       .max(120, "Idade inválida"),

//     city: z
//       .string()
//       .min(2, "Cidade deve ter pelo menos 2 caracteres")
//       .max(100, "Cidade muito longa"),

//     email: z.string().email("E-mail inválido"),

//     password: z
//       .string()
//       .min(8, "Senha deve ter pelo menos 8 caracteres")
//       .max(72, "Senha muito longa")
//       .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
//       .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
//       .regex(/[0-9]/, "Deve conter pelo menos um número")
//       .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

//     confirmPassword: z.string(),

//     birthDate: z
//       .string()
//       .refine((val) => !isNaN(Date.parse(val)), "Data inválida")
//       .refine(
//         (val) => new Date(val) >= minBirthDate,
//         "Data de nascimento inválida",
//       )
//       .refine(
//         (val) => new Date(val) <= maxBirthDate,
//         "Você deve ter pelo menos 13 anos",
//       ),

//     gender: z.enum(
//       [
//         "agenero",
//         "demigenero",
//         "feminino",
//         "genero_fluido",
//         "genero_nao_conformista",
//         "homem_trans",
//         "intersexo",
//         "masculino",
//         "mulher_trans",
//         "nao_binario",
//         "outro",
//         "queer",
//         "transgenero",
//         "travesti",
//         "prefiro_nao_dizer",
//       ],
//       { error: "Selecione um gênero" },
//     ), // ✅ v4: error

//     country: z
//       .string()
//       .min(2, "País deve ter pelo menos 2 caracteres")
//       .max(100, "País muito longo"),

//     phone: z
//       .union([z.string().regex(phoneRegex, "Telefone inválido"), z.literal("")]) // ✅ v4: union no lugar de .or()
//       .optional(),

//     avatar: z
//       .instanceof(File)
//       .refine(
//         (file) => file.size <= 5 * 1024 * 1024,
//         "Imagem deve ter no máximo 5MB",
//       )
//       .refine(
//         (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
//         "Formato inválido — use PNG, JPG ou WEBP",
//       )
//       .nullable()
//       .optional(),

//     bio: z
//       .string()
//       .max(300, "Biografia deve ter no máximo 300 caracteres")
//       .optional(),

//     socialMedias: socialMediasSchema.optional(),

//     interests: z.string().max(200, "Interesses muito longos").optional(),

//     accountType: z.enum(["pessoal", "criador", "marca"], {
//       error: "Selecione um tipo de conta", // ✅ v4: error
//     }),

//     agreedToTerms: z.literal(true, {
//       error: "Você deve aceitar os termos de uso", // ✅ v4: error
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "As senhas não coincidem",
//     path: ["confirmPassword"],
//   });

// export type RegisterFormData = z.infer<typeof registerSchema>;

// export type RegisterPayload = Omit<
//   RegisterFormData,
//   "confirmPassword" | "agreedToTerms" | "avatar"
// > & {
//   avatarUrl?: string;
// };

// // schemas/registerSchema.ts
// import { z } from "zod";
// import { phoneRegex } from "./helpers/regexHelpers";
// import { maxBirthDate, minBirthDate } from "./helpers/dateHelpers";

// const socialMediasSchema = z.object({
//   instagram: z
//     .union([z.string().url("URL do Instagram inválida"), z.literal("")])
//     .optional(),
//   tiktok: z
//     .union([z.string().url("URL do TikTok inválida"), z.literal("")])
//     .optional(),
//   youtube: z
//     .union([z.string().url("URL do YouTube inválida"), z.literal("")])
//     .optional(),
// });

// export const registerSchema = z
//   .object({
//     fullName: z
//       .string()
//       .min(3, "Nome deve ter pelo menos 3 caracteres")
//       .max(100, "Nome muito longo")
//       .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome inválido — apenas letras e espaços"),

//     username: z
//       .string()
//       .min(3, "Username deve ter pelo menos 3 caracteres")
//       .max(30, "Username muito longo")
//       .regex(
//         /^[a-z0-9._]+$/,
//         "Apenas letras minúsculas, números, pontos e underscores",
//       ),

//     // ⚠️ Corrigido: coerce para converter string em número
//     age: z.coerce
//       .number({ invalid_type_error: "Idade inválida" })
//       .int("Idade deve ser número inteiro")
//       .min(13, "Você deve ter pelo menos 13 anos")
//       .max(120, "Idade inválida"),

//     city: z
//       .string()
//       .min(2, "Cidade deve ter pelo menos 2 caracteres")
//       .max(100, "Cidade muito longa"),

//     email: z.email("E-mail inválido"),

//     password: z
//       .string()
//       .min(8, "Senha deve ter pelo menos 8 caracteres")
//       .max(72, "Senha muito longa")
//       .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
//       .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
//       .regex(/[0-9]/, "Deve conter pelo menos um número")
//       .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

//     confirmPassword: z.string(),

//     birthDate: z
//       .string()
//       .refine((val) => !isNaN(Date.parse(val)), "Data inválida")
//       .refine(
//         (val) => new Date(val) >= minBirthDate,
//         "Data de nascimento inválida",
//       )
//       .refine(
//         (val) => new Date(val) <= maxBirthDate,
//         "Você deve ter pelo menos 13 anos",
//       ),

//     // ⚠️ Corrigido: required_error para enum obrigatório
//     gender: z.enum(
//       [
//         "agenero",
//         "demigenero",
//         "feminino",
//         "genero_fluido",
//         "genero_nao_conformista",
//         "homem_trans",
//         "intersexo",
//         "masculino",
//         "mulher_trans",
//         "nao_binario",
//         "outro",
//         "queer",
//         "transgenero",
//         "travesti",
//         "prefiro_nao_dizer",
//       ],
//       { required_error: "Selecione um gênero" },
//     ),

//     country: z
//       .string()
//       .min(2, "País deve ter pelo menos 2 caracteres")
//       .max(100, "País muito longo"),

//     phone: z
//       .union([z.string().regex(phoneRegex, "Telefone inválido"), z.literal("")])
//       .optional(),

//     avatar: z
//       .instanceof(File, { message: "Arquivo inválido" })
//       .refine(
//         (file) => file.size <= 5 * 1024 * 1024,
//         "Imagem deve ter no máximo 5MB",
//       )
//       .refine(
//         (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
//         "Formato inválido — use PNG, JPG ou WEBP",
//       )
//       .nullable()
//       .optional(),

//     bio: z
//       .string()
//       .max(300, "Biografia deve ter no máximo 300 caracteres")
//       .optional(),

//     socialMedias: socialMediasSchema.optional(),

//     interests: z.string().max(200, "Interesses muito longos").optional(),

//     // ⚠️ Corrigido: required_error para enum obrigatório
//     accountType: z.enum(["pessoal", "criador", "marca"], {
//       required_error: "Selecione um tipo de conta",
//     }),

//     // ⚠️ Corrigido: agora é boolean com refine, em vez de literal(true)
//     agreedToTerms: z
//       .boolean({ required_error: "Você deve aceitar os termos de uso" })
//       .refine((val) => val === true, {
//         message: "Você deve aceitar os termos de uso",
//       }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "As senhas não coincidem",
//     path: ["confirmPassword"],
//   });

// export type RegisterFormData = z.infer<typeof registerSchema>;

// export type RegisterPayload = Omit<
//   RegisterFormData,
//   "confirmPassword" | "agreedToTerms" | "avatar"
// > & {
//   avatarUrl?: string;
// };

// // schemas/registerSchema.ts
// import { z } from "zod";
// import { phoneRegex } from "./helpers/regexHelpers";
// import { maxBirthDate, minBirthDate } from "./helpers/dateHelpers";

// export const accountTypeEnum = ["pessoal", "criador", "marca"] as const;
// export type AccountType = (typeof accountTypeEnum)[number]; // "pessoal" | "criador" | "marca"

// const socialMediasSchema = z.object({
//   instagram: z
//     .union([z.string().min(2, "Deve ter pelo menos 2 caracteres")])
//     .optional(),
//   tiktok: z
//     .union([z.string().min(2, "Deve ter pelo menos 2 caracteres")])
//     .optional(),
//   youtube: z
//     .union([z.string().min(2, "Deve ter pelo menos 2 caracteres")])
//     .optional(),
// });

// export const registerSchema = z
//   .object({
//     fullName: z
//       .string()
//       .min(3, "Nome deve ter pelo menos 3 caracteres")
//       .max(100, "Nome muito longo")
//       .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome inválido — apenas letras e espaços"),

//     username: z
//       .string()
//       .min(3, "Username deve ter pelo menos 3 caracteres")
//       .max(30, "Username muito longo")
//       .regex(
//         /^[a-z0-9._]+$/,
//         "Apenas letras minúsculas, números, pontos e underscores",
//       ),

//     age: z.preprocess(
//       (val) => (val === "" ? undefined : Number(val)),
//       z
//         .number({ error: "Idade inválida" })
//         .int("Idade deve ser número inteiro")
//         .min(13, "Você deve ter pelo menos 13 anos")
//         .max(120, "Idade inválida"),
//     ),

//     city: z
//       .string()
//       .min(2, "Cidade deve ter pelo menos 2 caracteres")
//       .max(100, "Cidade muito longa"),

//     email: z.string().email("E-mail inválido"),

//     password: z
//       .string()
//       .min(8, "Senha deve ter pelo menos 8 caracteres")
//       .max(72, "Senha muito longa")
//       .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
//       .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
//       .regex(/[0-9]/, "Deve conter pelo menos um número")
//       .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

//     confirmPassword: z.string(),

//     birthDate: z
//       .string()
//       .refine((val) => !isNaN(Date.parse(val)), "Data inválida")
//       .refine(
//         (val) => new Date(val) >= minBirthDate,
//         "Data de nascimento inválida",
//       )
//       .refine(
//         (val) => new Date(val) <= maxBirthDate,
//         "Você deve ter pelo menos 13 anos",
//       ),

//     gender: z.enum(
//       [
//         "agenero",
//         "demigenero",
//         "feminino",
//         "genero_fluido",
//         "genero_nao_conformista",
//         "homem_trans",
//         "intersexo",
//         "masculino",
//         "mulher_trans",
//         "nao_binario",
//         "outro",
//         "queer",
//         "transgenero",
//         "travesti",
//         "prefiro_nao_dizer",
//       ],
//       { error: "Selecione um gênero" },
//     ),

//     country: z
//       .string()
//       .min(2, "País deve ter pelo menos 2 caracteres")
//       .max(100, "País muito longo"),

//     phone: z
//       .union([z.string().regex(phoneRegex, "Telefone inválido"), z.literal("")])
//       .optional(),

//     avatar: z
//       .instanceof(File, { error: "Arquivo inválido" })
//       .refine(
//         (file) => file.size <= 5 * 1024 * 1024,
//         "Imagem deve ter no máximo 5MB",
//       )
//       .refine(
//         (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
//         "Formato inválido — use PNG, JPG ou WEBP",
//       )
//       .nullable()
//       .optional(),

//     bio: z
//       .string()
//       .min(50, "Biografia deve ter pelo menos 50 caracteres")
//       .max(500, "Biografia deve ter no máximo 300 caracteres"),

//     socialMedias: socialMediasSchema.optional(),

//     interests: z
//       .string()
//       .min(20, "Interesses devem ter no mínimo 20 caracteres"),

//     accountType: z.enum(["pessoal", "criador", "marca"], {
//       error: "Selecione um tipo de conta",
//     }),

//     agreedToTerms: z
//       .boolean({ error: "Você deve aceitar os termos de uso" })
//       .refine((val) => val === true, {
//         message: "Você deve aceitar os termos de uso",
//       }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "As senhas não coincidem",
//     path: ["confirmPassword"],
//   });

// export type RegisterFormData = z.infer<typeof registerSchema>;

// export type RegisterPayload = Omit<
//   RegisterFormData,
//   "confirmPassword" | "agreedToTerms" | "avatar"
// > & {
//   avatarUrl?: string;
// };

// schemas/registerSchema.ts
import { z } from "zod";
import { phoneRegex } from "./helpers/regexHelpers";
import { maxBirthDate, minBirthDate } from "./helpers/dateHelpers";

export const accountTypeEnum = ["pessoal", "criador", "marca"] as const;
export type AccountType = (typeof accountTypeEnum)[number];

const socialMediasSchema = z.object({
  instagram: z
    .union([z.string().min(2, "Deve ter pelo menos 2 caracteres")])
    .optional(),
  tiktok: z
    .union([z.string().min(2, "Deve ter pelo menos 2 caracteres")])
    .optional(),
  youtube: z
    .union([z.string().min(2, "Deve ter pelo menos 2 caracteres")])
    .optional(),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome muito longo")
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome inválido — apenas letras e espaços"),

    username: z
      .string()
      .min(3, "Username deve ter pelo menos 3 caracteres")
      .max(30, "Username muito longo")
      .regex(
        /^[a-z0-9._]+$/,
        "Apenas letras minúsculas, números, pontos e underscores",
      ),

    city: z
      .string()
      .min(2, "Cidade deve ter pelo menos 2 caracteres")
      .max(100, "Cidade muito longa")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "Cidade deve conter apenas letras e espaços",
      ),

    email: z.string().email("E-mail inválido"),

    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(72, "Senha muito longa")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

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
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "País deve conter apenas letras e espaços",
      ),

    phone: z
      .union([z.string().regex(phoneRegex, "Telefone inválido"), z.literal("")])
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
      .max(500, "Biografia deve ter no máximo 300 caracteres"),

    socialMedias: socialMediasSchema.optional(),

    interests: z
      .string()
      .min(20, "Interesses devem ter no mínimo 20 caracteres"),

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
  "confirmPassword" | "agreedToTerms" | "avatar"
> & {
  avatarUrl?: string;
};
