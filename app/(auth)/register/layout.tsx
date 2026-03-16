import GlowBackground from "@/shared/ui/GlowBackground";
import React from "react";
import Header from "./components/Header/Header";
import SectionDivider from "./components/ui/SectionDivider";
import NeonAccentLine from "./components/ui/TopAccentLine";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-screen h-screen bg-[#020617] p-5 sm:px-[5%] md:px-[10%] lg:px-[15%] xl:px-[18%] 2xl:px-[22%] 4k:px-[25%] overflow-x-hidden">
      <GlowBackground />
      <div className="w-full h-auto">
        {/* Linha neon superior */}
        <section className="pt-3 pb-3 sm:pt-4 sm:pb-4 md:pt-5 md:pb-5 lg:pt-6 lg:pb-6 xl:pt-7 xl:pb-7 2xl:pt-8 2xl:pb-8 4k:pt-10 4k:pb-10">
          <NeonAccentLine />
        </section>

        {/* Header */}
        <section className="fade-up delay-1">
          <Header
            firstSmallTitle="Nova Conta"
            secondBigTitleWhite="Comece a "
            secondBigTitleGreen="Viralizar"
            subTitle="Preencha dos dados abaixo para criar sua conta."
          />
        </section>

        {/* Divisor: Informações pessoais */}
        <section className="pt-0 sm:pt-1 md:pt-2 lg:pt-2 xl:pt-0 2xl:pt-6 4k:pt-7">
          <SectionDivider title="Informações pessoais" />
        </section>

        {children}

        {/* Linha neon inferior */}
        <section className="pt-5 pb-5 sm:pt-6 sm:pb-6 md:pt-7 md:pb-7 lg:pt-8 lg:pb-8 xl:pt-9 xl:pb-9 2xl:pt-10 2xl:pb-10 4k:pt-12 4k:pb-12">
          <NeonAccentLine />
        </section>
      </div>
    </main>
  );
};

export default Layout;
