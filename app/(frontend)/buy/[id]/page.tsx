import { notFound } from "next/navigation";
import Detail from "@/app/(frontend)/(ui)/components/overview/Detail";
import ImagesSlideShow from "@/app/(frontend)/(ui)/components/overview/ImagesSlideShow";
import { HiOutlineMapPin, HiOutlineCurrencyRupee, HiOutlineCalendarDays } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { IProperty } from "@/app/(backend)/models/property.model";

async function fetchProperty(id: string): Promise<IProperty | null> {
  const res = await fetch(`http://localhost:3000/api/property/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch property data');
  }
  const result = await res.json();
  return result.data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; 
  const property = await fetchProperty(id);

  if (!property) {
    notFound();
  }

  const benefits = [
    {
      title: "Prime Location",
      description: "Strategically located in the heart of the city with easy access to amenities"
    },
    {
      title: "Modern Design",
      description: "Contemporary architecture with premium finishes and smart home features"
    },
    {
      title: "Investment Ready",
      description: "High appreciation potential with excellent rental yield opportunities"
    }
  ];

  return ( 
    <div className="bg-slate-50/50 min-h-screen pb-24">
      
      {/* Basic Info Section with white bg */}
      <section className="w-full bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{property.title}</h1>
            <p className="text-slate-500 mt-1">{property.address.street}, {property.address.city}</p>
          
            <p className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()} {property.listingType === 'rent' && `/ ${property.pricePeriod}`}</p>
            <p className="text-sm text-slate-400">Starting Price</p>
          </div>
        </div>
      </section>


      {/* 2. CENTERED CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* Gallery Section */}
        <section className="space-y-6 text-center">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white">
            <ImagesSlideShow images={property.images} title={property.title} />
          </div>
          <p className="text-slate-400 text-sm font-medium italic">
            * Actual site photographs as of {new Date(property.createdAt).getFullYear()}
          </p>
        </section>

        {/* Quick Highlights Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CenteredStat 
            icon={<HiOutlineCurrencyRupee className="text-blue-600" />} 
            label="Investment" 
            value={`₹${property.price.toLocaleString()}`} 
          />
          <CenteredStat 
            icon={<HiOutlineMapPin className="text-rose-500" />} 
            label="Location" 
            value={property.address.city} 
          />
          <CenteredStat 
            icon={<HiOutlineCalendarDays className="text-amber-500" />} 
            label="Year Built" 
            value={property.yearBuilt} 
          />
          <CenteredStat 
            icon={<HiOutlineMapPin className="text-indigo-500" />} 
            label="Area" 
            value={`${property.area} ${property.areaUnit}`} 
          />
        </section>

        {/* Detailed Info Cards */}
        <div className="space-y-10">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <Detail property={property} />
          </div>



          {/* Benefits Section with Centered Heading */}
          <section className="text-center space-y-10">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Why Choose This Property?</h2>
              <p className="text-slate-500 max-w-lg mx-auto">Discover the unique advantages that make this project stand out in the current market.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl mb-6 flex items-center justify-center text-blue-600 font-bold text-xl">
                    0{index + 1}
                   </div>
                   <h4 className="font-bold text-slate-900 mb-3">{benefit.title}</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Final Centered CTA */}
        <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black">Interested in {property.title}?</h2>
              <p className="text-slate-400 max-w-md mx-auto">Get detailed pricing brochures, floor plans, and site visit schedules delivered to your inbox.</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                 <button className="px-10 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all active:scale-95">
                    Download Brochure
                 </button>
                 <button className="px-10 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold hover:bg-white/20 transition-all">
                    Enquire Now
                 </button>
              </div>
           </div>
           {/* Decorative Background Element */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32"></div>
        </section>
      </main>

      {/* 3. FLOATING ACTION BAR (Bottom Sticky) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-xl">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-3 flex items-center justify-between ring-1 ring-black/5">
          <div className="hidden md:block pl-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing starts at</p>
            <p className="text-lg font-black text-slate-900">₹{property.price.toLocaleString()}</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <a href={`https://wa.me/${property.agent.phoneNo}`} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none bg-green-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition">
              <FaWhatsapp size={20} /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a href={`mailto:${property.agent.email}`} className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition">
              Contact Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper UI Component
function CenteredStat({ icon, label, value }: { icon: any, label: string, value: any }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 text-center space-y-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-center text-2xl">{icon}</div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-slate-900">{value || "N/A"}</p>
    </div>
  );
}