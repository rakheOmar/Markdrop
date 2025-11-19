import { motion } from "motion/react";
import BlankSection from "@/components/blocks/Home/BlankSection";
import ContributeSection from "@/components/blocks/Home/ContributeSection";
import HeroSection from "@/components/blocks/Home/HeroSection";
import VideoSection from "@/components/blocks/Home/VideoSection";
import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";
import { pageTransition } from "@/lib/animations";

export default function Home() {
  return (
    <motion.div
      className="w-full h-screen grid grid-rows-[7vh_58vh_1.5vh_auto_1.5vh_30vh_5vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden"
      {...pageTransition}
    >
      <Navbar />
      <HeroSection />
      <BlankSection />
      <VideoSection />
      <BlankSection />
      <ContributeSection />
      <Footer />
    </motion.div>
  );
}
