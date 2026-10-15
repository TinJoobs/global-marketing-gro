import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Rocket, Heart, ShieldCheck, Globe } from 'lucide-react';

const About = () => {
  const leaders = [
    { name: "Ray B. Millan", role: "CEO/Founder", bio: "Visionary leader with decades of experience in business growth and automation." },
    { name: "Gary Buenconsejo", role: "President/Founder", bio: "Operations expert focused on delivering exceptional client value and innovation." }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Global Marketing Group is a team of pioneers in marketing innovation. We combine executive-level support with cutting-edge AI to help businesses scale with precision.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every business deserves access to elite-level support and automation. Our mission is to democratize high-end marketing technology and executive services, making them accessible to growth-minded entrepreneurs worldwide.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Target, title: "Client-First", desc: "Your success is our primary metric." },
                  { icon: ShieldCheck, title: "Excellence", desc: "A culture of high standards in everything." },
                  { icon: Rocket, title: "Innovation", desc: "Always pushing the boundaries of what's possible." },
                  { icon: Heart, title: "Integrity", desc: "Transparent, honest, and reliable partnership." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <img 
                src="https://vibe.filesafe.space/1778597036474054298/assets/f5a3a1b7-e380-4c7d-8ea4-4c5bcf3ef818.jpg" 
                alt="Our Team" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Leadership Team</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader, i) => (
              <Card key={i} className="glass-card border-none overflow-hidden text-center p-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{leader.name}</h3>
                <p className="text-primary font-medium mb-4">{leader.role}</p>
                <p className="text-muted-foreground">{leader.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
