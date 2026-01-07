import React from 'react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiBuildingHouse } from 'react-icons/bi';

interface HighlightData {
  name: string;
  price: string;
  type: string;
  location: string;
  image: string;
}

interface TopHightlightProps {
  data: HighlightData;
}

const TopHightlight: React.FC<TopHightlightProps> = ({ data }) => { 
  const { name, price, type, location, image } = data;

  return (
    <div className="group relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
      
      {/* Background Image with Zoom Effect on Hover */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover z-0 transition-transform duration-700 group-hover:scale-110"
        priority
      />

      {/* Advanced Gradient Overlay */}
      {/* Gradients from transparent at top to dark at bottom create a "cinema" look */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className="flex items-center gap-1 bg-blue-600/90 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg shadow-lg">
          <BiBuildingHouse size={14} />
          {type}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20">
        
        {/* Location Info */}
        <div className="flex items-center gap-1 text-slate-200 text-sm mb-2 font-medium">
          <HiOutlineLocationMarker className="text-blue-400" />
          <span className="truncate">{location}</span>
        </div>

        {/* Property Name */}
        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
          {name}
        </h3>

        {/* Pricing Section with modern styling */}
        <div className="flex items-end justify-between border-t border-white/20 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-300 font-bold tracking-wider">Starting From</span>
            <span className="text-2xl font-black text-white leading-none">
              {price}
            </span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg group-hover:bg-white group-hover:text-black transition-all duration-300">
             <HiOutlineArrowRight />
          </div>
        </div>
        
      </div>
    </div>
  );
};

// Internal Helper for the arrow icon used above
const HiOutlineArrowRight = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
  </svg>
);

export default TopHightlight;