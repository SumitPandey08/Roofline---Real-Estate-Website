import React from "react";
import ResearchInsight from "@/app/(frontend)/(ui)/components/Research&Insight";
import TopHightlight from "@/app/(frontend)/(ui)/components/TopHightlight";
import Card from "@/app/(frontend)/(ui)/components/highdemand/Card";
import SellProperty from "@/app/(frontend)/(ui)/components/SellProperty";

import Seller from "@/app/(frontend)/(ui)/components/Seller";
import { IProperty } from "@/app/(backend)/models/property.model";

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
  const res = await fetch(`${baseUrl}/api/property/get-all-property`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  const result = await res.json();
  return result.data;
}


const Buy: React.FC = async () => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const properties = await fetchProperties(baseUrl);
  const featuredProperties = await fetchFeaturedProperties(baseUrl);

  const saleFeaturedProperties = featuredProperties.filter(p => p.listingType === 'sale');

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {saleFeaturedProperties.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Top picks for you
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saleFeaturedProperties.map((property) => (
                <Card key={property._id.toString()} data={property} />
              ))}
            </div>
          </section>
        )}

        <ResearchInsight />

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            High-demand projects to invest now
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Leading projects in high demand
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

export default Buy;
