/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import { supabase } from "../../../lib/supabase";
// import { analizarVideo } from "@/lib/gemini";
// import { VipeFullOutputSchema } from "@/types/vipe.types";
// import type { VideoMetricas, PerfilCriador } from "@/types/vipe.types";

// // Quando for para produção na Vercel Pro, aumentar para 300
// export const maxDuration = 60;
// export const dynamic = "force-dynamic";

// export async function POST(request: Request) {
//   try {
//     console.log("=".repeat(50));
//     console.log("🎥 [INÍCIO] Recebendo requisição para análise VIPE...");
//     console.log("=".repeat(50));

//     const { videoUrl, userId, metricas, perfilCriador, nichoConfirmado } =
//       await request.json();

//     // ── VALIDAÇÕES ────────────────────────────────────────
//     if (!videoUrl) {
//       console.error("❌ [ERRO] URL do vídeo não encontrada");
//       return NextResponse.json(
//         { error: "URL do vídeo não encontrada." },
//         { status: 400 },
//       );
//     }

//     if (!metricas) {
//       console.error("❌ [ERRO] Métricas não encontradas");
//       return NextResponse.json(
//         { error: "Métricas do vídeo não fornecidas." },
//         { status: 400 },
//       );
//     }

//     if (!perfilCriador) {
//       console.error("❌ [ERRO] Perfil do criador não encontrado");
//       return NextResponse.json(
//         { error: "Perfil do criador não fornecido." },
//         { status: 400 },
//       );
//     }

//     console.log("📥 [INPUT] URL:", videoUrl.substring(0, 60) + "...");
//     console.log("📥 [INPUT] Métricas:", metricas);
//     console.log("📥 [INPUT] Perfil:", perfilCriador);
//     console.log(
//       "📥 [INPUT] Nicho confirmado:",
//       nichoConfirmado ?? "não informado",
//     );
//     console.log("👤 [USER] ID:", userId || "anônimo");

//     // ── PIPELINE VIPE ─────────────────────────────────────
//     console.log("-".repeat(50));
//     console.log("🧠 [VIPE] Iniciando pipeline de 4 prompts...");
//     console.log("⏱️  Início:", new Date().toISOString());

//     const resultado = await analizarVideo({
//       videoUrl,
//       metricas: metricas as VideoMetricas,
//       perfilCriador: perfilCriador as PerfilCriador,
//       nichoConfirmado,
//     });

//     console.log("⏱️  Fim:", new Date().toISOString());
//     console.log("✅ [VIPE] Pipeline concluído!");

//     // ── VALIDAÇÃO FINAL DO OUTPUT ─────────────────────────
//     console.log("-".repeat(50));
//     console.log("🔎 [ZOD] Validando estrutura do output final...");

//     const validacao = VipeFullOutputSchema.safeParse(resultado);
//     if (!validacao.success) {
//       const issues = validacao.error.issues
//         .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
//         .join("\n");
//       console.error("❌ [ZOD] Output inválido:\n" + issues);
//       return NextResponse.json(
//         {
//           error: "A IA retornou uma estrutura inválida. Tente novamente.",
//           detalhe: issues,
//         },
//         { status: 500 },
//       );
//     }

//     console.log("✅ [ZOD] Output validado com sucesso");
//     console.log("📊 [VIPE] Nicho confirmado:", validacao.data.nicho_confirmado);
//     console.log(
//       "📊 [VIPE] Emoção central:",
//       validacao.data.prompt2.emocao_central.nome,
//     );
//     console.log(
//       "📊 [VIPE] Roteiros gerados:",
//       validacao.data.prompt4.roteiros.length,
//     );

//     // ── SALVAR NO SUPABASE (background) ──────────────────
//     console.log("-".repeat(50));
//     console.log("💾 [BANCO] Salvando resultado no Supabase...");

