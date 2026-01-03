import React from "react";
import ResearchInsight from "@/app/(frontend)/(ui)/components/Research&Insight";
import SellProperty from "@/app/(frontend)/(ui)/components/SellProperty";

import Seller from "@/app/(frontend)/(ui)/components/Seller";
import Card from "@/app/(frontend)/(ui)/components/highdemand/Card";
import { IProperty } from "@/app/(backend)/models/property.model";
import TopHightlight from "@/app/(frontend)/(ui)/components/TopHightlight";

interface HighlightData {
  name: string;
  price: string;
  type: string;
  location: string;
  image: string;
}

async function fetchFeaturedProperties(baseUrl: string): Promise<IProperty[]> {
  const res = await fetch(`${baseUrl}/api/property/get-featured-property`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch featured properties');
  }
  const result = await res.json();
  return result.data;
}

async function fetchProperties(baseUrl: string): Promise<IProperty[]> {
  const res = await fetch(`${baseUrl}/api/property/get-all-property?listingType=rent`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  const result = await res.json();
  return result.data.filter((property: IProperty) => property.listingType === 'rent');
}

const Rent: React.FC = async () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

  const properties = await fetchProperties(baseUrl);
  const featuredProperties = await fetchFeaturedProperties(baseUrl);

  const rentFeaturedProperties = featuredProperties.filter(p => p.listingType === 'rent');

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {rentFeaturedProperties.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Featured Properties for Rent
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Top picks for you
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rentFeaturedProperties.map((property) => (
                <Card key={property._id.toString()} data={property} />
              ))}
            </div>
          </section>
        )}
        <ResearchInsight />

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Properties for Rent
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Find your next home
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property._id.toString()} data={property} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Top Housing Experts
            </h2>
          </div>
          <Seller />
        </section>

        <SellProperty />
      </div>
    </div>
  );
};

export default Rent;
