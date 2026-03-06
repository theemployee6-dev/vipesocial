"use client";
import { Reveal } from "../shared/Reveal";
import { ResultCard } from "./ResultCard";
import styles from "./ResultsSection.module.css";

const cards = [
  {
    type: "ac",
    label: "Índice de Execução",
    big: "64",
    sub: "de 100",
    progress: { label: "Probabilidade Viral", value: "80%" },
    tags: ["🔥 Alto Potencial", "Lifestyle e rotina"],
  },
  {
    type: "",
    label: "🧬 DNA Emocional Puro",
    dnaTitle: "Identificação profunda",
    dnaText:
      "O vídeo ativa a empatia ao tocar na ferida comum da solidão e da busca por significado em datas especiais.",
    chips: ["✓ Loop Aberto", "Narrativa Confessional"],
  },
  {
    type: "span2",
    label: "🧪 Fórmula Viral",
    formula:
      '"O vídeo viralizou porque ativou Identificação profunda através de uma confissão vulnerável que quebra a quarta parede gerando no espectador a vontade de comentar para concordar ou discordar publicamente."',
  },
  {
    type: "",
    label: "⛓️ Cadeia Emocional",
    cadeia: [
      { lbl: "Entrada", color: "#3b82f6", val: "Curiosidade empática" },
      {
        lbl: "Desenvolv.",
        color: "#f59e0b",
        val: "Vulnerabilidade compartilhada",
      },
      { lbl: "Saída", color: "var(--green)", val: "Acolhimento e validação" },
    ],
  },
  {
    type: "warn",
    label: "⚠️ Alerta de Replicação",
    warnText:
      'O maior risco é a "vulnerabilidade performática", onde o criador tenta fabricar um desabafo sem a crueza necessária, soando falso.',
  },
];

export const ResultsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.secCenter}>
          <div className={styles.secLabel}>Resultado real</div>
          <h2 className={styles.secH2}>
            Veja o que a IA <span className={styles.ac}>entrega pra você</span>
          </h2>
          <p className={styles.secSub}>
            Análise completa em menos de 2 minutos. Tudo pronto para gravar.
          </p>
        </div>

        <div className={styles.showcase}>
          <div className={styles.glow} />
          <div className={styles.frame}>
            <div className={styles.header}>
              <span className={styles.headerTitle}>Resultado da Análise</span>
              <div className={styles.dashTabs}>
                <div className={`${styles.dashTab} ${styles.active}`}>
                  🔥 Por que Viralizou?
                </div>
                <div className={styles.dashTab}>💡 O que Gravar</div>
                <div className={styles.dashTab}>📅 Calendário</div>
              </div>
              <div className={styles.dashBtnSm}>← Nova análise</div>
            </div>
            <div className={styles.body}>
              {cards.map((card, index) => (
                <ResultCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
