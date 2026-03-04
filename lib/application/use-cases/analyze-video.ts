// import type { IAnalysisService } from "../../core/interfaces/analysis-service";
// import type { IAnalysisRepository } from "../../core/interfaces/analysis-repository";
// import {
//   VipePrompt1OutputSchema,
//   VipePrompt2OutputSchema,
//   VipePrompt3OutputSchema,
//   VipePrompt4OutputSchema,
//   type PerfilCriador,
//   type VideoMetricas,
//   type VipeAnalysisInput,
//   type VipeFullOutput,
//   type VipePrompt1Output,
//   type VipePrompt2Output,
//   type VipePrompt3Output,
// } from "../../core/domain/vipe.types";
// import prompt1Json from "../../prompts/vipeSocial_engine_p1.json";
// import prompt2Json from "../../prompts/vipeSocial_engine_p2.json";
// import prompt3Json from "../../prompts/vipeSocial_engine_p3.json";
// import prompt4Json from "../../prompts/vipeSocial_engine_p4.json";
// import { z } from "zod"; // Import necessário para o tipo ZodType

// // Helpers de construção de prompts (privadas ao caso de uso)
// function buildPrompt1Text(metricas: VideoMetricas): string {
//   const prompt = JSON.parse(JSON.stringify(prompt1Json));
//   prompt.input.metricas = metricas;
//   return JSON.stringify(prompt, null, 2);
// }

// function buildPrompt2Text(
//   p1: VipePrompt1Output,
//   nichoConfirmado: string,
// ): string {
//   const prompt = JSON.parse(JSON.stringify(prompt2Json));
//   prompt.input.sinal_dominante_das_metricas = p1.sinal_dominante_das_metricas;
//   prompt.input.hook = p1.hook;
//   prompt.input.estrutura_de_retencao = p1.estrutura_de_retencao;
//   prompt.input.dna_emocional_puro = p1.dna_emocional_puro;
//   prompt.input.nicho_confirmado = nichoConfirmado;
//   return JSON.stringify(prompt, null, 2);
// }

// function buildPrompt3Text(
//   p1: VipePrompt1Output,
//   p2: VipePrompt2Output,
//   nichoConfirmado: string,
//   perfil: PerfilCriador,
// ): string {
//   const prompt = JSON.parse(JSON.stringify(prompt3Json));
//   prompt.input.formula_emocional = p2.formula_emocional;
//   prompt.input.emocao_central = p2.emocao_central;
//   prompt.input.cadeia_emocional = p2.cadeia_emocional;
//   prompt.input.gatilho_de_acao = p2.gatilho_de_acao;
//   prompt.input.alerta_de_replicacao = p2.alerta_de_replicacao;
//   prompt.input.hook = p1.hook;
//   prompt.input.estrutura_de_retencao = p1.estrutura_de_retencao;
//   prompt.input.nicho_confirmado = nichoConfirmado;
//   prompt.input.perfil_do_criador = perfil;
//   return JSON.stringify(prompt, null, 2);
// }

// function buildPrompt4Text(
//   p1: VipePrompt1Output,
//   p2: VipePrompt2Output,
//   p3: VipePrompt3Output, // Agora tipado corretamente
//   nichoConfirmado: string,
//   perfil: PerfilCriador,
// ): string {
//   const prompt = JSON.parse(JSON.stringify(prompt4Json));
//   prompt.input.conceitos_finais = p3.conceitos_finais;
//   prompt.input.formula_emocional = p2.formula_emocional;
//   prompt.input.emocao_central = p2.emocao_central;
//   prompt.input.hook = p1.hook;
//   prompt.input.estrutura_de_retencao = p1.estrutura_de_retencao;
//   prompt.input.nicho_confirmado = nichoConfirmado;
//   prompt.input.perfil_do_criador = perfil;
//   return JSON.stringify(prompt, null, 2);
// }

