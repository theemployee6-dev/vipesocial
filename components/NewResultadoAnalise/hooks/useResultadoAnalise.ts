import { useState } from "react";
import type { VipeFullOutput, VipeRoteiro } from "@/lib/core/domain/vipe.types";

export function useResultadoAnalise(resultado: VipeFullOutput) {
  const [activeTab, setActiveTab] = useState(0);

  const roteiros = resultado.prompt4.roteiros;
  const roteiro: VipeRoteiro = roteiros[activeTab];
  const p1 = resultado.prompt1;
  const p2 = resultado.prompt2;

  // Calcula nota técnica
  const calcNotaTecnica = (output: VipeFullOutput): number => {
    const p1 = output.prompt1;
    let score = 0;
    const intensidade = p1.hook.intensidade?.toLowerCase() ?? "";
    if (intensidade.includes("alta") || intensidade.includes("alto"))
      score += 40;
    else if (
      intensidade.includes("média") ||
      intensidade.includes("media") ||
      intensidade.includes("médio")
    )
      score += 25;
    else score += 10;
    if (!p1.confirmacao_necessaria) score += 20;
    if (p1.dna_emocional_puro?.emocao_dominante) score += 15;
    if (p1.estrutura_de_retencao?.loop_aberto) score += 15;
    if (p1.estrutura_de_retencao?.quebra_de_previsibilidade) score += 10;
    return Math.min(score, 100);
  };

  // Calcula probabilidade viral
  const calcProbabilidadeViral = (output: VipeFullOutput): number => {
    const p2 = output.prompt2;
    let score = 0;
    if (p2.formula_emocional) score += 30;
    if (p2.gatilho_de_acao) score += 25;
    const c = p2.cadeia_emocional;
    if (
      c?.emocao_de_entrada &&
      c?.emocao_de_desenvolvimento &&
      c?.emocao_de_saida
    )
      score += 25;
    if (!p2.alerta_de_replicacao || p2.alerta_de_replicacao.trim() === "")
      score += 20;
    return Math.min(score, 100);
  };

  const notaTecnica = calcNotaTecnica(resultado);
  const probViral = calcProbabilidadeViral(resultado);

  type SegKey = keyof VipeRoteiro["roteiro_cronologico"];
  const segmentos: { key: SegKey; label: string }[] = [
    { key: "0_a_3s", label: "0-3s" },
    { key: "4_a_15s", label: "4-15s" },
    { key: "16_a_35s", label: "16-35s" },
    { key: "36_a_55s", label: "36-55s" },
    { key: "56_a_75s", label: "56-75s" },
  ];

  // Normaliza intensidade_emocional para número 1–10
  const parseIntensidade = (val: unknown): number => {
    const n = parseFloat(String(val));
    if (!isNaN(n)) return Math.min(Math.max(Math.round(n), 1), 10);
    const map: Record<string, number> = {
      baixa: 3,
      baixo: 3,
      média: 6,
      medio: 6,
      alta: 9,
      alto: 9,
      máxima: 10,
      maximo: 10,
    };
    return map[String(val)?.toLowerCase()] ?? 5;
  };

  return {
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
  };
}
