import axios from "axios";

export const uploadToS3 = async (presignedUrl: string, data: File | Blob | string | Buffer): Promise<{ success?: boolean; error?: any }> => {
  try {
    // Determine the content type dynamically
    const contentType =
      data instanceof File || data instanceof Blob
        ? data.type
        : typeof data === "string"
        ? "text/plain"
        : "application/octet-stream"; // Default for binary data like Buffer

    const response = await axios.put(presignedUrl, data, {
      headers: { "Content-Type": contentType },
    });

    if (response.status !== 200) {
      throw new Error("Unable to upload data to S3");
    }

    return { success: true };
  } catch (error: any) {
    console.log({ error });
    return { error: `S3 upload failed: ${error.message}` };
  }
};
