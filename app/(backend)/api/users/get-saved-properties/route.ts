import { getDataFromToken } from "@/app/(backend)/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/(backend)/models/user.model";
import connect from "@/app/(backend)/dbConfig/dbConfig";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(userId).populate({
      path: "savedProperties",
      model: "Property",
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Saved properties found",
      data: user.savedProperties,
    });
  } catch (error: unknown) {
    console.error("Error fetching saved properties:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
