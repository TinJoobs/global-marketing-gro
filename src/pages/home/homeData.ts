import type { IconName } from "@/components/Icon";

export const problems: { icon: IconName; text: string }[] = [
  { icon: "phone", text: "Calls and messages are not answered quickly" },
  { icon: "clock", text: "Leads are not followed up consistently" },
  {
    icon: "database",
    text: "Customer information is scattered across different platforms",
  },
  { icon: "calendar", text: "Appointments are missed or forgotten" },
  {
    icon: "briefcase",
    text: "Business owners spend too much time on administrative work",
  },
  {
    icon: "refresh",
    text: "Past leads and customers are never contacted again",
  },
  {
    icon: "chart",
    text: "There is no clear sales pipeline or accountability system",
  },
];

export const features: {
  icon: IconName;
  title: string;
  body: string;
  tone: "" | "blue" | "purple";
}[] = [
  {
    icon: "capture",
    title: "Capture more opportunities",
    body: "Bring leads into one organized CRM through forms, landing pages, appointment calendars, phone calls, and other lead sources.",
    tone: "",
  },
  {
    icon: "message",
    title: "Follow up consistently",
    body: "Use automated email and text-message sequences to respond quickly and stay connected with potential customers.",
    tone: "blue",
  },
  {
    icon: "calendar",
    title: "Book more appointments",
    body: "Make it easier for prospects to schedule while using confirmations and reminders to reduce missed appointments.",
    tone: "purple",
  },
  {
    icon: "chart",
    title: "Organize your sales pipeline",
    body: "Know exactly where every lead stands, what action is needed next, and which opportunities require attention.",
    tone: "",
  },
  {
    icon: "users",
    title: "Support daily operations",
    body: "Delegate administrative, marketing, customer-service, and sales-support tasks to a trained Virtual Assistant.",
    tone: "blue",
  },
  {
    icon: "report",
    title: "Track performance",
    body: "Receive updates and reports that help you understand completed tasks, lead activity, appointments, and overall progress.",
    tone: "purple",
  },
];

export const process: {
  icon: IconName;
  num: string;
  title: string;
  body: string;
}[] = [
  {
    icon: "capture",
    num: "01",
    title: "Capture",
    body: "Bring leads from your website, forms, calls, social media, campaigns, and other sources into one centralized system.",
  },
  {
    icon: "message",
    num: "02",
    title: "Respond",
    body: "Send immediate acknowledgments and follow-up messages so potential customers are not left waiting.",
  },
  {
    icon: "heart",
    num: "03",
    title: "Nurture",
    body: "Stay connected through scheduled emails, text messages, calls, reminders, and personalized outreach.",
  },
  {
    icon: "calendar",
    num: "04",
    title: "Convert",
    body: "Move qualified prospects toward appointments, consultations, estimates, proposals, and purchasing decisions.",
  },
  {
    icon: "refresh",
    num: "05",
    title: "Retain and reactivate",
    body: "Continue communicating with existing customers while reconnecting with previous leads and inactive contacts.",
  },
];

export const connection: { icon: IconName; title: string; sub: string }[] = [
  {
    icon: "database",
    title: "Sales Growth System",
    sub: "CRM and sales automation",
  },
  {
    icon: "workflow",
    title: "Follow-up workflows",
    sub: "Lead and pipeline management",
  },
  {
    icon: "users",
    title: "Dedicated VA",
    sub: "Personal support and execution",
  },
  {
    icon: "clipboard",
    title: "Project coordination",
    sub: "Accountability and reporting",
  },
];

