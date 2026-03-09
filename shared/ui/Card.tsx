// shared/ui/Card.tsx
export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-emerald-400/20 shadow-2xl">
    <div className="h-[2] w-full bg-linear-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
    <div className="px-8 pt-8 pb-10">{children}</div>
  </div>
);
