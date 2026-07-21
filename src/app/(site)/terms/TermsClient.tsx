"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollTray from "@/components/ScrollTray";
import JsonLd from "@/components/JsonLd";
import { useTheme } from "@/components/ThemeProvider";
import { getBreadcrumbSchema } from "@/lib/schemas";

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "Terms of Service", url: "https://masofts.com/terms" },
]);

const proseClasses =
  "prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words " +
  "prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white " +
  "prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-p:font-medium " +
  "prose-strong:text-primary-600 dark:prose-strong:text-primary-400 prose-strong:font-black " +
  "prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-black prose-a:no-underline hover:prose-a:underline " +
  "prose-li:text-gray-600 dark:prose-li:text-neutral-400 prose-li:font-medium " +
  "prose-ul:list-disc prose-ol:list-decimal";

export default function TermsClient() {
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
            Terms of <span className="gradient-text">Service</span>
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
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and
              use of <a href="https://masofts.com">masofts.com</a> (the
              &quot;Site&quot;) and any software development, consulting, or
              related services offered by MA Softs (&quot;we&quot;, &quot;us&quot;,
              or &quot;our&quot;).
            </p>
            <p>
              By accessing the Site or engaging our services, you agree to these
              Terms. If you do not agree, do not use the Site or our services.
            </p>

            <h2>2. Services</h2>
            <p>
              MA Softs provides custom software development, web applications,
              ERP systems, SaaS MVP development, and related consulting. Specific
              deliverables, timelines, and fees for client projects are defined
              in a separate proposal, statement of work, or written agreement
              between you and MA Softs.
            </p>
            <p>
              Information on the Site is for general informational purposes and
              does not constitute a binding offer unless confirmed in writing.
            </p>

            <h2>3. Use of the Site</h2>
            <p>You agree to use the Site only for lawful purposes. You must not:</p>
            <ul>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Interfere with or disrupt the Site or its infrastructure</li>
              <li>
                Scrape, harvest, or systematically collect content without our
                written permission
              </li>
              <li>
                Use the Site to transmit malware, spam, or harmful content
              </li>
              <li>Misrepresent your identity or affiliation when contacting us</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on the Site — including text, graphics, logos, code
              samples, and design — is owned by MA Softs or its licensors and is
              protected by applicable intellectual property laws. You may not
              copy, modify, distribute, or create derivative works from Site
              content without our prior written consent.
            </p>
            <p>
              For client projects, ownership of custom deliverables is governed
              by the applicable project agreement. Unless otherwise agreed,
              MA Softs retains rights to reusable tools, frameworks, libraries,
              and know-how developed or used during a project.
            </p>

            <h2>5. Project Engagements</h2>
            <p>When you engage MA Softs for a project:</p>
            <ul>
              <li>
                Scope, milestones, payment terms, and acceptance criteria will be
                set out in writing before work begins.
              </li>
              <li>
                You are responsible for providing timely feedback, access, and
                materials needed for us to perform the work.
              </li>
              <li>
                Changes to scope may affect timeline and fees and require written
                approval.
              </li>
              <li>
                Invoices are due as specified in the project agreement. Late
                payment may result in paused work or terminated services.
              </li>
            </ul>

            <h2>6. Warranties and Disclaimers</h2>
            <p>
              The Site and its content are provided &quot;as is&quot; and
              &quot;as available&quot; without warranties of any kind, express or
              implied, including merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>
            <p>
              We do not warrant that the Site will be uninterrupted, error-free,
              or free of viruses. Project warranties, if any, are limited to those
              expressly stated in the applicable project agreement.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, MA Softs and its owner
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits, data,
              or business opportunities arising from your use of the Site or our
              services.
            </p>
            <p>
              Our total liability for any claim related to the Site or a project
              shall not exceed the fees paid by you to MA Softs for the specific
              services giving rise to the claim in the twelve (12) months
              preceding the claim.
            </p>

            <h2>8. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any non-public business,
              technical, or personal information shared in connection with a
              project, except where disclosure is required by law or already
              public through no fault of the receiving party.
            </p>

            <h2>9. Third-Party Services</h2>
            <p>
              Our work may integrate with third-party platforms, APIs, or
              hosting providers. We are not responsible for the availability,
              pricing, or policies of those third parties. Your use of them is
              subject to their own terms.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may suspend or terminate access to the Site at any time for
              violation of these Terms. Client project agreements may be
              terminated according to the terms of that agreement. Provisions
              that by nature should survive (including intellectual property,
              limitation of liability, and confidentiality) will survive
              termination.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Pakistan, without regard to
              conflict-of-law principles. Any disputes arising from these Terms
              or our services shall be subject to the exclusive jurisdiction of
              the courts in Multan, Punjab, Pakistan, unless otherwise agreed in
              a project contract.
            </p>

            <h2>12. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The &quot;Last
              updated&quot; date at the top of this page will reflect changes.
              Continued use of the Site after updates constitutes acceptance of
              the revised Terms. Material changes to active project agreements
              require mutual written consent.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              Questions about these Terms of Service can be sent to:
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
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
