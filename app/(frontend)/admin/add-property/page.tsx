'use client';

import React, { useState } from 'react';
import { MdTitle, MdDescription, MdAttachMoney, MdLocationOn, MdHome, MdHotel, MdBathroom, MdAspectRatio, MdCloudUpload, MdClose, MdMap, MdBusiness, MdPinDrop, MdPublic, MdPhone, MdEmail, MdLink, MdCalendarToday, MdStar, MdCheckBox, MdCheck, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import Image from 'next/image';
import { useAdmin } from '@/app/(frontend)/context/AdminContext';

const AddPropertyPage = () => {
    const { adminData, loading: adminLoading } = useAdmin();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        listingType: 'sale',
        price: '',
        pricePeriod: 'once',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            location: {
                coordinates: ['', ''], // [longitude, latitude]
            },
        },
        propertyType: 'apartment',
        bedrooms: '',
        bathrooms: '',
        area: '',
        areaUnit: 'sqft',
        isFurnished: false,
        amenities: '',
        yearBuilt: '',
        virtualTourUrl: '',
        contact: {
            phone: '',
            email: '',
        },
        status: 'available',
    });
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (files.length === 0) {
            setError('Please upload at least one image.');
            setLoading(false);
            return;
        }

        if (!adminData || adminLoading) {
            setError('Admin data not loaded. Please try again.');
            setLoading(false);
            return;
        }

        try {
            const imageUrls = await uploadImages(files);
            const propertyData = {
                ...formData,
                amenities: formData.amenities.split(',').map(f => f.trim()),
                images: imageUrls,
                address: {
                    ...formData.address,
                    location: {
                        type: 'Point',
                        coordinates: [
                            parseFloat(formData.address.location.coordinates[0]),
                            parseFloat(formData.address.location.coordinates[1])
                        ],
                    }
                }
            };
            
            console.log('Property Data being sent:', propertyData);

            const response = await fetch('/api/property/add-property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add property');
            }

            setSuccess('Property added successfully!');
            // Reset form
            setFormData({
                title: '',
                description: '',
                listingType: 'sale',
                price: '',
                pricePeriod: 'once',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    location: {
                        coordinates: ['', ''],
                    },
                },
                propertyType: 'apartment',
                bedrooms: '',
                bathrooms: '',
                area: '',
                areaUnit: 'sqft',
                isFurnished: false,
                amenities: '',
                yearBuilt: '',
                virtualTourUrl: '',
                contact: { phone: '', email: '' },
                status: 'available',
            });
            setFiles([]);
            setImagePreviews([]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadImages = async (files: File[]) => {
        console.log("Files to upload:", files.length);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload images');
        }

        const data = await response.json();
        return data.urls;
    };


    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)] rounded-[2.5rem] p-8">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Add New Property</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                onChange={handleFileChange}
                            />
                            <p className="text-slate-500">Drag & drop images here or <span className="text-purple-600 font-bold">browse</span></p>
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <Image src={preview} alt={`preview ${index}`} width={200} height={200} className="rounded-xl object-cover w-full h-32" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MdClose size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="relative">
                        <MdTitle className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                        <input type="text" placeholder="Property Title" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </div>

                    {/* Address Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <MdMap className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="text" placeholder="Street Address" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} required />
                        </div>
                        <div className="relative">
                            <MdBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="text" placeholder="City" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.address.city} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })} required />
                        </div>
                        <div className="relative">
                            <MdPinDrop className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="text" placeholder="State" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.address.state} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })} required />
                        </div>
                        <div className="relative">
                            <MdPublic className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="text" placeholder="Zip Code" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.address.zipCode} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })} required />
                        </div>
                        <div className="relative">
                            <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder="Longitude" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.address.location.coordinates[0]} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, location: { ...formData.address.location, coordinates: [e.target.value, formData.address.location.coordinates[1]] } } })} required />
                        </div>
                        <div className="relative">
                            <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder="Latitude" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.address.location.coordinates[1]} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, location: { ...formData.address.location, coordinates: [formData.address.location.coordinates[0], e.target.value] } } })} required />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <MdDescription className="absolute left-4 top-5 text-purple-400" size={20} />
                        <textarea placeholder="A brief description of the property..." className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 h-32 resize-none outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {/* Listing Type */}
                        <div className="relative">
                            <span className="text-sm font-semibold text-slate-700">Listing Type</span>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center cursor-pointer">
                                    {formData.listingType === 'sale' ? <MdRadioButtonChecked className="text-purple-600" size={20} /> : <MdRadioButtonUnchecked size={20} />}
                                    <input type="radio" name="listingType" value="sale" checked={formData.listingType === 'sale'} onChange={(e) => setFormData({ ...formData, listingType: e.target.value, pricePeriod: 'once' })} className="hidden" />
                                    <span className="ml-2">Sale</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    {formData.listingType === 'rent' ? <MdRadioButtonChecked className="text-purple-600" size={20} /> : <MdRadioButtonUnchecked size={20} />}
                                    <input type="radio" name="listingType" value="rent" checked={formData.listingType === 'rent'} onChange={(e) => setFormData({ ...formData, listingType: e.target.value, pricePeriod: 'monthly' })} className="hidden" />
                                    <span className="ml-2">Rent</span>
                                </label>
                            </div>
                        </div>

                        {/* Price Period */}
                        {formData.listingType === 'rent' && (
                            <div className="relative">
                                 <MdHome className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                                <select className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner appearance-none" value={formData.pricePeriod} onChange={(e) => setFormData({ ...formData, pricePeriod: e.target.value })} required>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Price */}
                        <div className="relative">
                            <MdAttachMoney className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder="Price" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                        </div>

                        {/* Bedrooms */}
                        <div className="relative">
                            <MdHotel className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder="Bedrooms" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} />
                        </div>

                        {/* Bathrooms */}
                        <div className="relative">
                            <MdBathroom className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder="Bathrooms" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} />
                        </div>
                        
                        {/* Area */}
                        <div className="relative">
                            <MdAspectRatio className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder={`Area (${formData.areaUnit})`} className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} required />
                        </div>
                    </div>

                    {/* Area Unit & isFurnished */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                        <div className="relative">
                                 <MdHome className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                                <select className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner appearance-none" value={formData.areaUnit} onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })} required>
                                    <option value="sqft">Sqft</option>
                                    <option value="sqm">Sqm</option>
                                </select>
                        </div>
                        <div className="relative flex items-center">
                            <label className="flex items-center cursor-pointer">
                                {formData.isFurnished ? <MdCheckBox className="text-purple-600" size={24} /> : <MdCheckBox className='text-gray-400' size={24} />}
                                <input type="checkbox" checked={formData.isFurnished} onChange={(e) => setFormData({ ...formData, isFurnished: e.target.checked })} className="hidden" />
                                <span className="ml-2 text-slate-700 font-semibold">Is Furnished</span>
                            </label>
                        </div>
                    </div>

                    {/* Property Type, Year Built, Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative">
                            <MdHome className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <select className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner appearance-none" value={formData.propertyType} onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })} required>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                                <option value="commercial">Commercial</option>
                                <option value="office">Office</option>
                            </select>
                        </div>
                        <div className="relative">
                            <MdCalendarToday className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="number" placeholder="Year Built" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.yearBuilt} onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })} />
                        </div>
                         <div className="relative">
                            <MdHome className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <select className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner appearance-none" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                                <option value="rented">Rented</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="relative">
                        <MdStar className="absolute left-4 top-5 text-purple-400" size={20} />
                        <textarea placeholder="Amenities (comma-separated, e.g., Swimming Pool, Gym)" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 h-24 resize-none outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} />
                    </div>

                    {/* Virtual Tour URL */}
                    <div className="relative">
                        <MdLink className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                        <input type="text" placeholder="Virtual Tour URL" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.virtualTourUrl} onChange={(e) => setFormData({ ...formData, virtualTourUrl: e.target.value })} />
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="text" placeholder="Contact Phone" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.contact.phone} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })} required />
                        </div>
                        <div className="relative">
                            <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                            <input type="email" placeholder="Contact Email" className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner" value={formData.contact.email} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} required />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] hover:shadow-xl mt-4 disabled:bg-purple-400"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Property'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyPage;