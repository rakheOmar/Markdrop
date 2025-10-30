import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

function Content() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-xs sm:text-sm md:text-base text-black dark:text-white whitespace-nowrap leading-[0.9]">
            Privacy <br /> Policy
          </span>
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d] overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Introduction</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              This Privacy Policy describes how MarkDrop ("we," "our," or "us") collects, uses, and
              protects your information when you use our markdown editor service. We are committed
              to protecting your privacy and ensuring transparency about our data practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Information We Collect
            </h2>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
                <li>Account information (email address, username)</li>
                <li>Content you create and store in our service</li>
                <li>Communications with our support team</li>
              </ul>

              <h3 className="text-lg font-medium text-black dark:text-white">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
                <li>Usage data and analytics</li>
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Provide and maintain our service</li>
              <li>Improve user experience and functionality</li>
              <li>Send important service notifications</li>
              <li>Provide customer support</li>
              <li>Analyze usage patterns and performance</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Data Storage and Security
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We implement industry-standard security measures to protect your data. Your content is
              encrypted in transit and at rest. We use secure cloud infrastructure and regularly
              update our security practices to protect against unauthorized access, alteration,
              disclosure, or destruction of your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Information Sharing
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may
              share information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With trusted service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Your Rights</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your content</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Cookies and Tracking
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We use cookies and similar technologies to enhance your experience, remember your
              preferences, and analyze usage patterns. You can control cookie settings through your
              browser preferences. Some features may not function properly if cookies are disabled.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Data Retention</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We retain your information for as long as necessary to provide our services and comply
              with legal obligations. When you delete your account, we will delete your personal
              data within 30 days, except where retention is required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Changes to This Policy
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the "Last
              updated" date. Your continued use of our service after changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Contact Us</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please
              contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[#cecece] dark:border-[#16181d]">
              <p className="text-[#6b7280] dark:text-[#9ca3af]">Email: rakheomar@outlook.com</p>
            </div>
          </section>
        </div>
      </div>

      <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8" />
    </>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_250vh_7vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
