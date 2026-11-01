import { Hero3DLayout } from "@/components/hero3d/Hero3DScene";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="container-gmg py-20">
      <section className="legal-page-hero"><Hero3DLayout variant="terms"><span className="eyebrow">Legal</span><h1 className="text-4xl font-bold mb-8">Terms of Service</h1><p className="lead-gmg mt-6">Understand the terms of using Global Marketing Group services.</p></Hero3DLayout></section>
      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          Welcome to Global Marketing Group. By using our services, you agree to
          the following terms.
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using our website and services, you agree to be bound
          by these Terms of Service and all applicable laws and regulations.
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          2. Use of Services
        </h2>
        <p>
          You agree to use our services only for lawful purposes and in
          accordance with these Terms. You are responsible for maintaining the
          confidentiality of your account.
        </p>
        <h2 className="text-2xl font-bold text-foreground">
          3. Limitation of Liability
        </h2>
        <p>
          Global Marketing Group shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages resulting from
          your use of our services.
        </p>
      </div>
      <Button className="mt-12" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default TermsOfService;
