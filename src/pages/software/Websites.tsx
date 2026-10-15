import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Layout, Search, Zap, ShieldCheck, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Websites = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>Digital Presence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Websites That <span className="text-primary">Deliver Results</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Your website should be your hardest working employee. We build professional, conversion-focused websites that reflect your vision and drive growth.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Build Your Vision</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">Performance and <span className="text-primary">Design</span></h2>
              <div className="grid gap-6">
                {[
                  { icon: Layout, title: "Professional Design", desc: "Modern, clean layouts tailored to your brand identity." },
                  { icon: Search, title: "SEO Optimized", desc: "Built with search engines in mind to drive organic traffic." },
                  { icon: Smartphone, title: "Fully Responsive", desc: "Perfect experience on desktop, tablet, and mobile devices." },
                  { icon: ShieldCheck, title: "Secure & Reliable", desc: "Enterprise-grade hosting and security for peace of mind." }
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
            <div className="glass-card p-4 rounded-2xl">
              <img 
                src="https://vibe.filesafe.space/1778597036474054298/assets/e9f0ea79-5c78-4d73-aa5f-74b40e229018.jpg" 
                alt="Website Development" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Websites;
