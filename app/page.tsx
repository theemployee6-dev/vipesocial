"use client";

import { useState } from "react";
import UploadVideo from "../components/UploadVideo";
import ResultadoAnalise from "@/components/ResultadoAnalise";

export default function Home() {
  const [resultado, setResultado] = useState("");
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          vipe<span className="text-purple-600">Social</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Descubra o DNA dos seus vídeos virais e receba scripts prontos em
          segundos.
        </p>
        {!resultado ? (
          <UploadVideo aoFinalizar={setResultado} />
        ) : (
          <ResultadoAnalise texto={resultado} />
        )}
      </div>
    </main>
  );
}
