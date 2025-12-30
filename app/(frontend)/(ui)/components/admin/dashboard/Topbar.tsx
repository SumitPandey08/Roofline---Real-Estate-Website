"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdSearch, MdNotificationsNone, MdOutlineChatBubbleOutline, MdKeyboardArrowDown, MdPerson, MdLogout, MdVerified, MdWorkspacePremium } from 'react-icons/md';

import { useAdmin } from '@/app/(frontend)/context/AdminContext';

const Topbar: React.FC = () => {
    const { adminData, loading } = useAdmin();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout');
            router.push('/admin/auth/login');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <div className="h-20 w-full bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
            
            {/* Search Bar */}
            <div className="flex items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl w-96 transition-all focus-within:border-purple-400 focus-within:bg-white focus-within:shadow-sm">
                <MdSearch className="text-slate-400" size={22} />
                <input 
                    type="text" 
                    placeholder="Search properties, users..." 
                    className="bg-transparent border-none outline-none ml-3 text-sm text-slate-600 w-full placeholder:text-slate-400"
                />
            </div>

            {/* Right Side: Actions & Profile */}
            <div className="flex items-center gap-6">
                
                {/* Actions */}
                <div className="flex items-center gap-3 border-r border-slate-100 pr-6">
                    <button className="relative p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">
                        <MdOutlineChatBubbleOutline size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-purple-600 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="relative p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">
                        <MdNotificationsNone size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                {/* User Profile */}
                <div className="relative">
                    <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {adminData ? (
                            <>
                                <div className="text-right hidden md:block">
                                    <div className="flex items-center justify-end gap-1">
                                        <p className="text-sm font-bold text-slate-700 leading-tight">{adminData.name}</p>
                                        {(adminData.membership === 'pro' || adminData.membership === 'advance') && (
                                            <MdVerified className="text-blue-500" size={16} title="Verified Agent" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-end gap-1">
                                        <p className="text-xs text-slate-400 uppercase tracking-tighter">{adminData.role || 'Admin'}</p>
                                        {adminData.membership === 'pro' && (
                                            <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold leading-none ml-1">
                                                PRO
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={`relative w-10 h-10 rounded-full border-2 overflow-hidden transition-colors ${adminData.membership === 'pro' ? 'border-amber-400 ring-2 ring-amber-100' : adminData.membership === 'advance' ? 'border-blue-400' : 'border-purple-100 group-hover:border-purple-400'}`}>
                                    {adminData.profilePhoto ? (
                                        <Image src={adminData.profilePhoto} alt="User Profile" fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                                            <MdPerson className="text-purple-400" size={24} />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Loading Skeleton
                            <>
                                <div className="text-right hidden md:block">
                                    <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-3 w-12 bg-slate-200 rounded animate-pulse"></div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
                            </>
                        )}
                        <MdKeyboardArrowDown className={`text-slate-400 group-hover:text-purple-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-600"
                            >
                                <MdLogout />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Topbar;