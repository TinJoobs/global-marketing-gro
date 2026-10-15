import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <img src="https://vibe.filesafe.space/1778597036474054298/assets/6414ec5f-fac5-45f9-9b6d-f019c383bf11.png" alt="GMG Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col leading-[0.8] font-bold text-xl tracking-tighter">
                <span>GLOBAL</span>
                <span>MARKETING</span>
                <span>GROUP</span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              AI-enhanced executive assistant services and all-in-one CRM automation platform for business growth. Delegate smarter, not harder.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-colors border border-border">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-colors border border-border">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-colors border border-border">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-colors border border-border">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">GMG Features</h4>
            <ul className="space-y-3">
              <li><Link to="/software/sales-funnels" className="text-muted-foreground hover:text-primary transition-colors">Sales Funnels</Link></li>
              <li><Link to="/software/ai" className="text-muted-foreground hover:text-primary transition-colors">AI & Automation</Link></li>
              <li><Link to="/software/email-marketing" className="text-muted-foreground hover:text-primary transition-colors">Email Marketing</Link></li>
              <li><Link to="/software/websites" className="text-muted-foreground hover:text-primary transition-colors">Websites</Link></li>
              <li><Link to="/software/analytics" className="text-muted-foreground hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link to="/software/online-courses" className="text-muted-foreground hover:text-primary transition-colors">Online Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/resources/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/careers/executive-assistant" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/resources/affiliate" className="text-muted-foreground hover:text-primary transition-colors">Affiliate Program</Link></li>
              <li><Link to="/why-gmg" className="text-muted-foreground hover:text-primary transition-colors">Why Choose GMG</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Gary Buenconsejo</p>
                  <p className="text-xs text-muted-foreground">President/Co-Founder</p>
                  <p className="text-sm font-medium">+317 395 6740</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Norly M. Lomeda</p>
                  <p className="text-xs text-muted-foreground text-nowrap">Operations/Talent Acquisition Manager</p>
                  <p className="text-sm font-medium">+614 973 6161</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Global Marketing Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
