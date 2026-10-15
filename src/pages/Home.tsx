import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHead, CTASection, FAQList } from "@/components/sections";

const HERO_IMG =
  "https://vibe.filesafe.space/1778597036474054298/assets/c93d9a0d-ceff-48d4-94df-196954f52891.webp";
const TEAM_IMG =
  "https://vibe.filesafe.space/1778597036474054298/assets/c93d9a0d-ceff-48d4-94df-196954f52891.webp";

const problems: { icon: IconName; text: string }[] = [
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

const features: {
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

const process: { icon: IconName; num: string; title: string; body: string }[] =
  [
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

const connection: { icon: IconName; title: string; sub: string }[] = [
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

const industries: { icon: IconName; label: string; href: string }[] = [
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

const reasons: { title: string; body: string }[] = [
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

const trust: { icon: IconName; title: string; sub: string }[] = [
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

const floatCards: {
  icon: IconName;
  title: string;
  sub: string;
  pos: string;
}[] = [
  {
    icon: "database",
    title: "One organized CRM",
    sub: "A clearer view of every lead",
    pos: "top-6 -left-6",
  },
  {
    icon: "users",
    title: "Real human support",
    sub: "People who keep work moving",
    pos: "bottom-16 -right-6",
  },
  {
    icon: "calendar",
    title: "Follow-up, connected",
    sub: "From first inquiry to next step",
    pos: "-bottom-5 left-10",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16">
        <div className="container-gmg grid lg:grid-cols-[1.13fr_1fr] gap-12 items-center">
          <div>
            <span className="eyebrow-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" />
              Better systems. Better people. Better growth.
            </span>
            <h1 className="text-5xl md:text-[4.35rem] font-bold mt-6">
              Turn more leads
              <br />
              into <span className="accent-text">customers.</span>
            </h1>
            <p className="text-xl text-navy font-semibold mt-4">
              Without doing everything yourself.
            </p>
            <p className="lead-gmg mt-4 max-w-xl">
              Global Marketing Group combines CRM technology, sales automation,
              proven follow-up processes, and dedicated Virtual Assistant
              support to help businesses operate more efficiently and grow more
              consistently.
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-8">
              <Link to="/contact" className="btn-primary-gmg">
                Book a Free Strategy Call <Icon name="calendar" size={18} />
              </Link>
              <a href="#core-solutions" className="btn-outline-gmg">
                Explore Our Services <Icon name="arrow" size={18} />
              </a>
            </div>
            <p className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <Icon name="check" size={18} className="text-teal" />
              One system. One support team. A better way to grow.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-mint/40 to-transparent rounded-[40px] blur-2xl" />
            <div className="relative rounded-[28px] border border-line bg-white p-3 shadow-xl">
              <img
                src={HERO_IMG}
                alt="Support professional wearing a headset and working at a laptop"
                className="rounded-2xl w-full"
              />
            </div>
            {floatCards.map((c) => (
              <div
                key={c.title}
                className={`absolute ${c.pos} bg-white rounded-2xl border border-line shadow-lg p-3 flex items-center gap-3 max-w-[220px]`}
              >
                <span className="icon-box">
                  <Icon name={c.icon} size={20} />
                </span>
                <div>
                  <strong className="text-navy text-sm block">{c.title}</strong>
                  <span className="text-xs text-muted-foreground">{c.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="container-gmg mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4"
            >
              <span className="icon-box">
                <Icon name={t.icon} size={22} />
              </span>
              <div>
                <strong className="text-navy text-sm block">{t.title}</strong>
                <span className="text-xs text-muted-foreground">{t.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core solutions */}
      <section id="core-solutions" className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Our two core solutions"
            title="Everything You Need to Grow"
            subtitle="Sales systems and skilled people, designed to work together."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
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
                tags: [
                  "From $10 per hour",
                  "Philippines-based",
                  "Matched to your needs",
                ],
                to: "/virtual-assistant-services",
                cta: "Find Your Virtual Assistant",
              },
            ].map((c) => (
              <article key={c.title} className="card-gmg">
                <div className="flex items-center justify-between mb-5">
                  <span className={`icon-box ${c.tone}`}>
                    <Icon name={c.icon} size={26} />
                  </span>
                  <span className="text-3xl font-bold text-line">{c.num}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground mb-4">{c.body}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold bg-pale text-teal-dark rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link to={c.to} className="text-link">
                  {c.cta} <Icon name="arrow" size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-gmg pale-bg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHead
              eyebrow="The problem"
              title="Your Business May Not Have a Lead Problem."
              subtitle="It may have a follow-up and execution problem."
            />
            <div className="space-y-3">
              {problems.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white p-4"
                >
                  <Icon
                    name={p.icon}
                    size={20}
                    className="text-teal shrink-0"
                  />
                  <span className="text-foreground/80">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-gmg">
            <span className="icon-box mb-5">
              <Icon name="refresh" size={26} />
            </span>
            <h3 className="text-xl font-bold mb-3">
              Every missed follow-up can become a missed sale.
            </h3>
            <p className="text-muted-foreground mb-3">
              Stop losing opportunities because of missed calls, delayed
              follow-ups, disorganized systems, or an overloaded team.
            </p>
            <p className="text-muted-foreground mb-5">
              Global Marketing Group helps you put the right technology,
              processes, and people in place so your business can respond
              faster, stay organized, and convert more opportunities.
            </p>
            <Link to="/how-it-works" className="text-link">
              See how our approach works <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="How we help your business grow"
            title="A clearer path from inquiry to opportunity."
            subtitle="Capture the lead. Keep the conversation moving. Support the people doing the work."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <article key={f.title} className="card-gmg">
                <span className={`icon-box ${f.tone} mb-5`}>
                  <Icon name={f.icon} size={24} />
                </span>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Five-part process */}
      <section className="section-gmg pale-bg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="The five-part Sales Growth process"
            title="A Clear Process. Connected Follow-Up."
            subtitle="The Sales Growth System brings structure to the whole customer journey."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((p) => (
              <article key={p.num} className="text-center">
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white border border-line flex items-center justify-center shadow-sm mb-4">
                  <Icon name={p.icon} size={26} className="text-teal" />
                  <span className="absolute -top-2 -right-2 bg-navy text-white text-[0.65rem] font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {p.num}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* People + technology (dark) */}
      <section className="section-gmg dark-section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              eyebrow="The power of people + technology"
              title={
                <>
                  Automation Creates the Process.
                  <br />
                  <span className="accent-text">
                    People Create the Connection.
                  </span>
                </>
              }
            />
            <p className="lead-gmg text-white/80">
              Your system handles the repetitive work while your Virtual
              Assistant supports the tasks that require judgment, communication,
              and human connection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {connection.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center"
              >
                <span className="mx-auto mb-4 w-14 h-14 rounded-full bg-teal/20 text-teal flex items-center justify-center">
                  <Icon name={c.icon} size={26} />
                </span>
                <h3 className="text-white text-base font-bold mb-1">
                  {c.title}
                </h3>
                <p className="text-sm text-white/70">{c.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries + Why GMG */}
      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHead
              eyebrow="Who we serve"
              title="Built for Busy Business Owners and Growing Organizations."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {industries.map((ind) => (
                <Link
                  key={ind.label}
                  to={ind.href}
                  className="flex items-center gap-2 rounded-xl border border-line bg-white p-3 hover:border-teal/40 transition"
                >
                  <Icon
                    name={ind.icon}
                    size={20}
                    className="text-teal shrink-0"
                  />
                  <span className="text-sm font-medium text-navy">
                    {ind.label}
                  </span>
                </Link>
              ))}
            </div>
            <Link to="/industries" className="text-link mt-6">
              Find your industry <Icon name="arrow" size={18} />
            </Link>
            <div className="mt-6 rounded-2xl border border-line overflow-hidden">
              <img
                src={TEAM_IMG}
                alt="Professionals working together at a laptop"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="Why Global Marketing Group?"
              title="More Than a Software Provider or Staffing Company."
              subtitle="We help connect your strategy, systems, and support team."
            />
            <div className="space-y-5">
              {reasons.map((r) => (
                <div key={r.title} className="flex items-start gap-3">
                  <Icon
                    name="check"
                    size={22}
                    className="text-teal mt-1 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-navy">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connected services */}
      <section className="section-gmg pale-bg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Connected services"
            title="Build the support around your system."
            subtitle="Practical services that strengthen your two core solutions."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((c) => (
              <article key={c.title} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{c.body}</p>
                <Link to={c.to} className="text-link text-sm">
                  Explore this service <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHead
              eyebrow="A few helpful answers"
              title="Start with clarity."
              subtitle="Explore how the system and your Virtual Assistant can work for your business."
            />
            <Link to="/faq" className="text-link">
              Read all FAQs <Icon name="arrow" size={18} />
            </Link>
          </div>
          <FAQList
            items={[
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
            ]}
          />
        </div>
      </section>

      <CTASection
        title="Your Next Customer May Already Be in Your Pipeline"
        body="The opportunity may have entered your business through a phone call, form, email, social media message, or previous inquiry. Let us help you follow up and turn more opportunities into customers."
      />
    </div>
  );
}
