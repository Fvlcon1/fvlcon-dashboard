import { z } from "zod";
import { authorizeUser } from "../../utils/authorizeUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
    try {
        const { isAuthorized, response, session } = await authorizeUser();
        if (!isAuthorized) return response;
    
        const body = await req.json();
    
        //zod schema
        const schema = z.object({
            timeElapsed : z.number(),
            status : z.string(),
            thumbnailS3Key : z.string(),
            videoS3Key : z.string(),
            occurance : z.any()
        })
    
        //validate user
        const validation = schema.safeParse(body)
        if (validation.error?.issues) {
            return NextResponse.json(
            {
                error: "Validation error",
                details: validation.error.issues.map((issue) => issue.message),
            },
            { status: 400 }
            );
        }
    
        // Add a new record to the database
        const { timeElapsed, status, thumbnailS3Key, videoS3Key, occurance } = body;
        const result = await prisma.fvlconizationVideoLogs.create({
            data: {
                timeElapsed,
                status,
                thumbnailS3Key,
                occurance,
                videoS3Key,
                date: new Date(),
                userId: session?.user.userId as string,
            },
        });
        
        return NextResponse.json(
            {
              message: "Successful",
              data : result,
            },
            { status: 201 }
          );
    } catch (error : any) {
        console.error("Error adding log:", error);
        return NextResponse.json(
          { error: "Failed to add log", details: error.message },
          { status: 500 }
        );
    }
}