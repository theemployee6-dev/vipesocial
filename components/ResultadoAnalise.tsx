interface ResultadoAnaliseProps {
  texto: string;
}

export default function ResultadoAnalise({ texto }: ResultadoAnaliseProps) {
  // Uma lógica simples para separar o texto por seções se quiser,
  // mas por enquanto vamos renderizar com estilo.
  return (
    <div className="mt-8 p-6 bg-white rounded-3xl shadow-xl border border-purple-100 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        ✨ Plano de Viralização
      </h2>
      <div className="prose prose-purple max-w-none taxt-gray-700 leading-relaxed">
        {/* Usamos white-space para manter as quebras de linha que a IA enviou */}
        <pre className="whitespace-pre-wrap font-sans text-lg text-black">
          {texto}
        </pre>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Analisar outro vídeo
      </button>
    </div>
  );
}
