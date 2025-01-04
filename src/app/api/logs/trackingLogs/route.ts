import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { z } from 'zod'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export const GET = async (req: Request) => {
  try {
    //get query params
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    //find data
    const data = await prisma.personTracking.findMany()
    return NextResponse.json({ message: "Seccess", data }, { status: 200 });
  } catch (error : any) {
    console.error({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//Adding person tracking logs
export const POST = async (req: Request) => {
  try {
    //user validation
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
          );

    if(!session.user.userId)
        return NextResponse.json(
            { error: "No session userId found" },
            { status: 401 }
          );

    const body = await req.json();

    //zod schema
    const addTrackingLogsSchema = z.object({
        faceId : z.string(),
        locations : z.array(z.object({
            name : z.string(),
            coordinates : z.array(z.number()).length(2)
        })),
    })

    // Validate the request body
    const validation = addTrackingLogsSchema.safeParse(body)
    if(validation.error?.issues)
        return NextResponse.json(
            { error: "Validation error", details: validation.error.format() },
            { status: 400 }
          );


    // Add a new record to the database
    const { faceId, locations } = body;
    const newTracking = await prisma.personTracking.create({
      data: {
        faceId,
        locations,
        date: new Date(),
        userId : session.user.userId,
      },
    });

    return NextResponse.json(
      { message: "Person tracking log added successfully", newTracking },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding tracking log:", error);
    return NextResponse.json(
      { error: "Failed to add tracking log", details: error.message },
      { status: 500 }
    );
  }
};
