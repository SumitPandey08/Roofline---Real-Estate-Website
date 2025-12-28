"use client";

import React from "react";
import {
  IoEyeOutline,
  IoHeartOutline,
  IoCallOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { IconType } from "react-icons";

interface ActivityItem {
  title: string;
  icon: IconType;
}

const Activity: React.FC = () => {
  const activityData: ActivityItem[] = [
    {
      title: "Viewed Properties",
      icon: IoEyeOutline,
    },
    {
      title: "Saved Properties",
      icon: IoHeartOutline,
    },
    {
      title: "Contacted Agents",
      icon: IoCallOutline,
    },
    {
      title: "Searched Properties",
      icon: IoSearchOutline,
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        My Activities
      </h3>

      <ul className="space-y-3">
        {activityData.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={index}
              className="
                flex items-center gap-3
                px-3 py-2 rounded-lg
                cursor-pointer
                hover:bg-white hover:shadow-sm
                transition
              "
            >
              {/* ICON */}
              <span className="text-blue-600 text-lg">
                <Icon />
              </span>

              {/* TEXT */}
              <span className="text-sm font-medium text-gray-700">
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Activity;
