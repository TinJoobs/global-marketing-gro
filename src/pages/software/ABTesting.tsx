import React from 'react';
import { Button } from '@/components/ui/button';
import { Beaker, Split, BarChart3, Target, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ABTesting = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Beaker className="w-4 h-4" />
              <span>Data-Driven Growth</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Optimize with <span className="text-primary">A/B Testing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Stop guessing and start knowing. Optimize performance with data-driven testing across your digital assets to find what truly resonates with your audience.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Start Testing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Split, title: "Split Testing", desc: "Compare two versions of any page or email easily." },
              { icon: TrendingUp, title: "Statistical Significance", desc: "Know when your results are reliable and actionable." },
              { icon: Target, title: "Audience Targeting", desc: "Run tests on specific segments of your audience." },
              { icon: BarChart3, title: "Visual Reports", desc: "Clear, easy-to-read data visualizations of test results." },
              { icon: Zap, title: "Quick Setup", desc: "Launch new experiments in minutes, not hours." },
              { icon: Beaker, title: "Multivariate Testing", desc: "Test multiple elements simultaneously for deeper insights." }
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

export default ABTesting;
