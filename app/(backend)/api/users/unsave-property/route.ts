import User from "@/app/(backend)/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import connect from "../../../dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const { propertyId } = await request.json();

    if (!propertyId) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove property from savedProperties if present
    user.savedProperties = user.savedProperties.filter(
      (id) => id.toString() !== propertyId
    );
    await user.save();
    
    return NextResponse.json({
      message: "Property unsaved successfully",
      data: user.savedProperties,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}