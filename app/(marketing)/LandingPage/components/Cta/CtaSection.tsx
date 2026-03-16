"use client";

import { routesString } from "@/shared/constants/routesString";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="bg-(--bg) py-2 px-4 text-center relative overflow-hidden md:py-20 md:px-6 4k:py-45 4k:px-10">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600] h-[400] bg-radial-gradient pointer-events-none md:max-w-[800] md:h-[600] 4k:max-w-[1200] 4k:h-[800]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,255,136,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Container */}
      <div className="max-w-full mx-auto relative md:max-w-[1100]">
        <h2 className="text-[clamp(32px,8vw,52px)] font-extrabold tracking-tighter leading-none max-w-full mx-auto mb-5 relative md:text-[clamp(40px,6vw,76px)] md:max-w-[800] md:mb-6 4k:text-[100px] 4k:max-w-[1200]">
          Para de <span className="text-(--green)">adivinhar.</span>
          <br />
          Começa a <span className="text-(--green)">viralizar.</span>
        </h2>
        <p className="text-sm text-(--text-muted) max-w-full mx-auto mb-8 leading-relaxed relative px-2 md:text-base md:max-w-[440] md:mb-12 4k:text-[22px] 4k:max-w-[600]">
          Chega de postar no escuro. Deixa a IA mostrar o caminho e te entregar
          os roteiros prontos pra gravar.
        </p>
        <div>
          <Link
            href={routesString.auth.register}
            className="bg-(--green) text-[#04070e] border-none px-7 py-3.5 rounded-full font-extrabold text-sm cursor-pointer transition-all duration-300 shadow-[0_0_40px_rgba(0,255,136,0.2)] relative whitespace-nowrap w-auto max-w-full hover:bg-[#00ffaa] hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(0,255,136,0.3)] md:px-10 md:py-[18] md:text-base md:shadow-[0_0_60px_rgba(0,255,136,0.3)] 4k:px-15 4k:py-6 4k:text-xl"
          >
            Criar meu primeiro roteiro viral
          </Link>
          <p className="text-[11px] text-(--text-dim) mb-16 mt-3 relative md:text-xs md:mt-4 4k:text-sm">
            Sem cartão de crédito. Comece grátis agora.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
