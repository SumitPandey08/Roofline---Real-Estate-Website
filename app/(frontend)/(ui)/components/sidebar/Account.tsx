"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link'

const AccountStatus: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      {isLogin ? (
        /* ================= LOGGED IN ================= */
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
            <Image
              src="/profile-placeholder.png"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              Username
            </p>
            <p className="text-xs text-gray-500">
              user@email.com
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={() => setIsLogin(false)}
            className="text-xs text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        /* ================= LOGGED OUT ================= */
        <div className="text-center space-y-4">
          {/* Icon */}
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
            👤
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Welcome!
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Login to manage your account
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Link
              href="/admin/auth/login"
              className="px-4 py-2 text-sm font-semibold rounded-lg
                         bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/admin/auth/phone-verify"
              className="px-4 py-2 text-sm font-semibold rounded-lg
                         border border-blue-600 text-blue-600
                         hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountStatus;
