import connectToDB from "@/utils/database";
import Card from "../../../models/card";


export const GET = async (req, res) => {
    try {
        await connectToDB();

        const cards = await Card.find();

        return new Response(JSON.stringify(cards), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}