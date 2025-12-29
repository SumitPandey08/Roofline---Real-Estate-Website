import { NextResponse , NextRequest } from "next/server";
import Property from "@/app/(backend)/models/property.model";
import { connect } from "@/app/(backend)/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Admin ID is required' }, { status: 400 });
        }

        // 1. FIX: Use ":" instead of "===" inside the object
        const adminProperties = await Property.find({ agent: id });

        return NextResponse.json({
            message: "Properties found",
            success: true,
            // 2. FIX: Ensure data matches the variable defined above
            data: adminProperties, 
        });
    } catch (error: unknown) {
        console.error('Error fetching properties:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}