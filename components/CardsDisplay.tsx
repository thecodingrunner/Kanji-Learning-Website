"use client";

import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CardsDisplay = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Don't run effect while session is loading
    if (!session?.user?.id) {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <section
      className="w-[80vw] p-2 mx-auto border-2 border-blue-500 rounded-lg mt-20"
    >
      <SearchBar />
      <Cards />
    </section>
  );
};

export default CardsDisplay;
