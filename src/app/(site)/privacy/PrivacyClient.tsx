"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollTray from "@/components/ScrollTray";
import JsonLd from "@/components/JsonLd";
import { useTheme } from "@/components/ThemeProvider";
import { getBreadcrumbSchema } from "@/lib/schemas";

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "Privacy Policy", url: "https://masofts.com/privacy" },
]);

const proseClasses =
  "prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words " +
  "prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white " +
  "prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-p:font-medium " +
  "prose-strong:text-primary-600 dark:prose-strong:text-primary-400 prose-strong:font-black " +
  "prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-black prose-a:no-underline hover:prose-a:underline " +
  "prose-li:text-gray-600 dark:prose-li:text-neutral-400 prose-li:font-medium " +
  "prose-ul:list-disc prose-ol:list-decimal";

export default function PrivacyClient() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumb} />

      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-20 lg:py-32">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Privacy <span className="gradient-text">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Last updated: July 21, 2026
          </motion.p>
        </div>
      </section>

      <section className={`section-padding ${isDark ? "bg-dark-950" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4 max-w-3xl">
          <div className={proseClasses}>
            <h2>1. Introduction</h2>
            <p>
              MA Softs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates{" "}
              <a href="https://masofts.com">masofts.com</a> (the &quot;Site&quot;).
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our Site or engage our
              software development services.
            </p>
            <p>
              By using the Site, you agree to the collection and use of
              information in accordance with this policy. If you do not agree,
              please do not use the Site.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Contact information</strong> — name, email address, phone
                number, and company name when you submit a contact form, audit
                request, or inquire about our services.
              </li>
              <li>
                <strong>Project details</strong> — information you voluntarily
                share about your business needs, technical requirements, or project
                goals.
              </li>
              <li>
                <strong>Usage data</strong> — IP address, browser type, device
                information, pages visited, and referring URLs collected
                automatically through cookies and similar technologies.
              </li>
              <li>
                <strong>Communication records</strong> — emails, messages, and
                notes related to inquiries or ongoing projects.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide consultations</li>
              <li>Deliver, manage, and improve our software development services</li>
              <li>Send project-related updates and administrative messages</li>
              <li>Analyze Site usage to improve content and user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>

            <h2>4. Cookies and Tracking</h2>
            <p>
              The Site may use cookies and similar technologies to remember
              preferences (such as theme settings), understand how visitors use
              the Site, and improve performance. You can control cookies through
              your browser settings. Disabling cookies may affect some Site
              features.
            </p>

            <h2>5. Sharing of Information</h2>
            <p>We may share your information only in these limited cases:</p>
            <ul>
              <li>
                <strong>Service providers</strong> — trusted vendors who help us
                operate the Site (e.g. hosting, email delivery), under
                confidentiality obligations.
              </li>
              <li>
                <strong>Legal requirements</strong> — when required by law,
                regulation, or valid legal process.
              </li>
              <li>
                <strong>Business transfers</strong> — in connection with a merger,
                acquisition, or sale of assets, with notice where required.
              </li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain personal information only as long as needed for the
              purposes described in this policy, to fulfill contracts, or to meet
              legal and accounting requirements. Contact and project records are
              typically kept for the duration of our business relationship and a
              reasonable period afterward.
            </p>

            <h2>7. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect
              your personal information against unauthorized access, alteration,
              disclosure, or destruction. No method of transmission over the
              internet is 100% secure; we cannot guarantee absolute security.
            </p>

            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access,
              correct, update, or request deletion of your personal information.
              To exercise these rights, contact us at{" "}
              <a href="mailto:info@masofts.com">info@masofts.com</a>. We will
              respond within a reasonable timeframe.
            </p>

            <h2>9. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those sites.
              We encourage you to review their privacy policies.
            </p>

            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 16. We do not
              knowingly collect personal information from children. If you believe
              we have collected such information, please contact us so we can
              delete it.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The
              &quot;Last updated&quot; date at the top of this page will reflect
              changes. Continued use of the Site after updates constitutes
              acceptance of the revised policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data
              practices, contact us:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@masofts.com">info@masofts.com</a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <Link href="/contact">masofts.com/contact</Link>
              </li>
              <li>
                <strong>Location:</strong> Multan, Punjab, Pakistan
              </li>
            </ul>
            <p>
              See also our{" "}
              <Link href="/terms">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
