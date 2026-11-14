/**
 * Per-route SEO metadata for Global Marketing Group.
 * Titles follow SEO/GEO best practice: primary keyword first, brand last,
 * ≤ 60 characters where possible. Descriptions ≤ 160 characters, keyword
 * integrated naturally. Used by Layout to set document.title + meta description.
 */
export type SeoMeta = {
  title: string;
  description: string;
};

const SEO: Record<string, SeoMeta> = {
  "/": {
    title:
      "AI-Enhanced Executive Assistants & CRM Automation | Global Marketing Group",
    description:
      "Delegate smarter with AI-driven executive assistants, CRM automation, sales funnels, and lead follow-up. Global Marketing Group helps you capture, nurture, and convert more leads.",
  },
  "/sales-growth-system": {
    title:
      "Sales Growth System: CRM & Sales Automation | Global Marketing Group",
    description:
      "A complete sales and follow-up system to capture, organize, nurture, and convert more leads with CRM automation, pipelines, and appointment setting.",
  },
  "/virtual-assistant-services": {
    title:
      "Virtual Assistant Services (Philippines-Based) | Global Marketing Group",
    description:
      "Skilled Philippines-based Virtual Assistants matched to your business needs. Delegate admin, marketing, and sales-support tasks and reclaim your time.",
  },
  "/services": {
    title:
      "Marketing Services: Funnels, CRM & Automation | Global Marketing Group",
    description:
      "Sales funnel creation, CRM setup, marketing automation, and full-service digital strategy to elevate your marketing and grow your business.",
  },
  "/crm-automation": {
    title: "CRM & Automation Platform | Global Marketing Group",
    description:
      "Connect contacts, conversations, appointments, and your sales pipeline in one organized CRM with automation built around how your business works.",
  },
  "/ai-automation": {
    title:
      "AI Automation: Chatbots, Lead Scoring & Content | Global Marketing Group",
    description:
      "Put AI to work with conversational chatbots, smart lead scoring, automated follow-up, and GPT-powered content — balanced with dependable human support.",
  },
  "/digital-solutions": {
    title:
      "Digital Solutions: Websites, Funnels & Landing Pages | Global Marketing Group",
    description:
      "Conversion-focused websites, landing pages, and funnels connected to a clear lead-capture and follow-up process that turns visitors into customers.",
  },
  "/appointment-setting": {
    title:
      "Appointment Setting & Scheduling Automation | Global Marketing Group",
    description:
      "Online scheduling, confirmations, reminders, and personal follow-up so your team can focus on the conversations that matter and reduce no-shows.",
  },
  "/lead-follow-up": {
    title: "Lead Follow-Up Automation & Reactivation | Global Marketing Group",
    description:
      "Consistent, multi-channel lead follow-up and reactivation sequences so no inquiry slips through the cracks and past leads come back to life.",
  },
  "/integrations": {
    title:
      "Integrations: Connect Your Tools in One Workflow | Global Marketing Group",
    description:
      "Connect lead sources, conversations, calendars, and payments with native integrations, an API, and real-time data sync inside one marketing platform.",
  },
  "/industries": {
    title: "Industries We Serve: Real Estate, Medical, Insurance & More | GMG",
    description:
      "Tailored CRM, automation, and Virtual Assistant support for accounting, real estate, medical, insurance, coaching, construction, wellness, and local services.",
  },
  "/how-it-works": {
    title:
      "How It Works: Book, Choose, Launch & Scale | Global Marketing Group",
    description:
      "A clear path from inquiry to opportunity: book a strategy call, choose your solution, launch your assistant or automation, and scale with ongoing support.",
  },
  "/pricing": {
    title: "Pricing: Launch, Growth & Scale Plans | Global Marketing Group",
    description:
      "Simple plans with real support. CRM automation plus offshore talent in three clear packages — Launch, Growth, and Scale — with no guesswork.",
  },
  "/contact": {
    title: "Contact Global Marketing Group | Book a Free Growth Audit",
    description:
      "Request a free growth audit or consultation. Tell us where your business needs support with leads, follow-up, and operations. We reply within one business day.",
  },
  "/about": {
    title: "About Global Marketing Group | Leadership & Marketing Innovation",
    description:
      "Global Marketing Group pairs executive-level support with AI to help businesses scale. Meet our leadership team and our client-first, excellence-driven culture.",
  },
  "/portfolio": {
    title:
      "Portfolio: Websites, Funnels & AI Chatbots | Global Marketing Group",
    description:
      "Real client work — websites, landing pages, sales funnels, AI chatbots, and lead generation across wellness, construction, health, and professional services.",
  },
  "/faq": {
    title: "FAQ: CRM, Virtual Assistants & Pricing | Global Marketing Group",
    description:
      "Answers about the Sales Growth System, Virtual Assistant pricing, automation, and how Global Marketing Group supports your business growth.",
  },
  "/careers": {
    title:
      "Careers at Global Marketing Group | Executive Assistant & Sales Roles",
    description:
      "Join Global Marketing Group. Apply for AI-enhanced Executive Assistant, Account Representative, and Referral Program roles with a tech-forward team.",
  },
  "/resources": {
    title: "Resources, Guides & Tools | Global Marketing Group",
    description:
      "Guides, calculators, and insights to help you delegate, automate follow-up, and prepare your CRM for growth with Global Marketing Group.",
  },
  "/resources/affiliate": {
    title:
      "Affiliate Program: Earn Up to 40% Commission | Global Marketing Group",
    description:
      "Unlock your earning potential with Global Marketing Group's affiliate program: 10% flat-rate sales commission, up to 40% subscription commission, five tiers.",
  },
  "/resources/media": {
    title: "Media Center | Global Marketing Group",
    description:
      "Explore the Global Marketing Group media center: connected toolkit showcases and client project media examples across industries.",
  },
  "/careers/account-rep": {
    title:
      "Account Representative Application | Global Marketing Group Careers",
    description:
      "Apply to become an Account Representative at Global Marketing Group. Help businesses automate growth with a proven, high-commission sales role.",
  },
  "/careers/executive-assistant": {
    title: "Executive Assistant Application | Global Marketing Group Careers",
    description:
      "Apply to become an AI-enhanced Executive Assistant at Global Marketing Group. Join an elite, tech-forward team supporting global clients.",
  },
  "/careers/referral": {
    title: "Referral Program: Refer a Business & Earn | Global Marketing Group",
    description:
      "Refer a business that needs to scale to Global Marketing Group and earn rewards for every successful connection. Submit a referral in minutes.",
  },
  "/missed-revenue-calculator": {
    title: "Missed Revenue Calculator | Global Marketing Group",
    description:
      "Estimate the monthly opportunity lost when inquiries go unanswered. Use your own assumptions and build a better follow-up process.",
  },
  "/privacy": {
    title: "Privacy Policy | Global Marketing Group",
    description:
      "How Global Marketing Group collects, uses, and protects your personal information when you use our services and website.",
  },
  "/terms": {
    title: "Terms of Service | Global Marketing Group",
    description:
      "The terms and conditions governing your use of Global Marketing Group's CRM, automation, and Virtual Assistant services.",
  },
  "/refund": {
    title: "Refund Policy | Global Marketing Group",
    description:
      "Global Marketing Group's refund and cancellation policy for CRM, automation, and Virtual Assistant service plans.",
  },
  "/thank-you": {
    title: "Thank You | Global Marketing Group",
    description:
      "Thanks for reaching out to Global Marketing Group. Our team will be in touch shortly to coordinate your next step.",
  },
};

const DEFAULT: SeoMeta = {
  title: "Global Marketing Group — Systems. People. Growth.",
  description:
    "Global Marketing Group connects CRM automation and Philippines-based Virtual Assistant support to help you capture, nurture, and convert more leads.",
};

export const getSeoMeta = (pathname: string): SeoMeta =>
  SEO[pathname] ?? DEFAULT;
