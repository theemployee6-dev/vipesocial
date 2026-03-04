// /* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import { useUploadVideo } from "./hooks/useUploadVideo";
import { formatarTamanhoArquivo } from "@/lib/uploadVideo";
import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";

interface UploadVideoScreenProps {
  aoFinalizar: (resultado: VipeFullOutput) => void;
}

export default function UploadVideoScreen({
  aoFinalizar,
}: UploadVideoScreenProps) {
  const {
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
    handleDrag,
    handleDrop,
    selecionarArquivo,
    validarMetricas,
    validarPerfil,
    enviarParaAnalise,
    setFile,
    setErro,
  } = useUploadVideo({ aoFinalizar });

  // ─── Tela de erro ─────────────────────────────────────
  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-3xl border-2 border-red-200 animate-in fade-in zoom-in duration-300">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-red-800">
          Ocorreu um erro na análise
        </h2>
        <p className="text-red-600 text-center mt-2 mb-6 max-w-md">
          {mensagemErro ||
            "O Viral Neuro-Architect está instável ou o vídeo não pôde ser processado."}
        </p>
        <button
          onClick={() => {
            setErro(false);
            setFile(null);
            setEtapaAtual("upload");
          }}
          className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200"
        >
          🔄 Tentar Novamente
        </button>
      </div>
    );
  }

  // ─── Tela de processamento ────────────────────────────
  if (etapaAtual === "processando") {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-6 bg-white rounded-3xl shadow-xl">
        <h2 className="text-xl font-bold text-purple-900 animate-pulse">
          Processando Inteligência...
        </h2>
        <div className="w-full space-y-4">
          {etapasProc.map((etapa) => (
            <div
              key={etapa.id}
              className="flex items-center justify-between p-3 border-b border-gray-100"
            >
              <span
                className={`text-sm ${
                  etapa.status === "esperando"
                    ? "text-gray-400"
                    : "text-purple-700"
                }`}
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
          {etapasProc.find((e) => e.status === "carregando")?.label ||
            "Plano viral em análise, aguarde..."}
        </p>
      </div>
    );
  }

  // ─── Etapa 1: Upload ──────────────────────────────────
  if (etapaAtual === "upload") {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8">
        <div className="w-full mb-6">
          <StepIndicator etapaAtual={1} />
        </div>

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
            <div className="text-center px-4">
              <p className="text-purple-600 font-bold mb-2">
                ✅ Vídeo selecionado:
              </p>
              <p className="text-sm text-gray-600 truncate max-w-xs mx-auto">
                {file.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatarTamanhoArquivo(file.size)}
              </p>
            </div>
          ) : (
            <div className="text-center px-4">
              <p className="text-lg text-gray-700">
                Arraste seu vídeo viral aqui
              </p>
              <p className="text-sm text-gray-400">
                ou clique para selecionar (máx. 50MB)
              </p>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              if (e.target.files) selecionarArquivo(e.target.files[0]);
            }}
            accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska"
          />
        </div>

        {mensagemErroArquivo && (
          <p className="mt-3 text-sm text-red-500 bg-red-50 p-2 rounded-lg">
            {mensagemErroArquivo}
          </p>
        )}

        {!file && !mensagemErroArquivo && (
          <p className="mt-3 text-xs text-gray-400 text-center">
            🎥 Formatos suportados: MP4, MOV, AVI, MKV • Limite: 50MB
          </p>
        )}

        <button
          onClick={() => setEtapaAtual("metricas")}
          disabled={!file}
          className={`mt-6 w-full py-4 rounded-xl font-bold text-white transition-all ${
            !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200"
          }`}
        >
          {file ? "Continuar →" : "Selecione um vídeo para começar"}
        </button>
      </div>
    );
  }

  // ─── Etapa 2: Métricas ────────────────────────────────
  if (etapaAtual === "metricas") {
    const erroMetricas = validarMetricas();

    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto p-8 space-y-6">
        <div className="w-full">
          <StepIndicator etapaAtual={2} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-900 mb-1">
            📊 Métricas do vídeo
          </h2>
          <p className="text-sm text-gray-500">
            Informe os números do vídeo que você quer replicar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CampoNumerico
            label="Views *"
            valor={metricas.views}
            onChange={(v) => setMetricas((m) => ({ ...m, views: v }))}
          />
          <CampoNumerico
            label="Likes *"
            valor={metricas.likes}
            onChange={(v) => setMetricas((m) => ({ ...m, likes: v }))}
          />
          <CampoNumerico
            label="Comentários *"
            valor={metricas.comentarios}
            onChange={(v) => setMetricas((m) => ({ ...m, comentarios: v }))}
          />
          <CampoNumerico
            label="Shares *"
            valor={metricas.shares}
            onChange={(v) => setMetricas((m) => ({ ...m, shares: v }))}
          />
          <div className="col-span-2">
            <CampoNumerico
              label="Replay Rate (%) — opcional"
              valor={metricas.replay_rate ?? 0}
              onChange={(v) =>
                setMetricas((m) => ({
                  ...m,
                  replay_rate: v > 0 ? v : undefined,
                }))
              }
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setEtapaAtual("upload")}
            className="flex-1 py-3 rounded-xl font-bold text-purple-700 border-2 border-purple-200 hover:bg-purple-50 transition-all"
          >
            ← Voltar
          </button>
          <button
            onClick={() => {
              if (!erroMetricas) setEtapaAtual("perfil");
            }}
            disabled={!!erroMetricas}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
              erroMetricas
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-lg"
            }`}
          >
            Continuar →
          </button>
        </div>

        {erroMetricas && (
          <p className="text-sm text-red-500 text-center">{erroMetricas}</p>
        )}
      </div>
    );
  }

  // ─── Etapa 3: Perfil ──────────────────────────────────
  if (etapaAtual === "perfil") {
    const erroPerfil = validarPerfil();

    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto p-8 space-y-6">
        <div className="w-full">
          <StepIndicator etapaAtual={3} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-900 mb-1">
            🧬 Perfil do criador
          </h2>
          <p className="text-sm text-gray-500">
            Ajuda a IA a gerar roteiros adaptados à sua realidade.
          </p>
        </div>

        <div className="space-y-4">
          {/* Realidade socioeconômica */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Realidade socioeconômica *
            </label>
            <div className="flex gap-3">
              {(["pobre", "classe média", "rico"] as const).map((opcao) => (
                <button
                  key={opcao}
                  onClick={() =>
                    setPerfilCriador((p) => ({
                      ...p,
                      realidade_socioeconomica: opcao,
                    }))
                  }
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 capitalize transition-all ${
                    perfilCriador.realidade_socioeconomica === opcao
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-gray-200 text-gray-600 hover:border-purple-300"
                  }`}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>

          {/* Idade */}
          <CampoNumerico
            label="Idade *"
            valor={perfilCriador.idade}
            onChange={(v) => setPerfilCriador((p) => ({ ...p, idade: v }))}
          />

          {/* Cidade */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cidade *
            </label>
            <input
              type="text"
              value={perfilCriador.cidade}
              onChange={(e) =>
                setPerfilCriador((p) => ({ ...p, cidade: e.target.value }))
              }
              placeholder="Ex: São Paulo"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          {/* Nicho (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nicho do vídeo — opcional
            </label>
            <input
              type="text"
              value={nichoConfirmado}
              onChange={(e) => setNichoConfirmado(e.target.value)}
              placeholder="Ex: fitness, finanças, moda..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-all"
            />
            <p className="mt-1 text-xs text-gray-400">
              Se não informar, a IA vai inferir automaticamente.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setEtapaAtual("metricas")}
            className="flex-1 py-3 rounded-xl font-bold text-purple-700 border-2 border-purple-200 hover:bg-purple-50 transition-all"
          >
            ← Voltar
          </button>
          <button
            onClick={() => {
              if (!erroPerfil) enviarParaAnalise();
            }}
            disabled={!!erroPerfil}
            className={`flex-1 py-4 rounded-xl font-bold text-white transition-all ${
              erroPerfil
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200"
            }`}
          >
            Analisar DNA Viral 🚀
          </button>
        </div>

        {erroPerfil && (
          <p className="text-sm text-red-500 text-center">{erroPerfil}</p>
        )}
      </div>
    );
  }

  return null;
}

// ─── Sub-componentes ──────────────────────────────────────

function StepIndicator({ etapaAtual }: { etapaAtual: number }) {
  const etapas = ["Vídeo", "Métricas", "Perfil"];
  return (
    <div className="flex items-center justify-between w-full mb-2">
      {etapas.map((label, i) => {
        const num = i + 1;
        const ativa = num === etapaAtual;
        const concluida = num < etapaAtual;
        return (
          <React.Fragment key={num}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  concluida
                    ? "bg-green-500 text-white"
                    : ativa
                      ? "bg-purple-600 text-white ring-4 ring-purple-200"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {concluida ? "✓" : num}
              </div>
              <span
                className={`text-xs font-medium ${
                  ativa
                    ? "text-purple-700"
                    : concluida
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < etapas.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-5 rounded ${
                  concluida ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function CampoNumerico({
  label,
  valor,
  onChange,
}: {
  label: string;
  valor: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        min={0}
        value={valor === 0 ? "" : valor}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="0"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-all"
      />
    </div>
  );
}
