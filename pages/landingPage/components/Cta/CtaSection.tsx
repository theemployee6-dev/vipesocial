"use client";
// import { Reveal } from "../shared/Reveal/Reveal";
import styles from "./CtaSection.module.css";

const CtaSection = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <h2 className={styles.ctaH2}>
          Para de <span className={styles.ac}>adivinhar.</span>
          <br />
          Começa a <span className={styles.ac}>viralizar.</span>
        </h2>
        <p className={styles.ctaSub}>
          Chega de postar no escuro. Deixa a IA mostrar o caminho e te entregar
          os roteiros prontos pra gravar.
        </p>
        <div>
          <button className={styles.btnCta}>
            Criar meu primeiro roteiro viral
          </button>
          <p className={styles.ctaNote}>
            Sem cartão de crédito. Comece grátis agora.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
