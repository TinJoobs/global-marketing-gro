import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Software Pages
import SalesFunnels from "./pages/software/SalesFunnels";
import EmailMarketing from "./pages/software/EmailMarketing";
import Workflows from "./pages/software/Workflows";
import AIPage from "./pages/software/AI";
import Websites from "./pages/software/Websites";
import LandingPages from "./pages/software/LandingPages";
import ABTesting from "./pages/software/ABTesting";
import Analytics from "./pages/software/Analytics";
import MembershipSites from "./pages/software/MembershipSites";
import Community from "./pages/software/Community";
import OnlineCourses from "./pages/software/OnlineCourses";
import Integrations from "./pages/software/Integrations";

// Other Pages
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WhyGMG from "./pages/WhyGMG";
import Portfolio from "./pages/resources/Portfolio";
import Affiliate from "./pages/resources/Affiliate";
import Services from "./pages/resources/Services";
import Media from "./pages/resources/Media";
import ExecutiveAssistant from "./pages/careers/ExecutiveAssistant";
import Referral from "./pages/careers/Referral";
import AccountRep from "./pages/careers/AccountRep";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Software Routes */}
            <Route path="/software/sales-funnels" element={<SalesFunnels />} />
            <Route path="/software/email-marketing" element={<EmailMarketing />} />
            <Route path="/software/workflows" element={<Workflows />} />
            <Route path="/software/ai" element={<AIPage />} />
            <Route path="/software/websites" element={<Websites />} />
            <Route path="/software/landing-pages" element={<LandingPages />} />
            <Route path="/software/ab-testing" element={<ABTesting />} />
            <Route path="/software/analytics" element={<Analytics />} />
            <Route path="/software/membership-sites" element={<MembershipSites />} />
            <Route path="/software/community" element={<Community />} />
            <Route path="/software/online-courses" element={<OnlineCourses />} />
            <Route path="/software/integrations" element={<Integrations />} />

            {/* Other Routes */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/why-gmg" element={<WhyGMG />} />
            
            {/* Resources Routes */}
            <Route path="/resources/portfolio" element={<Portfolio />} />
            <Route path="/resources/affiliate" element={<Affiliate />} />
            <Route path="/resources/services" element={<Services />} />
            <Route path="/resources/media" element={<Media />} />

            {/* Careers Routes */}
            <Route path="/careers/executive-assistant" element={<ExecutiveAssistant />} />
            <Route path="/careers/referral" element={<Referral />} />
            <Route path="/careers/account-rep" element={<AccountRep />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