export const industries: { icon: IconName; label: string; href: string }[] = [
  { icon: "home", label: "Home services", href: "/industries" },
  { icon: "building", label: "Real estate", href: "/industries" },
  { icon: "shield", label: "Insurance", href: "/industries" },
  { icon: "users", label: "Coaches & consultants", href: "/industries" },
  { icon: "medical", label: "Medical & professional", href: "/industries" },
  { icon: "utensils", label: "Restaurants & hospitality", href: "/industries" },
  { icon: "heart", label: "Health & wellness", href: "/industries" },
  { icon: "hands", label: "Churches & nonprofits", href: "/industries" },
  { icon: "map", label: "Local service businesses", href: "/industries" },
  {
    icon: "briefcase",
    label: "Entrepreneurs & small business",
    href: "/industries",
  },
];

export const reasons: { title: string; body: string }[] = [
  {
    title: "Customized support",
    body: "We begin with a discovery conversation to understand your goals, challenges, workload, and current processes.",
  },
  {
    title: "The right Virtual Assistant match",
    body: "We profile your business needs and match you with a Virtual Assistant whose skills align with the work you need completed.",
  },
  {
    title: "Integrated CRM and automation",
    body: "We help organize your leads, conversations, appointments, and sales opportunities within one centralized system.",
  },
  {
    title: "Ongoing coordination",
    body: "Our team supports onboarding, communication, task coordination, client check-ins, and performance reporting.",
  },
  {
    title: "Flexible business support",
    body: "Begin with the services you need today and expand your support as your business grows.",
  },
];

export const trust: { icon: IconName; title: string; sub: string }[] = [
  {
    icon: "database",
    title: "One central CRM",
    sub: "Leads, conversations, and opportunities",
  },
  {
    icon: "workflow",
    title: "Consistent follow-up",
    sub: "A clear next step for your team",
  },
  {
    icon: "users",
    title: "Dedicated VA support",
    sub: "Matched to your business needs",
  },
  {
    icon: "clock",
    title: "Plans from $597/month",
    sub: "General Virtual Assistant support",
  },
];

export const floatCards: {
  icon: IconName;
  title: string;
  sub: string;
  pos: string;
  delay: string;
}[] = [
  {
    icon: "database",
    title: "One organized CRM",
    sub: "A clearer view of every lead",
    pos: "top-6 -left-6",
    delay: "0s",
  },
  {
    icon: "users",
    title: "Real human support",
    sub: "People who keep work moving",
    pos: "bottom-16 -right-6",
    delay: "1.2s",
  },
  {
    icon: "calendar",
    title: "Follow-up, connected",
    sub: "From first inquiry to next step",
    pos: "-bottom-5 left-10",
    delay: "0.6s",
  },
];

export const coreSolutions = [
  {
    tone: "blue" as const,
    num: "01",
    icon: "database" as IconName,
    title: "Sales Growth System™",
    body: "A complete sales and follow-up system designed to help you capture, organize, nurture, and convert more leads.",
    tags: ["CRM & automation", "Appointments", "Lead reactivation"],
    to: "/sales-growth-system",
    cta: "Discover the Sales Growth System",
  },
  {
    tone: "purple" as const,
    num: "02",
    icon: "headset" as IconName,
    title: "Virtual Assistant services",
    body: "Skilled Virtual Assistants who help manage the daily tasks that keep your business moving.",
    tags: ["Included in Growth", "Philippines-based", "Matched to your needs"],
    to: "/virtual-assistant-services",
    cta: "Find your Virtual Assistant",
  },
];

export const connectedServices = [
  {
    icon: "database" as IconName,
    title: "CRM & automation",
    body: "Connect your contacts, conversations, appointments, tasks, and sales pipeline in one organized system. Build follow-up around the way your business actually works.",
    to: "/crm-automation",
  },
  {
    icon: "monitor" as IconName,
    title: "Digital solutions",
    body: "Connect websites, landing pages, funnels, and approved marketing content to a clear lead-capture and follow-up process.",
    to: "/digital-solutions",
  },
  {
    icon: "calendar" as IconName,
    title: "Appointment setting",
    body: "Combine online scheduling, confirmations, reminders, and personal follow-up so your team can focus on the conversations that matter.",
    to: "/appointment-setting",
  },
];

