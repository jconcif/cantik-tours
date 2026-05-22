import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Main pages (loaded directly for reliability)
import Home from '../pages/Home';
import TourList from '../pages/TourList';
import TourDetail from '../pages/TourDetail';

// Secondary pages (lazy loaded)
const BaliGuide = React.lazy(() => import('../pages/BaliGuide'));
const AboutPage = React.lazy(() => import('../pages/AboutPage'));
const ReviewsPage = React.lazy(() => import('../pages/ReviewsPage'));
const Policies = React.lazy(() => import('../pages/Policies'));
const VisaPage = React.lazy(() => import('../pages/VisaPage'));
const ItineraryPage = React.lazy(() => import('../pages/ItineraryPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

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
