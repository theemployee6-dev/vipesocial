import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";

export const getUserAnalises = cache(async (profileId: string) => {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("analises")
      .select(
        "id, criado_em, nicho, emocao_central, formula_emocional, resultado_completo, video_url",
      )
      .eq("profile_id", profileId)
      .order("criado_em", { ascending: false });

    if (error) {
      console.error("Erro ao buscar análises:", error);
      return [];
    }

    const parsedData = data.map((item) => {
      let resultado = item.resultado_completo;

      if (typeof resultado === "string") {
        try {
          resultado = JSON.parse(resultado);
        } catch {
          resultado = null; // Se o JSON for inválido, define como null
        }
      }
      return { ...item, resultado_completo: resultado };
    });

    return parsedData;
  } catch (err) {
    console.error("Erro inesperado em getUserAnalises:", err);
    // Retorna array vazio para não quebrar a UI, ou você pode lançar uma exceção personalizada
    return [];
  }
});
