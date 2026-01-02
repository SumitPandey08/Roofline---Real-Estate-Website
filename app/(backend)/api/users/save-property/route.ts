import User from "@/app/(backend)/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import connect from "../../../dbConfig/dbConfig";
import Property from "@/app/(backend)/models/property.model";

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

    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Add property to savedProperties if not already present
    if (!user.savedProperties.includes(propertyId)) {
      property.savedBy.push(userId);
      await property.save();
      user.savedProperties.push(propertyId);
      await user.save();
    }

    return NextResponse.json({
      message: "Property saved successfully",
      data: user.savedProperties,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}