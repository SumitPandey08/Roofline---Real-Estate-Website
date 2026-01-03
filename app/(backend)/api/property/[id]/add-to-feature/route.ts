import { NextResponse, NextRequest } from "next/server";
import Property, { IProperty } from "@/app/(backend)/models/property.model";
import connect from "@/app/(backend)/dbConfig/dbConfig";
import mongoose from "mongoose";


export async function PUT(request: NextRequest, context: { params: Promise<any> }) {
  try {
    await connect();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid property ID" }, { status: 400 });
    }

    const reqBody = await request.json();
    const { isFeatured, priority, featuredFrom, featuredTill, reason } = reqBody;

    const updatedFeatured: Partial<IProperty['featured']> = { isFeatured };

    if (priority !== undefined) updatedFeatured.priority = priority;
    if (featuredFrom !== undefined) updatedFeatured.featuredFrom = featuredFrom;
    if (featuredTill !== undefined) updatedFeatured.featuredTill = featuredTill;
    if (reason !== undefined) updatedFeatured.reason = reason;

    const property = await Property.findByIdAndUpdate(
      id,
      { $set: { featured: updatedFeatured } },
      { new: true, runValidators: true }
    );

    if (!property) {
      return NextResponse.json({ message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Property featured status updated successfully",
      success: true,
      property,
    });
  } catch (error: unknown) {
    console.error("Error updating property featured status:", error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}