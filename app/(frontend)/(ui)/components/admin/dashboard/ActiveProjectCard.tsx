"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdLocationOn, MdChevronRight, MdHome } from 'react-icons/md';
import { IProject } from '@/app/(backend)/models/project.model';

export type ProjectCardData = Omit<IProject, '_id'> & { _id: string };

interface ActiveProjectCardProps {
    data: ProjectCardData;
}

const ActiveProjectCard: React.FC<ActiveProjectCardProps> = ({ data }) => {
    const { name, location, images, projectStatus, startingPrice, endingPrice, _id } = data;

    const imageUrl = (images && images.length > 0) ? images[0] : 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='; 
    
    const formattedPrice = `₹${startingPrice.toLocaleString()} - ₹${endingPrice.toLocaleString()}`;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row items-center p-2 gap-6">
            
            {/* 1. Image Section */}
            <Link href={`/admin/dashboard/projects/${_id}`} className="relative h-32 w-full md:w-48 flex-shrink-0">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="100vw"
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                     <span
                        className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}
                    >
                        <span
                            aria-hidden
                            className={`absolute inset-0 ${
                                projectStatus === "completed"
                                    ? "bg-green-200"
                                    : projectStatus === "ongoing"
                                    ? "bg-yellow-200"
                                    : "bg-red-200"
                            } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{projectStatus}</span>
                    </span>
                </div>
            </Link>

            {/* 2. Main Info Section */}
            <div className="flex-1 min-w-0 py-2">
                <Link href={`/admin/dashboard/projects/${_id}`}>
                    <div className="mb-1">
                        <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-purple-600 transition-colors">
                            {name}
                        </h3>
                        <div className="flex items-center text-slate-400 gap-1">
                            <MdLocationOn size={14} />
                            <span className="text-xs truncate">{location}</span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* 3. Price and Action Section */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto md:min-w-[200px] gap-2 pr-4 border-t md:border-t-0 md:border-l border-slate-50 pt-3 md:pt-0 md:pl-6">
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Price Range</p>
                    <p className="text-lg font-black text-slate-800">{formattedPrice}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/admin/dashboard/projects/${_id}`} className="p-2 bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-400 rounded-xl transition-all">
                        <MdChevronRight size={24} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ActiveProjectCard;
