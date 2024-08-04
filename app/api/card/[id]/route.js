import connectToDB from "@/utils/database";
import Card from "../../../../models/card";

export const GET = async (req, { params }) => {

    try {
        await connectToDB();

        const card = await Card.find({ _id: params.id });
        if (!card) return new Response("Card not found", { status: 404 })

        return new Response(JSON.stringify(card), { status: 200 })
    } catch (error) {
        return new Reponse(error, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {

    const { rating } = await req.json()

    console.log(rating)

    try {
        await connectToDB()

        let existingCard = await Card.findOne({ _id: params.id })
        console.log(existingCard)

        if (!existingCard) {
            return new Response('Card not found', { status: 404 })
        }

        if (existingCard.reviews === 0) {
            existingCard.rating = rating
            existingCard.reviews += 1
        } else {
            existingCard.rating = ((existingCard.rating * existingCard.reviews) + rating) / (existingCard.reviews + 1)
            existingCard.reviews += 1
        }

        console.log(existingCard)

        await existingCard.save()

        return new Response(JSON.stringify(existingCard), { status: 200 })
    } catch (error) {
        return new Response("Failed to update card", { status: 500 })
    }
}