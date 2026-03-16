"use client";
import Link from "next/link";
import ResultadoAnalise from "@/components/ResultadoAnalise/ResultadoAnalise";
import { VipeFullOutput } from "@/lib/core/domain/vipe.types";
import Logo from "@/shared/ui/Logo";
import { useState } from "react";

type AnaliseRow = {
  id: string;
  criado_em: string;
  nicho: string | null;
  emocao_central: string | null;
  formula_emocional: string | null;
  video_url: string | null;
  resultado_completo: VipeFullOutput | null;
};

function formatData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoricoClient({
  analises,
}: {
  analises: AnaliseRow[];
}) {
  const [selecionada, setSelecionada] = useState<AnaliseRow | null>(null);

  if (selecionada?.resultado_completo) {
    return (
      <ResultadoAnalise
        resultado={selecionada.resultado_completo}
        onVoltar={() => setSelecionada(null)}
      />
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse at 10% 0%, #0a1f10 0%, #05080f 55%)",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Topbar (mantida igual) */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 4k:px-16 py-3 border-b sticky top-0 z-20"
        style={{
          background: "rgba(5,8,15,0.88)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Link href={"/"}>
          <div className="w-[100] sm:w-[120] md:w-[140] lg:w-[160] xl:w-[180] 2xl:w-[200] 4k:w-[240] h-auto">
            <Logo />
          </div>
        </Link>
        <h1 className="text-sm md:text-base font-bold text-white/70">
          Histórico de Análises
        </h1>
        <Link
          href="/"
          className="text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold"
          style={{
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.2)",
            color: "#00ff88",
          }}
        >
          + Nova análise
        </Link>
      </div>

      {/* Conteúdo */}
      <div className="max-w-5xl 4k:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 4k:px-16 py-8">
        {analises.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-4xl md:text-5xl mb-4">📭</p>
            <p className="text-sm md:text-base">Nenhuma análise encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {analises.map((analise) => (
              <button
                key={analise.id}
                onClick={() => setSelecionada(analise)}
                disabled={!analise.resultado_completo}
                className="text-left rounded-xl p-4 md:p-5 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #0d1117, #111827)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Data */}
                <p className="text-[10px] md:text-xs text-white/30 mb-3">
                  {formatData(analise.criado_em)}
                </p>

                {/* vídeo */}
                <div className="mb-3">
                  <video
                    src={analise.video_url || undefined}
                    className="w-full h-auto"
                  />
                </div>

                {/* Nicho */}
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold mb-3"
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    color: "#00ff88",
                    border: "1px solid rgba(0,255,136,0.2)",
                  }}
                >
                  {analise.nicho}
                </span>

                {/* Emoção central */}
                <p
                  className="font-black text-base md:text-lg leading-snug mb-2"
                  style={{ color: "#00ff88" }}
                >
                  {analise.emocao_central}
                </p>

                {/* Fórmula */}
                <p className="text-xs md:text-sm text-white/40 leading-relaxed line-clamp-3">
                  {analise.formula_emocional}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between mt-4 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-[10px] md:text-xs text-white/25 truncate max-w-[160] md:max-w-[200]">
                    {analise.video_url?.split("/").pop()}
                  </span>
                  {analise.resultado_completo ? (
                    <span
                      className="text-[10px] md:text-xs font-bold"
                      style={{ color: "#00ff88" }}
                    >
                      Ver análise →
                    </span>
                  ) : (
                    <span className="text-[10px] md:text-xs text-white/25">
                      Indisponível
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
