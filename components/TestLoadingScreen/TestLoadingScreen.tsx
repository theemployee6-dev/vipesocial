"use client";

import LoadingScreen from "@/shared/ui/LoadingScreen";
import { useState, useEffect } from "react";

const TestLoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  // Simula progresso de upload
  useEffect(() => {
    const startTime = performance.now();
    const duration = 30000; // 10 segundos
    let rafId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1) * 100;
      setProgress(p);
      if (p < 100) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <LoadingScreen
      progress={progress}
      label="Enviando arquivo..."
      onComplete={() => alert("Upload concluído!")}
    />
  );
};

export default TestLoadingScreen;
