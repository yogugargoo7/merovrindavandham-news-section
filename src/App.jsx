import { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LeadChatBot from './components/ChatBot/LeadChatbot.jsx';
import QuickLeadModal from './components/QuickLeadModal/QuickLeadModal.jsx';
import FloatingContact from './components/FloatingContact/FloatingContact.jsx';
import SocialDock from './components/SocialDock/SocialDock.jsx';

import SmoothScroll from './components/fx/SmoothScroll.jsx';
import MotionManager from './components/fx/MotionManager.jsx';
import PageTransition from './components/fx/PageTransition.jsx';
import Preloader from './components/fx/Preloader.jsx';
import ScrollUI from './components/fx/ScrollUI.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PlotsPage from './pages/PlotsPage.jsx';
import AvailabilityPage from './pages/AvailabilityPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import { scrollToTop } from './utils/scrollLock';
import './styles/effects.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  // layout effect: jump before the new page paints (it is under the curtain)
  useLayoutEffect(() => {
    scrollToTop({ immediate: true });
  }, [pathname]);
  return null;
}

function AppContent() {
  const [showAutoLeadPopup, setShowAutoLeadPopup] = useState(false);
  const { pathname: routeKey } = useLocation();

  // Auto lead popup — once per session, well after the page has loaded
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return undefined;
    if (sessionStorage.getItem('mvd_auto_popup_shown')) return undefined;

    let timerId;
    const open = () => {
      if (document.querySelector('.qlm-backdrop')) { timerId = window.setTimeout(open, 5000); return; }
      sessionStorage.setItem('mvd_auto_popup_shown', '1');
      setShowAutoLeadPopup(true);
    };
    timerId = window.setTimeout(open, 20000);
    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <div className="app-shell">
      <SmoothScroll />
      <MotionManager />
      <Preloader />
      <PageTransition />
      <ScrollUI />

      <ScrollToTop />
      <Header />

      <main className="route-transition" key={routeKey}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/plots" element={<PlotsPage />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <SocialDock />
      <FloatingContact />
      <LeadChatBot />
      <QuickLeadModal
        isOpen={showAutoLeadPopup}
        onClose={() => setShowAutoLeadPopup(false)}
        onSuccess={() => setShowAutoLeadPopup(false)}
        reservePopup={false}
        source="Auto Lead Popup"
        actionLabel="Submit Details"
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
