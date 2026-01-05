"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { IAdmin } from "@/app/(backend)/models/admin.model";
import { IProperty } from "@/app/(backend)/models/property.model";

interface IPopulatedProperty extends Omit<IProperty, 'agent'> {
  agent: IAdmin;
}


// React Icons Imports
import { 
  HiOutlineLocationMarker, 
  HiOutlineViewGrid, 
  HiOutlineCalendar,
  HiOutlineArrowSmRight
} from "react-icons/hi";
import { 
  MdOutlineBed, 
  MdOutlineBathtub, 
  MdOutlineSquareFoot, 
  MdEdit,
  MdOutlineVideocam
} from "react-icons/md";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<IPopulatedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({ savedBy: [], seenBy: [] });
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchPropertyAndUsers = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [propertyRes, usersRes] = await Promise.all([
          axios.get(`/api/property/${id}`),
          axios.get(`/api/property/${id}/users`)
        ]);
        
        const propData = propertyRes.data.data;
        setProperty(propData);
        setUsers(usersRes.data);


        if (propData.images?.length > 0) setMainImage(propData.images[0]);
        else setMainImage('https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=')
      } catch (_error) {
        toast.error("Failed to load details");
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyAndUsers();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center animate-pulse text-purple-600 font-medium">Loading Luxury Listing...</div>;
  if (!property) return <div className="flex h-screen items-center justify-center text-gray-500">Property not found</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <Toaster />
      
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{property.title}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <HiOutlineLocationMarker className="text-purple-500" /> {property.address.city}, {property.address.state}
            </p>
          </div>
          <Link href={`/admin/dashboard/${id}/edit`}>
            <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all shadow-sm">
              <MdEdit size={18} /> Edit Listing
            </button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Image Gallery */}
            <section>
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <Image src={mainImage} alt={property.title} fill className="object-cover" priority />
                <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur-md shadow-sm ${
                        property.status === 'available' ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'
                    }`}>
                        {property.status}
                    </span>
                </div>
              </div>
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {property.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(img)}
                    className={`relative min-w-[120px] h-20 rounded-2xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-purple-600 scale-95 shadow-inner' : 'border-transparent opacity-80'}`}
                  >
                    <Image src={img} alt="thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Description Card */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineViewGrid className="text-purple-600" /> Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {property.description}
              </p>
            </section>

            {/* Analytics/Interactions */}
            <div className="grid md:grid-cols-2 gap-6">
               <UserCard title="Property Saves" users={users.savedBy} variant="purple" />
               <UserCard title="Total Views" users={users.seenBy} variant="blue" />
            </div>
          </div>

          {/* Sticky Sidebar Info */}
          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl" />
                
                <p className="text-sm text-gray-400 font-medium mb-1">Listing Price</p>
                <h2 className="text-4xl font-black text-gray-900 mb-6">
                    {`₹${property.price.toLocaleString()}`}
                </h2>

                <div className="grid grid-cols-3 gap-2 border-y border-gray-50 py-6 mb-6">
                    <StatBox icon={<MdOutlineBed size={22}/>} value={property.bedrooms || 0} label="Beds" />
                    <StatBox icon={<MdOutlineBathtub size={22}/>} value={property.bathrooms || 0} label="Baths" />
                    <StatBox icon={<MdOutlineSquareFoot size={22}/>} value={property.area} label="Sqft" />
                </div>

                <div className="space-y-4 mb-8">
                    <DetailRow label="Type" value={property.propertyType} icon={<HiOutlineViewGrid />} />
                    <DetailRow label="Year Built" value={property.yearBuilt || "N/A"} icon={<HiOutlineCalendar />} />
                </div>

                {property.virtualTourUrl && (
                  <a href={property.virtualTourUrl} target="_blank" className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-lg shadow-purple-200">
                    <MdOutlineVideocam size={22} /> View Virtual Tour
                  </a>
                )}

                {property.agent && (
                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-4">
                        <div className="relative w-12 h-12">
                            <Image src={property.agent.profilePhoto || `https://i.pravatar.cc/150?u=${property.agent._id}`} alt="Agent" fill className="rounded-full object-cover border-2 border-white shadow-md" />
                        </div>
                        <div>
                            <p className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Listing Agent</p>
                            <p className="text-sm font-bold text-gray-800">{property.agent.name}</p>
                            <p className="text-xs text-gray-400">{property.agent.email}</p>
                            <p className="text-[10px] text-gray-400">ID: {property.agent._id.toString()}</p>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// Sub-components for cleaner structure
const StatBox = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
    <div className="text-center">
        <div className="flex justify-center text-purple-500 mb-1">{icon}</div>
        <p className="text-lg font-bold text-gray-800">{value}</p>
        <p className="text-[10px] text-gray-400 uppercase font-semibold">{label}</p>
    </div>
);

const DetailRow = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 flex items-center gap-2">{icon} {label}</span>
        <span className="font-bold text-gray-800">{value}</span>
    </div>
);

const UserCard = ({ title, users, variant }: { title: string, users: any[], variant: string }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800">{title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${variant === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                {users.length}
            </span>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
            {users.length > 0 ? users.map(user => (
                <div key={user._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <Image src={`https://i.pravatar.cc/150?u=${user._id}`} width={32} height={32} className="rounded-full" alt="user" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">{user.username}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    <HiOutlineArrowSmRight className="text-gray-300" />
                </div>
            )) : <p className="text-xs text-gray-400 py-4 italic text-center">No activity yet</p>}
        </div>
    </div>
);

export default PropertyDetailsPage;