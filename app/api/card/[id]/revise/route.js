import Card from "@/models/card"
import connectToDB from "@/utils/database"

export const PATCH = async (req, { params }) => {

    const { newInterval, pass } = await req.json()

    console.log(newInterval, pass)

    try {
        await connectToDB()

        let existingCard = await Card.findOne({ _id: params.id })
        console.log(existingCard)

        if (!existingCard) {
            return new Response('Card not found', { status: 404 })
        }

        existingCard.interval = newInterval;
        existingCard.lastStudied = new Date();
        if (pass) {
            existingCard.correctRevisions++;
        }
        existingCard.revisions++;

        console.log(existingCard);

        await existingCard.save()

        return new Response(JSON.stringify(existingCard), { status: 200 })
    } catch (error) {
        return new Response(`Failed to update card: ${error}`, { status: 500 })
    }
}