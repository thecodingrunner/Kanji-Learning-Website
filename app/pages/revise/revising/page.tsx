"use client";

import { cardsArrayInterface } from "@/components/Cards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  // Function for fetching posts that need to be revised (a greater time than the interval has passed since the card was last studied)
  // The function will be run upon page load, and whenever a card is passed or failed.
  // This will prevent cycling through the cards on the client side, as only the relevant cards will be fetched and displayed.
  const fetchCards = async () => {
    const response = await fetch("/api/card/collection/revise", {});
    const data = await response.json();
    console.log(data);

    setCardsArray(data);
  };

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Don't run effect while session is loading
    if (!session?.user?.id) {
      router.push("/");
    }
  }, [session, status, router]);

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

  // Card flip state
  const [flip, setFlip] = useState(false);

  // Fetch
  useEffect(() => {
    fetchCards();
  }, []);

  // Function for passing card
  async function passCard() {
    let newInterval = 60;
    let currentInterval = cardsArray[0].interval;

    // Update the new interval depending on the value of the current interval
    if (currentInterval === 60) {
      newInterval = 600;
    } else if (currentInterval === 600) {
      newInterval = 86400;
    } else {
      newInterval = currentInterval * 2.5;
    }

    // Patch the card with the new interval, and the time studied
    try {
      const response = await fetch(`/api/card/${cardsArray[0]._id}/revise`, {
        method: "PATCH",
        body: JSON.stringify({ newInterval: newInterval, pass: true  }),
      });

      if (response.ok) {
        console.log("Updated Card");
      }

      fetchCards();
      setFlip(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Function for failing card
  async function failCard() {
    // Set new interval to 600, so that it can be studied again
    let newInterval = 60;

    try {
      const response = await fetch(`/api/card/${cardsArray[0]._id}/revise`, {
        method: "PATCH",
        body: JSON.stringify({ newInterval: newInterval, pass: false }),
      });

      if (response.ok) {
        console.log("Updated Card");
      }

      fetchCards();
      setFlip(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full p-2 h-screen pt-20">
      {/* If there are cards to be studied, display the first card. */}
      {cardsArray.length !== 0 ? (
        // Display the front of the card if flip is false (false by default)
        <div className="flex flex-col gap-2">
          {flip ? (
            <div
              className="flex flex-col items-center justify-center gap-2 border-2 border-blue-500 rounded-md sm:p-4 p-2 bg-white"
              onClick={() => setFlip((prev) => !prev)}
            >
              <h2 className="text-2xl">{cardsArray[0].keyword}</h2>
              <h3 className="text-2xl">{cardsArray[0].onyomi}</h3>
              <h3 className="text-2xl">{cardsArray[0].kunyomi}</h3>
              {cardsArray[0].audioUrl && (
                <audio controls className="max-sm:w-full">
                  <source src={cardsArray[0].audioUrl} type="audio/mp3" />
                </audio>
              )}
              <img src={cardsArray[0].imageUrl} className="sm:w-72 sm:h-72 w-48 h-48" />
              <p className="text-xl">{cardsArray[0].prompt}</p>
            </div>
          ) : (
            // Display the back of the card if flip is true (when card is clicked will be true)
            <div
              className="bg-white flex justify-center items-center px-10 sm:px-28 border-2 border-blue-500"
              onClick={() => setFlip((prev) => !prev)}
            >
              <h1 className="sm:text-[20rem] text-[10rem]">{cardsArray[0].kanji}</h1>
            </div>
          )}

          {/* Display the pass and fail buttons */}
          <div className="flex justify-center items-center gap-4">
            <button className="btn-secondary" onClick={() => passCard()}>
              Pass
            </button>
            <button className="btn-secondary" onClick={() => failCard()}>
              Fail
            </button>
          </div>
        </div>
        // If there are no cards to be studied, display a message
      ) : (
        <h1 className="text-3xl mt-[30vh]">
          Congratulations! You are up to date on revision.
        </h1>
      )}
    </div>
  );
};

export default Page;
