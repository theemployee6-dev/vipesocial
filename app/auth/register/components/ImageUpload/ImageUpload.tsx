// components/ImageUpload.tsx
import { useState } from "react";
import Image from "next/image";
import { UploadIcon } from "@phosphor-icons/react";
import { labelClass } from "../../styles/formClasses";

interface ImageUploadProps {
  label?: string;
  hint?: string;
  onChange?: (file: File) => void;
}

export default function ImageUpload({
  label = "Foto de perfil (opcional)",
  hint = "PNG, JPG ou WEBP · Máx. 5MB",
  onChange,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  }

  return (
    <div className="flex flex-col space-y-1">
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-4">
        <label className="relative cursor-pointer group">
          <div
            className={`w-16 h-16 rounded-2xl border-2 border-dashed border-slate-700 group-hover:border-emerald-400/40 transition-colors flex items-center justify-center overflow-hidden ${
              preview ? "border-solid border-emerald-400/40" : ""
            }`}
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <UploadIcon size={18} color="currentColor" weight="regular" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="sr-only"
          />
        </label>
        <div>
          <p className="text-slate-400 text-xs">
            Clique para enviar uma imagem
          </p>
          <p className="text-slate-500 text-[10px] mt-0.5">{hint}</p>
        </div>
      </div>
    </div>
  );
}
