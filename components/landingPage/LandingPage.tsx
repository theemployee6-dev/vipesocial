"use client";

import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import HowItWorksSection from "./components/HowItWorks/HowItWorksSection";
import FeaturesSection from "./components/Features/FeaturesSection";
import ResultsSection from "./components/Results/ResultsSection";
import CtaSection from "./components/Cta/CtaSection";
import Footer from "./components/Footer/Footer";
import styles from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ResultsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
