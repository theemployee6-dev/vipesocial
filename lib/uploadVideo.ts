import { supabase } from "@/lib/supabase";
import type { VideoMetricas, PerfilCriador } from "@/types/vipe.types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export interface UploadResult {
  publicUrl: string;
  filePath: string;
}

export interface DadosAnalise {
  metricas: VideoMetricas;
  perfilCriador: PerfilCriador;
  nichoConfirmado?: string;
}

export function validarArquivo(arquivo: File): string | null {
  if (!arquivo.type.startsWith("video/")) {
    return "Por favor, selecione um arquivo de vídeo válido.";
  }
  if (arquivo.size > MAX_FILE_SIZE) {
    return `Vídeo muito grande! Tamanho máximo: 50MB. Seu vídeo tem ${(arquivo.size / (1024 * 1024)).toFixed(1)}MB`;
  }
  return null;
}

export function formatarTamanhoArquivo(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export async function uploadVideoParaSupabase(file: File): Promise<UploadResult> {
  console.log("📤 [SUPABASE] Iniciando upload...");

  const fileExt = file.name.split(".").pop() || "mp4";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  console.log("📦 [SUPABASE] Nome gerado:", { fileName, filePath });

  const { error: uploadError } = await supabase.storage
    .from("videos-virais")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("❌ [SUPABASE] Erro no upload:", uploadError);
    throw new Error("Falha no upload do vídeo");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("videos-virais").getPublicUrl(filePath);

  console.log("✅ [SUPABASE] Upload concluído. URL:", publicUrl);

  return { publicUrl, filePath };
}

export async function enviarParaApiAnalise(
  publicUrl: string,
  dados: DadosAnalise
): Promise<unknown> {
  console.log("🌐 [API] Chamando /api/analisar...");

  const inicioChamada = Date.now();

  const response = await fetch("/api/analisar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      videoUrl: publicUrl,
      userId: null,
      metricas: dados.metricas,
      perfilCriador: dados.perfilCriador,
      nichoConfirmado: dados.nichoConfirmado ?? null,
    }),
  });

  console.log("⏱️ [API] Tempo de resposta:", Date.now() - inicioChamada, "ms");
  console.log("📊 [API] Status:", response.status, response.statusText);

  if (!response.ok) {
    const erroData = await response.json().catch(() => ({}));
    console.error("❌ [API] Erro:", erroData);
    throw new Error(erroData.error || erroData.message || "Falha na resposta da IA");
  }

  const data = await response.json();
  console.log("✅ [API] Dados recebidos com sucesso");

  return data;
}
