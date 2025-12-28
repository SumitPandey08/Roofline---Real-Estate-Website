'use client';

import SideBar from '@/app/(frontend)/(ui)/components/admin/dashboard/SideBar'
import Topbar from '@/app/(frontend)/(ui)/components/admin/dashboard/Topbar'

export default function Dashboard({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Fixed Sidebar (Width is 20 / 5rem) */}
      <SideBar />

      {/* 2. Main Content Area */}
      <div className="flex-1 ml-20 flex flex-col">
        
        {/* Topbar stays at the top of the content area */}
        <Topbar />

        {/* The actual page content goes here */}
        <main className="p-6">
          {children}
        </main>
        
      </div>
    </div>
  );
}
