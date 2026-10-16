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
    title: "Capture More Opportunities",
    body: "Bring leads into one organized CRM through forms, landing pages, appointment calendars, phone calls, and other lead sources.",
    tone: "",
  },
  {
    icon: "message",
    title: "Follow Up Consistently",
    body: "Use automated email and text-message sequences to respond quickly and stay connected with potential customers.",
    tone: "blue",
  },
  {
    icon: "calendar",
    title: "Book More Appointments",
    body: "Make it easier for prospects to schedule while using confirmations and reminders to reduce missed appointments.",
    tone: "purple",
  },
  {
    icon: "chart",
    title: "Organize Your Sales Pipeline",
    body: "Know exactly where every lead stands, what action is needed next, and which opportunities require attention.",
    tone: "",
  },
  {
    icon: "users",
    title: "Support Daily Operations",
    body: "Delegate administrative, marketing, customer-service, and sales-support tasks to a trained Virtual Assistant.",
    tone: "blue",
  },
  {
    icon: "report",
    title: "Track Performance",
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
    title: "Retain and Reactivate",
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
    title: "Follow-Up Workflows",
    sub: "Lead and pipeline management",
  },
  {
    icon: "users",
    title: "Dedicated VA",
    sub: "Personal support and execution",
  },
  {
    icon: "clipboard",
    title: "Project Coordination",
    sub: "Accountability and reporting",
  },
];

export const industries: { icon: IconName; label: string; href: string }[] = [
  { icon: "home", label: "Home Services", href: "/industries" },
  { icon: "building", label: "Real Estate", href: "/industries" },
  { icon: "shield", label: "Insurance", href: "/industries" },
  { icon: "users", label: "Coaches & Consultants", href: "/industries" },
  { icon: "medical", label: "Medical & Professional", href: "/industries" },
  { icon: "utensils", label: "Restaurants & Hospitality", href: "/industries" },
  { icon: "heart", label: "Health & Wellness", href: "/industries" },
  { icon: "hands", label: "Churches & Nonprofits", href: "/industries" },
  { icon: "map", label: "Local Service Businesses", href: "/industries" },
  {
    icon: "briefcase",
    label: "Entrepreneurs & Small Business",
    href: "/industries",
  },
];

export const reasons: { title: string; body: string }[] = [
  {
    title: "Customized Support",
    body: "We begin with a discovery conversation to understand your goals, challenges, workload, and current processes.",
  },
  {
    title: "The Right Virtual Assistant Match",
    body: "We profile your business needs and match you with a Virtual Assistant whose skills align with the work you need completed.",
  },
  {
    title: "Integrated CRM and Automation",
    body: "We help organize your leads, conversations, appointments, and sales opportunities within one centralized system.",
  },
  {
    title: "Ongoing Coordination",
    body: "Our team supports onboarding, communication, task coordination, client check-ins, and performance reporting.",
  },
  {
    title: "Flexible Business Support",
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
    title: "From $10 / hour",
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
    title: "Virtual Assistant Services",
    body: "Skilled Virtual Assistants who help manage the daily tasks that keep your business moving.",
    tags: ["From $10 per hour", "Philippines-based", "Matched to your needs"],
    to: "/virtual-assistant-services",
    cta: "Find Your Virtual Assistant",
  },
];

export const connectedServices = [
  {
    icon: "database" as IconName,
    title: "CRM & Automation",
    body: "Connect your contacts, conversations, appointments, tasks, and sales pipeline in one organized system. Build follow-up around the way your business actually works.",
    to: "/crm-automation",
  },
  {
    icon: "monitor" as IconName,
    title: "Digital Solutions",
    body: "Connect websites, landing pages, funnels, and approved marketing content to a clear lead-capture and follow-up process.",
    to: "/digital-solutions",
  },
  {
    icon: "calendar" as IconName,
    title: "Appointment Setting",
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
    a: "General Virtual Assistant support starts at $10 per hour. Specialized or certified support may require a different rate depending on the qualifications and scope of work required.",
  },
  {
    q: "Can I use Virtual Assistant services without purchasing the Sales Growth System?",
    a: "Yes. Virtual Assistant support can be used as a separate service or integrated with the Sales Growth System.",
  },
];

export const HERO_IMG =
  "https://vibe.filesafe.space/1778597036474054298/assets/c93d9a0d-ceff-48d4-94df-196954f52891.webp";
export const TEAM_IMG =
  "https://vibe.filesafe.space/1778597036474054298/assets/c93d9a0d-ceff-48d4-94df-196954f52891.webp";
