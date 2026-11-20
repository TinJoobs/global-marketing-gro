import { Hero3DLayout } from "@/components/sections";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Share2 } from "lucide-react";
import { Honeypot } from "@/components/Honeypot";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/tracking";
import {
  isBot,
  isEmail,
  isPersonName,
  useRenderedAt,
} from "@/lib/formSecurity";

const Referral = () => {
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
      yourName: String(formData.get("yourName") ?? "").trim(),
      yourEmail: String(formData.get("yourEmail") ?? "").trim(),
      refName: String(formData.get("refName") ?? "").trim(),
      refContact: String(formData.get("refContact") ?? "").trim(),
    };
    const next: Record<string, string> = {};
    if (!isPersonName(data.yourName)) next.yourName = "Enter your name.";
    if (!isEmail(data.yourEmail))
      next.yourEmail = "Enter a valid email address.";
    if (!data.refName) next.refName = "Enter the business name.";
    if (!isPersonName(data.refContact))
      next.refContact = "Enter a contact name.";
    if (formData.get("consent") !== "on")
      next.consent = "Please agree to the Privacy Policy to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("pending");
    try {
      await postTrackingEvent(
        buildTrackingPayload(
          "referral-form",
          "Referral Form",
          {
            organization: data.refName,
            consent: formData.get("consent") === "on",
          },
          {
            organization: "Business Name",
            consent: "Privacy consent",
          },
        ),
        {
          customFields: {
            R30rdrrITokjVI26Bz1J: {
              value: data.refContact,
              label: "Contact person",
            },
            CcvTRPOprQ69M8yF5Oax: {
              value: data.yourName,
              label: "Referrer name",
            },
            xCypGtK2FMI2MiqYwqQq: {
              value: data.yourEmail,
              label: "Referrer email",
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
          <Hero3DLayout variant="referral">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Referral <span className="text-primary">program</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Know a business that needs to scale? Refer them to Global
                Marketing Group and earn rewards for every successful
                connection.
              </p>
            </div>
          </Hero3DLayout>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 rounded-2xl text-center">
              <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Earn rewards</h3>
              <p className="text-muted-foreground">
                Receive generous bonuses for every client that joins our
                platform through your referral.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <Share2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy sharing</h3>
              <p className="text-muted-foreground">
                Simply fill out the form below and our team will handle the rest
                of the outreach.
              </p>
            </div>
          </div>

          <div className="glass-card p-10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Submit a referral
            </h2>
            <form
              ref={formRef}
              className="space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <Honeypot />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-primary border-b border-primary/20 pb-2">
                    Your information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="yourName">Your name</Label>
                    <Input
                      id="yourName"
                      name="yourName"
                      placeholder="Full Name"
                      required
                      autoComplete="name"
                      aria-invalid={!!errors.yourName}
                    />
                    {errors.yourName && (
                      <p className="text-sm text-destructive">
                        {errors.yourName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yourEmail">Your email</Label>
                    <Input
                      id="yourEmail"
                      name="yourEmail"
                      type="email"
                      placeholder="email@example.com"
                      required
                      autoComplete="email"
                      aria-invalid={!!errors.yourEmail}
                    />
                    {errors.yourEmail && (
                      <p className="text-sm text-destructive">
                        {errors.yourEmail}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-primary border-b border-primary/20 pb-2">
                    Referral information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="refName">Business name</Label>
                    <Input
                      id="refName"
                      name="refName"
                      placeholder="Company Name"
                      required
                      aria-invalid={!!errors.refName}
                    />
                    {errors.refName && (
                      <p className="text-sm text-destructive">
                        {errors.refName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refContact">Contact person</Label>
                    <Input
                      id="refContact"
                      name="refContact"
                      placeholder="Contact Name"
                      required
                      aria-invalid={!!errors.refContact}
                    />
                    {errors.refContact && (
                      <p className="text-sm text-destructive">
                        {errors.refContact}
                      </p>
                    )}
                  </div>
                </div>
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
                  and the use of these details to process this referral.
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
                {status === "pending" ? "Submitting…" : "Submit referral"}
              </Button>
              {status === "accepted" && (
                <p role="status" className="text-sm text-primary">
                  Your referral has been received. Our team will review the
                  details.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-destructive">
                  We could not receive your referral. Your details are still
                  here; please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Referral;
