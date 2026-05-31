import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGlobalSettings } from '../services/api';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('currency') || 'EUR';
    });
    
    // Default fallback rate, will be updated via API
    const [exchangeRate, setExchangeRate] = useState(1.08);

    useEffect(() => {
        getGlobalSettings().then(res => {
            if (res.data && res.data.exchangeRate) {
                setExchangeRate(res.data.exchangeRate);
            }
        }).catch(err => console.error('Failed to fetch exchange rate', err));
    }, []);

    const toggleCurrency = () => {
        const next = currency === 'EUR' ? 'USD' : 'EUR';
        setCurrency(next);
        localStorage.setItem('currency', next);
    };

    const formatPrice = (eurPrice) => {
        if (currency === 'USD') {
            return { symbol: '$', amount: Math.round(eurPrice * exchangeRate) };
        }
        return { symbol: '€', amount: eurPrice };
    };

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
