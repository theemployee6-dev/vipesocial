/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";
// zod types handled inline
import { geminiModels } from "./models/geminiModels";
import {
  VipePrompt1OutputSchema,
  VipePrompt2OutputSchema,
  VipePrompt3OutputSchema,
  VipePrompt4OutputSchema,
  type PerfilCriador,
  type VideoMetricas,
  type VipeAnalysisInput,
  type VipeFullOutput,
  type VipePrompt1Output,
  type VipePrompt2Output,
  type VipePrompt3Output,
  type VipePrompt4Output,
} from "@/types/vipe.types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// ============================================
// HELPERS
// ============================================

function buildPrompt1Text(metricas: VideoMetricas): string {
  return `Você é um analisador estrutural de conteúdo viral. Você recebeu um vídeo e suas métricas do TikTok. Sua única função agora é extrair o padrão emocional e estrutural que explica por que esse conteúdo performou dessa forma. Você NÃO descreve o vídeo. Você NÃO fala sobre o cenário, o objeto, a localização ou o contexto visual. Você enxerga através do que está sendo mostrado e identifica o que está sendo sentido. Siga exatamente as etapas abaixo na ordem apresentada. Não pule nenhuma etapa. Não misture etapas.

MÉTRICAS DO VÍDEO:
- Views: ${metricas.views}
- Likes: ${metricas.likes}
- Comentários: ${metricas.comentarios}
- Shares: ${metricas.shares}
${metricas.replay_rate !== undefined ? `- Replay Rate: ${metricas.replay_rate}` : ""}

ETAPA 1 — LEITURA DE MÉTRICAS: Analise os números fornecidos e determine o sinal dominante. Shares muito altos indicam identificação profunda ou conteúdo que as pessoas querem mostrar para alguém específico. Comentários muito altos indicam que o vídeo gerou opinião, polêmica ou emoção que precisava ser verbalizada. Replay alto indica que o hook foi irresistível ou que o conteúdo tem algum elemento que as pessoas querem rever. Likes altos com shares baixos indicam aprovação passiva sem identificação profunda. Documente qual sinal é dominante e o que ele revela sobre o comportamento do público.

ETAPA 2 — ANÁLISE DO HOOK (0 a 3 segundos): Assista apenas os primeiros 3 segundos e responda: o que acontece que impede o dedo de rolar a tela? Classifique o tipo do hook entre os seguintes: pergunta sem resposta imediata, afirmação que gera incredulidade, situação que quebra o esperado, elemento visual fora do comum, promessa explícita de recompensa, conflito imediato, silêncio ou ausência proposital. Descreva a intensidade emocional do hook de 0 a 10 e explique o que especificamente gerou essa intensidade.

ETAPA 3 — ESTRUTURA DE RETENÇÃO: Analise como o vídeo sustenta a atenção do início ao fim. Identifique onde estão as micro recompensas. Identifique se existe um loop aberto. Identifique o ponto de maior tensão do vídeo e em qual segundo ele acontece. Identifique se existe quebra de previsibilidade e onde ela ocorre.

ETAPA 4 — DNA EMOCIONAL PURO: Abstraia completamente o contexto visual e responda: qual é a emoção que esse vídeo ativa no espectador? Escolha a emoção dominante entre: conquista inesperada, revolta justificada, identificação profunda, surpresa genuína, aspiração acessível, medo de estar perdendo algo, vergonha transformada em orgulho, pertencimento, curiosidade irresistível. Explique em no máximo 3 linhas por que essa emoção específica foi ativada.

ETAPA 5 — INFERÊNCIA DE NICHO: Com base no conteúdo do vídeo infira o nicho. Os nichos possíveis são: humor, finanças e dinheiro, relacionamento e amor, motivação e superação, lifestyle e rotina, beleza e autocuidado, saúde e corpo, educação e conhecimento, fé e espiritualidade, empreendedorismo, tecnologia, cultura e identidade brasileira.

Responda EXCLUSIVAMENTE em JSON válido com a seguinte estrutura, sem markdown, sem texto fora do JSON:
{
  "sinal_dominante_das_metricas": "texto",
  "hook": {
    "tipo": "texto",
    "intensidade": "0-10",
    "explicacao": "texto"
  },
  "estrutura_de_retencao": {
    "micro_recompensas": "texto",
    "loop_aberto": "sim ou não e onde",
    "ponto_de_maior_tensao": "segundo exato e descrição",
    "quebra_de_previsibilidade": "texto"
  },
  "dna_emocional_puro": {
    "emocao_dominante": "texto",
    "explicacao": "máximo 3 linhas"
  },
  "nicho_inferido": "texto",
  "confirmacao_necessaria": true
}`;
}

