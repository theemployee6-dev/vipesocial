"use server";

import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";
import { loginSchemas } from "../schemas/loginSchemas";
import type { LoginFormData } from "../schemas/loginSchemas";

type LoginActionResult = { error: string } | { success: true; userId: string };

export async function loginAction(
  data: LoginFormData,
): Promise<LoginActionResult> {
  try {
    //validação adicional
    const parsed = loginSchemas.safeParse(data);
    if (!parsed.success) {
      return { error: "Dados de entrada inválidos." };
    }

    const supabase = await createServerSupabaseClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return { error: "E-mail ou senha incorretos." };
      }
      return { error: error.message };
    }

    if (!authData.user) {
      return { error: "Usuário não encontrado." };
    }

    return { success: true, userId: authData.user.id };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro inesperado no loginAction:", error.message);
    return {
      error:
        error instanceof Error ? error.message : "Erro interno no servidor.",
    };
  }
}
