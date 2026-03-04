import { NextResponse } from "next/server";
import { supabase } from "@/lib/infrastructure/supabase/supbabase-client";

export async function GET() {
  const { data, error } = await supabase
    .from("analises")
    .select(
      "id, criado_em, nicho, emocao_central, formula_emocional, resultado_completo, video_url",
    )
    .order("criado_em", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // resultado_completo pode estar duplamente stringificado
  const parsed = data.map((row) => {
    let resultado = row.resultado_completo;
    try {
      if (typeof resultado === "string") resultado = JSON.parse(resultado);
      if (typeof resultado === "string") resultado = JSON.parse(resultado);
    } catch {
      resultado = null;
    }
    return { ...row, resultado_completo: resultado };
  });

  return NextResponse.json(parsed);
}
