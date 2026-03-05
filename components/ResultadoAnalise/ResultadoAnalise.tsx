import type { VipeFullOutput } from "@/lib/core/domain/vipe.types";
import { colors } from "./constants/colors.ResultadoAnalise";
import { useResultadoAnalise } from "./hooks/useResultadoAnalise";
import PorQueViralizou from "../ResultadoAnalise/ui/PorQueViralizou";
import OQueGravar from "../ResultadoAnalise/ui/OQueGravar";
import Calendario from "../ResultadoAnalise/ui/Calendario";

// ─── Props ─────────────────────────────────────────────────────────────────────
interface ResultadoAnaliseProps {
  resultado: VipeFullOutput;
  onVoltar?: () => void;
}

// ─── Pages config ──────────────────────────────────────────────────────────────
const PAGES = [
  { id: "viralizou" as const, label: "Por que Viralizou?", icon: "🔥" },
  { id: "gravar" as const, label: "O que Gravar?", icon: "💡" },
  { id: "quando" as const, label: "Calendário", icon: "📅" },
] as const;

// type PageId = (typeof PAGES)[number]["id"];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ResultadoAnalise({
  resultado,
  onVoltar,
}: ResultadoAnaliseProps) {
  const {
    activePage,
    setActivePage,
    notaTecnica,
    probViral,
    conceitosComRoteiro,
    p3,
    openAccordions,
    toggleAccordion,
    accordionTabs,
    setAccordionTab,
    getDiasPostagem,
  } = useResultadoAnalise(resultado);

  return (
    <div
      className="min-h-screen text-white select-none"
      style={{
        background: `radial-gradient(ellipse at 10% 0%, #0a1f10 0%, ${colors.background.primary} 55%)`,
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── TOPBAR ── */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b sticky top-0 z-20"
        style={{
          background: `rgba(5,8,15,0.88)`,
          backdropFilter: "blur(16px)",
          borderColor: colors.border.default,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm shrink-0"
            style={{ background: colors.gradient.logo }}
          >
            V
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight">
            <span style={{ color: colors.primary[500] }}>Vipe</span>
            <span className="text-white">Social</span>
          </span>
        </div>

        <div className="flex item-center justify-center">
          <span className="text-sm sm:text-lg font-bold tracking-tight">
            Resultado da Análise
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <div className="flex item-center gap-3">
            {onVoltar && (
              <button
                onClick={onVoltar}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                style={{
                  background: colors.button.novaAnaliseBg,
                  border: `1px solid ${colors.button.novaAnaliseBorder}`,
                  color: colors.button.novaAnaliseText,
                }}
              >
                ← Nova análise
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Page tabs */}
      <div
        className="flex rounded-xl p-1 justify-center gap-1 overflow-x-auto"
        style={{
          background: colors.background.card,
          border: `1px solid ${colors.border.default}`,
        }}
      >
        {PAGES.map((page) => {
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all"
              style={
                isActive
                  ? {
                      background: colors.button.tabActive,
                      color: colors.primary[500],
                      border: `1px solid rgba(0,255,136,0.3)`,
                      boxShadow: `0 2px 12px ${colors.button.tabShadow}`,
                    }
                  : {
                      color: colors.button.tabInactive,
                      border: "1px solid transparent",
                      background: "transparent",
                    }
              }
            >
              <span>{page.icon}</span>
              <span className="hidden sm:inline">{page.label}</span>
              <span className="sm:hidden">
                {page.label.split(" ").slice(-1)[0]}
              </span>
            </button>
          );
        })}
      </div>
      {/* ── PAGE HEADER ── */}
      <div className="px-4 sm:px-6 pt-5 pb-0 max-w-5xl 4k:max-w-screen-2xl mx-auto">
        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">
          Análise Completa · {resultado.nicho_confirmado}
        </p>
        {/* <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {resultado.prompt4.roteiros[0]?.cabecalho?.titulo
            ? `"${resultado.prompt4.roteiros[0].cabecalho.titulo}"`
            : "Resultado da Análise"}
        </h1> */}
      </div>

      {/* ── CONTENT ── */}
      <div className="px-4 sm:px-6 py-5 max-w-5xl 4k:max-w-screen-2xl mx-auto">
        {activePage === "viralizou" && (
          <PorQueViralizou
            resultado={resultado}
            notaTecnica={notaTecnica}
            probViral={probViral}
          />
        )}
        {activePage === "gravar" && (
          <OQueGravar
            conceitosComRoteiro={conceitosComRoteiro}
            p3={p3}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
            accordionTabs={accordionTabs}
            setAccordionTab={setAccordionTab}
          />
        )}
        {activePage === "quando" && (
          <Calendario
            conceitosComRoteiro={conceitosComRoteiro}
            getDiasPostagem={getDiasPostagem}
          />
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  );
}
