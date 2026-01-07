import Image from "next/image";
import Navbar from '../(ui)/components/Navbar';
import Hero from '../(ui)/components/Hero';
import ResearchInsight from '../(ui)/components/Research&Insight';
import TopProjects from '../(ui)/components/TopProjects';
import Seller from '../(ui)/components/Seller';
import Footer from "../(ui)/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TopProjects />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Top Housing Experts
        </h2>
        <Seller />
      </div>
      <ResearchInsight />
      <Footer />
    </main>
  );
}