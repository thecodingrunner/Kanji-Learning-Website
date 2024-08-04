import connectToDB from "@/utils/database";
import Card from "../../../../models/card";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import fetch from "node-fetch";

export const POST = async (req) => {
  const card = await req.json();

  console.log(card);

  let downloadURL = "";

  try {
    // Fetch the image as a buffer
    const responseBuffer = await fetch(card.imageUrl);
    const buffer = Buffer.from(await responseBuffer.arrayBuffer());

    // Generate a unique filename
    const filename = `${Date.now()}-image.jpg`;

    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `images/${filename}`);

    // Upload the file
    await uploadBytes(storageRef, buffer);

    // Get the download URL
    downloadURL = await getDownloadURL(storageRef);

    console.log("File available at", downloadURL);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  try {
    await connectToDB();
    const newCard = new Card({
      author: card.author,
      userIds: card.userIds,
      kanji: card.kanji,
      onyomi: card.onyomi,
      kunyomi: card.kunyomi,
      keyword: card.keyword,
      prompt: card.prompt,
      imageUrl: downloadURL,
      users: card.users,
      reviews: card.reviews,
      rating: card.rating,
    });

    await newCard.save();

    return new Response("Successful", { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
