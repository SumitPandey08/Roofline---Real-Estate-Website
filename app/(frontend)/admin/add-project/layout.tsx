'use client';

import SideBar from '@/app/(frontend)/(ui)/components/admin/dashboard/SideBar'
import Topbar from '@/app/(frontend)/(ui)/components/admin/dashboard/Topbar'
import { AdminProvider, useAdmin } from '@/app/(frontend)/context/AdminContext';

function AddPropertyLayoutContent({ children }: { children: React.ReactNode }) {
  const { adminData, loading } = useAdmin();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading skeleton
  }
  
  if (!adminData) {
    return null; // The AdminProvider will handle redirection
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Fixed Sidebar (Width is 20 / 5rem) */}
      <SideBar />

      {/* 2. Main Content Area */}
      <div className="flex-1 ml-20 flex flex-col">
        
        {/* Topbar stays at the top of the content area */}
        <Topbar adminData={adminData} />

        {/* The actual page content goes here */}
        <main className="p-6">
          {children}
        </main>
        
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AddPropertyLayoutContent>{children}</AddPropertyLayoutContent>
    </AdminProvider>
  );
}
