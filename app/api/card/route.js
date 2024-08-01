import connectToDB from "@/utils/database";
import Card from "../../../models/card";


export const GET = async (req, res) => {
    try {
        await connectToDB();

        const cards = await Card.aggregate([
            // Group by the field you want to check for uniqueness
            { $group: {
              _id: "$kanji",
              count: { $sum: 1 },
              doc: { $first: "$$ROOT" }
            }},
            // Filter out groups with more than one document
            { $match: { count: 1 } },
            // Project only the original document
            { $replaceRoot: { newRoot: "$doc" } }
          ]);;

        return new Response(JSON.stringify(cards), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}