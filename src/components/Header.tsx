import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Solutions", to: "/solutions" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="brand"
          to="/"
          aria-label="Global Marketing Group home"
          onClick={() => setOpen(false)}
        >
          <span className="wordmark">GLOBAL MARKETING GROUP</span>
          <span className="brand-tagline">SYSTEMS. PEOPLE. GROWTH.</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav
          className={`nav-panel${open ? " is-open" : ""}`}
          id="main-nav"
          aria-label="Main navigation"
        >
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            className="btn btn-dark"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
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
        </nav>
      </div>
    </header>
  );
}
