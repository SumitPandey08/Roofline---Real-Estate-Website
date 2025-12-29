import User from "@/app/(backend)/models/user.model";
import { NextResponse } from "next/server";
import { connect } from '@/app/(backend)/dbConfig/dbConfig';

connect();

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
        const { phoneNo, verificationCode } = await request.json();
        if (!phoneNo) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }
        
        const user = await User.findOneAndUpdate(
            { phoneNo },
            { phoneNo },
            { upsert: true, new: true }
        );

        if (!verificationCode) {
            const code = verificationCodes();
            user.phoneVerificationCode = code;
            await user.save();
            // Here, you would typically send the code via SMS
            console.log(`Verification code sent to ${phoneNo}: ${code}`);
            return NextResponse.json({ message: "Verification code sent" }, { status: 200 });
        }

        if (user.phoneVerificationCode !== verificationCode) {
            return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
        }

        user.isPhoneVerified = true;
        user.phoneVerificationCode = undefined;
        await user.save();

        const response = NextResponse.json({ message: "Phone number verified successfully" }, { status: 200 });
        response.cookies.set("phone-verified", phoneNo, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 15, // 15 minutes
            sameSite: "strict",
            path: "/",
        });
        return response;
    } catch (error) {
        console.error("Error in phone verification:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}