"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoLocationOutline,
  IoBedOutline,
  IoWaterOutline,
} from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { PropertyDTO } from "@/app/(frontend)/types/property";

interface CardProps {
  data: PropertyDTO;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { agent } = data;

  const {
    _id,
    images,
    title,
    propertyType,
    address,
    price,
    bedrooms,
    bathrooms,
    area,
    areaUnit,
    listingType,
    pricePeriod,
  } = data;

  const finalAddress = `${address.street}, ${address.city}`;
  const isResidential = bedrooms && bathrooms;
  const isPlot = propertyType?.toLowerCase().includes("plot");
  const isCommercial = area && !isResidential;

  return (
    <div className="flex w-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* IMAGE */}
      <div className="relative w-32 sm:w-40 flex-shrink-0 bg-slate-100">
        {images?.length > 0 && (
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
          <h2 className="text-base font-semibold text-slate-900 line-clamp-2">
            {title}
          </h2>

          {agent && typeof agent === 'object' && 'name' in agent && (
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span className="text-slate-400">
                by{" "}
                <span className="font-medium text-slate-700">
                  {agent.name}
                </span>
              </span>

              {/* VERIFIED */}
              {(agent.membership === "pro" ||
                agent.membership === "advance") && (
                <MdVerified
                  className="text-blue-500"
                  size={14}
                  title="Verified Seller"
                />
              )}

              {/* PRO BADGE */}
              {agent.membership === "pro" && (
                <span className="ml-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold leading-none">
                  PRO
                </span>
              )}
            </div>
          )}
        </div>

        {/* PRICE + META */}
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-lg font-bold text-slate-900">
            ₹{price.toLocaleString()}
            {listingType === "rent" && (
              <span className="text-sm font-medium text-slate-500">
                {" "}
                / {pricePeriod}
              </span>
            )}
          </span>

          {isResidential && (
            <div className="flex gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                <IoBedOutline /> {bedrooms}
              </span>
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                <IoWaterOutline /> {bathrooms}
              </span>
            </div>
          )}

          {isCommercial && (
            <span className="text-xs text-slate-500">
              {area} {areaUnit}
            </span>
          )}

          {isPlot && !area && (
            <span className="text-xs text-slate-400 italic">
              Land available
            </span>
          )}
        </div>

        {/* LOCATION + CTA */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2">
          <div className="flex items-start text-xs text-slate-500 max-w-[70%]">
            <IoLocationOutline className="mr-1 mt-0.5" />
            <span className="line-clamp-1">{finalAddress}</span>
          </div>

          {_id ? (
            <Link href={`/buy/${_id}`}>
              <button className="text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 px-3 py-1 rounded-md text-xs font-semibold transition">
                View Details
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="text-slate-400 border border-slate-200 px-3 py-1 rounded-md text-xs font-medium"
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