function buildPrompt2Text(
  p1: VipePrompt1Output,
  nichoConfirmado: string,
): string {
  return `Você é um especialista em psicologia de conteúdo viral. Você recebeu a análise estrutural e emocional de um vídeo que viralizou no TikTok. Sua única função agora é destilar tudo isso em uma única verdade emocional central. Não repita a análise anterior. Não descreva o vídeo. Não adicione informações novas.

DADOS DO PROMPT 1:
${JSON.stringify(p1, null, 2)}

NICHO CONFIRMADO: ${nichoConfirmado}

ETAPA 1 — MAPEAMENTO EMOCIONAL COMPLETO: Com base no DNA emocional recebido, mapeie todas as emoções presentes no vídeo. Identifique a emoção de entrada (primeiros 3 segundos), a emoção de desenvolvimento (meio do vídeo) e a emoção de saída (ao terminar).

ETAPA 2 — IDENTIFICAÇÃO DA EMOÇÃO CENTRAL: Determine qual é a emoção central que conecta as três fases. Escolha apenas uma entre: conquista inesperada, revolta justificada, identificação profunda, surpresa genuína, aspiração acessível, medo de estar perdendo algo, vergonha transformada em orgulho, pertencimento, curiosidade irresistível. Justifique em no máximo 4 linhas.

ETAPA 3 — GATILHO DE AÇÃO: Identifique qual comportamento específico essa emoção central provocou. Escolha entre: mandou para alguém específico porque se identificou, comentou para concordar ou discordar publicamente, salvou para rever depois ou mostrar depois, assistiu de novo imediatamente, foi ao perfil do criador para ver mais conteúdo, sentiu vontade de criar um vídeo parecido.

ETAPA 4 — FÓRMULA EMOCIONAL: Sintetize tudo no formato exato: "O vídeo viralizou porque ativou [EMOÇÃO CENTRAL] através de [MECANISMO ESTRUTURAL] gerando no espectador a vontade de [GATILHO DE AÇÃO]."

ETAPA 5 — ALERTA DE REPLICAÇÃO: Aponte um único risco principal que alguém que tentar replicar esse padrão provavelmente vai cometer.

Responda EXCLUSIVAMENTE em JSON válido com a seguinte estrutura, sem markdown, sem texto fora do JSON:
{
  "cadeia_emocional": {
    "emocao_de_entrada": "texto",
    "emocao_de_desenvolvimento": "texto",
    "emocao_de_saida": "texto"
  },
  "emocao_central": {
    "nome": "texto",
    "justificativa": "máximo 4 linhas"
  },
  "gatilho_de_acao": "texto",
  "formula_emocional": "O vídeo viralizou porque ativou [EMOÇÃO CENTRAL] através de [MECANISMO ESTRUTURAL] gerando no espectador a vontade de [GATILHO DE AÇÃO]",
  "alerta_de_replicacao": "texto"
}`;
}

