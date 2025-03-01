// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions"
import Card from "@/models/card";
import User from "@/models/user";
import connectToDB from "@/utils/database"
import { getServerSession } from "next-auth";

export const PATCH = async (req, { params }) => {

  console.log(params.id)

  const session = await getServerSession(authOptions);

  if (!session) {
      return new Response("Unauthorized", { status: 401 });
  }

  console.log("Session:", session);

  let userId;

  if (session.user.id) {
      // If the id is already in the session, use it
      userId = session.user.id;
  } else if (session.user.email) {
      // If we have an email, find the user by email
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
          return new Response("User not found", { status: 404 });
      }
      userId = user.id.toString();
  } else {
      return new Response("Invalid session data", { status: 400 });
  }

  console.log("User ID:", userId);

  try {
      await connectToDB()

      let existingCard = await Card.findOne({ _id: params.id })
      console.log(existingCard)

      if (!existingCard) {
          return new Response('Card not found', { status: 404 })
      }

      existingCard.userIds = [...existingCard.userIds, userId]
      existingCard.users += 1

      await existingCard.save()

      return new Response(JSON.stringify(existingCard), { status: 200 })
  } catch (error) {
      return new Response("Failed to update card", { status: 500 })
  }
}