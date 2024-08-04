"use client";
import { CardInterface } from "@/types/types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const page = () => {
  const params = useParams();
  console.log(params);

  const [submittedRating, setSubmittedRating] = useState(false);
  const [submittedCard, setSubmittedCard] = useState(false);
  const [rating, setRating] = useState(0);

  const router = useRouter();
  const { data: session } = useSession();

  const [card, setCard] = useState<CardInterface>({
    _id: "",
    author: "",
    userIds: [""],
    kanji: "",
    onyomi: "",
    kunyomi: "",
    imageUrl: "",
    prompt: "",
    keyword: "",
    rating: 0,
    updatedAt: "",
  });

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`/api/card/${params.id}`);
      const data = await response.json();

      console.log(data);

      setRating(data[0].rating);

      setCard(data[0]);
    };

    if (params.id) {
      getBookDetails();
    }
  }, []);

  const addRating = async () => {
    try {
      const response = await fetch(`/api/card/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({ rating }),
      });

    } catch (error) {
      console.log(error);
    } finally {
      setSubmittedRating(true);
    }
  };

  const addCard = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/card/${params.id}/add`, {
        method: "PATCH",
      });

      if (response.ok) {
        router.push("/");
        console.log("card added");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittedCard(true);
    }
  };

  return (
    <>
      {card && (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-4 py-4">
            {card.author && (
              <h2 className="text-lg">
                <span className="text-blue-500">Created by:</span> {card.author}
              </h2>
            )}
            {!card.userIds.includes(session?.user.id) && (
              <button className="btn-secondary" onClick={(e) => addCard(e)}>
                {submittedCard ? (<span className="flex justify-center items-center gap-2">Added to collection <FaCheckCircle /></span>) : (<span className="flex justify-center items-center gap-2">Add to collection <IoIosAddCircle /></span>)}
              </button>
            )}
            <div className="flex gap-4 justify-center items-center p-4 border border-blue-500 rounded-lg bg-white">
              <div className="flex justify-center items-center">
                <button onClick={() => setRating(1)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${
                      Math.round(rating) === 1 ||
                      Math.round(rating) === 2 ||
                      Math.round(rating) === 3 ||
                      Math.round(rating) === 4 ||
                      Math.round(rating) === 5
                        ? "fill-yellow-300"
                        : ""
                    } size-10`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
                <button onClick={() => setRating(2)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${
                      Math.round(rating) === 2 ||
                      Math.round(rating) === 3 ||
                      Math.round(rating) === 4 ||
                      Math.round(rating) === 5
                        ? "fill-yellow-300"
                        : ""
                    } size-10`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
                <button onClick={() => setRating(3)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${
                      Math.round(rating) === 3 ||
                      Math.round(rating) === 4 ||
                      Math.round(rating) === 5
                        ? "fill-yellow-300"
                        : ""
                    } size-10`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
                <button onClick={() => setRating(4)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${
                      Math.round(rating) === 4 || Math.round(rating) === 5
                        ? "fill-yellow-300"
                        : ""
                    } size-10`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
                <button onClick={() => setRating(5)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${
                      Math.round(rating) === 5 ? "fill-yellow-300" : ""
                    } size-10`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
              </div>
              <button className="btn-secondary" onClick={() => addRating()}>
              {submittedRating ? (<span className="flex justify-center items-center gap-2">Submitted <FaCheckCircle /></span>) : (<span className="flex justify-center items-center gap-2">Submit rating <IoIosAddCircle /></span>)}
              </button>
            </div>
          </div>
          <article className="flex w-screen">
            <div className="grid grid-cols-2 gap-10 px-10 py-6 w-full">
              <div className="flex items-center justify-center border border-blue-500 rounded-md p-4 bg-white">
                <h1 className="text-[16rem]">{card.kanji}</h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 border border-blue-500 rounded-md p-4 bg-white">
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
