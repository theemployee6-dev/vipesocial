// components/SubmitButton/SubmitButton.tsx
import { CircleNotchIcon, ArrowRightIcon } from "@phosphor-icons/react";

type ButtonSize = "sm" | "md" | "lg" | "full";

interface SubmitButtonProps {
  title: string;
  loadingTitle?: string;
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  gradient?: [string, string]; // [from, to]
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "w-full sm:w-[50%] lg:w-[40%]",
  md: "w-full sm:w-[70%] lg:w-[50%] xl:w-[45%]",
  lg: "w-full sm:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[45%]",
  full: "w-full",
};

export default function SubmitButton({
  title,
  loadingTitle = "Carregando...",
  loading = false,
  disabled = false,
  size = "sm",
  gradient = ["#10b981", "#059669"],
}: SubmitButtonProps) {
  return (
    <>
      <button
        type="submit"
        disabled={disabled || loading}
        className={`
          relative ${sizeClasses[size]}
          py-3 sm:py-2.5 lg:py-2.5 xl:py-2.5 2xl:py-4.5 4k:py-6.5
          rounded-xl font-bold
          text-sm sm:text-base lg:text-base xl:text-lg
          text-[#020617] overflow-hidden group
          transition-all duration-300 disabled:opacity-70 mt-2
        `}
        style={{
          background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        }}
      >
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <CircleNotchIcon size={16} className="animate-spin" weight="bold" />
            {loadingTitle}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2 tracking-wide">
            {title}
            <ArrowRightIcon size={14} weight="bold" color="currentColor" />
          </span>
        )}
      </button>
    </>
  );
}
