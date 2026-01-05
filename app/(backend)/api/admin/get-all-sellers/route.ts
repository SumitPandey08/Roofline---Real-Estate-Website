import connect from "@/app/(backend)/dbConfig/dbConfig";
import Admin from "@/app/(backend)/models/admin.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    const sellers = await Admin.find({
      membership: { $in: ["pro", "advance"] },
    }).select("-password");

    return NextResponse.json({
      message: "Sellers found",
      data: sellers,
    });
  } catch (error: unknown) {
    console.error("Error fetching sellers:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
