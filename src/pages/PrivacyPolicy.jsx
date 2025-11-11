import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

function Content() {
  return (
    <>
      <div className="relative overflow-hidden border-r border-[#cecece] dark:border-[#16181d]">
        <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap leading-tight">
            privacy_policy.md
          </span>
        </div>
      </div>

      <div className="overflow-y-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Introduction</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop is a free, client-side markdown editor that helps you create beautiful GitHub
              profile READMEs and markdown documents. We are committed to protecting your privacy.
              This policy explains how we handle your data.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Data Storage</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop stores your markdown documents and preferences locally in your browser using
              localStorage. Your content never leaves your device unless you explicitly choose to
              save it to your account or export it.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Documents are stored locally in your browser</li>
              <li>Account data (if you sign up) includes email and saved documents</li>
              <li>Theme preferences and editor settings are stored locally</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">What We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-base text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Email address (if you create an account)</li>
              <li>Markdown documents you choose to save to your account</li>
              <li>Basic usage analytics to improve the editor</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Security</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We implement standard security measures to protect your data. Your account data (if
              you create one) is encrypted and stored securely. Since most data is stored locally in
              your browser, you have full control over it.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Third-Party Services</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop may use third-party services for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Authentication (if you create an account)</li>
              <li>Analytics to understand how users interact with the editor</li>
              <li>Hosting and infrastructure</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-base text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Access and export your saved documents at any time</li>
              <li>Delete your account and all associated data</li>
              <li>Clear local storage at any time through your browser</li>
              <li>Use Markdrop without creating an account</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Cookies</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We use minimal cookies to remember your preferences (like theme settings) and maintain
              your session if you're logged in. You can disable cookies through your browser
              settings, but some features may not work properly.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Updates to This Policy
            </h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We may update this Privacy Policy occasionally. Any changes will be posted on this
              page. Continued use of Markdrop after changes means you accept the updated policy.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Contact Us</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please
              contact us at:
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                rakheOmar@outlook.com
              </code>
            </p>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 md:px-8 border-l border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_93vh_5vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
