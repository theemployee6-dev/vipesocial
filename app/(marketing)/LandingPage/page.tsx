import Layout from "./layout";
import HeroSection from "./components/Hero/HeroSection";
import CtaSection from "./components/Cta/CtaSection";
import FeaturesSection from "./components/Features/FeaturesSection";
import HowItWorksSection from "./components/HowItWorks/HowItWorksSection";
import ResultsSection from "./components/Results/ResultsSection";

const LandingPage = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ResultsSection />
      <CtaSection />
    </Layout>
  );
};

export default LandingPage;
