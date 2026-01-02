

export interface PropertyDTO {
  _id: string;
  title: string;
  images: string[];
  description: string;

  listingType: "sale" | "rent";
  price: number;
  pricePeriod?: string;

  address: {
    street: string;
    city: string;
  };

  area: number;
  areaUnit: string;
  yearBuilt?: number;
  amenities: string[];
  createdAt: string;

  agent: AgentDTO; // ✅ populated agent
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

