"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  /** 0–100. Se passado, controla o líquido externamente. */
  progress?: number;
  /** Duração em ms para modo automático (quando progress não é passado). Padrão: 3000 */
  duration?: number;
  /** Texto exibido abaixo do V. Padrão: "Analisando..." */
  label?: string;
  /** Callback chamado quando o V está completamente cheio */
  onComplete?: () => void;
  /** Se true, oculta o componente com fade-out */
  hide?: boolean;
}

export default function LoadingScreen({
  progress,
  duration = 3000,
  label = "Analisando",
  onComplete,
  hide = false,
}: LoadingScreenProps) {
  const isControlled = progress !== undefined;

  // Modo automático: anima de 0 → 100 sozinho
  const [autoProgress, setAutoProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (isControlled) return;

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setAutoProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (!completedRef.current) {
        completedRef.current = true;
        setTimeout(() => onComplete?.(), 400);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isControlled, duration, onComplete]);

  // Modo controlado: dispara onComplete quando chega em 100
  useEffect(() => {
    if (!isControlled) return;
    if (progress === 100 && !completedRef.current) {
      completedRef.current = true;
      setTimeout(() => onComplete?.(), 600);
    }
  }, [isControlled, progress, onComplete]);

  const fill = isControlled ? (progress ?? 0) : autoProgress;
  const translateY = 100 - fill;

  // Bolhas ficam mais ativas quanto mais cheio está
  const bubbleOpacity = fill > 10 ? 1 : 0;

  return (
    <>
      <style>{`
        @keyframes ls-wave1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ls-wave2 {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes ls-bubble {
          0%   { transform: translateY(0) scale(1); opacity: 0.85; }
          100% { transform: translateY(-70px) scale(0.2); opacity: 0; }
        }
        @keyframes ls-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes ls-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ls-fadeout {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes ls-labelPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        @keyframes ls-dots {
          0%   { content: ''; }
          33%  { content: '.'; }
          66%  { content: '..'; }
          100% { content: '...'; }
        }

        .ls-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #04070e;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
          gap: 8px;
          animation: ${hide ? "ls-fadeout 0.5s ease forwards" : "ls-fadein 0.15s ease forwards"};
          pointer-events: ${hide ? "none" : "all"};
        }

        /* Glow atrás do V */
        .ls-glow {
          position: absolute;
          width: clamp(200px, 28vw, 700px);
          height: clamp(240px, 34vw, 860px);
          background: radial-gradient(
            ellipse at center,
            rgba(0,255,136,0.18) 0%,
            rgba(0,204,102,0.08) 40%,
            transparent 70%
          );
          filter: blur(28px);
          animation: ls-glow 2.4s ease-in-out infinite;
          pointer-events: none;
        }

        /* Container com máscara do logo */
        .ls-mask {
          position: relative;
          width: clamp(140px, 20vw, 520px);
          height: clamp(178px, 25vw, 660px);
          -webkit-mask-image: url('/assets/img/logo/logo_v_sem_fundo.png');
          mask-image: url('/assets/img/logo/logo_v_sem_fundo.png');
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          margin-left: -10px;
          margin-bottom: clamp(-40px, -4vw, -20px);
        }

        /* Camada escura de fundo do V (acrílico vazio) */
        .ls-acrylic {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(0,255,136,0.06) 0%,
            rgba(0,180,100,0.03) 50%,
            rgba(0,100,60,0.05) 100%
          );
          border-radius: 4px;
        }

        /* Líquido */
        .ls-liquid {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          transform: translateY(${fill === 0 ? 100 : Math.min(translateY, 70)}%);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: linear-gradient(
            180deg,
            #00ffdd 0%,
            #00ff88 30%,
            #00dd66 60%,
            #009944 100%
          );
        }

        /* Brilho na superfície do líquido */
        .ls-liquid::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.15) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* Ondas na superfície */
        .ls-wave-wrap {
          position: absolute;
          top: -14px;
          left: 0;
          width: 100%;
          height: 16px;
          overflow: hidden;
        }
        .ls-wave {
          position: absolute;
          top: 0;
          width: 200%;
          height: 100%;
        }
        .ls-wave1 { animation: ls-wave1 1.3s linear infinite; }
        .ls-wave2 { animation: ls-wave2 1.9s linear infinite; opacity: 0.55; }

        /* Bolhas */
        .ls-bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle at 35% 30%,
            rgba(255,255,255,0.95),
            rgba(0,255,136,0.35)
          );
          animation: ls-bubble linear infinite;
          opacity: ${bubbleOpacity};
          transition: opacity 0.5s ease;
        }

        /* Reflexo acrílico no topo da máscara */
        .ls-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.07) 0%,
            transparent 45%,
            rgba(255,255,255,0.03) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Label */
        .ls-label {
          width: clamp(140px, 20vw, 520px);
          text-align: center;
          font-size: clamp(9px, 1.1vw, 20px);
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          animation: ls-labelPulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }
        .ls-label em {
          color: #00ff88;
          font-style: normal;
          font-weight: 600;
        }

        /* Percentual */
        .ls-pct {
          font-size: clamp(11px, 1.3vw, 26px);
          font-weight: 700;
          color: rgba(0,255,136,0.6);
          letter-spacing: 1px;
          font-variant-numeric: tabular-nums;
          position: relative;
          z-index: 1;
          min-width: 44px;
          text-align: center;
        }

        /* ── Breakpoints ── */

        /* Mobile pequeno (< 380px) */
        @media (max-width: 380px) {
          .ls-mask {
            width: 130px;
            height: 165px;
          }
          .ls-glow {
            width: 180px;
            height: 220px;
          }
        }

        /* Tablet (768px – 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
          .ls-mask {
            width: 220px;
            height: 280px;
          }
          .ls-glow {
            width: 300px;
            height: 370px;
          }
        }

        /* Desktop (1024px – 1920px) */
        @media (min-width: 1024px) and (max-width: 1920px) {
          .ls-mask {
            width: 240px;
            height: 305px;
          }
          .ls-glow {
            width: 340px;
            height: 420px;
          }
        }

        /* Full HD / 2K (1920px – 2560px) */
        @media (min-width: 1920px) and (max-width: 2560px) {
          .ls-mask {
            width: 320px;
            height: 408px;
          }
          .ls-glow {
            width: 460px;
            height: 560px;
          }
        }

        /* 4K (> 2560px) */
        @media (min-width: 2560px) {
          .ls-mask {
            width: 520px;
            height: 662px;
          }
          .ls-glow {
            width: 700px;
            height: 860px;
          }
          .ls-label {
            font-size: 22px;
            letter-spacing: 4px;
            width: 520px;
          }
          .ls-pct {
            font-size: 28px;
          }
          .ls-bubble {
            transform: scale(2);
          }
        }
      `}</style>

      <div className="ls-root">
        <div className="ls-glow" />
        <div className="ls-mask">
          {/* Fundo acrílico */}
          <div className="ls-acrylic" />

          {/* Líquido */}
          <div className="ls-liquid">
            {/* Ondas */}
            <div className="ls-wave-wrap">
              <div className="ls-wave ls-wave1">
                <svg
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  style={{ width: "100%", height: "100%" }}
                >
                  <path
                    d="M0,8 C25,0 50,16 75,8 C100,0 125,16 150,8 C175,0 200,16 200,8 L200,16 L0,16 Z"
                    fill="#00ff88"
                  />
                </svg>
              </div>
              <div className="ls-wave ls-wave2">
                <svg
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  style={{ width: "100%", height: "100%" }}
                >
                  <path
                    d="M0,10 C30,2 60,16 90,8 C120,0 150,14 180,8 C192,5 200,10 200,10 L200,16 L0,16 Z"
                    fill="#00ffcc"
                  />
                </svg>
              </div>
            </div>

            {/* Bolhas */}
            {[
              { w: 7, l: "34%", b: "22%", dur: "1.9s", del: "0.1s" },
              { w: 5, l: "56%", b: "38%", dur: "1.5s", del: "0.6s" },
              { w: 4, l: "44%", b: "55%", dur: "2.1s", del: "1.0s" },
              { w: 6, l: "62%", b: "18%", dur: "1.7s", del: "0.3s" },
              { w: 3, l: "38%", b: "65%", dur: "1.3s", del: "0.8s" },
              { w: 5, l: "50%", b: "42%", dur: "1.6s", del: "1.4s" },
              { w: 4, l: "28%", b: "30%", dur: "2.0s", del: "0.5s" },
            ].map((b, i) => (
              <div
                key={i}
                className="ls-bubble"
                style={{
                  width: b.w,
                  height: b.w,
                  left: b.l,
                  bottom: b.b,
                  animationDuration: b.dur,
                  animationDelay: b.del,
                }}
              />
            ))}
          </div>

          {/* Reflexo */}
          <div className="ls-reflection" />
        </div>

        {/* Label */}
        <div className="ls-label">{label}</div>

        {/* Percentual */}
        <div className="ls-pct">{Math.round(fill)}%</div>
      </div>
    </>
  );
}
