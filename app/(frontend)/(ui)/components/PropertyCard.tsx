"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PropertyDTO } from "@/app/(frontend)/types/property";
import { HiOutlineMapPin, HiOutlineCurrencyRupee } from "react-icons/hi2";

interface PropertyCardProps {
  property: PropertyDTO;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <Link href={`/buy/${property._id}`}>
        <div className="relative h-48">
          <Image
            src={property.images[0] || "/herobg.webp"}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 truncate">
            {property.title}
          </h3>
          <p className="text-slate-500 flex items-center gap-1 mt-1">
            <HiOutlineMapPin />
            {property.address.street}, {property.address.city}
          </p>
          <div className="mt-4">
            <p className="text-2xl font-black text-blue-600">
              ₹{property.price.toLocaleString()}
              {property.listingType === "rent" && ` / ${property.pricePeriod}`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
