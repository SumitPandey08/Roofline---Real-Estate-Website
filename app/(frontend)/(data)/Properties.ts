
export interface ReraInfo {
  registered: boolean;
  reraId: string | null;
}

export interface MarketedBy {
  name: string;
  type: string;
}

export interface Location {
  locality: string;
  area: string;
  landmarks: string[];
  city: string;
  state: string;
}

export interface Possession {
  possessionStarts: string;
  status: string;
}

export interface Pricing {
  priceRange: {
    min: number;
    max: number;
    display: string;
  };
  avgPricePerSqFt: number;
  avgPriceDisplay: string;
  emiStartsAt: {
    amount: number;
    display: string;
  };
}

export interface AreaDetails {
  unit: string;
  plotSizeRange: {
    min: number;
    max: number;
  };
  display: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
}

export interface Actions {
  canContactSeller: boolean;
  canSave: boolean;
  canShare: boolean;
}

export interface BasicInfo {
  id: string;
  title: string;
  rera: ReraInfo;
  marketedBy: MarketedBy;
  location: Location;
  propertyType: string;
  configuration: string;
  possession: Possession;
  pricing: Pricing;
  areaDetails: AreaDetails;
  nearbyPlaces: NearbyPlace[];
  actions: Actions;
}

export interface ReviewBreakdown {
  category: string;
  rating: number;
  display: string;
}

export interface Review {
  overall: {
    rating: number;
    scale: number;
    display: string;
  };
  breakdown: ReviewBreakdown[];
}

export interface Amenities {
  title: string;
  highlighted: string[];
  additionalCount: number;
  allAmenities: string[];
}

export interface Property {
  basicInfo: BasicInfo;
  images: string[];
  reviews: Review;
  amenities: Amenities;
}

