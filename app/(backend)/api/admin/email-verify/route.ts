import User from '@/app/(backend)/models/user.model'
import { NextResponse } from 'next/server';
import connect from '@/app/(backend)/dbConfig/dbConfig';

export async function POST(request: Request) {
    try {
        await connect();
        const { email, verificationCode } = await request.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!verificationCode) {
            return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
        }

        if (user.emailVerificationCode !== verificationCode) {
            return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
        }

        user.isEmailVerified = true;
        user.emailVerificationCode = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in email verification:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}