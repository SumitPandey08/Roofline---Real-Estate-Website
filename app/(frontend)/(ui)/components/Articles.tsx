import Image from "next/image";
import React from "react";

interface Article {
  id: number;
  title: string;
  summary: string;
  image: string;
  link: string;
}

const Articles: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      title: "The Ultimate Guide to Buying Your First Home",
      summary:
        "Essential tips and strategies for first-time homebuyers to navigate the real estate market confidently.",
      image: "https://images.unsplash.com/photo-1560185008-a33f5c5f02d1",
      link: "/articles/ultimate-guide-first-home",
    },
    {
      id: 2,
      title: "Top 10 Neighborhoods to Invest in 2024",
      summary:
        "Explore the best neighborhoods for real estate investment based on growth and amenities.",
      image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      link: "/articles/top-neighborhoods-2024",
    },
    {
      id: 3,
      title: "Understanding Mortgage Rates",
      summary:
        "Learn how mortgage rates work, what affects them, and how they impact your home loan.",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
      link: "/articles/understanding-mortgage-rates",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Latest Articles</h2>
        <a
          href="/articles"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all →
        </a>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.link}
            className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]
                       bg-white rounded-xl overflow-hidden
                       border border-gray-200
                       hover:shadow-xl transition-all duration-300
                       group"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.summary}
              </p>

              <span className="inline-block mt-4 text-sm font-medium text-blue-600">
                Read article →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Articles;
