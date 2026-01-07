"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  MdHome, 
  MdBusiness,    // Used for Properties
  MdApartment,   // Now used for Projects
  MdPeople, 
  MdAttachMoney, 
  MdBarChart, 
  MdSettings, 
  MdInfo, 
  MdAccountCircle, 
  MdLogout
} from 'react-icons/md';
import React from 'react';

interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const SideBar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout');
            router.push('/admin/auth/login');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    const navItems: NavItem[] = [
        { name: 'Home', link: '/admin/dashboard/', icon: <MdHome size={24} /> },
        { name: 'Properties', link: '/admin/dashboard/properties', icon: <MdBusiness size={24} /> },
        { name: 'Projects', link: '/admin/dashboard/projects', icon: <MdApartment size={24} /> },
        { name: 'Users', link: '/admin/dashboard/users', icon: <MdPeople size={24} /> },
        { name: 'Revenue', link: '/admin/dashboard/revenue', icon: <MdAttachMoney size={24} /> },
        { name: 'Statistics', link: '/admin/dashboard/statistics', icon: <MdBarChart size={24} /> },
        { name: 'Settings', link: '/admin/dashboard/settings', icon: <MdSettings size={24} /> },
    ];

    const info: NavItem[] = [
        { name: 'Info', link: '/admin/dashboard/info', icon: <MdInfo size={24} /> },
        { name: 'Profile', link: '/admin/dashboard/profile', icon: <MdAccountCircle size={24} /> },
    ];

    // Style helper for the "Icon Container"
    const getLinkStyle = (link: string) => {
        // Improved logic: ensures "Home" is only active on exact match, 
        // while others stay active for sub-routes (e.g., /properties/add)
        const isActive = link === '/admin/dashboard/' 
            ? pathname === link 
            : pathname.startsWith(link);
        
        return `group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
            isActive 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                : 'text-gray-400 hover:bg-purple-50 hover:text-purple-600'
        }`;
    };

    return (
        <aside className="h-screen w-20 flex flex-col items-center py-6 bg-white border-r border-gray-100 fixed left-0 top-0 z-50">
            
            {/* Logo Section */}
            <div className="mb-10">
                <Image 
                    src="/logo2.webp"
                    alt="Logo"
                    width={45}
                    height={45}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Top Navigation Items */}
            <nav className="flex flex-col gap-4 flex-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.link} className={getLinkStyle(item.link)}>
                        {item.icon}
                        {/* Tooltip */}
                        <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-gray-900 text-white text-[10px] font-bold px-2 py-1.5 rounded uppercase tracking-wider z-50 pointer-events-none shadow-xl">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Info & Logout Section */}
            <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-gray-100 w-full items-center">
                {info.map((item) => (
                    <Link 
                        key={item.name} 
                        href={item.link} 
                        className={getLinkStyle(item.link)}
                    >
                        {item.icon}
                        <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-gray-900 text-white text-[10px] font-bold px-2 py-1.5 rounded uppercase tracking-wider z-50 pointer-events-none shadow-xl">
                            {item.name}
                        </span>
                    </Link>
                ))}
                <button 
                    onClick={handleLogout}
                    className='group relative flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300'
                >
                    <MdLogout size={24} />
                    <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-gray-900 text-white text-[10px] font-bold px-2 py-1.5 rounded uppercase tracking-wider z-50 pointer-events-none shadow-xl">
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default SideBar;