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
  _id: string;
  author: string;
  userId: string;
  kanji: string;
  onyomi: string;
  kunyomi: string;
  keyword: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  updatedAt: string;
}

const Cards: React.FC<SearchProps> = ({ filter, setFilter }) => {
  const [cardsArray, setCardsArray] = useState<[cardsArrayInterface]>([
    {
      _id: "",
      author: "",
      userId: "",
      kanji: "",
      onyomi: "",
      kunyomi: "",
      keyword: "",
      imageUrl: "",
      rating: 0,
      reviews: 0,
      updatedAt: "",
    },
  ]);

  useEffect(() => {
    console.log(cardsArray)
  }, [cardsArray])

  useEffect(() => {
    switch (filter) {
      case "New":
        setCardsArray(prev => prev.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ));
        break;
      case "Popular ascending":
        setCardsArray(prev => prev.sort(
          (a, b) =>
            new Date(b.reviews).getTime() - new Date(a.reviews).getTime()
        ));
        break;
      case "Popular descending":
        setCardsArray(prev => prev.sort(
          (a, b) =>
            new Date(a.reviews).getTime() - new Date(b.reviews).getTime()
        ));
        break;
      case "Rating":
        setCardsArray(prev => prev.sort(
          (a, b) =>
            new Date(a.rating).getTime() - new Date(b.rating).getTime()
        ));
        break;
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
        cardsArray.map(({ kanji, keyword, imageUrl, _id }: cardsArrayInterface) => (
          <Link
            className="relative h-60 border-black rounded-md overflow-hidden"
            key={_id}
            href={`/pages/${_id}`}
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
