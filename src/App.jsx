import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import AnnouncementTicker from './components/AnnouncementTicker/AnnouncementTicker'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HeroSlider from './components/HeroSlider/HeroSlider'
import Products from './components/Products/Products'
import RateCalculator from './components/RateCalculator/RateCalculator'
import CollectionStats from './components/CollectionStats/CollectionStats'
import Gallery from './components/Gallery/Gallery'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import AdminPanel from './components/AdminPanel/AdminPanel'
import { useLanguage } from './context/LanguageContext'
import { translations } from './translations/translations'

function App() {
  const { language } = useLanguage();
  const t = translations[language].features;

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const clickTimer = useRef(null);
  const [, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setIsAdminPanelOpen(true);
        return 0;
      }
      return newCount;
    });
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <div className="app-wrapper">
      {isAdminPanelOpen && <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />}
      <AnnouncementTicker />
      <Navbar onLogoClick={handleLogoClick} />

      {/* Offset spacer so fixed Ticker (42px) + Navbar (75px) = 117px doesn't cover content */}
      <div className="navbar-offset">

        <div id="home">
          <HeroSlider />
        </div>

        <div className="section-divider"></div>
        <Products />

        <div className="section-divider"></div>
        <RateCalculator />

        {/* 
      <div className="section-divider"></div>
      <section className="features-section">
        <div className="section-title">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-image">
              <img src="/dairy-quality.png" alt="Pure Milk" loading="lazy" />
            </div>
            <h3>{t.pureQuality.title}</h3>
            <p>{t.pureQuality.desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-image">
              <img src="/safe-collection.png" alt="Safe Collection" loading="lazy" />
            </div>
            <h3>{t.safeCollection.title}</h3>
            <p>{t.safeCollection.desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-image">
              <img src="/dairy-hero.png" alt="Digital Records" loading="lazy" />
            </div>
            <h3>{t.digitalRecords.title}</h3>
            <p>{t.digitalRecords.desc}</p>
          </div>
        </div>
      </section>
      */}
        <CollectionStats />

        <div className="section-divider"></div>
        <Gallery />

        <Footer />

      </div> {/* end navbar-offset */}

      <WhatsAppButton />

      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App
