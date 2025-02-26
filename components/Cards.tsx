"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export interface cardsArrayInterface {
  _id: string;
  author: string;
  userIds: [string];
  kanji: string;
  onyomi: string;
  kunyomi: string;
  keyword: string;
  imageUrl: string;
  audioUrl: string;
  prompt: string;
  interval: number;
  lastStudied: Date;
  rating: number;
  reviews: number;
  updatedAt: string;
}

const Cards = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [cardsArray, setCardsArray] = useState<cardsArrayInterface[]>([
    {
      _id: "",
      author: "",
      userIds: [""],
      kanji: "",
      onyomi: "",
      kunyomi: "",
      imageUrl: "",
      audioUrl: "",
      interval: 600,
      lastStudied: new Date(),
      prompt: "",
      keyword: "",
      rating: 0,
      reviews: 0,
      updatedAt: "",
    },
  ]);

  // Create a sorted cards array from the fetched array of cards. 
  // The cards will be ordered depending on the search value, which is "New" by default. 
  // The array is reordered each time the searchParams or cardsArray are updated.
  const sortedCardsArray = useMemo(() => {
    return [...cardsArray].sort((a, b) => {
      switch (search) {
        case "New":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "Popular ascending":
          return a.reviews - b.reviews;
        case "Popular descending":
          return b.reviews - a.reviews;
        case "Rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [cardsArray, searchParams]);


  // Fetch the cards from the database
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/card?page=${page}&limit=${limit}`);
      const data = await response.json();
      console.log(data);
      setCardsArray(data);
    };

    fetchPosts();
  }, [page]);

  return (
    <>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 m-4 gap-2">
        {/* Display each card as a link to the cards' page */}
        {sortedCardsArray &&
          sortedCardsArray.map(
            ({ kanji, keyword, imageUrl, _id }: cardsArrayInterface) => (
              <Link
                className="relative h-60 border-black rounded-md overflow-hidden"
                key={_id}
                href={`/pages/${_id}`}
              >
                {/* <img
                  src={imageUrl}
                  alt=""
                  className="object-cover w-full h-full object-center"
                /> */}
                <Image
                src={imageUrl}
                alt={kanji}
                className="object-cover w-full h-full object-center"
                width={250}
                height={250}
                />
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col bg-opacity-40 bg-black">
                  <h3 className="text-9xl text-white">{kanji}</h3>
                  <h2 className="text-2xl text-white font-semibold">{keyword}</h2>
                </div>
              </Link>
            )
          )}
      </section>
      <div className="flex gap-4 justify-center items-center text-xl">
        {/* Render cards */}
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="btn-secondary min-w-20">
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} className="btn-secondary min-w-20">
          Next
        </button>
      </div>
    </>
  );
};

export default Cards;
