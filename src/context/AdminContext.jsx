/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // Default Milk Rate Settings
    const defaultSettings = {
        cow: {
            price: 40,
            baseFat: 3.5,
            baseRate: 38,
            fatRateMultiplier: 6,
            snfBase: 7.9,
            fatRange: '3.8% - 4.5% FAT',
            snfRange: '8.5% SNF'
        },
        buffalo: {
            price: 70,
            baseFat: 6.0,
            baseRate: 64,
            fatRateMultiplier: 10,
            snfBase: 8.4,
            fatRange: '6.5% - 8.0% FAT',
            snfRange: '9.0% SNF'
        }
    };

    // Default Collection Data
    const defaultCollection = {
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

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('dairy_admin_settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    cow: { ...defaultSettings.cow, ...parsed.cow, baseRate: parsed.cow?.baseRate ?? parsed.cow?.price ?? defaultSettings.cow.baseRate },
                    buffalo: { ...defaultSettings.buffalo, ...parsed.buffalo, baseRate: parsed.buffalo?.baseRate ?? parsed.buffalo?.price ?? defaultSettings.buffalo.baseRate }
                };
            } catch { return defaultSettings; }
        }
        return defaultSettings;
    });

    const [collection, setCollection] = useState(() => {
        const saved = localStorage.getItem('dairy_admin_collection');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    morning: { ...defaultCollection.morning, ...parsed.morning },
                    evening: { ...defaultCollection.evening, ...parsed.evening }
                };
            } catch { return defaultCollection; }
        }
        return defaultCollection;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('dairy_admin_auth') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('dairy_admin_settings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('dairy_admin_collection', JSON.stringify(collection));
    }, [collection]);

    useEffect(() => {
        sessionStorage.setItem('dairy_admin_auth', isAuthenticated);
    }, [isAuthenticated]);

    // Listen to storage events to sync across tabs/windows in real time
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'dairy_admin_settings' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    setSettings({
                        cow: { ...defaultSettings.cow, ...parsed.cow, baseRate: parsed.cow?.baseRate ?? parsed.cow?.price ?? defaultSettings.cow.baseRate },
                        buffalo: { ...defaultSettings.buffalo, ...parsed.buffalo, baseRate: parsed.buffalo?.baseRate ?? parsed.buffalo?.price ?? defaultSettings.buffalo.baseRate }
                    });
                } catch (err) {
                    console.error('Storage sync error:', err);
                }
            }
            if (e.key === 'dairy_admin_collection' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    setCollection({
                        morning: { ...defaultCollection.morning, ...parsed.morning },
                        evening: { ...defaultCollection.evening, ...parsed.evening }
                    });
                } catch (err) {
                    console.error('Storage sync error:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateSettings = (newSettings) => setSettings(newSettings);
    const updateCollection = (newCollection) => setCollection(newCollection);

    const login = (phone, password) => {
        const validPhones = ['7757921239', '9764803128'];
        const validPassword = '62286228';
        if (validPhones.includes(phone) && password === validPassword) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => setIsAuthenticated(false);

    return (
        <AdminContext.Provider value={{ settings, updateSettings, collection, updateCollection, isAuthenticated, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within an AdminProvider');
    return context;
};
