import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

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
    <html lang="en">
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
