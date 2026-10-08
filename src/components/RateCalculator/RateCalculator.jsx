import React, { useState } from 'react';
import './RateCalculator.css';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';
import { translations } from '../../translations/translations';

const RateCalculator = () => {
    const { language } = useLanguage();
    const { settings } = useAdmin();
    const t = translations[language].calculator;

    const [milkType, setMilkType] = useState('cow'); // 'cow' or 'buffalo'
    const [liters, setLiters] = useState(10);
    const [fat, setFat] = useState(() => settings.cow.baseFat);

    const handleTypeChange = (type) => {
        setMilkType(type);
        setFat(settings[type].baseFat);
    };

    // Calculate Rate per liter using Admin settings
    const calculateRate = () => {
        const typeSettings = settings[milkType];
        const baseRate = typeSettings.baseRate;
        const baseFat = typeSettings.baseFat;
        const multiplier = typeSettings.fatRateMultiplier;
        
        // Example: if fat is 4.0, base is 3.5, diff = (4.0 - 3.5) * 6
        const diff = (fat - baseFat) * multiplier;
        return Math.max(0, Math.round((baseRate + diff) * 10) / 10);
    };

    const ratePerLiter = calculateRate();
    const totalPayout = Math.round(liters * ratePerLiter);
    const estSNF = (fat * 0.2 + settings[milkType].snfBase - (settings[milkType].baseFat * 0.2)).toFixed(1);

    const shareOnWhatsapp = () => {
        const text = `🥛 Guruprasad Dairy Rate Estimate:\n• Type: ${milkType === 'cow' ? t.cow : t.buffalo}\n• Quantity: ${liters} L\n• Fat: ${fat}%\n• Est. SNF: ${estSNF}%\n• Rate/L: ₹${ratePerLiter}\n• Total Payout: ₹${totalPayout}`;
        const url = `https://wa.me/917757921239?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <section id="calculator" className="calculator-section">
            <div className="container">
                <div className="calculator-header">
                    <span className="calc-badge">{t.badge}</span>
                    <h2>{t.title}<span>{t.titleSpan}</span></h2>
                    <p>{t.subtitle}</p>
                </div>

                <div className="calc-glass-card">
                    <div className="calc-left">
                        {/* Milk Type Toggle */}
                        <div className="input-group">
                            <label className="input-label">{t.milkType}</label>
                            <div className="milk-toggle-group">
                                <button
                                    className={`toggle-btn ${milkType === 'cow' ? 'active' : ''}`}
                                    onClick={() => handleTypeChange('cow')}
                                >
                                    🐄 {t.cow}
                                </button>
                                <button
                                    className={`toggle-btn ${milkType === 'buffalo' ? 'active' : ''}`}
                                    onClick={() => handleTypeChange('buffalo')}
                                >
                                    🐃 {t.buffalo}
                                </button>
                            </div>
                        </div>

                        {/* Quantity Slider */}
                        <div className="input-group">
                            <div className="label-row">
                                <label className="input-label">{t.quantity}</label>
                                <span className="val-badge">{liters} L</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={liters}
                                onChange={(e) => setLiters(Number(e.target.value))}
                                className="range-slider"
                            />
                            <div className="slider-limits">
                                <span>1 L</span>
                                <span>50 L</span>
                                <span>100 L</span>
                            </div>
                        </div>

                        {/* Fat % Slider */}
                        <div className="input-group">
                            <div className="label-row">
                                <label className="input-label">{t.fat}</label>
                                <span className="val-badge fat-badge">{fat}%</span>
                            </div>
                            <input
                                type="range"
                                min={milkType === 'cow' ? '3.0' : '5.5'}
                                max={milkType === 'cow' ? '5.5' : '10.0'}
                                step="0.1"
                                value={fat}
                                onChange={(e) => setFat(Number(e.target.value))}
                                className="range-slider fat-slider"
                            />
                            <div className="slider-limits">
                                <span>{milkType === 'cow' ? '3.0%' : '5.5%'}</span>
                                <span>Standard</span>
                                <span>{milkType === 'cow' ? '5.5%' : '10.0%'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="calc-right">
                        <div className="results-box">
                            <div className="mini-stat-row">
                                <div className="mini-stat">
                                    <span className="stat-name">{t.snf}</span>
                                    <span className="stat-val">{estSNF}%</span>
                                </div>
                                <div className="mini-stat">
                                    <span className="stat-name">{t.ratePerLiter}</span>
                                    <span className="stat-val highlight">₹{ratePerLiter}</span>
                                </div>
                            </div>

                            <div className="total-payout-box">
                                <span className="payout-title">{t.totalPayout}</span>
                                <div className="payout-amount">
                                    <span className="cur">₹</span>
                                    <span className="num">{totalPayout.toLocaleString()}</span>
                                </div>
                                <span className="payout-sub">For {liters} Liters at {fat}% FAT</span>
                            </div>

                            <button className="btn-share-whatsapp" onClick={shareOnWhatsapp}>
                                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.91 15.91 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.606c-.388 1.094-1.938 2.002-3.168 2.266-.842.178-1.94.32-5.638-1.212-4.732-1.96-7.78-6.756-8.014-7.07-.226-.314-1.9-2.53-1.9-4.828 0-2.298 1.202-3.428 1.63-3.898.388-.424.91-.618 1.41-.618.17 0 .324.008.462.016.428.018.644.044.926.718.354.846 1.218 2.974 1.324 3.19.108.218.216.51.072.81-.136.308-.256.444-.472.692-.216.248-.422.44-.638.708-.2.234-.424.484-.176.912.248.428 1.104 1.82 2.372 2.95 1.632 1.454 2.962 1.916 3.434 2.118.354.152.776.118 1.032-.15.322-.34.72-.902 1.124-1.456.288-.394.65-.444 1.036-.3.39.136 2.472 1.166 2.896 1.38.424.214.706.32.81.5.102.178.102 1.036-.286 2.13z" />
                                </svg>
                                {t.shareWhatsapp}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RateCalculator;
