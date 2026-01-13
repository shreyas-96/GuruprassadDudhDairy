import React from 'react';
import './Products.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

const Products = () => {
    const [showModal, setShowModal] = React.useState(false);
    const { language } = useLanguage();
    const t = translations[language].products;

    const products = [
        {
            id: 1,
            name: t.items.cowMilk.name,
            price: 40,
            unit: t.unit,
            image: '/cow-milk.png',
            description: t.items.cowMilk.desc,
            tag: t.items.cowMilk.tag
        },
        {
            id: 2,
            name: t.items.buffaloMilk.name,
            price: 70,
            unit: t.unit,
            image: '/milk.png',
            description: t.items.buffaloMilk.desc,
            tag: t.items.buffaloMilk.tag
        }
    ];

    React.useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const handleEnquiry = () => {
        setShowModal(true);
    };

    return (
        <section id="products" className="products-section">
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">{t.subtitle}</span>
                    <h2>{t.title}<span>{t.titleSpan}</span></h2>
                    <p>{t.desc}</p>
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-wrapper">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-tag">{product.tag}</div>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div className="product-price-row">
                                    <div className="price-container">
                                        <span className="currency">Rs</span>
                                        <span className="amount">{product.price}</span>
                                        <span className="unit">/{product.unit}</span>
                                    </div>
                                    <button className="btn-add" onClick={handleEnquiry}>{t.enquiry}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Premium Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowModal(false)}>
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon-container">
                                <span className="modal-icon">📞</span>
                            </div>
                            <span className="modal-subtitle">{t.modal.subtitle}</span>
                            <h3>{t.modal.title}<span>{t.modal.titleSpan}</span></h3>
                        </div>

                        <div className="modal-body">
                            <p className="modal-desc">{t.modal.desc}</p>

                            <div className="contact-list">
                                <a href="tel:+919764803128" className="contact-card">
                                    <div className="contact-icon">📱</div>
                                    <div className="contact-details">
                                        <span className="contact-label">{t.modal.primaryLine}</span>
                                        <span className="contact-number">+91 9764803128</span>
                                    </div>
                                    <div className="contact-arrow">→</div>
                                </a>

                                <a href="tel:+917757921239" className="contact-card">
                                    <div className="contact-icon">📱</div>
                                    <div className="contact-details">
                                        <span className="contact-label">{t.modal.secondaryLine}</span>
                                        <span className="contact-number">+91 7757921239</span>
                                    </div>
                                    <div className="contact-arrow">→</div>
                                </a>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="marathi-badge">{t.modal.badge}</div>
                            <div className="footer-status">
                                <span className="status-dot"></span>
                                {t.modal.contactUs}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Products;
