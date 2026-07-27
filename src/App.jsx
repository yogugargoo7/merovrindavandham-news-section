import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LeadChatBot from './components/ChatBot/LeadChatbot.jsx';
import QuickLeadModal from './components/QuickLeadModal/QuickLeadModal.jsx';
import FloatingContact from './components/FloatingContact/FloatingContact.jsx';
import SocialDock from './components/SocialDock/SocialDock.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PlotsPage from './pages/PlotsPage.jsx';
import AvailabilityPage from './pages/AvailabilityPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import './styles/effects.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showAutoLeadPopup, setShowAutoLeadPopup] = useState(false);
  const lastBackToTopState = useRef(false);
  const { pathname: routeKey } = useLocation();

  // Scroll progress + back-to-top
  useEffect(() => {
    let frameId = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      const shouldShow = scrollTop > 300;
      if (lastBackToTopState.current !== shouldShow) {
        lastBackToTopState.current = shouldShow;
        setShowBackToTop(shouldShow);
      }
      frameId = 0;
    };
    const onScroll = () => { if (frameId) return; frameId = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { if (frameId) window.cancelAnimationFrame(frameId); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

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
    <div className="min-h-screen app-shell">
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <ScrollToTop />
      <Header />

      <div className="route-transition" key={routeKey}>
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
      </div>

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

      <button
        className={`back-to-top gold-pulse${showBackToTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
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
