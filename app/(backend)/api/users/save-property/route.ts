import User from "@/app/(backend)/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import connect from "../../../dbConfig/dbConfig";
import Property from "@/app/(backend)/models/property.model";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { propertyId } = await request.json();

    console.log("userId:", userId);
    console.log("propertyId:", propertyId);

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
    if (!user.savedProperties.map(String).includes(propertyId)) {
      property.savedBy.push(userId as any);
      await property.save();
      user.savedProperties.push(propertyId as any);
      await user.save();
    }

    return NextResponse.json({
      message: "Property saved successfully",
      data: user.savedProperties,
    });
  } catch (error: any) {
    console.error("Error saving property:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}