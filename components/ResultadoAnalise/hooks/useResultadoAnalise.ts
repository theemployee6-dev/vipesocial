import { useState } from "react";
import type {
  VipeFullOutput,
  VipeRoteiro,
  VipeConceito,
} from "@/lib/core/domain/vipe.types";

export type SegKey = keyof VipeRoteiro["roteiro_cronologico"];

export interface Segmento {
  key: SegKey;
  label: string;
}

export interface ConceitoComRoteiro {
  conceito: VipeConceito;
  roteiro: VipeRoteiro | undefined;
  cor: string;
}

const CONCEITO_COLORS = ["#00ff88", "#3b82f6", "#a78bfa", "#f59e0b", "#ec4899"];

export const SEGMENTOS: Segmento[] = [
  { key: "0_a_3s", label: "0–3s" },
  { key: "4_a_15s", label: "4–15s" },
  { key: "16_a_35s", label: "16–35s" },
  { key: "36_a_55s", label: "36–55s" },
  { key: "56_a_75s", label: "56–75s" },
];

// Normaliza intensidade para número 1–10
export function parseIntensidade(val: unknown): number {
  const n = parseFloat(String(val));
  if (!isNaN(n)) return Math.min(Math.max(Math.round(n), 1), 10);
  const map: Record<string, number> = {
    baixa: 3, baixo: 3,
    média: 6, media: 6, médio: 6, medio: 6,
    alta: 9, alto: 9,
    máxima: 10, maximo: 10, máximo: 10,
  };
  return map[String(val)?.toLowerCase()] ?? 5;
}

function calcNotaTecnica(output: VipeFullOutput): number {
  const p1 = output.prompt1;
  let score = 0;
  const intensidade = String(p1.hook.intensidade).toLowerCase();
  if (intensidade.includes("alta") || intensidade.includes("alto")) score += 40;
  else if (intensidade.includes("média") || intensidade.includes("media") || intensidade.includes("médio")) score += 25;
  else {
    const n = parseFloat(intensidade);
    if (!isNaN(n)) score += Math.round((n / 10) * 40);
    else score += 10;
  }
  if (!p1.confirmacao_necessaria) score += 20;
  if (p1.dna_emocional_puro?.emocao_dominante) score += 15;
  if (p1.estrutura_de_retencao?.loop_aberto) score += 15;
  if (p1.estrutura_de_retencao?.quebra_de_previsibilidade) score += 10;
  return Math.min(score, 100);
}

function calcProbabilidadeViral(output: VipeFullOutput): number {
  const p2 = output.prompt2;
  let score = 0;
  if (p2.formula_emocional) score += 30;
  if (p2.gatilho_de_acao) score += 25;
  const c = p2.cadeia_emocional;
  if (c?.emocao_de_entrada && c?.emocao_de_desenvolvimento && c?.emocao_de_saida) score += 25;
  if (!p2.alerta_de_replicacao || p2.alerta_de_replicacao.trim() === "") score += 20;
  return Math.min(score, 100);
}

function buildConceitos(output: VipeFullOutput): ConceitoComRoteiro[] {
  const roteiros = output.prompt4.roteiros;
  return output.prompt3.conceitos_finais.map((conceito, idx) => ({
    conceito,
    roteiro: roteiros.find((r) => r.numero === conceito.numero) ?? roteiros[idx],
    cor: CONCEITO_COLORS[idx % CONCEITO_COLORS.length],
  }));
}

// Sugestão de dias por contexto do horário
function sugerirDias(horario: string): string[] {
  const h = parseInt(horario.split(":")[0] ?? "12", 10);
  if (h >= 6 && h < 12) return ["Sáb", "Dom"];
  if (h >= 12 && h < 15) return ["Sáb", "Dom", "Sex"];
  if (h >= 15 && h < 19) return ["Ter", "Qui", "Sáb"];
  return ["Seg", "Qua", "Sex"];
}

export function useResultadoAnalise(resultado: VipeFullOutput) {
  const [activePage, setActivePage] = useState<"viralizou" | "gravar" | "quando">("viralizou");
  const [activeRoteiroTab, setActiveRoteiroTab] = useState(0);
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});
  const [accordionTabs, setAccordionTabs] = useState<Record<number, string>>({});

  const roteiros = resultado.prompt4.roteiros;
  const roteiro: VipeRoteiro = roteiros[activeRoteiroTab];
  const p1 = resultado.prompt1;
  const p2 = resultado.prompt2;
  const p3 = resultado.prompt3;

  const notaTecnica = calcNotaTecnica(resultado);
  const probViral = calcProbabilidadeViral(resultado);
  const conceitosComRoteiro = buildConceitos(resultado);

  const toggleAccordion = (idx: number) => {
    setOpenAccordions((prev) => ({ ...prev, [idx]: !prev[idx] }));
    setAccordionTabs((prev) => ({ ...prev, [idx]: prev[idx] ?? "cronograma" }));
  };

  const setAccordionTab = (idx: number, tab: string) => {
    setAccordionTabs((prev) => ({ ...prev, [idx]: tab }));
  };

  const getDiasPostagem = (horario: string) => sugerirDias(horario);

  return {
    // Navegação de páginas
    activePage,
    setActivePage,
    // Roteiros (página O que Gravar)
    activeRoteiroTab,
    setActiveRoteiroTab,
    roteiros,
    roteiro,
    // Dados brutos
    p1,
    p2,
    p3,
    // Scores calculados
    notaTecnica,
    probViral,
    // Conceitos enriquecidos
    conceitosComRoteiro,
    // Accordions
    openAccordions,
    toggleAccordion,
    accordionTabs,
    setAccordionTab,
    // Utils
    segmentos: SEGMENTOS,
    parseIntensidade,
    getDiasPostagem,
  };
}
