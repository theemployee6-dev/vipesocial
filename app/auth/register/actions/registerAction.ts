"use server";

import { SupabaseStorageService } from "@/lib/infrastructure/supabase/storage-service";
import type { RegisterFormData } from "../schemas/registerSchema";
import { toSnakeCase } from "../utils/toSnake_case";
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";
import { supabaseAdmin } from "@/lib/infrastructure/supabase/admin-client";
type RegisterActionInput = Omit<
  RegisterFormData,
  "confirmPassword" | "agreedToTerms"
> & { age: number };

export async function registerAction(data: RegisterActionInput) {
  const supabase = await createServerSupabaseClient(); // ⬅️ cliente com cookies

  const { password, avatar, ...rest } = data;

  // 1. Cria o usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: rest.email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message ?? "Erro ao criar o usuário." };
  }

  const userId = authData.user.id;

  // 2. Upload do avatar (se existir) — salva o path, não a URL pública
  let avatarPath: string | undefined;

  if (avatar) {
    const ext = avatar.name.split(".").pop();
    const path = `${userId}/avatar.${ext}`;
    const storage = new SupabaseStorageService();

    const { error: uploadError } = await storage.uploadFile({
      bucket: "avatars_profile",
      path,
      file: avatar,
      upsert: true,
    });

    if (uploadError) {
      console.error("Upload error details:", uploadError);
      return { error: "Erro ao fazer upload do avatar." };
    }

    avatarPath = path; // ✅ salva o path — use getSignedUrl para exibir
  }

  // Converte camelCase para snake_case (apenas os campos que vão para o banco)
  const snakeData = toSnakeCase(rest); // { full_name, username, birth_date, ... }

  // 3. Insere o perfil na tabela profiles
  const payload = {
    id: userId,
    ...snakeData,
    avatar_url: avatarPath, // campo específico
  };

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert(payload);

  if (profileError) {
    return { error: profileError.message };
  }

  return { success: true };
}
