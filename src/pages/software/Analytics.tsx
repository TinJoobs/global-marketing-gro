import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, LineChart, Target, Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              <span>Actionable Insights</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Comprehensive <span className="text-primary">Data Analytics</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Access the insights essential for scaling your business effectively. Map the customer journey and optimize your marketing spend with precision.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">View Demo Analytics</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Eye, title: "Campaign Visibility", desc: "See exactly where your leads and sales are coming from." },
              { icon: Target, title: "Journey Mapping", desc: "Understand every touchpoint in your customer's path to purchase." },
              { icon: PieChart, title: "Audience Insights", desc: "Deep dive into your audience demographics and behavior." },
              { icon: LineChart, title: "ROI Tracking", desc: "Measure the direct impact of every marketing dollar spent." },
              { icon: Search, title: "Creative Analysis", desc: "Identify which ads and emails are performing best." },
              { icon: BarChart3, title: "Custom Dashboards", desc: "Build the views you need to manage your business." }
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

export default Analytics;
