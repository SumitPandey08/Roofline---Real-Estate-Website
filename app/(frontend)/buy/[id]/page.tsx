import { notFound } from "next/navigation";
import Detail from "@/app/(frontend)/(ui)/components/overview/Detail";
import ImagesSlideShow from "@/app/(frontend)/(ui)/components/overview/ImagesSlideShow";
import AgentCard from "@/app/(frontend)/(ui)/components/overview/AgentCard";
import SavePropertyButton from "@/app/(frontend)/(ui)/components/overview/SavePropertyButton";

import {
  HiOutlineMapPin,
  HiOutlineCurrencyRupee,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

import { fetchPropertyById } from "@/app/(frontend)/lib/property";
import { PropertyDTO } from "@/app/(frontend)/types/property";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property: PropertyDTO | null = await fetchPropertyById(id);

  if (!property) notFound();

  const benefits = [
    {
      title: "Prime Location",
      description:
        "Strategically located with excellent connectivity and nearby amenities.",
    },
    {
      title: "Modern Design",
      description:
        "Premium architecture with smart layouts and elegant finishes.",
    },
    {
      title: "Investment Ready",
      description:
        "High appreciation potential and strong rental demand.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen pt-6 md:pt-10 pb-28">

      {/* HERO / HEADER */}
      <section className="relative bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              {property.title}
            </h1>
            <p className="text-slate-500 flex items-center gap-1">
              <HiOutlineMapPin />
              {property.address.street}, {property.address.city}
            </p>

            <div className="pt-4">
              <p className="text-3xl font-black text-blue-600">
                ₹{property.price.toLocaleString()}
                {property.listingType === "rent" &&
                  ` / ${property.pricePeriod}`}
              </p>
              <p className="text-xs text-slate-400 tracking-wide">
                Starting Price
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <SavePropertyButton propertyId={property._id} />
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-4 py-14 space-y-20">
        {/* GALLERY */}
        <section className="space-y-6 text-center">
          <div className="rounded-[2.8rem] overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white">
            <ImagesSlideShow
              images={property.images}
              title={property.title}
            />
          </div>
          <p className="text-xs text-slate-400 italic">
            Actual site images · {new Date(property.createdAt).getFullYear()}
          </p>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CenteredStat
            icon={<HiOutlineCurrencyRupee />}
            label="Price"
            value={`₹${property.price.toLocaleString()}`}
          />
          <CenteredStat
            icon={<HiOutlineMapPin />}
            label="City"
            value={property.address.city}
          />
          <CenteredStat
            icon={<HiOutlineCalendarDays />}
            label="Year Built"
            value={property.yearBuilt}
          />
          <CenteredStat
            icon={<HiOutlineMapPin />}
            label="Area"
            value={`${property.area} ${property.areaUnit}`}
          />
        </section>

        {/* DETAILS + AGENT */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-md border border-slate-100">
            <Detail property={property} />
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <AgentCard agent={property.agent} />
          </div>
        </section>

        {/* BENEFITS */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-extrabold text-slate-900">
              Why Choose This Property?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Key highlights that make this property a smart choice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center font-black mb-6">
                  0{i + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {b.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl px-4 py-3 flex gap-3">
          <a
            href={`https://wa.me/${property.agent.phoneNo}`}
            target="_blank"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
          <a
            href={`mailto:${property.agent.email}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-center font-bold transition"
          >
            Contact Agent
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */
function CenteredStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: any;
}) {
  return (
    <div className="bg-white/80 backdrop-blur p-6 rounded-3xl text-center border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className="text-2xl flex justify-center text-blue-600">
        {icon}
      </div>
      <p className="text-[11px] uppercase text-slate-400 font-bold mt-3 tracking-widest">
        {label}
      </p>
      <p className="mt-1 text-lg font-extrabold text-slate-900">
        {value ?? "N/A"}
      </p>
    </div>
  );
}
