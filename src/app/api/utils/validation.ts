import { NextResponse } from "next/server";
import { z } from "zod";

export const validateInput = (
  validationSchema: z.ZodType<any>, 
  validationBody: any
): { error?: NextResponse; success?: boolean } => {
  const validation = validationSchema.safeParse(validationBody);

  if (!validation.success) {
    return {
      error: NextResponse.json(
        {
          error: "Validation error",
          details: validation.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      ),
    };
  }

  return { success: true };
};