import React from 'react';
import './Footer.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const Footer = () => {
    const { language } = useLanguage();
    const t = translations[language].footer;
    const navT = translations[language].navbar;

    return (
        <footer id="footer" className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <div className="logo">
                        <span className="logo-icon">🥛</span>
                        <span className="logo-text">{navT.logoText} <span>{navT.location}</span></span>
                    </div>
                    <p>{t.brandDesc}</p>
                </div>
                <div className="footer-info">
                    <div className="info-item">
                        <span className="info-icon">📍</span>
                        <div className="info-text">
                            <h4>{t.addressTitle}</h4>
                            <p>{t.addressContent}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">📞</span>
                        <div className="info-text">
                            <h4>{t.contactTitle}</h4>
                            <p>+91 9764803128 / 7757921239</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {t.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
