import { ReactNode } from "react";
// import { Reveal } from "../shared/Reveal/Reveal";
import styles from "./FeatureRow.module.css";

interface FeatureRowProps {
  icon: string;
  title: string;
  description: string;
  items: string[];
  visual: ReactNode;
  reverse?: boolean;
}

const FeatureRow = ({
  icon,
  title,
  description,
  items,
  visual,
  reverse,
}: FeatureRowProps) => {
  const rowClass = reverse ? `${styles.recRow} ${styles.rev}` : styles.recRow;
  return (
    <div className={rowClass}>
      <div>
        <div className={styles.recIcon}>{icon}</div>
        <h3
          className={styles.recH3}
          dangerouslySetInnerHTML={{
            __html: title
              .replace(
                "científicos",
                `<span class="${styles.ac}">científicos</span>`,
              )
              .replace("vídeo", `<span class="${styles.ac}">vídeo</span>`)
              .replace("palavra", `<span class="${styles.ac}">palavra</span>`),
          }}
        />
        <p className={styles.recDesc}>{description}</p>
        <div className={styles.recItems}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.recItem}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.recVisual}>{visual}</div>
    </div>
  );
};

export default FeatureRow;
