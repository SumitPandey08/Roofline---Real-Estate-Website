export interface Seller {
  id: string;
  name: string;
  rank: string;
  locations: string[];
  experience: number;
  property: number;
  profilepic: string;
}

export const sellers: Seller[] = [
  {
    id: "VK",
    name: "Vipin Kumar",
    rank: "house expert pro",
    locations: ["Jagatpura", "Vaishali Nagar"],
    experience: 0.5,
    property: 37,
    profilepic:
      "https://ui-avatars.com/api/?name=Vipin+Kumar&background=4f46e5&color=fff",
  },
  {
    id: "TL",
    name: "True Label Real Estate",
    rank: "house expert",
    locations: ["Sukhliya", "Bhangarh"],
    experience: 11,
    property: 25,
    profilepic:
      "https://ui-avatars.com/api/?name=True+Label&background=0284c7&color=fff",
  },
  {
    id: "GM",
    name: "Guru Mahima Group",
    rank: "house expert pro",
    locations: ["Bhawrasla", "Bhicholi Mardana"],
    experience: 15,
    property: 52,
    profilepic:
      "https://ui-avatars.com/api/?name=Guru+Mahima&background=9333ea&color=fff",
  },
  {
    id: "YG",
    name: "Yashu Gambhir",
    rank: "house expert",
    locations: ["Nipania", "Mahalakshmi Nagar"],
    experience: 11,
    property: 31,
    profilepic:
      "https://ui-avatars.com/api/?name=Yashu+Gambhir&background=0ea5e9&color=fff",
  },
  {
    id: "CR",
    name: "Chouhan Real Estate",
    rank: "house expert pro",
    locations: ["Mahalakshmi Nagar", "Scheme No 114"],
    experience: 7,
    property: 50,
    profilepic:
      "https://ui-avatars.com/api/?name=Chouhan+Realty&background=f59e0b&color=fff",
  },
  {
    id: "TN",
    name: "Tarun Nandaniya",
    rank: "house expert",
    locations: ["Silicon City"],
    experience: 0.5,
    property: 8,
    profilepic:
      "https://ui-avatars.com/api/?name=Tarun+Nandaniya&background=10b981&color=fff",
  },
  {
    id: "AB",
    name: "Abhishek Bhargav",
    rank: "house expert pro",
    locations: ["Nipania", "Mahalakshmi Nagar"],
    experience: 15,
    property: 161,
    profilepic:
      "https://ui-avatars.com/api/?name=Abhishek+Bhargav&background=ef4444&color=fff",
  },
  {
    id: "MB",
    name: "Monesh Bariya",
    rank: "house expert",
    locations: ["Sudama Nagar", "Rajendra Nagar"],
    experience: 11,
    property: 32,
    profilepic:
      "https://ui-avatars.com/api/?name=Monesh+Bariya&background=6366f1&color=fff",
  },
  {
    id: "BR",
    name: "BK Realty",
    rank: "house expert pro",
    locations: ["Palasia", "Indra Puri Colony"],
    experience: 0.5,
    property: 50,
    profilepic:
      "https://ui-avatars.com/api/?name=BK+Realty&background=22c55e&color=fff",
  },
  {
    id: "SD",
    name: "Shubharambh Devcon",
    rank: "house expert",
    locations: ["Nipania", "Muradpura"],
    experience: 0.5,
    property: 22,
    profilepic:
      "https://ui-avatars.com/api/?name=Shubharambh+Devcon&background=8b5cf6&color=fff",
  },
  {
    id: "AO",
    name: "A One Property Indore",
    rank: "house expert pro",
    locations: ["Mahalakshmi Nagar", "Nipania"],
    experience: 0.5,
    property: 49,
    profilepic:
      "https://ui-avatars.com/api/?name=A+One+Property&background=ec4899&color=fff",
  },
  {
    id: "RG",
    name: "RN Group Of Company",
    rank: "house expert",
    locations: ["Bhicholi Mardana", "Bicholi Hapsi"],
    experience: 11,
    property: 15,
    profilepic:
      "https://ui-avatars.com/api/?name=RN+Group&background=14b8a6&color=fff",
  },
];