export const faqs = [
  {
    q: "Is the Sales Growth System only a CRM?",
    a: "No. The CRM is the central platform, but the service also includes strategy, workflow development, automation, follow-up processes, and optional Virtual Assistant support.",
  },
  {
    q: "How much do Virtual Assistant services cost?",
    a: "Growth is $1,697/month plus $2,997 setup and includes one dedicated trained Philippines-based VA. Scale is $3,497/month plus $4,997 setup. VA Boost is $1,497/month.",
  },
  {
    q: "Can I use Virtual Assistant services without purchasing the Sales Growth System?",
    a: "Yes. Virtual Assistant support can be used as a separate service or integrated with the Sales Growth System.",
  },
];

export const HERO_IMG = "/assets/images/plates/hero.webp";
export const TEAM_IMG = "/assets/images/plates/team.webp";

/* Real photography for the industry showcase. No business names. */
export const industryShowcase: {
  icon: IconName;
  label: string;
  blurb: string;
  image: string;
  to: string;
}[] = [
  {
    icon: "building",
    label: "Real estate",
    blurb:
      "Capture every inquiry and close more listings with connected follow-up.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/17e5c75e-d8a8-4c80-8890-78b892f0a10f.png",
    to: "/industries",
  },
  {
    icon: "medical",
    label: "Medical & healthcare",
    blurb:
      "Keep patients engaged with confirmations, reminders, and reactivation.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/329dfae2-1bc5-4159-9135-67aa7ce60f0c.png",
    to: "/industries",
  },
  {
    icon: "shield",
    label: "Insurance",
    blurb:
      "Never miss a renewal or a referral with automated policy follow-up.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/4a52cd68-2d10-4b7b-a8e1-fa5ef8011ab7.png",
    to: "/industries",
  },
  {
    icon: "users",
    label: "Coaching & consulting",
    blurb:
      "Scale your practice with booked calls and nurtured, high-intent leads.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/bf6d4968-9672-4a55-8612-de93520c65eb.png",
    to: "/industries",
  },
  {
    icon: "briefcase",
    label: "Construction & contractors",
    blurb: "Turn estimate requests into scheduled jobs and stay on track.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/f538550b-0b6d-4765-b7af-b13b41106556.png",
    to: "/industries",
  },
  {
    icon: "map",
    label: "Local home services",
    blurb:
      "Answer every call and follow up on every quote, even when you're busy.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/e0150ff7-e805-4248-9f0e-d24e83975295.png",
    to: "/industries",
  },
];

export const testimonials: {
  quote: string;
  name: string;
  role: string;
  industry: string;
  avatar?: string;
}[] = [
  {
    quote:
      "The Global EA Team added instant value to our growing organization. They are professional, polite, and genuinely care about performing their tasks well. I would highly recommend Global to those looking to gain their time back and simultaneously increasing productivity.",
    name: "Chris Borja",
    role: "Become a Better Networker",
    industry: "Professional Networking",
    avatar:
      "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/6b9ZFpsH6Pv0R2iaasp8/media/6850417c5cc8475422fc318f.png",
  },
  {
    quote:
      "Global Marketing Group has helped me streamline my business! They have taken so much stress off my shoulders with helping me with automations and my marketing! I am grateful and highly recommend their team!",
    name: "Wayside Bookkeeping",
    role: "Bookkeeping & Accounting Services",
    industry: "Financial Services",
    avatar:
      "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/6b9ZFpsH6Pv0R2iaasp8/media/6850417c681f2db5921b2f43.png",
  },
  {
    quote:
      "Global Marketing Group has done a terrific job for us at Klinghammer Construction, and are always there for you if needed in many ways. Give them a chance and you'll be glad you did!",
    name: "Klinghammer Construction",
    role: "Construction, LLC",
    industry: "General Contracting",
    avatar:
      "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/6b9ZFpsH6Pv0R2iaasp8/media/6850417c681f2d7d231b2f44.png",
  },
];
