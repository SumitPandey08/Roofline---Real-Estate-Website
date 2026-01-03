import connect from '@/app/(backend)/dbConfig/dbConfig';
import User from '@/app/(backend)/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { email, phoneNo, password } = await request.json();

        if ((!email && !phoneNo) || !password) {
            return NextResponse.json({ message: 'Email or phone number and password are required' }, { status: 400 });
        }

        let user;
        if (email) {
            user = await User.findOne({ email });
        } else if (phoneNo) {
            user = await User.findOne({ phoneNo });
        }

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create token
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined in environment variables');
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development', // Uncomment for production
            
        });

        return response;

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
