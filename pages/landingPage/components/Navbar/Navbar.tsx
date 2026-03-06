"use client";
import { useEffect, useRef } from "react";
import Logo from "@/shared/ui/Logo"; // ajuste o caminho conforme seu projeto
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle(styles.scrolled, window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className={styles.nav}>
      <a href="#" className={styles.logo}>
        <Logo />
      </a>
      <button className={styles.btnNav}>Começar grátis</button>
    </nav>
  );
};