function buildPrompt3Text(
  p1: VipePrompt1Output,
  p2: VipePrompt2Output,
  nichoConfirmado: string,
  perfil: PerfilCriador,
): string {
  return `Você é um estrategista de conteúdo com profundo conhecimento da cultura jovem brasileira. Você recebeu a fórmula emocional de um vídeo viral e o perfil real do criador que vai replicar esse padrão. Sua função é reconstruir o conceito emocional dentro da realidade desse criador específico. Você não vai copiar o vídeo original. Você vai pegar a emoção que fez viralizar e encontrar como essa mesma emoção pode ser ativada de forma autêntica dentro da vida real desse criador.

DADOS DO PROMPT 1:
Hook: ${JSON.stringify(p1.hook)}
Estrutura de Retenção: ${JSON.stringify(p1.estrutura_de_retencao)}

DADOS DO PROMPT 2:
${JSON.stringify(p2, null, 2)}

NICHO CONFIRMADO: ${nichoConfirmado}

PERFIL DO CRIADOR:
- Realidade Socioeconômica: ${perfil.realidade_socioeconomica}
- Idade: ${perfil.idade} anos
- Cidade: ${perfil.cidade}

ETAPA 1 — LEITURA DO PERFIL: Internalize o que o perfil do criador significa na prática considerando sua realidade socioeconômica, cidade e idade.

ETAPA 2 — MAPEAMENTO DE EQUIVALÊNCIAS EMOCIONAIS: Mapeie pelo menos 7 situações reais da vida desse criador onde a emoção central seria ativada de forma genuína. Para cada uma responda: é real e frequente? Ativa a mesma emoção central? Pode ser filmada com os recursos disponíveis? Vai gerar identificação no público do nicho?

ETAPA 3 — FILTRO CULTURAL E REGIONAL: Aplique o filtro cultural e regional considerando cidade e idade. Elimine situações forçadas ou que exijam recursos que o criador não tem. Mantenha apenas as que ele poderia gravar amanhã.

ETAPA 4 — SELEÇÃO DOS 5 CONCEITOS: Selecione os 5 mais fortes e para cada um defina: conceito central em uma frase, emoção ativada, motivo de identificação, elemento de surpresa, potencial de série.

ETAPA 5 — VALIDAÇÃO FINAL: Valide cada conceito respondendo: consegue executar hoje? A emoção é a mesma do original? Está livre de referências ao vídeo original? Faz sentido cultural para esse perfil?

ETAPA 6 — ALERTA DE EXECUÇÃO: Para cada conceito aprovado, aponte em uma linha o maior erro que o criador pode cometer.

Responda EXCLUSIVAMENTE em JSON válido com a seguinte estrutura, sem markdown, sem texto fora do JSON:
{
  "situacoes_mapeadas": ["situação 1", "situação 2", "..."],
  "situacoes_aprovadas_apos_filtro": ["situação 1", "situação 2", "..."],
  "conceitos_finais": [
    {
      "numero": 1,
      "conceito_central": "uma frase",
      "emocao_ativada": "texto",
      "motivo_de_identificacao": "texto",
      "elemento_de_surpresa": "texto",
      "potencial_de_serie": "sim ou não e por quê",
      "validacao_aprovada": true,
      "alerta_de_execucao": "uma linha direta e específica"
    }
  ]
}`;
}

