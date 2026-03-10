"use client";
import Logo from "@/shared/ui/Logo";

const Footer = () => {
  return (
    <footer
      className="
        border-t border-(--border)
        py-6 px-5
        flex flex-col items-center justify-center gap-3
        bg-(--bg) text-center
        md:flex-row md:justify-between md:py-8 md:px-10 md:text-left
        4k:py-10 4k:px-15
      "
    >
      <a href="#" className="flex items-center gap-2 no-underline text-white">
        <div className="w-[140] sm:w-[160] md:w-[180] lg:w-[200] xl:w-[220] 2xl:w-[240] 4k:w-[280] h-auto">
          <Logo />
        </div>
      </a>
      <p
        className="
          text-[11px] text-(--text-dim)
          md:text-xs
          4k:text-sm
        "
      >
        © 2026 VipeSocial. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
