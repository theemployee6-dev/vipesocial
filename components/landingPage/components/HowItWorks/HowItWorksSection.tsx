"use client";
// import { Reveal } from "../shared/Reveal/Reveal";
import Step from "./Step";
import { stepsStrings } from "./constants/steps";
import DashboardFrame from "../shared/DashboardFrame/DashboardFrame";
import styles from "./HowItWorksSection.module.css";

const HowItWorksSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.secCenter}>
          <div className={styles.secLabel}>Como funciona</div>
          <h2 className={styles.secH2}>
            De vídeo viral a <span className={styles.ac}>roteiro pronto</span>{" "}
            em minutos
          </h2>
          <p className={styles.secSub}>
            4 camadas de IA trabalham em sequência para entregar um plano
            completo de gravação.
          </p>

          <div className={styles.steps}>
            {stepsStrings.map((s) => (
              <Step key={s.n} {...s} />
            ))}
          </div>

          <div className={styles.dashWrap}>
            <DashboardFrame />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
