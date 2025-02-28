import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 mt-10">
          <Hero />
          <HowItWorks />
          <CTA />
    </main>
  );
}
