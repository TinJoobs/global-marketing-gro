import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHead, CTASection, FAQList } from "@/components/sections";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import {
  problems,
  features,
  process,
  connection,
  industries,
  reasons,
  coreSolutions,
  connectedServices,
  faqs,
  TEAM_IMG,
} from "@/pages/home/homeData";

export default function HomeSections() {
  return (
    <>
      {/* Core solutions */}
      <section id="core-solutions" className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Our two core solutions"
            title="Everything You Need to Grow"
            subtitle="Sales systems and skilled people, designed to work together."
          />
          <StaggerGroup className="grid md:grid-cols-2 gap-6">
            {coreSolutions.map((c) => (
              <StaggerItem key={c.title} className="card-gmg">
                <div className="flex items-center justify-between mb-5">
                  <span className={`icon-box ${c.tone}`}>
                    <Icon name={c.icon as IconName} size={26} />
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
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Problem */}
      <section className="section-gmg pale-bg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <SectionHead
              eyebrow="The problem"
              title="Your Business May Not Have a Lead Problem."
              subtitle="It may have a follow-up and execution problem."
            />
            <StaggerGroup className="space-y-3">
              {problems.map((p) => (
                <StaggerItem
                  key={p.text}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 transition-all hover:border-teal/30 hover:translate-x-1"
                >
                  <Icon
                    name={p.icon}
                    size={20}
                    className="text-teal shrink-0"
                  />
                  <span className="text-foreground/80">{p.text}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
          <Reveal delay={0.12}>
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
          </Reveal>
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
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <StaggerItem key={f.title} className="card-gmg">
                <span className={`icon-box ${f.tone} mb-5`}>
                  <Icon name={f.icon} size={24} />
                </span>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
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
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((p) => (
              <StaggerItem key={p.num} className="text-center">
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white border border-line flex items-center justify-center shadow-sm mb-4 transition-all hover:border-teal/40 hover:shadow-[0_12px_30px_rgba(0,129,132,0.18)]">
                  <Icon name={p.icon} size={26} className="text-teal" />
                  <span className="absolute -top-2 -right-2 bg-navy text-white text-[0.65rem] font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {p.num}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* People + technology (dark) */}
      <section className="section-gmg dark-section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
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
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 gap-5">
            {connection.map((c) => (
              <StaggerItem
                key={c.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center transition-all hover:bg-white/10 hover:border-teal/40"
              >
                <span className="mx-auto mb-4 w-14 h-14 rounded-full bg-teal/20 text-teal flex items-center justify-center">
                  <Icon name={c.icon} size={26} />
                </span>
                <h3 className="text-white text-base font-bold mb-1">
                  {c.title}
                </h3>
                <p className="text-sm text-white/70">{c.sub}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Industries + Why GMG */}
      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <SectionHead
              eyebrow="Who we serve"
              title="Built for Busy Business Owners and Growing Organizations."
            />
            <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {industries.map((ind) => (
                <StaggerItem key={ind.label} className="contents">
                  <Link
                    to={ind.href}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white p-3 hover:border-teal/40 hover:shadow-[0_10px_24px_rgba(15,31,51,0.07)] transition-all"
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
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Link to="/industries" className="text-link mt-6">
              Find your industry <Icon name="arrow" size={18} />
            </Link>
            <div className="mt-6 rounded-2xl border border-line overflow-hidden shadow-sm">
              <img
                src={TEAM_IMG}
                alt="Professionals working together at a laptop"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHead
              eyebrow="Why Global Marketing Group?"
              title="More Than a Software Provider or Staffing Company."
              subtitle="We help connect your strategy, systems, and support team."
            />
            <StaggerGroup className="space-y-5">
              {reasons.map((r) => (
                <StaggerItem key={r.title} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-teal/15 flex items-center justify-center">
                    <Icon name="check" size={16} className="text-teal" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {r.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
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
          <StaggerGroup className="grid md:grid-cols-3 gap-6">
            {connectedServices.map((c) => (
              <StaggerItem key={c.title} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{c.body}</p>
                <Link to={c.to} className="text-link text-sm">
                  Explore this service <Icon name="arrow" size={16} />
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <SectionHead
              eyebrow="A few helpful answers"
              title="Start with clarity."
              subtitle="Explore how the system and your Virtual Assistant can work for your business."
            />
            <Link to="/faq" className="text-link">
              Read all FAQs <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <FAQList items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Your Next Customer May Already Be in Your Pipeline"
        body="The opportunity may have entered your business through a phone call, form, email, social media message, or previous inquiry. Let us help you follow up and turn more opportunities into customers."
      />
    </>
  );
}
