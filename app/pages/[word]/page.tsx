"use client";
import { CardInterface } from "@/types/types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";

const page = () => {
  
  const params = useParams();
  console.log(params);

  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const [card, setCard] = useState<CardInterface>({
    author: "",
    userId: "",
    kanji: "",
    onyomi: "",
    kunyomi: "",
    imageUrl: "",
    prompt: "",
    keyword: "",
    updatedAt: "",
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

  const addCard = async (e: SyntheticEvent) => {
    e.preventDefault();

    const cardToAdd = {
      author: session?.user.name,
      userId: session?.user.id,
      kanji: card.kanji,
      onyomi: card.onyomi,
      kunyomi: card.kunyomi,
      keyword: card.keyword,
      prompt: card.prompt,
      imageUrl: card.imageUrl,
    };

    try {
      const response = await fetch("/api/card/add", {
        method: "POST",
        body: JSON.stringify(cardToAdd),
      });

      if (response.ok) {
        router.push("/");
        console.log("card added");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <>
      {card && (
        <>
          <div className="w-full flex items-center justify-center p-4">
            {card.author && (<h2 className="mr-10 text-lg"><span className="text-blue-500">Created by:</span> {card.author}</h2>)}
            {card.author !== session?.user.name && (<button className="btn-secondary" onClick={(e) => addCard(e)}>{submitted ? 'added to collection' : 'add to collection'}</button>)}
          </div>
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
          </article>
        </>
      )}
    </>
  );
};

export default page;
