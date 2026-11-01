import Affiliate from "./pages/resources/Affiliate";
import Media from "./pages/resources/Media";
import AccountRep from "./pages/careers/AccountRep";
import ExecutiveAssistant from "./pages/careers/ExecutiveAssistant";
import Referral from "./pages/careers/Referral";
import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ModalProvider } from "./components/modal/ModalProvider";
import Home from "./pages/Home";
import MissedRevenueCalculator from "./pages/MissedRevenueCalculator";
import GuidePage from "./pages/GuidePage";
import LegacyRedirect from "./pages/LegacyRedirect";
import ThankYou from "./pages/ThankYou";
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

const App = () => (
  <ModalProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route
          path="/missed-revenue-calculator"
          element={<MissedRevenueCalculator />}
        />
        <Route
          path="/guide-va-delegation"
          element={<GuidePage slug="guide-va-delegation" />}
        />
        <Route
          path="/guide-lead-follow-up"
          element={<GuidePage slug="guide-lead-follow-up" />}
        />
        <Route
          path="/guide-crm-readiness"
          element={<GuidePage slug="guide-crm-readiness" />}
        />
        <Route path="/book-a-call" element={<Contact />} />
        <Route path="/sales-growth-system" element={<SalesGrowthSystem />} />
        <Route
          path="/virtual-assistant-services"
          element={<VirtualAssistant />}
        />
        <Route path="/services" element={<Services />} />
        <Route
          path="/solutions"
          element={<Navigate to="/services" replace />}
        />
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
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/affiliate" element={<Affiliate />} />
        <Route path="/resources/media" element={<Media />} />
        <Route path="/careers/account-rep" element={<AccountRep />} />
        <Route
          path="/careers/executive-assistant"
          element={<ExecutiveAssistant />}
        />
        <Route path="/careers/referral" element={<Referral />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route
          path="/privacy-policy"
          element={<Navigate to="/privacy" replace />}
        />
        <Route path="/terms" element={<TermsOfService />} />
        <Route
          path="/terms-and-conditions"
          element={<Navigate to="/terms" replace />}
        />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route
          path="/refund-policy"
          element={<Navigate to="/refund" replace />}
        />
        <Route path="/:legacy.html" element={<LegacyRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </ModalProvider>
);

export default App;
