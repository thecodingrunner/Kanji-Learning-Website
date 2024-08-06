"use client";

import { cardsArrayInterface } from "@/components/Cards";
import React, { useEffect, useState } from "react";

const Page = () => {
  const fetchPosts = async () => {
    const response = await fetch("/api/card/collection/revise", {});
    const data = await response.json();
    console.log(data);

    setCardsArray(data);
  };

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

  const [flip, setFlip] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function passCard() {
    let newInterval = 600;
    let currentInterval = cardsArray[0].interval;

    if (currentInterval === 600) {
      newInterval = 86400
    } else if (currentInterval === 86400) {
      newInterval = 432000
    } else if (currentInterval === 432000) {
      newInterval = 864000
    } else {
      newInterval = currentInterval*3
    }

    try {
      const response = await fetch(`/api/card/${cardsArray[0]._id}/revise`, {
        method: "PATCH",
        body: JSON.stringify({ newInterval }),
      });

      if (response.ok) {
        console.log('Updated Card')
      }
    } catch (error) {
      console.log(error);
    }

    fetchPosts();
    setFlip(false);
  }

  async function failCard() {
    let newInterval = 600;
    let currentInterval = cardsArray[0].interval;

    try {
      const response = await fetch(`/api/card/${cardsArray[0]._id}/revise`, {
        method: "PATCH",
        body: JSON.stringify({ newInterval }),
      });

      if (response.ok) {
        console.log('Updated Card')
      }
    } catch (error) {
      console.log(error);
    }

    fetchPosts();
    setFlip(false);
  }

  return (
    <div className="flex justify-center items-center w-full p-2">
      {cardsArray.length !== 0 ? (
        <div className="flex flex-col gap-2">
          {flip ? (
            <div
              className="flex flex-col items-center justify-center gap-2 border-2 border-blue-500 rounded-md p-4 bg-white"
              onClick={() => setFlip((prev) => !prev)}
            >
              <h2 className="text-2xl">{cardsArray[0].keyword}</h2>
              <h3 className="text-2xl">{cardsArray[0].onyomi}</h3>
              <h3 className="text-2xl">{cardsArray[0].kunyomi}</h3>
              {cardsArray[0].audioUrl && (
                <audio controls className="">
                  <source
                    src={cardsArray[0].audioUrl}
                    type="audio/mp3"
                  />
                </audio>
              )}
              <img
                src={cardsArray[0].imageUrl}
                className="w-72 h-72"
              />
              <p className="text-xl">{cardsArray[0].prompt}</p>
            </div>
          ) : (
            <div
              className="bg-white flex justify-center items-center px-28 border-2 border-blue-500"
              onClick={() => setFlip((prev) => !prev)}
            >
              <h1 className="text-[20rem]">{cardsArray[0].kanji}</h1>
            </div>
          )}
          <div className="flex justify-center items-center gap-4">
            <button className="btn-secondary" onClick={() => passCard()}>
              Pass
            </button>
            <button className="btn-secondary" onClick={() => failCard()}>
              Fail
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl">
          Congratulations! You are up to date on revision.
        </h1>
      )}
    </div>
  );
};

export default Page;
