import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import SalesGrowthSystem from "./pages/SalesGrowthSystem";
import VirtualAssistant from "./pages/VirtualAssistant";
import Services from "./pages/Services";
import CrmAutomation from "./pages/CrmAutomation";
import AiAutomation from "./pages/AiAutomation";
import DigitalSolutions from "./pages/DigitalSolutions";
import AppointmentSetting from "./pages/AppointmentSetting";
import LeadFollowUp from "./pages/LeadFollowUp";
import Integrations from "./pages/Integrations";
import Industries from "./pages/Industries";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Faq from "./pages/Faq";
import Careers from "./pages/Careers";
import Resources from "./pages/Resources";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales-growth-system" element={<SalesGrowthSystem />} />
          <Route path="/virtual-assistant-services" element={<VirtualAssistant />} />
          <Route path="/services" element={<Services />} />
          <Route path="/crm-automation" element={<CrmAutomation />} />
          <Route path="/ai-automation" element={<AiAutomation />} />
          <Route path="/digital-solutions" element={<DigitalSolutions />} />
          <Route path="/appointment-setting" element={<AppointmentSetting />} />
          <Route path="/lead-follow-up" element={<LeadFollowUp />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
