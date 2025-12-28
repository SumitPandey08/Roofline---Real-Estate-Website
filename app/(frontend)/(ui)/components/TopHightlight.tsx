import React from 'react';
import Image from 'next/image';

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
    
    <div 
      className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
    >
      
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover z-0"
        priority
      />

      {/* Dark Overlay - use rgba for consistent opacity and ensure proper stacking */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
      />

   
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-20">
        

        <div className="flex gap-3 mb-2 text-sm font-medium">
          <span className="bg-blue-600 px-3 py-1 rounded-full">{type}</span>
          <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full">{location}</span>
        </div>

   
        <h1 className="text-2xl font-bold mb-1 leading-tight drop-shadow-lg">
          {name}
        </h1>
        
    
        <h2 className="text-3xl font-extrabold text-green-300 drop-shadow-lg">
          {price}
        </h2>
        
      </div>
    </div>
  )
}

export default TopHightlight;