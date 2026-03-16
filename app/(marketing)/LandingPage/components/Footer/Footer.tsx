"use client";
import Logo from "@/shared/ui/Logo";
import Link from "next/link";

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
      <Link
        href="/"
        className="flex items-center gap-2 no-underline text-white"
      >
        <div className="w-[140] sm:w-[140] md:w-[150] lg:w-[150] xl:w-[150] 2xl:w-[120] 4k:w-[200] h-auto">
          <Logo />
        </div>
      </Link>
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
