// components/AccountTypePicker/AccountTypePicker.tsx
import { CheckIcon } from "@phosphor-icons/react";
import { accountTypeStringAndIcons } from "../../utils/accountTypeStringAndIcons";

interface AccountTypePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountTypePicker({
  value,
  onChange,
}: AccountTypePickerProps) {
  return (
    <>
      {accountTypeStringAndIcons.map(({ value: type, label, desc, Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
            value === type
              ? "border-emerald-400 bg-emerald-400/5 shadow-sm shadow-emerald-400/10"
              : "border-slate-700 bg-[#1e293b] hover:border-slate-500"
          }`}
        >
          <Icon
            size={18}
            className={`mb-2 ${value === type ? "text-emerald-400" : "text-slate-500"}`}
            weight="regular"
          />
          <p
            className={`text-sm font-semibold ${value === type ? "text-emerald-400" : "text-white"}`}
          >
            {label}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
          {value === type && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
              <CheckIcon size={8} color="#020617" weight="bold" />
            </div>
          )}
        </button>
      ))}
    </>
  );
}
