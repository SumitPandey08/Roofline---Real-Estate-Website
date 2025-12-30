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

/* ---------------- CENTER NAV DATA ---------------- */

const centerNav: CenterNavItem[] = [
  {
    title: "For Buyers",
    options: [
      {
        section: "Search",
        items: [
          "Buy Residential",
          "Buy Commercial",
          "New Projects",
          "Explore Localities",
        ],
      },
      {
        section: "Guidance",
        items: ["Legal Services", "Buyer Guide", "EMI Calculator"],
      },
    ],
  },
  {
    title: "For Tenants",
    options: [
      {
        section: "Rentals",
        items: ["Find Rental Property", "PG & Co-living", "Short-term Rentals"],
      },
      {
        section: "Documentation",
        items: ["Rent Agreement", "Rent Receipt Generator"],
      },
    ],
  },
  {
    title: "For Sellers",
    options: [
      {
        section: "List Property",
        items: ["Post Property Free", "Seller Plans & Pricing"],
      },
      {
        section: "Tools",
        items: [
          "Property Value Calculator",
          "Seller Guide",
          "Real Estate Trends",
        ],
      },
    ],
  },
  {
    title: "Services",
    options: [
      {
        section: "Housing Edge",
        items: ["Home Loan", "Housing Protect", "Housing Premium"],
      },
      {
        section: "Tools",
        items: [
          "EMI Calculator",
          "Property Value Calculator",
          "Rent Receipt Generator",
        ],
      },
    ],
  },
];

/* ---------------- NAVBAR ---------------- */

const Navbar: React.FC<NavbarProps> = ({ child = false }) => {
  const [navState, setNavState] = useState<"top" | "hidden" | "scrolled">("top");
  const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string>("Select Location");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (child) {
        // Don't apply hidden effect when child is true
        setNavState(y > 53 ? "scrolled" : "top");
      } else {
        if (y <= 53) {
          setNavState("top");
        } else if (y > 53 && y <= 510) {
          setNavState("hidden");
        } else {
          setNavState("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [child]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`
          fixed top-0 left-0 w-full h-[66px] z-50
          transition-all duration-300 ease-in-out
          ${
            navState === "hidden"
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }
        `}
        style={{
          backgroundColor:
            navState === "scrolled" || child ? "rgba(0,0,0,0.6)" : "transparent",
          backdropFilter: navState === "scrolled" || child ? "blur(10px)" : "none",
          WebkitBackdropFilter:
            navState === "scrolled" || child ? "blur(10px)" : "none",
          boxShadow:
            navState === "scrolled" || child
              ? "0 4px 20px rgba(0,0,0,0.25)"
              : "none",
          borderBottom:
            navState === "scrolled" || child
              ? "1px solid rgba(255,255,255,0.15)"
              : "none",
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center text-white">
          {/* LOGO */}
          <div className="relative w-[150px] h-[40px] flex-shrink-0">
            <Image
              src="/logo.webp"
              alt="Company Logo"
              width={150}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          {/* CENTER NAV OR SEARCH BAR */}
          {!child ? (
            <div className="hidden md:flex space-x-6 text-sm font-semibold">
              {centerNav.map((navItem, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center cursor-pointer hover:text-blue-400 transition">
                    {navItem.title}
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* DROPDOWN */}
                  <div
                    className="
                      absolute left-0 mt-2 min-w-[260px]
                      bg-white text-gray-800 rounded-lg shadow-xl
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transform scale-y-95 group-hover:scale-y-100
                      transition-all duration-200 origin-top
                      p-4 border border-gray-100
                    "
                  >
                    {navItem.options.map((option, optIndex) => (
                      <div key={optIndex} className="mb-4 last:mb-0">
                        <div className="text-sm font-semibold text-blue-600 mb-2 border-b pb-1">
                          {option.section}
                        </div>
                        <ul className="space-y-1">
                          {option.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm hover:text-blue-600 cursor-pointer transition"
                            >
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
            <div className="hidden md:flex flex-1 mx-8">
              <div className="w-full flex items-center bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/20">
                <svg
                  className="w-5 h-5 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="bg-transparent ml-3 text-white placeholder-white/70 focus:outline-none flex-1"
                />
                <span className="text-white/70 text-sm ml-3 border-l border-white/20 pl-3">
                  📍 {currentLocation}
                </span>
              </div>
            </div>
          )}

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-sm hover:text-blue-400 cursor-pointer">
              News & Guide
            </span>

            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition">
              Post Property <span className="text-xs">FREE</span>
            </button>

            {/* RIGHT BAR BUTTON */}
            <button
              onClick={() => setIsRightBarOpen(true)}
              className="px-3 py-2 rounded-md bg-white/20 hover:bg-white/30 transition text-white"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* ================= RIGHT BAR ================= */}
      <RightBar
        isOpen={isRightBarOpen}
        onClose={() => setIsRightBarOpen(false)}
      />
    </>
  );
};

export default Navbar;
