/** Shared FAQ copy + helpers for visible sections and JSON-LD */

export type FaqItem = { question: string; answer: string };

export function toFaqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const portfolioListingFaqs: FaqItem[] = [
  {
    question: "What types of projects appear in your portfolio?",
    answer:
      "I showcase custom web applications, dashboards, business software, and integrations—typically built with modern stacks such as Next.js, Node, and cloud services. Each entry highlights real outcomes and the problems I solved.",
  },
  {
    question: "Can I see more detail than the portfolio card?",
    answer:
      "Yes. Open any case study for a deeper overview, tech context, and links when a live demo or product is public. If something is under NDA, I share what I can without exposing sensitive details.",
  },
  {
    question: "Do you take on projects similar to these?",
    answer:
      "Absolutely. If your goals align with the kind of work shown here—performance, clean UX, and maintainable code—contact me with your requirements and I will propose a tailored approach.",
  },
];

export const portfolioDetailFaqs: FaqItem[] = [
  {
    question: "Is the live project link always available?",
    answer:
      "I include a link when the product is public and the client agrees. Some work is internal or protected; in those cases I focus on scope, stack, and results instead of a public URL.",
  },
  {
    question: "How do you describe technologies on case studies?",
    answer:
      "Tech stacks reflect what was used for the engagement. If your project needs a different stack, I will recommend tools based on your constraints, team, and long-term maintenance.",
  },
  {
    question: "How can we start a project like this?",
    answer:
      "Use the contact page to share goals, timeline, and budget range. I typically follow with a short discovery call, then a proposal with milestones and deliverables.",
  },
];

export const contactFaqs: FaqItem[] = [
  {
    question: "How quickly will you respond?",
    answer:
      "I aim to reply within one business day. For urgent inquiries, mention it in your message or reach out via the phone number on this page.",
  },
  {
    question: "What should I include in my first message?",
    answer:
      "A brief on your product or problem, desired timeline, any tech preferences, and whether you need discovery, a fixed scope, or ongoing work. Attachments or links help me understand faster.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I collaborate remotely across time zones with clear communication channels and regular demos so you stay aligned with progress.",
  },
];

export const aboutFaqs: FaqItem[] = [
  {
    question: "What does MA Softs specialize in?",
    answer:
      "Custom software and web products—especially when you need a senior-led build, clear architecture, and delivery you can evolve after launch.",
  },
  {
    question: "How do you work with clients day to day?",
    answer:
      "I use structured milestones, async updates, and scheduled reviews. You get transparency on scope, risks, and decisions without unnecessary meetings.",
  },
  {
    question: "Why emphasize long-term maintainability?",
    answer:
      "Software should not be a one-off handoff. I document, test where it matters, and choose patterns your team—or mine—can extend safely over time.",
  },
];

/** Mirrors the existing servicesFaqSchema for on-page display */
export const servicesHubFaqs: FaqItem[] = [
  {
    question: "What custom software development services does MA Softs offer?",
    answer:
      "MA Softs offers custom software development services including custom ERP development, custom website development services, custom software for manufacturing, and custom software for small business. Each system is built around your workflows — not an off-the-shelf package.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Project costs vary depending on complexity and requirements. I offer competitive pricing for high-quality, custom-built solutions. Contact me for a detailed quote based on your specific needs.",
  },
  {
    question: "Do you build ERP for the plastic industry?",
    answer:
      "Yes. ERP for the plastic industry is a core specialty — production tracking, feedstock inventory, waste margins, and supplier ledgers built for real factory floors.",
  },
  {
    question: "Do you provide support after the software is launched?",
    answer:
      "Yes, I provide comprehensive post-launch support and maintenance to ensure your software runs smoothly and stays up-to-date with the latest technologies.",
  },
  {
    question: "Can you integrate with existing business tools?",
    answer:
      "Absolutely. I have extensive experience integrating custom software with various third-party APIs, payment gateways, and existing legacy systems.",
  },
];
