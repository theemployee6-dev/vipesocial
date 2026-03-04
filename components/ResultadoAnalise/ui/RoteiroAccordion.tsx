import type { VipeRoteiro } from "@/lib/core/domain/vipe.types";
import { colors } from "../constants/colors.ResultadoAnalise";
import { Tooltip, IntensityBar, InfoRow } from "../index";
import { parseIntensidade, SEGMENTOS } from "../hooks/useResultadoAnalise";

type InnerTab =
  | "cronograma"
  | "setup"
  | "vestimenta"
  | "edicao"
  | "estrategia"
  | "erros";

const INNER_TABS: { id: InnerTab; label: string; icon: string }[] = [
  { id: "cronograma", label: "Cronograma", icon: "⏱️" },
  { id: "setup", label: "Cenário & Setup", icon: "📷" },
  { id: "vestimenta", label: "Vestimenta", icon: "👕" },
  { id: "edicao", label: "Edição", icon: "✂️" },
  { id: "estrategia", label: "Estratégia", icon: "🎯" },
  { id: "erros", label: "Erros Fatais", icon: "🚫" },
];

// ── Cronograma ────────────────────────────────────────────────────────────────
function CronogramaTab({ roteiro }: { roteiro: VipeRoteiro }) {
  return (
    <div className="space-y-4">
      {SEGMENTOS.map((seg) => {
        const data = roteiro.roteiro_cronologico[seg.key];
        const intensidade = parseIntensidade(data.intensidade_emocional);
        const isHighTension = intensidade >= 9;

        return (
          <div
            key={seg.key}
            className="rounded-xl p-3"
            style={{
              background: isHighTension
                ? "rgba(248,113,113,0.04)"
                : colors.background.card,
              border: `1px solid ${isHighTension ? colors.border.erro : colors.border.lighter}`,
            }}
          >
            {/* Tempo + intensidade */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="shrink-0 text-xs font-bold px-2 py-1 rounded-lg"
                style={{
                  background: isHighTension
                    ? "rgba(248,113,113,0.15)"
                    : "rgba(0,255,136,0.1)",
                  color: isHighTension ? "#f87171" : colors.primary[500],
                  minWidth: 52,
                  textAlign: "center",
                }}
              >
                {seg.label}
                {isHighTension && <span className="ml-1 text-[8px]">⚡</span>}
              </span>
              <IntensityBar value={intensidade} />
              <span className="text-xs text-white/40 shrink-0">
                {intensidade}/10
              </span>
            </div>

            {/* Fala */}
            <p
              className="text-sm italic leading-relaxed mb-3 px-3 py-2 rounded-lg"
              style={{
                background: isHighTension
                  ? "rgba(248,113,113,0.06)"
                  : "rgba(255,255,255,0.03)",
                color: isHighTension ? "#fca5a5" : "rgba(255,255,255,0.85)",
                borderLeft: `3px solid ${isHighTension ? "#f87171" : colors.primary[500]}`,
              }}
            >
              &quot;{data.fala_exata}&quot;
            </p>

            {/* Detalhes em grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div
                className="rounded-lg p-2.5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">
                  🎙 Tom de Voz
                </p>
                <p className="text-xs text-white/65">{data.tom_de_voz}</p>
              </div>
              <div
                className="rounded-lg p-2.5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">
                  😐 Expressão Facial
                </p>
                <p className="text-xs text-white/65">{data.expressao_facial}</p>
              </div>
              <div
                className="rounded-lg p-2.5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">
                  🤸 Movimento & Olhar
                </p>
                <p className="text-xs text-white/65">
                  {data.movimento_corporal} · {data.direcao_do_olhar}
                </p>
              </div>
            </div>

            {data.objetivo_desse_momento && (
              <p className="text-[11px] text-white/30 italic mt-2.5 px-1">
                Objetivo: {data.objetivo_desse_momento}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Setup ─────────────────────────────────────────────────────────────────────
function SetupTab({ roteiro }: { roteiro: VipeRoteiro }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: colors.primary[500] }}
        >
          📍 Cenário
        </p>
        <InfoRow label="Onde Gravar" value={roteiro.cenario.onde_gravar} />
        <InfoRow
          label="Horário de Gravação"
          value={roteiro.cenario.horario_de_gravacao}
        />
        <InfoRow
          label={<Tooltip term="Golden Hour">Tipo de Luz</Tooltip>}
          value={roteiro.cenario.tipo_de_luz}
        />
        <InfoRow
          label="✓ Deve Aparecer no Fundo"
          value={roteiro.cenario.o_que_deve_aparecer_no_fundo}
          accent="#86efac"
        />
        <InfoRow
          label="✗ Não Deve Aparecer no Fundo"
          value={roteiro.cenario.o_que_nao_deve_aparecer_no_fundo}
          accent="#fca5a5"
        />
      </div>
      <div className="space-y-2">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "#3b82f6" }}
        >
          📷 <Tooltip term="Setup">Setup</Tooltip> de Gravação
        </p>
        <InfoRow
          label="Orientação"
          value={roteiro.setup_de_gravacao.orientacao}
        />
        <InfoRow
          label="Altura do Celular"
          value={roteiro.setup_de_gravacao.altura_do_celular}
        />
        <InfoRow
          label="Distância do Rosto"
          value={roteiro.setup_de_gravacao.distancia_do_rosto}
        />
        <InfoRow
          label="Posição do Corpo"
          value={roteiro.setup_de_gravacao.posicao_do_corpo}
        />
        <InfoRow
          label="Onde Apoiar"
          value={roteiro.setup_de_gravacao.onde_apoiar_o_celular}
        />
        <InfoRow
          label="Como Segurar na Mão"
          value={roteiro.setup_de_gravacao.como_segurar_se_for_na_mao}
        />
      </div>
    </div>
  );
}

// ── Vestimenta ─────────────────────────────────────────────────────────────────
function VestimentaTab({ roteiro }: { roteiro: VipeRoteiro }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <InfoRow label="Peça" value={roteiro.vestimenta.peca} />
      <InfoRow label="Cor" value={roteiro.vestimenta.cor} accent="#fde68a" />
      <InfoRow label="Tecido" value={roteiro.vestimenta.tecido} />
      <InfoRow label="Caimento" value={roteiro.vestimenta.caimento} />
      <div className="sm:col-span-2">
        <InfoRow
          label="💡 Aparência e Dica Realista"
          value={roteiro.vestimenta.aparencia_realista}
        />
      </div>
    </div>
  );
}

// ── Edição ─────────────────────────────────────────────────────────────────────
function EdicaoTab({ roteiro }: { roteiro: VipeRoteiro }) {
  const items = [
    {
      icon: "✂️",
      cor: colors.primary[500],
      label: "Onde Cortar",
      value: roteiro.edicao.onde_cortar,
    },
    {
      icon: "⏩",
      cor: "#3b82f6",
      label: "Onde Acelerar",
      value: roteiro.edicao.onde_acelerar,
    },
    {
      icon: "🏷️",
      cor: "#f59e0b",
      label: "Onde Inserir Legenda",
      value: roteiro.edicao.onde_inserir_legenda,
    },
    {
      icon: "🔇",
      cor: "#a78bfa",
      label: "Onde Usar Silêncio",
      value: roteiro.edicao.onde_usar_silencio,
    },
    {
      icon: "🎵",
      cor: "#ec4899",
      label: "Música de Fundo",
      value: roteiro.edicao.musica_de_fundo,
    },
    {
      icon: "🔪",
      cor: "#f87171",
      label: <Tooltip term="Corte Seco">Corte Seco</Tooltip>,
      value: roteiro.edicao.onde_fazer_corte_seco,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-3 flex gap-3"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.border.lighter}`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
            style={{ background: `${item.cor}15` }}
          >
            {item.icon}
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-wider mb-1"
              style={{ color: item.cor }}
            >
              {item.label}
            </p>
            <p className="text-xs text-white/65 leading-relaxed">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Estratégia ─────────────────────────────────────────────────────────────────
function EstrategiaTab({ roteiro }: { roteiro: VipeRoteiro }) {
  const items = [
    {
      cor: "#f59e0b",
      icon: "⚡",
      label: (
        <Tooltip term="Ponto de Maior Tensão">Ponto de Maior Tensão</Tooltip>
      ),
      value: roteiro.elementos_estrategicos.ponto_de_maior_tensao,
    },
    {
      cor: "#3b82f6",
      icon: "💥",
      label: (
        <Tooltip term="Quebra de Expectativa">Quebra de Expectativa</Tooltip>
      ),
      value: roteiro.elementos_estrategicos.quebra_de_expectativa,
    },
    {
      cor: colors.primary[500],
      icon: "🔁",
      label: <Tooltip term="Loop de Retenção">Loop de Retenção</Tooltip>,
      value: roteiro.elementos_estrategicos.loop_de_retencao ?? "—",
    },
    {
      cor: "#a78bfa",
      icon: "👻",
      label: <Tooltip term="CTA Invisível">CTA Invisível</Tooltip>,
      value: roteiro.elementos_estrategicos.cta_invisivel,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-3.5"
          style={{
            background: `${item.cor}06`,
            border: `1px solid ${item.cor}25`,
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-wider mb-2"
            style={{ color: item.cor }}
          >
            {item.icon} {item.label}
          </p>
          <p className="text-sm text-white/65 leading-relaxed">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// ── Erros Fatais ──────────────────────────────────────────────────────────────
function ErrosTab({ roteiro }: { roteiro: VipeRoteiro }) {
  return (
    <div className="space-y-2">
      {roteiro.erros_fatais.map((erro, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl p-3.5"
          style={{
            background: colors.gradient.erro,
            border: `1px solid ${colors.border.erro}`,
          }}
        >
          <span className="text-red-400 shrink-0 text-base mt-0.5">✗</span>
          <span className="text-sm text-white/75 leading-relaxed">{erro}</span>
        </div>
      ))}
    </div>
  );
}

// ── Legenda ───────────────────────────────────────────────────────────────────
function LegendaSection({ roteiro }: { roteiro: VipeRoteiro }) {
  return (
    <div
      className="mt-4 rounded-xl p-4"
      style={{
        background: colors.background.headerRoteiro,
        border: `1px solid ${colors.border.default}`,
      }}
    >
      <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
        📝 Legenda Sugerida
      </p>
      <p className="text-sm text-white/60 italic mb-3">
        &quot;{roteiro.cabecalho.sugestao_de_legenda}&quot;
      </p>
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
  );
}

// ── Main RoteiroAccordion ─────────────────────────────────────────────────────
interface RoteiroAccordionProps {
  roteiro: VipeRoteiro;
  cor: string;
  isOpen: boolean;
  onToggle: () => void;
  activeTab: InnerTab;
  onTabChange: (tab: InnerTab) => void;
}

export function RoteiroAccordion({
  roteiro,
  cor,
  isOpen,
  onToggle,
  activeTab,
  onTabChange,
}: RoteiroAccordionProps) {
  return (
    <div className="mt-4">
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left"
        style={{
          background: isOpen ? `${cor}08` : "rgba(255,255,255,0.02)",
          border: `1px solid ${isOpen ? `${cor}30` : colors.border.default}`,
          borderBottomLeftRadius: isOpen ? 0 : undefined,
          borderBottomRightRadius: isOpen ? 0 : undefined,
        }}
      >
        <div className="flex items-center gap-2.5">
          <span
            style={{ color: isOpen ? cor : colors.text.muted, fontSize: 14 }}
          >
            🎬
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: isOpen ? cor : "rgba(255,255,255,0.5)" }}
          >
            Ver Roteiro Completo
          </span>
          <span className="text-xs text-white/30 hidden sm:inline">
            · {roteiro.cabecalho.duracao_alvo} · Postar às{" "}
            {roteiro.cabecalho.melhor_horario_para_postar.horario}
          </span>
        </div>
        <span
          className="text-white/25 text-xs transition-transform"
          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          className="rounded-b-xl overflow-hidden"
          style={{
            border: `1px solid ${cor}30`,
            borderTop: "none",
            background: "linear-gradient(135deg, #0d1117, #111827)",
          }}
        >
          {/* Objetivo emocional */}
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: colors.border.lighter }}
          >
            <div
              className="rounded-lg p-3"
              style={{
                background: `${cor}06`,
                borderLeft: `3px solid ${cor}`,
              }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-wider mb-1"
                style={{ color: cor }}
              >
                <Tooltip term="Objetivo Emocional">Objetivo Emocional</Tooltip>
              </p>
              <p className="text-sm text-white/70">
                {roteiro.cabecalho.objetivo_emocional}
              </p>
            </div>
          </div>

          {/* Inner tabs */}
          <div
            className="flex gap-0 border-b overflow-x-auto"
            style={{ borderColor: colors.border.lighter }}
          >
            {INNER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-all"
                style={{
                  color: activeTab === tab.id ? cor : "rgba(255,255,255,0.35)",
                  borderBottom: `2px solid ${activeTab === tab.id ? cor : "transparent"}`,
                  background: "transparent",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  cursor: "pointer",
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4">
            {activeTab === "cronograma" && <CronogramaTab roteiro={roteiro} />}
            {activeTab === "setup" && <SetupTab roteiro={roteiro} />}
            {activeTab === "vestimenta" && <VestimentaTab roteiro={roteiro} />}
            {activeTab === "edicao" && <EdicaoTab roteiro={roteiro} />}
            {activeTab === "estrategia" && <EstrategiaTab roteiro={roteiro} />}
            {activeTab === "erros" && (
              <>
                <ErrosTab roteiro={roteiro} />
                <LegendaSection roteiro={roteiro} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export SEGMENTOS for use in the hook
export { SEGMENTOS };
