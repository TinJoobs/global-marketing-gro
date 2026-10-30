import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link
              className="brand"
              to="/"
              aria-label="Global Marketing Group home"
            >
              <span className="wordmark">GLOBAL MARKETING GROUP</span>
              <span className="brand-tagline">SYSTEMS. PEOPLE. GROWTH.</span>
            </Link>
            <p>Sales Systems. Smart Automation. Dependable Virtual Support.</p>
            <p>
              Global Marketing Group connects your strategy, systems, and
              support team so you can focus on growing your business.
            </p>
            <div className="footer-contact">
              <Link to="/contact">
                Talk with our team{" "}
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <span className="footer-heading">Solutions</span>
            <div className="footer-links">
              <Link to="/solutions">Sales Growth System</Link>
              <Link to="/solutions">Virtual Assistant Services</Link>
              <Link to="/solutions">CRM &amp; Automation</Link>
              <Link to="/solutions">Digital Solutions</Link>
              <Link to="/pricing">Pricing &amp; Support</Link>
            </div>
          </div>
          <div>
            <span className="footer-heading">Services</span>
            <div className="footer-links">
              <Link to="/solutions">Appointment Setting</Link>
              <Link to="/solutions">Lead Follow-Up</Link>
              <Link to="/solutions">AI &amp; Human Support</Link>
              <Link to="/solutions">Integrations</Link>
              <Link to="/solutions">View All Services</Link>
            </div>
          </div>
          <div>
            <span className="footer-heading">Company &amp; Resources</span>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/solutions">Industries</Link>
              <Link to="/resources">Portfolio</Link>
              <Link to="/resources">Guides &amp; Resources</Link>
              <Link to="/resources">Help &amp; FAQs</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Global Marketing Group. All rights reserved.</span>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
