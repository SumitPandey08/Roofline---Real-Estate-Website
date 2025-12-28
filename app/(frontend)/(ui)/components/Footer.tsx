import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div>
      {/* PART OF SECTION */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <h3 className="text-gray-400 font-semibold text-sm">Part of</h3>
          <div className="relative w-28 h-12 bg-white rounded px-2 py-1 flex items-center justify-center">
            <Image
              src="https://c.housingcdn.com/demand/s/client/common/assets/REAGroup.e5435593.png"
              alt="REA Group Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <footer className="bg-[#1c1c1c] text-gray-300">
        {/* TOP LINKS */}
        <div className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-700">
          {/* Section Headings */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-xs uppercase tracking-wide text-gray-400 mb-6">
            <span>For Buyers</span>
            <span>For Tenants</span>
            <span>Projects</span>
            <span>Popular Cities</span>
            <span className="border-b-2 border-white pb-2 inline-block">
              Popular Searches
            </span>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm leading-7">
            {/* Popular Property Searches */}
            <div className="col-span-2">
              <h4 className="text-white font-semibold mb-4">
                Popular property related searches
              </h4>
              <ul className="space-y-2">
                <li>Convert square meter to square feet</li>
                <li>Convert square feet to square meter</li>
                <li>Convert acre to square feet</li>
                <li>Convert square feet to acre</li>
                <li>Convert hectare to acre feet</li>
                <li>Convert hectare to square meter</li>
                <li>Convert acre to hectare</li>
              </ul>
            </div>

            {/* Cities / Projects */}
            <div>
              <ul className="space-y-2 mt-10 md:mt-0">
                <li>List of all residential cities</li>
                <li>List of all cities for rentals</li>
                <li>Explore localities by city</li>
                <li>Find projects by city</li>
                <li>Find rental societies by city</li>
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <ul className="space-y-2 mt-10 md:mt-0">
                <li>Properties in India</li>
                <li>Agricultural Lands in India</li>
                <li>Plots in India</li>
                <li>Flats in India</li>
                <li>Great Places to Work – Housing.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* LOWER FOOTER */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  For Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Annual Return
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Unsubscribe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Merger Hearing Advertisement
                </a>
              </li>
            </ul>
          </div>

          {/* Partner Sites */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">
              Partner Sites
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  realestate.com.au
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  realtor.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  99.co
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  collinsdictionary.com
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Home Loans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  International
                </a>
              </li>
            </ul>
          </div>

          {/* App */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">
              Experience Housing App on Mobile
            </h4>

            <div className="flex items-start gap-8">
              <div className="space-y-3">
                <p>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Housing iOS App
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Housing Android App
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Open camera & scan the QR code to download the app
                </p>
              </div>

              <div className="w-28 h-28 bg-white rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700 flex-shrink-0">
                QR Code
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
          ©2012–25 Locon Solutions Pvt. Ltd
        </div>
      </footer>
    </div>
  );
};

export default Footer;