function buildPrompt4Text(
  p1: VipePrompt1Output,
  p2: VipePrompt2Output,
  p3: VipePrompt3Output,
  nichoConfirmado: string,
  perfil: PerfilCriador,
): string {
  return `Você é um diretor de conteúdo e roteirista especializado em TikTok brasileiro. Você conhece profundamente a cultura jovem do Brasil e sabe exatamente como um jovem brasileiro age, fala e se comporta na frente da câmera. Você recebeu 5 conceitos validados e vai transformar cada um em um roteiro tão detalhado que o criador consiga gravar apenas lendo suas instruções. Fale como um amigo que entende muito de TikTok explicando para outro amigo. Use expressões reais do vocabulário jovem brasileiro. Nunca use linguagem corporativa ou formal.

DADOS DO PROMPT 1:
Hook: ${JSON.stringify(p1.hook)}
Estrutura de Retenção: ${JSON.stringify(p1.estrutura_de_retencao)}

DADOS DO PROMPT 2:
Emoção Central: ${JSON.stringify(p2.emocao_central)}
Fórmula Emocional: ${p2.formula_emocional}

CONCEITOS FINAIS DO PROMPT 3:
${JSON.stringify(p3.conceitos_finais, null, 2)}

NICHO CONFIRMADO: ${nichoConfirmado}

PERFIL DO CRIADOR:
- Realidade Socioeconômica: ${perfil.realidade_socioeconomica}
- Idade: ${perfil.idade} anos
- Cidade: ${perfil.cidade}

Para cada um dos 5 conceitos, gere um roteiro completo com as seguintes etapas:

ETAPA 1 — CABEÇALHO: título interno, objetivo emocional em linguagem jovem, duração alvo (60-90s), melhor horário para postar com justificativa, legenda TikTok (máx 150 caracteres), 5 hashtags.

ETAPA 2 — CENÁRIO EXATO: onde gravar (específico), horário ideal, tipo de luz e como usar, o que deve e não deve aparecer no fundo. Considere a realidade do criador: se for pobre, nunca sugira decoração que ele provavelmente não tem.

ETAPA 3 — SETUP DE GRAVAÇÃO: orientação (sempre vertical), altura do celular, distância do rosto, posição do corpo, onde apoiar o celular, como segurar se for na mão.

ETAPA 4 — VESTIMENTA EXATA: peça, cor com justificativa, tecido, caimento. Roupas acessíveis que o criador já tem. Nunca repita a mesma combinação entre os 5 roteiros.

ETAPA 5 — ROTEIRO CRONOLÓGICO SEGUNDO A SEGUNDO com os intervalos: 0-3s (hook), 4-15s (desenvolvimento inicial), 16-35s (tensão cresce), 36-55s (maior tensão e virada), 56-75s (resolução). Para cada intervalo: fala exata palavra por palavra, tom de voz, intensidade emocional (0-10), expressão facial, movimento corporal, direção do olhar, objetivo psicológico do momento.

ETAPA 6 — EDIÇÃO SIMPLES: onde cortar (segundo e motivo), onde acelerar e quanto, onde inserir legenda e palavras a destacar, onde usar silêncio (segundo e duração), estilo de música de fundo, onde fazer corte seco. Somente CapCut gratuito ou editor nativo do TikTok.

ETAPA 7 — ELEMENTOS ESTRATÉGICOS: ponto de maior tensão (segundo e descrição), quebra de expectativa (onde e como), loop de retenção (qual elemento e por que), CTA invisível (qual ação induz e por que).

ETAPA 8 — ERROS FATAIS: 3 erros específicos para esse roteiro em linguagem jovem. Nunca genérico.

Responda EXCLUSIVAMENTE em JSON válido com a seguinte estrutura, sem markdown, sem texto fora do JSON:
{
  "roteiros": [
    {
      "numero": 1,
      "cabecalho": {
        "titulo": "texto",
        "objetivo_emocional": "texto em linguagem jovem",
        "duracao_alvo": "texto",
        "melhor_horario_para_postar": {
          "horario": "texto",
          "justificativa": "texto simples"
        },
        "sugestao_de_legenda": "máximo 150 caracteres",
        "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"]
      },
      "cenario": {
        "onde_gravar": "texto",
        "horario_de_gravacao": "texto",
        "tipo_de_luz": "texto",
        "o_que_deve_aparecer_no_fundo": "texto",
        "o_que_nao_deve_aparecer_no_fundo": "texto"
      },
      "setup_de_gravacao": {
        "orientacao": "vertical",
        "altura_do_celular": "texto",
        "distancia_do_rosto": "texto",
        "posicao_do_corpo": "texto",
        "onde_apoiar_o_celular": "texto",
        "como_segurar_se_for_na_mao": "texto"
      },
      "vestimenta": {
        "peca": "texto",
        "cor": "texto",
        "tecido": "texto",
        "caimento": "texto",
        "aparencia_realista": "texto"
      },
      "roteiro_cronologico": {
        "0_a_3s": {
          "fala_exata": "texto",
          "tom_de_voz": "texto",
          "intensidade_emocional": "0-10",
          "expressao_facial": "texto",
          "movimento_corporal": "texto",
          "direcao_do_olhar": "texto",
          "objetivo_desse_momento": "texto"
        },
        "4_a_15s": {
          "fala_exata": "texto",
          "tom_de_voz": "texto",
          "intensidade_emocional": "0-10",
          "expressao_facial": "texto",
          "movimento_corporal": "texto",
          "direcao_do_olhar": "texto",
          "objetivo_desse_momento": "texto"
        },
        "16_a_35s": {
          "fala_exata": "texto",
          "tom_de_voz": "texto",
          "intensidade_emocional": "0-10",
          "expressao_facial": "texto",
          "movimento_corporal": "texto",
          "direcao_do_olhar": "texto",
          "objetivo_desse_momento": "texto"
        },
        "36_a_55s": {
          "fala_exata": "texto",
          "tom_de_voz": "texto",
          "intensidade_emocional": "0-10",
          "expressao_facial": "texto",
          "movimento_corporal": "texto",
          "direcao_do_olhar": "texto",
          "objetivo_desse_momento": "texto"
        },
        "56_a_75s": {
          "fala_exata": "texto",
          "tom_de_voz": "texto",
          "intensidade_emocional": "0-10",
          "expressao_facial": "texto",
          "movimento_corporal": "texto",
          "direcao_do_olhar": "texto",
          "objetivo_desse_momento": "texto"
        }
      },
      "edicao": {
        "onde_cortar": "texto",
        "onde_acelerar": "texto",
        "onde_inserir_legenda": "texto",
        "onde_usar_silencio": "texto",
        "musica_de_fundo": "texto",
        "onde_fazer_corte_seco": "texto"
      },
      "elementos_estrategicos": {
        "ponto_de_maior_tensao": "texto",
        "quebra_de_expectativa": "texto",
        "loop_de_retencao": "texto",
        "cta_invisivel": "texto"
      },
      "erros_fatais": ["erro 1", "erro 2", "erro 3"]
    }
  ]
}`;
}

