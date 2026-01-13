import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HeroSlider from './components/HeroSlider/HeroSlider'
import Products from './components/Products/Products'
import CollectionStats from './components/CollectionStats/CollectionStats'
import Gallery from './components/Gallery/Gallery'
import { useLanguage } from './context/LanguageContext'
import { translations } from './translations/translations'

function App() {
  const [count, setCount] = useState(0)
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
              <img src="/dairy-quality.png" alt="Pure Milk" />
            </div>
            <h3>{t.pureQuality.title}</h3>
            <p>{t.pureQuality.desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-image">
              <img src="/safe-collection.png" alt="Safe Collection" />
            </div>
            <h3>{t.safeCollection.title}</h3>
            <p>{t.safeCollection.desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Digital Records" />
            </div>
            <h3>{t.digitalRecords.title}</h3>
            <p>{t.digitalRecords.desc}</p>
          </div>
        </div>
      </section>

      <CollectionStats />

      <Gallery />

      <Footer />
    </div>
  )
}

export default App

