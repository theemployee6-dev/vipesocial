"use client";
import { useEffect, useRef, ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  delay?: number; // em ms
  threshold?: number;
}

export const Reveal = ({
  children,
  delay = 0,
  threshold = 0.1,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(styles.visible);
          }, delay);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={styles.reveal}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
