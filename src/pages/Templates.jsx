import Navbar from "@/components/blocks/Navbar/Navbar";
import MainSection from "@/components/blocks/TemplatesPage/MainSection";
import Footer from "@/components/Footer";

export default function Templates() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_86vh_7vh] grid-cols-[15%_70%_15%]">
      <Navbar />
      <MainSection />
      <Footer />
    </div>
  );
}
