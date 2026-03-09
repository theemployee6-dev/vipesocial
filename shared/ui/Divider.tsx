// shared/ui/Divider.tsx
export const Divider = ({ text, delay }: { text: string; delay?: number }) => (
  <div
    className={`flex items-center gap-3 pt-2 fade-up ${delay ? `delay-${delay}` : ""}`}
  >
    <div className="flex-1 h-px bg-slate-700" />
    <span className="text-slate-500 text-[10px] tracking-widest uppercase">
      {text}
    </span>
    <div className="flex-1 h-px bg-slate-700" />
  </div>
);
