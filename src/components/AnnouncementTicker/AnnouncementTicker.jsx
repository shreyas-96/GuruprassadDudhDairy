import React, { useState, useEffect } from 'react';
import './AnnouncementTicker.css';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

const AnnouncementTicker = () => {
    const { language } = useLanguage();
    const { collection } = useAdmin();
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const totalDaily = (collection?.morning?.total || 0) + (collection?.evening?.total || 0);
    const morningTime = collection?.morning?.time || '08:30 AM - 10:00 AM';
    const eveningTime = collection?.evening?.time || '06:30 PM - 08:00 PM';

    // Build a live ticker message using real admin data
    const tickerMessage = language === 'mr'
        ? `🥛 गुरुप्रसाद दुध डेअरी - मौजे आगर • केंद्र कोड: ४५०३ • आजचे एकूण संकलन: ${totalDaily} लिटर • सकाळ: ${morningTime} | संध्याकाळ: ${eveningTime}`
        : `🥛 Guruprasad Dudh Dairy - Mouje Agar • Center Code: 4503 • Today's Total: ${totalDaily} Liters • Morning: ${morningTime} | Evening: ${eveningTime}`;

    return (
        <div className="announcement-ticker">
            <div className="ticker-badge">
                <span className="live-dot"></span>
                <span>LIVE BOARD</span>
            </div>
            <div className="ticker-content">
                <div className="ticker-scroll">
                    <p className="ticker-text">{tickerMessage}</p>
                    <p className="ticker-text">{tickerMessage}</p>
                </div>
            </div>
            <div className="ticker-clock">
                <span>🕒 {time}</span>
            </div>
        </div>
    );
};

export default AnnouncementTicker;
