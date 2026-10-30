import React from "react";
import { Button } from "@/components/ui/button";
import {
  Zap,
  } from "lucide-react";
import { Link } from "react-router-dom";

const Affiliate = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unlock Your{" "}
              <span className="text-primary">Earning Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join Global Marketing Group’s exclusive affiliate program. Promote
              high-converting funnels, CRM automation, and premium marketing
              services.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Join the Program</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                label: "Sales Commission",
                value: "10%",
                desc: "Flat-rate on all service sales.",
              },
              {
                label: "Subscription",
                value: "Up to 40%",
                desc: "Recurring monthly commission.",
              },
              {
                label: "Payout Structure",
                value: "5-Tier",
                desc: "Multi-level earning potential.",
              },
              {
                label: "Earning Limit",
                value: "Unlimited",
                desc: "No caps on your success.",
              },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-bold mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Partner With <span className="text-primary">GMG?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We provide all the assets and support you need to succeed as an
                affiliate partner.
              </p>
              <div className="grid gap-4">
                {[
                  "High-converting marketing materials",
                  "Dedicated affiliate support manager",
                  "Real-time tracking and reporting",
                  "Early access to new products & features",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl bg-primary/5">
              <h3 className="text-2xl font-bold mb-6">Ready to start?</h3>
              <p className="text-muted-foreground mb-8">
                Sign up today and start earning commission on every referral.
                Our team will review your application within 48 hours.
              </p>
              <Button className="w-full" size="lg" asChild>
                <Link to="/contact">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
