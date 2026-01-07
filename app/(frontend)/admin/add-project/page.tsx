"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Amenity, Configuration } from "@/app/constants"; // Assuming you have these constants
import { MdTitle, MdDescription, MdAttachMoney, MdLocationOn, MdHome, MdHotel, MdBathroom, MdAspectRatio, MdCloudUpload, MdClose, MdMap, MdBusiness, MdPinDrop, MdPublic, MdPhone, MdEmail, MdLink, MdCalendarToday, MdStar, MdCheckBox, MdCheck, MdRadioButtonChecked, MdRadioButtonUnchecked, MdInfo } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

// Define the Zod schema for validation
const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  images: z.array(z.string().url("Invalid URL")).min(1, "At least one image is required"),
  reraNumber: z.string().min(1, "RERA number is required"),
  sizeRange: z.string().min(1, "Size range is required"),
  startingPrice: z.number().min(0, "Price cannot be negative"),
  endingPrice: z.number().min(0, "Price cannot be negative"),
  configuration: z.array(z.string()).min(1, "Select at least one configuration"),
  averagePricePerSqFt: z.number().min(0, "Price must be positive"),
  projectStatus: z.enum(["upcoming", "ongoing", "completed"]),
  possessionDate: z.string().min(1, "Possession date is required"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  projectUnits: z.number().min(1, "At least one unit is required"),
  soldUnits: z.number().min(0, "Sold units cannot be negative"),
}).refine(data => data.endingPrice >= data.startingPrice, {
  message: "Ending price must be greater than or equal to starting price",
  path: ["endingPrice"],
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function AddProjectPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectStatus: "upcoming",
      images: [],
      configuration: [],
      amenities: [],
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

    setIsUploading(true);
    const uploadToast = toast.loading("Uploading images...");

    try {
        const formData = new FormData();
        files.forEach(file => {
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
        const uploadedUrls = uploadResult.urls;
        
        const currentImages = getValues("images");
        setValue("images", [...currentImages, ...uploadedUrls]);

        toast.success("Images uploaded successfully!", { id: uploadToast });

    } catch (error) {
        toast.error("Image upload failed.", { id: uploadToast });
    } finally {
        setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    console.log("Form data submitted:", data);

    const finalData = {
        ...data,
        possessionDate: new Date(data.possessionDate),
    };
    
    await toast.promise(
        (async () => {
            try {
                const projectResponse = await fetch("/api/project/add-project", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(finalData),
                });

                const responseData = await projectResponse.json();

                if (!projectResponse.ok) {
                  if (responseData.errors) {
                    throw new Error(responseData.errors.join("\n"));
                  }
                  throw new Error(responseData.message || "Failed to create project");
                }

                reset();
                setPreviewUrls([]);
                return "Project created successfully!";
            } catch (error: any) {
                throw new Error(error.message || "An unknown error occurred.");
            }
        })(),
        {
          loading: 'Creating project...',
          success: (message) => `${message}`,
          error: (error) => `${error.message}`,
        }
    );
  };
  const onError = (errors: any) => {
    if (Object.keys(errors).length > 0) {
      console.error("Form validation errors:", errors);
      let errorMessages = "";
      for (const key in errors) {
          if (errors[key].message) {
              errorMessages += errors[key].message + "\n";
          }
      }
      toast.error(errorMessages || "Please fill all required fields");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster />
      <div className="bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)] rounded-[2.5rem] p-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Add New Project</h1>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Project Images</label>
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
                            <Image src={url} alt={`Preview project ${index}`} width={200} height={200} className="rounded-xl object-cover w-full h-32" />

                            {/* Add a remove button if needed */}
                        </div>
                    ))}
                </div>
            )}
            {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>}
          </div>

          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Project Name" error={errors.name?.message} icon={<MdTitle />}>
                <input {...register("name")} className={inputStyles} />
              </InputField>
              <InputField label="RERA Number" error={errors.reraNumber?.message} icon={<MdAttachMoney />}>
                <input {...register("reraNumber")} className={inputStyles} />
              </InputField>
            </div>
            <InputField label="Location" error={errors.location?.message} icon={<MdLocationOn />}>
              <input {...register("location")} className={inputStyles} />
            </InputField>
          </FormSection>

          <FormSection title="Pricing & Units">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Starting Price (₹)" error={errors.startingPrice?.message} icon={<MdAttachMoney />}>
                    <input type="number" {...register("startingPrice", { valueAsNumber: true })} className={inputStyles}/>
                </InputField>
                <InputField label="Ending Price (₹)" error={errors.endingPrice?.message} icon={<MdAttachMoney />}>
                    <input type="number" {...register("endingPrice", { valueAsNumber: true })} className={inputStyles}/>
                </InputField>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Project Units" error={errors.projectUnits?.message} icon={<MdHome />}>
                    <input type="number" {...register("projectUnits", { valueAsNumber: true })} className={inputStyles}/>
                </InputField>
                <InputField label="Sold Units" error={errors.soldUnits?.message} icon={<MdHome />}>
                    <input type="number" {...register("soldUnits", { valueAsNumber: true })} className={inputStyles}/>
                </InputField>
            </div>
             <InputField label="Average Price per Sq. Ft." error={errors.averagePricePerSqFt?.message} icon={<MdAttachMoney />}>
                <input type="number" {...register("averagePricePerSqFt", { valueAsNumber: true })} className={inputStyles}/>
            </InputField>
          </FormSection>
          
          <FormSection title="Details & Status">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Size Range (e.g., 1200-1800 sqft)" error={errors.sizeRange?.message} icon={<MdAspectRatio />}>
                    <input {...register("sizeRange")} className={inputStyles}/>
                </InputField>
                <InputField label="Possession Date" error={errors.possessionDate?.message} icon={<MdCalendarToday />}>
                    <input type="date" {...register("possessionDate")} className={inputStyles}/>
                </InputField>
            </div>
            <InputField label="Project Status" error={errors.projectStatus?.message} icon={<MdInfo />}>
              <select {...register("projectStatus")} className={inputStyles + " appearance-none"}>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </InputField>
          </FormSection>

          <FormSection title="Configuration">
             <Controller
                name="configuration"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Configuration.map((config) => (
                      <label key={config.id} className="flex items-center space-x-3 p-3 border border-purple-100 rounded-lg hover:bg-purple-50 cursor-pointer shadow-sm">
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                          checked={field.value?.includes(config.id)}
                          onChange={(e) => {
                            const selected = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...selected, config.id]);
                            } else {
                              field.onChange(selected.filter((id) => id !== config.id));
                            }
                          }}
                        />
                        <span className="text-gray-700">{config.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.configuration && <p className="text-xs text-red-500 mt-1">{errors.configuration.message}</p>}
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

          <FormSection title="Description">
            <InputField label="" error={errors.description?.message} icon={<MdDescription />}>
              <textarea {...register("description")} rows={5} className={inputStyles} />
            </InputField>
          </FormSection>

          <div className="pt-6 border-t border-purple-100">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] hover:shadow-xl mt-4 disabled:opacity-50"
            >
              {isSubmitting || isUploading ? "Processing..." : "Submit Project"}
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