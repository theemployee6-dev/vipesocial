"use client";

import { useState } from "react";
import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";
import { colors } from "./constants/colors.NewResultadoAnalise"; // ajuste o caminho
import { useResultadoAnalise } from "./hooks/useResultadoAnalise";

// ─── Props ────────────────────────────────────────────────
interface ResultadoAnaliseProps {
  resultado: VipeFullOutput;
  onVoltar?: () => void;
}

// ─── Intensity Bar ────────────────────────────────────────
function IntensityBar({ value }: { value: number }) {
  const total = 10;
  return (
    <div className="flex gap-0.5 items-center flex-1">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < value;
        const colorIdx = Math.min(
          Math.floor((i / total) * colors.intensityBar.length),
          colors.intensityBar.length - 1,
        );
        return (
          <div
            key={i}
            className="h-2 flex-1 rounded-sm transition-all"
            style={{
              background: filled
                ? colors.intensityBar[colorIdx]
                : colors.background.unfilledBar,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Circular Score ───────────────────────────────────────
function CircularScore({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="128" height="128">
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={colors.background.circleTrack}
          strokeWidth="8"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary[700]} />
            <stop offset="100%" stopColor={colors.primary[500]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center z-10">
        <div className="text-4xl font-black text-white leading-none">
          {score}
        </div>
        <div className="text-xs text-white/40 mt-1">de 100</div>
      </div>
    </div>
  );
}

// ─── Accordion ───────────────────────────────────────────
function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${colors.border.default}` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 transition-colors"
        style={{
          background: open
            ? colors.background.accordionOpen
            : colors.background.accordionClosed,
        }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: colors.primary[600] }}>{open ? "∨" : "›"}</span>
          <span className="text-sm font-semibold text-white/85">
            {icon} {title}
          </span>
        </div>
        <span className="text-white/25 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div
          className="p-4 border-t"
          style={{
            background: colors.background.accordionContent,
            borderColor: colors.border.lighter,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div>
      <p className="text-white/40 text-xs mb-1">{label}</p>
      <p className="text-white/80 text-sm">{value}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function ResultadoAnalise({
  resultado,
  onVoltar,
}: ResultadoAnaliseProps) {
  const {
    activeTab,
    setActiveTab,
    roteiros,
    roteiro,
    p1,
    p2,
    notaTecnica,
    probViral,
    segmentos,
    parseIntensidade,
  } = useResultadoAnalise(resultado);

  return (
    <div
      className="min-h-screen text-white select-none"
      style={{
        background: colors.background.primary,
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── TOPBAR ── */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b sticky top-0 z-20"
        style={{
          background: colors.background.primary,
          borderColor: colors.border.default,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
            style={{ background: colors.gradient.logo }}
          >
            V
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight">
            <span style={{ color: colors.primary[500] }}>Vipe</span>
            <span className="text-white">Social</span>
          </span>
        </div>

        <h1 className="hidden sm:block text-sm sm:text-lg font-semibold text-white/90 tracking-tight">
          Resultado da Análise
        </h1>

        <div className="flex items-center gap-3">
          {onVoltar && (
            <button
              onClick={onVoltar}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
              style={{
                background: colors.button.novaAnaliseBg,
                border: `1px solid ${colors.button.novaAnaliseBorder}`,
                color: colors.button.novaAnaliseText,
              }}
            >
              ← Nova análise
            </button>
          )}
          <button
            className="hover:text-white/70 transition-colors text-xl"
            style={{ color: colors.text.white }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-col lg:flex-row">
        {/* ── SIDEBAR ── */}
        <div
          className="w-full lg:w-[300] flex flex-col gap-4 p-4 overflow-y-auto shrink-0 border-b lg:border-b-0 lg:border-r"
          style={{
            background: colors.background.sidebar,
            borderColor: colors.border.light,
          }}
        >
          <p className="text-sm font-bold text-white/70 px-1">
            Índice de Execução
          </p>

          <div className="flex justify-center py-1">
            <CircularScore score={notaTecnica} />
          </div>

          {/* Métricas principais */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {[
              { label: "Probabilidade Viral", value: `${probViral}%` },
              { label: "Emoção Central", value: p2.emocao_central.nome },
              { label: "Nicho", value: resultado.nicho_confirmado },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-3 flex flex-col gap-1 text-center"
                style={{
                  background: colors.background.card,
                  border: `1px solid ${colors.border.light}`,
                }}
              >
                <span className="text-[10px] text-white/40 leading-tight">
                  {m.label}
                </span>
                <span className="text-sm font-bold text-white">{m.value}</span>
              </div>
            ))}
          </div>

          {/* DNA Emocional */}
          <div
            className="rounded-xl p-4"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border.light}`,
            }}
          >
            <p className="text-xs font-bold text-white/70 mb-2">
              DNA Emocional - Porque o vídeo viralizou?
            </p>
            <p className="text-xs text-white/50 leading-relaxed mb-1">
              <span className="text-white/30">Dominante: </span>
              {p1.dna_emocional_puro.emocao_dominante}
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              {p1.dna_emocional_puro.explicacao}
            </p>
            <p className="text-xs text-white/50 leading-relaxed mt-2">
              <span className="text-white/30">Fórmula: </span>
              {p2.formula_emocional}
            </p>
          </div>

          {/* Cadeia emocional */}
          <div
            className="rounded-xl p-4"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border.light}`,
            }}
          >
            <p className="text-xs font-bold text-white/70 mb-3">
              Cadeia Emocional
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span
                className="px-2 py-1 rounded-md text-white/70"
                style={{ background: colors.background.cadeiaEmocional }}
              >
                {p2.cadeia_emocional.emocao_de_entrada}
              </span>
              <span className="text-white/25">→</span>
              <span
                className="px-2 py-1 rounded-md text-white/70"
                style={{ background: colors.background.cadeiaEmocional }}
              >
                {p2.cadeia_emocional.emocao_de_desenvolvimento}
              </span>
              <span className="text-white/25">→</span>
              <span
                className="px-2 py-1 rounded-md text-white/70"
                style={{ background: colors.background.cadeiaEmocional }}
              >
                {p2.cadeia_emocional.emocao_de_saida}
              </span>
            </div>
          </div>

          {/* Hook */}
          <div
            className="rounded-xl p-4"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border.light}`,
            }}
          >
            <p className="text-xs font-bold text-white/70 mb-2">
              Hook do Vídeo Original
            </p>
            <p className="text-xs text-white/50 mb-1">
              <span className="text-white/30">Tipo: </span>
              {p1.hook.tipo}
            </p>
            <p className="text-xs text-white/50 mb-1">
              <span className="text-white/30">Intensidade: </span>
              {p1.hook.intensidade}
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              {p1.hook.explicacao}
            </p>
          </div>

          {/* Alerta de replicação */}
          {p2.alerta_de_replicacao && (
            <div
              className="rounded-xl p-3.5 flex gap-2.5"
              style={{
                background: colors.background.alerta,
                border: `1px solid ${colors.border.alerta}`,
              }}
            >
              <span className="text-amber-400 text-sm shrink-0 mt-0.5">⚠</span>
              <div>
                <p className="text-xs font-bold text-amber-400/80 mb-1">
                  Alerta de Replicação
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {p2.alerta_de_replicacao}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          <span className="text-lg sm:text-xl font-black text-white mb-2 tracking-tight">
            Ideias de Vídeos
          </span>
          {/* Tabs */}
          <div
            className="flex gap-1 rounded-xl p-1 overflow-x-auto tabs-scroll"
            style={{
              background: colors.background.accordionClosed,
              border: `1px solid ${colors.border.default}`,
            }}
          >
            {roteiros.map((r, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                style={
                  activeTab === i
                    ? {
                        background: colors.button.tabActive,
                        color: colors.text.white,
                        boxShadow: `0 2px 12px ${colors.button.tabShadow}`,
                      }
                    : { color: colors.button.tabInactive }
                }
              >
                {i + 1}. {r.cabecalho.titulo}
              </button>
            ))}
          </div>

          {/* Header do roteiro ativo */}
          <div
            className="rounded-xl p-4 sm:p-5"
            style={{
              background: colors.background.headerRoteiro,
              border: `1px solid ${colors.border.default}`,
            }}
          >
            <h2 className="text-lg sm:text-xl font-black text-white mb-2 tracking-tight">
              {roteiro.cabecalho.titulo}
            </h2>
            <p className="text-xs text-white/50 mb-3 leading-relaxed">
              {roteiro.cabecalho.objetivo_emocional}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                {
                  icon: "🕐",
                  text: `Horário: ${roteiro.cabecalho.melhor_horario_para_postar.horario}`,
                },
                {
                  icon: "📱",
                  text: `Duração: ${roteiro.cabecalho.duracao_alvo}`,
                },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/65"
                  style={{
                    background: colors.background.badge,
                    border: `1px solid ${colors.border.default}`,
                  }}
                >
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
            {/* Legenda */}
            <p className="text-xs text-white/40 mb-2 italic">
              💬 {roteiro.cabecalho.sugestao_de_legenda}
            </p>
            {/* Hashtags */}
            {roteiro.cabecalho.hashtags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {roteiro.cabecalho.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: colors.hashtag.bg,
                      color: colors.hashtag.text,
                      border: `1px solid ${colors.hashtag.border}`,
                    }}
                  >
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cenário */}
          <Accordion title="Cenário" icon="🎬" defaultOpen>
            <div className="space-y-3">
              <InfoRow
                label="📍 ONDE GRAVAR"
                value={roteiro.cenario.onde_gravar}
              />
              <InfoRow
                label="⏰ HORÁRIO"
                value={roteiro.cenario.horario_de_gravacao}
              />
              <InfoRow label="💡 LUZ" value={roteiro.cenario.tipo_de_luz} />
              <InfoRow
                label="🖼️ FUNDO IDEAL"
                value={roteiro.cenario.o_que_deve_aparecer_no_fundo}
              />
              <InfoRow
                label="❌ FUNDO EVITAR"
                value={roteiro.cenario.o_que_nao_deve_aparecer_no_fundo}
              />
              <InfoRow
                label="📱 ALTURA DO CELULAR"
                value={roteiro.setup_de_gravacao.altura_do_celular}
              />
              <InfoRow
                label="📏 DISTÂNCIA DO ROSTO"
                value={roteiro.setup_de_gravacao.distancia_do_rosto}
              />
              <InfoRow
                label="🧍 POSIÇÃO DO CORPO"
                value={roteiro.setup_de_gravacao.posicao_do_corpo}
              />
              <InfoRow
                label="🔧 APOIO DO CELULAR"
                value={roteiro.setup_de_gravacao.onde_apoiar_o_celular}
              />
              <InfoRow
                label="✋ SE FOR NA MÃO"
                value={roteiro.setup_de_gravacao.como_segurar_se_for_na_mao}
              />
            </div>
          </Accordion>

          {/* Vestimenta */}
          <Accordion title="Vestimenta" icon="👕">
            <div className="space-y-3">
              <InfoRow label="PEÇA" value={roteiro.vestimenta.peca} />
              <InfoRow label="COR" value={roteiro.vestimenta.cor} />
              <InfoRow label="TECIDO" value={roteiro.vestimenta.tecido} />
              <InfoRow label="CAIMENTO" value={roteiro.vestimenta.caimento} />
              <InfoRow
                label="💡 DICA"
                value={roteiro.vestimenta.aparencia_realista}
              />
            </div>
          </Accordion>

          {/* Roteiro Cronológico */}
          <Accordion title="Roteiro Cronológico" icon="📝" defaultOpen>
            <div className="space-y-4">
              {segmentos.map((seg) => {
                const data = roteiro.roteiro_cronologico[seg.key];
                const intensidade = parseIntensidade(
                  data.intensidade_emocional,
                );
                return (
                  <div
                    key={seg.key}
                    className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-white/40 text-xs shrink-0 w-14">
                        {seg.label}
                      </span>
                      <IntensityBar value={intensidade} />
                      <span className="text-white/40 text-xs w-8 shrink-0 text-right">
                        {intensidade}/10
                      </span>
                    </div>
                    <p className="text-white/90 text-sm italic mb-1">
                      &quot;{data.fala_exata}&quot;
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-white/35">
                      {data.tom_de_voz && <span>🎙 {data.tom_de_voz}</span>}
                      {data.expressao_facial && (
                        <span>😐 {data.expressao_facial}</span>
                      )}
                      {data.direcao_do_olhar && (
                        <span>👁 {data.direcao_do_olhar}</span>
                      )}
                    </div>
                    {data.objetivo_desse_momento && (
                      <p className="text-white/30 text-xs mt-1 italic">
                        {data.objetivo_desse_momento}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Accordion>

          {/* Edição */}
          <Accordion title="Edição" icon="✂️">
            <div className="space-y-3">
              <InfoRow
                label="✂️ ONDE CORTAR"
                value={roteiro.edicao.onde_cortar}
              />
              <InfoRow
                label="📝 ONDE INSERIR LEGENDA"
                value={roteiro.edicao.onde_inserir_legenda}
              />
              <InfoRow
                label="🎵 MÚSICA DE FUNDO"
                value={roteiro.edicao.musica_de_fundo}
              />
              <InfoRow
                label="🔇 ONDE USAR SILÊNCIO"
                value={roteiro.edicao.onde_usar_silencio}
              />
              <InfoRow
                label="⚡ ONDE ACELERAR"
                value={roteiro.edicao.onde_acelerar}
              />
              <InfoRow
                label="🔪 CORTE SECO"
                value={roteiro.edicao.onde_fazer_corte_seco}
              />
            </div>
          </Accordion>

          {/* Elementos Estratégicos */}
          <Accordion title="Elementos Estratégicos" icon="🧠">
            <div className="space-y-3">
              <InfoRow
                label="🎯 PONTO DE MAIOR TENSÃO"
                value={roteiro.elementos_estrategicos.ponto_de_maior_tensao}
              />
              <InfoRow
                label="💥 QUEBRA DE EXPECTATIVA"
                value={roteiro.elementos_estrategicos.quebra_de_expectativa}
              />
              <InfoRow
                label="🔄 LOOP DE RETENÇÃO"
                value={roteiro.elementos_estrategicos.loop_de_retencao}
              />
              <InfoRow
                label="📣 CTA INVISÍVEL"
                value={roteiro.elementos_estrategicos.cta_invisivel}
              />
            </div>
          </Accordion>

          {/* Erros Fatais */}
          {roteiro.erros_fatais?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
              {roteiro.erros_fatais.map((erro, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 px-4 py-3.5 rounded-xl hover:brightness-110 transition-all"
                  style={{
                    background: colors.gradient.erro,
                    border: `1px solid ${colors.border.erro}`,
                  }}
                >
                  <span className="text-red-400 shrink-0 text-base mt-0.5">
                    ⚠
                  </span>
                  <span className="text-xs text-white/75 font-semibold leading-tight">
                    {erro}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
