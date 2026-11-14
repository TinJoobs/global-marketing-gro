import { Hero3DLayout } from "@/components/sections";
import { Link } from "react-router-dom";
export default function ThankYou() {
  return (
    <section className="section-gmg">
      <div className="container-gmg">
        <Hero3DLayout variant="thanks">
          <span className="eyebrow">Global Marketing Group</span>
          <h1 className="text-4xl md:text-5xl">Thank You for Connecting.</h1>
          <p className="lead-gmg mt-6">
            For successfully submitted inquiries, the next step is a review of
            your business goals and support needs. A consultation request does
            not confirm an appointment.
          </p>
          <p className="text-muted-foreground mt-5">
            This page does not verify a submission or reserve a time. Contact
            our team if you still need to send your request.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link className="btn-primary-gmg" to="/contact">
              Contact our team
            </Link>
            <Link className="btn-outline-gmg" to="/">
              Back to Home
            </Link>
          </div>
        </Hero3DLayout>
      </div>
    </section>
  );
}
