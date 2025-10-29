import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
// COMPONENTS
import { PWAStatus, SWStatus } from "@/components/PWAStatus";
import AboutPage from "@/pages/AboutPage";
import Builder from "@/pages/Builder";
import ContactPage from "@/pages/ContactUs";
import Tutorial from "@/pages/Tutorial";
// PAGES
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import UserProfile from "@/pages/UserProfile";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <Toaster position="bottom-right" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          // UNPROTECTED
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="*" element={<NotFoundPage />} />
          // AUTH
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          // PROTECTED
          <Route path="/user-profile/:id" element={<UserProfile />} />
        </Routes>
        <PWAStatus />
        <SWStatus />
        <SpeedInsights />
        <Analytics />
      </Layout>
    </Router>
  );
}

export default App;
