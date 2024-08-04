import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 w-[80vw] mx-auto items-center justify-center rounded-lg hero-gradient pt-10 px-10 shadow-xl text-white">
      {/* <div className="flex justify-center items-center gap-1">
        <img src="/logos/water logo 1.jpg" className="w-28 h-28 rounded-full" />
        <h1 className='text-2xl'>Kanjify</h1>
      </div> */}
      <h2 className="text-6xl font-bold">
        Create AI generated Kanji Flashcards
      </h2>
      <div className="w-full flex gap-10 items-end justify-center mt-10">
        <div className="h-60 w-60 rounded-t-md overflow-hidden shadow-xl">
          <Image
            src="/images/fire-card.jpg"
            alt=""
            className="object-cover h-full object-center"
            width={500}
            height={500}
          />
        </div>
        <div className="h-80 w-80 rounded-md overflow-hidden shadow-2xl">
          <Image
            src="/images/month-card.jpg"
            alt=""
            className="object-cover h-full object-center"
            width={500}
            height={500}
          />
        </div>
        <div className="h-60 w-60 rounded-md overflow-hidden shadow-xl">
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
