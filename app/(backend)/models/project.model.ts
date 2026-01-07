import mongoose, { Schema, Document, Model } from "mongoose";

// Define a separate interface for the data to improve reusability
export interface IProject extends Document {
  name: string;
  description: string;
  location: string;
  images: string[];
  reraNumber: string;
  admin: mongoose.Types.ObjectId;
  sizeRange: string;
  startingPrice: number;
  endingPrice: number;
  configuration: string[];
  averagePricePerSqFt: number;
  projectStatus: "upcoming" | "ongoing" | "completed";
  possessionDate: Date;
  amenities: string[];
  projectUnits: number;
  soldUnits: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { 
      type: String, 
      required: [true, "Project name is required"], 
      trim: true,
      index: true // Faster lookup for search
    },
    description: { 
      type: String, 
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    location: { 
      type: String, 
      required: [true, "Location is required"],
      index: true 
    },
    images: { 
      type: [String], 
      validate: [(val: string[]) => val.length > 0, "At least one image is required"] 
    },
    reraNumber: { 
      type: String, 
      required: true, 
      unique: true,
      uppercase: true,
      trim: true 
    },
    admin: { 
      type: Schema.Types.ObjectId, 
      ref: "Admin", 
      required: true 
    },
    sizeRange: { type: String, required: true },
    startingPrice: { 
      type: Number, 
      required: true,
      min: [0, "Price cannot be negative"]
    },
    endingPrice: { 
      type: Number, 
      required: true,
      validate: {
        validator: function(this: IProject, value: number) {
          return value >= this.startingPrice;
        },
        message: "Ending price must be greater than or equal to starting price"
      }
    },
    configuration: { 
      type: [String], 
      required: true,
      enum: ["1BHK", "2BHK", "3BHK", "4BHK", "Penthouse", "Villa"] // Standardize types
    },
    averagePricePerSqFt: { type: Number, required: true },
    projectStatus: {
      type: String,
      enum: {
        values: ["upcoming", "ongoing", "completed"],
        message: "{VALUE} is not a supported status"
      },
      default: "upcoming",
      required: true,
    },
    possessionDate: { type: Date, required: true },
    amenities: { type: [String], default: [] },
    projectUnits: { 
      type: Number, 
      required: true,
      min: [1, "Total units must be at least 1"]
    },
    soldUnits: { 
      type: Number, 
      default: 0,
      validate: {
        validator: function(this: IProject, value: number) {
          return value <= this.projectUnits;
        },
        message: "Sold units cannot exceed total project units"
      }
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property to calculate availability percentage
ProjectSchema.virtual('availabilityPercentage').get(function() {
  return ((this.projectUnits - this.soldUnits) / this.projectUnits) * 100;
});

// Compound Index for common search queries
ProjectSchema.index({ location: 1, startingPrice: 1 });

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;