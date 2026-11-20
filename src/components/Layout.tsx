import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import { useReveal } from "@/hooks/useReveal";
import {
  scrollToElement,
  scrollToTop,
  startSmoothScroll,
} from "@/lib/smoothScroll";
import { getSeoMeta } from "@/lib/seo";
import { SEOHead } from "./SEOHead";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Marketing Group",
  url: "https://glomarkgroup.com/",
  logo: "https://glomarkgroup.com/assets/images/gmg-headset-logo.webp",
  sameAs: ["https://glomarkgroup.com/"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();
  const ref = useReveal<HTMLDivElement>();
  useEffect(() => startSmoothScroll(), []);

  const seo = getSeoMeta(pathname);
  const canonical = `https://glomarkgroup.com${pathname === "/" ? "/" : pathname}`;
  // Thank-you / confirmation pages should not be indexed.
  const noIndex = pathname === "/thank-you";

  useEffect(() => {
    if (!hash) {
      scrollToTop();
      ref.current?.focus({ preventScroll: true });
    }
  }, [pathname, ref, hash]);
  useEffect(() => {
    if (!hash) return;
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) scrollToElement(target);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return (
    <MotionConfig reducedMotion="user">
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonical={canonical}
        noIndex={noIndex}
        schemaJson={ORG_SCHEMA}
      />
      <div id="gmg-site" className="flex flex-col min-h-screen">
        <a className="skip-to-content" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow" ref={ref}>
          {children}
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </MotionConfig>
  );
}
