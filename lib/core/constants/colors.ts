// lib/core/constants/colors.ts

export const colors = {
  /**
   * Roxos primários e secundários
   */
  primary: {
    500: "#a855f7", // roxo principal (logo, destaques, ícones)
    600: "#d8b4fe", // roxo claro (texto do botão Entrar)
    700: "#c084fc", // roxo médio (número "2" no features)
  },

  /**
   * Tons de roxo para textos e fundos
   */
  purple: {
    light: "#ede9fe", // texto "Faça upload de"
    lighter: "#f5f0ff", // texto "um vídeo viral", título hero
    dark: "#1a0a2e", // início do gradiente de fundo
    darker: "#0d0515", // meio do gradiente
    darkest: "#060010", // fim do gradiente
  },

  /**
   * Fundos gradientes
   */
  background: {
    radial1:
      "radial-gradient(ellipse at 60% 20%, #1a0a2e 0%, #0d0515 40%, #060010 100%)",
    radial2:
      "radial-gradient(ellipse at center top, rgba(120,40,255,0.25) 0%, transparent 70%)",
    uploadGradient:
      "linear-gradient(145deg, rgba(30,12,60,0.95) 0%, rgba(15,5,35,0.98) 100%)",
    featuresGradient:
      "linear-gradient(135deg, rgba(30,10,60,0.85) 0%, rgba(15,5,35,0.9) 100%)",
    glowGradient:
      "linear-gradient(135deg, rgba(180,100,255,0.5) 0%, rgba(80,0,180,0.1) 50%, rgba(180,100,255,0.5) 100%)",
  },

  /**
   * Cores de texto
   */
  text: {
    title: "#f0e8ff", // título "VipeSocial"
    heroTitle: "#f5f0ff", // título principal do hero
    heroSub: "rgba(200,180,255,0.65)", // subtítulo do hero
    stats: "rgba(180,150,255,0.55)", // texto "+3.482 vídeos..."
    statsSpan: "rgba(200,170,255,0.75)", // parte em destaque no stats
    featuresTextLight: "#ede9fe", // "Faça upload de"
    featuresTextDark: "#f5f0ff", // "um vídeo viral", "scripts virais"
    featuresFooter: "rgba(180,150,255,0.45)", // texto final do features
    buttonText: "#d8b4fe", // texto do botão Entrar
  },

  /**
   * Bordas e fundos de elementos
   */
  border: {
    upload: "rgba(140,60,255,0.3)", // borda da área de upload
    featuresCard: "rgba(100,40,200,0.25)", // borda do card features
    featuresIcon: "rgba(140,70,255,0.3)", // borda dos ícones
    featuresIconBg: "rgba(100,40,200,0.2)", // fundo dos ícones
    button: "rgba(168,85,247,0.4)", // borda do botão Entrar
    numberBg: "rgba(168,85,247,0.18)", // fundo do número "2"
    numberBorder: "rgba(168,85,247,0.45)", // borda do número "2"
  },

  /**
   * Botões
   */
  button: {
    entrarBg: "rgba(168,85,247,0.15)", // fundo do botão Entrar
    entrarBorder: "rgba(168,85,247,0.4)", // borda do botão Entrar
    entrarText: "#d8b4fe", // texto do botão Entrar
  },

  /**
   * Efeito de brilho (glow)
   */
  glow: {
    boxShadow:
      "0 0 40px 6px rgba(140,70,255,0.35), 0 0 80px 12px rgba(100,40,220,0.18)",
  },

  /**
   * Partículas do canvas (usam opacidade variável)
   */
  particle: {
    fill: (alpha: number) => `rgba(167,100,255,${alpha})`,
    stroke: (alpha: number) => `rgba(140,70,255,${alpha})`,
  },

  /**
   * Outras cores e sombras
   */
  misc: {
    featureDivider: "rgba(140,70,255,0.2)", // linha vertical entre os itens
    featureShadow: "0 8px 40px rgba(80,0,180,0.15)", // sombra do card features
    numberColor: "#c084fc", // cor do número "2"
    iconStroke: "#a855f7", // cor do traço dos ícones SVG
  },
} as const;
