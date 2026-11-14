import { Hero3DLayout } from "@/components/sections";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="section-gmg">
      <div className="container-gmg text-center">
          <Hero3DLayout variant="navigation">
        <span className="eyebrow">Page not found</span>
        <h1 className="text-5xl">404</h1>
        <p className="lead-gmg mt-6">
          We couldn't find that page. Choose a service or return to Home.
        </p>
        <Link className="btn-primary-gmg mt-8" to="/">
          Return to home
        </Link>
      </Hero3DLayout>
      </div>
    </section>
  );
}
