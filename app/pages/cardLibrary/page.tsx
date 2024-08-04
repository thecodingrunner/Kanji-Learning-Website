"use client";
import React, { useEffect, useState } from "react";
import { kanjiObjectArray } from "../../../public/data";
import Link from "next/link";
import { cardsArrayInterface } from "@/components/Cards";

const KanjiPage = () => {
  const [displayed, setDisplayed] = useState("50");
  const [page, setPage] = useState(1);

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
      updatedAt: "",
    },
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/card/collection", {});
      const data = await response.json();
      console.log(data);

      // data.sort(
      //   (a: any, b: any) =>
      //     new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      // );

      setCardsArray(data);
    };

    fetchPosts();
  }, []);

  const getDisplayedKanji = () => {
    if (displayed === "50") {
      return kanjiObjectArray.slice(page * 50 - 50, page * 50);
    }
    return kanjiObjectArray;
  };

  const pages = Math.ceil(kanjiObjectArray.length / 50);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="my-6 flex justify-center items-center gap-6 text-xl">
        <button
          onClick={() => setDisplayed("50")}
          className={`${displayed === "50" ? "btn-secondary" : "btn-primary"}`}
        >
          50
        </button>
        <button
          onClick={() => setDisplayed("All")}
          className={`${displayed === "All" ? "btn-secondary" : "btn-primary"}`}
        >
          All
        </button>
      </div>
      <article
        className={`${
          displayed === "50" ? "gap-2" : ""
        } flex flex-wrap mx-auto px-10 pb-10`}
      >
        {getDisplayedKanji().map(({ kanji, keyword }, index) => (
          <>
            {cardsArray.some((el) => el.kanji === kanji) ? (
              <Link
                className={`${
                  displayed === "50"
                    ? "h-40 w-40 text-6xl bg-gradient-to-b from-green-500 to-green-800"
                    : "text-sm p-[2px] bg-green-500"
                } text-white flex justify-center items-center drop-shadow-xl`}
                key={index}
                href={`/pages/${cardsArray.find((el) => el.kanji === kanji)?._id}`}
              >
                {kanji}
              </Link>
            ) : (
              <Link
                className={`${
                  displayed === "50"
                    ? "h-40 w-40 text-6xl bg-gradient-to-b from-blue-500 to-blue-800"
                    : "text-sm p-[2px] bg-blue-500"
                } text-white flex justify-center items-center drop-shadow-xl`}
                key={index}
                href={`/pages/createCard/${index + 50 * (page - 1)}`}
              >
                {kanji}
              </Link>
            )}
          </>
        ))}
      </article>

      <div className="w-full flex justify-center items-center text-2xl gap-3 my-8">
        {page < 3 ? (
          <>
            <button onClick={() => setPage(1)} className="btn-secondary">
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
              onClick={() => setPage(Math.ceil(kanjiObjectArray.length / 50))}
              className="btn-secondary"
            >
              End
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setPage(1)} className="btn-secondary">
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
            <button onClick={() => setPage(pages)} className="btn-secondary">
              End
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default KanjiPage;
