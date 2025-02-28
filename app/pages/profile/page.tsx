"use client"

import { cardsArrayInterface } from "@/components/Cards";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import calculateStatistics from "@/utils/statisticCalculations"

import { FaAngleDoubleUp } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";

import { FiTarget } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export interface statsInterface {
  totalCards: number;
  cardsLearned: number;
  cardsCreated: number;
  totalRevisions: number; 
  totalReviews: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracy: number;
  learnerXp: number;
}

const page = () => {
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

    const [stats, setStats] = useState<statsInterface>(
      {
        totalCards: 0, 
        cardsLearned: 0, 
        cardsCreated: 0, 
        totalRevisions: 0, 
        totalReviews: 0, 
        totalCorrect: 0, 
        totalIncorrect: 0, 
        accuracy: 0,
        learnerXp: 0,
      });

    const [refresh, setRefresh] = useState(false);

    const router = useRouter();

    const { data: session } = useSession();

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

    }, [refresh]);

    useEffect(() => {
      // Calculate Statistics
      if (session?.user) {
        setStats(calculateStatistics(cardsArray, session?.user));
      }
    }, [cardsArray])

  return (
    <section className="w-[80vw] my-10 mx-auto bg-transparent rounded-lg border-2 border-blue-500 p-6">
      
      <div className="flex gap-4 justify-start items-center flex-col sm:flex-row">
        {session?.user.image !== undefined && (
          <div className="rounded-full h-20 w-20 overflow-hidden">
            <Image
              src={`${session?.user.image}`}
              alt=""
              className="object-cover w-full h-full object-center"
              width={250}
              height={250}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 items-start justify-center">
          <h2 className="text-3xl font-semibold">
            {session?.user.name}
          </h2>
          <div className="w-48 h-4 rounded-full border-2 border-black">
            <div style={{ width: (stats.totalCards/250 * 100) + "%" }} className="h-full bg-blue-500" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center items-center mt-4 flex-wrap">
        <div className="h-full flex-shrink-0 text-2xl flex-1 hero-gradient p-4 flex items-start flex-col justify-stretch text-white rounded-lg shadow-md">
          <LuBrain />
          <p className="text-2xl">
            Cards Learned
          </p>
          <p className="text-4xl">
            {stats.cardsLearned}
          </p>
        </div>
        <div className="h-full flex-shrink-0 text-2xl flex-1 hero-gradient p-4 flex items-start flex-col justify-stretch text-white rounded-lg shadow-md">
          <FaAngleDoubleUp />
          <p className="text-2xl">
            Learner XP
          </p>
          <p className="text-4xl">
            {Math.round(stats.learnerXp)}
          </p>
        </div>
        <div className="h-full flex-shrink-0 text-2xl flex-1 hero-gradient p-4 flex items-start flex-col justify-stretch text-white rounded-lg shadow-md">
          <TbCards />
          <p className="text-2xl">
            Cards Created
          </p>
          <p className="text-4xl">
            {stats.cardsCreated}
          </p>
        </div>
        <div className="h-full flex-shrink-0 text-2xl flex-1 hero-gradient p-4 flex items-start flex-col justify-stretch text-white rounded-lg shadow-md">
          <FaRegStar />
          <p className="text-2xl">
            Card Ratings
          </p>
          <p className="text-4xl">
            {stats.totalReviews}
          </p>
        </div>
      </div>

      <div className="flex gap-6 mt-4 flex-wrap">
        <div className="flex-1">
          <h3 className="text-4xl font-semibold">Performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="text-xl flex-1 hero-gradient p-4 flex items-start flex-col justify-center text-white rounded-lg shadow-md">
              <FaChartLine />
              <p className="text-2xl">
                Total Revisions
              </p>
              <p className="text-4xl font-semibold">
                {stats.totalRevisions}
              </p>
            </div>
            <div className="text-xl flex-1 hero-gradient p-4 flex items-start flex-col justify-center text-white rounded-lg shadow-md">
              <FaCheck />
              <p className="text-2xl">
                Total Correct
              </p>
              <p className="text-4xl font-semibold">
                {stats.totalCorrect}
              </p>
            </div>
            <div className="text-2xl flex-1 hero-gradient p-4 flex items-start flex-col justify-center text-white rounded-lg shadow-md">
              <FaXmark />
              <p className="text-2xl">
                Total Incorrect
              </p>
              <p className="text-4xl font-semibold">
                {stats.totalIncorrect}
              </p>
            </div>
            <div className="text-xl flex-1 hero-gradient p-4 flex items-start flex-col justify-center text-white rounded-lg shadow-md">
              <FiTarget />
              <p className="text-2xl">
                Accuracy
              </p>
              <p className="text-4xl font-semibold">
                {Math.round(stats.accuracy)}%
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex-1"></div> */}
      </div>
{/* 
      <div>
        <p>
          total cards: {stats.totalCards}
        </p>
      </div> */}
    </section>
  )
}

export default page