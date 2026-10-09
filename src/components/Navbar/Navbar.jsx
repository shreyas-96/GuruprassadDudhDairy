import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

// The fixed heights: AnnouncementTicker (42px) + gradient bar (7px) + Navbar (75px)
// When scrolled, navbar shrinks to 68px — we use scrollY to offset scroll target
const NAVBAR_HEIGHT = 75;
const TICKER_HEIGHT = 49; // 42px ticker + 7px gradient

const Navbar = ({ onLogoClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { language, setLanguage } = useLanguage();
    const t = translations[language].navbar;

    // Handle scroll for navbar style changes
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // IntersectionObserver to detect active section while scrolling
    useEffect(() => {
        const sections = ['home', 'products', 'collections', 'gallery'];
        const offset = NAVBAR_HEIGHT + TICKER_HEIGHT;

        const observers = [];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                {
                    // rootMargin: negative top to account for fixed navbar+ticker height
                    rootMargin: `-${offset}px 0px -40% 0px`,
                    threshold: 0,
                }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    // Close mobile menu when Escape is pressed
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Scroll to a section with offset for the fixed navbar + ticker
    const scrollToSection = useCallback((id) => {
        setIsOpen(false);
        const el = document.getElementById(id);
        if (!el) return;

        const offset = NAVBAR_HEIGHT + TICKER_HEIGHT;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const navItems = [
        { id: 'home', label: t.home },
        { id: 'products', label: t.products },
        { id: 'collections', label: t.collections },
        { id: 'gallery', label: t.gallery },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="navbar-container">
                {/* Logo */}
                <div
                    className="logo"
                    onClick={() => scrollToSection('home')}
                    role="button"
                    tabIndex={0}
                    aria-label="Go to Home"
                    onKeyDown={(e) => e.key === 'Enter' && scrollToSection('home')}
                >
                    <span
                        className="logo-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onLogoClick) onLogoClick();
                        }}
                        style={{ cursor: 'pointer' }}
                    >🥛</span>
                    <span className="logo-text">{t.logoText} <span>{t.location}</span></span>
                </div>

                {/* Desktop Nav Links */}
                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {navItems.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`nav-item ${activeSection === id ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(id);
                            }}
                            aria-current={activeSection === id ? 'page' : undefined}
                        >
                            {label}
                        </a>
                    ))}

                    <a href="tel:+919764803128" className="btn-nav-call">
                        📞 9764803128
                    </a>

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

                {/* Hamburger */}
                <div
                    className={`hamburger ${isOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    role="button"
                    tabIndex={0}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
