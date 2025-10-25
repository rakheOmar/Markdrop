import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_58vh_28vh_7vh] grid-cols-[15%_70%_15%]">
      <Navbar />

      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center p-8">
        <div className="max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">About This Project</h1>
            <p className="text-xl text-[#6b7280] dark:text-[#9ca3af]">
              A modern markdown editor built for simplicity and elegance
            </p>
          </div>

          <div className="space-y-6 text-left">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">What We Do</h2>
              <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
                We provide an intuitive platform for creating beautiful markdown files.
                Whether you're writing documentation, blog posts, or technical guides,
                our editor makes the process seamless and enjoyable.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Why Markdown?</h2>
              <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
                Markdown is the universal language of the web. It's simple, portable,
                and works everywhere—from GitHub to your favorite note-taking app.
                We believe great content deserves great tools.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
                To make markdown editing accessible to everyone. No complicated interfaces,
                no steep learning curves—just write naturally and let us handle the rest.
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />

      <Footer />
    </div>
  );
}