// // Função auxiliar para parse e validação com Zod - AGORA TIPADA CORRETAMENTE
// function parseAndValidate<T>(
//   raw: string,
//   schema: z.ZodType<T>, // Usa ZodType diretamente
//   promptName: string,
// ): T {
//   let cleaned = raw.trim();
//   if (cleaned.startsWith("```")) {
//     cleaned = cleaned
//       .replace(/^```[a-zA-Z]*\n?/, "")
//       .replace(/```$/, "")
//       .trim();
//   }

//   let parsed: unknown;
//   try {
//     parsed = JSON.parse(cleaned);
//   } catch (err) {
//     console.error(`❌ [${promptName}] Falha ao fazer parse do JSON:`, err);
//     throw new Error(`[${promptName}] JSON inválido na resposta da IA`);
//   }

//   const result = schema.safeParse(parsed);
//   if (!result.success) {
//     const issues = result.error.issues
//       .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
//       .join("\n");
//     console.error(`❌ [${promptName}] Validação Zod falhou:\n${issues}`);
//     throw new Error(
//       `[${promptName}] Estrutura inválida na resposta da IA:\n${issues}`,
//     );
//   }

//   return result.data;
// }

// export class AnalyzeVideoUseCase {
//   constructor(
//     private analysisService: IAnalysisService,
//     private analysisRepository: IAnalysisRepository,
//     private modelName: string,
//   ) {}

//   async execute(input: VipeAnalysisInput): Promise<VipeFullOutput> {
//     const {
//       videoUrl,
//       metricas,
//       perfilCriador,
//       nichoConfirmado: preNicho,
//     } = input;

//     console.log("=".repeat(50));
//     console.log("🎬 [VIPE] INÍCIO DO PIPELINE - 4 PROMPTS");
//     console.log("=".repeat(50));

//     // Prompt 1
//     console.log("\n" + "-".repeat(50));
//     console.log("🔍 [PROMPT 1] Iniciando análise do vídeo...");

//     const response1 = await this.analysisService.generateContent({
//       model: this.modelName,
//       contents: [
//         {
//           role: "user",
//           parts: [
//             { fileData: { mimeType: "video/mp4", fileUri: videoUrl } },
//             { text: buildPrompt1Text(metricas) },
//           ],
//         },
//       ],
//       config: {
//         temperature: 0.2,
//         maxOutputTokens: 8192,
//         responseMimeType: "application/json",
//       },
//     });

//     const rawP1 =
//       response1.text ??
//       response1.candidates?.[0]?.content?.parts?.[0]?.text ??
//       "";
//     if (!rawP1) throw new Error("Prompt 1 retornou resposta vazia");

//     const prompt1Output = parseAndValidate(
//       rawP1,
//       VipePrompt1OutputSchema, // Agora o tipo é inferido corretamente
//       "PROMPT 1",
//     );
//     const nicho = preNicho ?? prompt1Output.nicho_inferido;

//     // Prompt 2
//     console.log("\n" + "-".repeat(50));
//     console.log("🔬 [PROMPT 2] Destilando emoção central...");

//     const response2 = await this.analysisService.generateContent({
//       model: this.modelName,
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: buildPrompt2Text(prompt1Output, nicho) }],
//         },
//       ],
//       config: {
//         temperature: 0.2,
//         maxOutputTokens: 4096,
//         responseMimeType: "application/json",
//       },
//     });

//     const rawP2 =
//       response2.text ??
//       response2.candidates?.[0]?.content?.parts?.[0]?.text ??
//       "";
//     if (!rawP2) throw new Error("Prompt 2 retornou resposta vazia");

//     const prompt2Output = parseAndValidate(
//       rawP2,
//       VipePrompt2OutputSchema,
//       "PROMPT 2",
//     );

//     // Prompt 3
//     console.log("\n" + "-".repeat(50));
//     console.log(
//       "🎯 [PROMPT 3] Reconstruindo conceitos para o perfil do criador...",
//     );

