import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
// COMPONENTS
import Navbar from "@/components/blocks/Navbar/Navbar";
import ChatBotButton from "@/components/ChatBotButton";
import Footer from "@/components/Footer";
import AboutPage from "@/pages/AboutPage";
import Builder from "@/pages/Builder";
import ContactPage from "@/pages/ContactUs";
// PAGES
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import UserProfile from "@/pages/UserProfile";

const hiddenLayoutRoutes = ["/login", "/signup", "/builder", "/"];
const definedRoutes = ["/", "/about", "/contact", "/builder", "/login", "/signup", "/user-profile"];
const noPaddingRoutes = ["/"];

const _Layout = ({ children }) => {
  const location = useLocation();
  const isDefinedRoute = definedRoutes.some((route) =>
    route.includes(":")
      ? location.pathname.startsWith(route.split(":")[0])
      : location.pathname === route
  );
  const hideLayout = hiddenLayoutRoutes.includes(location.pathname) || !isDefinedRoute;
  const shouldAddPadding = !hideLayout && !noPaddingRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className={`flex-1 ${shouldAddPadding ? "pt-24" : ""}`}>{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <ChatBotButton />}
      <Toaster position="bottom-right" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        // UNPROTECTED
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="*" element={<NotFoundPage />} />
        // AUTH
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        // PROTECTED
        <Route path="/user-profile/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
