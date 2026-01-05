"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Fixed: Link is a default import
import { HiOutlineUser, HiOutlineOfficeBuilding, HiArrowRight } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md";

const SignupSelectionPage = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelection = (type: string) => {
    setSelected(type);
    // Slight delay for visual feedback before navigating
    setTimeout(() => {
      router.push(`/${type}/auth/phone-verify`);
    }, 400);
  };

  // Data array to avoid logic mismatches between the two cards
  const options = [
    {
      id: "user",
      title: "I'm a Buyer / Renter",
      description: "I want to find the perfect home, save my favorites, and contact listing agents directly.",
      icon: <HiOutlineUser size={32} />,
      color: "purple",
      features: ["Personalized property alerts", "Save & track listings"],
      buttonText: "Register as User",
    },
    {
      id: "admin", // Matches your URL logic
      title: "I'm a Broker / Dealer",
      description: "I want to list properties, manage leads, and access professional dashboard analytics.",
      icon: <HiOutlineOfficeBuilding size={32} />,
      color: "blue",
      features: ["Advanced inventory management", "Lead tracking & CRM tools"],
      buttonText: "Register as Pro",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
          Join Our Community
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Choose the account type that best fits your needs to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`group relative bg-white p-10 rounded-[2.5rem] shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
              selected === option.id
                ? option.id === "user" 
                  ? "border-purple-600 ring-4 ring-purple-50" 
                  : "border-blue-600 ring-4 ring-blue-50"
                : "border-transparent"
            }`}
          >
            <div className="flex flex-col h-full">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  selected === option.id
                    ? option.id === "user" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"
                    : option.id === "user" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                }`}
              >
                {option.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">{option.title}</h2>
              <p className="text-gray-500 mb-8 flex-grow">{option.description}</p>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <MdCheckCircle className={option.id === "user" ? "text-green-500" : "text-blue-500"} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className={`flex items-center font-bold transition-all ${
                  option.id === "user" ? "text-purple-600" : "text-blue-600"
                } ${selected === option.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                {option.buttonText} <HiArrowRight className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-gray-500">
        Already have an account?{" "}
        <Link href="/user/auth/login" className="text-purple-600 font-bold hover:underline">
          Sign in as a User
        </Link>
        <span className="mx-2">or</span>
        <Link href="/admin/auth/login" className="text-blue-600 font-bold hover:underline">
          Sign in as a Pro
        </Link>
      </p>
    </div>
  );
};

export default SignupSelectionPage;