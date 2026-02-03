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

// Loading component
const PageLoader = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
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
            <div className="min-h-screen flex flex-col pb-20 md:pb-0">
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