export const properties: Property[] = [
  {
    basicInfo: {
      id: "vkg-dev-bhumi",
      title: "VKG Dev Bhumi",
      rera: { registered: true, reraId: null },
      marketedBy: { name: "AP REALTY", type: "Agent" },
      location: {
        locality: "Talawali Chanda",
        area: "Manglia",
        landmarks: ["Dhabali", "AB Bypass Road", "Manglaya Sadak"],
        city: "Indore",
        state: "Madhya Pradesh",
      },
      propertyType: "Residential Plots",
      configuration: "Plots",
      possession: {
        possessionStarts: "Apr 2027",
        status: "Under Construction",
      },
      pricing: {
        priceRange: {
          min: 1521000,
          max: 12800000,
          display: "15.21 L - 1.28 Cr",
        },
        avgPricePerSqFt: 3700,
        avgPriceDisplay: "₹3.7 K/sq.ft",
        emiStartsAt: { amount: 8050, display: "₹8.05 K" },
      },
      areaDetails: {
        unit: "sq.ft",
        plotSizeRange: { min: 411, max: 3446 },
        display: "411 - 3446 sq.ft",
      },
      nearbyPlaces: [
        { name: "Indore Hospital", distance: "3 minutes" },
        { name: "Manglia Square", distance: "5 minutes" },
        { name: "Goenka International School", distance: "7 minutes" },
      ],
      actions: { canContactSeller: true, canSave: true, canShare: true },
    },
    images: [
      "https://housing-images.n7net.in/4f2250e8/fa2e9aeb21344e24f0d910739e0eb111/v0/medium/vkg_dev_bhumi-manglia-indore-vkg_group_indore.jpeg",
      "https://housing-images.n7net.in/012c1500/163554e12d13895ca546dfd10230a74b/v0/fs.jpeg",
      "https://housing-images.n7net.in/012c1500/163554e12d13895ca546dfd10230a74b/v0/fs-large.jpeg",
      "https://housing-images.n7net.in/012c1500/d5e043e97d7a8f0be5d599a557677d46/v0/fs.png",
    ],
    reviews: {
      overall: { rating: 4.3, scale: 5, display: "4.3/5" },
      breakdown: [
        { category: "Connectivity", rating: 4.0, display: "4/5" },
        { category: "Neighbourhood", rating: 4.3, display: "4.3/5" },
        { category: "Safety", rating: 4.3, display: "4.3/5" },
        { category: "Livability", rating: 4.3, display: "4.3/5" },
      ],
    },
    amenities: {
      title: "Project Amenities",
      highlighted: [
        "Children's Play Area",
        "Gazebo",
        "Rain Water Harvesting",
        "24x7 CCTV",
        "Gymnasium",
      ],
      additionalCount: 12,
      allAmenities: [
        "Children's Play Area",
        "Gazebo",
        "Rain Water Harvesting",
        "24x7 CCTV",
        "Gymnasium",
      ],
    },
  },

  // 2
  {
    basicInfo: {
      id: "shree-balaji-heights",
      title: "Shree Balaji Heights",
      rera: { registered: true, reraId: "P-IND-22-9876" },
      marketedBy: { name: "Balaji Developers", type: "Builder" },
      location: {
        locality: "Vijay Nagar",
        area: "Scheme 54",
        landmarks: ["C21 Mall", "Medanta Hospital"],
        city: "Indore",
        state: "Madhya Pradesh",
      },
      propertyType: "Apartments",
      configuration: "2, 3 BHK",
      possession: {
        possessionStarts: "Dec 2026",
        status: "Under Construction",
      },
      pricing: {
        priceRange: { min: 4200000, max: 7800000, display: "42 L - 78 L" },
        avgPricePerSqFt: 5200,
        avgPriceDisplay: "₹5.2 K/sq.ft",
        emiStartsAt: { amount: 21500, display: "₹21.5 K" },
      },
      areaDetails: {
        unit: "sq.ft",
        plotSizeRange: { min: 850, max: 1450 },
        display: "850 - 1450 sq.ft",
      },
      nearbyPlaces: [
        { name: "C21 Mall", distance: "2 minutes" },
        { name: "Medanta Hospital", distance: "4 minutes" },
      ],
      actions: { canContactSeller: true, canSave: true, canShare: true },
    },
    images: [
      "https://housing-images.n7net.in/012c1500/fs-large.jpeg",
      "https://housing-images.n7net.in/012c1500/fs.jpeg",
    ],
    reviews: {
      overall: { rating: 4.5, scale: 5, display: "4.5/5" },
      breakdown: [
        { category: "Connectivity", rating: 4.6, display: "4.6/5" },
        { category: "Safety", rating: 4.5, display: "4.5/5" },
      ],
    },
    amenities: {
      title: "Project Amenities",
      highlighted: ["Lift", "Power Backup", "Parking", "CCTV"],
      additionalCount: 8,
      allAmenities: ["Lift", "Power Backup", "Parking", "CCTV"],
    },
  },

  // 3
  {
    basicInfo: {
      id: "emerald-greens",
      title: "Emerald Greens",
      rera: { registered: true, reraId: "P-IND-21-4455" },
      marketedBy: { name: "Emerald Group", type: "Builder" },
      location: {
        locality: "Bicholi Mardana",
        area: "AB Road",
        landmarks: ["MR 10 Road", "IIM Indore"],
        city: "Indore",
        state: "Madhya Pradesh",
      },
      propertyType: "Villas",
      configuration: "3, 4 BHK",
      possession: { possessionStarts: "Jun 2025", status: "Ready to Move" },
      pricing: {
        priceRange: {
          min: 9500000,
          max: 16500000,
          display: "95 L - 1.65 Cr",
        },
        avgPricePerSqFt: 6200,
        avgPriceDisplay: "₹6.2 K/sq.ft",
        emiStartsAt: { amount: 48000, display: "₹48 K" },
      },
      areaDetails: {
        unit: "sq.ft",
        plotSizeRange: { min: 1800, max: 3200 },
        display: "1800 - 3200 sq.ft",
      },
      nearbyPlaces: [{ name: "IIM Indore", distance: "6 minutes" }],
      actions: { canContactSeller: true, canSave: true, canShare: true },
    },
    images: ["https://housing-images.n7net.in/012c1500/fs.png"],
    reviews: {
      overall: { rating: 4.7, scale: 5, display: "4.7/5" },
      breakdown: [{ category: "Livability", rating: 4.8, display: "4.8/5" }],
    },
    amenities: {
      title: "Project Amenities",
      highlighted: ["Club House", "Swimming Pool", "Garden"],
      additionalCount: 6,
      allAmenities: ["Club House", "Swimming Pool", "Garden"],
    },
  },

  // 4
  {
    basicInfo: {
      id: "royal-plaza",
      title: "Royal Plaza",
      rera: { registered: true, reraId: "P-IND-20-3321" },
      marketedBy: { name: "Royal Builders", type: "Builder" },
      location: {
        locality: "Palasia",
        area: "South Tukoganj",
        landmarks: ["56 Dukan", "Palasia Square"],
        city: "Indore",
        state: "Madhya Pradesh",
      },
      propertyType: "Commercial Shops",
      configuration: "Shops",
      possession: { possessionStarts: "Ready", status: "Ready to Move" },
      pricing: {
        priceRange: { min: 3800000, max: 9200000, display: "38 L - 92 L" },
        avgPricePerSqFt: 9800,
        avgPriceDisplay: "₹9.8 K/sq.ft",
        emiStartsAt: { amount: 19500, display: "₹19.5 K" },
      },
      areaDetails: {
        unit: "sq.ft",
        plotSizeRange: { min: 250, max: 900 },
        display: "250 - 900 sq.ft",
      },
      nearbyPlaces: [{ name: "56 Dukan", distance: "1 minute" }],
      actions: { canContactSeller: true, canSave: true, canShare: true },
    },
    images: ["https://housing-images.n7net.in/012c1500/fs-large.jpeg"],
    reviews: {
      overall: { rating: 4.2, scale: 5, display: "4.2/5" },
      breakdown: [{ category: "Connectivity", rating: 4.6, display: "4.6/5" }],
    },
    amenities: {
      title: "Project Amenities",
      highlighted: ["Escalator", "Parking", "Security"],
      additionalCount: 4,
      allAmenities: ["Escalator", "Parking", "Security"],
    },
  },

  // 5
  {
    basicInfo: {
      id: "sunshine-meadows",
      title: "Sunshine Meadows",
      rera: { registered: true, reraId: "P-IND-23-7788" },
      marketedBy: { name: "Sunshine Realty", type: "Builder" },
      location: {
        locality: "Rau",
        area: "Rau-Pithampur Road",
        landmarks: ["Medicaps University"],
        city: "Indore",
        state: "Madhya Pradesh",
      },
      propertyType: "Residential Plots",
      configuration: "Plots",
      possession: {
        possessionStarts: "Mar 2026",
        status: "Under Construction",
      },
      pricing: {
        priceRange: { min: 980000, max: 4200000, display: "9.8 L - 42 L" },
        avgPricePerSqFt: 2800,
        avgPriceDisplay: "₹2.8 K/sq.ft",
        emiStartsAt: { amount: 5200, display: "₹5.2 K" },
      },
      areaDetails: {
        unit: "sq.ft",
        plotSizeRange: { min: 600, max: 2400 },
        display: "600 - 2400 sq.ft",
      },
      nearbyPlaces: [{ name: "Medicaps University", distance: "5 minutes" }],
      actions: { canContactSeller: true, canSave: true, canShare: true },
    },
    images: ["https://housing-images.n7net.in/012c1500/fs.jpeg"],
    reviews: {
      overall: { rating: 4.1, scale: 5, display: "4.1/5" },
      breakdown: [{ category: "Safety", rating: 4.3, display: "4.3/5" }],
    },
    amenities: {
      title: "Project Amenities",
      highlighted: ["Park", "Street Lights", "Gated Society"],
      additionalCount: 5,
      allAmenities: ["Park", "Street Lights", "Gated Society"],
    },
  },
];
