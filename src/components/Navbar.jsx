import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, BookOpen, ChevronLeft, Globe } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { useCurrency } from '../context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { isDark, toggleDarkMode } = useDarkMode();
    const { currency, toggleCurrency } = useCurrency();
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
    const [isGlobeOpen, setIsGlobeOpen] = useState(false);
    const globeRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (globeRef.current && !globeRef.current.contains(e.target)) {
                setIsGlobeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                        <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary-dark transition-transform">CANTIK</span>
                        <span className={`text-xl sm:text-2xl font-light tracking-widest uppercase transition-all group-hover:tracking-[0.2em] ${textColorClass}`}>Tours</span>
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
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isHome ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>

                    <Link to="/tours" className={`hover:text-primary transition-colors relative group py-2 ${textColorClass}`}>
                        {t('nav.tours')}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isTourList ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>

                    <Link to="/nosotros" className={`hover:text-primary transition-colors relative group py-2 ${textColorClass}`}>
                        {t('nav.about')}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isAbout ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>

                    <Link to="/guia-bali" className={`hover:text-primary transition-colors relative group py-2 flex items-center gap-2 ${textColorClass}`}>
                        <BookOpen size={16} />
                        {t('nav.guide')}
                        {isBaliGuide && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                    </Link>
                </div>

                <div className="flex items-center gap-1 sm:gap-4">
                    {/* Desktop Toggles */}
                    <div className="hidden md:flex items-center gap-3">

                        {/* Globe Dropdown */}
                        <div className="relative" ref={globeRef}>
                            <button
                                onClick={() => setIsGlobeOpen(!isGlobeOpen)}
                                className={`p-2 rounded-full transition-all ${textColorClass} hover:bg-black/5 dark:hover:bg-white/5 ${isGlobeOpen ? 'bg-black/5 dark:bg-white/10' : ''}`}
                                aria-label="Preferencias de idioma y moneda"
                                aria-expanded={isGlobeOpen}
                            >
                                <Globe size={20} />
                            </button>

                            <AnimatePresence>
                                {isGlobeOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden z-50"
                                    >
                                        {/* Language */}
                                        <div className="px-4 pt-4 pb-2">
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                                {i18n.language.startsWith('es') ? 'Idioma' : 'Language'}
                                            </p>
                                            <div className="flex gap-2">
                                                {['es', 'en'].map((lang) => (
                                                    <button
                                                        key={lang}
                                                        onClick={() => { i18n.changeLanguage(lang); }}
                                                        className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${i18n.language.startsWith(lang)
                                                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                                                            : 'bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {lang === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-px bg-black/5 dark:bg-white/5 mx-4" />

                                        {/* Currency */}
                                        <div className="px-4 pt-2 pb-4">
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                                {i18n.language.startsWith('es') ? 'Moneda' : 'Currency'}
                                            </p>
                                            <div className="flex gap-2">
                                                {['EUR', 'USD'].map((cur) => (
                                                    <button
                                                        key={cur}
                                                        onClick={() => { if (currency !== cur) toggleCurrency(); }}
                                                        className={`flex-1 py-2 rounded-xl text-xs font-black tracking-wider transition-all ${currency === cur
                                                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                                                            : 'bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {cur === 'EUR' ? '€ EUR' : '$ USD'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Dark mode */}
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full transition-colors ${textColorClass} hover:bg-black/5 dark:hover:bg-white/5`}
                            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button - Always visible on mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-full hover:bg-white/10 transition-colors ${textColorClass}`}
                        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu — Full Screen */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 32px)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-[110] bg-white dark:bg-gray-950 flex flex-col"
                    >
                        {/* Top bar */}
                        <div className="flex justify-between items-center px-6 pt-safe-top pt-6 pb-4 flex-shrink-0">
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-black tracking-tighter text-primary-dark">CANTIK</span>
                                <span className="text-2xl font-light tracking-widest uppercase dark:text-white text-gray-900">Tours</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300"
                                aria-label="Cerrar menú"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Nav links — centered in lower half for thumb reach */}
                        <div className="flex-1 flex flex-col justify-center px-6 pb-8 space-y-1">
                            {[
                                {
                                    to: '/', label: t('nav.home'), active: isHome,
                                    onClick: (e) => { setIsMobileMenuOpen(false); if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }
                                },
                                { to: '/tours', label: t('nav.tours'), active: isTourList, badge: 'Expert Choice', onClick: () => setIsMobileMenuOpen(false) },
                                { to: '/nosotros', label: t('nav.about'), active: isAbout, onClick: () => setIsMobileMenuOpen(false) },
                                { to: '/guia-bali', label: t('nav.guide'), active: isBaliGuide, onClick: () => setIsMobileMenuOpen(false) },
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.to}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.07, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    <Link
                                        to={item.to}
                                        onClick={item.onClick}
                                        className="flex items-center justify-between py-5 group transition-all active:scale-98"
                                    >
                                        <div className="flex items-baseline gap-4">
                                            <span className={`text-2xl font-black tracking-tight transition-colors ${item.active ? 'text-primary' : 'text-gray-900 dark:text-white group-active:text-primary'
                                                }`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {item.badge && (
                                                <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.active && (
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Settings row — fixed at bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.3 }}
                            className="flex-shrink-0 px-6 pb-12 bg-gray-50/50 dark:bg-white/[0.02] border-t border-black/5 dark:border-white/10 pt-6"
                        >
                            <div className="flex gap-2">
                                {/* Language */}
                                <div className="flex flex-1 gap-1 bg-gray-100 dark:bg-white/5 rounded-2xl p-1.5">
                                    {['es', 'en'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => i18n.changeLanguage(lang)}
                                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${i18n.language.startsWith(lang)
                                                ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                                                : 'text-gray-400 dark:text-gray-500'
                                                }`}
                                        >
                                            {lang === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
                                        </button>
                                    ))}
                                </div>

                                {/* Currency */}
                                <div className="flex flex-1 gap-1 bg-gray-100 dark:bg-white/5 rounded-2xl p-1.5">
                                    {['EUR', 'USD'].map((cur) => (
                                        <button
                                            key={cur}
                                            onClick={() => { if (currency !== cur) toggleCurrency(); }}
                                            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${currency === cur
                                                ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                                                : 'text-gray-400 dark:text-gray-500'
                                                }`}
                                        >
                                            {cur === 'EUR' ? '€ EUR' : '$ USD'}
                                        </button>
                                    ))}
                                </div>

                                {/* Dark mode */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="w-14 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-2xl text-gray-500 dark:text-gray-400"
                                >
                                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};


export default Navbar;

