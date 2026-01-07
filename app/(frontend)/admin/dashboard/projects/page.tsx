"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiPlus, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiLoaderAlt } from 'react-icons/bi';
import ActiveProjectCard from '@/app/(frontend)/(ui)/components/admin/dashboard/ActiveProjectCard';
import { ProjectCardData } from '@/app/(frontend)/(ui)/components/admin/dashboard/ActiveProjectCard';
import { useAdmin } from '@/app/(frontend)/context/AdminContext';

const AdminProjectsPage: React.FC = () => {
  const { adminData, loading: adminLoading } = useAdmin();
  const [allProjects, setAllProjects] = useState<ProjectCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminProjects = async () => {
      if (!adminData?._id) return;
      try {
        setLoading(true);
        const response = await fetch(`/api/project/get-admin-projects?id=${adminData._id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch projects');
        
        const projects = data.data || [];
        setAllProjects(projects);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminProjects();
  }, [adminData]);

  if (loading || adminLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <BiLoaderAlt className="animate-spin text-4xl text-blue-600" />
        <p className="text-gray-500 font-medium animate-pulse">Loading projects...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Projects</h1>
          <p className="text-slate-500">Overview of your projects.</p>
        </div>
        
        <Link 
          href="/admin/add-project" 
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95"
        >
          <HiPlus className="text-xl" />
          Add Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard 
          icon={<HiOutlineOfficeBuilding className="text-blue-600" />} 
          label="Total Projects" 
          value={allProjects.length} 
          bgColor="bg-blue-50"
        />
      </div>

      {/* Content Area */}
      {allProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 text-center">
          <HiOutlineOfficeBuilding className="text-6xl text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No projects found</h3>
          <p className="text-slate-500 mb-6">Start by adding your first project.</p>
          <Link href="/admin/add-project" className="text-blue-600 font-bold hover:underline">
            + Add New Project
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {allProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <ActiveProjectCard 
                data={project} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable Stat Card Component for cleaner code
const StatCard = ({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: number, bgColor: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
    <div className={`p-4 ${bgColor} rounded-xl text-2xl`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default AdminProjectsPage;