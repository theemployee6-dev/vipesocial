import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { geminiModel, PROMPT_VIPESOCIAL } from "../../../lib/gemini";

// Configurações cruciais para a Vercel
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    console.log("Recebendo requisição via URL...");

    // 1. Agora lemos JSON em vez de FormData
    const { videoUrl, userId } = await request.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: "URL do vídeo não encontrada." },
        { status: 400 },
      );
    }

    // 2. Baixar o vídeo do Supabase para enviar ao Gemini
    // Precisamos converter para Buffer para a IA conseguir processar
    console.log("Baixando vídeo do Storage para processamento...");
    const responseVideo = await fetch(videoUrl);
    const arrayBuffer = await responseVideo.arrayBuffer();
    const videoBase64 = Buffer.from(arrayBuffer).toString("base64");

    // 3. Chamar o Gemini
    console.log("Chamando o Gemini (Neuro-Architect em ação)...");
    const resultadoIA = await geminiModel.generateContent([
      PROMPT_VIPESOCIAL,
      {
        inlineData: {
          data: videoBase64,
          mimeType: "video/mp4", // Como vem do seu bucket, geralmente é mp4
        },
      },
    ]);

    const parecerTexto = resultadoIA.response.text();
    console.log("IA respondeu com sucesso!");

    // 4. Salvar no Supabase
    try {
      await supabase.from("analises").insert([
        {
          perfil_id: userId || null,
          video_url: videoUrl, // Agora salvamos a URL real do Storage!
          parecer_tecnico: parecerTexto,
        },
      ]);
      console.log("Dados salvos no banco!");
    } catch (dbError) {
      console.error("Erro ao salvar no banco:", dbError);
    }

    return NextResponse.json({ resultado: parecerTexto });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("ERRO DETALHADO:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno" },
      { status: 500 },
    );
  }
}
