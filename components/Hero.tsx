import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 w-[80vw] mx-auto items-center justify-center rounded-lg hero-gradient pt-10 px-10 shadow-xl text-white">
      <h2 className="text-4xl md:text-6xl font-bold">
        Create AI Generated Kanji Flashcards
      </h2>
      <div className="w-full flex gap-0 md:gap-10 items-end justify-center mt-10">
        <div className="h-60 w-60 hidden sm:flex rounded-t-md overflow-hidden shadow-xl md:flex-2">
          <Image
            src="/images/fire-card.jpg"
            alt=""
            className="object-cover h-full object-center"
            width={500}
            height={500}
          />
        </div>
        <div className="h-80 w-80 rounded-md overflow-hidden shadow-2xl md:flex-3">
          <Image
            src="/images/month-card.jpg"
            alt=""
            className="object-cover h-full object-center"
            width={500}
            height={500}
          />
        </div>
        <div className="h-60 w-60 hidden sm:flex rounded-md overflow-hidden shadow-xl md:flex-2">
          <Image
            src="/images/generation-card.jpg"
            alt=""
            className="object-cover h-full object-center"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
