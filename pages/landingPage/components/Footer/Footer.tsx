"use client";
import Logo from "@/shared/ui/Logo";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.logo}>
        <Logo />
      </a>
      <p className={styles.note}>
        © 2026 VipeSocial. Todos os direitos reservados.
      </p>
    </footer>
  );
};
