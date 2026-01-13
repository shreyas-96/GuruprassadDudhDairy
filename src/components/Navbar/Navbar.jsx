import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const t = translations[language].navbar;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="logo" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="logo-icon">🥛</span>
                    <span className="logo-text">{t.logoText} <span>{t.location}</span></span>
                </div>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <a href="#home" className="nav-item" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                    }}>{t.home}</a>
                    <a href="#predictions" className="nav-item" onClick={() => setIsOpen(false)}>{t.predictions}</a>
                    <a href="#collections" className="nav-item" onClick={() => setIsOpen(false)}>{t.collections}</a>

                    <div className="lang-switcher">
                        <button
                            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage('en')}
                        >EN</button>
                        <button
                            className={`lang-btn ${language === 'mr' ? 'active' : ''}`}
                            onClick={() => setLanguage('mr')}
                        >मराठी</button>
                    </div>
                </div>

                <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
