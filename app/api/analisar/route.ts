/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { analizarVideo } from "@/lib/gemini";
import { VipeFullOutputSchema } from "@/types/vipe.types";
import type { VideoMetricas, PerfilCriador } from "@/types/vipe.types";

// Quando for para produção na Vercel Pro, aumentar para 300
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    console.log("=".repeat(50));
    console.log("🎥 [INÍCIO] Recebendo requisição para análise VIPE...");
    console.log("=".repeat(50));

    const { videoUrl, userId, metricas, perfilCriador, nichoConfirmado } =
      await request.json();

    // ── VALIDAÇÕES ────────────────────────────────────────
    if (!videoUrl) {
      console.error("❌ [ERRO] URL do vídeo não encontrada");
      return NextResponse.json(
        { error: "URL do vídeo não encontrada." },
        { status: 400 },
      );
    }

    if (!metricas) {
      console.error("❌ [ERRO] Métricas não encontradas");
      return NextResponse.json(
        { error: "Métricas do vídeo não fornecidas." },
        { status: 400 },
      );
    }

    if (!perfilCriador) {
      console.error("❌ [ERRO] Perfil do criador não encontrado");
      return NextResponse.json(
        { error: "Perfil do criador não fornecido." },
        { status: 400 },
      );
    }

    console.log("📥 [INPUT] URL:", videoUrl.substring(0, 60) + "...");
    console.log("📥 [INPUT] Métricas:", metricas);
    console.log("📥 [INPUT] Perfil:", perfilCriador);
    console.log("📥 [INPUT] Nicho confirmado:", nichoConfirmado ?? "não informado");
    console.log("👤 [USER] ID:", userId || "anônimo");

    // ── PIPELINE VIPE ─────────────────────────────────────
    console.log("-".repeat(50));
    console.log("🧠 [VIPE] Iniciando pipeline de 4 prompts...");
    console.log("⏱️  Início:", new Date().toISOString());

    const resultado = await analizarVideo({
      videoUrl,
      metricas: metricas as VideoMetricas,
      perfilCriador: perfilCriador as PerfilCriador,
      nichoConfirmado,
    });

    console.log("⏱️  Fim:", new Date().toISOString());
    console.log("✅ [VIPE] Pipeline concluído!");

    // ── VALIDAÇÃO FINAL DO OUTPUT ─────────────────────────
    console.log("-".repeat(50));
    console.log("🔎 [ZOD] Validando estrutura do output final...");

    const validacao = VipeFullOutputSchema.safeParse(resultado);
    if (!validacao.success) {
      const issues = validacao.error.issues
        .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
        .join("\n");
      console.error("❌ [ZOD] Output inválido:\n" + issues);
      return NextResponse.json(
        { error: "A IA retornou uma estrutura inválida. Tente novamente.", detalhe: issues },
        { status: 500 },
      );
    }

    console.log("✅ [ZOD] Output validado com sucesso");
    console.log("📊 [VIPE] Nicho confirmado:", validacao.data.nicho_confirmado);
    console.log("📊 [VIPE] Emoção central:", validacao.data.prompt2.emocao_central.nome);
    console.log("📊 [VIPE] Roteiros gerados:", validacao.data.prompt4.roteiros.length);

    // ── SALVAR NO SUPABASE (background) ──────────────────
    console.log("-".repeat(50));
    console.log("💾 [BANCO] Salvando resultado no Supabase...");

    try {
      supabase.from("analises").insert([
        {
          perfil_id: userId || null,
          video_url: videoUrl,
          nicho: validacao.data.nicho_confirmado,
          emocao_central: validacao.data.prompt2.emocao_central.nome,
          formula_emocional: validacao.data.prompt2.formula_emocional,
          resultado_completo: JSON.stringify(validacao.data),
          created_at: new Date().toISOString(),
        },
      ]);
      console.log("✅ [BANCO] Inserção iniciada em background");
    } catch (dbError: any) {
      console.error("⚠️ [BANCO] Erro ao salvar (não crítico):", dbError.message);
    }

    // ── RESPOSTA FINAL ────────────────────────────────────
    console.log("-".repeat(50));
    console.log("✅ [FINAL] Enviando resposta ao cliente");
    console.log("=".repeat(50));

    return NextResponse.json({
      sucesso: true,
      resultado: validacao.data,
      formato: "json",
    });
  } catch (error: any) {
    console.error("=".repeat(50));
    console.error("❌ [ERRO GERAL]:", error.message);
    console.error("   Stack:", error.stack);
    console.error("=".repeat(50));

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

    return NextResponse.json(
      { error: mensagemErro, detalhe: error.message },
      { status: statusCode },
    );
  }
}
