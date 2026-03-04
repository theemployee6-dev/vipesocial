import { useState, useRef } from "react";
import { tooltipTerms } from "./constants/tooltipTerms";
import { colors } from "./constants/colors.ResultadoAnalise";

// ─── Tooltip ─────────────────────────────────────────────────────────────────
interface TooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ term, children, className = "" }: TooltipProps) {
  const text = tooltipTerms[term];
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  if (!text) return <span className={className}>{children}</span>;

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`group relative inline-flex items-center gap-1 cursor-help ${className}`}
    >
      {children}
      <span
        className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-bold shrink-0"
        style={{
          background: "rgba(0,255,136,0.12)",
          color: colors.primary[500],
          border: `1px solid rgba(0,255,136,0.3)`,
        }}
      >
        ?
      </span>
      <span
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100
          transition-all duration-200 ease-out
          w-56 rounded-xl p-3 pointer-events-none"
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          transform: "translateX(-50%) translateY(-100%)",
          zIndex: 9999,
          background: colors.background.tooltip,
          border: `1px solid ${colors.border.glow}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <span
          className="block text-[10px] font-bold mb-1.5"
          style={{ color: colors.primary[500] }}
        >
          {term}
        </span>
        <span className="text-[11px] text-white/60 leading-relaxed">
          {text}
        </span>
        <span
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
          style={{
            background: colors.background.tooltip,
            borderRight: `1px solid ${colors.border.glow}`,
            borderBottom: `1px solid ${colors.border.glow}`,
          }}
        />
      </span>
    </span>
  );
}

// ─── IntensityBar ─────────────────────────────────────────────────────────────
export function IntensityBar({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 items-center flex-1">
      {Array.from({ length: 10 }).map((_, i) => {
        const filled = i < value;
        const colorIdx = Math.min(
          Math.floor((i / 10) * colors.intensityBar.length),
          colors.intensityBar.length - 1,
        );
        return (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-sm transition-all"
            style={{
              background: filled
                ? colors.intensityBar[colorIdx]
                : colors.background.unfilledBar,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── CircularScore ─────────────────────────────────────────────────────────────
export function CircularScore({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="128" height="128">
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={colors.background.circleTrack}
          strokeWidth="8"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary[700]} />
            <stop offset="100%" stopColor={colors.primary[500]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center z-10">
        <div className="text-4xl font-black text-white leading-none">
          {score}
        </div>
        <div className="text-xs text-white/40 mt-1">de 100</div>
      </div>
    </div>
  );
}

// ─── HexBadge ─────────────────────────────────────────────────────────────────
export function HexBadge({
  value,
  label,
  color = colors.primary[500],
  size = 72,
}: {
  value: string | number;
  label?: string;
  color?: string;
  size?: number;
}) {
  const h = size * 1.155;
  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: h }}
    >
      <svg
        viewBox="0 0 100 115"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          filter: `drop-shadow(0 0 6px ${color}55)`,
        }}
      >
        <polygon
          points="50,2 98,26 98,89 50,113 2,89 2,26"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
      <div className="relative text-center">
        <div
          className="font-black leading-none"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: size * 0.3,
            color,
          }}
        >
          {value}
        </div>
        {label && (
          <div
            className="text-white/30 uppercase tracking-wider mt-0.5"
            style={{ fontSize: 8 }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Accordion ─────────────────────────────────────────────────────────────────
interface AccordionProps {
  title: React.ReactNode;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

export function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
  accentColor,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const accent = accentColor ?? colors.primary[500];
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${open ? `${accent}33` : colors.border.default}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 transition-colors text-left"
        style={{
          background: open ? `${accent}08` : colors.background.accordionClosed,
        }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: accent, fontSize: 14 }}>{icon}</span>
          <span className="text-sm font-semibold text-white/85">{title}</span>
        </div>
        <span
          className="text-white/25 text-xs transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div
          className="p-4 border-t"
          style={{
            background: colors.background.accordionContent,
            borderColor: colors.border.lighter,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── InfoRow ─────────────────────────────────────────────────────────────────
export function InfoRow({
  label,
  value,
  accent,
}: {
  label: React.ReactNode;
  value: string | undefined;
  accent?: string;
}) {
  return (
    <div
      className="rounded-lg p-3"
      style={{
        background: colors.background.card,
        border: `1px solid ${colors.border.lighter}`,
      }}
    >
      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: accent ?? "rgba(255,255,255,0.8)" }}
      >
        {value ?? "—"}
      </p>
    </div>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
export function Tag({
  children,
  color = colors.primary[500],
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold"
      style={{
        background: `${color}15`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {children}
    </span>
  );
}
