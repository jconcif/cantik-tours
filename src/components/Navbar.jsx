import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, BookOpen, ChevronLeft, Languages } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { isDark, toggleDarkMode } = useDarkMode();
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(nextLang);
    };

    // Check if we are on home or if we are on a page that needs a back button
    const isHome = location.pathname === '/' || location.pathname === '/index.html';
    const isTourDetail = location.pathname.startsWith('/tour/');
    const isBaliGuide = location.pathname.startsWith('/guia-bali');
    const isAbout = location.pathname.startsWith('/nosotros');
    const isTourList = location.pathname.startsWith('/tours');

    // Need back button if NOT home
    const showBackButton = !isHome;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Logic for text color
    const useDarkText = scrolled || !isHome;
    const textColorClass = useDarkText ? 'text-gray-900 dark:text-white' : 'text-white drop-shadow-md';

    // Background logic
    const navBackgroundClass = scrolled
        ? 'glass py-3 shadow-lg'
        : (isHome ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-7' : 'bg-white dark:bg-bg-dark py-4 shadow-sm');

    const positionClass = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className={`${positionClass} px-6 flex items-center justify-between ${navBackgroundClass}`}>
                <div className="flex items-center gap-4">
                    {showBackButton && (
                        <button
                            onClick={() => navigate(-1)}
                            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all ${textColorClass}`}
                            aria-label="Volver"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (isHome) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center gap-1.5 group"
                    >
                        <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary group-hover:scale-105 transition-transform">CANTIK</span>
                        <span className={`text-xl sm:text-2xl font-light tracking-widest uppercase transition-colors ${textColorClass}`}>Tours</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8 font-semibold">
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (isHome) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className={`hover:text-primary transition-colors relative group py-2 ${textColorClass}`}
                    >
                        {t('nav.home')}
                        {isHome && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                    </Link>

                    <Link to="/tours" className={`hover:text-primary transition-colors relative group py-2 ${textColorClass}`}>
                        {t('nav.tours')}
                        {isTourList && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                    </Link>

                    <Link to="/nosotros" className={`hover:text-primary transition-colors relative group py-2 ${textColorClass}`}>
                        {t('nav.about')}
                        {isAbout && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                    </Link>

                    <Link to="/guia-bali" className={`hover:text-primary transition-colors relative group py-2 flex items-center gap-2 ${textColorClass}`}>
                        <BookOpen size={16} />
                        {t('nav.guide')}
                        {isBaliGuide && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                    </Link>
                </div>

                <div className="flex items-center gap-1 sm:gap-4">
                    {/* Desktop Toggles */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all font-black text-[10px] uppercase tracking-tighter border ${textColorClass} ${useDarkText ? 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5' : 'border-white/30 bg-white/10 backdrop-blur-sm'
                                } hover:scale-105 active:scale-95`}
                        >
                            <Languages size={14} className="opacity-70" />
                            <span>{i18n.language.startsWith('es') ? 'ES' : 'EN'}</span>
                        </button>

                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full transition-colors ${textColorClass} hover:bg-black/5 dark:hover:bg-white/5`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button - Always visible on mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-full hover:bg-white/10 transition-colors ${textColorClass}`}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[110] bg-white dark:bg-bg-dark flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-black/5 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black tracking-tighter text-gradient">CANTIK</span>
                                <span className="text-2xl font-light tracking-widest uppercase dark:text-white text-gray-900">Tours</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-bg-dark dark:text-bg-light"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex flex-col p-8 gap-6 text-2xl font-black">
                            <Link
                                to="/"
                                onClick={(e) => {
                                    setIsMobileMenuOpen(false);
                                    if (isHome) {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5"
                            >
                                <span className={isHome ? 'text-primary' : 'dark:text-white text-gray-900'}>{t('nav.home')}</span>
                            </Link>
                            <Link
                                to="/tours"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5"
                            >
                                <span className={isTourList ? 'text-primary' : 'dark:text-white text-gray-900'}>{t('nav.tours')}</span>
                                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold tracking-widest uppercase">Expert Choice</span>
                            </Link>
                            <Link
                                to="/nosotros"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5"
                            >
                                <span className={isAbout ? 'text-primary' : 'dark:text-white text-gray-900'}>{t('nav.about')}</span>
                            </Link>
                            <Link
                                to="/guia-bali"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5"
                            >
                                <span className={isBaliGuide ? 'text-primary' : 'dark:text-white text-gray-900'}>{t('nav.guide')}</span>
                                <BookOpen size={20} className="text-primary" />
                            </Link>
                        </div>

                        <div className="mt-auto p-8 bg-gray-50 dark:bg-black/20 m-6 rounded-3xl space-y-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={toggleLanguage}
                                    className="flex-1 flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10"
                                >
                                    <span className="text-xs font-bold opacity-50 uppercase tracking-widest">{t('common.language')}</span>
                                    <span className="text-primary font-black uppercase">{i18n.language.split('-')[0]}</span>
                                </button>
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 text-primary"
                                >
                                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
