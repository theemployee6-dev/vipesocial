import GlowBackground from "@/shared/ui/GlowBackground";
import Header from "../register/components/Header/Header";
import SectionDivider from "../register/components/ui/SectionDivider";
import NeonAccentLine from "../register/components/ui/TopAccentLine";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-screen h-screen bg-[#020617] p-5 sm:px-[12%] md:px-[25%] lg:px-[30%] xl:px-[30%] 2xl:px-[30%] 4k:px-[20%] overflow-x-hidden">
      <GlowBackground />
      <div className="w-full h-auto">
        {/* Linha neon superior */}
        <section className="pt-1 pb-3 sm:pt-1 sm:pb-3 md:pt-1 md:pb-3 lg:pt-1 lg:pb-3 xl:pt-1 xl:pb-3 2xl:pt-3 2xl:pb-4 4k:pt-3 4k:pb-4">
          <NeonAccentLine />
        </section>

        {/* Header */}
        <section className="fade-up delay-1">
          <Header
            firstSmallTitle="Seja Bem-vindo(a)"
            secondBigTitleWhite="Comece a "
            secondBigTitleGreen="Viralizar"
            subTitle="Faça o seu Login."
          />
        </section>

        {/* Divisor: Entrar */}
        <section className="pt-0 sm:pt-1 md:pt-2 lg:pt-2 xl:pt-0 2xl:pt-6 4k:pt-7">
          <SectionDivider title="Entrar" />
        </section>

        {children}

        {/* Linha neon inferior */}
        <section className="pt-[40] pb-5 sm:pb-6 md:pb-7 lg:pb-[6%] xl:pb-9 2xl:pb-10 4k:pb-12">
          <NeonAccentLine />
        </section>
      </div>
    </main>
  );
};

export default Layout;
