import styles from "./Step.module.css";

interface StepProps {
  n: string;
  icon: string;
  title: string;
  desc: string;
  arrow: boolean;
}

const Step = ({ n, icon, title, desc, arrow }: StepProps) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepNum}>Passo {n}</div>
      <span className={styles.stepIcon}>{icon}</span>
      <div className={styles.stepTitle}>{title}</div>
      <div className={styles.stepDesc}>{desc}</div>
      {arrow && <div className={styles.stepArrow}>→</div>}
    </div>
  );
};

export default Step;
