import React, { useState } from 'react';
import './AdminPanel.css';
import { useAdmin } from '../../context/AdminContext';

const AdminPanel = ({ onClose }) => {
    const { settings, updateSettings, collection, updateCollection, isAuthenticated, login, logout } = useAdmin();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('rates');

    const [rateForm, setRateForm] = useState(settings);
    const [collectionForm, setCollectionForm] = useState(collection);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // keep only numbers
        if (value.length <= 10) {
            setPhone(value);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setError('❌ Please enter a valid 10-digit phone number.');
            return;
        }
        const success = login(phone, password);
        if (!success) {
            setError('❌ Invalid phone number or password.');
        } else {
            setError('');
        }
    };

    const handleRateChange = (type, field, value) => {
        setRateForm((prev) => ({
            ...prev,
            [type]: { ...prev[type], [field]: parseFloat(value) || value }
        }));
    };

    const handleCollectionChange = (session, field, value) => {
        setCollectionForm((prev) => {
            const updated = {
                ...prev,
                [session]: { ...prev[session], [field]: field === 'time' ? value : (parseInt(value) || 0) }
            };
            // Auto-calculate total
            if (field === 'buffalo' || field === 'cow') {
                updated[session].total = (updated[session].buffalo || 0) + (updated[session].cow || 0);
            }
            return updated;
        });
    };

    const handleSave = () => {
        updateSettings(rateForm);
        updateCollection(collectionForm);
        alert('✅ All settings saved successfully!');
        onClose();
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-overlay">
                <div className="admin-modal login-modal">
                    <button className="admin-close" onClick={onClose}>&times;</button>
                    <div className="login-top">
                        <div className="login-icon">
                            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h2>Admin Access</h2>
                        <p>Guruprasad Dairy Dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="admin-form">
                        <div className="form-group">
                            <label>Phone Number (10 Digits)</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="e.g. 9876543210"
                                maxLength={10}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && <div className="admin-error">{error}</div>}
                        <button type="submit" className="btn-admin-primary login-btn">Secure Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-overlay">
            <div className="admin-modal dashboard-modal">
                <button className="admin-close" onClick={onClose}>&times;</button>

                <div className="admin-header">
                    <div className="admin-header-left">
                        <span className="admin-logo">🥛</span>
                        <div>
                            <h2>Admin Dashboard</h2>
                            <p>Guruprasad Dudh Dairy</p>
                        </div>
                    </div>
                    <button className="btn-admin-logout" onClick={() => { logout(); onClose(); }}>Logout ↩</button>
                </div>

                {/* Tab Navigation */}
                <div className="admin-tabs">
                    <button className={`admin-tab-btn ${activeTab === 'rates' ? 'active' : ''}`} onClick={() => setActiveTab('rates')}>
                        💰 Milk Rates
                    </button>
                    <button className={`admin-tab-btn ${activeTab === 'collection' ? 'active' : ''}`} onClick={() => setActiveTab('collection')}>
                        📊 Collection Data
                    </button>
                </div>

                <div className="admin-content">

                    {/* ── TAB 1: Milk Rates ── */}
                    {activeTab === 'rates' && (
                        <div>
                            {['cow', 'buffalo'].map((type) => (
                                <div key={type} className="admin-section">
                                    <h3>{type === 'cow' ? '🐄' : '🐃'} {type.charAt(0).toUpperCase() + type.slice(1)} Milk Rates</h3>
                                    <div className="settings-grid">
                                        <div className="form-group">
                                            <label>Base Price / Liter (₹)</label>
                                            <input
                                                type="number"
                                                value={rateForm[type].price}
                                                onChange={(e) => handleRateChange(type, 'price', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Base FAT %</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={rateForm[type].baseFat}
                                                onChange={(e) => handleRateChange(type, 'baseFat', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Base Rate (₹ at Base FAT)</label>
                                            <input
                                                type="number"
                                                value={rateForm[type].baseRate}
                                                onChange={(e) => handleRateChange(type, 'baseRate', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Rate per 1.0 FAT Increase (₹)</label>
                                            <input
                                                type="number"
                                                step="0.5"
                                                value={rateForm[type].fatRateMultiplier}
                                                onChange={(e) => handleRateChange(type, 'fatRateMultiplier', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Base SNF %</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={rateForm[type].snfBase}
                                                onChange={(e) => handleRateChange(type, 'snfBase', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Display FAT Range (text)</label>
                                            <input
                                                type="text"
                                                value={rateForm[type].fatRange}
                                                onChange={(e) => handleRateChange(type, 'fatRange', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Display SNF Range (text)</label>
                                            <input
                                                type="text"
                                                value={rateForm[type].snfRange}
                                                onChange={(e) => handleRateChange(type, 'snfRange', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── TAB 2: Collection Data ── */}
                    {activeTab === 'collection' && (
                        <div>
                            {['morning', 'evening'].map((session) => (
                                <div key={session} className="admin-section">
                                    <h3>{session === 'morning' ? '☀️ Morning Session' : '🌙 Evening Session'}</h3>
                                    <div className="settings-grid">
                                        <div className="form-group">
                                            <label>🐃 Buffalo Milk (Liters)</label>
                                            <input
                                                type="number"
                                                value={collectionForm[session].buffalo}
                                                onChange={(e) => handleCollectionChange(session, 'buffalo', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>🐄 Cow Milk (Liters)</label>
                                            <input
                                                type="number"
                                                value={collectionForm[session].cow}
                                                onChange={(e) => handleCollectionChange(session, 'cow', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>🥛 Total (Auto-calculated)</label>
                                            <input
                                                type="number"
                                                value={collectionForm[session].total}
                                                readOnly
                                                className="input-readonly"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>🕒 Session Timing</label>
                                            <input
                                                type="text"
                                                value={collectionForm[session].time}
                                                onChange={(e) => handleCollectionChange(session, 'time', e.target.value)}
                                                placeholder="e.g. 08:30 AM - 10:00 AM"
                                            />
                                        </div>
                                    </div>
                                    <div className="collection-preview">
                                        <span>Today's Total: <strong>🥛 {collectionForm[session].total} Liters</strong></span>
                                    </div>
                                </div>
                            ))}
                            <div className="daily-total-banner">
                                <span>📦 Grand Daily Total:</span>
                                <strong>₹ {collectionForm.morning.total + collectionForm.evening.total} Liters</strong>
                            </div>
                        </div>
                    )}
                </div>

                <div className="admin-footer">
                    <button className="btn-admin-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-admin-primary" onClick={handleSave}>💾 Save All Changes</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
