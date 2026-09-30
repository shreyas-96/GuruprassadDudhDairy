import React from 'react';
import './Footer.css';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';
import { translations } from '../../translations/translations';

const Footer = () => {
    const { language } = useLanguage();
    const { collection } = useAdmin();
    const t = translations[language].footer;
    const navT = translations[language].navbar;

    const morningTime = collection?.morning?.time || '8:30 AM - 10:00 AM';
    const eveningTime = collection?.evening?.time || '6:30 PM - 8:00 PM';

    return (
        <footer id="footer" className="footer">
            <div className="footer-glow"></div>
            <div className="footer-inner">

                {/* Top section */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-icon">🥛</span>
                            <div>
                                <span className="footer-logo-name">{navT.logoText}</span>
                                <span className="footer-logo-location">{navT.location}</span>
                            </div>
                        </div>
                        <p className="footer-brand-desc">{t.brandDesc}</p>
                        <div className="footer-social-links">
                            <a href="https://wa.me/917757921239" target="_blank" rel="noreferrer" className="social-btn wa">
                                <span>💬</span> WhatsApp
                            </a>
                            <a href="tel:+919764803128" className="social-btn call">
                                <span>📞</span> Call Us
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>🏠 Home</a></li>
                            <li><a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>🥛 Products</a></li>
                            <li><a href="#calculator" onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }); }}>🧮 Rate Calculator</a></li>
                            <li><a href="#predictions" onClick={(e) => { e.preventDefault(); document.getElementById('predictions')?.scrollIntoView({ behavior: 'smooth' }); }}>📊 Collection Board</a></li>
                            <li><a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }}>🖼️ Gallery</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact-col">
                        <h4>{t.contactTitle}</h4>
                        <div className="footer-contact-list">
                            <div className="f-contact-item">
                                <span className="f-icon">📍</span>
                                <div>
                                    <strong>{t.addressTitle}</strong>
                                    <p>{t.addressContent}</p>
                                </div>
                            </div>
                            <div className="f-contact-item">
                                <span className="f-icon">📞</span>
                                <div>
                                    <strong>Primary</strong>
                                    <a href="tel:+919764803128">+91 9764803128</a>
                                </div>
                            </div>
                            <div className="f-contact-item">
                                <span className="f-icon">📱</span>
                                <div>
                                    <strong>Secondary</strong>
                                    <a href="tel:+917757921239">+91 7757921239</a>
                                </div>
                            </div>
                            <div className="f-contact-item">
                                <span className="f-icon">🕒</span>
                                <div>
                                    <strong>{t.timing}</strong>
                                    <p>{t.morning}: {morningTime}<br/>{t.evening}: {eveningTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} {t.rights}</p>
                    <p className="footer-center-code">🏷️ Center Code: <strong>4503</strong></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
