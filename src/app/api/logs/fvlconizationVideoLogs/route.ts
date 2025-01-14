import { z } from "zod";
import { authorizeUser } from "../../utils/authorizeUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateInput } from "../../utils/validation";
import { generateDownloadPresignedUrl } from "./utils/generateDownloadPresignedUrl";
import { occurance } from "@/utils/@types";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

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

export const GET = async (req : Request) => {
    try {
        const { isAuthorized, response, session } = await authorizeUser();
        if (!isAuthorized) return response;
        const userId = session?.user.userId as string

        //zod schema
        const schema = z.object({
            startDate : z.date().optional(),
            endDate : z.date().optional(),
            page : z.number().optional(),
            pageSize : z.number().optional()
        })

        // Get query params
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("startDate") || undefined;
        const endDate = searchParams.get("endDate") || undefined;
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "30", 10);

        //validate request body
        const validationBody = {startDate, endDate, page, pageSize}
        const {error} = validateInput(schema, validationBody)
        if(error) return error

        // Construct filters dynamically
        const dateFilter: any = {};
        if (startDate) dateFilter.gte = startDate;
        if (endDate) dateFilter.lte = endDate;

        // Fetch data with pagination
        const data = await prisma.fvlconizationVideoLogs.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                userId,
                ...(Object.keys(dateFilter).length && { date: dateFilter }),
            },
            orderBy: {
                date: 'desc',
            },
        });

    const transformdata = async () => {
      const detailedData = []
      for(let item of data){
        const thumbnailUrl = item.thumbnailS3Key ? await generateDownloadPresignedUrl(item.thumbnailS3Key) : undefined

        // Extract identified people in occurances
        const identifiedPeopleInOccurance: any[] = [];
        for (const dataItem of data as any[]) {
            for (const singleOccurance of dataItem.occurance as any[]) {
                let shouldBreak = false;
                for (const item of (singleOccurance.content || []) as any[]) {
                    if (item?.FaceMatches.length) {
                        identifiedPeopleInOccurance.push(singleOccurance);
                        shouldBreak = true; 
                        break;
                    }
                }
                if (shouldBreak) break;
            }
        }

        //Get the NIA details of the identified people
        const identifiedPeople = []
        for (const singleOccurance of identifiedPeopleInOccurance as any[]) {
            for (const item of (singleOccurance.content || []) as any[]) {
                if(!item?.FaceMatches.length)
                    continue
                const faceId = item?.FaceMatches[0].Face.FaceId
                const params = new QueryCommand({
                    TableName: process.env.NIA_TABLE,
                    IndexName: 'FaceIdIndex',  // Specify the GSI index name
                    KeyConditionExpression: "#FaceId = :faceId",
                    ExpressionAttributeNames: {
                        "#FaceId": "FaceId",
                    },
                    ExpressionAttributeValues: {
                        ":faceId": faceId,
                    }
                });
                const getUserDetails = await dynamoDb.send(params)
                const userDetails = getUserDetails.Items ? getUserDetails.Items[0] : undefined
                identifiedPeople.push(userDetails)
                break
            }
        }

        detailedData.push({
            ...item, 
            thumbnailUrl,
            identifiedPeople
        })
      }
      return detailedData
    }
    const detailedData = await transformdata()

    return NextResponse.json({ data : detailedData, page, pageSize }, { status: 200 });
    } catch (error : any) {
        console.error("An error occured:", error);
        return NextResponse.json(
          { error: "Failed to get logs", details: error.message },
          { status: 500 }
        );
    }
}