"use client";
import { useEffect, useState } from "react";
import Logo from "@/shared/ui/Logo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-100
        flex items-center justify-between
        px-5 h-14
        transition-all duration-300
        ${scrolled ? "bg-[rgba(4,7,14,0.88)] backdrop-blur-xl border-b border-(--border)" : ""}
        md:px-10 md:h-16
        4k:px-15 4k:h-20
      `}
    >
      <a href="#" className="flex items-center gap-2 text-white no-underline">
        {/* Wrapper responsivo para o logo */}
        <div className="w-[140] sm:w-[160] md:w-[180] lg:w-[200] xl:w-[220] 2xl:w-[240] 4k:w-[280] h-auto">
          <Logo />
        </div>
      </a>

      <button
        className="
          bg-(--green) text-[#04070e] border-none
          px-4 py-2 rounded-full font-bold text-xs
          cursor-pointer transition-all duration-200
          tracking-wide whitespace-nowrap
          hover:bg-[#00ffaa] hover:-translate-y-0.5
          md:px-5 md:py-2.5 md:text-sm
          4k:px-8 4k:py-3.5 4k:text-base
        "
      >
        Começar grátis
      </button>
    </nav>
  );
};

export default Navbar;
