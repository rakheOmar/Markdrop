import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

function Content() {
  return (
    <>
      <div className="relative overflow-hidden border-r border-[#cecece] dark:border-[#16181d]">
        <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] lg:flex items-center justify-center hidden">
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap leading-tight">
            about_us.md
          </span>
        </div>
      </div>

      <div className="overflow-y-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              About Markdrop
            </h1>
            <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop is a modern, intuitive markdown editor designed to make creating beautiful
              GitHub profile READMEs and markdown documents effortless. Built with simplicity and
              functionality in mind, we empower developers and creators to focus on their content,
              not the tools.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">Our Mission</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We believe that creating markdown content should be fast, visual, and enjoyable.
              Markdrop bridges the gap between raw markdown syntax and beautiful rendered output,
              giving you instant feedback as you build your documents. Whether you're crafting your
              GitHub profile, documenting a project, or writing technical content, Markdrop is here
              to streamline your workflow.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              What Makes Us Different
            </h2>
            <ul className="space-y-4 text-base text-[#6b7280] dark:text-[#9ca3af]">
              <li className="flex gap-3">
                <span className="text-black dark:text-white font-semibold shrink-0">
                  🎯 Block-Based Editing:
                </span>
                <span>
                  Drag and drop markdown blocks to build your document visually, making complex
                  layouts simple.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-black dark:text-white font-semibold shrink-0">
                  ⚡ Real-Time Preview:
                </span>
                <span>See your changes instantly with live preview rendering as you type.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black dark:text-white font-semibold shrink-0">
                  🎨 Template Library:
                </span>
                <span>
                  Jump-start your projects with professionally designed templates for profiles,
                  projects, and more.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-black dark:text-white font-semibold shrink-0">
                  🔒 Privacy First:
                </span>
                <span>
                  Your content is stored locally in your browser by default, giving you complete
                  control over your data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-black dark:text-white font-semibold shrink-0">
                  📤 Export Anywhere:
                </span>
                <span>
                  Export to markdown, HTML, or PDF with a single click, ready for GitHub or any
                  platform.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">Built for Creators</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop is built by developers, for developers. We understand the frustration of
              context-switching between writing markdown and previewing it. We've experienced the
              pain of building GitHub profile READMEs from scratch. That's why we created Markdrop –
              to solve these problems and make markdown creation a delightful experience.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Open Source & Community
            </h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop is proudly open source. We believe in transparency, collaboration, and giving
              back to the developer community. Contributions, feedback, and ideas are always
              welcome. Together, we're building the best markdown editor for modern creators.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">The Journey Ahead</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We're constantly evolving Markdrop with new features, templates, and improvements
              based on user feedback. Our roadmap includes collaborative editing, custom themes,
              AI-powered content suggestions, and much more. We're excited to have you join us on
              this journey.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">Get in Touch</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Have questions, suggestions, or just want to say hi? We'd love to hear from you!
            </p>
            <div className="space-y-3">
              <p className="text-base text-[#6b7280] dark:text-[#9ca3af]">
                <span className="text-black dark:text-white font-semibold">Email:</span>{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                  rakheOmar@outlook.com
                </code>
              </p>
              <p className="text-base text-[#6b7280] dark:text-[#9ca3af]">
                <span className="text-black dark:text-white font-semibold">GitHub:</span>{" "}
                <a
                  href="https://github.com/rakheOmar/Markdrop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  github.com/rakheOmar/Markdrop
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 md:px-8 border-l border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_93vh_5vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