// ─── Parse + validação Zod ────────────────────────────────

function parseAndValidate<T>(
  raw: string,
  schema: { safeParse: (data: unknown) => any },
  promptName: string,
): T {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```[a-zA-Z]*\n?/, "")
      .replace(/```$/, "")
      .trim();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error(`❌ [${promptName}] Falha ao fazer parse do JSON:`, err);
    console.error(
      `📄 [${promptName}] Raw (primeiros 500 chars):`,
      cleaned.substring(0, 500),
    );
    throw new Error(`[${promptName}] JSON inválido na resposta da IA`);
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    const issues = (result.error?.issues ?? [])

      .map((i: any) => `  • ${String(i.path?.join?.(".") ?? "")}: ${i.message}`)
      .join("\n");
    console.error(`❌ [${promptName}] Validação Zod falhou:\n${issues}`);
    throw new Error(
      `[${promptName}] Estrutura inválida na resposta da IA:\n${issues}`,
    );
  }

  console.log(`✅ [${promptName}] Validação Zod passou`);
  return result.data as T;
}

// ============================================
// FUNÇÃO PRINCIPAL: analizarVideo (pipeline VIPE)
// ============================================

export async function analizarVideo(
  input: VipeAnalysisInput,
): Promise<VipeFullOutput> {
  const { videoUrl, metricas, perfilCriador, nichoConfirmado } = input;

  console.log("=".repeat(50));
  console.log("🎬 [VIPE] INÍCIO DO PIPELINE - 4 PROMPTS");
  console.log("=".repeat(50));
  console.log("📤 [INPUT] URL:", videoUrl.substring(0, 60) + "...");
  console.log("📤 [INPUT] Métricas:", metricas);
  console.log("📤 [INPUT] Perfil:", perfilCriador);
  console.log(
    "📤 [INPUT] Nicho pré-confirmado:",
    nichoConfirmado ?? "não informado (será inferido)",
  );

  if (!videoUrl) throw new Error("URL do vídeo não fornecida");

  // ── PROMPT 1 ──────────────────────────────────────────
  console.log("\n" + "-".repeat(50));
  console.log("🔍 [PROMPT 1] Iniciando análise do vídeo...");
  console.log("⏱️  Início:", new Date().toISOString());

  const response1 = await ai.models.generateContent({
    model: geminiModels,
    contents: [
      {
        role: "user",
        parts: [
          { fileData: { mimeType: "video/mp4", fileUri: videoUrl } },
          { text: buildPrompt1Text(metricas) },
        ],
      },
    ],
    config: {
      temperature: 0.2,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  console.log("⏱️  Fim Prompt 1:", new Date().toISOString());

  const rawP1 =
    response1.text ??
    response1.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";
  if (!rawP1) throw new Error("Prompt 1 retornou resposta vazia");

  const prompt1Output = parseAndValidate<VipePrompt1Output>(
    rawP1,
    VipePrompt1OutputSchema,
    "PROMPT 1",
  );
  console.log("✅ [PROMPT 1] Nicho inferido:", prompt1Output.nicho_inferido);
  console.log(
    "✅ [PROMPT 1] Emoção dominante:",
    prompt1Output.dna_emocional_puro.emocao_dominante,
  );

  const nicho = nichoConfirmado ?? prompt1Output.nicho_inferido;
  console.log("📌 [NICHO] Usando nicho:", nicho);

  // ── PROMPT 2 ──────────────────────────────────────────
  console.log("\n" + "-".repeat(50));
  console.log("🔬 [PROMPT 2] Destilando emoção central...");
  console.log("⏱️  Início:", new Date().toISOString());

  const response2 = await ai.models.generateContent({
    model: geminiModels,
    contents: [
      {
        role: "user",
        parts: [{ text: buildPrompt2Text(prompt1Output, nicho) }],
      },
    ],
    config: {
      temperature: 0.2,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });

  console.log("⏱️  Fim Prompt 2:", new Date().toISOString());

  const rawP2 =
    response2.text ??
    response2.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";
  if (!rawP2) throw new Error("Prompt 2 retornou resposta vazia");

  const prompt2Output = parseAndValidate<VipePrompt2Output>(
    rawP2,
    VipePrompt2OutputSchema,
    "PROMPT 2",
  );
  console.log(
    "✅ [PROMPT 2] Emoção central:",
    prompt2Output.emocao_central.nome,
  );
  console.log("✅ [PROMPT 2] Fórmula:", prompt2Output.formula_emocional);

  // ── PROMPT 3 ──────────────────────────────────────────
  console.log("\n" + "-".repeat(50));
  console.log(
    "🎯 [PROMPT 3] Reconstruindo conceitos para o perfil do criador...",
  );
  console.log("⏱️  Início:", new Date().toISOString());

  const response3 = await ai.models.generateContent({
    model: geminiModels,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: buildPrompt3Text(
              prompt1Output,
              prompt2Output,
              nicho,
              perfilCriador,
            ),
          },
        ],
      },
    ],
    config: {
      temperature: 0.4,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  console.log("⏱️  Fim Prompt 3:", new Date().toISOString());

  const rawP3 =
    response3.text ??
    response3.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";
  if (!rawP3) throw new Error("Prompt 3 retornou resposta vazia");

  const prompt3Output = parseAndValidate<VipePrompt3Output>(
    rawP3,
    VipePrompt3OutputSchema,
    "PROMPT 3",
  );
  console.log(
    "✅ [PROMPT 3] Conceitos gerados:",
    prompt3Output.conceitos_finais.length,
  );

  // ── PROMPT 4 ──────────────────────────────────────────
  console.log("\n" + "-".repeat(50));
  console.log("🎬 [PROMPT 4] Gerando roteiros completos...");
  console.log("⏱️  Início:", new Date().toISOString());

  const response4 = await ai.models.generateContent({
    model: geminiModels,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: buildPrompt4Text(
              prompt1Output,
              prompt2Output,
              prompt3Output,
              nicho,
              perfilCriador,
            ),
          },
        ],
      },
    ],
    config: {
      temperature: 0.5,
      maxOutputTokens: 16384,
      responseMimeType: "application/json",
    },
  });

  console.log("⏱️  Fim Prompt 4:", new Date().toISOString());

  const rawP4 =
    response4.text ??
    response4.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";
  if (!rawP4) throw new Error("Prompt 4 retornou resposta vazia");

  const prompt4Output = parseAndValidate<VipePrompt4Output>(
    rawP4,
    VipePrompt4OutputSchema,
    "PROMPT 4",
  );
  console.log("✅ [PROMPT 4] Roteiros gerados:", prompt4Output.roteiros.length);

  // ── RESULTADO FINAL ───────────────────────────────────
  console.log("\n" + "=".repeat(50));
  console.log("🏁 [VIPE] PIPELINE CONCLUÍDO COM SUCESSO");
  console.log("=".repeat(50));

  return {
    prompt1: prompt1Output,
    nicho_confirmado: nicho,
    prompt2: prompt2Output,
    prompt3: prompt3Output,
    prompt4: prompt4Output,
  };
}

// ============================================
// FUNÇÃO LEGADA
// ============================================

export async function analizarVideoRaw(
  videoUrl: string,
  prompt: string,
): Promise<string> {
  console.log("=".repeat(50));
  console.log("🎬 [analizarVideoRaw] INÍCIO");
  console.log("=".repeat(50));

  if (!videoUrl) throw new Error("URL do vídeo não fornecida");
  if (!prompt) throw new Error("Prompt não fornecido");

  try {
    const response = await ai.models.generateContent({
      model: geminiModels,
      contents: [
        {
          role: "user",
          parts: [
            { fileData: { mimeType: "video/mp4", fileUri: videoUrl } },
            { text: prompt },
          ],
        },
      ],
      config: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const text =
      response.text ??
      response.candidates?.[0]?.content?.parts?.[0]?.text ??
      "";
    if (!text) throw new Error("Resposta vazia da IA");

    console.log("✅ [analizarVideoRaw] Concluído:", text.length, "chars");
    return text;
  } catch (error: any) {
    console.error("❌ [analizarVideoRaw] Erro:", error.message);
    throw error;
  }
}
