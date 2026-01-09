import stripe from "@/app/(backend)/helpers/stripe.helper";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/app/(backend)/helpers/getDataFromToken";
import Admin from "@/app/(backend)/models/admin.model";

const plans: { [key: string]: { amount: number } } = {
  advance: { amount: 5000 }, // 50 INR
  pro: { amount: 15000 }, // 150 INR
};

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();
    const adminId = await getDataFromToken(request);
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (!plan || !plans[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const amount = plans[plan].amount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      metadata: {
        integration_check: "accept_a_payment",
        adminId: admin._id.toString(),
        plan: plan,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}