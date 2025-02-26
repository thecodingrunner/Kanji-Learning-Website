"use client";

import React, { useEffect, useState } from "react";
import { kanjiObjectArray } from "../../../public/data";
import Link from "next/link";
import { cardsArrayInterface } from "@/components/Cards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const KanjiPage = () => {
  const [displayed, setDisplayed] = useState(25);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const { data: session } = useSession();

  const [kanjiOptionsArray, setKanjiOptionsArray] = useState<cardsArrayInterface[] | null>(null);
  const [displayPopup, setDisplayPopup] = useState<string>("")
  const [optionsIndex, setOptionsIndex] = useState(0);

  useEffect(() => {
    if (!session?.user.id) {
      router.push('/')
    }
  }, [])

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

  // Fetch cards on page load
  useEffect(() => {
    try {
      const fetchCards = async () => {
        const response = await fetch("/api/card/collection", {});
        const data = await response.json();

        setCardsArray(data);
      };

      console.log("Successfully fetched cards");

      fetchCards();
    } catch (error) {
      console.log("Failed to fetch cards", error);
    }
  }, []);

  // Slice correct number of kanji to display based on the displayed state
  const getDisplayedKanji = () => {
    return kanjiObjectArray.slice(
      page * displayed - displayed,
      page * displayed
    );
  };

  const setPopup = (optionsArray: cardsArrayInterface[] | null, kanji: string) => {
    setKanjiOptionsArray(optionsArray);
    setDisplayPopup(prev => prev === kanji ? "" : kanji);
    setOptionsIndex(0);
  }

  const handleNext = () => {
    if (optionsIndex < kanjiOptionsArray.length - 2) {
      setOptionsIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (optionsIndex > 0) {
      setOptionsIndex(prev => prev - 1);
    }
  };

  const pages = Math.ceil(kanjiObjectArray.length / displayed);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">

      {/* Buttons for selecting the number of kanji to be displayed per page */}
      <div className="my-6 flex justify-center items-center gap-6 text-xl">
        <button
          onClick={() => setDisplayed(25)}
          className={`${displayed === 25 ? "btn-secondary" : "btn-primary"}`}
        >
          25
        </button>
        <button
          onClick={() => setDisplayed(50)}
          className={`${displayed === 50 ? "btn-secondary" : "btn-primary"}`}
        >
          50
        </button>
      </div>

      {/* Map through and display all the kanji from the kanji array. */}
      <article className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-10 pb-10 w-full">
        {getDisplayedKanji().map(({ kanji, keyword }, index) => (
          <div key={keyword}>
          {/* If there is a card in the users collection of the same kanji, display this kanji with a green background to show that it has been added. */}
          {/* The link will also be to the page for viewing the currently existing card, rather than the page for creating a new card. */}
            {cardsArray.some((el) => el.kanji === kanji) ? (
              <div className="flex">
                <button
                  className="flex-auto h-40 text-6xl bg-gradient-to-b from-green-500 to-green-800 text-white flex justify-center items-center drop-shadow-xl"
                  key={keyword}
                  onClick={() => setPopup(cardsArray.filter((el) => el.kanji === kanji), kanji)}
                >
                  {kanji}
                </button>
                {(displayPopup === kanji) && (
                  <div className={`${displayPopup ? "flex-auto flex flex-col gap-1 px-1" : "hidden"}`}>
                  {kanjiOptionsArray?.slice(optionsIndex, optionsIndex + 2).map((option) => (
                    <Link
                      key={option._id} // Use unique key
                      className="flex gap-1 justify-center items-center flex-1 bg-gradient-to-b from-blue-500 to-blue-800 text-white rounded-md"
                      href={`/pages/${option._id}`} // Correctly referencing option
                    >
                      <span>{option.author}</span>
                      <span className="text-sm">({Math.floor(option.rating)} stars)</span>
                    </Link>
                  ))}
                  <Link
                    className="flex gap-1 justify-center items-center flex-1 bg-gradient-to-b from-blue-500 to-blue-800 text-white rounded-md"
                    key={keyword}
                    href={`/pages/createCard/${index + displayed * (page - 1)}`}
                  >
                    Create New Card
                  </Link>
                  {(kanjiOptionsArray && kanjiOptionsArray?.length > 2) && (
                    <div className="flex gap-1 flex-1">
                      <button
                        className="flex gap-1 justify-center items-center flex-1 bg-gradient-to-b from-blue-500 to-blue-800 text-white rounded-md"
                        key={keyword}
                        onClick={handlePrev}
                      >
                        Previous
                      </button>
                      <button
                      className="flex gap-1 justify-center items-center flex-1 bg-gradient-to-b from-blue-500 to-blue-800 text-white rounded-md"
                      key={keyword}
                      onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
                )}

              </div>
            ) : (
              <Link
                className="flex-1 h-40 text-6xl bg-gradient-to-b from-blue-500 to-blue-800 text-white flex justify-center items-center drop-shadow-xl"
                key={keyword}
                href={`/pages/createCard/${index + displayed * (page - 1)}`}
              >
                {kanji}
              </Link>
            )}
          </div>
        ))}
      </article>

{/* Pagination component */}
      <div className="w-full flex justify-center items-center text-2xl gap-3 my-8">
        {/* If the current page is less than 3, the highlighting style will be different. */}
        {page < 3 ? (
          <>
            <button onClick={() => setPage(1)} className="btn-secondary">
              Start
            </button>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="btn-secondary max-sm:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => setPage(1)}
              className={`${page === 1 ? "font-bold" : ""} text-blue-500`}
            >
              1
            </button>
            <button
              onClick={() => setPage(2)}
              className={`${page === 2 ? "font-bold" : ""} text-blue-500`}
            >
              2
            </button>
            <button
              onClick={() => setPage(3)}
              className={`${page === 3 ? "font-bold" : ""} text-blue-500`}
            >
              3
            </button>
            <button
              onClick={() => setPage(4)}
              className={`${page === 4 ? "font-bold" : ""} text-blue-500`}
            >
              4
            </button>
            <button
              onClick={() => setPage(5)}
              className={`${page === 5 ? "font-bold" : ""} text-blue-500`}
            >
              5
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="btn-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setPage(Math.ceil(kanjiObjectArray.length / displayed))
              }
              className="btn-secondary max-sm:hidden"
            >
              End
            </button>
          </>
          // If the page is greater than two before the last, this highlighting will be displayed differently
        ) : page >
          Math.ceil(kanjiObjectArray.length / displayed) - 2 ? (
          <>
            <button onClick={() => setPage(1)} className="btn-secondary max-sm:hidden">
              Start
            </button>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="btn-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setPage(
                  Math.ceil(kanjiObjectArray.length / displayed) - 4
                )
              }
              className={`${
                page ===
                Math.ceil(kanjiObjectArray.length / displayed) - 4
                  ? "font-bold"
                  : ""
              } text-blue-500`}
            >
              {Math.ceil(kanjiObjectArray.length / displayed) - 4}
            </button>
            <button
              onClick={() =>
                setPage(
                  Math.ceil(kanjiObjectArray.length / displayed) - 3
                )
              }
              className={`${
                page ===
                Math.ceil(kanjiObjectArray.length / displayed) - 3
                  ? "font-bold"
                  : ""
              } text-blue-500`}
            >
              {Math.ceil(kanjiObjectArray.length / displayed) - 3}
            </button>
            <button
              onClick={() =>
                setPage(
                  Math.ceil(kanjiObjectArray.length / displayed) - 2
                )
              }
              className={`${
                page ===
                Math.ceil(kanjiObjectArray.length / displayed) - 2
                  ? "font-bold"
                  : ""
              } text-blue-500`}
            >
              {Math.ceil(kanjiObjectArray.length / displayed) - 2}
            </button>
            <button
              onClick={() =>
                setPage(
                  Math.ceil(kanjiObjectArray.length / displayed) - 1
                )
              }
              className={`${
                page ===
                Math.ceil(kanjiObjectArray.length / displayed) - 1
                  ? "font-bold"
                  : ""
              } text-blue-500`}
            >
              {Math.ceil(kanjiObjectArray.length / displayed) - 1}
            </button>
            <button
              onClick={() =>
                setPage(Math.ceil(kanjiObjectArray.length / displayed))
              }
              className={`${
                page === Math.ceil(kanjiObjectArray.length / Number(displayed))
                  ? "font-bold"
                  : ""
              } text-blue-500`}
            >
              {Math.ceil(kanjiObjectArray.length / displayed)}
            </button>
            {page < Math.ceil(kanjiObjectArray.length / displayed) && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
            {page < Math.ceil(kanjiObjectArray.length / displayed) && (
              <button
                onClick={() =>
                  setPage(
                    Math.ceil(kanjiObjectArray.length / displayed)
                  )
                }
                className="btn-secondary max-sm:hidden"
              >
                End
              </button>
            )}
          </>
          // Otherwise the pagination component will be displayed normally
        ) : (
          <>
            <button onClick={() => setPage(1)} className="btn-secondary max-sm:hidden">
              Start
            </button>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="btn-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button onClick={() => setPage(page - 2)} className="text-blue-500">
              {page - 2}
            </button>
            <button onClick={() => setPage(page - 1)} className="text-blue-500">
              {page - 1}
            </button>
            <button
              onClick={() => setPage(page)}
              className="font-bold text-blue-500"
            >
              {page}
            </button>
            <button onClick={() => setPage(page + 1)} className="text-blue-500">
              {page + 1}
            </button>
            <button onClick={() => setPage(page + 2)} className="text-blue-500">
              {page + 2}
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="btn-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setPage(Math.ceil(kanjiObjectArray.length / displayed))
              }
              className="btn-secondary max-sm:hidden"
            >
              End
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default KanjiPage;
