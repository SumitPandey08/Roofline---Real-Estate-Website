import { NextResponse, NextRequest } from "next/server";
import Property from "@/app/(backend)/models/property.model";
import { connect } from "@/app/(backend)/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest, { params }: { params: IParams }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid property ID" }, { status: 400 });
    }

    const property = await Property.findById(id).populate("savedBy").populate("seenBy");

    if (!property) {
      return NextResponse.json({ message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({
      savedBy: property.savedBy,
      seenBy: property.seenBy,
    });
  } catch (error:unknown) {
    console.error("Error fetching users for property:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
