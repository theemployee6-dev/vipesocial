"use client";

import ResultCard from "./ResultCard";
import { cards } from "./constants/cards";
import styles from "./ResultsSection.module.css";

const ResultsSection = () => {
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
                <div className={styles.dashTab}>💡 O que Gravar?</div>
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

export default ResultsSection;
