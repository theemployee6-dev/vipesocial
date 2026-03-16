import { metricsStrings } from "./constants/metrics";
import styles from "./HeroMetrics.module.css";

const HeroMetrics = () => {
  return (
    <div className={styles.metrics}>
      {metricsStrings.map((m) => (
        <div key={m.lbl} style={{ textAlign: "center" }}>
          <div className={styles.metricVal}>{m.val}</div>
          <div className={styles.metricLbl}>{m.lbl}</div>
        </div>
      ))}
    </div>
  );
};

export default HeroMetrics;
