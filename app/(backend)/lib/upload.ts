import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function handleUpload(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  console.log("Files received on backend:", files.length);

  if (!files || files.length === 0) {
    return { error: "No files uploaded" };
  }

  const tempDir = join(process.cwd(), "public", "temp");
  if (!existsSync(tempDir)) {
    await mkdir(tempDir, { recursive: true });
  }

  const uploadedFiles = [];
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(tempDir, file.name);
    
    await writeFile(path, buffer);
    uploadedFiles.push(path);
  }

  return { files: uploadedFiles };
}