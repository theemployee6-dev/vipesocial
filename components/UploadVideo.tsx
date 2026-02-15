"use client"; // Dizemos ao Next.js que este botão tem "vida" (cliques e movimentos)

import React, { useState } from "react";

interface UploadVideoProps {
  aoFinalizar: (texto: string) => void;
}

//defina as etapas possíveis
const etapasIniciais = [
  { id: 1, label: "Recebendo vídeo", status: "esperando" },
  { id: 2, label: "Transformando dados (Base64)", status: "esperando" },
  { id: 3, label: "Chamando Viral Neuro-Architect", status: "esperando" },
  { id: 4, label: "Processando DNA Viral", status: "esperando" },
];

export default function UploadVideo({ aoFinalizar }: UploadVideoProps) {
  // 1. Estados: São as "memórias" do componente
  const [dragActive, setDragActive] = useState(false); // Sabe se o vídeo está "em cima" do botão
  const [file, setFile] = useState<File | null>(null); // Guarda o vídeo escolhido
  const [loading, setLoading] = useState(false); // Sabe se a IA está pensando
  const [etapas, setEtapas] = useState(etapasIniciais);
  const [erro, setErro] = useState(false);

  // 2. Função quando o usuário arrasta o vídeo sobre a área
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 3. Função quando o usuário SOLTA o vídeo
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const atualizaEtapa = (id: number) => {
    setEtapas((prev) =>
      prev.map((e) => ({
        ...e,
        status:
          e.id < id ? "concluído" : e.id === id ? "carregando" : "esperando",
      })),
    );
  };

  // 4. Função que envia o vídeo para o nosso "Cérebro" (a API que criamos)
  const enviarParaAnalise = async () => {
    if (!file) return;
    setLoading(true);
    setErro(false);

    //etapa1
    atualizaEtapa(1);
    await new Promise((r) => setTimeout(r, 800));

    //etapa2
    atualizaEtapa(2);
    const formData = new FormData();
    formData.append("video", file);

    atualizaEtapa(3);
    try {
      const response = await fetch("/api/analisar", {
        method: "POST",
        body: formData,
      });
      atualizaEtapa(4);

      const data = await response.json();

      if (data.resultado) {
        aoFinalizar(data.resultado);
        setEtapas((prev) => prev.map((e) => ({ ...e, status: "concluído" })));
        setTimeout(() => aoFinalizar(data.resultado), 3000);
      }

      console.log(data.resultado);
    } catch (error) {
      alert(`Erro: ${error} ao analisar vídeo.`);
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  // TELA DE ERRO
  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-3xl border-2 border-red-200 animate-in fade-in zoom-in duration-300">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-red-800">
          Ocorreu um erro na IA
        </h2>
        <p className="text-red-600 text-center mt-2 mb-6">
          O Viral Neuro-Architect está instável ou o vídeo não pôde ser
          processado.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200"
        >
          🔄 Tentar Outra Vez
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-6 bg-white rounded-3xl shadow-xl">
        <h2 className="text-xl font-bold text-purple-900 animate-pulse">
          Processando Inteligência...
        </h2>
        <div className="w-full space-y-4">
          {etapas.map((etapa) => (
            <div
              key={etapa.id}
              className="flex items-center justify-between p-3 border-b border-gray-100"
            >
              <span
                className={`text-sm ${etapa.status === "esperando" ? "text-gray-400" : "text-purple-700"}`}
              >
                {etapa.label}
              </span>
              <span>
                {etapa.status === "concluido" && "✅"}
                {etapa.status === "carregando" && "⏳"}
                {etapa.status === "esperando" && "⚪"}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 italic">
          Plano viral em análise, aguarde...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8">
      {/* Área de Arrastar e Soltar */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
          dragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        {file ? (
          <div className="text-center">
            <p className="text-purple-600 font-bold">✅ Vídeo selecionado:</p>
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700">
              Arraste seu vídeo viral aqui
            </p>
            <p className="text-sm text-gray-400">ou clique para selecionar</p>
          </div>
        )}

        {/* Input invisível que abre a pasta do computador */}
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          accept="video/*"
        />
      </div>

      {/* Botão de Ação */}
      <button
        onClick={enviarParaAnalise}
        disabled={!file || loading}
        className={`mt-6 w-full py-4 rounded-xl font-bold text-white transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 shadow-lg"
        }`}
      >
        {loading
          ? "A IA está assistindo seu vídeo... 🧠"
          : "Analisar DNA Viral 🚀"}
      </button>
    </div>
  );
}
