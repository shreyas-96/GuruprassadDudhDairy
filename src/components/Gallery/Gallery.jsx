import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const { language } = useLanguage();
    const t = translations[language].galleryBoard;

    const images = [
        { src: '/gallery-1.jpg.png', title: 'Milk Collection & Testing' },
        { src: '/gallery-2.jpg.png', title: 'Digital Weight Scale' },
        { src: '/gallery-3.jpg.png', title: 'Fresh Dairy Stock' },
        { src: '/gallery-4.jpg.png', title: 'Pure Cattle Care' },
        { src: '/gallery-5.jpg.png', title: 'Hygienic Milk Storage' },
        { src: '/gallery-6.jpg.png', title: 'Mouje Agar Center' }
    ];

    useEffect(() => {
        if (lightboxOpen) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length, lightboxOpen]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <section id="collections" className="gallery-section">
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">{t.subtitle}</span>
                    <h2>{t.title}<span>{t.titleSpan}</span></h2>
                    <p>{t.desc}</p>
                </div>

                <div className="gallery-container">
                    <div className="gallery-main" onClick={() => setLightboxOpen(true)}>
                        {images.map((item, index) => (
                            <div
                                key={index}
                                className={`gallery-slide ${index === currentIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${item.src})` }}
                            >
                                <div className="gallery-overlay">
                                    <span className="image-caption">📷 {item.title}</span>
                                    <span className="image-number">0{index + 1} / 0{images.length}</span>
                                </div>
                            </div>
                        ))}

                        <button className="g-nav g-prev" onClick={prevImage}>&#10094;</button>
                        <button className="g-nav g-next" onClick={nextImage}>&#10095;</button>
                    </div>

                    {/* Thumbnails list */}
                    <div className="gallery-thumbnails">
                        {images.map((item, index) => (
                            <div
                                key={index}
                                className={`thumb ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img src={item.src} alt={item.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className="g-lightbox-overlay" onClick={() => setLightboxOpen(false)}>
                    <div className="g-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="g-lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
                        <img src={images[currentIndex].src} alt={images[currentIndex].title} className="lightbox-img" />
                        <div className="lightbox-caption">
                            <h3>{images[currentIndex].title}</h3>
                            <span>Photo 0{currentIndex + 1} of 0{images.length} • Guruprasad Dairy</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
