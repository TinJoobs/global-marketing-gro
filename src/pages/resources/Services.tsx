import React from "react";
import { Button } from "@/components/ui/button";
import {
  Target,
  Zap,
  Rocket,
  BarChart3,
  Workflow,
  Layout,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Elevate Your{" "}
              <span className="text-primary">Marketing Strategy</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Global Marketing Group provides full-service digital strategy and
              implementation. From CRM setup to complex funnel creation, we
              handle the technology so you can focus on growth.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Book a Strategy Call</Link>
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
                title: "Sales Funnel Creation",
                desc: "End-to-end design and implementation of high-converting funnels.",
              },
              {
                icon: Workflow,
                title: "CRM Setup & Customization",
                desc: "Tailored CRM configuration to match your specific business workflows.",
              },
              {
                icon: Zap,
                title: "Marketing Automation",
                desc: "Complex automation sequences for lead nurturing and customer retention.",
              },
              {
                icon: Target,
                title: "Campaign Optimization",
                desc: "Continuous testing and refinement of your marketing assets.",
              },
              {
                icon: Rocket,
                title: "Digital Strategy",
                desc: "Comprehensive growth roadmaps designed for your specific industry.",
              },
              {
                icon: BarChart3,
                title: "Advanced Reporting",
                desc: "Custom dashboards that show the metrics that matter most.",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
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

export default Services;
