import React, { useState, useEffect } from 'react';
import { Star, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ReviewsModal from './ReviewsModal';

const Testimonials = () => {
    const { t, i18n } = useTranslation();
    const [apiReviews, setApiReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get testimonials data from translations
    const testimonialData = t('testimonials.data', { returnObjects: true }) || [];

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/get_reviews.php');
                const result = await response.json();
                if (result.status === 'success' && result.data) {
                    // Map API fields to match component needs and modal needs
                    const formatted = result.data.map(r => ({
                        name: r.nombre,
                        text: r.comentario,
                        text_en: r.comentario_en,
                        location: r.tour_id,
                        country: r.pais || 'es',
                        pais: r.pais || 'es', // For ReviewsModal
                        stars: parseInt(r.estrellas),
                        rating: parseInt(r.estrellas), // For ReviewsModal
                        image: r.foto_url,
                        ig_user: r.ig_user,
                        authorized: r.autorizacion_fotos === "1" || r.autorizacion_fotos === 1
                    }));
                    setApiReviews(formatted);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    // Combine static and API reviews, prioritizing API ones if they exist
    const staticReviews = testimonialData.map((rev, idx) => ({
        ...rev,
        stars: 5,
        rating: 5,
        authorized: true,
        country: 'es',
        pais: 'es'
    }));

    let displayReviews = [];
    if (apiReviews.length >= 6) {
        displayReviews = apiReviews.slice(0, 6);
    } else {
        // Fill up to 6 with static reviews
        displayReviews = [...apiReviews, ...staticReviews].slice(0, 6);
    }

    if (!displayReviews.length) return null;

    return (
        <section className="py-24 px-6 bg-gray-50 dark:bg-black/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">{t('testimonials.badge')}</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                        {t('testimonials.title')} <span className="text-primary italic">{t('testimonials.title_accent')}</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('testimonials.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {displayReviews.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none relative border border-white/50 dark:border-white/5 hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Header: User Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-2xl shrink-0 border-2 border-primary/5">
                                        {item.name ? item.name[0].toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight text-lg">
                                            {item.name}
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                            {(item.location || item.country) && (() => {
                                                const countryCode = item.country || item.pais || 'es';
                                                const flags = { ar: '🇦🇷', cl: '🇨🇱', co: '🇨🇴', es: '🇪🇸', mx: '🇲🇽', pe: '🇵🇪', uy: '🇺🇾', us: '🇺🇸' };
                                                const flag = flags[countryCode] || '🌐';

                                                // Try to get country name, fallback to location
                                                let locationText = '';
                                                try {
                                                    locationText = t(`reviews_page.form.countries.${countryCode}`);
                                                } catch (e) {
                                                    locationText = item.location;
                                                }

                                                return <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">{flag} {locationText}</span>;
                                            })()}

                                            {/* Instagram Badge */}
                                            {item.ig_user && item.authorized && (
                                                <a
                                                    href={`https://instagram.com/${item.ig_user.replace('@', '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-500 hover:text-pink-600 transition-colors bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-md"
                                                >
                                                    <Instagram size={12} />
                                                    <span>@{item.ig_user.replace('@', '')}</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < (item.stars || 5) ? "#FBBF24" : "transparent"} // Amber-400
                                            className={i < (item.stars || 5) ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <div className="flex-grow">
                                    <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-7 italic relative mb-4">
                                        <span className="text-primary text-xl font-serif mr-1">"</span>
                                        {i18n.language.startsWith('es') ? item.text : (item.text_en || item.text)}
                                        <span className="text-primary text-xl font-serif ml-1">"</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* See All Button */}
                <div className="flex justify-center">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setIsModalOpen(true)}
                        className="group bg-white dark:bg-white/10 px-10 py-5 rounded-2xl border border-black/5 dark:border-white/10 font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/5 flex items-center gap-3"
                    >
                        {i18n.language.startsWith('es') ? 'Ver todas las reseñas' : 'View all reviews'}
                        <Star size={16} className="group-hover:rotate-45 transition-transform" />
                    </motion.button>
                </div>
            </div>

            {/* All Reviews Modal */}
            <ReviewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tourTitle="Cantik Tours"
                reviews={apiReviews.length > 0 ? apiReviews : staticReviews}
            />
        </section>
    );
};

export default Testimonials;
