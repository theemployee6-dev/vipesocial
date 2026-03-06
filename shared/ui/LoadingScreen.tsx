/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef } from "react";
import { createScope, waapi } from "animejs";

interface LoadingScreenProps {
  progress?: number;
  duration?: number;
  label?: string;
  onComplete?: () => void;
  hide?: boolean;
}

export default function LoadingScreen({
  progress,
  duration = 10000,
  label = "Analisando",
  onComplete,
  hide = false,
}: LoadingScreenProps) {
  const isControlled = progress !== undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<any>(null);
  const completedRef = useRef(false);

  const durationRef = useRef(duration);
  const onCompleteRef = useRef(onComplete);

  // Compensa o espaço vazio da máscara da logo
  const MASK_OFFSET = 23; // onde o preenchimento começava
  const MASK_RANGE = 85 - MASK_OFFSET;

  useEffect(() => {
    durationRef.current = duration;
    onCompleteRef.current = onComplete;
  }, [duration, onComplete]);

  useEffect(() => {
    if (!rootRef.current) return;

    const mapProgress = (value: number) => {
      const clamped = Math.max(0, Math.min(100, value));
      return MASK_OFFSET + (clamped / 100) * MASK_RANGE;
    };

    scopeRef.current = createScope({ root: rootRef.current }).add(
      (self: any) => {
        // Dentro do useEffect da animação
        const animation = waapi.animate(".liquid", {
          translateY: ["100%", "0%"],
          duration: durationRef.current,
          easing: "ease-out", // mais suave que easeOutExpo
          autoplay: false,
          update: (anim: any) => {
            // Apenas atualiza o percentual (operação leve)
            const pct = Math.round(anim.progress);
            const pctEl = rootRef.current?.querySelector(".pct");
            if (pctEl) pctEl.textContent = `${pct}%`;
          },
          complete: () => {
            if (!completedRef.current) {
              completedRef.current = true;
              setTimeout(() => onCompleteRef.current?.(), 400);
            }
          },
        });

        self.add("play", () => animation.play());
        self.add("seek", (value: number) => {
          const visual = mapProgress(value);

          animation.seek((visual / 100) * durationRef.current);

          const pctEl = rootRef.current?.querySelector(".pct");
          if (pctEl) pctEl.textContent = `${Math.round(value)}%`;

          const liquidEl = rootRef.current?.querySelector(
            ".liquid",
          ) as HTMLElement;
          if (liquidEl) {
            const ty = 100 - visual;
            liquidEl.style.transform = `translateY(${ty}%)`;
          }
        });
      },
    );

    return () => scopeRef.current?.revert();
  }, [MASK_RANGE]);

  useEffect(() => {
    if (!scopeRef.current) return;

    if (!isControlled) {
      const liquidEl = rootRef.current?.querySelector(".liquid") as HTMLElement;
      if (liquidEl) liquidEl.style.transform = "translateY(100%)";
      const pctEl = rootRef.current?.querySelector(".pct");
      if (pctEl) pctEl.textContent = "0%";
      completedRef.current = false;
      scopeRef.current.methods.play();
    } else if (progress !== undefined) {
      scopeRef.current.methods.seek(progress);
      if (progress === 100 && !completedRef.current) {
        completedRef.current = true;
        setTimeout(() => onComplete?.(), 600);
      }
    }
  }, [isControlled, progress, onComplete]);

  if (hide) return null;

  // Bolhas (podem ser geradas dinamicamente)
  const bubbles = [
    { w: 8, l: "15%", b: "10%", dur: "2.5s", del: "0.0s" },
    { w: 6, l: "80%", b: "20%", dur: "2.0s", del: "0.3s" },
    { w: 7, l: "30%", b: "30%", dur: "2.2s", del: "0.1s" },
    { w: 5, l: "55%", b: "40%", dur: "1.8s", del: "0.6s" },
    { w: 9, l: "10%", b: "50%", dur: "2.7s", del: "0.2s" },
    { w: 4, l: "45%", b: "60%", dur: "2.3s", del: "0.9s" },
    { w: 6, l: "65%", b: "70%", dur: "1.9s", del: "0.4s" },
    { w: 5, l: "25%", b: "80%", dur: "2.1s", del: "0.7s" },
    { w: 7, l: "75%", b: "90%", dur: "2.4s", del: "0.5s" },
    { w: 4, l: "35%", b: "15%", dur: "1.6s", del: "0.8s" },
    { w: 6, l: "50%", b: "25%", dur: "2.0s", del: "1.0s" },
    { w: 8, l: "70%", b: "35%", dur: "2.6s", del: "1.1s" },
    { w: 5, l: "20%", b: "45%", dur: "1.7s", del: "1.2s" },
    { w: 7, l: "85%", b: "55%", dur: "2.3s", del: "1.3s" },
    { w: 4, l: "40%", b: "65%", dur: "1.5s", del: "1.4s" },
    { w: 6, l: "60%", b: "75%", dur: "2.2s", del: "1.5s" },
    { w: 5, l: "15%", b: "85%", dur: "1.9s", del: "1.6s" },
    { w: 8, l: "90%", b: "95%", dur: "2.8s", del: "1.7s" },
    { w: 4, l: "48%", b: "12%", dur: "1.4s", del: "1.8s" },
    { w: 6, l: "33%", b: "72%", dur: "2.1s", del: "1.9s" },
    { w: 7, l: "22%", b: "18%", dur: "2.0s", del: "2.0s" },
    { w: 5, l: "68%", b: "28%", dur: "1.6s", del: "2.1s" },
    { w: 8, l: "42%", b: "38%", dur: "2.4s", del: "2.2s" },
    { w: 4, l: "53%", b: "48%", dur: "1.8s", del: "2.3s" },
    { w: 6, l: "78%", b: "58%", dur: "2.2s", del: "2.4s" },
    { w: 5, l: "12%", b: "68%", dur: "1.7s", del: "2.5s" },
    { w: 7, l: "62%", b: "78%", dur: "2.5s", del: "2.6s" },
    { w: 4, l: "28%", b: "88%", dur: "1.5s", del: "2.7s" },
    { w: 6, l: "48%", b: "98%", dur: "2.0s", del: "2.8s" },
  ];

  return (
    <div ref={rootRef} className="ls-root">
      <div className="ls-glow" />
      <div className="ls-mask">
        <div className="ls-acrylic" />
        <div className="liquid ls-liquid">
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
          {bubbles.map((b, i) => (
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
        <div className="ls-reflection" />
      </div>
      <div className="ls-label">{label}</div>
      <div className="pct ls-pct">0%</div>

      <style>{`
        @keyframes wave1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.85; }
          100% { transform: translateY(-70px) scale(0.2); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeout {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes labelPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
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
          animation: ${hide ? "fadeout 0.5s ease forwards" : "fadein 0.15s ease forwards"};
          pointer-events: ${hide ? "none" : "all"};
        }

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
          animation: glow 2.4s ease-in-out infinite;
          pointer-events: none;
        }

        .ls-mask {
          position: relative;
          width: clamp(140px, 20vw, 520px);
          height: clamp(178px, 25vw, 660px);
          -webkit-mask-image: url('./assets/img/logo/logo_v_fundo_transparente.png');
          mask-image: url('/assets/img/logo/logo_v_fundo_transparente.png');
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          margin-left: -10px;
          margin-bottom: clamp(-40px, -4vw, -20px);
          overflow: hidden;
          contain: paint;
          will-change: mask;
        }

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

        .ls-liquid {
          position: absolute;
          filter: blur(0.2px);
          box-shadow: 0 0 0.5px rgba(255,255,255,0.5);
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            180deg,
            #00ffdd 0%,
            #00ff88 30%,
            #00dd66 60%,
            #009944 100%
          );
          transform: translateY(100%);
        transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
          will-change: transform;
        }

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

        .ls-wave-wrap {
          position: absolute;
          top: -10px;
          left: 0;
          width: 100%;
          height: 20px;
          overflow: hidden;
        }

        .ls-wave {
          position: absolute;
          top: 0;
          width: 200%;
          height: 100%;
        }

        .ls-wave1 {
          animation: wave1 1.3s linear infinite;
        }

        .ls-wave2 {
          animation: wave2 1.9s linear infinite;
          opacity: 0.55;
        }

        .ls-bubble {
          position: absolute;
          border-radius: 50%;
         background: radial-gradient(
          circle at 35% 30%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(0, 255, 136, 0.3) 100%
            );
          animation: bubble linear infinite;
          will-change: transform, opacity;
        }

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

        .ls-label {
          width: clamp(140px, 20vw, 520px);
          text-align: center;
          font-size: clamp(9px, 1.1vw, 20px);
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          animation: labelPulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

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

        /* Breakpoints */
        @media (max-width: 380px) {
          .ls-mask { width: 130px; height: 165px; }
          .ls-glow { width: 180px; height: 220px; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .ls-mask { width: 220px; height: 280px; }
          .ls-glow { width: 300px; height: 370px; }
        }
        @media (min-width: 1024px) and (max-width: 1920px) {
          .ls-mask { width: 240px; height: 305px; }
          .ls-glow { width: 340px; height: 420px; }
        }
        @media (min-width: 1920px) and (max-width: 2560px) {
          .ls-mask { width: 320px; height: 408px; }
          .ls-glow { width: 460px; height: 560px; }
        }
        @media (min-width: 2560px) {
          .ls-mask { width: 520px; height: 662px; }
          .ls-glow { width: 700px; height: 860px; }
          .ls-label { font-size: 22px; letter-spacing: 4px; width: 520px; }
          .ls-pct { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}
