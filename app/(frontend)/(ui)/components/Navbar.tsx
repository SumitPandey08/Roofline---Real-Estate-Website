"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import RightBar from "./RightBar";

/* ---------------- INTERFACES ---------------- */
interface NavOption {
  section: string;
  items: string[];
}

interface CenterNavItem {
  title: string;
  options: NavOption[];
}

interface NavbarProps {
  child?: boolean;
}

const centerNav: CenterNavItem[] = [
  {
    title: "For Buyers",
    options: [
      { section: "Search", items: ["Buy Residential", "Buy Commercial", "New Projects", "Explore Localities"] },
      { section: "Guidance", items: ["Legal Services", "Buyer Guide", "EMI Calculator"] },
    ],
  },
  {
    title: "For Tenants",
    options: [
      { section: "Rentals", items: ["Find Rental Property", "PG & Co-living", "Short-term Rentals"] },
      { section: "Documentation", items: ["Rent Agreement", "Rent Receipt Generator"] },
    ],
  },
  {
    title: "For Sellers",
    options: [
      { section: "List Property", items: ["Post Property Free", "Seller Plans & Pricing"] },
      { section: "Tools", items: ["Property Value Calculator", "Seller Guide", "Real Estate Trends"] },
    ],
  },
  {
    title: "Services",
    options: [
      { section: "Housing Edge", items: ["Home Loan", "Housing Protect", "Housing Premium"] },
      { section: "Tools", items: ["EMI Calculator", "Property Value Calculator", "Rent Receipt Generator"] },
    ],
  },
];

const Navbar: React.FC<NavbarProps> = ({ child = false }) => {
  const [navState, setNavState] = useState<"top" | "hidden" | "scrolled">("top");
  const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (child) {
        setNavState(y > 50 ? "scrolled" : "top");
      } else {
        if (y <= 50) setNavState("top");
        else if (y > 50 && y <= 400) setNavState("hidden");
        else setNavState("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [child]);

  const isDarkBg = navState === "scrolled" || child;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-[72px] z-50 transition-all duration-500 ease-in-out border-b
          ${navState === "hidden" ? "-translate-y-full" : "translate-y-0"}
          ${isDarkBg 
            ? "bg-slate-900/80 backdrop-blur-md border-white/10 shadow-2xl" 
            : "bg-transparent border-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center text-white">
          
          {/* LOGO */}
          <div className="relative w-[140px] h-[35px] cursor-pointer hover:opacity-80 transition flex-shrink-0">
            <Image src="/logo.webp" alt="Logo" fill className="object-contain" priority />
          </div>

          {/* CENTER NAV */}
          {!child ? (
            <div className="hidden lg:flex items-center space-x-1 h-full">
              {centerNav.map((navItem, index) => (
                <div key={index} className="relative group h-full flex items-center">
                  <button className="flex items-center px-4 py-2 text-[15px] font-medium transition-colors hover:text-blue-400">
                    {navItem.title}
                    <svg className="w-3.5 h-3.5 ml-1.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                    {/* Hover Underline */}
                    <span className="absolute bottom-[20px] left-4 right-8 h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>

                  {/* MEGA DROPDOWN */}
                  <div className="absolute left-0 top-[72px] w-[500px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 p-6 grid grid-cols-2 gap-8 border border-gray-100">
                    {/* Invisible Bridge to prevent closing on hover move */}
                    <div className="absolute -top-[10px] left-0 w-full h-[10px]" />
                    
                    {navItem.options.map((option, optIndex) => (
                      <div key={optIndex}>
                        <h4 className="text-[12px] uppercase tracking-wider font-bold text-slate-400 mb-3">
                          {option.section}
                        </h4>
                        <ul className="space-y-3">
                          {option.items.map((item, i) => (
                            <li key={i} className="text-[14px] text-slate-700 hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer font-medium">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* SEARCH BAR FOR CHILD MODE */
            <div className="hidden md:flex flex-1 max-w-2xl mx-12">
              <div className="w-full flex items-center bg-white/10 hover:bg-white/20 focus-within:bg-white/25 focus-within:ring-2 ring-blue-500/50 rounded-full px-5 py-2.5 transition-all border border-white/10">
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Search locality, project..." className="bg-transparent ml-3 text-white placeholder-white/50 focus:outline-none flex-1 text-sm" />
                <div className="flex items-center ml-3 border-l border-white/20 pl-4 text-sm font-medium">
                  <span className="mr-1">📍</span>
                  <span className="truncate max-w-[100px]">New York</span>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-5">
            <span className="hidden xl:block text-[14px] font-medium hover:text-blue-400 cursor-pointer transition">
              News & Guide
            </span>

            <button className="relative group overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 rounded-full text-[14px] font-bold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all active:scale-95">
              <span className="relative z-10 flex items-center">
                Post Property <span className="ml-2 text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase tracking-tighter">Free</span>
              </span>
            </button>

            <button
              onClick={() => setIsRightBarOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <RightBar isOpen={isRightBarOpen} onClose={() => setIsRightBarOpen(false)} />
    </>
  );
};

export default Navbar;