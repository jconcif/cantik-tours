import React, { useState, useEffect } from 'react';
import TourCard from '../components/TourCard';
import { Search, Sparkles, Map, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours as allTours } from '../data/tours';
import CategoryChips from '../components/CategoryChips';
import { useTranslation } from 'react-i18next';
import BookingModal from '../components/BookingModal';

const TourList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('todos');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('nav.tours')} | Cantik Tours Bali`;
    }, [t]);

    const filteredTours = allTours.filter(tour => {
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
                    className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed"
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
                            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">
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

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tourTitle={t('tours.custom.title')}
            />
        </motion.div>
    );
};

export default TourList;