//     try {
//       supabase.from("analises").insert([
//         {
//           perfil_id: userId || null,
//           video_url: videoUrl,
//           nicho: validacao.data.nicho_confirmado,
//           emocao_central: validacao.data.prompt2.emocao_central.nome,
//           formula_emocional: validacao.data.prompt2.formula_emocional,
//           resultado_completo: JSON.stringify(validacao.data),
//           created_at: new Date().toISOString(),
//         },
//       ]);
//       console.log("✅ [BANCO] Inserção iniciada em background");
//     } catch (dbError: any) {
//       console.error(
//         "⚠️ [BANCO] Erro ao salvar (não crítico):",
//         dbError.message,
//       );
//     }

//     // ── RESPOSTA FINAL ────────────────────────────────────
//     console.log("-".repeat(50));
//     console.log("✅ [FINAL] Enviando resposta ao cliente");
//     console.log("=".repeat(50));

//     return NextResponse.json({
//       sucesso: true,
//       resultado: validacao.data,
//       formato: "json",
//     });
//   } catch (error: any) {
//     console.error("=".repeat(50));
//     console.error("❌ [ERRO GERAL]:", error.message);
//     console.error("   Stack:", error.stack);
//     console.error("=".repeat(50));

//     let mensagemErro = "Erro interno ao analisar vídeo";
//     let statusCode = 500;

//     if (error.message?.includes("quota") || error.message?.includes("429")) {
//       mensagemErro = "Limite de análises excedido. Tente novamente mais tarde.";
//       statusCode = 429;
//     } else if (error.message?.includes("timeout")) {
//       mensagemErro = "A análise está demorando mais que o esperado.";
//       statusCode = 408;
//     } else if (error.message?.includes("API key")) {
//       mensagemErro = "Erro de autenticação com a IA.";
//       statusCode = 401;
//     } else if (error.message?.includes("mimeType")) {
//       mensagemErro = "Formato de vídeo não suportado.";
//       statusCode = 400;
//     } else if (error.message?.includes("Estrutura inválida")) {
//       mensagemErro = error.message;
//       statusCode = 500;
//     }

//     return NextResponse.json(
//       { error: mensagemErro, detalhe: error.message },
//       { status: statusCode },
//     );
//   }
// }
import { NextResponse } from "next/server";
import { AnalyzeVideoUseCase } from "../../../lib/application/use-cases/analyze-video";
import { GeminiAnalysisService } from "../../../lib/infrastructure/gemini/gemini-service";
import { SupabaseAnalysisRepository } from "../../../lib/infrastructure/supabase/analysis-repository";
import { VipeFullOutputSchema } from "../../../lib/core/domain/vipe.types";
import type {
  VideoMetricas,
  PerfilCriador,
} from "../../../lib/core/domain/vipe.types";
import { geminiModel } from "@/lib/models/geminiModels";

// ⏱️ Diz pro Next.js que essa função pode demorar até 60 segundos (coisas de IA demoram mesmo)
export const maxDuration = 60;
// 🔄 Força a função a rodar em tempo real, sem tentar cache ou otimizações
export const dynamic = "force-dynamic";

