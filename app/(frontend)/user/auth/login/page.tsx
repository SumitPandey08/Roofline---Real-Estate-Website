"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
    const [formData, setFormData] = useState({
        identifier: '', // This will hold either email or phone
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiEndpoint = '/api/users/login'; // User login API

            const payload = {
                email: loginMethod === 'email' ? formData.identifier : undefined,
                phoneNo: loginMethod === 'phone' ? formData.identifier : undefined,
                password: formData.password,
            };

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            router.push('/profile'); // Redirect to user profile on success

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-100 p-4">
            
            {/* Glassmorphism Card */}
            <div className="w-full max-w-md p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)]">
                
                {/* Branding */}
                <div className="flex flex-col items-center mb-10">
                    <div className="p-3 bg-purple-500 rounded-2xl shadow-sm mb-4">
                        <Image src="/logo.webp" alt="logo" width={120} height={100} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight text-center">Welcome Back</h1>
                    <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in</p>
                </div>

                {/* Login Method Toggle */}
                <div className="flex p-1 bg-purple-100/50 rounded-2xl mb-8">
                    <button 
                        type="button" // Added type="button" to prevent form submission
                        onClick={() => setLoginMethod('email')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${loginMethod === 'email' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-purple-600'}`}
                    >
                        Email
                    </button>
                    <button 
                        type="button" // Added type="button" to prevent form submission
                        onClick={() => setLoginMethod('phone')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${loginMethod === 'phone' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-purple-600'}`}
                    >
                        Phone
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Identifier Input (Email or Phone) */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                        </label>
                        <div className="relative">
                            <input
                                type={loginMethod === 'email' ? 'email' : 'tel'}
                                placeholder={loginMethod === 'email' ? 'name@company.com' : '+1 (555) 000-0000'}
                                className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner"
                                value={formData.identifier}
                                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                                required
                            />
                            {/* Icon */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
                                {loginMethod === 'email' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <Link href="#" className="text-xs font-bold text-purple-600 hover:text-purple-800">Forgot?</Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

                    {/* Sign In Button */}
                    <button 
                        type="submit"
                        onClick={handleSubmit} 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] hover:shadow-xl mt-4 disabled:bg-purple-400"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm">
                        Don't have an account? 
                        <Link href="/user/auth/phone-verify" className="ml-1 text-purple-600 font-bold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
