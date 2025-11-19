import { motion } from "motion/react";
import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

function Content() {
  return (
    <>
      <div className="relative overflow-hidden border-r border-[#cecece] dark:border-[#16181d]">
        <motion.div
          className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden"
          {...fadeInUp}
        >
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap leading-tight">
            terms_of_service.md
          </span>
        </motion.div>
      </div>

      <motion.div
        className="overflow-y-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
        {...staggerContainer}
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Introduction</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              These Terms of Service govern your use of Markdrop, a free markdown editor for
              creating beautiful GitHub profile READMEs and markdown documents. By using Markdrop,
              you agree to these Terms.
            </p>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Using Markdrop</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop is a client-side markdown editor that stores your documents locally in your
              browser. You can use Markdrop without creating an account. If you choose to create an
              account, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Provide accurate information</li>
              <li>Keep your account credentials secure</li>
              <li>Be responsible for activities under your account</li>
            </ul>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Your Content</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              You own all content you create using Markdrop. We don't claim any ownership rights to
              your documents. When you save documents to your account, we store them only to provide
              the service to you.
            </p>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Acceptable Use</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Please use Markdrop responsibly. Don't use it to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-[#6b7280] dark:text-[#9ca3af] ml-4">
              <li>Violate any laws or regulations</li>
              <li>Harm others or distribute malicious content</li>
              <li>Attempt to breach our security</li>
              <li>Abuse or overload our services</li>
            </ul>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Service Availability</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We strive to keep Markdrop available and running smoothly, but we can't guarantee
              uninterrupted access. The service is provided "as is" without warranties. We may need
              to temporarily suspend service for maintenance or updates.
            </p>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Limitation of Liability
            </h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Markdrop is provided free of charge. We are not liable for any damages arising from
              your use of the service, including data loss. Always keep backups of important
              documents.
            </p>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Termination</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              You can stop using Markdrop and delete your account at any time. We may suspend or
              terminate accounts that violate these Terms.
            </p>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Changes to Terms</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              We may update these Terms occasionally. Continued use of Markdrop after changes means
              you accept the updated Terms.
            </p>
          </motion.section>

          <motion.section className="space-y-6" {...staggerItem}>
            <h2 className="text-3xl font-bold text-black dark:text-white">Contact Us</h2>
            <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                dev.markdrop@proton.me
              </code>
            </p>
          </motion.section>
        </div>
      </motion.div>

      <div className="flex items-center justify-center px-4 md:px-8 border-l border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}

export default function TermsOfServices() {
  return (
    <motion.div
      className="w-full h-screen grid grid-rows-[7vh_93vh_5vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />
      <Content />
      <Footer />
    </motion.div>
  );
}
