"use client";

import React from "react";
import Image from "next/image";
import { Toaster } from "react-hot-toast"; // toast is no longer needed here
import {
  MdEmail,
  MdPhone,
  MdWorkOutline,
  MdStarOutline,
  MdLocationOn,
  MdCalendarToday,
  MdEdit,
} from "react-icons/md";
import { useAdmin } from '@/app/(frontend)/context/AdminContext'; // Import useAdmin

interface Property {
  _id: string;
  title: string;
  // Add other relevant property fields if needed for display
}

const AdminProfilePage: React.FC = () => {
  const { adminData, loading } = useAdmin(); // Use the hook


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC]">
        <p className="text-gray-600">Loading admin profile...</p>
      </div>
    );
  }



  if (!adminData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC]">
        <p className="text-gray-600">No admin data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Admin Profile
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200">
            <MdEdit size={18} /> Edit Profile
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-md flex-shrink-0">
            <Image
              src={
                adminData.profilePhoto ||
                `https://ui-avatars.com/api/?name=${adminData.name}&background=random&color=fff`
              }
              alt={adminData.name || "Admin"}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {adminData.name}
            </h2>
            <p className="text-purple-600 font-medium text-lg mb-3">
              {adminData.role}
            </p>
            <p className="text-gray-600 text-sm max-w-prose">
              {adminData.bio || "No bio provided."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-10">
          <ProfileDetail
            icon={<MdEmail />}
            label="Email"
            value={adminData.email}
          />
          <ProfileDetail
            icon={<MdPhone />}
            label="Phone"
            value={adminData.phoneNo}
          />
          <ProfileDetail
            icon={<MdWorkOutline />}
            label="Experience"
            value={adminData.experience ? `${adminData.experience} Years` : "N/A"}
          />
          <ProfileDetail
            icon={<MdStarOutline />}
            label="Specialization"
            value={adminData.specialization || "N/A"}
          />
          <ProfileDetail
            icon={<MdCalendarToday />}
            label="Member Since"
            value={new Date(adminData.createdAt).toLocaleDateString()}
          />
          <ProfileDetail
            icon={<MdLocationOn />}
            label="Properties Sold"
            value={adminData.propertySold}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Managed Properties
          </h3>
          {adminData.properties && adminData.properties.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {adminData.properties.map((property: Property) => ( // Changed type here
                <li key={property._id} className="mb-1">
                  {property.title || property._id}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No properties managed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProfileDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
    <div className="text-purple-600 text-2xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  </div>
);

export default AdminProfilePage;
