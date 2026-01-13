import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HeroSlider from './components/HeroSlider/HeroSlider'
import Products from './components/Products/Products'
import CollectionStats from './components/CollectionStats/CollectionStats'
import Gallery from './components/Gallery/Gallery'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import { useLanguage } from './context/LanguageContext'
import { translations } from './translations/translations'

function App() {
  const { language } = useLanguage();
  const t = translations[language].features;

  return (
    <div id="home" className="app-wrapper">
      <Navbar />

      <HeroSlider />

      <Products />

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

      <CollectionStats />

      <Gallery />

      <Footer />

      <WhatsAppButton />
    </div>
  )
}

export default App
