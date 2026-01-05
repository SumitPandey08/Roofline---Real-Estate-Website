"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaEdit,
  FaHome,
  FaEye,
  FaCommentDots,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCopy,
  FaChevronRight,
  FaSearch
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";

const UserProfile: React.FC = () => {
  const { user, loading, error } = useUser();
  const router = useRouter();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) return <ProfileSkeleton />;
  
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 text-2xl">
          <FaExclamationCircle />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Something went wrong</h3>
        <p className="text-gray-500 mt-2 mb-6">{error}</p>
        <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition font-medium"
        >
            Reload Page
        </button>
      </div>
    );
  }

  if (!user) return <div className="p-10 text-center">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <nav className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors w-fit cursor-pointer" onClick={() => router.back()}>
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </nav>

        {/* --- Main Profile Header --- */}
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
          
          {/* UPDATED HEADER COLOR: Premium Dark Slate/Gray */}
          <div className="h-44 bg-gradient-to-r from-gray-800 via-slate-800 to-gray-900 relative">
             {/* Abstract lines pattern for texture (optional, subtle) */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          
          <div className="px-6 pb-8 md:px-10">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 gap-6">
              
              {/* Avatar & Name */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                {/* Avatar container with better contrast */}
                <div className="w-32 h-32 rounded-full border-[6px] border-white bg-white flex items-center justify-center text-gray-400 text-4xl shadow-lg overflow-hidden relative z-10">
                  {/* Assuming user.avatar exists, else fallback icon */}
                  {user.avatar ? (
                     <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                     <FaUser />
                  )}
                </div>
                
                <div className="mb-2 space-y-1">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.username || "User"}
                  </h1>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-gray-400" /> 
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-gray-400" /> 
                      Indore, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => router.push("/user/profile/edit")}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 border border-transparent text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-md active:scale-95 mb-2"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- Left Column: Account Details --- */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-bold text-gray-800">Account Information</h2>
                    </div>
                    
                    <div className="p-5 space-y-6">
                        {/* Email */}
                        <div className="group relative">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex justify-between">
                                Email Address
                                {user.isEmailVerified ? (
                                    <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Verified</span>
                                ) : (
                                    <button className="text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 cursor-pointer">
                                        <FaExclamationCircle/> Verify Now
                                    </button>
                                )}
                            </label>
                            <div className="mt-1 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-transparent group-hover:border-gray-200 transition-colors">
                                <span className="text-gray-800 font-medium truncate pr-2">{user.email}</span>
                                <button 
                                    onClick={() => handleCopy(user.email || '', 'email')}
                                    className="text-gray-400 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                                    title="Copy Email"
                                >
                                    {copiedField === 'email' ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                                </button>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group relative">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex justify-between">
                                Phone Number
                                {user.isPhoneVerified ? (
                                    <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Verified</span>
                                ) : (
                                    <button className="text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 cursor-pointer">
                                        <FaExclamationCircle/> Verify Now
                                    </button>
                                )}
                            </label>
                            <div className="mt-1 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-transparent group-hover:border-gray-200 transition-colors">
                                <span className="text-gray-800 font-medium">{user.phoneNo}</span>
                                <button 
                                    onClick={() => handleCopy(user.phoneNo, 'phone')}
                                    className="text-gray-400 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                                    title="Copy Phone"
                                >
                                    {copiedField === 'phone' ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Right Column: Dashboard Actions --- */}
            <div className="lg:col-span-2 space-y-6">
                
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-xl font-bold text-gray-800">My Activity</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Saved - Blue */}
                    <ActionCard 
                        icon={<FaHome />} 
                        label="Saved Properties" 
                        value={user.savedProperties.length} 
                        color="text-blue-600" 
                        bg="bg-blue-50"
                        link="/user/save-property" 
                        emptyAction="Start Searching"
                    />
                    
                    {/* Contacted - Violet */}
                    <ActionCard 
                        icon={<FaCommentDots />} 
                        label="Contacted" 
                        value={user.contactedProperties.length} 
                        color="text-violet-600" 
                        bg="bg-violet-50"
                        link="/user/contacts"
                        emptyAction="Browse Listings"
                    />
                    
                    {/* Seen - Amber */}
                    <ActionCard 
                        icon={<FaEye />} 
                        label="Recently Viewed" 
                        value={user.seenProperties.length} 
                        color="text-amber-600" 
                        bg="bg-amber-50"
                        link="/user/history"
                    />
                    
                    {/* Reviews - Teal */}
                    <ActionCard 
                        icon={<FaEdit />} 
                        label="My Reviews" 
                        value={user.myReviews.length} 
                        color="text-teal-600" 
                        bg="bg-teal-50"
                        link="/user/reviews"
                        emptyAction="Write a Review"
                    />
                </div>

                {/* Friendly Engagement Banner */}
                {user.savedProperties.length === 0 && (
                     <div className="bg-gray-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-gray-200">
                        <div>
                            <h4 className="font-bold text-lg">Looking for your dream home?</h4>
                            <p className="text-gray-400 text-sm">You haven't saved any properties yet. Start exploring now!</p>
                        </div>
                        <button 
                            onClick={() => router.push('/buy')}
                            className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition active:scale-95 whitespace-nowrap"
                        >
                            Browse Properties
                        </button>
                     </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Component: Interactive Action Card ---
const ActionCard = ({ icon, label, value, color, bg, link, emptyAction }: any) => {
  const router = useRouter();
  const isEmpty = value === 0;

  return (
    <div 
        onClick={() => router.push(isEmpty && emptyAction ? '/properties' : link)}
        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-gray-50 group-hover:text-gray-600 transition-colors`}>
            <FaChevronRight size={14} />
        </div>
      </div>
      
      <div className="relative z-10">
        {isEmpty && emptyAction ? (
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                <div className="flex items-center gap-1 text-gray-800 font-semibold text-sm">
                    <FaSearch size={12} className="text-gray-400" /> {emptyAction}
                </div>
            </div>
        ) : (
            <div>
                 <span className="text-2xl font-bold text-gray-800 block mb-0.5">{value}</span>
                 <p className="text-sm font-medium text-gray-500">{label}</p>
            </div>
        )}
      </div>
    </div>
  );
};

// --- Skeleton Loader ---
const ProfileSkeleton = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
            
            <div className="bg-white rounded-3xl h-56 animate-pulse relative border border-gray-100 overflow-hidden">
                <div className="h-44 bg-gray-200 w-full"></div>
                <div className="absolute bottom-6 left-8 flex items-end gap-6">
                    <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white"></div>
                    <div className="space-y-3 mb-2">
                        <div className="h-8 w-48 bg-gray-200 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="h-64 bg-white rounded-2xl animate-pulse border border-gray-100"></div>
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default UserProfile;