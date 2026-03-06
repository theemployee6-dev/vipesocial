import styles from "./ResultCard.module.css";

interface ResultCardProps {
  type?: string;
  label: string;
  big?: string;
  sub?: string;
  progress?: { label: string; value: string };
  tags?: string[];
  dnaTitle?: string;
  dnaText?: string;
  chips?: string[];
  formula?: string;
  cadeia?: Array<{ lbl: string; color: string; val: string }>;
  warnText?: string;
}

const ResultCard = (props: ResultCardProps) => {
  const {
    type,
    label,
    big,
    sub,
    progress,
    tags,
    dnaTitle,
    dnaText,
    chips,
    formula,
    cadeia,
    warnText,
  } = props;

  let cardClass = styles.rc;
  if (type === "ac") cardClass += ` ${styles.ac}`;
  if (type === "span2") cardClass += ` ${styles.span2}`;
  if (type === "warn") cardClass += ` ${styles.warn}`;

  return (
    <div className={cardClass}>
      <div
        className={`${styles.rcLbl} ${type === "warn" ? styles.y : type === "ac" ? styles.g : ""}`}
      >
        {label}
      </div>
      {big && <div className={styles.rcBig}>{big}</div>}
      {sub && <div className={styles.rcSub}>{sub}</div>}

      {progress && (
        <div className={styles.rcProg}>
          <div className={styles.rcProgRow}>
            <span className={styles.rcProgLbl}>{progress.label}</span>
            <span className={styles.rcProgVal}>{progress.value}</span>
          </div>
          <div className={styles.rcBarWrap}>
            <div className={styles.rcBar} style={{ width: progress.value }} />
          </div>
        </div>
      )}

      {tags && (
        <div className={styles.dcTags} style={{ marginTop: 10 }}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`${styles.dcTag} ${tag.includes("Lifestyle") ? styles.b : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {dnaTitle && <div className={styles.rcDnaTitle}>{dnaTitle}</div>}
      {dnaText && <div className={styles.rcDnaText}>{dnaText}</div>}

      {chips && (
        <div className={styles.dnaChips} style={{ marginTop: 10 }}>
          {chips.map((chip, idx) => (
            <span
              key={idx}
              className={`${styles.chip} ${chip.includes("✓") ? styles.chipG : styles.chipB}`}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {formula && <div className={styles.rcFormula}>{formula}</div>}

      {cadeia && (
        <div className={styles.dcCadeia}>
          {cadeia.map((c, idx) => (
            <div key={idx} className={styles.cadItem}>
              <div className={styles.cadLbl} style={{ color: c.color }}>
                {c.lbl}
              </div>
              <div className={styles.cadVal}>{c.val}</div>
            </div>
          ))}
        </div>
      )}

      {warnText && <div className={styles.warnText}>{warnText}</div>}
    </div>
  );
};

export default ResultCard;
