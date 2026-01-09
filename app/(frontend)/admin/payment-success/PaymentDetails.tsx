"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
// import { ITransaction } from "@/app/(backend)/models/transaction.model"; // Remove this import

// Define the ITransaction interface to reflect the populated admin object
export interface ITransaction {
  _id: string;
  admin: {
    _id: string;
    name: string;
  };
  amount: number;
  currency: string;
  status: string;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
}

const PaymentDetails = () => {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const [transaction, setTransaction] = useState<ITransaction | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentIntentId) {
      const fetchTransaction = async () => {
        try {
          const { data } = await axios.get(
            `/api/transactions/by-payment-intent/${paymentIntentId}`
          );
          setTransaction(data);
        } catch (error) {
          console.error("Error fetching transaction:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransaction();
    } else {
      setLoading(false);
    }
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Your membership has been activated.
          </p>
        </div>
        {transaction && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Transaction Details
            </h2>
            <div className="mt-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Transaction ID:</p>
                <p className="text-gray-800 font-semibold">{transaction._id}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Admin:</p>
                <p className="text-gray-800 font-semibold">
                  {transaction.admin.name}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Amount:</p>
                <p className="text-gray-800 font-semibold">
                  {transaction.amount / 100} {transaction.currency.toUpperCase()}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Status:</p>
                <p className="text-gray-800 font-semibold">
                  {transaction.status}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Date:</p>
                <p className="text-gray-800 font-semibold">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            href="/admin/dashboard/revenue"
            className="text-white bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md"
          >
            Go to Revenue Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;