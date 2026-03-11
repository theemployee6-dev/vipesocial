// components/Field.tsx
import { UseFormRegisterReturn } from "react-hook-form";
import { EyeIcon, EyeSlashIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { inputClass, labelClass, selectClass } from "../../styles/formClasses";

interface FieldProps {
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "date"
    | "select"
    | "tel"
    | "number"
    | "textarea";
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  options?: { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function FieldInput({
  label,
  type = "text",
  placeholder,
  registration,
  error,
  icon,
  iconPosition = "left",
  options,
  ...rest
}: FieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [dateHasValue, setDateHasValue] = useState<boolean>(false);
  const [dateIsFocused, setDateIsFocused] = useState<boolean>(false);

  const isSelect = type === "select";
  const isPassword = type === "password";
  const isDate = type === "date";
  const isTextArea = type === "textarea";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  // ─── Padding em um único bloco, sem conflitos ───────────────────
  const leftPad =
    icon && iconPosition === "left" && !isSelect
      ? "pl-10 sm:pl-11 2xl:pl-12"
      : "pl-3 sm:pl-4 2xl:pl-5";

  const rightPad = (() => {
    if (isPassword) return "pr-12";
    if (isSelect) return "pr-10";
    if (icon && iconPosition === "right") return "pr-10 sm:pr-11 2xl:pr-12";
    if (isDate) return "pr-4";
    return "pr-3 sm:pr-4 2xl:pr-5";
  })();

  // ─── Classe final ─────────────────────────────────────────────────────────
  let fieldClass = isSelect ? selectClass : inputClass;
  fieldClass += ` ${leftPad} ${rightPad}`;

  if (error) {
    fieldClass += " border-red-500 focus:border-red-500 focus:ring-red-500/20";
  }

  if (isDate) {
    fieldClass += " appearance-none";
  }

  return (
    <div className="flex flex-col space-y-1">
      <label className={`${labelClass} truncate`}>{label}</label>

      <div className="relative">
        {/* Ícone esquerdo */}
        {icon && iconPosition === "left" && !isSelect && (
          <div className="absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 2xl:[&>svg]:w-6 2xl:[&>svg]:h-6">
            {icon}
          </div>
        )}

        {/* Campo */}
        {isSelect ? (
          <select className={fieldClass} {...registration} {...rest}>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : isDate ? (
          <>
            <input
              type="date"
              className={fieldClass}
              style={{
                color:
                  rest.value || rest.defaultValue ? undefined : "transparent",
              }}
              onFocus={(e) => {
                setDateIsFocused(true);
                e.target.style.color = "white";
              }}
              onBlur={(e) => {
                setDateIsFocused(false);
                if (!e.target.value) e.target.style.color = "transparent";
              }}
              onChange={(e) => {
                setDateHasValue(!!e.target.value);
                registration?.onChange?.(e);
              }}
              {...registration}
              {...rest}
            />
            {!dateHasValue && !dateIsFocused && (
              <span className="absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-slate-500 text-sm 2xl:text-base pointer-events-none">
                {placeholder}
              </span>
            )}
          </>
        ) : isTextArea ? (
          <textarea
            placeholder={placeholder}
            className={`${fieldClass} h-24 resize-none leading-relaxed 2xl:h-32`}
            {...registration}
            {...rest}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            className={fieldClass}
            {...registration}
            {...rest}
          />
        )}

        {/* Ícone direito */}
        {icon && iconPosition === "right" && !isSelect && !isPassword && (
          <div className="absolute right-4 2xl:right-5 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 2xl:[&>svg]:w-6 2xl:[&>svg]:h-6">
            {icon}
          </div>
        )}

        {/* Caret do select */}
        {isSelect && (
          <div className="absolute right-4 2xl:right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <CaretDownIcon
              className="w-[18] h-[18] 2xl:w-5 2xl:h-5"
              weight="regular"
            />
          </div>
        )}

        {/* Botão olho */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 2xl:right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
            ) : (
              <EyeIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-sm 2xl:text-base text-red-400">{error}</p>}
    </div>
  );
}
