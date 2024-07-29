"use client";
import { CardInterface } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  console.log(params);

  const [card, setCard] = useState<CardInterface>({
    kanji: "",
    onyomi: "",
    kunyomi: "",
    imageUrl: "",
    prompt: "",
    keyword: "",
  });

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`/api/card/${params.word}`);
      const data = await response.json();

      console.log(data);

      setCard(data[0]);
    };

    if (params.word) {
      getBookDetails();
    }
  }, []);

  useEffect(() => {
    console.log(card);
  }, [card]);

  return (
    <>
      {card && (
        <article className="flex w-screen">
          <div className="grid grid-cols-2 gap-10 p-4 w-full">
            <div className="flex items-center justify-center border border-blue-500 rounded-md p-4">
              <h1 className="text-[16rem]">{card.kanji}</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border border-blue-500 rounded-md p-4">
              <h2 className="text-2xl">{card.keyword}</h2>
              <h3 className="text-2xl">{card.onyomi}</h3>
              <h3 className="text-2xl">{card.kunyomi}</h3>
              <img src={card.imageUrl} className="w-72 h-72" />
              <p className="text-xl">{card.prompt}</p>
            </div>
          </div>
          <div className="w-auto p-4">
            <button className="btn-secondary">add to collection</button>
          </div>
        </article>
      )}
    </>
  );
};

export default page;
