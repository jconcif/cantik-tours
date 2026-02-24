import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

// Fixed rate — update manually each quarter
const EUR_TO_USD = 1.08;

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('currency') || 'EUR';
    });

    const toggleCurrency = () => {
        const next = currency === 'EUR' ? 'USD' : 'EUR';
        setCurrency(next);
        localStorage.setItem('currency', next);
    };

    const formatPrice = (eurPrice) => {
        if (currency === 'USD') {
            return { symbol: '$', amount: Math.round(eurPrice * EUR_TO_USD) };
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
