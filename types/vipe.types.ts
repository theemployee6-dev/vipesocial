import { z } from "zod";

// ============================================
// INPUT
// ============================================

export const VideoMetricasSchema = z.object({
  views: z.number(),
  likes: z.number(),
  comentarios: z.number(),
  shares: z.number(),
  replay_rate: z.number().optional(),
});

export const PerfilCriadorSchema = z.object({
  realidade_socioeconomica: z.enum(["pobre", "classe média", "rico"]),
  idade: z.number(),
  cidade: z.string(),
});

export const VipeAnalysisInputSchema = z.object({
  videoUrl: z.string(),
  metricas: VideoMetricasSchema,
  perfilCriador: PerfilCriadorSchema,
  nichoConfirmado: z.string().optional(),
});

// ============================================
// PROMPT 1
// ============================================

export const VipeHookSchema = z.object({
  tipo: z.string(),
  intensidade: z.string(),
  explicacao: z.string(),
});

export const VipeEstruturaRetencaoSchema = z.object({
  micro_recompensas: z.string(),
  loop_aberto: z.string(),
  ponto_de_maior_tensao: z.string(),
  quebra_de_previsibilidade: z.string(),
});

export const VipeDnaEmocionalSchema = z.object({
  emocao_dominante: z.string(),
  explicacao: z.string(),
});

export const VipePrompt1OutputSchema = z.object({
  sinal_dominante_das_metricas: z.string(),
  hook: VipeHookSchema,
  estrutura_de_retencao: VipeEstruturaRetencaoSchema,
  dna_emocional_puro: VipeDnaEmocionalSchema,
  nicho_inferido: z.string(),
  confirmacao_necessaria: z.boolean(),
});

// ============================================
// PROMPT 2
// ============================================

export const VipeCadeiaEmocionalSchema = z.object({
  emocao_de_entrada: z.string(),
  emocao_de_desenvolvimento: z.string(),
  emocao_de_saida: z.string(),
});

export const VipeEmocaoCentralSchema = z.object({
  nome: z.string(),
  justificativa: z.string(),
});

export const VipePrompt2OutputSchema = z.object({
  cadeia_emocional: VipeCadeiaEmocionalSchema,
  emocao_central: VipeEmocaoCentralSchema,
  gatilho_de_acao: z.string(),
  formula_emocional: z.string(),
  alerta_de_replicacao: z.string(),
});

// ============================================
// PROMPT 3
// ============================================

export const VipeConceitoSchema = z.object({
  numero: z.number(),
  conceito_central: z.string(),
  emocao_ativada: z.string(),
  motivo_de_identificacao: z.string(),
  elemento_de_surpresa: z.string(),
  potencial_de_serie: z.string(),
  validacao_aprovada: z.boolean(),
  alerta_de_execucao: z.string(),
});

export const VipePrompt3OutputSchema = z.object({
  situacoes_mapeadas: z.array(z.string()),
  situacoes_aprovadas_apos_filtro: z.array(z.string()),
  conceitos_finais: z.array(VipeConceitoSchema),
});

// ============================================
// PROMPT 4
// ============================================

export const VipeHorarioPostagemSchema = z.object({
  horario: z.string(),
  justificativa: z.string(),
});

export const VipeCabecalhoSchema = z.object({
  titulo: z.string(),
  objetivo_emocional: z.string(),
  duracao_alvo: z.string(),
  melhor_horario_para_postar: VipeHorarioPostagemSchema,
  sugestao_de_legenda: z.string(),
  hashtags: z.array(z.string()),
});

export const VipeCenarioSchema = z.object({
  onde_gravar: z.string(),
  horario_de_gravacao: z.string(),
  tipo_de_luz: z.string(),
  o_que_deve_aparecer_no_fundo: z.string(),
  o_que_nao_deve_aparecer_no_fundo: z.string(),
});

export const VipeSetupGravacaoSchema = z.object({
  orientacao: z.string(),
  altura_do_celular: z.string(),
  distancia_do_rosto: z.string(),
  posicao_do_corpo: z.string(),
  onde_apoiar_o_celular: z.string(),
  como_segurar_se_for_na_mao: z.string(),
});

export const VipeVestimentaSchema = z.object({
  peca: z.string(),
  cor: z.string(),
  tecido: z.string(),
  caimento: z.string(),
  aparencia_realista: z.string(),
});

