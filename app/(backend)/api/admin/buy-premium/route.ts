import connect from "@/app/(backend)/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/(backend)/models/admin.model";
import { getDataFromToken } from "@/app/(backend)/helpers/getDataFromToken";

export async function POST(request: NextRequest) {
    try {
        await connect();
       const adminIdFromToken = await getDataFromToken(request);
        if (!adminIdFromToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const reqBody = await request.json(); // this will be pro or advance

        if(!['pro', 'advance'].includes(reqBody.membership)) {
            return NextResponse.json({ error: "Invalid membership type" }, { status: 400 });
        }

        const admin = await Admin.findById(adminIdFromToken);

        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }
        
        // Update membership and membershipLastDate
        admin.membership = reqBody.membership;
        const newMembershipDate = new Date();
        newMembershipDate.setMonth(newMembershipDate.getMonth() + 1); // extend by 1 month
        admin.membershipLastDate = newMembershipDate;
        admin.uploadCredit += reqBody.membership === 'pro' ? 30 : 15; // add credits based on membership
        await admin.save();
        
        return NextResponse.json({
            message: "Membership upgraded successfully",
            success: true,
            data: {
                membership: admin.membership,
                membershipLastDate: admin.membershipLastDate,
                uploadCredit: admin.uploadCredit
            },
        });
    } catch (error: unknown) {
        console.error('Error upgrading membership:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}


        