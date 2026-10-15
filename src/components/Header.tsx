import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Software',
      submenu: [
        { name: 'Sales Funnels', path: '/software/sales-funnels' },
        { name: 'Email Marketing', path: '/software/email-marketing' },
        { name: 'Workflows', path: '/software/workflows' },
        { name: 'AI', path: '/software/ai' },
        { name: 'Websites', path: '/software/websites' },
        { name: 'Landing Pages', path: '/software/landing-pages' },
        { name: 'A/B Testing', path: '/software/ab-testing' },
        { name: 'Analytics', path: '/software/analytics' },
        { name: 'Membership Sites', path: '/software/membership-sites' },
        { name: 'Community', path: '/software/community' },
        { name: 'Online Courses', path: '/software/online-courses' },
        { name: 'Integrations', path: '/software/integrations' },
      ]
    },
    { name: 'Pricing', path: '/pricing' },
    {
      name: 'Resources',
      submenu: [
        { name: 'Portfolio', path: '/resources/portfolio' },
        { name: 'Affiliate Program', path: '/resources/affiliate' },
        { name: 'Services', path: '/resources/services' },
        { name: 'Media', path: '/resources/media' },
      ]
    },
    {
      name: 'Careers',
      submenu: [
        { name: 'Executive Assistant', path: '/careers/executive-assistant' },
        { name: 'Referral', path: '/careers/referral' },
        { name: 'Account Representative', path: '/careers/account-rep' },
      ]
    },
    { name: 'Why GMG', path: '/why-gmg' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-background/80 backdrop-blur-md border-border py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="https://vibe.filesafe.space/1778597036474054298/assets/6414ec5f-fac5-45f9-9b6d-f019c383bf11.png" alt="GMG Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
          <div className="flex flex-col leading-[0.8] font-bold text-lg tracking-tighter">
            <span>GLOBAL</span>
            <span>MARKETING</span>
            <span>GROUP</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            item.submenu ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none">
                  {item.name} <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {item.submenu.map((sub) => (
                    <DropdownMenuItem key={sub.path} asChild>
                      <Link to={sub.path} className="w-full cursor-pointer">{sub.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  location.pathname === item.path ? "text-primary" : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            )
          ))}
          <Button asChild size="sm" className="ml-4">
            <Link to="/contact">Schedule A Demo</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[73px] bg-background z-40 transition-transform duration-300 p-6 flex flex-col gap-4 overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {navItems.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            {item.submenu ? (
              <>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{item.name}</span>
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary pl-4"
                  >
                    {sub.name}
                  </Link>
                ))}
              </>
            ) : (
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-primary"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
        <Button asChild className="mt-4 w-full">
          <Link to="/contact" onClick={() => setIsOpen(false)}>Schedule A Demo</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
