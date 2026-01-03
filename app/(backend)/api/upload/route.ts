import { NextRequest, NextResponse } from "next/server";
import { handleUpload } from "@/app/(backend)/lib/upload";
import { uploadOnCloudinary } from "@/app/(backend)/helpers/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { files, error } = await handleUpload(req);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    if (!files) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const urls = [];
    for (const filePath of files) {
      const result = await uploadOnCloudinary(filePath);
      if (result) {
        urls.push(result.secure_url);
      }
    }

    console.log("Uploaded URLs:", urls);
    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
