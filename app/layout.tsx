import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Provider from "@/components/Provider";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Kanjify",
  description: "Create AI generated Kanji Flashcards",
};

const Provider = dynamic(() => import("@/components/Provider"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className='app bg-transparent'>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
