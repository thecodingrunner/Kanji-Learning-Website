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
import Image from "next/image";
import { PacmanLoader } from "react-spinners";

interface kanjiObject {
  kanji?: string | undefined;
  onyomi: string | undefined;
  kunyomi?: string | undefined;
  keyword: string | undefined;
}

const voiceTypes = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

const CreateKanjiForm = () => {
  const { index } = useParams();

  // Instantiate authentication session
  const { data: session } = useSession();

  // Instantiate router
  const router = useRouter();

  // Kanji object
  const [kanji, setKanji] = useState<kanjiObject>({
    kanji: "",
    onyomi: "",
    kunyomi: "",
    keyword: "",
  });

  // Prompt for story, used to generate image
  const [prompt, setPrompt] = useState<string>("");
  // Image Url for adding to firebase
  const [imageUrl, setImageUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>("");
  const [audioFilepath, setAudioFilepath] = useState<string>("");

  // Generating states, for conditional formatting (buttons, spinners etc)
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [generatingAudio, setGeneratingAudio] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Voice type for generating audio of kunyomi and onyomi
  const [voiceType, setVoiceType] = useState<string | null>("alloy");

  // Instantiate kanji object, and access image url from local storage
  useEffect(() => {
    const kanjiTemp = kanjiObjectArray[Number(index)];
    setKanji(kanjiTemp);
    console.log(kanjiTemp);

    const savedImageUrl = localStorage.getItem("savedImageUrl");
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }

    const savedAudioUrl = localStorage.getItem("savedAudioUrl");
    if (savedAudioUrl) {
      setAudioUrl(savedAudioUrl);
    }

    console.log(savedImageUrl, savedAudioUrl);
    console.log(imageUrl);
  }, []);

  useEffect(() => {
    console.log(audioUrl);
  }, [audioUrl]);

  // Generate audio
  function generateAudio() {
    setGeneratingAudio(true);

    console.log(voiceType);

    const fetchPosts = async () => {
      const response = await fetch(`/api/audio`, {
        method: "POST",
        body: JSON.stringify({
          text: `${kanji?.kunyomi} ${kanji?.onyomi}`,
          voice: voiceType,
        }),
      });

      const { audioUrl, filepath } = await response.json();

      setAudioUrl(audioUrl);
      setAudioFilepath(filepath);
      localStorage.setItem("savedAudioUrl", audioUrl);

      setGeneratingAudio(false);
    };

    fetchPosts();
  }

  //   Delete audio
  function deleteAudio(filepath: string) {
    console.log(filepath);

    // Create a reference to the file to delete
    const audioRef = ref(storage, filepath);

    try {
      deleteObject(audioRef);
      setAudioUrl(null);
      console.log("successfully deleted audio");
    } catch (error) {
      console.log("failed to delete audio", error);
    }
  }

  // Generate image
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

  // Generate prompt
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

  // Add card
  const addCard = async (e: SyntheticEvent) => {
    setAddingCard(true);
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
      audioUrl: audioUrl,
      interval: 600,
      lastStudied: new Date(),
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
        setAddingCard(false);
        router.push("/?search=New");
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
        className="flex flex-col gap-4 px-8 py-4 border border-blue-500 rounded-md flex-1 overflow-auto bg-white shadow-lg"
        onSubmit={(e) => addCard(e)}
      >
        <label className="label">
          Kanji
          <input
            type="text"
            placeholder={kanji?.kanji}
            value={kanji?.kanji}
            className="card-input"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, kanji: e.target.value };
              })
            }
          />
        </label>

        <label className="label">
          Keyword
          <input
            type="text"
            placeholder={kanji?.keyword}
            value={kanji?.keyword}
            className="card-input"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, keyword: e.target.value };
              })
            }
          />
        </label>

        <label className="label">
          Onyomi
          <input
            type="text"
            placeholder={kanji?.onyomi}
            value={kanji?.onyomi}
            className="card-input"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, onyomi: e.target.value };
              })
            }
          />
        </label>

        <label className="label">
          Kunyomi
          <input
            type="text"
            placeholder={kanji?.kunyomi}
            value={kanji?.kunyomi}
            className="card-input"
            onChange={(e) =>
              setKanji((prev) => {
                return { ...prev, kunyomi: e.target.value };
              })
            }
          />
        </label>

        <select
          name="voice"
          id="voice"
          onChange={(e) => setVoiceType(e.target.value)}
          className="input"
        >
          {voiceTypes.map((voice) => (
            <option key={voice} value={voice}>
              {voice.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Generated audio section, with generate button, generated audio, and delete button */}
        <button
          type="button"
          onClick={() => generateAudio()}
          className="text-lg blue-gradient rounded-lg py-2 px-3 text-white"
        >
          {generatingAudio ? "Generating Audio..." : "Generate Audio"}
        </button>

        {audioUrl && (
          <div className="flex gap-4 justify-center items-center">
            <audio controls className="">
              <source src={audioUrl} type="audio/mp3" />
            </audio>
            {/* <AudioAnalyzer audioUrl={audioUrl} /> */}
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                deleteAudio(audioFilepath);
              }}
            >
              Delete
            </button>
          </div>
        )}

        <label className="label">
          Image prompt
          <button
            type="button"
            onClick={() => generatePrompt()}
            className="blue-gradient rounded-lg py-2 px-3 text-white"
          >
            Generate Prompt
          </button>
          <textarea
            placeholder="write your image prompt here"
            value={prompt}
            className="card-input"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={() => generateImage()}
          className="blue-gradient rounded-lg py-2 px-3 text-white text-lg"
        >
          Generate Image
        </button>

        {generatingImage ? (
          <div className="mx-auto">
            <ClipLoader
              color={"#3b82f6"}
              loading={generatingImage}
              size={120}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : imageUrl ? (
          <div className="flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="generated image"
              className="w-60 h-60"
              width={500}
              height={500}
            />
          </div>
        ) : (
          <div>You haven't generated an image yet.</div>
        )}

        <button className="btn-secondary">
          {addingCard ? "Creating card..." : "Add card"}
        </button>
      </form>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <h2 className="text-3xl text-center">Front</h2>
        <div className="w-full flex flex-col gap-4 items-center rounded-md justify-center border border-blue-500 p-4 bg-white shadow-lg">
          <h1 className="text-9xl">{kanji?.kanji}</h1>
        </div>
        <h2 className="text-3xl text-center">Back</h2>
        <div className="w-full flex flex-col gap-4 items-center rounded-md justify-center border border-blue-500 p-4 bg-white shadow-lg">
          <h1 className="text-4xl">{kanji?.keyword}</h1>
          <h1 className="text-2xl">{kanji?.onyomi}</h1>
          <h1 className="text-2xl">{kanji?.kunyomi}</h1>
          {audioUrl && (
            <audio controls className="">
              <source src={audioUrl} type="audio/mp3" />
            </audio>
          )}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="generated image"
              className="w-60 h-60"
              width={500}
              height={500}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateKanjiForm;
