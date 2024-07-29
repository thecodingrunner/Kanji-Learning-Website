import CardsDisplay from "@/components/CardsDisplay";
import Navbar from "@/components/Navbar";
import SidebarLeft from "@/components/SidebarLeft";

export default function Home() {
  return (
    <main className="flex gap-4">
        {/* <SidebarLeft /> */}
        <CardsDisplay />
    </main>
  );
}
