import { Hero3DLayout } from "@/components/sections";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="container-gmg py-20">
      <section className="legal-page-hero"><Hero3DLayout variant="privacy"><span className="eyebrow">Legal</span><h1 className="text-4xl font-bold mb-8">Privacy Policy</h1><p className="lead-gmg mt-6">How we handle the information you share with Global Marketing Group.</p></Hero3DLayout></section>
      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          At Global Marketing Group, we take your privacy seriously. This policy
          outlines how we collect, use, and protect your data.
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          1. Information collection
        </h2>
        <p>
          We collect information you provide directly to us, such as when you
          create an account, subscribe to our newsletter, or contact us for
          support.
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          2. Use of information
        </h2>
        <p>
          We use the information we collect to provide, maintain, and improve
          our services, and to communicate with you about your account and our
          products.
        </p>
        <h2 className="text-2xl font-bold text-foreground">3. Data security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information when you enter, submit, or access your
          personal information.
        </p>
      </div>
      <Button className="mt-12" asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
};

export default PrivacyPolicy;
