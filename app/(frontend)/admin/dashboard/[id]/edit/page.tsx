"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { IProperty } from "@/app/(backend)/models/property.model";

const PropertyEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<IProperty>>({});

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const res = await axios.get(`/api/property/${id}`);
          setProperty(res.data.data);
          setFormData(res.data.data);
        } catch (_error) {
          toast.error("Failed to fetch property");
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, address: { ...formData.address, [name]: value } });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const coordinates = [...(formData.address?.location?.coordinates || [0, 0])];
    name === 'longitude' ? (coordinates[0] = parseFloat(value)) : (coordinates[1] = parseFloat(value));
    setFormData({ ...formData, address: { ...formData.address, location: { ...formData.address?.location, coordinates } } });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, contact: { ...formData.contact, [name]: value } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/property/${id}`, formData);
      setProperty(res.data.property);
      toast.success("Property updated successfully");
    } catch (_error) {
      toast.error("Failed to update property");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen font-medium">Loading property details...</div>;
  if (!property) return <div className="text-center mt-10 text-red-500 font-bold">Property not found</div>;

  const inputClass = "mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 border shadow-sm transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
  const sectionClass = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4";

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white border-b mb-8">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Property Title</label>
                <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} placeholder="Modern Suburban Home" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea name="description" rows={4} value={formData.description || ''} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select name="status" value={formData.status || 'available'} onChange={handleChange} className={inputClass}>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Property Type</label>
                <select name="propertyType" value={formData.propertyType || 'apartment'} onChange={handleChange} className={inputClass}>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
          </section>

          {/* Pricing & Details */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Pricing & Size</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Price ($)</label>
                <input type="number" name="price" value={formData.price || ''} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Listing Type</label>
                <select name="listingType" value={formData.listingType || 'sale'} onChange={handleChange} className={inputClass}>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              {formData.listingType === 'rent' && (
                <div>
                  <label className={labelClass}>Period</label>
                  <select name="pricePeriod" value={formData.pricePeriod || 'monthly'} onChange={handleChange} className={inputClass}>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
              <div>
                <label className={labelClass}>Area Size</label>
                <div className="flex">
                  <input type="number" name="area" value={formData.area || ''} onChange={handleChange} className={`${inputClass} rounded-r-none`} />
                  <select name="areaUnit" value={formData.areaUnit || 'sqft'} onChange={handleChange} className={`${inputClass} rounded-l-none border-l-0 w-24 bg-gray-100`}>
                    <option value="sqft">Sqft</option>
                    <option value="sqm">Sqm</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input type="number" name="bedrooms" value={formData.bedrooms || ''} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input type="number" name="bathrooms" value={formData.bathrooms || ''} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Street Address</label>
                <input type="text" name="street" value={formData.address?.street || ''} onChange={handleAddressChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input type="text" name="city" value={formData.address?.city || ''} onChange={handleAddressChange} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>State</label>
                  <input type="text" name="state" value={formData.address?.state || ''} onChange={handleAddressChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Zip</label>
                  <input type="text" name="zipCode" value={formData.address?.zipCode || ''} onChange={handleAddressChange} className={inputClass} />
                </div>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2.5 rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:transform active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyEditPage;