import Navbar from "../(ui)/components/Navbar";
import Footer from "../(ui)/components/Footer";
import Hero from "../(ui)/components/Hero";
import Articles from "../(ui)/components/Articles";


export default function StandardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <Hero/>
      <main>{children}</main>
      <Articles />
      <Footer />
    </div>
  );
}