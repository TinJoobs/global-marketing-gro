import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/tracking";

const AccountRep = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      linkedin: formData.get("linkedin") as string,
      location: formData.get("location") as string,
    };

    postTrackingEvent(
      buildTrackingPayload(
        "account-rep-application",
        "Account Representative Application",
        {
          first_name: data.name,
          email: data.email,
          city: data.location,
        },
        {
          first_name: "Full Name",
          email: "Email Address",
          city: "Location",
        },
      ),
      {
        customFields: {
          "0v9TM8bBpbR4Dl24FCUW": {
            value: data.linkedin,
            label: "LinkedIn Profile",
          },
        },
      },
    );

    alert("Application sent successfully!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Account <span className="text-primary">Representative</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Help businesses navigate the future of marketing. Join our sales
              team and represent a platform that truly delivers results.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">The Opportunity</h2>
              <p className="text-lg text-muted-foreground">
                As a GMG Account Representative, you'll be at the forefront of
                the AI business revolution, helping companies automate their
                growth and scale effectively.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    title: "High Commission",
                    desc: "Competitive earning structure with recurring potential.",
                  },
                  {
                    icon: Target,
                    title: "Proven Product",
                    desc: "Sell a solution that businesses actually need and love.",
                  },
                  {
                    icon: Users,
                    title: "Supportive Team",
                    desc: "Access to elite sales training and marketing assets.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Exclusive Territory",
                    desc: "Manage and grow your own dedicated market segment.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Start Your Journey
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, Country"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send Application
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountRep;
