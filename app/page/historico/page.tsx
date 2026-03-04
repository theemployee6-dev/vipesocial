"use client";

import { useEffect, useState } from "react";
import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";
import ResultadoAnalise from "@/components/ResultadoAnalise/ResultadoAnalise";
import Link from "next/link";

interface AnaliseRow {
  id: string;
  criado_em: string;
  nicho: string;
  emocao_central: string;
  formula_emocional: string;
  video_url: string;
  resultado_completo: VipeFullOutput | null;
}

function formatData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoricoPage() {
  const [analises, setAnalises] = useState<AnaliseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionada, setSelecionada] = useState<AnaliseRow | null>(null);

  useEffect(() => {
    fetch("/api/historico")
      .then((r) => r.json())
      .then((data) => {
        setAnalises(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Abre resultado salvo
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
      {/* Topbar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b sticky top-0 z-20"
        style={{
          background: "rgba(5,8,15,0.88)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
            style={{ background: "linear-gradient(135deg, #00ff88, #00cc55)" }}
          >
            V
          </div>
          <span className="text-base font-bold tracking-tight">
            <span style={{ color: "#00ff88" }}>Vipe</span>
            <span className="text-white">Social</span>
          </span>
        </div>
        <h1 className="text-sm font-bold text-white/70">
          Histórico de Análises
        </h1>
        <Link
          href="/"
          className="text-xs px-3 py-1.5 rounded-lg font-semibold"
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
      <div className="max-w-5xl 4k:max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#00ff88", borderTopColor: "transparent" }}
            />
          </div>
        )}

        {!loading && analises.length === 0 && (
          <div className="text-center py-24 text-white/30">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-sm">Nenhuma análise encontrada.</p>
          </div>
        )}

        {!loading && analises.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {analises.map((analise) => (
              <button
                key={analise.id}
                onClick={() => setSelecionada(analise)}
                disabled={!analise.resultado_completo}
                className="text-left rounded-xl p-4 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #0d1117, #111827)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Data */}
                <p className="text-[10px] text-white/30 mb-3">
                  {formatData(analise.criado_em)}
                </p>

                {/* Nicho */}
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mb-3"
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
                  className="font-black text-base leading-snug mb-2"
                  style={{ color: "#00ff88" }}
                >
                  {analise.emocao_central}
                </p>

                {/* Fórmula */}
                <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                  {analise.formula_emocional}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between mt-4 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-[10px] text-white/25 truncate max-w-[160]">
                    {analise.video_url.split("/").pop()}
                  </span>
                  {analise.resultado_completo ? (
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: "#00ff88" }}
                    >
                      Ver análise →
                    </span>
                  ) : (
                    <span className="text-[10px] text-white/25">
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
