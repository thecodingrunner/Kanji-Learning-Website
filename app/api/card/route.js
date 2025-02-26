import connectToDB from "@/utils/database";
import Card from "../../../models/card";

export const GET = async (req, res) => {
    try {
        await connectToDB();

        // Extract query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;  // Default to page 1
        const limit = parseInt(searchParams.get("limit")) || 20;  // Default to 20 items per page
        const skip = (page - 1) * limit;  // Calculate the number of documents to skip

        const cards = await Card.aggregate([
            { 
                $group: {
                    _id: "$prompt",
                    count: { $sum: 1 },
                    doc: { $first: "$$ROOT" }
                }
            },
            { $match: { count: 1 } },
            { $replaceRoot: { newRoot: "$doc" } },
            { $skip: skip }, // Skip documents based on the page number
            { $limit: limit } // Limit results per page
        ]);

        return new Response(JSON.stringify(cards), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
