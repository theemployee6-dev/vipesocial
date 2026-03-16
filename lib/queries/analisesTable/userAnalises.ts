import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";
import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";

// Tipo para os dados retornados pela função (igual ao usado no HistoricoClient)
export type AnaliseRow = {
  id: string;
  criado_em: string;
  nicho: string | null;
  emocao_central: string | null;
  formula_emocional: string | null;
  video_url: string | null;
  resultado_completo: VipeFullOutput | null;
};

export const getUserAnalises = cache(
  async (profileId: string): Promise<AnaliseRow[]> => {
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

      // Mapeia os dados, fazendo parse do JSON se necessário
      const parsedData: AnaliseRow[] = data.map((item) => {
        let resultado = item.resultado_completo;

        if (typeof resultado === "string") {
          try {
            resultado = JSON.parse(resultado);
          } catch {
            resultado = null;
          }
        }

        return {
          id: item.id,
          criado_em: item.criado_em,
          nicho: item.nicho,
          emocao_central: item.emocao_central,
          formula_emocional: item.formula_emocional,
          video_url: item.video_url,
          resultado_completo: resultado as VipeFullOutput | null,
        };
      });

      return parsedData;
    } catch (err) {
      console.error("Erro inesperado em getUserAnalises:", err);
      return [];
    }
  },
);
