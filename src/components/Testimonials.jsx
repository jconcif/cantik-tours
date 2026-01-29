import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t } = useTranslation();

    // Get testimonials data from translations
    const testimonialData = t('testimonials.data', { returnObjects: true }) || [];

    const images = [
        "/images/testimonials/testimonial_1.jpg",
        "/images/testimonials/testimonial_2.jpg",
        "/images/testimonials/testimonial_3.jpg"
    ];

    if (!testimonialData.length) return null;

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
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('testimonials.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialData.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl shadow-black/5 relative border border-black/5 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20 rotate-180" size={40} />

                            <div className="flex items-center gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 relative z-10 italic">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <img src={images[index % images.length]} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.location}</p>
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
