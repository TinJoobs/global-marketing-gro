import React from "react";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Users,
  Zap,
  Layout,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const MembershipSites = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Recurring Revenue{" "}
              <span className="text-primary">Membership Sites</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Create a membership platform that drives consistent, recurring
              revenue. Manage content, members, and monetization all in one
              place.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Start Your Community</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: "Content Management",
                desc: "Easily organize and gate your premium content.",
              },
              {
                icon: CreditCard,
                title: "Subscription Tiers",
                desc: "Create multiple membership levels with different pricing.",
              },
              {
                icon: Users,
                title: "Member Engagement",
                desc: "Keep your community active with integrated social features.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Access",
                desc: "Protect your intellectual property with enterprise-grade security.",
              },
              {
                icon: TrendingUp,
                title: "Member Insights",
                desc: "Track retention, churn, and member behavior.",
              },
              {
                icon: Zap,
                title: "Automation",
                desc: "Automate onboarding, renewals, and cancellations.",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipSites;
