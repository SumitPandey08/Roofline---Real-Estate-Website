"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // On successful login, redirect to profile
            router.push('/profile');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-8">
                <Image src="/logo.webp" alt="Housing.com" width={150} height={40} />
            </div>
            <h1 className="text-2xl font-bold text-center text-blue-800 mb-8">Login to your account</h1>
            <form onSubmit={onLogin} className="flex flex-col gap-6">
                <div>
                    <label htmlFor="login-email" className="block mb-1 text-sm font-medium text-blue-700">
                        Email
                    </label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 rounded-md border border-blue-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="login-password" className="block mb-1 text-sm font-medium text-blue-700">
                        Password
                    </label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full px-4 py-3 rounded-md border border-blue-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-900 transition shadow disabled:bg-blue-400"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <Link href="/signup" className="block text-center mt-6 text-blue-700 hover:underline text-sm">
                Don't have an account? Sign up
            </Link>
        </div>
    );
}

export default LoginPage;