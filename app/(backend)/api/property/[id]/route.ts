import { connect } from "@/app/(backend)/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/app/(backend)/models/property.model";
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest, { params }: { params: IParams }) {
    try {
        const awaitedParams = await params;
        const id = awaitedParams.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
        }

        const property = await Property.findById(id).populate('agent', '-password');

        console.log(property);

        if (!property) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Property found",
            success: true,
            data: property,
        });
    } catch (error: unknown) {
        console.error('Error fetching property:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: IParams}) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
        }

        const updatedProperty = await Property.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!updatedProperty) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Property updated successfully",
            success: true,
            property: updatedProperty,
        });
    } catch (error: unknown) {
        console.error('Error updating property:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
