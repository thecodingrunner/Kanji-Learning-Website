import CardsDisplay from "@/components/CardsDisplay";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 mt-10">
          <Hero />
          <CardsDisplay />
    </main>
  );
}
