// components/TermsCheckbox/TermsCheckbox.tsx
import { CheckIcon } from "@phosphor-icons/react";

interface TermsCheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  companyName?: string;
}

export default function TermsCheckbox({
  value,
  onChange,
  companyName = "VipeSocial",
}: TermsCheckboxProps) {
  return (
    <>
      <div
        className="relative mt-0.5 shrink-0"
        onClick={() => onChange(!value)}
      >
        <div
          className={`w-5 h-5 rounded-md border transition-all ${
            value
              ? "bg-emerald-400 border-emerald-400"
              : "bg-[#1e293b] border-slate-700 group-hover:border-slate-500"
          }`}
        >
          {value && (
            <CheckIcon
              weight="bold"
              color="#020617"
              className="w-full h-full p-0.5"
            />
          )}
        </div>
      </div>
      <span className="text-slate-400 text-sm leading-relaxed">
        Aceito os{" "}
        <span className="text-emerald-400 hover:underline cursor-pointer">
          termos de uso
        </span>{" "}
        e{" "}
        <span className="text-emerald-400 hover:underline cursor-pointer">
          política de privacidade
        </span>{" "}
        da {companyName}.
      </span>
    </>
  );
}
