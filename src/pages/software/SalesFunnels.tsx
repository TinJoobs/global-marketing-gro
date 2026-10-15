import React from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Layers,
  MousePointer2,
  Zap,
  BarChart3,
  Users,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

const SalesFunnels = () => {
  const features = [
    {
      title: "Lead Capture",
      desc: "High-converting forms and popups to grow your list.",
    },
    {
      title: "Template Library",
      desc: "Proven funnel designs for every industry.",
    },
    {
      title: "A/B Split Testing",
      desc: "Optimize every step with data-driven experiments.",
    },
    {
      title: "One-Click Upsells",
      desc: "Increase average order value instantly.",
    },
    {
      title: "CRM Integration",
      desc: "Seamlessly sync every lead with your sales pipeline.",
    },
    {
      title: "Advanced Analytics",
      desc: "Track conversion rates and ROI in real-time.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              <span>Conversion Optimization</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Powerful{" "}
              <span className="text-primary">Sales Funnels</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Design high-converting marketing assets and lead capture systems
              that turn visitors into loyal customers. Our funnel builder is
              designed for speed and performance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Build Your Funnel Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Schedule A Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all"
              >
                <CheckCircle2 className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Our Funnels{" "}
                <span className="text-primary">Convert Better</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We don't just give you a builder; we provide the strategy and
                automation needed to make your funnels profitable from day one.
              </p>
              <div className="space-y-4">
                {[
                  "Mobile-first responsive designs",
                  "Lightning-fast page load speeds",
                  "Integrated email & SMS automation",
                  "Expert support and strategy calls",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <img
                src="https://vibe.filesafe.space/1778597036474054298/assets/b8aa3bf7-c31d-4200-843e-ef53b2a46dc3.jpg"
                alt="Funnel Analytics"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesFunnels;
