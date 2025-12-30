


"use client";



import Image from 'next/image';

import React from 'react';
import Link from 'next/link';



const PropertySell: React.FC = () => {

  return (

    <div className="bg-gradient-to-br from-[#fff3db] to-[#ffe8c0] border border-[#f1ba5b] p-5 rounded-xl shadow-lg overflow-hidden">

      {/* Image Container */}

      <div className="flex justify-center mb-4">

        <div className="relative w-full h-[180px]">

          <Image

            src="https://c.housingcdn.com/demand/s/client/common/assets/postProperty.3f9c046b.svg"

            alt="Property Listing"

            fill

            className="object-contain"

            priority

          />

        </div>

      </div>



      {/* Content Container */}

      <div className="text-center space-y-3">

        <h3 className="text-lg font-bold text-gray-800">

          Ready to List Your Property?

        </h3>

        <p className="text-sm text-gray-600">

          Reach millions of potential buyers and renters

        </p>


      
        <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#f1ba5b] to-[#e8a84a] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95">

          <Link href="/auth/admin/phone-verify">Post a Property</Link>

        </button>

      </div>

    </div>

  );

};



export default PropertySell;
