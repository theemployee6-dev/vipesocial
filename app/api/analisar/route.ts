import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { geminiModel, PROMPT_VIPESOCIAL } from "../../../lib/gemini";

export async function POST(request: Request) {
  try {
    // 1. Log para saber que a requisição chegou
    console.log("Recebendo requisição...");

    const formData = await request.formData();
    const videoFile = formData.get("video") as File;
    const userId = formData.get("userId") as string;

    if (!videoFile) {
      return NextResponse.json(
        { error: "Vídeo não encontrado no envio." },
        { status: 400 },
      );
    }

    // 2. Transformar o vídeo para a IA
    console.log("Transformando vídeo...");
    const bytes = await videoFile.arrayBuffer();
    const videoBase64 = Buffer.from(bytes).toString("base64");

    // 3. Chamar o Gemini
    console.log("Chamando o Gemini (isso pode demorar uns 10-20 segundos)...");
    const resultadoIA = await geminiModel.generateContent([
      PROMPT_VIPESOCIAL,
      {
        inlineData: {
          data: videoBase64,
          mimeType: videoFile.type,
        },
      },
    ]);

    const parecerTexto = resultadoIA.response.text();
    console.log("IA respondeu com sucesso!");

    // 4. Salvar no Supabase (Opcional por enquanto para teste)
    // Se o banco falhar, o código continua para você ver o resultado
    try {
      await supabase.from("analises").insert([
        {
          perfil_id: userId || null, // Se não tiver user agora, não trava
          video_url: "video_local",
          parecer_tecnico: parecerTexto,
        },
      ]);
    } catch (dbError) {
      console.error("Erro ao salvar no banco, mas a IA funcionou:", dbError);
    }

    return NextResponse.json({ resultado: parecerTexto });
  } catch (error) {
    // Aqui pegamos o erro real e mostramos no console do VS Code
    console.error("ERRO DETALHADO:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
