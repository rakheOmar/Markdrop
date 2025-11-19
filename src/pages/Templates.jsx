import { motion } from "motion/react";
import Navbar from "@/components/blocks/Navbar/Navbar";
import MainSection from "@/components/blocks/TemplatesPage/MainSection";
import Footer from "@/components/Footer";
import { pageTransition } from "@/lib/animations";

export default function Templates() {
  return (
    <motion.div
      className="w-full h-screen grid grid-rows-[7vh_88vh_5vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden"
      {...pageTransition}
    >
      <Navbar />
      <MainSection />
      <Footer />
    </motion.div>
  );
}
