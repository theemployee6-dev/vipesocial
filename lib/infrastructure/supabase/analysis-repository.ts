import { supabase } from "./supbabase-client";
import type {
  IAnalysisRepository,
  SaveAnalysisInput,
} from "../../core/interfaces/analysis-repository";

export class SupabaseAnalysisRepository implements IAnalysisRepository {
  async saveAnalysis(data: SaveAnalysisInput): Promise<void> {
    const { error } = await supabase.from("analises").insert([
      {
        perfil_id: data.perfilId,
        video_url: data.videoUrl,
        nicho: data.nicho,
        emocao_central: data.emocaoCentral,
        formula_emocional: data.formulaEmocional,
        resultado_completo: JSON.stringify(data.resultadoCompleto),
        criado_em: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error ao salvar análise no banco: ", error);
      // Não lançamos erro porque o salvamento não é crítico para o fluxo principal
    }
  }
}
