import styles from "./HeroBadge.module.css";

const HeroBadge = () => {
  return (
    <div className={styles.badge}>
      <div className={styles.dot} />
      ANÁLISE VIRAL EM TEMPO REAL
    </div>
  );
};

export default HeroBadge;