//     const response3 = await this.analysisService.generateContent({
//       model: this.modelName,
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: buildPrompt3Text(
//                 prompt1Output,
//                 prompt2Output,
//                 nicho,
//                 perfilCriador,
//               ),
//             },
//           ],
//         },
//       ],
//       config: {
//         temperature: 0.4,
//         maxOutputTokens: 8192,
//         responseMimeType: "application/json",
//       },
//     });

//     const rawP3 =
//       response3.text ??
//       response3.candidates?.[0]?.content?.parts?.[0]?.text ??
//       "";
//     if (!rawP3) throw new Error("Prompt 3 retornou resposta vazia");

//     const prompt3Output = parseAndValidate(
//       rawP3,
//       VipePrompt3OutputSchema,
//       "PROMPT 3",
//     );

//     // Prompt 4
//     console.log("\n" + "-".repeat(50));
//     console.log("🎬 [PROMPT 4] Gerando roteiros completos...");

//     const response4 = await this.analysisService.generateContent({
//       model: this.modelName,
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: buildPrompt4Text(
//                 prompt1Output,
//                 prompt2Output,
//                 prompt3Output,
//                 nicho,
//                 perfilCriador,
//               ),
//             },
//           ],
//         },
//       ],
//       config: {
//         temperature: 0.5,
//         maxOutputTokens: 16384,
//         responseMimeType: "application/json",
//       },
//     });

//     const rawP4 =
//       response4.text ??
//       response4.candidates?.[0]?.content?.parts?.[0]?.text ??
//       "";
//     if (!rawP4) throw new Error("Prompt 4 retornou resposta vazia");

//     const prompt4Output = parseAndValidate(
//       rawP4,
//       VipePrompt4OutputSchema,
//       "PROMPT 4",
//     );

//     // Montar resultado final
//     const fullOutput: VipeFullOutput = {
//       prompt1: prompt1Output,
//       nicho_confirmado: nicho,
//       prompt2: prompt2Output,
//       prompt3: prompt3Output,
//       prompt4: prompt4Output,
//     };

//     // Salvar no banco em background (não aguardamos)
//     this.analysisRepository
//       .saveAnalysis({
//         perfilId: null, // userId será passado pela API route
//         videoUrl,
//         nicho,
//         emocaoCentral: prompt2Output.emocao_central.nome,
//         formulaEmocional: prompt2Output.formula_emocional,
//         resultadoCompleto: fullOutput,
//       })
//       .catch((err) =>
//         console.error("Erro ao salvar análise (background):", err),
//       );

//     console.log("\n" + "=".repeat(50));
//     console.log("🏁 [VIPE] PIPELINE CONCLUÍDO COM SUCESSO");
//     console.log("=".repeat(50));

//     return fullOutput;
//   }
// }

import type { IAnalysisService } from "../../core/interfaces/analysis-service";
import type { IAnalysisRepository } from "../../core/interfaces/analysis-repository";
import {
  VipePrompt1OutputSchema,
  VipePrompt2OutputSchema,
  VipePrompt3OutputSchema,
  VipePrompt4OutputSchema,
  type PerfilCriador,
  type VideoMetricas,
  type VipeAnalysisInput,
  type VipeFullOutput,
  type VipePrompt1Output,
  type VipePrompt2Output,
  type VipePrompt3Output,
} from "../../core/domain/vipe.types";
import prompt1Json from "../../prompts/vipeSocial_engine_p1.json";
import prompt2Json from "../../prompts/vipeSocial_engine_p2.json";
import prompt3Json from "../../prompts/vipeSocial_engine_p3.json";
import prompt4Json from "../../prompts/vipeSocial_engine_p4.json";
import { z } from "zod";
import { jsonrepair } from "jsonrepair";

// Helpers de construção de prompts (privadas ao caso de uso)
function buildPrompt1Text(metricas: VideoMetricas): string {
  const prompt = JSON.parse(JSON.stringify(prompt1Json));
  prompt.input.metricas = metricas;
  return JSON.stringify(prompt, null, 2);
}

function buildPrompt2Text(
  p1: VipePrompt1Output,
  nichoConfirmado: string,
): string {
  const prompt = JSON.parse(JSON.stringify(prompt2Json));
  prompt.input.sinal_dominante_das_metricas = p1.sinal_dominante_das_metricas;
  prompt.input.hook = p1.hook;
  prompt.input.estrutura_de_retencao = p1.estrutura_de_retencao;
  prompt.input.dna_emocional_puro = p1.dna_emocional_puro;
  prompt.input.nicho_confirmado = nichoConfirmado;
  return JSON.stringify(prompt, null, 2);
}

function buildPrompt3Text(
  p1: VipePrompt1Output,
  p2: VipePrompt2Output,
  nichoConfirmado: string,
  perfil: PerfilCriador,
): string {
  const prompt = JSON.parse(JSON.stringify(prompt3Json));
  prompt.input.formula_emocional = p2.formula_emocional;
  prompt.input.emocao_central = p2.emocao_central;
  prompt.input.cadeia_emocional = p2.cadeia_emocional;
  prompt.input.gatilho_de_acao = p2.gatilho_de_acao;
  prompt.input.alerta_de_replicacao = p2.alerta_de_replicacao;
  prompt.input.hook = p1.hook;
  prompt.input.estrutura_de_retencao = p1.estrutura_de_retencao;
  prompt.input.nicho_confirmado = nichoConfirmado;
  prompt.input.perfil_do_criador = perfil;
  return JSON.stringify(prompt, null, 2);
}

function buildPrompt4Text(
  p1: VipePrompt1Output,
  p2: VipePrompt2Output,
  p3: VipePrompt3Output,
  nichoConfirmado: string,
  perfil: PerfilCriador,
): string {
  const prompt = JSON.parse(JSON.stringify(prompt4Json));
  prompt.input.conceitos_finais = p3.conceitos_finais;
  prompt.input.formula_emocional = p2.formula_emocional;
  prompt.input.emocao_central = p2.emocao_central;
  prompt.input.hook = p1.hook;
  prompt.input.estrutura_de_retencao = p1.estrutura_de_retencao;
  prompt.input.nicho_confirmado = nichoConfirmado;
  prompt.input.perfil_do_criador = perfil;
  return JSON.stringify(prompt, null, 2);
}

// ─── parseAndValidate com reparo automático de JSON ───────────────────────────
function parseAndValidate<T>(
  raw: string,
  schema: z.ZodType<T>,
  promptName: string,
): T {
  // 1. Remove markdown code fences se existirem
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```[a-zA-Z]*\n?/, "")
      .replace(/```$/, "")
      .trim();
  }

  // 2. Tenta parse direto (caminho feliz)
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (firstErr) {
    // 3. JSON corrompido — tenta reparar antes de desistir
    console.warn(
      `⚠️ [${promptName}] JSON inválido — tentando reparar automaticamente...`,
    );
    try {
      const repaired = jsonrepair(cleaned);
      parsed = JSON.parse(repaired);
      console.log(`✅ [${promptName}] JSON reparado com sucesso.`);
    } catch {
      console.error(
        `❌ [${promptName}] Falha ao fazer parse do JSON:`,
        firstErr,
      );
      throw new Error(`[${promptName}] JSON inválido na resposta da IA`);
    }
  }

  // 4. Valida com Zod
  const result = schema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    console.error(`❌ [${promptName}] Validação Zod falhou:\n${issues}`);
    throw new Error(
      `[${promptName}] Estrutura inválida na resposta da IA:\n${issues}`,
    );
  }

  return result.data;
}

