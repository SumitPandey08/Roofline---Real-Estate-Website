
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Admin from "@/app/(backend)/models/admin.model";
import Transaction from "@/app/(backend)/models/transaction.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { adminId, plan } = paymentIntent.metadata;

      if (!adminId || !plan) {
        return NextResponse.json({ error: "Admin ID or plan not found in metadata" }, { status: 400 });
      }

      try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
          return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        admin.membership = plan as "advance" | "pro";
        admin.membershipLastDate = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        );
        admin.uploadCredit += plan === 'pro' ? 30 : 15;
        await admin.save();

        const transaction = new Transaction({
          admin: adminId,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
        });

        await transaction.save();

      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
