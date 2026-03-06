"use client";
// import { Reveal } from "../shared/Reveal/Reveal";
import FeatureRow from "./FeatureRow";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: "🎣",
    title: "Hook & Retenção científicos",
    description:
      "A IA identifica o tipo de hook, intensidade e micro-recompensas que mantém o espectador até o final — e replica isso no seu roteiro.",
    items: [
      "Tipo de hook identificado e replicado",
      "Intensidade emocional por segundo",
      "Loop aberto e quebra de previsibilidade",
      "Ponto de maior tensão mapeado",
    ],
    visual: (
      <div>
        <div className={styles.hookCard}>
          <div className={styles.hookLbl}>Tipo de Hook</div>
          <div className={styles.hookVal}>
            Conexão pessoal e quebra de quarta parede
          </div>
          <div className={styles.ibars}>
            {[
              "#3b82f6",
              "#3b82f6",
              "#60a5fa",
              "#34d399",
              "#34d399",
              "#00ff88",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.1)",
            ].map((c, i) => (
              <div key={i} className={styles.ibar} style={{ background: c }} />
            ))}
          </div>
          <div className={styles.ibarLabel}>6/10</div>
        </div>
        <div className={styles.hookGrid}>
          <div className={styles.hookCard}>
            <div className={styles.hookLbl}>Loop Aberto</div>
            <div className={styles.hookDesc}>
              Menção ao &quot;pior aniversário&quot; cria curiosidade
              sustentada.
            </div>
          </div>
          <div className={styles.hookCard}>
            <div className={styles.hookLbl}>⚡ Pico de Tensão</div>
            <div className={styles.hookDesc}>
              0:31 — mudança de tom casual para desabafo emocional.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: "🧬",
    title: "DNA Emocional do vídeo",
    description:
      "Extrai a emoção dominante, cadeia emocional e gatilho de ação que fizeram o vídeo bombar — e adapta tudo para o seu contexto.",
    items: [
      "Emoção dominante e cadeia emocional completa",
      "Gatilho de ação que gera comentários",
      "Fórmula viral destilada em uma linha",
      "Alerta de replicação para não soar falso",
    ],
    visual: (
      <div>
        <div className={styles.dnaMain}>
          <div className={`${styles.dcLbl} ${styles.g}`}>
            🧬 DNA Emocional Puro
          </div>
          <div className={styles.dnaEmocao}>Identificação profunda</div>
          <div className={styles.dnaDesc}>
            O vídeo ativa a empatia ao tocar na ferida comum da solidão e da
            busca por significado em datas especiais.
          </div>
          <div className={styles.dnaChips}>
            <span className={`${styles.chip} ${styles.chipG}`}>
              ✓ Loop Aberto
            </span>
            <span className={`${styles.chip} ${styles.chipB}`}>
              Narrativa Confessional
            </span>
            <span className={`${styles.chip} ${styles.chipP}`}>
              Vulnerabilidade Estratégica
            </span>
          </div>
        </div>
        <div className={styles.hookCard}>
          <div className={styles.hookLbl}>🧪 Fórmula Viral</div>
          <div className={styles.formula}>
            &quot;Ativou Identificação profunda através de uma confissão
            vulnerável que quebra a quarta parede.&quot;
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: "🎬",
    title: "Roteiro palavra por palavra",
    description:
      "Cada roteiro vem com a fala exata, segundo a segundo. Tom de voz, expressão facial e movimento corporal incluídos.",
    items: [
      "Fala exata para cada bloco de tempo",
      "Tom de voz e expressão facial detalhados",
      "Cenário, roupa e setup de gravação",
      "Instruções de edição e horário para postar",
    ],
    visual: (
      <div className={styles.rotCard}>
        <div className={styles.rotHeader}>
          <span className={styles.rotTitle}>🎬 Roteiro #1 — Crise dos 25</span>
          <span className={styles.rotMeta}>75s · 21:30</span>
        </div>
        <div className={styles.rotSeg}>
          <span className={styles.rotTime}>0–3s</span>
          <div className={styles.rotFala}>
            &quot;Mano, morar na praia parece um sonho, mas pra quem trampa com
            isso aqui é um pesadelo.&quot;
          </div>
          <div className={styles.rotDetails}>
            <span className={styles.rotDetail}>🎙 Tom seco e pausado</span>
            <span className={styles.rotDetail}>😐 Olhar fixo na câmera</span>
          </div>
        </div>
        <div className={styles.rotSeg}>
          <span className={`${styles.rotTime} ${styles.highlight}`}>
            36–55s ⚡
          </span>
          <div className={`${styles.rotFala} ${styles.highlightFala}`}>
            &quot;Eu sou que parece fresca, mas esse PC é minha única chance de
            sair daqui.&quot;
          </div>
          <div className={styles.rotDetails}>
            <span className={styles.rotDetail}>🎙 Vulnerável e honesto</span>
            <span className={styles.rotDetail}>😤 Intensidade 9/10</span>
          </div>
        </div>
        <div className={styles.rotSeg}>
          <span className={styles.rotTime}>56–75s</span>
          <div className={styles.rotFala}>
            &quot;Se você também tá no corre com o que tem, comenta aí. Bora pra
            cima.&quot;
          </div>
          <div className={styles.rotDetails}>
            <span className={styles.rotDetail}>🎵 Lo-fi melancólico</span>
            <span className={styles.rotDetail}>👕 Moletom cinza largo</span>
          </div>
        </div>
      </div>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.secCenter}>
          <div className={styles.secLabel}>O que você recebe</div>
          <h2 className={styles.secH2}>
            Cada roteiro é uma{" "}
            <span className={styles.ac}>arma de viralização</span>
          </h2>
          <p className={styles.secSub}>
            Não é só texto. É um plano completo de gravação, edição e
            publicação.
          </p>
        </div>
        <div className={styles.recursosGrid}>
          {features.map((feat, index) => (
            <FeatureRow key={index} {...feat} reverse={index === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
