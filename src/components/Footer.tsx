import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { useModalCTA } from "./modal/useModalCTA";

const BRAND_LOGO = "/assets/images/gmg-headset-logo.webp";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Solutions",
    links: [
      ["Sales Growth System", "/sales-growth-system"],
      ["Virtual Assistant Services", "/virtual-assistant-services"],
      ["CRM & Automation", "/crm-automation"],
      ["Digital Solutions", "/digital-solutions"],
      ["Pricing & Support", "/pricing"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Appointment Setting", "/appointment-setting"],
      ["Lead Follow-Up", "/lead-follow-up"],
      ["AI & Human Support", "/ai-automation"],
      ["Integrations", "/integrations"],
      ["View All Services", "/services"],
    ],
  },
  {
    title: "Company & Resources",
    links: [
      ["About Us", "/about"],
      ["Industries", "/industries"],
      ["Portfolio", "/portfolio"],
      ["Guides & Resources", "/resources"],
      ["Help & FAQs", "/faq"],
      ["Missed Revenue Calculator", "/missed-revenue-calculator"],
      ["Careers", "/careers"],
      ["Contact Us", "/contact"],
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { contact } = useModalCTA();
  return (
    <footer className="site-footer">
      <div className="container-gmg">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand">
              <img src={BRAND_LOGO} alt="" width="56" height="56" />
              <span>
                Global
                <br />
                Marketing Group
              </span>
            </Link>
            <p className="footer-intro">
              Sales systems, smart automation, and dependable virtual support.
              Global Marketing Group connects your strategy, systems, and
              support team so you can focus on growing your business.
            </p>
            <p className="footer-contact">
              <a href="mailto:garyb@glomarkgroup.com">garyb@glomarkgroup.com</a>
              <a href="mailto:norly@glomarkgroup.com">norly@glomarkgroup.com</a>
            </p>
            <button type="button" onClick={contact()} className="footer-talk">
              Talk with our team <Icon name="arrow" size={16} />
            </button>
          </div>
          {columns.map((col) => (
            <nav className="footer-col" key={col.title} aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-base">
          <span>© {year} Global Marketing Group. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
