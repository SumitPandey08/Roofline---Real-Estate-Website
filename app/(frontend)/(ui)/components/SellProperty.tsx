import React from 'react';
import Link from 'next/link';

const SellProperty: React.FC = () => {
  const backgroundPatternUrl =
    "url(https://c.housingcdn.com/demand/s/client/common/assets/background.f6f06186.svg)";

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-6">
        Have a property to sell?
      </h1>

      {/* CTA Card */}
      <div
        className="
          rounded-xl
          shadow-lg
          text-center
          px-6 sm:px-12
          py-10
        "
        style={{
          backgroundImage: backgroundPatternUrl,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
          List your property & connect with clients faster!
        </h2>

        {/* OUTLINED BUTTON */}
        <button
          className="
            bg-white
            text-indigo-700
            border-2 border-indigo-700
            font-semibold
            text-base sm:text-lg
            py-3 px-8
            rounded-lg
            hover:bg-indigo-50
            transition
          "
        >
          <Link href="/auth/admin/phone-verify">Sell Your Property</Link>
        </button>
      </div>
    </section>
  );
};

export default SellProperty;
