"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import flame from "../public/flame.jpg";
import Image from "next/image";
import Link from "next/link";

// Define the prop types
interface SearchProps {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
  }

export interface cardsArrayInterface {
  author: string;
  userId: string;
  kanji: string;
  onyomi: string;
  kunyomi: string;
  keyword: string;
  imageUrl: string;
  updatedAt: string;
}

const Cards: React.FC<SearchProps> = ({ filter, setFilter }) => {

  const [cardsArray, setCardsArray] = useState<[cardsArrayInterface]>([
    {
      author: "",
      userId: "",
      kanji: "",
      onyomi: "",
      kunyomi: "",
      keyword: "",
      imageUrl: "",
      updatedAt: "",
    },
  ]);

  useEffect(() => {
    console.log(cardsArray[0].updatedAt);
    switch (filter) {
      case "New":
        cardsArray.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
    }
  }, [filter]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/card");
      const data = await response.json();
      console.log(data);

      data.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setCardsArray(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="grid grid-cols-6 m-4 gap-2">
      {cardsArray &&
        cardsArray.map(({ kanji, keyword, imageUrl }: cardsArrayInterface) => (
          <Link
            className="relative h-60 border-black rounded-md overflow-hidden"
            key={kanji}
            href={`/pages/${keyword}`}
          >
            <img
              src={imageUrl}
              alt=""
              className="object-cover h-full object-center"
            />
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col bg-opacity-40 bg-black">
              <h3 className="text-9xl text-white">{kanji}</h3>
              <h2 className="text-2xl text-white font-semibold">{keyword}</h2>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Cards;
