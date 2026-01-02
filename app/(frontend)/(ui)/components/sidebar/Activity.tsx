"use client";

import React, { useState, useEffect } from "react";
import {
  IoEyeOutline,
  IoHeartOutline,
  IoCallOutline,
} from "react-icons/io5";
import { IconType } from "react-icons";
import Link from "next/link";

interface ActivityItem {
  title: string;
  icon: IconType;
  count: number;
  href: string;
}

const Activity: React.FC = () => {
  const [activityCounts, setActivityCounts] = useState({
    viewed: 0,
    saved: 0,
    contacted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityCounts = async () => {
      try {
        const [viewedRes, savedRes, contactedRes] = await Promise.all([
          fetch("/api/users/get-seen-properties"),
          fetch("/api/users/get-saved-properties"),
          fetch("/api/users/get-contacted-properties"),
        ]);

        const viewedData = await viewedRes.json();
        const savedData = await savedRes.json();
        const contactedData = await contactedRes.json();

        setActivityCounts({
          viewed: viewedData.data?.length || 0,
          saved: savedData.data?.length || 0,
          contacted: contactedData.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch activity counts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityCounts();
  }, []);

  const activityData: ActivityItem[] = [
    {
      title: "Viewed Properties",
      icon: IoEyeOutline,
      count: activityCounts.viewed,
      href: "/user/viewed-properties", // Assuming a route will be created for this
    },
    {
      title: "Saved Properties",
      icon: IoHeartOutline,
      count: activityCounts.saved,
      href: "/user/save-property",
    },
    {
      title: "Contacted Agents",
      icon: IoCallOutline,
      count: activityCounts.contacted,
      href: "/user/contacted-agents", // Assuming a route will be created for this
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        My Activities
      </h3>

      {loading ? (
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <ul className="space-y-3">
          {activityData.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className="
                    flex items-center justify-between
                    px-3 py-2 rounded-lg
                    cursor-pointer
                    hover:bg-white hover:shadow-sm
                    transition
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* ICON */}
                    <span className="text-blue-600 text-lg">
                      <Icon />
                    </span>

                    {/* TEXT */}
                    <span className="text-sm font-medium text-gray-700">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Activity;
