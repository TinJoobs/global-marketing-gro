import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import { useReveal } from "@/hooks/useReveal";
import { scrollToElement, scrollToTop, startSmoothScroll } from "@/lib/smoothScroll";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();
  const ref = useReveal<HTMLDivElement>();
  useEffect(() => startSmoothScroll(), []);
  useEffect(() => {
    const heading = document.querySelector("h1")?.textContent;
    document.title = `${heading || "Sales Systems. People. Growth."} | Global Marketing Group`;
    const description =
      pathname === "/missed-revenue-calculator"
        ? "Estimate the monthly opportunity lost when inquiries go unanswered. Use your own assumptions, follow the checklist, and build a better follow-up process."
        : "Global Marketing Group connects CRM automation and Philippines-based Virtual Assistant support. Explore Launch, Growth and Scale packages.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", window.location.origin + pathname);
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
