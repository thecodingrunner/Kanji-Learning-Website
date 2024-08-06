"use client";

import React from "react";
import SearchBar from "./SearchBar";
import Cards from "./Cards";

const CardsDisplay = () => {

  return (
    <section
      className="w-[80vw] my-10 p-2 mx-auto border-2 border-blue-500 rounded-lg"
    >
      <SearchBar />
      <Cards />
    </section>
  );
};

export default CardsDisplay;
