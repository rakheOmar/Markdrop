import ContributeSection from "@/components/blocks/Home/ContributeSection";
import HeroSection from "@/components/blocks/Home/HeroSection";
import HomeFeatures from "@/components/blocks/Home/HomeFeatures";
import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_58vh_90vh_30vh_7vh] grid-cols-[15%_70%_15%]">
      <Navbar />
      <HeroSection />
      <HomeFeatures />
      <ContributeSection />
      <Footer />
    </div>
  );
}
