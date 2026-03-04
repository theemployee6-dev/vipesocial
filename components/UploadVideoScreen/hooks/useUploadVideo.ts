import { useState } from "react";
import {
  validarArquivo,
  uploadVideoParaSupabase,
  enviarParaApiAnalise,
} from "@/lib/uploadVideo";
import type {
  VideoMetricas,
  PerfilCriador,
  VipeFullOutput,
} from "@/lib/core/domain/vipe.types";

// Definimos os tipos de etapas possíveis durante o fluxo de upload.
// A palavra "type" cria um atalho: "upload", "metricas", "perfil" ou "processando" são as únicas opções.
type Etapa = "upload" | "metricas" | "perfil" | "processando";
// Aqui definimos os possíveis status de cada etapa do processamento (esperando, carregando, concluído).
type EtapaStatus = "esperando" | "carregando" | "concluido";

// As props que esse hook recebe: uma função que será chamada quando a análise terminar,
// passando o resultado final (do tipo VipeFullOutput).
interface UseUploadVideoProps {
  aoFinalizar: (resultado: VipeFullOutput) => void;
}

// Esse é um "hook" personalizado. Ele contém toda a lógica de gerenciamento de estado e ações
// para a tela de upload de vídeo. Os componentes vão usar esse hook para obter os dados e funções.
export function useUploadVideo({ aoFinalizar }: UseUploadVideoProps) {
  // Estado que guarda em qual etapa do processo estamos (começa em "upload").
  const [etapaAtual, setEtapaAtual] = useState<Etapa>("upload");

  // Estados relacionados ao upload do arquivo:
  // dragActive indica se o usuário está arrastando um arquivo sobre a área de upload.
  const [dragActive, setDragActive] = useState(false);
  // file guarda o arquivo de vídeo selecionado (pode ser null se nenhum foi escolhido).
  const [file, setFile] = useState<File | null>(null);
  // mensagemErroArquivo guarda uma mensagem de erro caso o arquivo seja inválido (tamanho, tipo).
  const [mensagemErroArquivo, setMensagemErroArquivo] = useState("");

  // Estados para os dados que o usuário vai preencher:
  // metricas guarda as informações do vídeo (views, likes, etc).
  const [metricas, setMetricas] = useState<VideoMetricas>({
    views: 0,
    likes: 0,
    comentarios: 0,
    shares: 0,
    replay_rate: undefined,
  });
  // perfilCriador guarda as informações do criador (realidade, idade, cidade).
  const [perfilCriador, setPerfilCriador] = useState<PerfilCriador>({
    realidade_socioeconomica: "classe média",
    idade: 0,
    cidade: "",
  });
  // nichoConfirmado guarda o nicho do vídeo (opcional).
  const [nichoConfirmado, setNichoConfirmado] = useState("");

  // Estados para controlar o processamento:
  // etapasProcessamento é uma lista fixa com as etapas que aparecem durante a análise.
  // Cada etapa tem um id, um label (texto) e um status (esperando, carregando, concluido).
  const etapasProcessamento: {
    id: number;
    label: string;
    status: EtapaStatus;
  }[] = [
    { id: 1, label: "Recebendo vídeo", status: "esperando" },
    { id: 2, label: "Enviando para análise", status: "esperando" },
    { id: 3, label: "Chamando Viral Neuro-Architect", status: "esperando" },
    { id: 4, label: "Processando DNA Viral", status: "esperando" },
  ];
  // etapasProc guarda o estado atual dessas etapas (inicialmente todas "esperando").
  const [etapasProc, setEtapasProc] = useState(etapasProcessamento);
  // erro indica se ocorreu algum erro durante a análise.
  const [erro, setErro] = useState(false);
  // mensagemErro guarda a mensagem de erro caso ocorra.
  const [mensagemErro, setMensagemErro] = useState("");

  // Função que atualiza o status das etapas de processamento.
  // Quando uma etapa com id X é concluída, as anteriores ficam "concluido", a atual fica "carregando"
  // e as seguintes continuam "esperando".
  const atualizaEtapaProc = (id: number) => {
    setEtapasProc((prev) =>
      prev.map((e) => ({
        ...e,
        status:
          e.id < id ? "concluido" : e.id === id ? "carregando" : "esperando",
      })),
    );
  };

  // Funções para lidar com eventos de arrastar e soltar (drag and drop) do arquivo.
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do navegador (ex: abrir o arquivo).
    e.stopPropagation(); // Impede que o evento se propague para outros elementos.
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  // Quando o usuário solta o arquivo na área de upload.
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false); // Desativa o estado de arrastar.
    if (e.dataTransfer.files?.[0]) selecionarArquivo(e.dataTransfer.files[0]); // Pega o primeiro arquivo.
  };

  // Função que valida e guarda o arquivo escolhido.
  const selecionarArquivo = (arquivo: File) => {
    setMensagemErroArquivo(""); // Limpa mensagens de erro anteriores.
    const erroValidacao = validarArquivo(arquivo); // Chama uma função externa que verifica tamanho/tipo.
    if (erroValidacao) {
      setMensagemErroArquivo(erroValidacao); // Se deu erro, mostra a mensagem.
      return;
    }
    setFile(arquivo); // Se passou na validação, guarda o arquivo.
  };

  // Função que valida se os campos de métricas estão preenchidos corretamente.
  // Retorna uma string com a mensagem de erro ou null se estiver tudo ok.
  const validarMetricas = (): string | null => {
    if (metricas.views <= 0) return "Informe o número de views.";
    if (metricas.likes < 0) return "Likes não pode ser negativo.";
    if (metricas.comentarios < 0) return "Comentários não pode ser negativo.";
    if (metricas.shares < 0) return "Shares não pode ser negativo.";
    return null;
  };

  // Função que valida se os campos do perfil estão preenchidos corretamente.
  const validarPerfil = (): string | null => {
    if (!perfilCriador.cidade.trim()) return "Informe sua cidade.";
    if (perfilCriador.idade <= 0 || perfilCriador.idade > 120)
      return "Informe uma idade válida.";
    return null;
  };

  // Função principal que inicia o processo de análise do vídeo.
  const enviarParaAnalise = async () => {
    if (!file) return; // Se não tem arquivo, não faz nada.

    setErro(false); // Reseta o estado de erro.
    setMensagemErro(""); // Limpa mensagem de erro.
    setEtapasProc(etapasProcessamento); // Reinicia as etapas de processamento.
    setEtapaAtual("processando"); // Muda para a etapa de processamento.

    try {
      // Etapa 1: upload do vídeo para o Supabase (armazenamento na nuvem).
      atualizaEtapaProc(1);
      const { publicUrl } = await uploadVideoParaSupabase(file);

      // Etapa 2: envia a URL do vídeo e os dados preenchidos para a API de análise.
      atualizaEtapaProc(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await enviarParaApiAnalise(publicUrl, {
        metricas,
        perfilCriador,
        nichoConfirmado: nichoConfirmado.trim() || undefined,
      });

      // Etapas 3 e 4: a API processa (simbolicamente, atualizamos os status).
      atualizaEtapaProc(3);
      atualizaEtapaProc(4);

      // Se a API retornou um resultado, marca todas as etapas como concluídas
      // e após 1 segundo chama a função aoFinalizar passando o resultado.
      if (data.resultado) {
        setEtapasProc((prev) =>
          prev.map((e) => ({ ...e, status: "concluido" })),
        );
        setTimeout(() => aoFinalizar(data.resultado as VipeFullOutput), 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Se algo deu errado (erro na rede, API fora do ar, etc), exibe mensagem.
      console.error("❌ [ERRO]", error.message);
      setMensagemErro(error.message || "Erro ao analisar vídeo");
      setErro(true);
      setEtapaAtual("upload"); // Volta para a etapa de upload para tentar novamente.
    }
  };

  // O hook retorna um objeto com todos os estados e funções que o componente precisa.
  return {
    // estado
    etapaAtual,
    setEtapaAtual,
    dragActive,
    file,
    mensagemErroArquivo,
    metricas,
    setMetricas,
    perfilCriador,
    setPerfilCriador,
    nichoConfirmado,
    setNichoConfirmado,
    etapasProc,
    erro,
    mensagemErro,
    // funções
    handleDrag,
    handleDrop,
    selecionarArquivo,
    validarMetricas,
    validarPerfil,
    enviarParaAnalise,
    setFile,
    setErro,
  };
}
