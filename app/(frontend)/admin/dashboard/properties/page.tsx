"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// Importing React Icons
import { HiPlus, HiOutlineOfficeBuilding, HiOutlineStar, HiOutlineHome } from 'react-icons/hi';
import { BiFilterAlt, BiLoaderAlt } from 'react-icons/bi';

import ActivePropertyCard from '@/app/(frontend)/(ui)/components/admin/dashboard/ActivePropertyCard';
import { PropertyCardData } from '@/app/(frontend)/(ui)/components/admin/dashboard/ActivePropertyCard';
import { useAdmin } from '@/app/(frontend)/context/AdminContext';

const AdminPropertiesPage: React.FC = () => {
  const { adminData, loading: adminLoading } = useAdmin();
  const [allProperties, setAllProperties] = useState<PropertyCardData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchAdminProperties = async () => {
      if (!adminData?._id) return;
      try {
        setLoading(true);
        const response = await fetch(`/api/property/get-admin-property?id=${adminData._id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch properties');
        
        const properties = data.data || [];
        setAllProperties(properties);
        setFilteredProperties(properties);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminProperties();
  }, [adminData]);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredProperties(allProperties);
    } else {
      setFilteredProperties(allProperties.filter(p => p.propertyType === selectedType));
    }
  }, [selectedType, allProperties]);

  const handleFeatureToggle = async (id: string, isFeatured: boolean) => {
    try {
      const response = await fetch(`/api/property/${id}/add-to-feature`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: isFeatured }),
      });
      if (!response.ok) {
        throw new Error('Failed to update feature status');
      }
      const { property: updatedProperty } = await response.json();
      const updateProperties = (properties: PropertyCardData[]) =>
        properties.map(p => p._id === id ? { ...p, featured: updatedProperty.featured } : p);
      
      setAllProperties(updateProperties);
      setFilteredProperties(updateProperties);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the property.');
    }
  };

  if (loading || adminLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <BiLoaderAlt className="animate-spin text-4xl text-blue-600" />
        <p className="text-gray-500 font-medium animate-pulse">Loading properties...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Real Estate Inventory</h1>
          <p className="text-slate-500">Overview of your active listings and performance.</p>
        </div>
        
        <Link 
          href="/admin/add-property" 
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95"
        >
          <HiPlus className="text-xl" />
          Add Property
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard 
          icon={<HiOutlineOfficeBuilding className="text-blue-600" />} 
          label="Total Properties" 
          value={allProperties.length} 
          bgColor="bg-blue-50"
        />
        <StatCard 
          icon={<HiOutlineStar className="text-yellow-600" />} 
          label="Featured" 
          value={allProperties.filter(p => p.featured?.isFeatured).length} 
          bgColor="bg-yellow-50"
        />
        <StatCard 
          icon={<HiOutlineHome className="text-green-600" />} 
          label="Available Units" 
          value={allProperties.filter(p => p.status === 'available').length}
          bgColor="bg-green-50"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 gap-4">
        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
          <BiFilterAlt className="text-lg" />
          <span>Quick Filter:</span>
        </div>
        <select 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium"
        >
          <option value="all">All Properties</option>
          <option value="apartment">Apartments</option>
          <option value="house">Houses</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {/* Content Area */}
      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 text-center">
          <HiOutlineOfficeBuilding className="text-6xl text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No properties found</h3>
          <p className="text-slate-500 mb-6">Try changing the filter or add your first project.</p>
          <Link href="/admin/add-project" className="text-blue-600 font-bold hover:underline">
            + Start Listing Today
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProperties.map((property) => (
            <div key={property._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <ActivePropertyCard 
                data={property} 
                onFeatureToggle={handleFeatureToggle} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable Stat Card Component for cleaner code
const StatCard = ({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: number, bgColor: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
    <div className={`p-4 ${bgColor} rounded-xl text-2xl`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default AdminPropertiesPage;