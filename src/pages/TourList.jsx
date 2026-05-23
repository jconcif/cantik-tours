import LocalLink from '../components/LocalLink';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { Search, Sparkles, Map, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours as allTours } from '../data/tours';
import CategoryChips from '../components/CategoryChips';
import { useTranslation } from 'react-i18next';
import BookingModal from '../components/BookingModal';
import TourFinder from '../components/TourFinder';

const TourList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('todos');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.title = `${t('nav.tours')} | Cantik Tours Bali`;
    }, [t]);

    const filteredTours = allTours
        .filter(tour => {
            const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tour.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'todos' ||
                (Array.isArray(tour.category) ? tour.category.includes(activeCategory) : tour.category === activeCategory);
            const isNotTransfer = !tour.isTransfer;

            return matchesSearch && matchesCategory && isNotTransfer;
        });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen overflow-x-hidden"
        >
            <div className="mb-20 text-center max-w-3xl mx-auto">
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest mb-6 border border-primary/20"
                >
                    <Sparkles size={14} /> {t('tours.badge')}
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter"
                >
                    {t('tours.title')} <span className="text-primary italic">{t('tours.title_accent')}</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed"
                >
                    {t('tours.subtitle')}
                </motion.p>
            </div>

            {/* Tour Finder Recommendation Quiz */}
            <TourFinder />

            {/* Search & Filters */}
            <div className="space-y-10 mb-20">
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('tours.search_placeholder')}
                            className="w-full pl-16 pr-8 py-6 rounded-3xl bg-white dark:bg-gray-800 border-none outline-none focus:ring-2 ring-primary/50 shadow-2xl shadow-black/5 transition-all text-xl font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600"
                        />
                    </div>
                </div>

                {/* Category Chips */}
                <div className="flex justify-center">
                    <CategoryChips active={activeCategory} onSelect={setActiveCategory} />
                </div>
            </div>

            <AnimatePresence mode="popLayout">
                {filteredTours.length > 0 ? (
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {filteredTours.map((tour, index) => (
                            <TourCard key={tour.id} tour={tour} index={index} />
                        ))}

                        {/* Coming Soon Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-primary/20 dark:border-white/10 bg-primary/5 dark:bg-white/5 p-8 flex flex-col items-center text-center justify-between group hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-500 shadow-xl shadow-black/5"
                        >
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />

                            <div className="flex flex-col items-center flex-1 justify-center py-6">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                                    <Compass size={32} />
                                </div>
                                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black tracking-widest uppercase mb-4 border border-primary/20">
                                    {t('tours.coming_soon.badge')}
                                </span>
                                <h3 className="text-2xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
                                    {t('tours.coming_soon.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                                    {t('tours.coming_soon.description')}
                                </p>
                            </div>
                            
                            <a
                                href={`https://wa.me/34642517787?text=${encodeURIComponent(
                                    i18n.language.startsWith('es')
                                        ? '¡Hola Cantik Tours! He visto que próximamente tendréis tours en Nusa Penida y Lombok, y me gustaría recibir información al respecto.'
                                        : 'Hello Cantik Tours! I saw that you will soon offer tours in Nusa Penida and Lombok, and I would like to receive details about them.'
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 shadow-md shadow-primary/20"
                            >
                                {t('tours.coming_soon.btn')}
                                <ArrowRight size={16} />
                            </a>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-32 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10"
                    >
                        <Search className="mx-auto text-gray-300 mb-6" size={64} />
                        <p className="text-2xl font-black text-gray-400">{t('tours.no_matches')}</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            {t('tours.see_all')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Guide 2026 CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-32 relative group"
            >
                {/* Decorative glows */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="bg-white dark:bg-surface-dark rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center border border-black/5 dark:border-white/5 shadow-2xl transition-all duration-500 hover:shadow-primary/10">
                    <div className="flex-1 p-10 md:p-16 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest mb-6 border border-primary/20">
                            <BookOpen size={14} /> {t('guide.badge')}
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
                            <span className="text-gradient inline-block mr-2">{t('guide.title')}</span>
                            <span className="italic">{t('guide.title_accent')}</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed">
                            {t('guide.subtitle')}
                        </p>
                        <LocalLink
                            to="/guia-bali"
                            className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-lg group/btn shadow-xl"
                        >
                            {t('nav.view_guide')}
                            <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                        </LocalLink>
                    </div>

                    <div className="md:w-2/5 w-full aspect-[4/3] md:aspect-auto self-stretch relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80"
                            alt="Bali Guía 2026"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                        />
                        {/* More subtle gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-dark via-transparent to-transparent md:bg-gradient-to-r md:w-32" />
                    </div>
                </div>
            </motion.div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tourTitle={t('tours.custom.title')}
            />
        </motion.div>
    );
};

export default TourList;
