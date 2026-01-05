import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdLocationOn, MdPeople, MdBarChart, MdChevronRight, MdBathroom, MdStar } from 'react-icons/md';
import { IProperty } from '@/app/(backend)/models/property.model';

export type PropertyCardData = Omit<IProperty, '_id'> & { _id: string };

interface ActivePropertyCardProps {
    data: PropertyCardData;
    onFeatureToggle: (id: string, isFeatured: boolean) => void;
}

const ActivePropertyCard: React.FC<ActivePropertyCardProps> = ({ data, onFeatureToggle }) => {
    const { title, address, images, propertyType, price, _id, listingType, pricePeriod, areaUnit, featured } = data;

    const location = address ? `${address.city}, ${address.state}` : 'N/A';
    const imageUrl = (images && images.length > 0) ? images[0] : 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='; 
    
    const formattedPrice = `₹${price.toLocaleString()}`;

    const handleFeatureClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onFeatureToggle(_id.toString(), !featured?.isFeatured);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row items-center p-2 gap-6">
            
            {/* 1. Image Section */}
            <Link href={`/admin/dashboard/${_id}`} className="relative h-32 w-full md:w-48 flex-shrink-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-tighter text-purple-600">{propertyType}</span>
                </div>
                {featured?.isFeatured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1 rounded-full">
                        <MdStar size={14} />
                    </div>
                )}
            </Link>

            {/* 2. Main Info Section */}
            <div className="flex-1 min-w-0 py-2">
                <Link href={`/admin/dashboard/${_id}`}>
                    <div className="mb-1">
                        <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-purple-600 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center text-slate-400 gap-1">
                            <MdLocationOn size={14} />
                            <span className="text-xs truncate">{location}</span>
                        </div>
                    </div>
                </Link>
                
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                    {(data.bedrooms ?? 0) > 0 && (
                        <div className="flex items-center gap-1">
                            <MdPeople size={14} />
                            <span>{data.bedrooms} Beds</span>
                        </div>
                    )}
                    {(data.bathrooms ?? 0) > 0 && (
                        <div className="flex items-center gap-1">
                            <MdBathroom size={14} />
                            <span>{data.bathrooms} Baths</span>
                        </div>
                    )}
                    {data.area > 0 && (
                        <div className="flex items-center gap-1">
                            <MdBarChart size={14} />
                            <span>{data.area} {areaUnit}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Price and Action Section */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto md:min-w-[120px] gap-2 pr-4 border-t md:border-t-0 md:border-l border-slate-50 pt-3 md:pt-0 md:pl-6">
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Price</p>
                    <p className="text-lg font-black text-slate-800">{formattedPrice} {listingType === 'rent' && `/ ${pricePeriod}`}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleFeatureClick}
                        className={`p-2 rounded-xl transition-all ${
                            featured?.isFeatured 
                                ? 'bg-yellow-400 text-white hover:bg-yellow-500' 
                                : 'bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-400'
                        }`}
                    >
                        <MdStar size={20} />
                    </button>
                    <Link href={`/admin/dashboard/${_id}`} className="p-2 bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-400 rounded-xl transition-all">
                        <MdChevronRight size={24} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ActivePropertyCard;