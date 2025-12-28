'use client';

import Footer from "../../(ui)/components/Footer";
import Navbar from '../../(ui)/components/Navbar';
import Articles from "../../(ui)/components/Articles";

export default function BuyDetailLayout({ children }) {
  return (
    <div className="w-full">
      <Navbar child={true} />
      {children}
      <Articles/>
      <Footer />
    </div>
  );
}
