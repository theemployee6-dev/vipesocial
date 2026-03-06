"use client";
import Logo from "@/shared/ui/Logo";
import styles from "./DashboardFrame.module.css";

const DashboardFrame = () => {
  return (
    <>
      <div className={styles.dashGlowBottom} />
      <div className={styles.dashFrame}>
        <div className={styles.dashTopbar}>
          <div className={styles.dashLogo}>
            <Logo />
          </div>
          <div className={styles.dashTabs}>
            <div className={`${styles.dashTab} ${styles.active}`}>
              🔥 Por que Viralizou?
            </div>
            <div className={styles.dashTab}>💡 O que Gravar</div>
            <div className={styles.dashTab}>📅 Calendário</div>
          </div>
          <div className={styles.dashBtnSm}>← Nova análise</div>
        </div>
        <div className={styles.dashBody}>
          <div className={`${styles.dc} ${styles.ac}`}>
            <div className={`${styles.dcLbl} ${styles.g}`}>
              Índice de Execução
            </div>
            <div className={styles.dcScore}>
              <div className={styles.dcCircle}>64</div>
              <div style={{ flex: 1 }}>
                <div className={styles.dcBarLabel}>Probabilidade Viral</div>
                <div className={styles.dcBarWrap}>
                  <div className={styles.dcBar} style={{ width: "80%" }} />
                </div>
                <div className={styles.dcPercent}>80%</div>
                <div className={styles.dcTags}>
                  <span className={styles.dcTag}>🔥 Alto Potencial</span>
                  <span className={`${styles.dcTag} ${styles.b}`}>
                    Lifestyle
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dc}>
            <div className={styles.dcLbl}>Sinal Dominante das Métricas</div>
            <div className={styles.dcText}>
              Aprovação passiva e interação direta. O público se conectou de
              forma íntima, preferindo comentar do que compartilhar para
              terceiros.
            </div>
          </div>
          <div className={`${styles.dc} ${styles.wide}`}>
            <div className={`${styles.dcLbl} ${styles.g}`}>
              🎣 Hook do Vídeo
            </div>
            <div className={styles.dcHookRow}>
              <div className={styles.dcHookItem}>
                <div className={styles.dcHookLbl}>Tipo de Hook</div>
                <div className={styles.dcHookVal}>
                  Conexão pessoal e quebra de quarta parede
                </div>
              </div>
              <div className={styles.dcHookItem}>
                <div className={styles.dcHookLbl}>Explicação</div>
                <div className={styles.dcHookVal}>
                  Contato visual direto cria sensação imediata de autenticidade
                </div>
              </div>
            </div>
            <div className={styles.dcDots}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`${styles.dot} ${styles.dotF}`} />
              ))}
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`${styles.dot} ${styles.dotE}`} />
              ))}
              <span className={styles.dcDotLabel}>6/10</span>
            </div>
          </div>
          <div className={styles.dc}>
            <div className={`${styles.dcLbl} ${styles.g}`}>
              🧬 DNA Emocional Puro
            </div>
            <div className={styles.dcDna}>Identificação profunda</div>
            <div className={styles.dcText}>
              O vídeo ativa a empatia ao tocar na ferida comum da solidão.
            </div>
          </div>
          <div className={styles.dc}>
            <div className={styles.dcLbl}>⛓️ Cadeia Emocional</div>
            <div className={styles.dcCadeia}>
              {[
                {
                  lbl: "Entrada",
                  color: "#3b82f6",
                  val: "Curiosidade empática",
                },
                {
                  lbl: "Desenvolv.",
                  color: "#f59e0b",
                  val: "Vulnerabilidade compartilhada",
                },
                {
                  lbl: "Saída",
                  color: "var(--green)",
                  val: "Acolhimento e validação",
                },
              ].map((c) => (
                <div key={c.lbl} className={styles.cadItem}>
                  <div className={styles.cadLbl} style={{ color: c.color }}>
                    {c.lbl}
                  </div>
                  <div className={styles.cadVal}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardFrame;
