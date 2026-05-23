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

            {/* Category Filters */}
            <div className="mb-20 flex justify-center">
                <CategoryChips active={activeCategory} onSelect={setActiveCategory} />
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

            {/* Tour Finder & Coming Soon (Side-by-side on desktop) */}
            <div className="grid md:grid-cols-2 gap-10 mt-32 items-stretch">
                <TourFinder />

                {/* Coming Soon Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-primary/20 dark:border-white/10 bg-primary/5 dark:bg-white/5 p-8 md:p-12 flex flex-col items-center text-center justify-center group hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-500 shadow-xl shadow-black/5 min-h-[350px]"
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />

                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                            <Compass size={32} />
                        </div>
                        <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black tracking-widest uppercase mb-4 border border-primary/20">
                            {t('tours.coming_soon.badge')}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
                            {t('tours.coming_soon.title')}
                        </h3>
                        <p className="text-gray-650 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                            {t('tours.coming_soon.description')}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Guide 2026 CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-32 relative group"
            >
                <div className="bg-white dark:bg-surface-dark rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center border border-black/5 dark:border-white/5 shadow-2xl transition-all duration-500 hover:shadow-primary/10 relative isolate">
                    {/* Decorative glows inside the card (contained, no clipping issues) */}
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/15 rounded-full blur-[80px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/15 rounded-full blur-[80px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                    <div className="flex-1 p-10 md:p-16 text-center md:text-left relative z-10">
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

                    <div className="md:w-2/5 w-full aspect-[4/3] md:aspect-auto self-stretch relative overflow-hidden z-10">
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
