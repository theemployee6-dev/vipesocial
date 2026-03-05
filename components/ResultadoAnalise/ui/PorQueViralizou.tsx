import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";
import { colors } from "../constants/colors.ResultadoAnalise";
import {
  Tooltip,
  CircularScore,
  IntensityBar,
  Accordion,
  InfoRow,
  Tag,
} from "../index";
import { parseIntensidade } from "../hooks/useResultadoAnalise";

interface Props {
  resultado: VipeFullOutput;
  notaTecnica: number;
  probViral: number;
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div
        className="flex-1 h-px"
        style={{ background: colors.border.default }}
      />
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: colors.text.muted }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: colors.border.default }}
      />
    </div>
  );
}

function CardSection({
  children,
  glow,
  style,
}: {
  children: React.ReactNode;
  glow?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: `linear-gradient(135deg, ${colors.background.card} 0%, ${colors.background.card2} 100%)`,
        border: `1px solid ${glow ? colors.border.glow : colors.border.default}`,
        boxShadow: glow ? "0 0 24px rgba(0,255,136,0.06)" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold uppercase tracking-widest mb-3"
      style={{ color: colors.primary[500] }}
    >
      {children}
    </p>
  );
}

export default function PorQueViralizou({
  resultado,
  notaTecnica,
  probViral,
}: Props) {
  const p1 = resultado.prompt1;
  const p2 = resultado.prompt2;
  const p3 = resultado.prompt3;
  const hookIntensidade = parseIntensidade(p1.hook.intensidade);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Score + Probabilidade ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardSection glow>
          <div className="flex items-center gap-5">
            <CircularScore score={notaTecnica} />
            <div className="flex-1">
              <SectionLabel>
                <Tooltip term="Índice de Execução">Índice de Execução</Tooltip>
              </SectionLabel>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-white/40">
                      <Tooltip term="Probabilidade Viral">
                        Probabilidade Viral
                      </Tooltip>
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: colors.primary[500] }}
                    >
                      {probViral}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: colors.background.unfilledBar }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${probViral}%`,
                        background: `linear-gradient(90deg, ${colors.primary[700]}, ${colors.primary[500]})`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Tag>🔥 Alto Potencial</Tag>
                  <Tag color={colors.primary[500]}>
                    {resultado.nicho_confirmado}
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </CardSection>

        <CardSection>
          <SectionLabel>
            <Tooltip term="Sinal Dominante das Métricas">
              Sinal Dominante das Métricas
            </Tooltip>
          </SectionLabel>
          <p className="text-sm text-white/60 leading-relaxed">
            {p1.sinal_dominante_das_metricas}
          </p>
        </CardSection>
      </div>

      {/* ── Hook ── */}
      <CardSection>
        <SectionLabel>
          <Tooltip term="Hook">🎣 Hook do Vídeo</Tooltip>
        </SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoRow label="Tipo de Hook" value={p1.hook.tipo} />
          <InfoRow label="Explicação" value={p1.hook.explicacao} />
        </div>
        <div className="mt-3">
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
            Intensidade do Hook
          </p>
          <div className="flex items-center gap-3">
            <IntensityBar value={hookIntensidade} />
            <span className="text-xs font-bold text-white/60 shrink-0">
              {hookIntensidade}/10
            </span>
          </div>
        </div>
      </CardSection>

      {/* ── Estrutura de Retenção ── */}
      <Accordion
        title={
          <Tooltip term="Estrutura de Retenção">Estrutura de Retenção</Tooltip>
        }
        icon="🔄"
        defaultOpen
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoRow
            label={
              <Tooltip term="Micro-recompensas">Micro-recompensas</Tooltip>
            }
            value={p1.estrutura_de_retencao.micro_recompensas}
          />
          <InfoRow
            label={<Tooltip term="Loop Aberto">Loop Aberto</Tooltip>}
            value={p1.estrutura_de_retencao.loop_aberto}
          />
          <InfoRow
            label={
              <Tooltip term="Ponto de Maior Tensão">⚡ Pico de Tensão</Tooltip>
            }
            value={p1.estrutura_de_retencao.ponto_de_maior_tensao}
            accent="#fde68a"
          />
          <InfoRow
            label={
              <Tooltip term="Quebra de Previsibilidade">
                Quebra de Previsibilidade
              </Tooltip>
            }
            value={p1.estrutura_de_retencao.quebra_de_previsibilidade}
          />
        </div>
      </Accordion>

      {/* ── DNA Emocional ── */}
      <CardSection glow>
        <SectionLabel>
          <Tooltip term="DNA Emocional">🧬 DNA Emocional Puro</Tooltip>
        </SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p
              className="text-lg font-black mb-2"
              style={{ color: colors.primary[500] }}
            >
              {p1.dna_emocional_puro.emocao_dominante}
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              {p1.dna_emocional_puro.explicacao}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 content-start">
            {p1.estrutura_de_retencao.loop_aberto && <Tag>✓ Loop Aberto</Tag>}
            <Tag color="#3b82f6">Narrativa Confessional</Tag>
            <Tag color="#a78bfa">Vulnerabilidade Estratégica</Tag>
          </div>
        </div>
      </CardSection>

      <SectionDivider label="O que prendeu o espectador" />

      {/* ── Cadeia Emocional ── */}
      <CardSection glow>
        <SectionLabel>
          <Tooltip term="Cadeia Emocional">⛓️ Cadeia Emocional</Tooltip>
        </SectionLabel>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {[
            {
              label: "Entrada",
              value: p2.cadeia_emocional.emocao_de_entrada,
              color: "#3b82f6",
            },
            {
              label: "Desenvolvimento",
              value: p2.cadeia_emocional.emocao_de_desenvolvimento,
              color: "#f59e0b",
            },
            {
              label: "Saída",
              value: p2.cadeia_emocional.emocao_de_saida,
              color: colors.primary[500],
            },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className="flex sm:flex-col items-center gap-2 flex-1"
            >
              <div
                className="flex-1 sm:w-full rounded-lg p-3 text-center"
                style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}28`,
                }}
              >
                <p
                  className="text-[9px] font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: item.color }}
                >
                  {item.label}
                </p>
                <p className="text-xs text-white/65 leading-relaxed">
                  {item.value}
                </p>
              </div>
              {i < arr.length - 1 && (
                <span className="hidden sm:text-white/20 sm:shrink-0">→</span>
              )}
            </div>
          ))}
        </div>
      </CardSection>

      {/* ── Emoção Central + Gatilho ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardSection>
          <SectionLabel>
            <Tooltip term="Emoção Central">💎 Emoção Central</Tooltip>
          </SectionLabel>
          <p
            className="text-xl font-black mb-2"
            style={{ color: colors.primary[500] }}
          >
            {p2.emocao_central.nome}
          </p>
          <p className="text-sm text-white/50 leading-relaxed mb-3">
            {p2.emocao_central.justificativa}
          </p>
          <div
            className="rounded-lg p-3"
            style={{
              background: "rgba(0,255,136,0.06)",
              border: `1px solid rgba(0,255,136,0.2)`,
            }}
          >
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
              <Tooltip term="Gatilho de Ação">Gatilho de Ação</Tooltip>
            </p>
            <p
              className="text-sm font-semibold"
              style={{ color: colors.primary[500] }}
            >
              {p2.gatilho_de_acao}
            </p>
          </div>
        </CardSection>

        {p2.alerta_de_replicacao && (
          <div
            className="rounded-xl p-4"
            style={{
              background: colors.background.alerta,
              border: `1px solid ${colors.border.alerta}`,
            }}
          >
            <div className="flex gap-2.5">
              <span className="text-amber-400 text-base shrink-0 mt-0.5">
                ⚠
              </span>
              <div>
                <p className="text-xs font-bold text-amber-400/80 mb-2">
                  <Tooltip term="Alerta de Replicação">
                    Alerta de Replicação
                  </Tooltip>
                </p>
                <p className="text-sm text-white/55 leading-relaxed">
                  {p2.alerta_de_replicacao}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Fórmula Viral ── */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(0,255,136,0.04)",
          border: `1px solid rgba(0,255,136,0.18)`,
        }}
      >
        <SectionLabel>
          <Tooltip term="Fórmula Viral">🧪 Fórmula Viral</Tooltip>
        </SectionLabel>
        <p
          className="text-sm font-semibold text-center leading-relaxed"
          style={{ color: colors.primary[500] }}
        >
          {p2.formula_emocional}
        </p>
      </div>

      {/* ── Situações Mapeadas ── */}
      <Accordion
        title={
          <Tooltip term="Sinal Dominante das Métricas">
            Situações Mapeadas pela IA
          </Tooltip>
        }
        icon="🗺️"
      >
        <div className="mb-4">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
            {p3.situacoes_mapeadas.length} situações analisadas —{" "}
            {p3.situacoes_aprovadas_apos_filtro.length} aprovadas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {p3.situacoes_mapeadas.map((s, i) => {
              const aprovada = p3.situacoes_aprovadas_apos_filtro.some((a) =>
                a.toLowerCase().includes(s.toLowerCase().slice(0, 20)),
              );
              return (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg p-3 text-xs leading-relaxed"
                  style={{
                    background: aprovada
                      ? "rgba(0,255,136,0.06)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${aprovada ? "rgba(0,255,136,0.18)" : colors.border.lighter}`,
                    color: aprovada
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  <span
                    className="shrink-0 font-bold"
                    style={{
                      color: aprovada ? colors.primary[500] : "#374151",
                    }}
                  >
                    {aprovada ? "✓" : "–"}
                  </span>
                  {s}
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
    </div>
  );
}
