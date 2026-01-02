import connect from "@/app/(backend)/dbConfig/dbConfig";
import Property from "@/app/(backend)/models/property.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const propertyType = request.nextUrl.searchParams.get("propertyType");
        const listingType = request.nextUrl.searchParams.get("listingType");

        const query: Record<string, any> = {};
        if (propertyType) {
            query.propertyType = propertyType;
        }
        if (listingType) {
            query.listingType = listingType;
        }

        const properties = await Property.find(query).populate('agent', 'name membership');

        return NextResponse.json({
            message: "Properties fetched successfully",
            data: properties,
        });
    } catch (error: unknown) {
        console.error("Error fetching properties:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
