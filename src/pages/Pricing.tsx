import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, Target, BarChart3, ShieldCheck, Workflow, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "297",
      desc: "Perfect for small businesses starting their automation journey.",
      features: [
        "Complete integration platform",
        "Pipeline visibility",
        "Basic workflow management",
        "Email marketing (up to 5k contacts)",
        "Standard support"
      ]
    },
    {
      name: "Professional",
      price: "497",
      desc: "Ideal for growing businesses needing advanced CRM features.",
      features: [
        "Everything in Starter",
        "Multi-channel campaigns",
        "Advanced reporting & analytics",
        "Sales funnel builder",
        "Scheduling system",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "997",
      desc: "Full-scale automation and AI support for established teams.",
      features: [
        "Everything in Professional",
        "AI-enhanced executive assistant",
        "Custom workflow engineering",
        "Unlimited contacts",
        "Dedicated account representative",
        "24/7 Premium support"
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Automate Success</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business goals. Transparent pricing with no hidden fees.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`glass-card p-10 rounded-3xl flex flex-col relative ${plan.popular ? 'border-primary shadow-primary/20 scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-12" variant={plan.popular ? 'default' : 'outline'} asChild>
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">The GMG Success Journey</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Zap, label: "Awareness" },
              { icon: MessageSquare, label: "Engagement" },
              { icon: Target, label: "Pipeline" },
              { icon: Workflow, label: "Conversion" },
              { icon: ShieldCheck, label: "Satisfaction" },
              { icon: BarChart3, label: "Growth" }
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-bold text-sm">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
