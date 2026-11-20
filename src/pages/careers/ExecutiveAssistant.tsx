import { Hero3DLayout } from "@/components/sections";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Calendar, ShieldCheck } from "lucide-react";
import { Honeypot } from "@/components/Honeypot";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/tracking";
import {
  isBot,
  isEmail,
  isPersonName,
  isPhone,
  looksLikeSpam,
  useRenderedAt,
} from "@/lib/formSecurity";

const ExecutiveAssistant = () => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "accepted" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const renderedAt = useRenderedAt();
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "pending") return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (isBot(formData, renderedAt)) {
      setStatus("accepted");
      form.reset();
      return;
    }
    const data = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      experience: String(formData.get("experience") ?? "").trim(),
    };
    const next: Record<string, string> = {};
    if (!isPersonName(data.firstName))
      next.firstName = "Enter your first name.";
    if (!isPersonName(data.lastName)) next.lastName = "Enter your last name.";
    if (!isEmail(data.email)) next.email = "Enter a valid email address.";
    if (!isPhone(data.phone)) next.phone = "Enter a valid phone number.";
    if (!data.experience)
      next.experience = "Tell us about your relevant experience.";
    else if (looksLikeSpam(data.experience))
      next.experience = "Your entry looks like spam. Please rephrase.";
    if (formData.get("consent") !== "on")
      next.consent = "Please agree to the Privacy Policy to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("pending");
    try {
      await postTrackingEvent(
        buildTrackingPayload(
          "ea-application",
          "Executive Assistant Application",
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            consent: formData.get("consent") === "on",
            phone: data.phone,
          },
          {
            first_name: "First Name",
            last_name: "Last Name",
            email: "Email",
            consent: "Privacy consent",
            phone: "Phone Number",
          },
        ),
        {
          customFields: {
            "3wgex2CP4Qcr8NXsjtAr": {
              value: data.experience,
              label: "Relevant experience",
            },
          },
        },
      );

      setStatus("accepted");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <Hero3DLayout variant="career-ea">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Become an AI-enhanced{" "}
                <span className="text-primary">executive assistant</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Join our elite team of professional assistants. We provide the
                tools, training, and platform to help you deliver exceptional
                value to global clients.
              </p>
            </div>
          </Hero3DLayout>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                Why join <span className="text-primary">GMG?</span>
              </h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "AI-powered tools",
                    desc: "Work more efficiently with our proprietary automation stack.",
                  },
                  {
                    icon: Mail,
                    title: "Global clients",
                    desc: "Support industry leaders across Real Estate, Medical, and more.",
                  },
                  {
                    icon: Calendar,
                    title: "Professional growth",
                    desc: "Continuous training and development in modern business systems.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Flexible environment",
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
              <h3 className="text-2xl font-bold mb-6">Apply now</h3>
              <form
                ref={formRef}
                className="space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <Honeypot />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstName}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName}
                      </p>
                    )}
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
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant experience</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    placeholder="Tell us about your background..."
                    className="min-h-[120px]"
                    required
                    aria-invalid={!!errors.experience}
                  />
                  {errors.experience && (
                    <p className="text-sm text-destructive">
                      {errors.experience}
                    </p>
                  )}
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 accent-primary"
                    aria-invalid={!!errors.consent}
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy" className="text-primary underline">
                      Privacy Policy
                    </a>{" "}
                    and the use of these details to process this application.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-sm text-destructive">{errors.consent}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? "Submitting…" : "Submit application"}
                </Button>
                {status === "accepted" && (
                  <p role="status" className="text-sm text-primary">
                    Your application has been received. Our team will review the
                    details.
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="text-sm text-destructive">
                    We could not receive your application. Your details are
                    still here; please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveAssistant;
