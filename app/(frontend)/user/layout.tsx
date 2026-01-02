import Navbar from "../(ui)/components/Navbar";
import Footer from "../(ui)/components/Footer";
import { UserProvider } from "../context/UserContext";


export default function UserLayout({ children }: { children: React.ReactNode}) {
  return (
    <UserProvider>
      <div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </UserProvider>
  );
}
