"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Amenity } from "@/app/constants";
import { MdTitle, MdDescription, MdAttachMoney, MdLocationOn, MdHome, MdHotel, MdBathroom, MdAspectRatio, MdCloudUpload, MdMap, MdBusiness, MdPinDrop, MdPublic, MdPhone, MdEmail, MdLink, MdCalendarToday, MdStar, MdCheckBox, MdRadioButtonChecked, MdRadioButtonUnchecked, MdInfo } from 'react-icons/md';
import Image from 'next/image';

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  listingType: z.enum(["sale", "rent"]),
  price: z.number().min(0, "Price cannot be negative"),
  pricePeriod: z.enum(["once", "monthly", "yearly"]),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    location: z.object({
      coordinates: z.array(z.number()).length(2, "Provide longitude and latitude"),
    }),
  }),
  propertyType: z.enum(["apartment", "house", "condo", "land", "commercial", "office"]),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  area: z.number().min(0, "Area must be a positive number"),
  areaUnit: z.enum(["sqft", "sqm"]),
  isFurnished: z.boolean(),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  yearBuilt: z.number().min(1900).max(new Date().getFullYear()).optional(),
  virtualTourUrl: z.string().url().optional().or(z.literal('')),
  contact: z.object({
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email address"),
  }),
  status: z.enum(["available", "sold", "rented", "pending", "inactive"]),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function AddPropertyPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      listingType: "sale",
      pricePeriod: "once",
      propertyType: "apartment",
      areaUnit: "sqft",
      isFurnished: false,
      amenities: [],
      status: "available",
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSuccess(false);
    setServerError(null);
    setIsUploading(true);

    try {
      let uploadedUrls: string[] = [];
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        selectedFiles.forEach(file => {
          formData.append("files", file);
        });

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }
        const uploadResult = await uploadResponse.json();
        uploadedUrls = uploadResult.urls;
        setValue("images", uploadedUrls);
      }

      const finalData = { ...data, images: uploadedUrls };

      const propertyResponse = await fetch("/api/property/add-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!propertyResponse.ok) {
        const errorData = await propertyResponse.json();
        throw new Error(errorData.message || "Failed to create property");
      }

      setIsSuccess(true);
      reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)] rounded-[2.5rem] p-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Add New Property</h1>

        {isSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-200 rounded-lg">
            Property created successfully!
          </div>
        )}

        {serverError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Property Images</label>
            <div className="relative border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center hover:border-purple-400 transition-all">
                <MdCloudUpload className="mx-auto text-purple-400 mb-4" size={48} />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                />
                <p className="text-slate-500">Drag & drop images here or <span className="text-purple-600 font-bold">browse</span></p>
            </div>
            {isUploading && <p className="mt-2">Uploading images...</p>}
            {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                            <Image src={url} alt={`Preview property ${index}`} width={200} height={200} className="rounded-xl object-cover w-full h-32" />
                        </div>
                    ))}
                </div>
            )}
            {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>}
          </div>

          <FormSection title="Basic Information">
            <InputField label="Property Title" error={errors.title?.message} icon={<MdTitle />}>
              <input {...register("title")} className={inputStyles} />
            </InputField>
            <InputField label="Description" error={errors.description?.message} icon={<MdDescription />}>
              <textarea {...register("description")} rows={5} className={inputStyles} />
            </InputField>
          </FormSection>

          <FormSection title="Listing Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Listing Type" error={errors.listingType?.message} icon={<MdInfo />}>
                    <select {...register("listingType")} className={inputStyles + " appearance-none"}>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                    </select>
                </InputField>
                <InputField label="Price (₹)" error={errors.price?.message} icon={<MdAttachMoney />}>
                    <input type="number" {...register("price", { valueAsNumber: true })} className={inputStyles}/>
                </InputField>
            </div>
          </FormSection>

          <FormSection title="Location">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Street" error={errors.address?.street?.message} icon={<MdMap />}>
                        <input {...register("address.street")} className={inputStyles} />
                    </InputField>
                    <InputField label="City" error={errors.address?.city?.message} icon={<MdBusiness />}>
                        <input {...register("address.city")} className={inputStyles} />
                    </InputField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="State" error={errors.address?.state?.message} icon={<MdPinDrop />}>
                        <input {...register("address.state")} className={inputStyles} />
                    </InputField>
                    <InputField label="Zip Code" error={errors.address?.zipCode?.message} icon={<MdPublic />}>
                        <input {...register("address.zipCode")} className={inputStyles} />
                    </InputField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Longitude" error={errors.address?.location?.coordinates?.message} icon={<MdLocationOn />}>
                        <input type="number" {...register("address.location.coordinates.0", { valueAsNumber: true })} className={inputStyles} />
                    </InputField>
                    <InputField label="Latitude" error={errors.address?.location?.coordinates?.message} icon={<MdLocationOn />}>
                        <input type="number" {...register("address.location.coordinates.1", { valueAsNumber: true })} className={inputStyles} />
                    </InputField>
                </div>
            </FormSection>

            <FormSection title="Property Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Property Type" error={errors.propertyType?.message} icon={<MdHome />}>
                        <select {...register("propertyType")} className={inputStyles + " appearance-none"}>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                            <option value="commercial">Commercial</option>
                            <option value="office">Office</option>
                        </select>
                    </InputField>
                     <InputField label="Area" error={errors.area?.message} icon={<MdAspectRatio />}>
                        <input type="number" {...register("area", { valueAsNumber: true })} className={inputStyles}/>
                    </InputField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Bedrooms" error={errors.bedrooms?.message} icon={<MdHotel />}>
                        <input type="number" {...register("bedrooms", { valueAsNumber: true })} className={inputStyles}/>
                    </InputField>
                    <InputField label="Bathrooms" error={errors.bathrooms?.message} icon={<MdBathroom />}>
                        <input type="number" {...register("bathrooms", { valueAsNumber: true })} className={inputStyles}/>
                    </InputField>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Year Built" error={errors.yearBuilt?.message} icon={<MdCalendarToday />}>
                        <input type="number" {...register("yearBuilt", { valueAsNumber: true })} className={inputStyles}/>
                    </InputField>
                    <InputField label="Furnished" error={errors.isFurnished?.message} icon={<MdCheckBox />}>
                         <Controller
                            name="isFurnished"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                                />
                            )}
                        />
                    </InputField>
                </div>
            </FormSection>

            <FormSection title="Amenities">
             <Controller
                name="amenities"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Amenity.map((amenity) => (
                      <label key={amenity.id} className="flex items-center space-x-3 p-3 border border-purple-100 rounded-lg hover:bg-purple-50 cursor-pointer shadow-sm">
                        <input
                          type="checkbox"
                           className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                          checked={field.value?.includes(amenity.id)}
                          onChange={(e) => {
                            const selected = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...selected, amenity.id]);
                            } else {
                              field.onChange(selected.filter((id) => id !== amenity.id));
                            }
                          }}
                        />
                        <span className="text-gray-700">{amenity.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.amenities && <p className="text-xs text-red-500 mt-1">{errors.amenities.message}</p>}
          </FormSection>

          <FormSection title="Contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Contact Phone" error={errors.contact?.phone?.message} icon={<MdPhone />}>
                        <input {...register("contact.phone")} className={inputStyles} />
                    </InputField>
                    <InputField label="Contact Email" error={errors.contact?.email?.message} icon={<MdEmail />}>
                        <input {...register("contact.email")} className={inputStyles} />
                    </InputField>
                </div>
          </FormSection>
        
          <div className="pt-6 border-t border-purple-100">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] hover:shadow-xl mt-4 disabled:opacity-50"
            >
              {isSubmitting || isUploading ? "Processing..." : "Submit Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable components for form sections and fields
const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <fieldset className="space-y-4">
    <legend className="text-lg font-semibold text-gray-800 border-l-4 border-purple-500 pl-3">{title}</legend>
    <div className="pl-5 space-y-6">{children}</div>
  </fieldset>
);

const InputField: React.FC<{ label: string; error?: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ label, error, children, icon }) => (
  <div className="relative">
    {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">{icon}</span>}
    {label && <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>}
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const inputStyles = "w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner";
