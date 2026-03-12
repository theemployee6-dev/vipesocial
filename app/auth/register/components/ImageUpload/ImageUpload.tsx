// // components/ImageUpload.tsx
// import { useState } from "react";
// import Image from "next/image";
// import { UploadIcon } from "@phosphor-icons/react";
// import { labelClass } from "../../styles/formClasses";

// interface ImageUploadProps {
//   label?: string;
//   hint?: string;
//   onChange?: (file: File) => void;
// }

// export default function ImageUpload({
//   label = "Foto de perfil (opcional)",
//   hint = "PNG, JPG ou WEBP · Máx. 5MB",
//   onChange,
// }: ImageUploadProps) {
//   const [preview, setPreview] = useState<string | null>(null);

//   function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setPreview(URL.createObjectURL(file));
//     onChange?.(file);
//   }

//   return (
//     <div className="flex flex-col space-y-1">
//       <label className={labelClass}>{label}</label>
//       <div className="flex items-center gap-4">
//         <label className="relative cursor-pointer group">
//           <div
//             className={`w-16 h-16 rounded-2xl border-2 border-dashed border-slate-700 group-hover:border-emerald-400/40 transition-colors flex items-center justify-center overflow-hidden ${
//               preview ? "border-solid border-emerald-400/40" : ""
//             }`}
//           >
//             {preview ? (
//               <Image
//                 src={preview}
//                 alt="preview"
//                 width={64}
//                 height={64}
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             ) : (
//               <UploadIcon size={18} color="currentColor" weight="regular" />
//             )}
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImage}
//             className="sr-only"
//           />
//         </label>
//         <div>
//           <p className="text-slate-400 text-xs">
//             Clique para enviar uma imagem
//           </p>
//           <p className="text-slate-500 text-[10px] mt-0.5">{hint}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/ImageUpload.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { UploadIcon } from "@phosphor-icons/react";
import { labelClass } from "../../styles/formClasses";

interface ImageUploadProps {
  label?: string;
  hint?: string;
  onChange?: (file: File | null) => void; // permite passar null para limpar
  error?: string;
}

export default function ImageUpload({
  label = "Foto de perfil (opcional)",
  hint = "PNG, JPG ou WEBP · Máx. 5MB",
  onChange,
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      // Se o usuário cancelar, não faz nada
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    const newPreview = URL.createObjectURL(file);
    setPreview(newPreview);
    onChange?.(file);
  }

  // Opcional: permitir remover a imagem
  function handleRemove() {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    onChange?.(null);
  }

  return (
    <div className="flex flex-col space-y-1">
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-4">
        <div className="relative">
          <label className="cursor-pointer group">
            <div
              className={`w-16 h-16 rounded-2xl border-2 border-dashed border-slate-700 group-hover:border-emerald-400/40 transition-colors flex items-center justify-center overflow-hidden ${
                preview ? "border-solid border-emerald-400/40" : ""
              } ${error ? "border-red-500" : ""}`}
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
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImage}
              className="sr-only"
            />
          </label>
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          )}
        </div>
        <div>
          <p className="text-slate-400 text-xs">
            Clique para enviar uma imagem
          </p>
          <p className="text-slate-500 text-[10px] mt-0.5">{hint}</p>
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
