export const colors = {
  /**
   * Cores de fundo (background)
   */
  background: {
    primary: "#0d0d1a", // fundo principal da página e topbar
    sidebar: "#0f0f1c", // fundo da barra lateral
    card: "#1a1a2e", // fundo dos cards (métricas, DNA, hook, etc.)
    accordionClosed: "#161625", // fundo do accordion quando fechado
    accordionOpen: "#1a1a30", // fundo do accordion quando aberto
    accordionContent: "#12121e", // fundo do conteúdo do accordion
    headerRoteiro: "#13131f", // fundo do cabeçalho do roteiro ativo
    badge: "#1e1e32", // fundo dos badges de horário/duração
    cadeiaEmocional: "#2d1b69", // fundo dos itens da cadeia emocional
    alerta: "#1c1508", // fundo do alerta de replicação
    erroGradientStart: "#3d1010", // início do gradiente de erro
    erroGradientEnd: "#2a0a0a", // fim do gradiente de erro
    circleTrack: "#1e1e30", // cor do círculo de fundo no CircularScore
    unfilledBar: "rgba(255,255,255,0.08)", // fundo das barras não preenchidas
  },

  /**
   * Cores de borda (border)
   */
  border: {
    default: "rgba(255,255,255,0.07)", // borda padrão
    light: "rgba(255,255,255,0.06)", // borda mais suave (sidebar, cards)
    lighter: "rgba(255,255,255,0.05)", // borda ainda mais suave (accordion content)
    alerta: "rgba(245,158,11,0.2)", // borda do alerta de replicação
    erro: "rgba(239,68,68,0.25)", // borda dos erros fatais
  },

  /**
   * Paleta de cores primárias (roxo)
   */
  primary: {
    300: "#c084fc", // roxo claro (hashtags, textos secundários)
    400: "#d8b4fe", // roxo médio-claro (texto do botão "Nova análise")
    500: "#a855f7", // roxo principal (logo, detalhes)
    600: "#7c3aed", // roxo médio-escuro (ícone accordion, aba ativa)
    700: "#6d28d9", // roxo escuro (gradiente do logo, stop inicial)
  },

  /**
   * Cores de texto
   */
  text: {
    white: "#ffffff",
    alerta: "#f59e0b", // cor do ícone de alerta
    erro: "#ef4444", // cor do texto de erro
  },

  /**
   * Cores específicas para botões e abas
   */
  button: {
    novaAnaliseBg: "rgba(168,85,247,0.15)", // fundo do botão "Nova análise"
    novaAnaliseBorder: "rgba(168,85,247,0.3)", // borda do botão "Nova análise"
    novaAnaliseText: "#d8b4fe", // texto do botão "Nova análise"
    tabActive: "#7c3aed", // fundo da aba ativa
    tabInactive: "rgba(255,255,255,0.4)", // cor do texto da aba inativa
    tabShadow: "rgba(124,58,237,0.4)", // sombra da aba ativa
  },

  /**
   * Cores para as hashtags
   */
  hashtag: {
    bg: "rgba(124,58,237,0.2)", // fundo da hashtag
    text: "#c084fc", // texto da hashtag
    border: "rgba(124,58,237,0.3)", // borda da hashtag
  },

  /**
   * Gradientes lineares
   */
  gradient: {
    logo: "linear-gradient(135deg, #6d28d9, #a855f7)", // gradiente do "V" no logo
    erro: "linear-gradient(135deg, #3d1010, #2a0a0a)", // gradiente dos cards de erro fatal
  },

  /**
   * Array de cores para a IntensityBar (6 cores, usadas em sequência)
   */
  intensityBar: [
    "#7c3aed", // roxo médio-escuro
    "#9333ea", // roxo médio
    "#a855f7", // roxo principal
    "#c084fc", // roxo claro
    "#f59e0b", // amarelo (alerta)
    "#ef4444", // vermelho (erro)
  ],
} as const;
