"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/app/(backend)/models/project.model";
import { HiOutlineMapPin } from "react-icons/hi2";

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <Link href={`/projects/${project._id}`}>
        <div className="relative h-48">
          <Image
            src={project.images[0] || "/herobg.webp"}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 truncate">
            {project.name}
          </h3>
          <p className="text-slate-500 flex items-center gap-1 mt-1">
            <HiOutlineMapPin />
            {project.location}
          </p>
          <div className="mt-4">
            <p className="text-lg font-bold text-blue-600">
              ₹{project.startingPrice.toLocaleString()} - ₹{project.endingPrice.toLocaleString()}
            </p>
          </div>
           <div className="mt-2">
            <span
                className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}
            >
                <span
                    aria-hidden
                    className={`absolute inset-0 ${
                        project.projectStatus === "completed"
                            ? "bg-green-200"
                            : project.projectStatus === "ongoing"
                            ? "bg-yellow-200"
                            : "bg-red-200"
                    } opacity-50 rounded-full`}
                ></span>
                <span className="relative">{project.projectStatus}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
