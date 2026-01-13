import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { language } = useLanguage();
    const t = translations[language].galleryBoard;

    const images = [
        '/gallery-1.jpg.png',
        '/gallery-2.jpg.png',
        '/gallery-3.jpg.png',
        '/gallery-4.jpg.png',
        '/gallery-5.jpg.png',
        '/gallery-6.jpg.png'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section id="collections" className="gallery-section">
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">{t.subtitle}</span>
                    <h2>{t.title}<span>{t.titleSpan}</span></h2>
                    <p>{t.desc}</p>
                </div>

                <div className="gallery-container">
                    <div className="gallery-main">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`gallery-slide ${index === currentIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            >
                                <div className="gallery-overlay">
                                    <span className="image-number">0{index + 1} / 0{images.length}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
