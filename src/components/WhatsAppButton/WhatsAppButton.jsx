import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const phoneNumber = '919764803128';
    const message = 'नमस्कार! मला गुरुप्रसाद डेअरी बद्दल माहिती हवी आहे.';

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button className="whatsapp-float" onClick={handleClick} aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 32 32" className="whatsapp-icon">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.91 15.91 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.606c-.388 1.094-1.938 2.002-3.168 2.266-.842.178-1.94.32-5.638-1.212-4.732-1.96-7.78-6.756-8.014-7.07-.226-.314-1.9-2.53-1.9-4.828 0-2.298 1.202-3.428 1.63-3.898.388-.424.91-.618 1.41-.618.17 0 .324.008.462.016.428.018.644.044.926.718.354.846 1.218 2.974 1.324 3.19.108.218.216.51.072.81-.136.308-.256.444-.472.692-.216.248-.422.44-.638.708-.2.234-.424.484-.176.912.248.428 1.104 1.82 2.372 2.95 1.632 1.454 2.962 1.916 3.434 2.118.354.152.776.118 1.032-.15.322-.34.72-.902 1.124-1.456.288-.394.65-.444 1.036-.3.39.136 2.472 1.166 2.896 1.38.424.214.706.32.81.5.102.178.102 1.036-.286 2.13z" fill="currentColor" />
            </svg>
            <span className="whatsapp-tooltip">Chat with us!</span>
        </button>
    );
};

export default WhatsAppButton;
