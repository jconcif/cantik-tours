import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';

import Home from './pages/Home';
import TourList from './pages/TourList';
import TourDetail from './pages/TourDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

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
                    </Routes>
                </main>
                <Footer />
            </div>
        </DarkModeProvider>
    );
}

export default App;

