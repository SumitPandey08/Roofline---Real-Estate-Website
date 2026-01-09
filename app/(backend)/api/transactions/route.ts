import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/app/(backend)/models/transaction.model";
import connect from "@/app/(backend)/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const transactions = await Transaction.find({}).populate("admin", "name");
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}