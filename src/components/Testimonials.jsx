import React, { useState, useEffect } from 'react';
import { Star, Quote, User, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t, i18n } = useTranslation();
    const [apiReviews, setApiReviews] = useState([]);

    // Get testimonials data from translations
    const testimonialData = t('testimonials.data', { returnObjects: true }) || [];

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/get_reviews.php');
                const result = await response.json();
                if (result.status === 'success' && result.data) {
                    // Map API fields to match component needs
                    const formatted = result.data.map(r => ({
                        name: r.nombre,
                        text: r.comentario,
                        location: r.tour_id,
                        country: r.pais || 'es',
                        stars: parseInt(r.estrellas),
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
    // Ideal: 6 reviews for a perfect 3-column grid (2 rows)
    let allReviews = [];
    if (apiReviews.length >= 3) {
        // Si tenemos 3 o más reales, mostramos solo las reales (hasta 6)
        allReviews = apiReviews.slice(0, 6);
    } else {
        // Si hay pocas reales, las mezclamos con las estáticas para no dejar huecos
        allReviews = [...apiReviews, ...testimonialData].slice(0, 6);
    }

    const images = [
        "/images/testimonials/testimonial_1.webp",
        "/images/testimonials/testimonial_2.webp",
        "/images/testimonials/testimonial_3.webp",
        "/images/testimonials/testimonial_4.webp",
        "/images/testimonials/testimonial_5.webp"
    ];

    if (!allReviews.length) return null;

    return (
        <section className="py-24 px-6 bg-gray-50 dark:bg-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">{t('testimonials.badge')}</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        {t('testimonials.title')} <span className="text-primary italic">{t('testimonials.title_accent')}</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('testimonials.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allReviews.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl shadow-black/5 relative border border-black/5 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20 rotate-180" size={40} />

                            <div className="flex items-center gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < (item.stars || 5) ? "currentColor" : "transparent"}
                                        className={i < (item.stars || 5) ? "" : "text-gray-300 dark:text-gray-600"}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 relative z-10 italic">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-gray-400" size={24} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="font-bold text-gray-900 dark:text-white leading-none">{item.name}</h4>
                                        {item.ig_user && item.authorized && (
                                            <span className="flex items-center gap-1 text-[9px] text-pink-500 font-bold bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-100 dark:border-pink-500/20">
                                                <Instagram size={8} />
                                                @{item.ig_user.replace('@', '')}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">
                                        {(() => {
                                            if (item.country) {
                                                const flags = { ar: '🇦🇷', cl: '🇨🇱', co: '🇨🇴', es: '🇪🇸', mx: '🇲🇽', pe: '🇵🇪', uy: '🇺🇾', us: '🇺🇸' };
                                                const flag = flags[item.country] || '🌐';
                                                const countryName = t(`reviews_page.form.countries.${item.country}`);
                                                const tourName = i18n.exists(`reviews_page.form.tours.${item.location}`)
                                                    ? t(`reviews_page.form.tours.${item.location}`)
                                                    : item.location;
                                                return `${flag} ${countryName} • ${tourName}`;
                                            }
                                            return item.location;
                                        })()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
