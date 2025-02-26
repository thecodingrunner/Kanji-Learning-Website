import OpenAI from "openai";

export const POST = async (request) => {
  let openai;

  try {
    // Ensure the OpenAI instance is created with the correct API key
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const prompt = await request.json();

    console.log(prompt);

    let image_url;

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data[0].url;
    } catch (error) {
      console.log(error);
    }

    console.log(image_url);

    return new Response(JSON.stringify(image_url), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
