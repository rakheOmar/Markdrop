import FeatureSection from "@/components/blocks/Home/FeatureSection";
import HeroSection from "@/components/blocks/Home/HeroSection";
import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_58vh_58vh_58vh_58vh_7vh] grid-cols-[15%_70%_15%]">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <FeatureSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
