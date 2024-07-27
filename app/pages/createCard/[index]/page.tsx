"use client";

import { kanjiObjectArray } from "@/public/data";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface kanjiObject {
  kanji?: string | undefined;
  onyomi: string | undefined;
  kunyomi?: string | undefined;
  keyword: string | undefined;
}

const page = () => {
  const { index } = useParams();

  const [kanji, setKanji] = useState<kanjiObject>({
    kanji: undefined,
    onyomi: undefined,
    kunyomi: undefined,
    keyword: undefined,
  });
  const [prompt, setPrompt] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const kanjiTemp = kanjiObjectArray[Number(index)];
    setKanji(kanjiTemp);
    console.log(kanjiTemp);
  }, []);

  async function generateImage() {

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    const imageUrlTemp = await response.json();

    console.log(imageUrlTemp)

    setImageUrl(imageUrlTemp)
  }

  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl])

  return (
    <div>
      <form className="flex flex-col gap-8">
        <label>
          Kanji
          <input type="string" placeholder={kanji.kanji} className="ml-4 border" />
        </label>
        <label>
          Keyword
          <input type="string" placeholder={kanji.keyword} className="ml-4 border" />
        </label>
        <label>
          Onyomi
          <input type="string" placeholder={kanji.onyomi} className="ml-4 border" />
        </label>
        <label>
          Kunyomi
          <input type="string" placeholder={kanji.kunyomi} className="ml-4 border" />
        </label>
        <label>
          Image prompt
          <input type="string" placeholder='write your image prompt here' className="ml-4 border" onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button type="button" onClick={() => generateImage()}>Generate</button>
        {imageUrl && (
          <img src={imageUrl} alt="generated image" className="w-60 h-60" />
        )}
      </form>
    </div>
  );
};

export default page;
