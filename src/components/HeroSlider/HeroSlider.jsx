import React, { useState, useEffect } from 'react';
import './HeroSlider.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const { language } = useLanguage();
    const t = translations[language].hero;

    const slides = [
        {
            image: '/milk.png',
            title: t.slides[0].title,
            description: t.slides[0].desc,
        },
        {
            image: '/cow.png',
            title: t.slides[1].title,
            description: t.slides[1].desc,
        },
        {
            image: '/buffalo.png',
            title: t.slides[2].title,
            description: t.slides[2].desc,
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const offset = 124;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <div className="hero-slider">
            {slides.map((slide, index) => (
                <div
                    className={`slide ${index === current ? 'active' : ''}`}
                    key={index}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="slide-content">
                        <div className="hero-floating-badges">
                            <span className="h-badge">⭐ 100% Pure Milk</span>
                            <span className="h-badge">🛡️ Quality Assured</span>
                            <span className="h-badge">📍 Mouje Agar</span>
                        </div>
                        <h1 className="slide-title">{slide.title}</h1>
                        <p className="slide-description">{slide.description}</p>
                        <div className="slide-actions">
                            <button className="btn-slider-primary" onClick={() => scrollToId('products')}>
                                {t.btns.products}
                            </button>
                            <button className="btn-slider-secondary" onClick={() => scrollToId('footer')}>
                                {t.btns.contact}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <button className="slider-nav prev" onClick={prevSlide}>&#10094;</button>
            <button className="slider-nav next" onClick={nextSlide}>&#10095;</button>

            <div className="slider-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === current ? 'active' : ''}`}
                        onClick={() => setCurrent(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
