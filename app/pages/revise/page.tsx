"use client";
import React, { useState } from "react";
import { kanjiObjectArray } from "../../../public/data";
import Link from "next/link";

const KanjiPage = () => {
  const [displayed, setDisplayed] = useState("50");

  const getDisplayedKanji = () => {
    if (displayed === "50") {
      return kanjiObjectArray.slice(0, 50);
    }
    return kanjiObjectArray;
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="my-6 flex justify-center items-center gap-6 text-xl">
        <button onClick={() => setDisplayed("50")} className={`${displayed === '50' ? 'btn-secondary' : 'btn-primary'}`}>50</button>
        <button onClick={() => setDisplayed("All")} className={`${displayed === 'All' ? 'btn-secondary' : 'btn-primary'}`}>All</button>
      </div>
      <article className={`${displayed === '50' ? 'gap-2' : ''} flex flex-wrap mx-auto px-10 pb-10`}> 
        {getDisplayedKanji().map(({kanji, keyword}, index) => (
          <Link
            className={`${
              displayed === "50" ? "h-28 w-28 text-6xl bg-gradient-to-b from-blue-500 to-blue-800" : "text-sm p-[2px] bg-blue-500"
            } text-white flex justify-center items-center drop-shadow-xl`}
            key={index}
            href={`/pages/createCard/${index}`}
          >
            {kanji}
          </Link>
        ))}
      </article>
    </div>
  );
};

export default KanjiPage;
