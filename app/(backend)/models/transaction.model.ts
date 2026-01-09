import mongoose, { Document, Model } from "mongoose";

export interface ITransaction extends Document {
  admin: mongoose.Schema.Types.ObjectId;
  amount: number;
  currency: string;
  status: string;
  paymentIntentId: string;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;