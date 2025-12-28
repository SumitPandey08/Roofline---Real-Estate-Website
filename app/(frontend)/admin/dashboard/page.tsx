"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdChat, MdMapsHomeWork, MdFilterList, MdAdd } from "react-icons/md";

// Component Imports
import FlowCard from "@/app/(frontend)/(ui)/components/admin/dashboard/FlowCard";
import FinancialFlow from "../../(ui)/components/admin/dashboard/FinancialFlow";
import MessageCard from "../../(ui)/components/admin/dashboard/MessageCard";
import ActivePropertyCard from "../../(ui)/components/admin/dashboard/ActivePropertyCard";

import { useAdmin } from '@/app/(frontend)/context/AdminContext';

interface Property {
  _id: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  images: string[];
  propertyType: "apartment" | "house" | "condo" | "land" | "commercial";
  price: number;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

interface DashboardStat {
  tittle: string;
  numericalValue: string | number;
  flowArr: number[];
  growth: number;
  description: string;
  theme: string;
}

interface Message {
  name: string;
  lastMessage: string;
  timeAgo: string;
  profilepic: string;
  unreadMsg: number;
  status: string;
}

const DashboardPage: React.FC = () => {
  const { adminData, loading: adminLoading } = useAdmin();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/property/add-property");
        const result = await response.json();
        if (result.data) {
          setProperties(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  // 1. Stats Data (Top Row)
  const dashboardStats: DashboardStat[] = adminData
    ? [
        {
          tittle: "Total Property",
          numericalValue: properties.length,
          flowArr: [45, 52, 48, 61, 55, 68, 72], // dummy data
          growth: 8.2, // dummy data
          description: "Total properties listed.",
          theme: "purple",
        },
        {
          tittle: "Total Income",
          numericalValue: "$0", // dummy data
          flowArr: [85, 70, 90, 65, 95, 80, 110], // dummy data
          growth: 0, // dummy data
          description: "Revenue will be tracked here.",
          theme: "green",
        },
        {
          tittle: "Total Sale",
          numericalValue: adminData.propertySold,
          flowArr: [60, 55, 50, 45, 40, 35, 30], // dummy data
          growth: -5.4, // dummy data
          description: "Total properties sold.",
          theme: "red",
        },
      ]
    : [];

  // 2. Messaging Data (Middle Right) - Still dummy data
  const messageData: Message[] = [
    {
      name: "Alexander Pierce",
      lastMessage: "The property documents are ready for your review.",
      timeAgo: "2 mins ago",
      profilepic:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      unreadMsg: 3,
      status: "online",
    },
    // ... other messages
  ];

  // 3. Property Data (Bottom Row)
  const activeProperties = properties.filter((p) => p.status === "available");
  console.log(activeProperties);

  if (adminLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* SECTION 1: TOP METRICS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => (
          <FlowCard key={index} data={stat} />
        ))}
      </section>

      {/* SECTION 2: ANALYTICS & MESSAGES */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Financial Flow Chart (2/3 Width) */}
        <div className="lg:col-span-2">
          <FinancialFlow />
        </div>

        {/* Right: Messages Widget (1/3 Width) */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full max-h-[500px]">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <MdChat size={22} />
              </div>
              <h2 className="font-extrabold text-slate-800 tracking-tight">
                Recent Messages
              </h2>
            </div>
            <button className="text-xs font-bold text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
              View All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {messageData.map((data, index) => (
              <MessageCard key={index} data={data} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ACTIVE PROPERTIES (Full Width List) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <MdMapsHomeWork size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                Active Properties
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Manage your current listings and occupancy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <MdFilterList size={18} />
              Filter
            </button>
            <Link href="/admin/add-property">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all">
                <MdAdd size={18} />
                Add Property
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {activeProperties.length > 0 ? (
            activeProperties.map((data, index) => (
              <ActivePropertyCard
                key={index}
                data={{
                  _id: data._id,
                  title: data.title,
                  address: data.address,
                  propertyType: data.propertyType,
                  price: data.price,
                  images: data.images,
                  status: data.status,
                  bedrooms: data.bedrooms,
                  bathrooms: data.bathrooms,
                  area: data.area,
                }}
              />
            ))
          ) : (
            <p>No active properties found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;