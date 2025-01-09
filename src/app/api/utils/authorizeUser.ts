import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

export const authorizeUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.userId) {
      return {
        isAuthorized: false,
        response: NextResponse.json(
          { error: "Unauthorized or userId missing" },
          { status: 401 }
        ),
      };
    }
    return { isAuthorized: true, session };
  };