export const VipeIntervaloRoteiroSchema = z.object({
  fala_exata: z.string(),
  tom_de_voz: z.string(),
  intensidade_emocional: z.union([z.string(), z.number()]),
  expressao_facial: z.string(),
  movimento_corporal: z.string(),
  direcao_do_olhar: z.string(),
  objetivo_desse_momento: z.string(),
});

export const VipeRoteiroCronologicoSchema = z.object({
  "0_a_3s": VipeIntervaloRoteiroSchema,
  "4_a_15s": VipeIntervaloRoteiroSchema,
  "16_a_35s": VipeIntervaloRoteiroSchema,
  "36_a_55s": VipeIntervaloRoteiroSchema,
  "56_a_75s": VipeIntervaloRoteiroSchema,
});

export const VipeEdicaoSchema = z.object({
  onde_cortar: z.string(),
  onde_acelerar: z.string(),
  onde_inserir_legenda: z.string(),
  onde_usar_silencio: z.string(),
  musica_de_fundo: z.string(),
  onde_fazer_corte_seco: z.string(),
});

export const VipeElementosEstrategicosSchema = z.object({
  ponto_de_maior_tensao: z.string(),
  quebra_de_expectativa: z.string(),
  loop_de_retencao: z.string(),
  cta_invisivel: z.string(),
});

export const VipeRoteiroSchema = z.object({
  numero: z.number(),
  cabecalho: VipeCabecalhoSchema,
  cenario: VipeCenarioSchema,
  setup_de_gravacao: VipeSetupGravacaoSchema,
  vestimenta: VipeVestimentaSchema,
  roteiro_cronologico: VipeRoteiroCronologicoSchema,
  edicao: VipeEdicaoSchema,
  elementos_estrategicos: VipeElementosEstrategicosSchema,
  erros_fatais: z.array(z.string()),
});

export const VipePrompt4OutputSchema = z.object({
  roteiros: z.array(VipeRoteiroSchema),
});

// ============================================
// OUTPUT FINAL
// ============================================

export const VipeFullOutputSchema = z.object({
  prompt1: VipePrompt1OutputSchema,
  nicho_confirmado: z.string(),
  prompt2: VipePrompt2OutputSchema,
  prompt3: VipePrompt3OutputSchema,
  prompt4: VipePrompt4OutputSchema,
});

// ============================================
// TIPOS INFERIDOS (substituem as interfaces manuais)
// ============================================

export type VideoMetricas       = z.infer<typeof VideoMetricasSchema>;
export type PerfilCriador       = z.infer<typeof PerfilCriadorSchema>;
export type VipeAnalysisInput   = z.infer<typeof VipeAnalysisInputSchema>;
export type VipeHook            = z.infer<typeof VipeHookSchema>;
export type VipeEstruturaRetencao = z.infer<typeof VipeEstruturaRetencaoSchema>;
export type VipeDnaEmocional    = z.infer<typeof VipeDnaEmocionalSchema>;
export type VipePrompt1Output   = z.infer<typeof VipePrompt1OutputSchema>;
export type VipeCadeiaEmocional = z.infer<typeof VipeCadeiaEmocionalSchema>;
export type VipeEmocaoCentral   = z.infer<typeof VipeEmocaoCentralSchema>;
export type VipePrompt2Output   = z.infer<typeof VipePrompt2OutputSchema>;
export type VipeConceito        = z.infer<typeof VipeConceitoSchema>;
export type VipePrompt3Output   = z.infer<typeof VipePrompt3OutputSchema>;
export type VipeHorarioPostagem = z.infer<typeof VipeHorarioPostagemSchema>;
export type VipeCabecalho       = z.infer<typeof VipeCabecalhoSchema>;
export type VipeCenario         = z.infer<typeof VipeCenarioSchema>;
export type VipeSetupGravacao   = z.infer<typeof VipeSetupGravacaoSchema>;
export type VipeVestimenta      = z.infer<typeof VipeVestimentaSchema>;
export type VipeIntervaloRoteiro = z.infer<typeof VipeIntervaloRoteiroSchema>;
export type VipeRoteiroCronologico = z.infer<typeof VipeRoteiroCronologicoSchema>;
export type VipeEdicao          = z.infer<typeof VipeEdicaoSchema>;
export type VipeElementosEstrategicos = z.infer<typeof VipeElementosEstrategicosSchema>;
export type VipeRoteiro         = z.infer<typeof VipeRoteiroSchema>;
export type VipePrompt4Output   = z.infer<typeof VipePrompt4OutputSchema>;
export type VipeFullOutput      = z.infer<typeof VipeFullOutputSchema>;
