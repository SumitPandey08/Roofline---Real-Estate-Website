"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the PaymentDetails component with ssr: false
const PaymentDetails = dynamic(
  () => import("./PaymentDetails"),
  { ssr: false }
);

const PaymentSuccessPage = () => {
  return <PaymentDetails />;
};

export default PaymentSuccessPage;