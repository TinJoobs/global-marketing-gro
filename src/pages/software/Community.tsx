import React from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Heart,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build a Vibrant <span className="text-primary">Community</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Lead and grow a vibrant community with Global Marketing Group. Our
              platform provides the tools you need to foster engagement and
              build authority.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Launch Your Community</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Member Management",
                desc: "Easily manage your community members and roles.",
              },
              {
                icon: MessageSquare,
                title: "Engagement Tools",
                desc: "Fosters discussions with forums, comments, and direct messaging.",
              },
              {
                icon: Heart,
                title: "Brand Loyalty",
                desc: "Build deep connections with your most dedicated fans.",
              },
              {
                icon: Shield,
                title: "Moderation",
                desc: "Keep your community safe with powerful moderation tools.",
              },
              {
                icon: TrendingUp,
                title: "Growth Analytics",
                desc: "Monitor community health and engagement trends.",
              },
              {
                icon: Zap,
                title: "Monetization",
                desc: "Turn your community into a sustainable business.",
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

export default Community;
