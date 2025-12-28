import { connect } from "@/app/(backend)/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/app/(backend)/models/property.model";
import { getDataFromToken } from "@/app/(backend)/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const adminId = await getDataFromToken(request);
        if (!adminId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const reqBody = await request.json();
        const {
            title,
            description,
            listingType,
            price,
            pricePeriod,
            address,
            propertyType,
            bedrooms,
            bathrooms,
            area,
            areaUnit,
            isFurnished,
            amenities,
            yearBuilt,
            virtualTourUrl,
            contact,
            images,
            status
        } = reqBody;

        const newProperty = new Property({
            title,
            description,
            listingType,
            price,
            pricePeriod,
            address,
            propertyType,
            bedrooms,
            bathrooms,
            area,
            areaUnit,
            isFurnished,
            amenities,
            yearBuilt,
            virtualTourUrl,
            contact,
            images,
            status,
            agent: adminId,
        });

        const savedProperty = await newProperty.save();

        return NextResponse.json({
            message: "Property added successfully",
            success: true,
            data: savedProperty,
        });
    } catch (error: unknown) {
        console.error('Error adding property:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    try {
        const properties = await Property.find();
        return NextResponse.json({
            message: "Properties found",
            success: true,
            data: properties,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
