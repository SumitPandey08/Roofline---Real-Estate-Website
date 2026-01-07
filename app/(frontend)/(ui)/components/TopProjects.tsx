"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineExclamationCircle } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";
import TopHightlight from "./TopHightlight";

const TopProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]); // Using any if IProject isn't exported exactly as needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/get-projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setProjects(data.data.slice(0, 4));
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Featured Projects
            </h2>
            <p className="mt-3 text-lg text-slate-500">
              Discover handpicked luxury properties and investment opportunities in prime locations.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-all"
          >
            Explore All Projects
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State: Skeleton Cards */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-200 rounded-2xl h-64 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center py-12 text-slate-400">
            <HiOutlineExclamationCircle size={48} className="mb-2" />
            <p>We couldn't load the projects. Please try again later.</p>
          </div>
        )}

        {/* Success State: Grid Layout */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl"
              >
                <TopHightlight data={{
                  name: project.name,
                  price: `₹${project.startingPrice.toLocaleString()}`,
                  type: project.projectStatus,
                  location: project.location,
                  image: project.images[0] || "/herobg.webp"
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopProjects;