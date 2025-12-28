import mongoose, { Document, Model, Schema } from "mongoose";
import { IAdmin } from "./admin.model";

export interface IProperty extends Document {
  title: string;
  images: string[];
  description: string;

  listingType: "sale" | "rent";
  price: number;
  pricePeriod?: "monthly" | "yearly" | "once";

  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location: {
      type: "Point";
      coordinates: [number, number];
    };
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
  areaUnit: "sqft" | "sqm";
  isFurnished: boolean;
  yearBuilt: number;
  virtualTourUrl?: string;

  amenities: string[];

  status: "available" | "sold" | "rented" | "pending" | "inactive";

  agent: IAdmin;
  savedBy: mongoose.Schema.Types.ObjectId[];
  seenBy: mongoose.Schema.Types.ObjectId[];

  // 🔥 FEATURED SYSTEM
  featured: {
    isFeatured: boolean;
    priority: number; // Higher = shown first
    featuredFrom?: Date;
    featuredTill?: Date;
    reason?: "admin" | "paid" | "promotion";
    views?: number;
  };
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    images: [{ type: String }],
    description: { type: String, required: true },

    listingType: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },

    price: { type: Number, required: true, min: 0 },

    pricePeriod: {
      type: String,
      enum: ["monthly", "yearly", "once"],
      default: function () {
        return this.listingType === "rent" ? "monthly" : "once";
      },
    },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
      },
    },

    propertyType: {
      type: String,
      enum: ["apartment", "house", "condo", "land", "commercial", "office", "pg", "plot"],
      required: true,
    },

    bedrooms: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 },
    area: { type: Number, required: true },
    areaUnit: { type: String, enum: ["sqft", "sqm"], default: "sqft" },
    isFurnished: { type: Boolean, default: false },
    yearBuilt: { type: Number },
    virtualTourUrl: { type: String },

    amenities: [{ type: String }],

    status: {
      type: String,
      enum: ["available", "sold", "rented", "pending", "inactive"],
      default: "available",
    },

    agent: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    seenBy: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // ⭐ FEATURED OBJECT
    featured: {
      isFeatured: { type: Boolean, default: false },
      priority: { type: Number, default: 0 },
      featuredFrom: { type: Date },
      featuredTill: { type: Date },
      reason: {
        type: String,
        enum: ["admin", "paid", "promotion"],
      },
      views: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// 🌍 GEO INDEX
propertySchema.index({ "address.location": "2dsphere" });

// 🚀 FAST HOMEPAGE QUERY
propertySchema.index({ "featured.isFeatured": 1, "featured.priority": -1 });

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", propertySchema);

export default Property;