export class AnalyzeVideoUseCase {
  constructor(
    private analysisService: IAnalysisService,
    private analysisRepository: IAnalysisRepository,
    private modelName: string,
  ) {}

  async execute(input: VipeAnalysisInput): Promise<VipeFullOutput> {
    const {
      videoUrl,
      metricas,
      perfilCriador,
      nichoConfirmado: preNicho,
    } = input;

    console.log("=".repeat(50));
    console.log("🎬 [VIPE] INÍCIO DO PIPELINE - 4 PROMPTS");
    console.log("=".repeat(50));

    // Prompt 1
    console.log("\n" + "-".repeat(50));
    console.log("🔍 [PROMPT 1] Iniciando análise do vídeo...");

    const response1 = await this.analysisService.generateContent({
      model: this.modelName,
      contents: [
        {
          role: "user",
          parts: [
            { fileData: { mimeType: "video/mp4", fileUri: videoUrl } },
            { text: buildPrompt1Text(metricas) },
          ],
        },
      ],
      config: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const rawP1 =
      response1.text ??
      response1.candidates?.[0]?.content?.parts?.[0]?.text ??
      "";
    if (!rawP1) throw new Error("Prompt 1 retornou resposta vazia");

    const prompt1Output = parseAndValidate(
      rawP1,
      VipePrompt1OutputSchema,
      "PROMPT 1",
    );
    const nicho = preNicho ?? prompt1Output.nicho_inferido;

    // Prompt 2
    console.log("\n" + "-".repeat(50));
    console.log("🔬 [PROMPT 2] Destilando emoção central...");

    const response2 = await this.analysisService.generateContent({
      model: this.modelName,
      contents: [
        {
          role: "user",
          parts: [{ text: buildPrompt2Text(prompt1Output, nicho) }],
        },
      ],
      config: {
        temperature: 0.2,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    });

    const rawP2 =
      response2.text ??
      response2.candidates?.[0]?.content?.parts?.[0]?.text ??
      "";
    if (!rawP2) throw new Error("Prompt 2 retornou resposta vazia");

    const prompt2Output = parseAndValidate(
      rawP2,
      VipePrompt2OutputSchema,
      "PROMPT 2",
    );

    // Prompt 3
    console.log("\n" + "-".repeat(50));
    console.log(
      "🎯 [PROMPT 3] Reconstruindo conceitos para o perfil do criador...",
    );

    const response3 = await this.analysisService.generateContent({
      model: this.modelName,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: buildPrompt3Text(
                prompt1Output,
                prompt2Output,
                nicho,
                perfilCriador,
              ),
            },
          ],
        },
      ],
      config: {
        temperature: 0.4,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const rawP3 =
      response3.text ??
      response3.candidates?.[0]?.content?.parts?.[0]?.text ??
      "";
    if (!rawP3) throw new Error("Prompt 3 retornou resposta vazia");

    const prompt3Output = parseAndValidate(
      rawP3,
      VipePrompt3OutputSchema,
      "PROMPT 3",
    );

    // Prompt 4
    console.log("\n" + "-".repeat(50));
    console.log("🎬 [PROMPT 4] Gerando roteiros completos...");

    const response4 = await this.analysisService.generateContent({
      model: this.modelName,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: buildPrompt4Text(
                prompt1Output,
                prompt2Output,
                prompt3Output,
                nicho,
                perfilCriador,
              ),
            },
          ],
        },
      ],
      config: {
        temperature: 0.5,
        maxOutputTokens: 16384,
        responseMimeType: "application/json",
      },
    });

    const rawP4 =
      response4.text ??
      response4.candidates?.[0]?.content?.parts?.[0]?.text ??
      "";
    if (!rawP4) throw new Error("Prompt 4 retornou resposta vazia");

    const prompt4Output = parseAndValidate(
      rawP4,
      VipePrompt4OutputSchema,
      "PROMPT 4",
    );

    // Montar resultado final
    const fullOutput: VipeFullOutput = {
      prompt1: prompt1Output,
      nicho_confirmado: nicho,
      prompt2: prompt2Output,
      prompt3: prompt3Output,
      prompt4: prompt4Output,
    };

    // Salvar no banco em background (não aguardamos)
    this.analysisRepository
      .saveAnalysis({
        perfilId: null,
        videoUrl,
        nicho,
        emocaoCentral: prompt2Output.emocao_central.nome,
        formulaEmocional: prompt2Output.formula_emocional,
        resultadoCompleto: fullOutput,
      })
      .catch((err) =>
        console.error("Erro ao salvar análise (background):", err),
      );

    console.log("\n" + "=".repeat(50));
    console.log("🏁 [VIPE] PIPELINE CONCLUÍDO COM SUCESSO");
    console.log("=".repeat(50));

    return fullOutput;
  }
}
