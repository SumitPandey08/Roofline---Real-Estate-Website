import React from "react";
import Image from "next/image";

interface SellerData {
  name: string;
  rank: string;
  locations: string[];
  experience: number;
  profilepic: string;
  property: number;
}

interface SellerProps {
  data: SellerData;
}

const Seller: React.FC<SellerProps> = ({ data }) => {
  const {
    name,
    rank,
    locations,
    experience,
    profilepic,
    property,
  } = data;

  const isPro = rank === "house expert pro";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm hover:shadow-md transition">

      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <Image
          src={profilepic}
          alt={name}
          width={72}
          height={72}
          className="rounded-full object-cover"
        />
      </div>

      {/* Seller Info */}
      <div className="flex-1">

        {/* Name + Rank */}
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900">
            {name}
          </h2>

          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${
                isPro
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {isPro ? "🏆 House Expert Pro" : "⭐ House Expert"}
          </span>
        </div>

        {/* Locations */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
          {locations.join(", ")}
        </p>

        {/* Experience & Properties */}
        <div className="flex gap-4 mt-2 text-sm text-gray-600">
          <span>
            <strong className="text-gray-800">{experience}+</strong> yrs experience
          </span>
          <span>
            <strong className="text-gray-800">{property}</strong> properties
          </span>
        </div>
      </div>
    </div>
  );
};

export default Seller;
