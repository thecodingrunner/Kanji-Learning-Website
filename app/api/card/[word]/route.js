import connectToDB from "@/utils/database";
import Card from "../../../../models/card";

export const GET = async (req, { params }) => {

    try {
        await connectToDB();

        const card = await Card.find({ keyword: params.word });
        if (!card) return new Response("Card not found", { status: 404 })

        return new Response(JSON.stringify(card), { status: 200 })
    } catch (error) {
        return new Reponse(error, { status: 500 })
    }
}