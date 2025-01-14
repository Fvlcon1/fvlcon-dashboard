import s3 from "@/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

/**
 * Generates the image url from s3 key
 * @param s3Key string
 * @returns string
 */
export const generateDownloadPresignedUrl = async (s3Key: string, bucketName? : string) => {
    try {
        const command = new GetObjectCommand({
          Bucket: bucketName ?? process.env.VIDEO_ANALYSIS_THUMBNAIL_BUCKET,
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