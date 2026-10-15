import React from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Globe,
  Award,
  Video,
  Zap,
  MousePointer2,
} from "lucide-react";
import { Link } from "react-router-dom";

const OnlineCourses = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Monetize Your <span className="text-primary">Knowledge</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Turn your expertise into profit with confidence. Our course
              platform makes it easy to create, market, and sell online courses
              worldwide.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Create Your Course</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "Course Creation",
                desc: "Upload videos, quizzes, and resources with ease.",
              },
              {
                icon: Globe,
                title: "Worldwide Reach",
                desc: "Sell your courses to students across the globe.",
              },
              {
                icon: Award,
                title: "Authority Building",
                desc: "Establish yourself as a leader in your industry.",
              },
              {
                icon: BookOpen,
                title: "Flexible Learning",
                desc: "Students can learn at their own pace on any device.",
              },
              {
                icon: MousePointer2,
                title: "Sales Integration",
                desc: "Seamlessly connect your courses to your sales funnels.",
              },
              {
                icon: Zap,
                title: "Instant Access",
                desc: "Automated student onboarding after purchase.",
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

export default OnlineCourses;
