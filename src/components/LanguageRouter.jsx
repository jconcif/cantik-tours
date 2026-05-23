import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Main pages (loaded directly for reliability)
import Home from '../pages/Home';
import TourList from '../pages/TourList';
import TourDetail from '../pages/TourDetail';

// Secondary pages (loaded directly to eliminate chunk loading delay)
import BaliGuide from '../pages/BaliGuide';
import AboutPage from '../pages/AboutPage';
import ReviewsPage from '../pages/ReviewsPage';
import Policies from '../pages/Policies';
import VisaPage from '../pages/VisaPage';
import ItineraryPage from '../pages/ItineraryPage';
import NotFound from '../pages/NotFound';

// Admin (Direct import for reliability)
import AdminReviews from '../pages/AdminReviews';

const LanguageRouter = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        const supportedLangs = ['es', 'en'];
        if (supportedLangs.includes(lang) && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    const supportedLangs = ['es', 'en'];
    if (!supportedLangs.includes(lang)) {
        // Fallback to Spanish or browser language, preserving the rest of the path
        const targetLang = lang.startsWith('en') ? 'en' : 'es';
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        const restOfPath = pathSegments.slice(1).join('/');
        return <Navigate to={`/${targetLang}/${restOfPath}`} replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="tours" element={<TourList />} />
            <Route path="tour/:id" element={<TourDetail />} />
            <Route path="guia-bali" element={<BaliGuide />} />
            <Route path="nosotros" element={<AboutPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="politicas" element={<Policies />} />
            <Route path="visados" element={<VisaPage />} />
            <Route path="booking" element={<ItineraryPage />} />
            <Route path="itinerario" element={<ItineraryPage />} />
            <Route path="cantik-admin" element={<AdminReviews />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default LanguageRouter;
