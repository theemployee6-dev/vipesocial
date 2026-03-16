import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";
import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";

// Defina um tipo para a análise retornada, que inclui resultado_completo como VipeFullOutput | null
type AnaliseComResultado = {
  id: string;
  criado_em: string;
  nicho: string | null;
  emocao_central: string | null;
  formula_emocional: string | null;
  video_url: string | null;
  resultado_completo: VipeFullOutput | null;
};

export const getAnaliseById = cache(
  async (
    analiseId: string,
    profileId: string,
  ): Promise<AnaliseComResultado | null> => {
    try {
      const supabase = await createServerSupabaseClient();

      const { data, error } = await supabase
        .from("analises")
        .select(
          "id, criado_em, nicho, emocao_central, formula_emocional, resultado_completo, video_url",
        )
        .eq("id", analiseId)
        .eq("profile_id", profileId)
        .maybeSingle(); // retorna null se não encontrar

      if (error || !data) {
        console.error("Erro ao buscar análise:", error);
        return null;
      }

      let resultado = data.resultado_completo;
      if (typeof resultado === "string") {
        try {
          resultado = JSON.parse(resultado);
        } catch {
          resultado = null;
        }
      }

      // Aqui podemos verificar se o objeto parseado tem a estrutura esperada? Opcional.
      // Se quiser validar com Zod, seria o local.

      return {
        id: data.id,
        criado_em: data.criado_em,
        nicho: data.nicho,
        emocao_central: data.emocao_central,
        formula_emocional: data.formula_emocional,
        video_url: data.video_url,
        resultado_completo: resultado as VipeFullOutput | null,
      };
    } catch (err) {
      console.error("Erro inesperado em getAnaliseById:", err);
      return null;
    }
  },
);
