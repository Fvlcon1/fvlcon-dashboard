import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/s3Client";
import { authorizeUser } from "../../utils/authorizeUser";
import { validateInput } from "../../utils/validation";

/**
 * Generates the image url from s3 key
 * @param s3Key string
 * @returns string
 */
const generatePresignedUrl = async (s3Key: string, bucketName? : string) => {
  try {
      const command = new GetObjectCommand({
        Bucket: bucketName ?? process.env.DETECTED_FACES_BUCKET,
        Key: s3Key,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 }); // URL valid for 60 minutes
      return url;
  } catch (error : any) {
      console.error({error})
      return NextResponse.json(
        { error: "Failed to generate presigned url", details: error.message },
        { status: 500 }
      );
  }
}

export const GET = async (req: Request) => {
  try {
    const { isAuthorized, response, session } = await authorizeUser();
    if (!isAuthorized) return response;
    const userId = session?.user.userId as string

    // Get query params
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    // Construct filters dynamically
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    // Fetch data with pagination
    const data = await prisma.personTracking.findMany({
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
        const params = new QueryCommand({
          TableName: process.env.NIA_TABLE,
          IndexName: 'FaceIdIndex',  // Specify the GSI index name
          KeyConditionExpression: "#FaceId = :faceId",
          ExpressionAttributeNames: {
              "#FaceId": "FaceId",
          },
          ExpressionAttributeValues: {
              ":faceId": item.faceId,
          }
        });
        const capturedImageUrl = item.S3Key ? await generatePresignedUrl(item.S3Key) : undefined
        const getUserDetails = await dynamoDb.send(params)
        const userDetails = getUserDetails.Items ? getUserDetails.Items[0] : undefined
        const userImageUrl = userDetails?.S3Key ? await generatePresignedUrl(userDetails.S3Key, process.env.FACE_IMAGES_BUCKET) : undefined
        detailedData.push({
            ...item, 
            imageUrl : capturedImageUrl, 
            details : {
                ...userDetails, 
                imageUrl : userImageUrl
            }
        })
      }
      return detailedData
    }
    const detailedData = await transformdata()

    return NextResponse.json({ data : detailedData, page, pageSize }, { status: 200 });
  } catch (error: any) {
    console.error({ error });
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { isAuthorized, response, session } = await authorizeUser();
    if (!isAuthorized) return response;

    const body = await req.json();

    // Zod schema
    const addTrackingLogsSchema = z.object({
      faceId: z.string(),
      S3Key : z.string(),
      locations: z.array(
        z.object({
          name: z.string(),
          coordinates: z.array(z.number()).length(2),
        })
      ),
    });

    // Validate the request body
    const {error} = validateInput(addTrackingLogsSchema, body)
    if(error) return error

    // Add a new record to the database
    const { faceId, locations, S3Key } = body;
    const newTracking = await prisma.personTracking.create({
      data: {
        faceId,
        locations,
        S3Key,
        date: new Date(),
        userId: session?.user.userId as string,
      },
    });

    return NextResponse.json(
      {
        message: "Person tracking log added successfully",
        newTracking,
      },
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
