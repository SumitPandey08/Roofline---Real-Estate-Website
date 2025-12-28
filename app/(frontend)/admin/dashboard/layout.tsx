'use client';

import React from 'react';
import SideBar from '@/app/(frontend)/(ui)/components/admin/dashboard/SideBar';
import Topbar from '@/app/(frontend)/(ui)/components/admin/dashboard/Topbar';
import { AdminProvider, useAdmin } from '@/app/(frontend)/context/AdminContext';

function InnerDashboardLayout({ children }) {
    const { adminData, loading } = useAdmin();

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading skeleton
    }
    
    if (!adminData) {
        return null; // The AdminProvider will handle redirection
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <SideBar />
            <div className="flex-1 ml-20 flex flex-col">
                <Topbar adminData={adminData} />
                <main className="p-6">
                    {/* Pass adminData to children */}
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { adminData, loading });
                        }
                        return child;
                    })}
                </main>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children }) {
    return (
        <AdminProvider>
            <InnerDashboardLayout>{children}</InnerDashboardLayout>
        </AdminProvider>
    );
}
