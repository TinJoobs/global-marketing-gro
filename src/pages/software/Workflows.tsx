import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings2, Workflow, Zap, BarChart3, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Workflows = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Workflow className="w-4 h-4" />
              <span>Operational Efficiency</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Smarter <span className="text-primary">Workflows</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Automate your marketing and operations with impact. Our visual workflow builder allows you to create complex automations without writing a single line of code.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Build Your First Workflow</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Visual Builder", desc: "Drag-and-drop interface for creating complex logic flows." },
              { icon: Clock, title: "Time-Saving", desc: "Automate repetitive tasks and free up your team's time." },
              { icon: Users, title: "Collaboration", desc: "Share and manage workflows across your entire organization." },
              { icon: Settings2, title: "Custom Triggers", desc: "Start workflows based on almost any user action." },
              { icon: BarChart3, title: "Performance Insights", desc: "Detailed reporting on how your automations are performing." },
              { icon: Workflow, title: "Templates", desc: "Start fast with proven automation templates for your industry." }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all">
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

export default Workflows;
