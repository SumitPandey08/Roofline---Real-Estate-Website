import connect from "@/app/(backend)/dbConfig/dbConfig";
import Property from "@/app/(backend)/models/property.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connect();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const property = await Property.findById(id)
    .populate(
      "agent",
      "name email phoneNo membership role profilePhoto experience propertySold"
    ) // ✅ REQUIRED
    .lean();

  if (!property) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: property });
}
