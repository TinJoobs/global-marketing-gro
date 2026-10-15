import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
  ShieldCheck,
} from "lucide-react";

const ExecutiveAssistant = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      experience: formData.get("experience") as string,
    };

    // Tracking Payload
    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "Executive Assistant Application",
      formData: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        "contact.relevant_experience": data.experience,
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email",
        phone: "Phone Number",
        "contact.relevant_experience": "Relevant Experience",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: "tk_43f08e8d16d64be996b6f6a5db488272",
      locationId: "6b9ZFpsH6Pv0R2iaasp8",
      sessionId: crypto.randomUUID(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
      },
    };

    fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        version: "2021-07-28",
      },
      body: JSON.stringify(trackingPayload),
    }).catch(() => {});

    alert("Application submitted successfully!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become an AI-Enhanced{" "}
              <span className="text-primary">Executive Assistant</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join our elite team of professional assistants. We provide the
              tools, training, and platform to help you deliver exceptional
              value to global clients.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                Why Join <span className="text-primary">GMG?</span>
              </h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "AI-Powered Tools",
                    desc: "Work more efficiently with our proprietary automation stack.",
                  },
                  {
                    icon: Mail,
                    title: "Global Clients",
                    desc: "Support industry leaders across Real Estate, Medical, and more.",
                  },
                  {
                    icon: Calendar,
                    title: "Professional Growth",
                    desc: "Continuous training and development in modern business systems.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Flexible Environment",
                    desc: "Modern, tech-forward work culture designed for success.",
                  },
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

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Apply Now</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    placeholder="Tell us about your background..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveAssistant;
