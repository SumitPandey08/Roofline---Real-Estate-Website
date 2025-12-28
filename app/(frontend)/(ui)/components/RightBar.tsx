"use client";

import React from "react";
import AccountStatus from "./sidebar/Account";
import Activity from "./sidebar/Activity";
import PropertySell from './sidebar/PropertySell';
import More from "./sidebar/More";

interface RightBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightBar: React.FC<RightBarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}

      {/* RIGHT BAR */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[320px] bg-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Account
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-60px)]">

          {/* ACCOUNT STATUS */}
          <AccountStatus />

          {/* ACTIVITY */}
          <Activity/>

          <PropertySell/>

          <More />

          {/* COMING SOON */}
          <div className="mt-10 text-center border-t pt-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Coming Soon
            </p>
            <p className="mt-2 text-xs text-gray-400">
              More account features are on the way 🚀
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default RightBar;
