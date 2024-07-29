import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const POST = async (request) => {

  const { onyomi, kunyomi, keyword } = await request.json();

  const DEFAULT_PROMPT = `using the pronunciation of the following characters and the word ${keyword}, write a one sentence story: ${onyomi}  ${kunyomi}. Don't use the japanese characters.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: DEFAULT_PROMPT },
      ],
    });

    console.log(completion.choices[0].message.content)

    return new Response(JSON.stringify(completion.choices[0].message.content), { status: 200 })
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Reponse(error, { status: 500 })
  }
}