// 📥 Essa é a função que roda quando alguém faz uma requisição POST para /api/analisar
export async function POST(request: Request) {
  try {
    // 🎬 Logs bonitinhos pra gente ver no terminal o que tá acontecendo
    console.log("=".repeat(50));
    console.log("🎥 [INÍCIO] Recebendo requisição para análise VIPE...");
    console.log("=".repeat(50));

    // 📦 Pega os dados que o front-end enviou no corpo da requisição
    // videoUrl: link do vídeo no Supabase
    // userId: quem tá pedindo (se tiver logado)
    // metricas: views, likes, etc.
    // perfilCriador: idade, cidade, classe social
    // nichoConfirmado: se o usuário já disse qual é o nicho do vídeo
    const { videoUrl, userId, metricas, perfilCriador, nichoConfirmado } =
      await request.json();

    // ⚠️ Validações básicas - se faltar alguma informação importante, já rejeita o pedido
    if (!videoUrl) {
      return NextResponse.json(
        { error: "URL do vídeo não encontrada." },
        { status: 400 }, // 400 = erro do cliente (você esqueceu de mandar algo)
      );
    }
    if (!metricas) {
      return NextResponse.json(
        { error: "Métricas do vídeo não fornecidas." },
        { status: 400 },
      );
    }
    if (!perfilCriador) {
      return NextResponse.json(
        { error: "Perfil do criador não fornecido." },
        { status: 400 },
      );
    }

    // 📝 Mostra no terminal o que chegou (corta a URL pra não poluir muito)
    console.log("📥 [INPUT] URL:", videoUrl.substring(0, 60) + "...");
    console.log("👤 [USER] ID:", userId || "anônimo");

    // 🛠️ Prepara as ferramentas que vamos usar
    // 1. Pega a chave secreta da API do Google Gemini (guardada no .env)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY não configurada");

    // 2. Cria o serviço que vai conversar com o Gemini (com retry automático se der erro 503)
    const analysisService = new GeminiAnalysisService(apiKey);
    // 3. Cria o repositório que vai salvar o resultado no banco Supabase
    const analysisRepository = new SupabaseAnalysisRepository();
    // 4. Junta tudo no caso de uso (a receita completa da análise)
    const useCase = new AnalyzeVideoUseCase(
      analysisService,
      analysisRepository,
      geminiModel, // nome do modelo: "gemini-3-flash-preview"
    );

    // 🚀 Executa a análise! Essa é a parte que chama o Gemini 4 vezes (prompt 1, 2, 3 e 4)
    const resultado = await useCase.execute({
      videoUrl,
      metricas: metricas as VideoMetricas, // garante que os tipos estão certos
      perfilCriador: perfilCriador as PerfilCriador,
      nichoConfirmado,
    });

    // ✅ Dá uma última checada no resultado com o Zod (nosso segurança de tipos)
    const validacao = VipeFullOutputSchema.safeParse(resultado);
    if (!validacao.success) {
      // Se o resultado não tiver o formato esperado, mostra os erros e devolve 500
      const issues = validacao.error.issues
        .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
        .join("\n");
      console.error("❌ [ZOD] Output inválido:\n" + issues);
      return NextResponse.json(
        {
          error: "A IA retornou uma estrutura inválida. Tente novamente.",
          detalhe: issues,
        },
        { status: 500 },
      );
    }

    // 🎉 Tudo certo! Devolve o resultado pro front-end
    return NextResponse.json({
      sucesso: true,
      resultado: validacao.data,
      formato: "json",
    });
  } catch (error: any) {
    // ❌ Se qualquer erro acontecer, cai aqui
    console.error("=".repeat(50));
    console.error("❌ [ERRO GERAL]:", error.message);
    console.error("   Stack:", error.stack);
    console.error("=".repeat(50));

    // 🎯 Tenta entender qual foi o erro pra dar uma mensagem amigável pro usuário
    let mensagemErro = "Erro interno ao analisar vídeo";
    let statusCode = 500;

    if (error.message?.includes("quota") || error.message?.includes("429")) {
      mensagemErro = "Limite de análises excedido. Tente novamente mais tarde.";
      statusCode = 429;
    } else if (error.message?.includes("timeout")) {
      mensagemErro = "A análise está demorando mais que o esperado.";
      statusCode = 408;
    } else if (error.message?.includes("API key")) {
      mensagemErro = "Erro de autenticação com a IA.";
      statusCode = 401;
    } else if (error.message?.includes("mimeType")) {
      mensagemErro = "Formato de vídeo não suportado.";
      statusCode = 400;
    } else if (error.message?.includes("Estrutura inválida")) {
      mensagemErro = error.message;
      statusCode = 500;
    }

    // 📤 Devolve o erro pro front-end
    return NextResponse.json(
      { error: mensagemErro, detalhe: error.message },
      { status: statusCode },
    );
  }
}
