import React from "react";
import Card from "@/app/(frontend)/(ui)/components/highdemand/Card";
import SellProperty from "@/app/(frontend)/(ui)/components/SellProperty";
import ResearchInsight from "@/app/(frontend)/(ui)/components/Research&Insight";

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
  const res = await fetch(`${baseUrl}/api/property/get-all-property?propertyType=commercial`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  const result = await res.json();
  return result.data.filter((property: IProperty) => property.propertyType === 'commercial');
}


const Commercial: React.FC = async () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

  const properties = await fetchProperties(baseUrl);
  const featuredProperties = await fetchFeaturedProperties(baseUrl);

  const commercialFeaturedProperties = featuredProperties.filter(p => p.propertyType === 'commercial');
  const commercialSale = properties.filter(p => p.listingType === 'sale');
  const commercialRent = properties.filter(p => p.listingType === 'rent');

  return (
    <div>
      {commercialFeaturedProperties.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 pb-2">
            Featured Commercial Properties
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Top picks for you
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commercialFeaturedProperties.map((property) => (
              <Card key={property._id.toString()} data={property} />
            ))}
          </div>
        </section>
      )}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 pb-2">
          Recently Added Properties for Sale
        </h2>
        <p className="text-lg text-gray-600 mb-8">Shops in high demand</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commercialSale.map((property) => (
            <Card key={property._id.toString()} data={property} />
          ))}
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 pb-2">
          Recently Added Properties for Rent
        </h2>
        <p className="text-lg text-gray-600 mb-8">Shops in high demand</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commercialRent.map((property) => (
            <Card key={property._id.toString()} data={property} />
          ))}
        </div>
      </section>

      <ResearchInsight />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Header */}
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

      <SellProperty />
    </div>
  );
};

export default Commercial;
