import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { PageHero, CTASection } from "@/components/sections";

const sections = [
  {
    heading: "1. Refund Eligibility",
    body: "Refunds are considered for monthly subscription services cancelled within the first 14 days of the billing cycle, provided no significant work has been delivered. One-time setup, implementation, and done-for-you services are non-refundable once work has commenced.",
  },
  {
    heading: "2. Cancellation",
    body: "You may cancel your subscription at any time. Cancellation stops future billing but does not entitle you to a refund of fees already paid for the current billing period unless eligible under Section 1.",
  },
  {
    heading: "3. Virtual Assistant Services",
    body: "Virtual Assistant services are billed based on hours delivered. Hours already worked and delivered are non-refundable. Unused prepaid hours may be eligible for refund at our discretion.",
  },
  {
    heading: "4. Requesting a Refund",
    body: "To request a refund, contact us at garyb@glomarkgroup.com with your account details and the reason for your request. Approved refunds are processed within 10 business days to the original payment method.",
  },
  {
    heading: "5. Non-Refundable Items",
    body: "Third-party costs, advertising spend, domain registrations, and custom development work already delivered are not eligible for refunds.",
  },
  {
    heading: "6. Changes to This Policy",
    body: "Global Marketing Group reserves the right to update this Refund Policy at any time. Changes take effect upon posting to this page.",
  },
];

export default function RefundPolicy() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title={<>Refund Policy</>}
        lead="Our policy for refunds, cancellations, and service eligibility at Global Marketing Group."
        simple
      />
      <section className="section-gmg">
        <div className="container-gmg max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-bold mb-2">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
          <div className="card-gmg mt-10">
            <h3 className="text-lg font-bold mb-2">
              Questions about a refund?
            </h3>
            <p className="text-muted-foreground mb-4">
              Reach out and our team will help you with your request.
            </p>
            <Link to="/contact" className="btn-primary-gmg">
              Contact Us <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CTASection
        title="Still Have Questions?"
        body="Our team is happy to walk you through our refund and cancellation process."
        primaryLabel="Contact Us"
      />
    </div>
  );
}
