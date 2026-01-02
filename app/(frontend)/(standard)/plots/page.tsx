import React from "react";
import Image from "next/image";
import Card from "@/app/(frontend)/(ui)/components/highdemand/Card";
import Seller from "@/app/(frontend)/(ui)/components/Seller";

import { IProperty } from "@/app/(backend)/models/property.model";

async function fetchFeaturedProperties(baseUrl: string): Promise<IProperty[]> {
  const res = await fetch(`${baseUrl}/api/property/get-featured-property`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch featured properties');
  }
  const result = await res.json();
  return result.data;
}

async function fetchProperties(baseUrl: string): Promise<IProperty[]> {
  const res = await fetch(`${baseUrl}/api/property/get-all-property?propertyType=land`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  const result = await res.json();
  return result.data.filter((property: IProperty) => property.propertyType === 'land');
}


interface PlotType {
  id: string;
  name: string;
  image: string;
}

const plotTypes: PlotType[] = [
  {
    id: "corner-plot",
    name: "Corner Plots",
    image:
      "https://c.housingcdn.com/demand/s/client/common/assets/cornerPlots.24f32642.jpg",
  },
  {
    id: "boundary-wall",
    name: "Plots with Boundary Wall",
    image:
      "https://c.housingcdn.com/demand/s/client/common/assets/withBoundaryWalls.2a5d1a61.jpg",
  },
  {
    id: "east-facing",
    name: "East Facing Plots",
    image:
      "https://c.housingcdn.com/demand/s/client/common/assets/eastFacing.68e4fcb9.jpg",
  },
  {
    id: "below-30lakh",
    name: "Plots Below 30 Lakh",
    image:
      "https://c.housingcdn.com/demand/s/client/common/assets/below30Lacs.e683ac99.jpg",
  },
];

/* ---------------- PAGE ---------------- */

const Plot: React.FC = async () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

  const properties = await fetchProperties(baseUrl);
  const featuredProperties = await fetchFeaturedProperties(baseUrl);

  const plotFeaturedProperties = featuredProperties.filter(p => p.propertyType === 'plot');

  return (
    <div>
      {/* POPULAR PLOT TYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Popular Plot Types
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plotTypes.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={490}
                className="object-cover w-full h-70"
              />
            </div>
          ))}
        </div>
      </section>

      {plotFeaturedProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Featured Plots
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Top picks for you
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plotFeaturedProperties.map((property) => (
              <Card key={property._id} data={property} />
            ))}
          </div>
        </section>
      )}

      {/* HIGH DEMAND PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          High-demand projects to invest now
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Leading projects in high demand
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
            <Card key={index} data={property} />
          ))}
        </div>
      </section>

      {/* SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Top Housing Experts
          </h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all
          </button>
        </div>
        <Seller />
      </section>
    </div>
  );
};

export default Plot;
