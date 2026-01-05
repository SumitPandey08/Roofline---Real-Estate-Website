"use client";

import React, { useState, useEffect } from "react";
import { PropertyDTO } from "@/app/(frontend)/types/property";
import PropertyCard from "@/app/(frontend)/(ui)/components/PropertyCard";

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users/get-saved-properties");
        if (response.ok) {
          const result = await response.json();
          setSavedProperties(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch saved properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <PropertyCard key={property._id.toString()} property={property} />
          ))}
        </div>
      ) : (
        <p>You have no saved properties.</p>
      )}
    </div>
  );
};

export default SavedPropertiesPage;
