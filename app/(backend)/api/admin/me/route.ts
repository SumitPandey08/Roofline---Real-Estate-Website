// Trigger reload
import { getDataFromToken } from '@/app/(backend)/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import Admin from '@/app/(backend)/models/admin.model';
import connect from '@/app/(backend)/dbConfig/dbConfig';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
    try {
        await connect();
        const adminId = await getDataFromToken(request);
        if (!adminId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return NextResponse.json({ error: 'Invalid admin ID' }, { status: 400 });
        }

        const admin = await Admin.findOne({ _id: adminId }).select('-password').populate('properties');
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }
        return NextResponse.json({
            message: 'Admin found',
            data: admin,
        });
    } catch (error: unknown) {
        console.error('Error fetching admin data:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
