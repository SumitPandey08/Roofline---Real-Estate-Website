import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProperty } from "@/app/(backend)/models/property.model";
import { AgentDTO } from "@/app/(frontend)/types/property";

interface DetailProps {
  property: IProperty | null;
}

const Detail: React.FC<DetailProps> = ({ property }) => {
  if (!property) {
    return (
      <section className="p-6 text-center text-gray-500">
        Property details not found
      </section>
    );
  }

  const imgSrc = property.images?.[0] || null;

  return (
    <>
    <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* IMAGE */}
          <div className="relative w-full h-56 md:h-full bg-gray-100 rounded-lg overflow-hidden">
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No image available
              </div>
            )}
          </div>

          {/* MAIN INFO */}
          <div className="md:col-span-2">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              {property.title}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {`${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`}
            </p>

            <p className="text-gray-600 mt-4">{property.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                property.propertyType,
                `${property.bedrooms} Beds`,
                `${property.bathrooms} Baths`,
                `${property.area} ${property.areaUnit}`,
                property.isFurnished ? "Furnished" : "Unfurnished",
                property.status,
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
            </div>

        <ul className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
  {(property.amenities ?? []).map((amenity) => (
    <li key={amenity} className="flex items-center gap-2">
      <svg
        className="w-4 h-4 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
      </svg>
      {amenity}
    </li>
  ))}
</ul>


            <div className="mt-4 text-sm text-gray-700 space-y-1">
              {property.agent && (
                <div>
                  <span className="font-medium">Seller:</span>{" "}
                  {property.agent && typeof property.agent === 'object' && 'name' in property.agent
                    ? (property.agent as unknown as AgentDTO).name
                    : "N/A"}
                </div>
              )}
              <div>
                <span className="font-medium">Listed:</span>{" "}
                {new Date(property.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Year Built:</span>{" "}
                {property.yearBuilt}
              </div>
            </div>
          </div>

          {/* PRICE + ACTIONS */}
          <aside className="flex flex-col gap-4 md:items-end md:justify-between">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ₹{property.price.toLocaleString()} {property.listingType === 'rent' && `/ ${property.pricePeriod}`}
              </div>
              <div className="text-sm text-gray-500">
                {`${(property.price / property.area).toFixed(2)}/${property.areaUnit}`}
              </div>
            </div>

            <div className="flex gap-2">
              {property.agent && typeof property.agent === 'object' && 'email' in property.agent && (
                <a
                  href={`mailto:${(property.agent as unknown as AgentDTO).email}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                >
                  Contact Agent
                </a>
              )}

              {property.virtualTourUrl && (
                <a
                  href={property.virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 transition"
                >
                  Virtual Tour
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
};

export default Detail;
