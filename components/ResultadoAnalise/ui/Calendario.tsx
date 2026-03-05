import type { ConceitoComRoteiro } from "../hooks/useResultadoAnalise";
import { colors } from "../constants/colors.ResultadoAnalise";
import { Tooltip } from "./index";

const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

interface Props {
  conceitosComRoteiro: ConceitoComRoteiro[];
  getDiasPostagem: (horario: string) => string[];
}

export default function Calendario({
  conceitosComRoteiro,
  getDiasPostagem,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Resumo */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Vídeos para Postar",
            value: conceitosComRoteiro.length,
            icon: "🎬",
            cor: colors.primary[500],
          },
          {
            label: "Semanas de Conteúdo",
            value: 4,
            icon: "📅",
            cor: "#3b82f6",
          },
          {
            label: "Horários Mapeados",
            value: conceitosComRoteiro.length,
            icon: "🕐",
            cor: "#f59e0b",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-xl p-4 text-center"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border.default}`,
            }}
          >
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="font-black text-3xl" style={{ color: s.cor }}>
              {s.value}
            </p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grade de horários */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${colors.border.glow}`,
          boxShadow: "0 0 24px rgba(0,255,136,0.06)",
        }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{
            borderColor: colors.border.lighter,
            background: colors.background.card,
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: colors.primary[500] }}
          >
            🕐 <Tooltip term="Setup">Horários Ideais por Vídeo</Tooltip>
          </p>
        </div>

        <div
          className="divide-y"
          style={{ background: "linear-gradient(135deg, #0d1117, #111827)" }}
        >
          {conceitosComRoteiro.map(({ conceito, roteiro, cor }, idx) => {
            if (!roteiro) return null;
            const horario =
              roteiro.cabecalho.melhor_horario_para_postar.horario;
            const diasRecomendados = getDiasPostagem(horario);

            return (
              <div
                key={conceito.numero}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3.5"
                style={{ borderColor: colors.border.lighter }}
              >
                {/* Número */}
                <span
                  className="font-black text-2xl shrink-0 w-7 text-center"
                  style={{ color: cor }}
                >
                  {conceito.numero}
                </span>

                {/* Título + justificativa */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white/85 leading-snug">
                    {roteiro.cabecalho.titulo}
                  </p>
                  <p className="text-xs text-white/35 mt-0.5 leading-snug">
                    {roteiro.cabecalho.melhor_horario_para_postar.justificativa}
                  </p>
                </div>

                {/* Dias recomendados */}
                <div className="flex gap-1 shrink-0">
                  {DIAS_SEMANA.map((dia) => {
                    const ativo = diasRecomendados.includes(dia);
                    return (
                      <div
                        key={dia}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-bold transition-all"
                        style={{
                          background: ativo ? `${cor}18` : "#1f2937",
                          color: ativo ? cor : "#374151",
                          border: `1px solid ${ativo ? `${cor}35` : "transparent"}`,
                        }}
                      >
                        {dia.slice(0, 3)}
                      </div>
                    );
                  })}
                </div>

                {/* Horário */}
                <div
                  className="shrink-0 rounded-lg px-3 py-2 text-center"
                  style={{
                    background: `${cor}12`,
                    border: `1px solid ${cor}28`,
                    minWidth: 72,
                  }}
                >
                  <p
                    className="font-black text-lg leading-none"
                    style={{ color: cor }}
                  >
                    {horario}
                  </p>
                  <p className="text-[9px] text-white/35 mt-0.5">
                    {roteiro.cabecalho.duracao_alvo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plano semanal */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid ${colors.border.default}` }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{
            borderColor: colors.border.lighter,
            background: colors.background.card,
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: colors.primary[500] }}
          >
            📅 Plano de Postagem — 4 Semanas
          </p>
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y sm:divide-y-0"
          style={{
            background: "linear-gradient(135deg, #0d1117, #111827)",
            borderColor: colors.border.lighter,
          }}
        >
          {conceitosComRoteiro.map(({ conceito, roteiro, cor }, idx) => {
            if (!roteiro) return null;
            const semana = idx + 1;
            const horario =
              roteiro.cabecalho.melhor_horario_para_postar.horario;
            const dias = getDiasPostagem(horario);

            return (
              <div
                key={conceito.numero}
                className="p-4"
                style={{ borderColor: colors.border.lighter }}
              >
                <p
                  className="text-[9px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: "#4b5563" }}
                >
                  Semana {semana}
                </p>
                <div className="flex items-start gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-1"
                    style={{ background: cor }}
                  />
                  <p className="text-xs font-bold text-white/80 leading-snug">
                    {roteiro.cabecalho.titulo}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg" style={{ color: cor }}>
                    {horario}
                  </span>
                  <span className="text-[10px] text-white/30">
                    {dias.slice(0, 2).join(", ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Justificativas */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid ${colors.border.default}` }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{
            borderColor: colors.border.lighter,
            background: colors.background.card,
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: colors.primary[500] }}
          >
            💡 Por que Esses Horários?
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4"
          style={{ background: "linear-gradient(135deg, #0d1117, #111827)" }}
        >
          {conceitosComRoteiro.map(({ conceito, roteiro, cor }) => {
            if (!roteiro) return null;
            return (
              <div
                key={conceito.numero}
                className="rounded-xl p-3.5 flex gap-3"
                style={{
                  background: `${cor}06`,
                  border: `1px solid ${cor}18`,
                }}
              >
                <p
                  className="font-black text-2xl shrink-0 leading-none"
                  style={{ color: cor }}
                >
                  {roteiro.cabecalho.melhor_horario_para_postar.horario}
                </p>
                <div>
                  <p className="text-xs font-bold text-white/70 mb-1">
                    {roteiro.cabecalho.titulo}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {roteiro.cabecalho.melhor_horario_para_postar.justificativa}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dica de consistência */}
      <div
        className="rounded-xl p-4 flex gap-3"
        style={{
          background: "rgba(0,255,136,0.04)",
          border: `1px solid rgba(0,255,136,0.2)`,
        }}
      >
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <p
            className="text-sm font-bold mb-1.5"
            style={{ color: colors.primary[500] }}
          >
            Dica de Consistência
          </p>
          <p className="text-sm text-white/55 leading-relaxed">
            Poste os {conceitosComRoteiro.length} vídeos em sequência ao longo
            de um mês. Isso cria um ritmo esperado pelo público e aumenta as
            chances de cada vídeo ser assistido por quem viu o anterior. Comece
            pelo <strong className="text-white/80">Vídeo #1</strong> — ele tem o
            maior potencial de <Tooltip term="Viralizar">viralizar</Tooltip> e
            vai atrair um público novo para os próximos.
          </p>
        </div>
      </div>
    </div>
  );
}
