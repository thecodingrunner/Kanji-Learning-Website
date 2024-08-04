"use client";

import { kanjiObjectArray } from "@/public/data";
import { useParams, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Card from "@/models/card";

import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";

interface kanjiObject {
  kanji?: string | undefined;
  onyomi: string | undefined;
  kunyomi?: string | undefined;
  keyword: string | undefined;
}

const CreateKanjiForm = () => {
  const { index } = useParams();

  const { data: session } = useSession();

  const router = useRouter();

  const [kanji, setKanji] = useState<kanjiObject>({
    kanji: "",
    onyomi: "",
    kunyomi: "",
    keyword: "",
  });
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const kanjiTemp = kanjiObjectArray[Number(index)];
    setKanji(kanjiTemp);
    console.log(kanjiTemp);

    const savedImageUrl = localStorage.getItem("savedImageUrl");
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }

    console.log(savedImageUrl);
    console.log(imageUrl);
  }, []);

  async function generateImage() {
    setGeneratingImage(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    const imageUrlTemp = await response.json();

    console.log(imageUrlTemp);

    setImageUrl(imageUrlTemp);
    localStorage.setItem("savedImageUrl", imageUrlTemp);

    setGeneratingImage(false);
  }

  async function generatePrompt() {
    setGeneratingPrompt(true);

    const response = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        onyomi: kanji.onyomi,
        kunyomi: kanji.kunyomi,
        keyword: kanji.keyword,
      }),
    });

    const promptTemp = await response.json();

    console.log(promptTemp);

    setPrompt(promptTemp);

    setGeneratingPrompt(false);
  }

  const addCard = async (e: SyntheticEvent) => {
    e.preventDefault();

    const cardToAdd = {
      author: session?.user.name,
      userIds: [session?.user.id],
      kanji: kanji.kanji,
      onyomi: kanji.onyomi,
      kunyomi: kanji.kunyomi,
      keyword: kanji.keyword,
      prompt: prompt,
      imageUrl: imageUrl,
      users: 1,
      reviews: 0,
      rating: 0,
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
    <div className="flex gap-8 p-4">
      <form
        className="flex flex-col gap-4 px-8 py-4 border border-blue-500 rounded-md flex-1 overflow-auto"
        onSubmit={(e) => addCard(e)}
      >
        <label>
          Kanji
          <input
            type="text"
            placeholder={kanji?.kanji}
            value={kanji?.kanji}
            className="ml-4 border"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, kanji: e.target.value };
              })
            }
          />
        </label>

        <label>
          Keyword
          <input
            type="text"
            placeholder={kanji?.keyword}
            value={kanji?.keyword}
            className="ml-4 border"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, keyword: e.target.value };
              })
            }
          />
        </label>

        <label>
          Onyomi
          <input
            type="text"
            placeholder={kanji?.onyomi}
            value={kanji?.onyomi}
            className="ml-4 border"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, onyomi: e.target.value };
              })
            }
          />
        </label>

        <label>
          Kunyomi
          <input
            type="text"
            placeholder={kanji?.kunyomi}
            value={kanji?.kunyomi}
            className="ml-4 border"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, kunyomi: e.target.value };
              })
            }
          />
        </label>

        <label className="flex">
          Image prompt
          <textarea
            placeholder="write your image prompt here"
            value={prompt}
            className="ml-4 border w-full"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>

        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={() => generatePrompt()}
            className="btn-primary"
          >
            Generate Prompt
          </button>
          <button
            type="button"
            onClick={() => generateImage()}
            className="btn-primary"
          >
            Generate Image
          </button>
        </div>


        {generatingImage ? (
          <div>
            <ClipLoader
              color={"blue"}
              loading={generatingImage}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : imageUrl ? (
          <div className="flex items-center justify-center">
            <img src={imageUrl} alt="generated image" className="w-60 h-60" />
            <div>
              <button></button>
            </div>
          </div>
        ) : (
          <div>You haven't generated an image yet.</div>
        )}

        <button className="btn-secondary">Create card</button>
      </form>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <h2 className="text-3xl text-center">Front</h2>
        <div className="w-full flex flex-col gap-4 items-center justify-center border border-blue-500 p-4">
          <h1 className="text-9xl">{kanji?.kanji}</h1>
        </div>
        <h2 className="text-3xl text-center">Back</h2>
        <div className="w-full flex flex-col gap-4 items-center justify-center border border-blue-500 p-4">
          <h1 className="text-4xl">{kanji?.keyword}</h1>
          <h1 className="text-2xl">{kanji?.onyomi}</h1>
          <h1 className="text-2xl">{kanji?.kunyomi}</h1>
          {imageUrl && <img src={imageUrl} className="w-40 h-40" />}
        </div>
      </div>
    </div>
  );
};

export default CreateKanjiForm;
