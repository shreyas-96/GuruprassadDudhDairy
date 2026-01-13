import React, { useState, useEffect } from 'react';
import './CollectionStats.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const CollectionStats = () => {
    const [activeTab, setActiveTab] = useState('morning');
    const { language } = useLanguage();
    const t = translations[language].collectionBoard;
    const navT = translations[language].navbar;

    // Specific Data Provided
    const data = {
        morning: {
            buffalo: 110,
            cow: 100,
            total: 210,
            time: '08:30 AM - 10:00 AM'
        },
        evening: {
            buffalo: 90,
            cow: 75,
            total: 165,
            time: '06:30 PM - 08:00 PM'
        }
    };

    const currentData = data[activeTab];

    return (
        <section id="predictions" className="stats-section">
            <div className="traditional-pattern"></div>

            <div className="container">
                <div className="stats-header">
                    <div className="center-code-badge">
                        <span className="code-label">{t.centerCodeLabel}</span>
                        <span className="code-number">{t.centerCode}</span>
                    </div>
                    <span className="subtitle">{navT.logoText} {navT.location}</span>
                    <h2>{t.title}<span>{t.titleSpan}</span></h2>
                    <p>{t.totalDaily}: <span className="highlight-text">{data.morning.total + data.evening.total} {t.liters}</span></p>
                </div>
                {/* Tab Selection */}
                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'morning' ? 'active' : ''}`}
                        onClick={() => setActiveTab('morning')}
                    >
                        ☀️ {t.morning}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'evening' ? 'active' : ''}`}
                        onClick={() => setActiveTab('evening')}
                    >
                        🌙 {t.evening}
                    </button>
                </div>

                <div className="collection-dashboard">
                    {/* Timing Card */}
                    <div className="timing-info-card">
                        <div className="clock-icon">🕒</div>
                        <div className="timing-details">
                            <h4>{t.openingHours}</h4>
                            <p className="session-time">{currentData.time}</p>
                        </div>
                    </div>

                    <div className="stats-main-grid">
                        {/* Buffalo Collection */}
                        <div className="collection-card buffalo-card">
                            <div className="animal-icon">🐃</div>
                            <div className="collection-details">
                                <h3>{t.buffaloMilk}</h3>
                                <div className="count-up">
                                    <span className="number">{currentData.buffalo}</span>
                                    <span className="unit">{t.liters}</span>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${(currentData.buffalo / 200) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* Cow Collection */}
                        <div className="collection-card cow-card">
                            <div className="animal-icon">🐄</div>
                            <div className="collection-details">
                                <h3>{t.cowMilk}</h3>
                                <div className="count-up">
                                    <span className="number">{currentData.cow}</span>
                                    <span className="unit">{t.liters}</span>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${(currentData.cow / 200) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* Total Section Total */}
                        <div className="collection-card total-card">
                            <div className="animal-icon">🥛</div>
                            <div className="collection-details">
                                <h3>{t.sessionTotal}</h3>
                                <div className="count-up">
                                    <span className="number">{currentData.total}</span>
                                    <span className="unit">{t.liters}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tradition Segment */}
                <div className="tradition-segment">
                    <div className="tradition-grid">
                        <div className="tradition-text">
                            <span className="marathi-heading">आमची परंपरा, आमचा विश्वास</span>
                            <h3>{t.traditionTitle}</h3>
                            <p>{t.traditionDesc}</p>
                            <ul className="traditional-list">
                                <li>✅ {t.directFarmers}</li>
                                <li>✅ {t.traditionFresh}</li>
                                <li>✅ {t.organicQuality}</li>
                            </ul>
                        </div>
                        <div className="tradition-image-box">
                            <div className="image-overlay">
                                <span className="badge">Guruprasad Premium</span>
                                <img src="/dairy-quality.png" alt="Maharashtrian Dairy Tradition" className="premium-img" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Farmer Animation Segment */}
                <div className="farmer-animation-segment">
                    <div className="animation-box">
                        <div className="pheta-icon">👳‍♂️</div>
                        <div className="can-pour-animation">
                            <div className="can-main">🍶</div>
                            <div className="milk-pouring-effect"></div>
                            <div className="collection-tank">📥</div>
                        </div>
                        <div className="marathi-tag">{t.tagline}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionStats;
