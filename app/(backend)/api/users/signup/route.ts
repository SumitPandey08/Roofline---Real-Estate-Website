import User from '@/app/(backend)/models/user.model';
import { NextResponse , NextRequest } from 'next/server';
import connect from '@/app/(backend)/dbConfig/dbConfig';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        await connect();
        const body = request.json() ;
        const { username, email, password, phoneNo } = await body;
        console.log("Received data:", { username, email, password, phoneNo });
        if (!username || !email || !password || !phoneNo) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const existingUser = await User.findOne({ phoneNo });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (!existingUser.isPhoneVerified) {
            return NextResponse.json({ error: "Phone not verified" }, { status: 403 });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        existingUser.username = username;
        existingUser.email = email;
        existingUser.password = hashedPassword;

        const savedUser = await existingUser.save();
        console.log("User created successfully:", savedUser);
        return NextResponse.json({
            message: "User created Successfully",
            user: savedUser
        }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/users/signup:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}