import connect from "@/app/(backend)/dbConfig/dbConfig";
import Property from "@/app/(backend)/models/property.model";
import User from "@/app/(backend)/models/user.model"; // ✅ REQUIRED
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    const property = await Property.findById(id)
      .populate("savedBy", "username email")
      .populate("seenBy", "username email")
      .lean();

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      savedBy: property.savedBy ?? [],
      seenBy: property.seenBy ?? [],
    });
  } catch (error) {
    console.error("API /property/[id]/users error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
