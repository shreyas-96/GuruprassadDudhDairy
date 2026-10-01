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
                                <span>💬</span> {t.whatsapp}
                            </a>
                            <a href="tel:+919764803128" className="social-btn call">
                                <span>📞</span> {t.callUs}
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-col">
                        <h4>{t.quickLinks}</h4>
                        <ul>
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>🏠 {t.linkHome}</a></li>
                            <li><a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>🥛 {t.linkProducts}</a></li>
                            <li><a href="#calculator" onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }); }}>🧮 {t.linkCalculator}</a></li>
                            <li><a href="#predictions" onClick={(e) => { e.preventDefault(); document.getElementById('predictions')?.scrollIntoView({ behavior: 'smooth' }); }}>📊 {t.linkCollectionBoard}</a></li>
                            <li><a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }}>🖼️ {t.linkGallery}</a></li>
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
                                    <strong>{t.primary}</strong>
                                    <a href="tel:+919764803128">+91 9764803128</a>
                                </div>
                            </div>
                            <div className="f-contact-item">
                                <span className="f-icon">📱</span>
                                <div>
                                    <strong>{t.secondary}</strong>
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

                {/* Trusted Milk Supply Partner Section */}
                <div className="footer-supply-partner">
                    <div className="supply-partner-logo">
                        <img
                            src="/warana-logo.png"
                            alt={t.waranaOrgName}
                            className="warana-logo-img"
                        />
                    </div>
                    <div className="supply-partner-info">
                        <h4 className="supply-partner-heading">{t.supplyPartnerHeading}</h4>
                        <p className="supply-partner-desc">
                            {t.supplyPartnerDesc} <strong>{t.waranaDudhSangh}</strong>{t.supplyPartnerDescCont}
                        </p>
                        <div className="supply-partner-address">
                            <p className="partner-org-name">
                                {t.waranaOrgName}
                            </p>
                            <p className="partner-address-line">
                                📍 {t.waranaAddress}<br />
                                {t.waranaAddress2}<br />
                                {t.waranaAddress3}
                            </p>
                            <p className="partner-fax-line">
                                📠 {t.waranaFax}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider before bottom */}
                <div className="footer-divider"></div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} {t.rights}</p>
                    <p className="footer-dev-credit">
                        💻 {t.developedBy} <strong>{t.developerName}</strong>
                    </p>
                    <p className="footer-center-code">🏷️ {t.centerCodeLabel}: <strong>4503</strong></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
