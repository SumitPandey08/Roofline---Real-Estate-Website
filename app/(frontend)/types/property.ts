

import mongoose from "mongoose";

export interface PropertyDTO {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  images: string[];
  description: string;

  listingType: "sale" | "rent";
  price: number;
  pricePeriod?: string;

  address: {
    street?: string;
    city?: string;
  };

  propertyType:
    | "apartment"
    | "house"
    | "condo"
    | "land"
    | "commercial"
    | "office"
    | "pg"
    | "plot";

  bedrooms?: number;
  bathrooms?: number;

  area: number;
  areaUnit: string;
  yearBuilt?: number;
  amenities: string[];
  createdAt: Date;

  agent: AgentDTO | mongoose.Types.ObjectId; // ✅ populated agent or ObjectId
}

export interface AgentDTO {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;

  role?: string;
  membership?: "basic" | "pro" | "advance";

  profilePhoto?: string;
  experience?: number;
  propertySold?: number;
}

