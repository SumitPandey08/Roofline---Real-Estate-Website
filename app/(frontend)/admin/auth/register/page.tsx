"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AgentRegistration = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        email: '',
        experience: 0,
        specialization: 'residential',
        password: '',
        bio: ''
    });

    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
            setError('');
        }
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            setError('Full name is required');
            return false;
        }
        if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
            setError('Valid email is required');
            return false;
        }
        if (form.experience < 0) {
            setError('Experience cannot be negative');
            return false;
        }
        if (!form.password || form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (!form.bio.trim()) {
            setError('Professional bio is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('experience', form.experience.toString());
            formData.append('specialization', form.specialization);
            formData.append('password', form.password);
            formData.append('bio', form.bio);
            if (profilePhoto) {
                formData.append('profilePhoto', profilePhoto);
            }

            const response = await fetch('/api/admin/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
                setLoading(false);
                return;
            }

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/admin/auth/login');
            }, 2000);
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
            console.error('Registration error:', err);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-100 p-6">
            
            {/* Wider Card for Form Content */}
            <div className="w-full max-w-2xl p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)]">
                
                {/* Header with Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="p-2 bg-purple-500 rounded-xl shadow-sm mb-3">
                        <Image src="/logo.webp" alt="logo" width={120} height={100} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Agent Profile</h1>
                    <p className="text-slate-500 text-sm">Complete your details to start listing properties</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-2xl mb-6">
                        {success}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <label className="w-24 h-24 rounded-full bg-purple-100 border-2 border-dashed border-purple-400 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                            <div className="text-center">
                                {profilePhoto ? (
                                    <span className="text-purple-600 text-xs font-medium text-center px-2">
                                        {profilePhoto.name.substring(0, 15)}...
                                    </span>
                                ) : (
                                    <span className="text-purple-600 text-xs font-medium group-hover:scale-110 transition-transform text-center px-2">Upload Photo</span>
                                )}
                            </div>
                        </label>
                        <p className="text-xs text-slate-500 mt-2">Optional</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name *</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address *</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john@agency.com"
                                className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Experience */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Years of Experience *</label>
                            <input
                                name="experience"
                                type="number"
                                min="0"
                                className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                                value={form.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>



                        {/* Specialization */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Specialization *</label>
                            <select
                                name="specialization"
                                className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                                value={form.specialization}
                                onChange={handleChange}
                                required
                            >
                                <option value="all">All</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                                <option value="industrial">Industrial</option>
                                <option value="land">Land</option>
                                <option value="rental">Rental</option>
                            </select>
                        </div>
                    </div>

                    {/* Bio/Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Professional Bio *</label>
                        <textarea
                            name="bio"
                            rows={3}
                            placeholder="Tell clients about your expertise..."
                            className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm resize-none"
                            value={form.bio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password (min 6 characters) *</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] mt-4"
                    >
                        {loading ? 'Creating Profile...' : 'Create Professional Profile'}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link href="/admin/auth/login" className="text-purple-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AgentRegistration;