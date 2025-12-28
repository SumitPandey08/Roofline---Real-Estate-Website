import mongoose, { Document, Model } from "mongoose";

// Interface for the AdminPerformance document
export interface IAdminPerformance extends Document {
  admin: mongoose.Schema.Types.ObjectId;
  period: "monthly" | "yearly";
  month?: number;
  year: number;
  totalRevenue: number;
  dealsClosed: number;
  averageDealSize: number;
  totalLeadsAssigned: number;
  leadsConverted: number;
  conversionRate: number;
  activeListingsCount: number;
  closedListingsCount: number;
  averageResponseTimeMinutes: number;
  averageRating: number;
  totalReviews: number;
  performanceScore: number;
}

const adminPerformanceSchema = new mongoose.Schema<IAdminPerformance>(
  {
    // 🔗 Relations
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },

    // 📅 Time period for analytics
    period: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    month: {
      type: Number, // 1 - 12 (only for monthly)
    },

    year: {
      type: Number,
      required: true,
      index: true,
    },

    // 💰 Revenue & Sales Metrics
    totalRevenue: {
      type: Number,
      default: 0,
    },

    dealsClosed: {
      type: Number,
      default: 0,
    },

    averageDealSize: {
      type: Number,
      default: 0,
    },

    // 🔄 Lead & Conversion Metrics
    totalLeadsAssigned: {
      type: Number,
      default: 0,
    },

    leadsConverted: {
      type: Number,
      default: 0,
    },

    conversionRate: {
      type: Number, // percentage
      default: 0,
    },

    // 🏘️ Property Metrics
    activeListingsCount: {
      type: Number,
      default: 0,
    },

    closedListingsCount: {
      type: Number,
      default: 0,
    },

    // ⏱️ Response Time Metrics
    averageResponseTimeMinutes: {
      type: Number, // average minutes to first response
      default: 0,
    },

    // ⭐ Ratings & Reviews
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // 📈 Ranking / Performance Score (optional but powerful)
    performanceScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 🚀 Ensure only one record per admin per period
adminPerformanceSchema.index(
  { admin: 1, period: 1, month: 1, year: 1 },
  { unique: true }
);

const AdminPerformance: Model<IAdminPerformance> =
  mongoose.models.AdminPerformance ||
  mongoose.model<IAdminPerformance>(
    "AdminPerformance",
    adminPerformanceSchema
  );

export default AdminPerformance;
