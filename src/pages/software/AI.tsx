import React from "react";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  MessageSquare,
  Bot,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const AIPage = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>The Future of Business</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unleash the Power of <span className="text-primary">AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Global Marketing Group integrates cutting-edge AI into your daily
              operations. From smart chatbots to predictive lead scoring, we
              make AI accessible and profitable.
            </p>
            <Button size="lg" className="px-10" asChild>
              <Link to="/contact">Get AI-Powered Today</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "AI Conversations",
                desc: "Smart live chat that understands intent and drives conversion.",
              },
              {
                icon: Bot,
                title: "Chatbot Workflows",
                desc: "Automated assistance that handles complex queries 24/7.",
              },
              {
                icon: Target,
                title: "Lead Scoring",
                desc: "AI models that predict which leads are most likely to buy.",
              },
              {
                icon: Zap,
                title: "Instant Responses",
                desc: "Reduce response times to seconds with intelligent automation.",
              },
              {
                icon: Cpu,
                title: "GPT Content",
                desc: "Generate high-quality marketing copy and emails in seconds.",
              },
              {
                icon: Sparkles,
                title: "Smart Optimization",
                desc: "AI that continuously improves your campaign performance.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPage;
