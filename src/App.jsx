import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { initGA, trackPageView } from './utils/analytics';
import { getAvailability } from './services/api';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

import LanguageRouter from './components/LanguageRouter';
import { useTranslation } from 'react-i18next';
// Minimal loading component to avoid layout shifts
const PageLoader = () => (
    <div className="h-screen w-full bg-bg-light dark:bg-bg-dark" />
);

function App() {
    const location = useLocation();

    useEffect(() => {
        initGA();
        // Silent warm-up ping to wake up the backend and database (useful if hosted on Render/Supabase free tiers)
        try {
            getAvailability().catch(() => {});
        } catch (e) {}
    }, []);

    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    const { i18n } = useTranslation();
    const rawLang = i18n.language || 'es';
    const defaultLang = rawLang.startsWith('en') ? 'en' : 'es';

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    const isLangPrefixed = firstSegment === 'es' || firstSegment === 'en';
    const mainPath = isLangPrefixed ? '/' + pathSegments.slice(1).join('/') : location.pathname;

    const isBooking = mainPath.startsWith('/booking') || mainPath.startsWith('/itinerario') || mainPath.startsWith('/reviews');
    const isAdmin = mainPath === '/admin' || mainPath === '/cantik-admin';
    const hideHeaderFooter = isBooking || isAdmin;

    return (
        <CurrencyProvider>
            <DarkModeProvider>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col overflow-x-hidden">
                    {!hideHeaderFooter && <Navbar />}
                    <main className="flex-grow">
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/:lang/*" element={<LanguageRouter />} />
                                <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />
                                <Route path="*" element={<Navigate to={`/${defaultLang}${location.pathname}`} replace />} />
                            </Routes>
                        </Suspense>
                    </main>
                    {!hideHeaderFooter && <Footer />}
                    {!hideHeaderFooter && !['/reviews'].includes(location.pathname) && <WhatsAppButton />}
                </div>
            </DarkModeProvider>
        </CurrencyProvider>
    );
}

export default App;
