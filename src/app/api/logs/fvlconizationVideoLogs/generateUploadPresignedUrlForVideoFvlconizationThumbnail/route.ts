import s3 from "@/lib/s3Client";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateInput } from "../../../utils/validation";

export const GET = async (req : Request) => {
    try {
        //zod schema
        const schema = z.object({
            s3Key : z.string()
        })

        // Get query params
        const { searchParams } = new URL(req.url);
        const s3Key = searchParams.get("s3Key");

        //validate request body
        const validationBody = {s3Key}
        const {error} = validateInput(schema, validationBody)
        if(error) return error

        const command = new PutObjectCommand({
          Bucket: process.env.VIDEO_ANALYSIS_THUMBNAIL_BUCKET,
          Key: s3Key!,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 }); // URL valid for 60 minutes
        return NextResponse.json(
            { message: "Successful", url }
          );
    } catch (error : any) {
        console.error({error})
        return NextResponse.json(
          { error: "Failed to generate upload presigned url", details: error.message },
          { status: 500 }
        );
    }
  }