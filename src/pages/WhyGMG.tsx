import React from "react";
import { Button } from "@/components/ui/button";
import {
  Zap,
  ShieldCheck,
  Workflow,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const WhyGMG = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose{" "}
              <span className="text-primary">Global Marketing Group?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              We combine human expertise with artificial intelligence to create
              a growth engine for your business. Discover the GMG difference.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Support",
                desc: "Our assistants don't just work hard; they work smart using our proprietary AI automation stack.",
              },
              {
                icon: ShieldCheck,
                title: "Done-For-You Implementation",
                desc: "We don't just give you tools; we set them up and manage them for you so you can focus on your business.",
              },
              {
                icon: Workflow,
                title: "CRM & Funnel Expertise",
                desc: "Get access to world-class marketing engineers who build systems designed specifically for conversion.",
              },
              {
                icon: Users,
                title: "Elite Executive Assistants",
                desc: "Our EAs are highly trained professionals who understand your industry and your specific needs.",
              },
              {
                icon: Clock,
                title: "Reclaim Your Time",
                desc: "Our automation and assistants save our clients an average of 20-30 hours per week.",
              },
              {
                icon: TrendingUp,
                title: "Growth-Focused Systems",
                desc: "Every workflow we build and every task we handle is designed with one goal: scaling your business.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-10 rounded-2xl hover:border-primary/50 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 glass-card p-12 rounded-3xl bg-primary/5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to see the difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Book a strategy call today and let us show you how Global
              Marketing Group can transform your operations.
            </p>
            <Button size="lg" className="px-10 h-14 text-lg" asChild>
              <Link to="/contact">
                Schedule A Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyGMG;
