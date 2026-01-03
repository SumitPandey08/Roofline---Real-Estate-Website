"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IAdmin } from "@/app/(backend)/models/admin.model";

const Seller: React.FC = () => {
  const [sellers, setSellers] = useState<IAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/get-all-sellers");
        if (response.ok) {
          const result = await response.json();
          setSellers(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm animate-pulse">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sellers.map((seller) => (
        <SellerCard key={seller._id.toString()} seller={seller} />
      ))}
    </div>
  );
};

interface SellerCardProps {
  seller: IAdmin;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  const isPro = seller.membership === "pro";
  const isAdvance = seller.membership === "advance";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm hover:shadow-md transition">
      <div className="flex-shrink-0">
        <Image
          src={seller.profilePhoto || "/logo.webp"}
          alt={seller.name}
          width={72}
          height={72}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900">{seller.name}</h2>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isPro
                ? "bg-yellow-100 text-yellow-700"
                : isAdvance
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isPro ? "🏆 House Expert Pro" : isAdvance ? "⭐ House Expert Advance" : "⭐ House Expert"}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
          {seller.specialization}
        </p>
        <div className="flex gap-4 mt-2 text-sm text-gray-600">
          <span>
            <strong className="text-gray-800">{seller.experience}+</strong> yrs experience
          </span>
          <span>
            <strong className="text-gray-800">{seller.properties.length}</strong> properties
          </span>
        </div>
      </div>
    </div>
  );
};

export default Seller;
