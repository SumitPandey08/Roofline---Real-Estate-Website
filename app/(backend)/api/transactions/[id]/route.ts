import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/app/(backend)/models/transaction.model";
import connect from "@/app/(backend)/dbConfig/dbConfig";

connect();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const transaction = await Transaction.findById(resolvedParams.id).populate(
      "admin",
      "name"
    );
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}