"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineUserCircle, HiOutlineLogin, HiOutlineLogout, HiOutlineHome, HiOutlineCog, HiOutlineUser } from 'react-icons/hi';
import axios from 'axios';

interface User {
    username: string;
    email: string;
    image: string | null;
    role: 'user';
}

interface Admin {
    name: string;
    email: string;
    image: string | null;
    role: 'admin' | 'superadmin' | 'moderator';
}

const useAuth = () => {
    const [user, setUser] = useState<User | Admin | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/users/me');
                setUser(data.data);
                setIsLoggedIn(true);
            } catch (error) {
                // If user fetch fails, try fetching admin
                try {
                    const { data } = await axios.get('/api/admin/me');
                    setUser(data.data);
                    setIsLoggedIn(true);
                } catch (adminError) {
                    // If both fail, user is not logged in
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            if (user?.role === 'user') {
                await axios.get('/api/users/logout');
            } else {
                await axios.get('/api/admin/logout');
            }
            setUser(null);
            setIsLoggedIn(false);
            window.location.href = '/'; // Force a reload to clear all state
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return { isLoggedIn, user, loading, logout };
};


const AccountStatus: React.FC = () => {
    const { isLoggedIn, user, loading, logout } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-100 shadow-md animate-pulse">
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 rounded-full bg-gray-200 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    const profileLink = user?.role === 'user' ? '/profile' : '/admin/dashboard';
    const displayName = user ? ('username' in user ? user.username : user.name) : '';
    const image = user?.image? user.image : 'https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-100 shadow-md">
            {isLoggedIn && user ? (
                /* ================= LOGGED IN UI ================= */
                <div className="flex flex-col items-center text-center">
                    <Link href={profileLink}>
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-purple-200 flex items-center justify-center mb-3 border-2 border-purple-400 cursor-pointer">
                            <Image
                                src={image} // Replace with user.avatar when available
                                alt="User Avatar"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>

                    <Link href={profileLink}>
                        <p className="text-lg font-bold text-gray-900 cursor-pointer hover:underline">{displayName}</p>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4 capitalize">({user.role})</p>

                    <div className="w-full space-y-2">
                        <Link
                            href={profileLink}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold rounded-lg
                                       bg-purple-600 text-white hover:bg-purple-700 transition shadow-lg shadow-purple-200"
                        >
                            {user.role === 'user' ? <HiOutlineHome className="text-lg" /> : <HiOutlineCog className="text-lg" />}
                            {user.role === 'user' ? 'View Profile' : 'Dashboard'}
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold rounded-lg
                                       border border-red-400 text-red-600 hover:bg-red-50 transition"
                        >
                            <HiOutlineLogout className="text-lg" /> Logout
                        </button>
                    </div>
                </div>
            ) : (
                /* ================= LOGGED OUT UI ================= */
                <div className="flex flex-col items-center text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-4xl mb-3">
                        <HiOutlineLogin />
                    </div>

                    <div>
                        <p className="text-lg font-bold text-gray-900">
                            Welcome!
                        </p>
                        <p className="text-sm text-gray-600 mt-1 mb-4">
                            Select your login type to continue.
                        </p>
                    </div>

                    <div className="w-full space-y-2">
                        <Link
                            href="/user/auth/login"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold rounded-lg
                                       bg-purple-600 text-white hover:bg-purple-700 transition shadow-lg shadow-purple-200"
                        >
                            <HiOutlineUser className="text-lg" /> User Login
                        </Link>
                        <Link
                            href="/admin/auth/login"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold rounded-lg
                                       bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                        >
                            <HiOutlineCog className="text-lg" /> Admin Login
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                            New here?{' '}
                            <Link href="/select-yourself" className="text-purple-600 hover:underline font-semibold">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountStatus;
