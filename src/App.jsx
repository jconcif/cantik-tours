import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { initGA, trackPageView } from './utils/analytics';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Main pages (loaded directly for reliability)
import Home from './pages/Home';
import TourList from './pages/TourList';
import TourDetail from './pages/TourDetail';

// Secondary pages (lazy loaded)
const BaliGuide = lazy(() => import('./pages/BaliGuide'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const AdminReviews = lazy(() => import('./pages/AdminReviews'));
const Policies = lazy(() => import('./pages/Policies'));


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
        <CurrencyProvider>
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
                                <Route path="/reviews" element={<ReviewsPage />} />
                                <Route path="/politicas" element={<Policies />} />
                                <Route path="/cantik-admin" element={<AdminReviews />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                    {!['/reviews', '/cantik-admin'].includes(location.pathname) && <WhatsAppButton />}
                </div>
            </DarkModeProvider>
        </CurrencyProvider>
    );
}

export default App;
