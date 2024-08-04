import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanjify",
  description: "Create AI generated Kanji Flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen overflow-x-hidden">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className='app'>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
