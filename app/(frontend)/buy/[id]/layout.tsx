'use client';

import Footer from "../../(ui)/components/Footer";
import Navbar from '../../(ui)/components/Navbar';
import Articles from "../../(ui)/components/Articles";
import { UserProvider } from "../../context/UserContext";

export default function BuyDetailLayout({ children }) {
  return (
    <UserProvider>
    <div className="w-full">
      <Navbar child={true} />
      {children}
      <Articles/>
      <Footer />
    </div>
    </UserProvider>

  );
}
