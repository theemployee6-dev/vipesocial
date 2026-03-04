import type { VipeFullOutput } from "../../core/domain/vipe.types";

export interface SaveAnalysisInput {
  perfilId?: string | null;
  videoUrl: string;
  nicho: string;
  emocaoCentral: string;
  formulaEmocional: string;
  resultadoCompleto: VipeFullOutput;
}

export interface IAnalysisRepository {
  saveAnalysis(data: SaveAnalysisInput): Promise<void>;
}
