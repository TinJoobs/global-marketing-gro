import React from "react";
import { Button } from "@/components/ui/button";
import {
  Link2,
  Zap,
  ShieldCheck,
  Database,
  Workflow,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const Integrations = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Seamlessly Connect{" "}
              <span className="text-primary">Your Tools</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Connect your favorite marketing, sales, and productivity tools
              within our cutting-edge ecosystem. Real-time data sync for a
              unified business view.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Explore Ecosystem</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Link2,
                title: "Tool Ecosystem",
                desc: "Hundreds of native integrations with popular platforms.",
              },
              {
                icon: Zap,
                title: "No-Code Builder",
                desc: "Create custom connections without technical expertise.",
              },
              {
                icon: Database,
                title: "Real-time Sync",
                desc: "Keep your data consistent across all your applications.",
              },
              {
                icon: Workflow,
                title: "Workflow Automation",
                desc: "Trigger actions in external tools from our CRM.",
              },
              {
                icon: ShieldCheck,
                title: "Enterprise Security",
                desc: "Secure, encrypted data transfers for complete peace of mind.",
              },
              {
                icon: Globe,
                title: "Open API",
                desc: "Build your own custom integrations with our robust API.",
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

export default Integrations;
