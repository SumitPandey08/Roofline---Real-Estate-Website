"use client";

import React from "react";
import Image from "next/image";
import {
  MdVerified,
  MdPerson,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { AgentDTO } from "@/app/(frontend)/types/property";

export default function AgentCard({ agent }: { agent: AgentDTO }) {
  if (!agent) {
    return (
      <div className="bg-white p-6 rounded-3xl border text-center text-gray-400">
        Agent information unavailable
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 space-y-6">
      
      {/* ===== HEADER (ADMIN PROFILE STYLE) ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          {/* TEXT INFO */}
          <div className="text-left">
            <div className="flex items-center gap-1">
              <p className="text-sm font-bold text-slate-700 leading-tight">
                {agent.name}
              </p>

              {(agent.membership === "pro" ||
                agent.membership === "advance") && (
                <MdVerified
                  className="text-blue-500"
                  size={16}
                  title="Verified Agent"
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <p className="text-xs text-slate-400 uppercase tracking-tighter">
                {agent.role || "Agent"}
              </p>

              {agent.membership === "pro" && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold leading-none ml-1">
                  PRO
                </span>
              )}
            </div>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div
          className={`relative w-12 h-12 rounded-full border-2 overflow-hidden transition-colors
            ${
              agent.membership === "pro"
                ? "border-amber-400 ring-2 ring-amber-100"
                : agent.membership === "advance"
                ? "border-blue-400"
                : "border-purple-100"
            }`}
        >
          {agent.profilePhoto ? (
            <Image
              src={agent.profilePhoto}
              alt={agent.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-purple-100 flex items-center justify-center">
              <MdPerson className="text-purple-400" size={22} />
            </div>
          )}
        </div>
      </div>

      {/* ===== DETAILS ===== */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <DetailItem label="Email" value={agent.email} />
        <DetailItem label="Phone" value={agent.phoneNo} />
        <DetailItem
          label="Experience"
          value={`${agent.experience ?? 0} Years`}
        />
        <DetailItem
          label="Sold"
          value={agent.propertySold ?? 0}
        />
      </div>

      {/* ===== CTA ===== */}
      <div className="flex gap-3 pt-2">
        <a
          href={`https://wa.me/${agent.phoneNo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition"
        >
          <FaWhatsapp size={18} />
          WhatsApp
        </a>

        <a
          href={`mailto:${agent.email}`}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-bold text-center transition"
        >
          Contact
        </a>
      </div>
    </div>
  );
}

/* ===== SMALL DETAIL ITEM ===== */
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-[10px] uppercase text-gray-400 font-bold">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800">
        {value || "N/A"}
      </p>
    </div>
  );
}
