"use client";
import React from 'react';
import Image from 'next/image';
import { MdVerified, MdWorkspacePremium, MdPhone, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

interface AgentCardProps {
  agent: any;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  if (!agent || typeof agent === 'string') return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all h-fit sticky top-24">
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
                <div className={`relative w-16 h-16 rounded-full border-2 overflow-hidden shrink-0 ${agent.membership === 'pro' ? 'border-amber-400 ring-2 ring-amber-100' : agent.membership === 'advance' ? 'border-blue-400' : 'border-slate-100'}`}>
                    {agent.profilePhoto ? (
                        <Image src={agent.profilePhoto} alt={agent.name} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl font-bold">
                            {agent.name?.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{agent.name}</h3>
                        {(agent.membership === 'pro' || agent.membership === 'advance') && (
                            <MdVerified className="text-blue-500 shrink-0" size={18} title="Verified Agent" />
                        )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Listing Agent</p>
                        {agent.membership === 'pro' && (
                            <span className="flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold leading-none">
                                PRO <MdWorkspacePremium size={12} />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
        <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                <MdEmail className="text-slate-400 shrink-0" size={20} />
                <span className="text-sm font-medium truncate">{agent.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                <MdPhone className="text-slate-400 shrink-0" size={20} />
                <span className="text-sm font-medium">{agent.phoneNo}</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
             <a href={`https://wa.me/${agent.phoneNo}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-50 text-green-600 py-3 rounded-xl font-bold text-sm hover:bg-green-100 transition-colors">
                <FaWhatsapp size={18} /> WhatsApp
             </a>
             <a href={`tel:${agent.phoneNo}`} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                <MdPhone size={18} /> Call Now
             </a>
        </div>
    </div>
  );
};

export default AgentCard;