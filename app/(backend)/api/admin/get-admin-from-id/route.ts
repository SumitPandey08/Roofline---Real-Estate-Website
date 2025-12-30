import connect from "@/app/(backend)/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/(backend)/models/admin.model";
import mongoose from "mongoose";

interface IParams {
    id: string;
}

export async function GET(request: NextRequest, context: { params: IParams}) {
  try {
    await connect();
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid property ID" }, { status: 400 });
    }

    const admin = await Admin.findById(id).select('-password -emailVerificationCode -phoneVerificationCode');

    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Admin found",
      success: true,
      data: admin,
    });

  } catch (error: unknown) {
    console.error('Error fetching admin by ID:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
