import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        // Check local storage or system preference
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) return saved === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDark);
    }, [isDark]);

    const toggleDarkMode = () => setIsDark(!isDark);

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);
