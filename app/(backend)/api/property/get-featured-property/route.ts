import { NextResponse } from "next/server";
import Property from "@/app/(backend)/models/property.model";
import connect from "@/app/(backend)/dbConfig/dbConfig";
import mongoose from "mongoose";

export async function GET( response: NextResponse) {
  try {
       await connect();
       const featuredProperties = await Property.find({ "featured.isFeatured": true }).sort({ "featured.priority": -1 });
        return NextResponse.json({
            message: "Featured properties found",
            success: true,
            data: featuredProperties,
        });
  } catch (error: unknown) {
    console.error('Error fetching featured properties:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
 