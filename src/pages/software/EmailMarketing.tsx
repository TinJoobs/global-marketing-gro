import React from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Zap,
  Target,
  BarChart3,
  ShieldCheck,
  Send,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const EmailMarketing = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              <span>Engagement Automation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect and Engage Your{" "}
              <span className="text-primary">Audience</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Deliver the right message at the right time. Our email marketing
              platform combines beautiful design with powerful automation to
              drive results.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Start Your Campaign</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="glass-card p-4 rounded-2xl">
              <img
                src="https://vibe.filesafe.space/1778597036474054298/assets/8a9a7209-4a6c-41a5-85d5-d17069a2adf2.jpg"
                alt="Email Editor"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need for{" "}
                <span className="text-primary">Email Success</span>
              </h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Smart Automation",
                    desc: "Trigger emails based on user behavior and actions.",
                  },
                  {
                    icon: Target,
                    title: "Precise Segmentation",
                    desc: "Group your audience for hyper-targeted messaging.",
                  },
                  {
                    icon: BarChart3,
                    title: "Real-time Analytics",
                    desc: "Track opens, clicks, and conversions instantly.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "High Deliverability",
                    desc: "Ensure your messages reach the inbox every time.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailMarketing;
