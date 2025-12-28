import React from 'react';

interface Insight {
    title: string;
    sentence: string;
    image: string;
}

const ResearchInsight: React.FC = () => {

    const element: Insight[] = [
        {
            title: "Price Trends",
            sentence:"Find property rates & price trends of top locations",
            image:'https://c.housingcdn.com/demand/s/client/common/assets/priceTrends.fbcaa632.svg'
        },
         {
            title: "City Insight",
            sentence:"Get to know about top cities before you invest",
            image:'https://c.housingcdn.com/demand/s/client/common/assets/cityInsights.8dc96b0f.svg'
        },
         {
            title: "House Research",
            sentence:"Find reports on Indian residential market",
            image:'https://c.housingcdn.com/demand/s/client/common/assets/housingResearch.1dec14a7.svg'
        }
    ]
  return (
    // 1. Added container padding and a light background for visual separation
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        
        {/* Title and Subtitle */}
        <div className="text-center mb-10">
            {/* 2. Enhanced Typography */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Research and Insights
            </h1>
            <p className="mt-2 text-xl text-gray-600">
                Explore useful real estate insights
            </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {element.map((item, index) => (
                <div 
                    key={index} 
                    className="
                        bg-white rounded-xl p-6 flex flex-col items-start
                        shadow-lg border border-gray-100
                        transition-all duration-300 ease-in-out 
                        hover:shadow-2xl hover:scale-[1.02] hover:border-blue-500
                        cursor-pointer
                    "
                >
                    {/* Image/Icon */}
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-12 h-12 mb-4" 
                    />
                    
                    {/* Card Title */}
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {item.title} 
                    </h2>
                    
                    {/* Card Description */}
                    <p className="text-gray-600 text-base">
                        {item.sentence}
                    </p>
                    
                    {/* Subtle Call to Action link (optional but good for UX) */}
                     <a href="#" className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center">
                        Explore Now
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            ))}
        </div>
    </section>
  )
}

export default ResearchInsight;