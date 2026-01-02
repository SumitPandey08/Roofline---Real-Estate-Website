import connect from "@/app/(backend)/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/app/(backend)/models/property.model";
import { getDataFromToken } from "@/app/(backend)/helpers/getDataFromToken";
import { ensureUserCredits } from "@/app/(backend)/helpers/creditChecker";

export async function POST(request: NextRequest) {
    try {
        await connect();
       const adminIdFromToken = await getDataFromToken(request);
        if (!adminIdFromToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. CHECK AND RENEW CREDITS FIRST (Lazy Renewal)
        // This ensures the user has their monthly credits if due, before we check balance.
        const admin = await ensureUserCredits(adminIdFromToken);

        // 2. Check if admin has enough credits
        if (admin.uploadCredit <= 0) {
            return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
        }

        const reqBody = await request.json();
        // ... (your destructuring)

        const newProperty = new Property({
            ...reqBody,
            agent: admin._id,
        });

        // 3. Save property AND decrement credit
        const savedProperty = await newProperty.save();
        
        // Decrement credit and save admin
        admin.uploadCredit -= 1;
        await admin.save();

        return NextResponse.json({
            message: "Property added successfully",
            success: true,
            remainingCredits: admin.uploadCredit,
            data: savedProperty,
        });

    } catch (error: unknown) {
        console.error('Error adding property:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

