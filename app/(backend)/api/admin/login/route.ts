import connect from '@/app/(backend)/dbConfig/dbConfig';
import Admin from '@/app/(backend)/models/admin.model';
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

        let admin;
        if (email) {
            admin = await Admin.findOne({ email });
        } else if (phoneNo) {
            admin = await Admin.findOne({ phoneNo });
        }

        if (!admin) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, admin.password!);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
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
