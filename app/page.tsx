"use client";

import { useState, useEffect, useRef } from "react";
import UploadVideoScreen from "@/components/UploadVideoScreen/UploadVideoScreen";
import ResultadoAnalise from "@/components/ResultadoAnalise/ResultadoAnalise";
import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";
import { colors } from "@/lib/core/constants/colors"; // ajuste o caminho

// ─── Particle canvas background ──────────────────────────
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    };

    const COUNT = 120;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle.fill(p.alpha);
        ctx.fill();
      });
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = colors.particle.stroke(0.12 * (1 - d / 90));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ─── Glowing upload border ────────────────────────────────
function GlowBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: colors.glow.boxShadow }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: colors.background.glowGradient,
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────
export default function Home() {
  const [resultado, setResultado] = useState<VipeFullOutput | null>(null);

  if (resultado) {
    return (
      <ResultadoAnalise
        resultado={resultado}
        onVoltar={() => setResultado(null)}
      />
    );
  } else {
    return (
      <>
        <div
          className="fixed inset-0"
          style={{
            background: colors.background.radial1,
            zIndex: -1,
          }}
        />
        <ParticleBackground />

        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400] 4k:h-[600] pointer-events-none"
          style={{
            background: colors.background.radial2,
            zIndex: 0,
          }}
        />

        <main
          className="relative min-h-screen flex flex-col items-center px-4 py-6 4k:px-8 4k:py-10"
          style={{ zIndex: 1, fontFamily: "'Sora', 'Outfit', sans-serif" }}
        >
          {/* ── Navbar ── */}
          <nav className="w-full max-w-5xl 4k:max-w-7xl mx-auto flex items-center justify-between mb-10 sm:mb-14 4k:mb-20">
            <button
              className="flex flex-col gap-1.5 p-1 4k:gap-2 4k:p-2"
              aria-label="Menu"
            >
              <span className="block w-5 h-0.5 bg-gray-400 4k:w-8 4k:h-1" />
              <span className="block w-5 h-0.5 bg-gray-400 4k:w-8 4k:h-1" />
            </button>

            <h1
              className="text-3xl sm:text-5xl font-black tracking-tight 4k:text-7xl"
              style={{ color: colors.text.title }}
            >
              Vipe<span style={{ color: colors.primary[500] }}>Social</span>
            </h1>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all 4k:px-6 4k:py-3 4k:text-base"
              style={{
                background: colors.button.entrarBg,
                border: `1px solid ${colors.button.entrarBorder}`,
                color: colors.button.entrarText,
              }}
            >
              <svg
                className="w-3.5 h-3.5 4k:w-5 4k:h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              Entrar
            </button>
          </nav>

          {/* ── Hero title (só aparece antes do resultado) ── */}
          {!resultado && (
            <div className="text-center mb-10 sm:mb-12 px-2 4k:mb-20">
              <h2
                className="text-3xl sm:text3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 4k:text-7xl 4k:mb-6"
                style={{ color: colors.text.heroTitle }}
              >
                Transforme vídeos virais em <br className="hidden sm:block" />
                <span style={{ color: colors.primary[500] }}>
                  scripts prontos
                </span>{" "}
                em segundos.
              </h2>
              <p
                className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed 4k:text-2xl 4k:max-w-3xl"
                style={{ color: colors.text.heroSub }}
              >
                Faça upload de um vídeo viral e receba a engenharia reversa
                completa + 5 ideias baseadas no mesmo padrão.
              </p>
            </div>
          )}

          {/* ── Upload / Result area ── */}
          <div className="w-full max-w-2xl 4k:max-w-4xl mx-auto">
            {!resultado && (
              <div className="flex flex-col items-center gap-6 4k:gap-8">
                <GlowBorder>
                  <div
                    className="w-full rounded-2xl p-1 4k:p-2"
                    style={{
                      background: colors.background.uploadGradient,
                      border: `1px solid ${colors.border.upload}`,
                    }}
                  >
                    <UploadVideoScreen
                      aoFinalizar={(data) => setResultado(data)}
                    />
                  </div>
                </GlowBorder>

                <p
                  className="text-xs text-center 4k:text-base"
                  style={{ color: colors.text.stats }}
                >
                  +3.482 vídeos analisados essa semana •{" "}
                  <span style={{ color: colors.text.statsSpan }}>
                    Criadores aumentaram em média 217% o alcance.
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* ── Features strip (só no estado inicial) ── */}
          {!resultado && (
            <div className="w-full max-w-2xl 4k:max-w-4xl mx-auto mt-12 sm:mt-16 4k:mt-24">
              <div className="flex justify-center mb-5 4k:mb-8">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black 4k:w-14 4k:h-14 4k:text-xl"
                  style={{
                    background: colors.border.numberBg,
                    border: `1.5px solid ${colors.border.numberBorder}`,
                    color: colors.misc.numberColor,
                  }}
                >
                  2
                </div>
              </div>

              <div
                className="rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 4k:p-10 4k:gap-16"
                style={{
                  background: colors.background.featuresGradient,
                  border: `1px solid ${colors.border.featuresCard}`,
                  boxShadow: colors.misc.featureShadow,
                }}
              >
                <div className="flex items-center gap-4 flex-1 4k:gap-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 4k:w-20 4k:h-20 4k:rounded-2xl"
                    style={{
                      background: colors.border.featuresIconBg,
                      border: `1px solid ${colors.border.featuresIcon}`,
                    }}
                  >
                    <svg
                      className="w-6 h-6 4k:w-10 4k:h-10"
                      fill="none"
                      stroke={colors.misc.iconStroke}
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm 4k:text-xl"
                      style={{ color: colors.text.featuresTextLight }}
                    >
                      Faça upload de
                    </p>
                    <p
                      className="font-black text-base 4k:text-2xl"
                      style={{ color: colors.text.featuresTextDark }}
                    >
                      um vídeo viral
                    </p>
                  </div>
                </div>

                <div
                  className="hidden sm:block w-px h-12 self-center 4k:h-20"
                  style={{ background: colors.misc.featureDivider }}
                />

                <div className="flex items-center gap-4 flex-1 4k:gap-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 4k:w-20 4k:h-20 4k:rounded-2xl"
                    style={{
                      background: colors.border.featuresIconBg,
                      border: `1px solid ${colors.border.featuresIcon}`,
                    }}
                  >
                    <svg
                      className="w-6 h-6 4k:w-10 4k:h-10"
                      fill="none"
                      stroke={colors.misc.iconStroke}
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm 4k:text-xl"
                      style={{ color: colors.text.featuresTextLight }}
                    >
                      Implemente
                    </p>
                    <p
                      className="font-black text-base 4k:text-2xl"
                      style={{ color: colors.text.featuresTextDark }}
                    >
                      scripts virais 💡
                    </p>
                  </div>
                </div>
              </div>

              <p
                className="text-center text-xs mt-4 leading-relaxed 4k:text-base 4k:mt-6"
                style={{ color: colors.text.featuresFooter }}
              >
                Agora improvise os scripts, use as ferramentas do app para criar
                conteúdo próprio e alcançar novos ideais.
              </p>
            </div>
          )}

          <div className="h-16 4k:h-24" />
        </main>

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
      `}</style>
      </>
    );
  }
}
