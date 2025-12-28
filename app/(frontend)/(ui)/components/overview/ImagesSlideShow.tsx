"use client";

import React from "react";
import Image from "next/image";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

interface ImagesSlideShowProps {
  images?: string[];
  title?: string;
}

const ImagesSlideShow: React.FC<ImagesSlideShowProps> = ({ images = [], title = "Property" }) => {
  const [curr, setCurr] = React.useState(0);

  if (!images.length) {
    return (
      <div className="mx-auto w-full max-w-[900px] h-72 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
        No images available
      </div>
    );
  }

  const nextImage = () =>
    setCurr((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurr((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mx-auto relative w-full max-w-[900px] h-80 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">

      {/* IMAGE */}
      <Image
        src={images[curr]}
        alt={`${title} - image ${curr + 1}`}
        fill
        sizes="(max-width: 900px) 100vw, 900px"
        priority
        className="object-cover"
      />

      {/* LEFT CONTROL */}
      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="
            absolute left-4 top-1/2 -translate-y-1/2
            bg-white/90 hover:bg-white
            text-gray-700
            p-2 rounded-full
            shadow-md
            transition
          "
        >
          <IoChevronBackOutline size={20} />
        </button>
      )}

      {/* RIGHT CONTROL */}
      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            bg-white/90 hover:bg-white
            text-gray-700
            p-2 rounded-full
            shadow-md
            transition
          "
        >
          <IoChevronForwardOutline size={20} />
        </button>
      )}

      {/* IMAGE COUNT */}
      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
        {curr + 1}/{images.length}
      </div>
    </div>
  );
};

export default ImagesSlideShow;
