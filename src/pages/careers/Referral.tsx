import { Hero3DLayout } from "@/components/sections";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Share2 } from "lucide-react";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/tracking";

const Referral = () => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "accepted" | "error"
  >("idle");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (status === "pending" || !form.reportValidity()) return;
    const formData = new FormData(form);
    const data = {
      yourName: formData.get("yourName") as string,
      yourEmail: formData.get("yourEmail") as string,
      refName: formData.get("refName") as string,
      refContact: formData.get("refContact") as string,
    };

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
                Referral <span className="text-primary">Program</span>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-primary border-b border-primary/20 pb-2">
                    Your information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="yourName">Your Name</Label>
                    <Input
                      id="yourName"
                      name="yourName"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yourEmail">Your Email</Label>
                    <Input
                      id="yourEmail"
                      name="yourEmail"
                      type="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-primary border-b border-primary/20 pb-2">
                    Referral information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="refName">Business Name</Label>
                    <Input
                      id="refName"
                      name="refName"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refContact">Contact Person</Label>
                    <Input
                      id="refContact"
                      name="refContact"
                      placeholder="Contact Name"
                      required
                    />
                  </div>
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 accent-primary"
                />
                <span>
                  I agree to the{" "}
                  <a href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </a>{" "}
                  and the use of these details to process this referral.
                </span>
              </label>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={status === "pending"}
              >
                {status === "pending" ? "Submitting…" : "Submit Referral"}
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
