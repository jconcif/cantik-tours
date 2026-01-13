import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isDark, toggleDarkMode } = useDarkMode();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const textColorClass = scrolled || !isHome ? 'text-bg-dark dark:text-bg-light' : 'text-white';
    const navBackgroundClass = scrolled ? 'glass py-3 shadow-lg' : (isHome ? 'bg-transparent' : 'bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md shadow-sm');

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className={`sticky top-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${navBackgroundClass}`}>
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-extrabold tracking-tighter text-primary group-hover:scale-105 transition-transform">CANTIK</span>
                    <span className={`text-2xl font-light tracking-widest uppercase transition-colors ${scrolled || !isHome ? 'text-bg-dark dark:text-white' : 'text-white'}`}>Tours</span>
                </Link>

                <div className={`hidden md:flex items-center gap-8 font-semibold transition-colors ${textColorClass}`}>
                    <Link to="/" className="hover:text-primary transition-colors relative group py-2">
                        Inicio
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link to="/tours" className="hover:text-primary transition-colors relative group py-2">
                        Tours
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link to="/#nosotros" className="hover:text-primary transition-colors relative group py-2">
                        Nosotros
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${scrolled || !isHome
                            ? 'hover:bg-black/5 dark:hover:bg-white/5 ' + textColorClass
                            : 'hover:bg-white/10 text-white'
                            }`}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 ${textColorClass}`}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-white/95 dark:bg-bg-dark/95 backdrop-blur-xl pt-8 px-6 md:hidden flex flex-col"
                    >
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-bg-dark dark:text-bg-light"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 text-3xl font-black">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-bg-dark dark:text-bg-light hover:text-primary transition-colors border-b border-black/5 pb-6"
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/tours"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-bg-dark dark:text-bg-light hover:text-primary transition-colors border-b border-black/5 pb-6 flex items-center justify-between"
                            >
                                Tours <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold tracking-widest uppercase">Explorar</span>
                            </Link>
                            <Link
                                to="/#nosotros"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-bg-dark dark:text-bg-light hover:text-primary transition-colors pb-6"
                            >
                                Nosotros
                            </Link>
                        </div>

                        <div className="mt-auto mb-12">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Síguenos</p>
                            <div className="flex justify-center gap-6">
                                {/* Social icons could go here */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};


export default Navbar;
