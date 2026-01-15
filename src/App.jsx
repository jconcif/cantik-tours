import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';

import Home from './pages/Home';
import TourList from './pages/TourList';
import TourDetail from './pages/TourDetail';
import BaliGuide from './pages/BaliGuide';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
    return (
        <DarkModeProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col pb-20 md:pb-0">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tours" element={<TourList />} />
                        <Route path="/tour/:id" element={<TourDetail />} />
                        <Route path="/guia-bali" element={<BaliGuide />} />
                        <Route path="/nosotros" element={<AboutPage />} />
                    </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </DarkModeProvider>
    );
}

export default App;
