import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";
import { notFound } from "next/navigation";

export const getProfile = cache(async (userId: string) => {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !profile) notFound();

    return profile;
  } catch (error) {
    // Log do erro para depuração (opcional)
    console.error("Erro inesperado em getProfile:", error);
    // Pode redirecionar para uma página de erro 500 ou chamar notFound()
    notFound(); // ou throw new Error("Erro interno");
  }
});
