import React from "react";
import BenefitCard from "@/app/(frontend)/(ui)/components/BeneifitCard";
import Card from "@/app/(frontend)/(ui)/components/highdemand/Card";
import { IProperty } from "@/app/(backend)/models/property.model";
import { headers } from "next/headers";

interface Benefit {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface HandpickCollection {
  id: string;
  image: string;
}

async function fetchFeaturedProperties(baseUrl: string): Promise<IProperty[]> {
  const res = await fetch(`${baseUrl}/api/property/get-featured-property`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch featured properties');
  }
  const result = await res.json();
  return result.data;
}

async function fetchProperties(baseUrl: string): Promise<IProperty[]> {
  const res = await fetch(`${baseUrl}/api/property/get-all-property?propertyType=pg`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  const result = await res.json();
  return result.data.filter((property: IProperty) => property.propertyType === 'pg');
}

const PG: React.FC = async () => {


  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const properties = await fetchProperties(baseUrl);
  const featuredProperties = await fetchFeaturedProperties(baseUrl);

  const pgFeaturedProperties = featuredProperties.filter(p => p.propertyType === 'pg');

  const benefitsOfPg: Benefit[] = [
    {
      id: "stress-free-search",
      title: "Stress free search",
      description: "Real property photos and transparent pricing",
      image:
        "https://c.housingcdn.com/demand/s/client/common/assets/stressFreeSearch.803f8c7e.png",
    },
    {
      id: "find-your-match",
      title: "Find your Match",
      description:
        "Lots of options to choose from (private, twin & multi-sharing)",
      image:
        "https://c.housingcdn.com/demand/s/client/common/assets/findYourMatch.8b4c0fa5.png",
    },
    {
      id: "bon-appetite",
      title: "Bon appetite",
      description: "Info on meal type and offerings to know what’s cooking",
      image:
        "https://c.housingcdn.com/demand/s/client/common/assets/bonAppetite.c1028fc9.png",
    },
    {
      id: "your-life-your-rules",
      title: "Your Life, Your Rules",
      description: "Advance info on house rules to live like you do",
      image:
        "https://c.housingcdn.com/demand/s/client/common/assets/yourLife.d015d745.png",
    },
    {
      id: "featured-agents",
      title: "Featured Agents",
      description: "Pro and Advance members are featured on our platform, increasing their visibility.",
      image:
        "https://c.housingcdn.com/demand/s/client/common/assets/stressFreeSearch.803f8c7e.png",
    },
  ];

  const handpickCollections: HandpickCollection[] = [
    {
      id: "For Guys",
      image: "https://c.housingcdn.com/s/assets/boys.3f91606a.jpg",
    },
    {
      id: "For Girls",
      image: "https://c.housingcdn.com/s/assets/girls.3c3d64c0.jpg",
    },
    {
      id: "For Food",
      image: "https://c.housingcdn.com/s/assets/food.781fbd56.jpg",
    },
    {
      id: "Private Room",
      image: "https://c.housingcdn.com/s/assets/private.202ecdb3.jpg",
    },
  ];

  return (
    <div>
      {/* ================= HOME AT FIRST SIGHT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="
            relative rounded-xl overflow-hidden
            min-h-[320px] md:min-h-[360px]
            flex items-center
          "
          style={{
            backgroundImage:
              "url(https://c.housingcdn.com/demand/s/client/common/assets/homeAtSight.f25d6e4c.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "contain",
            backgroundColor: "#fff7e6",
          }}
        >
          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full md:w-1/2 p-6 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Home at First Sight
            </h2>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✔</span>
                <span>
                  <strong>Verified & onboarded</strong> by our experts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✔</span>
                <span>
                  Every property detail available with just{" "}
                  <strong>a click</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✔</span>
                <span>
                  <strong>Genuine & vast</strong> user base you can trust
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {pgFeaturedProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Featured PGs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Top picks for you
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pgFeaturedProperties.map((property) => (
              <Card key={property._id.toString()} data={property} />
            ))}
          </div>
        </section>
      )}

      {properties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            All PGs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Find your next home
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property._id.toString()} data={property} />
            ))}
          </div>
        </section>
      )}

      {/* ================= HANDPICKED COLLECTIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Handpicked Collections
        </h3>

        <div
          className="
            flex gap-6
            overflow-x-auto
            pb-3
            scrollbar-hide
            justify-start md:justify-between
          "
        >
          {handpickCollections.map((item) => (
            <div
              key={item.id}
              className="
                relative min-w-[220px] h-[260px]
                rounded-xl overflow-hidden
                flex items-end justify-center
                shadow
                transition-all duration-300 ease-in-out
                cursor-pointer
                hover:shadow-xl
                group
              "
            >
              {/* BACKGROUND IMAGE */}
              <div
                className="
                  absolute inset-0
                  bg-center bg-cover
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-105
                "
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* BOTTOM TEXT */}
              <div
                className="
                  relative z-10 w-full
                  bg-black/50
                  text-white text-center
                  py-3 text-sm font-semibold
                  tracking-wide
                "
              >
                {item.id}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* PROPERTIES */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                30k+
              </h3>
              <p className="mt-2 text-white text-base font-medium">
                Properties
              </p>
            </div>

            {/* CITIES */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                40+
              </h3>
              <p className="mt-2 text-white text-base font-medium">Cities</p>
            </div>

            {/* USERS */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                3.5 Lakh+
              </h3>
              <p className="mt-2 text-white text-base font-medium">
                Monthly Users
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Benefits of Our PG
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to find a comfortable, reliable and
              stress-free place to live
            </p>
          </div>

          {/* Cards */}
          <div
            className="
        flex gap-6
        overflow-x-auto
        pb-4
        scrollbar-hide
        sm:grid sm:grid-cols-2 lg:grid-cols-4
      "
          >
            {benefitsOfPg.map((benefit) => (
              <div key={benefit.id} className="min-w-[260px] sm:min-w-0">
                <BenefitCard data={benefit} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PG;
