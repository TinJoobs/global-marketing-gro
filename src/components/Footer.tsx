import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

const BRAND_LOGO = "/assets/images/gmg-headset-logo.webp";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white pt-16 pb-8 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-0 w-[420px] h-[420px] rounded-full bg-teal/10 blur-[100px] pointer-events-none"
      />
      <div className="container-gmg relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src={BRAND_LOGO}
                alt="Global Marketing Group"
                className="w-16 h-16 object-contain"
              />
              <span className="flex flex-col leading-[0.85] font-bold text-sm tracking-tight">
                <span className="text-[0.95rem]">GLOBAL</span>
                <span>MARKETING</span>
                <span>GROUP</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Sales Systems. Smart Automation.
              <br />
              Dependable Virtual Support.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              Global Marketing Group connects your strategy, systems, and
              support team so you can focus on growing your business.
            </p>
            <p className="mt-4 text-sm"><a href="mailto:garyb@glomarkgroup.com">garyb@glomarkgroup.com</a><br/><a href="mailto:norly@glomarkgroup.com">norly@glomarkgroup.com</a></p><Link to="/contact" className="text-link text-[#72d8c7] mt-4">
              Talk with our team <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div>
            <span className="block font-bold text-white mb-5">Solutions</span>
            <div className="flex flex-col gap-2.5">
              {[
                ["Sales Growth System", "/sales-growth-system"],
                ["Virtual Assistant Services", "/virtual-assistant-services"],
                ["CRM & Automation", "/crm-automation"],
                ["Digital Solutions", "/digital-solutions"],
                ["Pricing & Support", "/pricing"],
              ].map(([l, p]) => (
                <Link
                  key={p}
                  to={p}
                  className="text-white/70 hover:text-[#72d8c7] text-sm"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="block font-bold text-white mb-5">Services</span>
            <div className="flex flex-col gap-2.5">
              {[
                ["Appointment Setting", "/appointment-setting"],
                ["Lead Follow-Up", "/lead-follow-up"],
                ["AI & Human Support", "/ai-automation"],
                ["Integrations", "/integrations"],
                ["View All Services", "/services"],
              ].map(([l, p]) => (
                <Link
                  key={p}
                  to={p}
                  className="text-white/70 hover:text-[#72d8c7] text-sm"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="block font-bold text-white mb-5">
              Company & Resources
            </span>
            <div className="flex flex-col gap-2.5">
              {[
                ["About Us", "/about"],
                ["Industries", "/industries"],
                ["Portfolio", "/portfolio"],
                ["Guides & Resources", "/resources"],
                ["Help & FAQs", "/faq"],
                ["Missed Revenue Calculator", "/missed-revenue-calculator"],
                ["Careers", "/careers"],
                ["Contact Us", "/contact"],
              ].map(([l, p]) => (
                <Link
                  key={p}
                  to={p}
                  className="text-white/70 hover:text-[#72d8c7] text-sm"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <span>© {year} Global Marketing Group. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/refund" className="hover:text-white">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
