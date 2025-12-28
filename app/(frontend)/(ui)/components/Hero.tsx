"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PropertyType {
  id: string;
  type: string;
  route: string;
  heroImg: string;
}

const propertyTypes: PropertyType[] = [
  {
    id: "buy",
    type: "Buy",
    route: "/buy",
    heroImg:
      "https://c.housingcdn.com/demand/s/client/common/assets/buyCover.36ede2d6.jpg",
  },
  {
    id: "rent",
    type: "Rent",
    route: "/rent",
    heroImg:
      "https://c.housingcdn.com/demand/s/client/common/assets/rentCover.c47ae7d7.jpg",
  },
  {
    id: "pg",
    type: "PG ",
    route: "/pg",
    heroImg:
      "https://c.housingcdn.com/demand/s/client/common/assets/pgCover.d07e5816.jpg",
  },
  {
    id: "plots",
    type: "Plots",
    route: "/plots",
    heroImg:
      "https://c.housingcdn.com/demand/s/client/common/assets/plotsCover.effff013.jpg",
  },
  {
    id: "commercial",
    type: "Commercial",
    route: "/commercial",
    heroImg:
      "https://c.housingcdn.com/demand/s/client/common/assets/commercialCover.c5df3aef.jpg",
  },
];

const locations: string[] = ["Indore", "Bhopal", "Mumbai", "Pune", "Bangalore"];

const Hero: React.FC = () => {
  const router = useRouter();

  const [currentLocation, setCurrentLocation] = useState<string>("Indore");
  const [activeType, setActiveType] = useState<string>("Buy");

  // 🔑 active config from state
  const activeConfig = useMemo(
    () => propertyTypes.find((item) => item.type === activeType),
    [activeType]
  );

  // 🔁 handle tab change + routing
  const handleTypeChange = (item: PropertyType) => {
    setActiveType(item.type);
    router.push(item.route);
  };

  // 🔍 search routing
  const handleSearch = () => {
    if (activeConfig) {
      router.push(`${activeConfig.route}?location=${currentLocation}`);
    }
  };

  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      {/* Background */}
      {activeConfig && (
        <Image
          src={activeConfig.heroImg}
          alt={`${activeType} background`}
          fill
          priority
          className="object-cover z-0"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white pt-20 px-4">
        {/* Heading */}
        <div className="text-center mb-8 -mt-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            Find Your Dream Property in {currentLocation}
          </h1>
          <p className="text-lg text-gray-200">
            6k+ listings added daily and 65k+ verified properties
          </p>
        </div>

        {/* Property Type Pills */}
        <nav className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-8">
          {propertyTypes.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTypeChange(item)}
              className={`px-5 py-2 text-sm font-semibold transition
                ${
                  activeType === item.type
                    ? "bg-white text-blue-700 rounded-lg shadow"
                    : "text-gray-200 hover:text-white"
                }`}
            >
              {item.type}
            </button>
          ))}
        </nav>

        {/* Search Box */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
          <select
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="md:w-48 p-3 bg-gray-100 rounded-lg text-gray-800 font-semibold"
          >
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search for property, locality, builder..."
            className="flex-grow p-3 rounded-lg border focus:border-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Continue Search */}
        <div className="mt-6">
          {activeConfig && (
            <Link
              href={`${activeConfig.route}?location=${currentLocation}`}
              className="text-gray-300 hover:text-white text-sm underline"
            >
              Continue last search: {currentLocation} ({activeType})
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
