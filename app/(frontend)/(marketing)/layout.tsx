import Hero from "../(ui)/components/Hero";
import Footer from "../(ui)/components/Footer";
import Navbar from "../(ui)/components/Navbar";
import { UserProvider } from "../../context/UserContext";

export default function MarketingLayout({ children }) {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </UserProvider>
    </div>
  );
}