import CTA from "@/components/CTA";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
          <Hero />
          <FeaturesSection />
          <HowItWorks />
          <CTA />
    </main>
  );
}
