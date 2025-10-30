import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

function Content() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-xs sm:text-sm md:text-base text-black dark:text-white whitespace-nowrap leading-[0.9]">
            Terms of <br /> Service
          </span>
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d] overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Introduction</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              These Terms of Service ("Terms") govern your use of MarkDrop ("we," "our," or "us"), a
              markdown editor service. By accessing or using our service, you agree to be bound by
              these Terms. If you do not agree to these Terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Acceptance of Terms
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              By creating an account or using MarkDrop, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and our Privacy Policy. These Terms
              apply to all users of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Description of Service
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              MarkDrop is a web-based markdown editor that allows users to create, edit, and manage
              markdown documents. Our service includes features such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Real-time markdown editing and preview</li>
              <li>Document storage and synchronization</li>
              <li>Export functionality</li>
              <li>Collaboration tools</li>
              <li>Theme customization</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              User Accounts and Registration
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
              <li>Use only one account per person</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Acceptable Use Policy
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              You agree not to use MarkDrop for any unlawful or prohibited activities, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Uploading malicious code or harmful content</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Harassing or threatening other users</li>
              <li>Distributing spam or unsolicited communications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Content Ownership and Rights
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              You retain ownership of all content you create using MarkDrop. By using our service,
              you grant us a limited license to store, process, and display your content solely for
              the purpose of providing our service. We do not claim ownership of your content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Service Availability
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We strive to maintain high service availability but cannot guarantee uninterrupted
              access. We may temporarily suspend service for maintenance, updates, or due to
              circumstances beyond our control. We are not liable for any downtime or service
              interruptions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Limitation of Liability
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              MarkDrop is provided "as is" without warranties of any kind. We are not liable for any
              indirect, incidental, special, or consequential damages arising from your use of our
              service. Our total liability shall not exceed the amount paid by you for our service
              in the past 12 months.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Termination</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              You may terminate your account at any time. We may suspend or terminate your account
              if you violate these Terms. Upon termination, your access to the service will cease,
              and we may delete your content after a reasonable notice period.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Changes to Terms</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes by
              posting the updated Terms on our website. Your continued use of the service after
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Contact Us</h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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

export default function TermsOfServices() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_245vh_7vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
