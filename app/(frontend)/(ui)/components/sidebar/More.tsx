import {
  IoHomeOutline,
  IoSwapHorizontalOutline,
  IoStarOutline,
  IoSparklesOutline,
  IoNotificationsOffOutline,
  IoWarningOutline,
  IoHelpCircleOutline,
  IoChatboxOutline,
  IoDocumentTextOutline,
  IoCallOutline,
} from "react-icons/io5";
import { IconType } from "react-icons";
import React from "react";

interface MoreOption {
  id: string;
  title: string;
  icon: IconType;
  badge?: string;
  danger?: boolean;
}

interface HelpCenterOption {
  id: string;
  title: string;
  icon: IconType;
  description: string;
}

const moreOptions: MoreOption[] = [
  {
    id: "zero-brokerage",
    title: "Zero Brokerage Properties",
    icon: IoHomeOutline,
  },
  {
    id: "transactions",
    title: "My Transactions",
    icon: IoSwapHorizontalOutline,
  },
  {
    id: "reviews",
    title: "My Reviews",
    icon: IoStarOutline,
  },
  {
    id: "new",
    title: "New",
    icon: IoSparklesOutline,
    badge: "NEW",
  },
  {
    id: "unsubscribe-alerts",
    title: "Unsubscribe Alerts",
    icon: IoNotificationsOffOutline,
  },
  {
    id: "report-fraud",
    title: "Report a Fraud",
    icon: IoWarningOutline,
    danger: true,
  },
];

const helpCenterOptions: HelpCenterOption[] = [
  {
    id: "faq",
    title: "FAQ",
    icon: IoHelpCircleOutline,
    description: "Frequently asked questions",
  },
  {
    id: "contact-us",
    title: "Contact Us",
    icon: IoCallOutline,
    description: "Get in touch with support",
  },
  {
    id: "tutorials",
    title: "Tutorials",
    icon: IoDocumentTextOutline,
    description: "Learn how to use platform",
  },
  {
    id: "chat-support",
    title: "Chat Support",
    icon: IoChatboxOutline,
    description: "Live chat assistance",
  },
];

const More: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* MORE OPTIONS */}
      <div>
        <ul className="space-y-2">
          {moreOptions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  item.danger
                    ? "hover:bg-red-50 hover:shadow-md"
                    : "hover:bg-blue-50 hover:shadow-md"
                }`}
              >
                <Icon
                  className={`text-lg flex-shrink-0 ${
                    item.danger ? "text-red-500" : "text-blue-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    item.danger ? "text-red-700" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </span>
                {item.badge && (
                  <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </ul>
      </div>

      {/* HELP CENTER */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <IoHelpCircleOutline className="text-blue-600 text-lg" />
          Help Center
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {helpCenterOptions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-center"
              >
                <Icon className="text-2xl text-blue-600 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default More;
