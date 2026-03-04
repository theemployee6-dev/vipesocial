import type { ConceitoComRoteiro } from "../hooks/useResultadoAnalise";
import type { VipePrompt3Output } from "@/lib/core/domain/vipe.types";
import { colors } from "../constants/colors.ResultadoAnalise";
import { Tooltip, HexBadge, Tag } from "../index";
import { RoteiroAccordion } from "./RoteiroAccordion";

interface Props {
  conceitosComRoteiro: ConceitoComRoteiro[];
  p3: VipePrompt3Output;
  openAccordions: Record<number, boolean>;
  toggleAccordion: (idx: number) => void;
  accordionTabs: Record<number, string>;
  setAccordionTab: (idx: number, tab: string) => void;
}

export default function OQueGravar({
  conceitosComRoteiro,
  p3,
  openAccordions,
  toggleAccordion,
  accordionTabs,
  setAccordionTab,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Ideias Geradas",
            value: p3.conceitos_finais.length,
            cor: colors.primary[500],
          },
          {
            label: "Taxa de Aprovação",
            value: "100%",
            cor: colors.primary[500],
          },
          {
            label: "Potencial de Série",
            value: `${p3.conceitos_finais.filter((c) => c.potencial_de_serie.toLowerCase().startsWith("sim")).length}/${p3.conceitos_finais.length}`,
            cor: "#3b82f6",
          },
          {
            label: "Ideias Aprovadas",
            value: p3.situacoes_aprovadas_apos_filtro.length,
            cor: "#f59e0b",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-xl p-3.5 text-center"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.border.default}`,
            }}
          >
            <p className="font-black text-2xl" style={{ color: s.cor }}>
              {s.value}
            </p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Concept cards */}
      {conceitosComRoteiro.map(({ conceito, roteiro, cor }, idx) => (
        <div
          key={conceito.numero}
          className="rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${colors.background.card} 0%, ${colors.background.card2} 100%)`,
            border: `1px solid ${cor}20`,
            boxShadow: `0 0 20px ${cor}06`,
          }}
        >
          <div className="p-4">
            <div className="flex gap-4">
              <HexBadge
                value={conceito.numero}
                label="Nº"
                color={cor}
                size={68}
              />

              <div className="flex-1 min-w-0">
                {/* Título (do roteiro se disponível) */}
                <h3 className="font-black text-base text-white mb-2 leading-snug">
                  {roteiro?.cabecalho.titulo ?? `Ideia #${conceito.numero}`}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Tag color={cor}>{conceito.emocao_ativada}</Tag>
                  {conceito.validacao_aprovada && (
                    <Tag color={colors.primary[500]}>✓ Validado</Tag>
                  )}
                  {conceito.potencial_de_serie
                    .toLowerCase()
                    .startsWith("sim") && (
                    <Tag color="#3b82f6">📺 Potencial de Série</Tag>
                  )}
                </div>

                {/* Conceito central */}
                <div
                  className="rounded-lg p-3 mb-3"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${colors.border.lighter}`,
                  }}
                >
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                    Ideia Central do Vídeo
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {conceito.conceito_central}
                  </p>
                </div>

                {/* Grid de detalhes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: colors.background.card,
                      border: `1px solid ${colors.border.lighter}`,
                    }}
                  >
                    <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1.5">
                      <Tooltip term="Motivo de Identificação">
                        🔍 Por que o Público se Identifica
                      </Tooltip>
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {conceito.motivo_de_identificacao}
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: colors.background.card,
                      border: `1px solid ${colors.border.lighter}`,
                    }}
                  >
                    <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1.5">
                      <Tooltip term="Elemento de Surpresa">
                        ✨ Elemento de Surpresa
                      </Tooltip>
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {conceito.elemento_de_surpresa}
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: `${cor}06`,
                      border: `1px solid ${cor}20`,
                    }}
                  >
                    <p
                      className="text-[9px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: cor }}
                    >
                      <Tooltip term="Potencial de Série">
                        📺 Potencial de Série
                      </Tooltip>
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {conceito.potencial_de_serie}
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: "rgba(248,113,113,0.06)",
                      border: `1px solid ${colors.border.erro}`,
                    }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider mb-1.5 text-red-400/80">
                      <Tooltip term="Alerta de Execução">
                        ⚠️ Alerta de Execução
                      </Tooltip>
                    </p>
                    <p className="text-xs text-red-300/70 leading-relaxed">
                      {conceito.alerta_de_execucao}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Roteiro Accordion */}
            {roteiro && (
              <RoteiroAccordion
                roteiro={roteiro}
                cor={cor}
                isOpen={!!openAccordions[idx]}
                onToggle={() => toggleAccordion(idx)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                activeTab={(accordionTabs[idx] as any) ?? "cronograma"}
                onTabChange={(tab) => setAccordionTab(idx, tab)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
