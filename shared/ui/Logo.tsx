import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="relative w-[100] sm:w-[120] md:w-[140] lg:w-[160] xl:w-[180] 2xl:w-[200] 4k:w-[240] h-auto aspect-50/20">
      <Image
        src="/assets/img/logo/logo_header_sem_fundo_menor.png"
        alt="logo-image"
        fill
        sizes="(max-width: 640) 100, (max-width: 768px) 120px, (max-width: 1024px) 140px, (max-width: 1280px) 160px, (max-width: 1536px) 180px, (max-width: 2560px) 200px, 240px"
        className="object-contain"
        priority // opcional, se for uma imagem importante
        quality={85}
      />
    </div>
  );
};

export default Logo;
