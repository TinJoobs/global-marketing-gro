import React from "react";
import { Button } from "@/components/ui/button";
import {
  Layout,
  MousePointer2,
  Target,
  BarChart3,
  Smartphone,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPages = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              High-Impact <span className="text-primary">Landing Pages</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Design high-impact landing pages for your website or sales
              funnels. Capture more leads and drive higher conversions with our
              optimized templates.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Start Designing</Link>
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
                title: "Lead Capture",
                desc: "Optimized forms designed to maximize sign-ups.",
              },
              {
                icon: MousePointer2,
                title: "Drag & Drop",
                desc: "Easy to use editor for complete creative control.",
              },
              {
                icon: Target,
                title: "CRM Integration",
                desc: "Instant sync with your Global Marketing Group CRM.",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                desc: "Track visitor behavior and conversion performance.",
              },
              {
                icon: Smartphone,
                title: "Responsive",
                desc: "Pages that look stunning on every device size.",
              },
              {
                icon: Zap,
                title: "Fast Loading",
                desc: "Optimized for speed to reduce bounce rates.",
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

export default LandingPages;
