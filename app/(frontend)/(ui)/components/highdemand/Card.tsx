import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoLocationOutline,
  IoBedOutline,
  IoWaterOutline,
} from "react-icons/io5";
import { IProperty } from "@/app/(backend)/models/property.model";

interface CardProps {
  data: IProperty;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const {
    _id,
    images,
    title,
    agent,
    propertyType,
    address,
    price,
    bedrooms,
    bathrooms,
    area,
    areaUnit,
    listingType,
    pricePeriod
  } = data;


  const finalAddress = `${address.street}, ${address.city}`;
  const isResidential = bedrooms && bathrooms;
  const isPlot = propertyType?.toLowerCase().includes("plot");
  const isCommercial = area && !isResidential;

  return (
    <div className="flex w-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* IMAGE */}
      <div className="relative w-32 sm:w-40 flex-shrink-0 bg-gray-100">
        {images && images.length > 0 && (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            sizes="160px"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between w-full p-3 sm:p-4">
        {/* TITLE + SELLER */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
            {title}
          </h2>
          {agent && (
            <p className="text-xs text-gray-400 mt-0.5">
              by <span className="font-medium">{typeof agent === 'string' ? agent : (agent as any).name}</span>
            </p>
          )}
        </div>

        {/* PRICE + META */}
        <div className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()} {listingType === 'rent' && `/ ${pricePeriod}`}</span>

          {isResidential && (
            <div className="flex gap-2 text-xs text-gray-600">
              <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                <IoBedOutline /> {bedrooms}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                <IoWaterOutline /> {bathrooms}
              </span>
            </div>
          )}

          {isCommercial && (
            <span className="text-xs text-gray-500">
              {area} {areaUnit}
            </span>
          )}

          {isPlot && !area && (
            <span className="text-xs text-gray-400 italic">
              Land available
            </span>
          )}
        </div>

        {/* LOCATION + CTA */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2">
          {finalAddress && (
            <div className="flex items-start text-xs text-gray-500 max-w-[70%]">
              <IoLocationOutline className="mr-1" />
              <span className="line-clamp-1">{finalAddress}</span>
            </div>
          )}

          {_id ? (
            <Link href={`/buy/${_id}`}>
              <button className="text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 px-3 py-1 rounded-md text-xs font-medium transition">
                View Details
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="text-gray-400 border border-gray-200 px-3 py-1 rounded-md text-xs font-medium"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
