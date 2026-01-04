"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyType {
  id: string;
  type: string;
  route: string;
  heroImg: string;
  tagline: string;
}

const propertyTypes: PropertyType[] = [
  { id: "buy", type: "Buy", route: "/buy", tagline: "Find your forever home", heroImg: "https://c.housingcdn.com/demand/s/client/common/assets/buyCover.36ede2d6.jpg" },
  { id: "rent", type: "Rent", route: "/rent", tagline: "Rentals tailored to you", heroImg: "https://c.housingcdn.com/demand/s/client/common/assets/rentCover.c47ae7d7.jpg" },
  { id: "pg", type: "PG", route: "/pg", tagline: "Co-living made easy", heroImg: "https://c.housingcdn.com/demand/s/client/common/assets/pgCover.d07e5816.jpg" },
  { id: "plots", type: "Plots", route: "/plots", tagline: "Build your legacy", heroImg: "https://c.housingcdn.com/demand/s/client/common/assets/plotsCover.effff013.jpg" },
  { id: "commercial", type: "Commercial", route: "/commercial", tagline: "Elevate your business", heroImg: "https://c.housingcdn.com/demand/s/client/common/assets/commercialCover.c5df3aef.jpg" },
];

const locations = ["Indore", "Bhopal", "Mumbai", "Pune", "Bangalore"];

const Hero: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocation, setCurrentLocation] = useState<string>("Indore");
  const [activeType, setActiveType] = useState<string>("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const match = propertyTypes.find((item) => item.route === pathname);
    if (match) {
      setActiveType(match.type);
    }
  }, [pathname]);

  const activeConfig = useMemo(() => propertyTypes.find((item) => item.type === activeType), [activeType]);

  const handleSearch = () => {
    const route = activeConfig?.route || "/";
    const params = new URLSearchParams();
    if (currentLocation) params.set("location", currentLocation);
    if (searchQuery) params.set("q", searchQuery);
    router.push(`${route}?${params.toString()}`);
  };

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* BACKGROUND IMAGE ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeConfig?.heroImg || ""}
            alt="Background"
            fill
            priority
            className="object-cover brightness-75"
          />
          {/* Godly Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative z-20 w-full max-w-6xl px-6 flex flex-col items-center">
        
        {/* TOP STATUS TAG */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-xs font-bold uppercase tracking-widest text-white/90">
            2,400+ Properties active in {currentLocation}
          </p>
        </motion.div>

        {/* HEADING SECTION */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight"
          >
            {activeConfig?.tagline}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200/80 font-medium"
          >
            Verified listings with zero brokerage options.
          </motion.p>
        </div>

        {/* PILL NAVIGATION */}
        <motion.nav 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex bg-slate-950/40 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10 mb-6"
        >
          {propertyTypes.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.route)}
              className={`relative px-6 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl
                ${activeType === item.type ? "text-blue-600" : "text-white/60 hover:text-white"}`}
            >
              {activeType === item.type && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-white rounded-xl shadow-lg" 
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.type}</span>
            </button>
          ))}
        </motion.nav>

        {/* PREMIUM SEARCH BOX */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`w-full max-w-5xl bg-white rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 ${isFocused ? 'ring-4 ring-blue-500/20 scale-[1.01]' : ''}`}
        >
          {/* Location Selector */}
          <div className="flex items-center w-full md:w-auto px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 group">
            <span className="text-xl mr-2">📍</span>
            <select
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer w-full md:w-32"
            >
              {locations.map((loc) => <option key={loc}>{loc}</option>)}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-grow flex items-center px-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter Locality, Landmark, or Project Name..."
              className="w-full p-4 bg-transparent text-slate-900 placeholder-slate-400 font-medium outline-none"
            />
          </div>

          {/* CTA Button */}
          <button 
            type="button"
            onClick={handleSearch}
            className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white font-black px-10 py-4 rounded-2xl transition-all active:scale-95 shadow-xl"
          >
            SEARCH
          </button>
        </motion.div>

        {/* POPULAR TAGS (The "Active" feel) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {['Gated Community', 'Newly Launched', 'Ready to Move', 'Owner Properties'].map((tag) => (
            <span key={tag} className="text-xs font-bold text-white/50 hover:text-white cursor-pointer transition border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
              # {tag}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;