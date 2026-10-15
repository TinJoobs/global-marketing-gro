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
import { postTrackingEvent, buildTrackingPayload } from "@/lib/tracking";

const Contact = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    postTrackingEvent(
      buildTrackingPayload(
        "contact-form",
        "Contact Form",
        {
          first_name: data.name,
          email: data.email,
          calendar_notes: data.message,
        },
        {
          first_name: "Full Name",
          email: "Email Address",
          calendar_notes: "Message",
        },
      ),
      {
        customFields: {
          "09aZnxiqoakrzk5yfNLB": { value: data.subject, label: "Subject" },
        },
      },
    );

    alert("Thank you for your message! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team for
            support or to schedule a demo of our platform.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="glass-card p-10 rounded-2xl">
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6">Contact Details</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-muted-foreground">
                        +317 395 6740 (Gary)
                      </p>
                      <p className="text-muted-foreground">
                        +614 973 6161 (Norly)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Email</p>
                      <p className="text-muted-foreground">
                        garyb@glomarkgroup.com
                      </p>
                      <p className="text-muted-foreground">
                        norly@glomarkgroup.com
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Location</p>
                      <p className="text-muted-foreground">
                        Global Marketing Group, International
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl bg-primary text-white">
                <Calendar className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Schedule a Demo</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Want a personalized walkthrough of our CRM and EA services?
                </p>
                <Button variant="secondary" className="w-full">
                  Book Your Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
