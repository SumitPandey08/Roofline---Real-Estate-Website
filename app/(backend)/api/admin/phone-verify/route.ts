import Admin from "@/app/(backend)/models/admin.model";
import { NextResponse } from "next/server";
import connect from '@/app/(backend)/dbConfig/dbConfig';

const verificationCodes = () => {
    const numArr = ['0' , '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let code = '' ;
    for(let i=0; i<6; i++) {
        const randIndex = Math.floor(Math.random() * 10) ;
        code += numArr[randIndex] ;
    }
    return code ;
}

export async function POST(request: Request) {
    try {
        await connect();
        const { phoneNo, verificationCode } = await request.json();
        if (!phoneNo) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        // Scenario 1: Client is providing a verification code to be checked.
        if (verificationCode) {
            const admin = await Admin.findOne({ phoneNo });

            if (!admin) {
                return NextResponse.json({ error: "Admin not found. Please request a verification code first." }, { status: 404 });
            }

            if (admin.phoneVerificationCode !== verificationCode) {
                return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
            }

            const response = NextResponse.json({ message: "Phone number verified successfully" }, { status: 200 });
            response.cookies.set("phone-verified", phoneNo, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 15, // 15 minutes
                sameSite: "strict",
                path: "/",
            });
            return response;
        } 
        // Scenario 2: Client is requesting a new verification code.
        else {
            // Check if a fully verified admin already exists with this number.
            const existingAdmin = await Admin.findOne({ phoneNo });
            if (existingAdmin && existingAdmin.isVerified) {
                return NextResponse.json({ error: "An admin with this phone number is already registered." }, { status: 400 });
            }

            const code = verificationCodes();
  
            await Admin.findOneAndUpdate(
                { phoneNo },
                { phoneNo, phoneVerificationCode: code, isVerified: false },
                { upsert: true, new: true }
            );

            console.log(`Verification code sent to ${phoneNo}: ${code}`);
            return NextResponse.json({ message: "Verification code sent" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error in phone verification:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}