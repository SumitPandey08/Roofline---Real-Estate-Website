import React from "react";
import Image from "next/image";

interface Benefit {
  image: string;
  title: string;
  description: string;
}

interface BenefitCardProps {
  data: Benefit;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ data }) => {
  const { image, title, description } = data;

  return (
    <div
      className="
        bg-white rounded-xl
        p-6
        flex flex-col items-center text-center
        shadow-sm hover:shadow-md
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative w-20 h-20 mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* TEXT */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
