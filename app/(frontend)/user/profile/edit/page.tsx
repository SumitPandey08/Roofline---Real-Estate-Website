"use client";

import React, { useState, useEffect } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCamera, 
  FaSave, 
  FaArrowLeft, 
  FaSpinner, 
  FaLock,
  FaCheckCircle
} from "react-icons/fa";
import { useUser } from "@/app/(frontend)/context/UserContext";
import { useRouter } from "next/navigation";

const EditProfile: React.FC = () => {
  const { user, loading, error, updateUser } = useUser(); // Assuming updateUser exists in context
  const router = useRouter();

  // Local state for form fields
  const [formData, setFormData] = useState({
    username: "",
    phoneNo: "",
    email: ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phoneNo: user.phoneNo || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      // Simulate API call or use context function
      // await updateUser(formData); 
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay for UX
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Optional: Redirect back after success
      setTimeout(() => router.back(), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <EditSkeleton />;
  if (!user) return <div className="p-10 text-center">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* --- Header Navigation --- */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            <FaArrowLeft className="mr-2" /> Cancel & Go Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">Edit Profile</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- Avatar Section --- */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
             
             <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-gray-50 flex items-center justify-center text-gray-300 text-5xl overflow-hidden shadow-inner">
                  <FaUser />
                  {/* <img src={user.avatar} className="w-full h-full object-cover" /> */}
                </div>
                
                {/* Overlay for "Change Photo" */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <FaCamera className="text-white text-2xl" />
                </div>
                
                <button type="button" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg border-2 border-white hover:bg-indigo-700 transition transform hover:scale-105">
                  <FaCamera size={14} />
                </button>
             </div>
             <p className="mt-4 text-sm text-gray-500">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
             <p className="text-xs text-gray-400">Max size of 3.1 MB</p>
          </div>

          {/* --- Form Fields --- */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 md:p-8 space-y-6">
                
                {/* Feedback Message */}
                {message && (
                  <div className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.type === 'success' ? <FaCheckCircle /> : <FaArrowLeft className="rotate-180" />}
                    {message.text}
                  </div>
                )}

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 ml-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all outline-none"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Phone (Often read-only or requires OTP) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1 flex justify-between">
                      Phone Number
                      {user.isPhoneVerified && <span className="text-xs text-gray-400 font-normal flex items-center gap-1"><FaLock size={10}/> Verified (Locked)</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaPhone />
                      </div>
                      <input
                        type="text"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        disabled={user.isPhoneVerified} // Disable if verified
                        className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none transition-all ${
                          user.isPhoneVerified 
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                          : "bg-gray-50 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                        }`}
                      />
                    </div>
                    {user.isPhoneVerified && <p className="text-[10px] text-gray-400 ml-1">Contact support to change verified number</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1 flex justify-between">
                      Email Address
                      {user.isEmailVerified && <span className="text-xs text-gray-400 font-normal flex items-center gap-1"><FaLock size={10}/> Verified (Locked)</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={user.isEmailVerified}
                        className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none transition-all ${
                          user.isEmailVerified 
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                          : "bg-gray-50 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>

             </div>
             
             {/* Footer Actions */}
             <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col-reverse md:flex-row items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => router.back()}
                  className="w-full md:w-auto px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all shadow-lg shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
             </div>

          </div>
        </form>
      </div>
    </div>
  );
};

// --- Skeleton for Edit Page ---
const EditSkeleton = () => (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans flex justify-center">
        <div className="w-full max-w-3xl space-y-6">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="bg-white h-48 rounded-2xl animate-pulse"></div>
            <div className="bg-white h-96 rounded-2xl animate-pulse"></div>
        </div>
    </div>
);

export default EditProfile;