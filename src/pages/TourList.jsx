import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { Search, Sparkles, Map, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours as allTours } from '../data/tours';
import CategoryChips from '../components/CategoryChips';
import { useTranslation } from 'react-i18next';
import BookingModal from '../components/BookingModal';

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
            className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
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

                        {/* Custom Itinerary Card
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative overflow-hidden rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 flex flex-col items-center text-center justify-center group hover:bg-primary/10 transition-all duration-500"
                        >
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                <Map size={40} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">{t('tours.custom.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8">
                                {t('tours.custom.description')}
                            </p>
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {t('tours.custom.btn')}
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>
                        */}
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
                        <Link
                            to="/guia-bali"
                            className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-lg group/btn shadow-xl"
                        >
                            {t('nav.view_guide')}
                            <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="md:w-2/5 w-full aspect-[4/3] md:aspect-auto self-stretch relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80"
                            alt="Guía Bali 2026"
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
