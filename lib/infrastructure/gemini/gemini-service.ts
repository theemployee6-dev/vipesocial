import { GoogleGenAI } from "@google/genai";
import type {
  IAnalysisService,
  GenerateContentOptions,
} from "../../core/interfaces/analysis-service";

export class GeminiAnalysisService implements IAnalysisService {
  private ai: GoogleGenAI;
  private maxRetries: number;
  private retryDelayBase: number; // em ms

  constructor(apiKey: string, maxRetries = 3, retryDelayBase = 1000) {
    this.ai = new GoogleGenAI({ apiKey });
    this.maxRetries = maxRetries;
    this.retryDelayBase = retryDelayBase;
  }

  async generateContent(options: GenerateContentOptions) {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await this.ai.models.generateContent({
          model: options.model,
          contents: options.contents,
          config: options.config,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        lastError = error;

        // Verifica se é erro 503 (service unavailable)
        const is503 =
          error.message?.includes("503") ||
          error.message?.includes("UNAVAILABLE") ||
          error.status === 503 ||
          error.code === 503;

        // Se não for 503 ou foi a última tentativa, interrompe o loop
        if (!is503 || attempt === this.maxRetries - 1) {
          break;
        }

        // Backoff exponencial: 1s, 2s, 4s, ...
        const delay = this.retryDelayBase * Math.pow(2, attempt);
        console.log(
          `🔄 [Gemini] Tentativa ${attempt + 1} falhou (503). Nova tentativa em ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // Se chegou aqui, todas as tentativas falharam
    throw (
      lastError ||
      new Error("Falha ao gerar conteúdo após múltiplas tentativas")
    );
  }
}
