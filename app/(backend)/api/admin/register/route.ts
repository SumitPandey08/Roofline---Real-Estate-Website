import connect from '@/app/(backend)/dbConfig/dbConfig';
import Admin from '@/app/(backend)/models/admin.model';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { uploadOnCloudinary } from '@/app/(backend)/helpers/cloudinary';

export async function POST(request: NextRequest) {
    try {
        await connect();
        const phoneNo = request.cookies.get('phone-verified')?.value;

        if (!phoneNo) {
            return NextResponse.json(
                { message: 'Unauthorized. Phone number not verified.' },
                { status: 401 }
            );
        }

        const data = await request.formData();
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const bio = data.get('bio') as string;
        const specialization = data.get('specialization') as string;
        const experienceString = data.get('experience') as string;
        const profilePhoto = data.get('profilePhoto') as File;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json(
                { message: 'Admin with this email already exists' },
                { status: 400 }
            );
        }

        let profilePhotoUrl = '';
        if (profilePhoto && profilePhoto.size > 0) {
            const bytes = await profilePhoto.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const tempDir = '/tmp';
            const tempFilePath = join(tempDir, profilePhoto.name);
            
            await writeFile(tempFilePath, buffer);
            
            const cloudinaryResponse = await uploadOnCloudinary(tempFilePath);
            if (cloudinaryResponse) {
                profilePhotoUrl = cloudinaryResponse.secure_url;
            }
        }
        
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const experience = parseInt(experienceString, 10);

        const adminData = {
            name,
            email,
            password: hashedPassword,
            bio,
            specialization,
            experience,
            phoneNo,
            profilePhoto: profilePhotoUrl,
            isVerified: true,
        };

        await Admin.findOneAndUpdate({ phoneNo }, adminData, { upsert: true });

        const response = NextResponse.json(
            { message: 'Admin registered successfully' },
            { status: 201 }
        );
        
        // Clear the cookie after successful registration
        response.cookies.set('phone-verified', '', { maxAge: -1 });

        return response;

    } catch (error) {
        console.error('Error registering admin:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}