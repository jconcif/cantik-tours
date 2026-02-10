import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { initGA, trackPageView } from './utils/analytics';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const TourList = lazy(() => import('./pages/TourList'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const BaliGuide = lazy(() => import('./pages/BaliGuide'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Minimal loading component to avoid layout shifts
const PageLoader = () => (
    <div className="h-screen w-full bg-bg-light dark:bg-bg-dark" />
);

function App() {
    const location = useLocation();

    useEffect(() => {
        initGA();
    }, []);

    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    return (
        <DarkModeProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tours" element={<TourList />} />
                            <Route path="/tour/:id" element={<TourDetail />} />
                            <Route path="/guia-bali" element={<BaliGuide />} />
                            <Route path="/nosotros" element={<AboutPage />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </DarkModeProvider>
    );
}

export default App;
