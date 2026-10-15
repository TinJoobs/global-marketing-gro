import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Users,
  Target,
  Zap,
  BarChart3,
  Globe,
  ShieldCheck,
  MessageSquare,
  Search,
  Mail,
  Layout as LayoutIcon,
  Briefcase,
  Stethoscope,
  Home as HomeIcon,
  Shield,
  Settings,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function Index() {
  const services = [
    {
      title: "Accounting Executive Assistant",
      description:
        "Specialized support for financial management, bookkeeping, and administrative tasks.",
      icon: Briefcase,
    },
    {
      title: "Realtor Executive Assistant",
      description:
        "Streamline lead management, property listings, and client communications.",
      icon: HomeIcon,
    },
    {
      title: "Medical Executive Assistant",
      description:
        "HIPAA-compliant support for scheduling, patient intake, and clinic operations.",
      icon: Stethoscope,
    },
    {
      title: "Insurance Executive Assistant",
      description:
        "Policy management, claims processing support, and lead nurturing.",
      icon: Shield,
    },
    {
      title: "Website Creation",
      description:
        "Professional, conversion-focused websites tailored to your brand identity.",
      icon: Globe,
    },
    {
      title: "Facebook Ads & Funnels",
      description:
        "High-performing ad campaigns and sales funnels that drive real ROI.",
      icon: Target,
    },
    {
      title: "Professional Development",
      description:
        "Training and support to elevate your team's performance and efficiency.",
      icon: Users,
    },
    {
      title: "Customizable Solutions",
      description:
        "Tailored business services designed to meet your unique operational needs.",
      icon: Settings,
    },
  ];

  const aiTools = [
    {
      title: "Automated Engagement",
      description: "Initiate conversations and nurture leads automatically.",
    },
    {
      title: "24/7 Availability",
      description:
        "Your business never sleeps with our always-on AI assistants.",
    },
    {
      title: "Predictive Lead ID",
      description: "Identify high-value prospects before they even reach out.",
    },
    {
      title: "Instant Smart Responses",
      description: "Intelligent replies that sound human and drive action.",
    },
    {
      title: "Precision Targeting",
      description: "Reach the right audience with surgical accuracy.",
    },
    {
      title: "Efficiency in Follow-ups",
      description:
        "Never let a lead go cold with automated, persistent follow-ups.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/6b9ZFpsH6Pv0R2iaasp8/media/6849b5ce8beb4b267ea79096.png"
            alt="AI Executive Assistant"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Business Automation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              AI-Enhanced{" "}
              <span className="text-primary">Executive Assistants</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Delegate smarter, not harder. Our AI-driven assistants automate
              workflows, streamline operations, and free you to focus on scaling
              your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg h-14 px-8 group" asChild>
                <Link to="/contact">
                  Quick Hire Services{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8"
                asChild
              >
                <Link to="/contact">Schedule A Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Platform Intro */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                The All-In-One CRM Platform for{" "}
                <span className="text-primary">Global Growth</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Global Marketing Group provides a powerful CRM that centralizes
                your leads, sales, and customer management into a single,
                intelligent dashboard.
              </p>
              <ul className="space-y-4">
                {[
                  "Automated lead capture and nurturing",
                  "Advanced sales funnel builder",
                  "Comprehensive invoicing and payment systems",
                  "Real-time customer relationship analytics",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="link"
                className="text-primary p-0 h-auto text-lg font-bold group"
                asChild
              >
                <Link to="/software/sales-funnels">
                  Explore Software Features{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50"></div>
              <div className="glass-card p-2 rounded-2xl relative overflow-hidden">
                <img
                  src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/6b9ZFpsH6Pv0R2iaasp8/media/684a92953b9d000f5e2bed77.png"
                  alt="CRM Dashboard"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Service Cards */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Specialized Solutions for{" "}
              <span className="text-primary">Every Business</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our executive assistants are trained in industry-specific
              workflows to provide immediate value to your organization.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/6b9ZFpsH6Pv0R2iaasp8/media/683d9e8bfa096a3de4fe6d34.png"
            alt="AI Tools"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-4">
              {aiTools.map((tool, i) => (
                <div
                  key={i}
                  className="bg-background/50 border border-border p-6 rounded-xl"
                >
                  <h4 className="font-bold text-primary mb-2">{tool.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Unleash the Power of{" "}
                <span className="text-primary">AI Automation</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We don't just provide assistants; we provide AI-enhanced systems
                that work 24/7 to identify, engage, and convert leads with
                surgical precision.
              </p>
              <Button size="lg" asChild>
                <Link to="/software/ai">Learn About Our AI Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "CEO, TechFlow",
                text: "Global Marketing Group transformed our operations. Our executive assistant handles more than we thought possible thanks to their AI tools.",
              },
              {
                name: "Sarah Johnson",
                role: "Real Estate Broker",
                text: "The Realtor EA service is a game changer. I've doubled my lead conversion since joining GMG.",
              },
              {
                name: "Michael Chen",
                role: "Founder, Chen Financial",
                text: "Reliable, professional, and tech-forward. GMG is the only partner we trust for our automation needs.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl relative">
                <MessageSquare className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
                <p className="text-lg italic mb-6 relative z-10">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-bold">
                What is an AI-enhanced executive assistant?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                An AI-enhanced EA is a professional assistant who uses our
                proprietary AI tools and CRM platform to automate repetitive
                tasks, manage leads, and handle administrative duties more
                efficiently than a traditional assistant.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-bold">
                How quickly can I hire a service?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Our onboarding process is designed for speed. Once you choose
                your service and complete the initial strategy call, we can
                often have your assistant or automation systems running within
                48-72 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-bold">
                Do you support my specific industry?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! While we have specialized EAs for Accounting, Real Estate,
                Medical, and Insurance, our systems are highly customizable and
                currently support dozens of industries including Coaching,
                Construction, Wellness, and more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Scale Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses that use Global Marketing Group to
            automate their growth and reclaim their time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg h-14 px-10" asChild>
              <Link to="/contact">Get Started Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-10"
              asChild
            >
              <Link to="/contact">Schedule A Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
