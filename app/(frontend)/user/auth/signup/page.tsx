"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const SignUpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneNoFromQuery = searchParams.get('phoneNo');

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phoneNo: phoneNoFromQuery || ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (phoneNoFromQuery) {
            setUser(prevUser => ({ ...prevUser, phoneNo: phoneNoFromQuery }));
        } else {
            // If no phone number, redirect to phone verification first
            router.push('/user/auth/phone-verify');
        }
    }, [phoneNoFromQuery, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const validateForm = () => {
        if (!user.username.trim()) {
            setError('Username is required');
            return false;
        }
        if (!user.email.trim() || !/^\S+@\S+\.\S+$/.test(user.email)) {
            setError('Valid email is required');
            return false;
        }
        if (!user.password || user.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (!user.phoneNo) {
            setError('Phone number is missing. Please verify your phone first.');
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
            const response = await axios.post('/api/users/signup', user);

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/user/auth/login');
            }, 2000);

        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred during registration.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-100 p-6">
            
            <div className="w-full max-w-lg p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)]">
                
                <div className="flex flex-col items-center mb-10">
                    <div className="p-2 bg-purple-500 rounded-xl shadow-sm mb-3">
                        <Image src="/logo.webp" alt="logo" width={120} height={100} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create Your Account</h1>
                    <p className="text-slate-500 text-sm">Join our community to find your dream home.</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-2xl mb-6">
                        {success}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Username *</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="e.g., john_doe"
                                className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                                value={user.username}
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
                                placeholder="john.doe@example.com"
                                className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password (min 6 characters) *</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/80 border border-purple-100 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Phone Number (Read-only) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Verified Phone Number</label>
                        <input
                            name="phoneNo"
                            type="text"
                            className="bg-gray-200/50 border border-purple-100 rounded-2xl p-3 outline-none shadow-inner"
                            value={user.phoneNo}
                            readOnly
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] mt-4"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link href="/user/auth/login" className="text-purple-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;