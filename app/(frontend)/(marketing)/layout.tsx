import Hero from "../(ui)/components/Hero";
import Footer from "../(ui)/components/Footer";
import Navbar from "../(ui)/components/Navbar";

export default function MarketingLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}