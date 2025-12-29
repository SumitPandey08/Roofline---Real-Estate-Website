// app/(frontend)/admin/dashboard/properties/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import ActivePropertyCard from '@/app/(frontend)/(ui)/components/admin/dashboard/ActivePropertyCard';
import { PropertyCardData } from '@/app/(frontend)/(ui)/components/admin/dashboard/ActivePropertyCard'; // Assuming this interface is exported
import { useAdmin } from '@/app/(frontend)/context/AdminContext'; // Import useAdmin

const AdminPropertiesPage: React.FC = () => {
  const { adminData, loading: adminLoading } = useAdmin(); // Use useAdmin hook
  const [allProperties, setAllProperties] = useState<PropertyCardData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchAdminProperties = async () => {
      if (!adminData?._id) return; // Don't fetch if admin ID isn't available yet

      try {
        setLoading(true);
        const response = await fetch(`/api/property/get-admin-property?id=${adminData._id}`); // Corrected endpoint and added admin ID
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch properties');
        }
        
        if (data.data) { // Assuming data.data directly contains the array of properties
          setAllProperties(data.data);
          setFilteredProperties(data.data);
        } else {
          setAllProperties([]);
          setFilteredProperties([]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProperties();
  }, [adminData]); // Added adminData to dependency array

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFeatured }),
      });

      if (!response.ok) {
        throw new Error('Failed to update feature status');
      }

      const updatedProperty = await response.json();

      setAllProperties(prev => 
        prev.map(p => p._id === id ? { ...p, featured: updatedProperty.property.featured } : p)
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error toggling feature status:', err);
    }
  };

  if (loading || adminLoading) { // Added adminLoading to the check
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Properties</h1>
        <select 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="all">All Properties</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>
      {filteredProperties.length === 0 ? (
        <p className="text-gray-600">No properties found for the selected type.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProperties.map((property) => (
            <ActivePropertyCard 
              key={property._id} 
              data={property} 
              onFeatureToggle={handleFeatureToggle} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage;
