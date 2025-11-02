import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
// COMPONENTS
import { PWAStatus, SWStatus } from "@/components/PWAStatus";
import Builder from "@/pages/Builder";
import ContactPage from "@/pages/ContactUs";
// PAGES
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import SignUp from "@/pages/SignUp";
import Templates from "@/pages/Templates";
import TermsOfServices from "@/pages/TermsOfServices";
import UserProfile from "@/pages/UserProfile";
import About from "@/pages/AboutPage";

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
          {/* UNPROTECTED */}
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/builder/:id" element={<Builder />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-services" element={<TermsOfServices />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* PROTECTED */}
          <Route path="/user-profile" element={<UserProfile />} />
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
