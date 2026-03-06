"use client";
import Reveal from "../shared/Reveal/Reveal";
import HeroMetrics from "./HeroMetrics";
import HeroBadge from "./HeroBadge";
import DashboardFrame from "../shared/DashboardFrame/DashboardFrame";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroRing} style={{ width: 600, height: 600 }} />
      <div className={styles.heroRing} style={{ width: 400, height: 400 }} />
      <Reveal>
        <HeroBadge />
        <h1 className={styles.heroH1}>
          Descubra <span className={styles.ac}>por que</span>
          <br />
          vídeos viralizam.
          <br />
          <span className={styles.ac2}>Grave o próximo.</span>
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <p className={styles.heroSub}>
          O Vipe Social analisa vídeos virais com IA e gera{" "}
          <strong>roteiros prontos</strong>, adaptados à sua realidade — cidade,
          idade e recursos.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className={styles.heroCtas}>
          <button className={styles.btnPrimary}>
            Começar agora — <span className="text-white font-bold">Grátis</span>
          </button>
          <button className={styles.btnSecondary}>Ver como funciona</button>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <HeroMetrics />
      </Reveal>

      <Reveal delay={400}>
        <div className={styles.dashWrap}>
          <DashboardFrame />
        </div>
      </Reveal>
    </section>
  );
};

export default HeroSection;
