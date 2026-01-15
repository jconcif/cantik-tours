import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Calendar, ArrowRight, Star } from 'lucide-react';
import BookingModal from './BookingModal';

const FinalCTA = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const whatsappLink = "https://wa.me/376614535?text=Hola%20Cantik%20Tours!%20Me%20interesa%20reservar%20un%20tour%20en%20Bali.";

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-bg-dark">
            {/* Soft decorative blobs to match the site's organic feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-6xl mx-auto">
                <div className="relative bg-white dark:bg-surface-dark rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5">

                    <div className="flex flex-col lg:flex-row items-stretch">

                        {/* Content Side */}
                        <div className="flex-1 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-6"
                            >
                                <Star size={14} className="fill-primary" />
                                {t('about.tag')}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight"
                            >
                                <span className="text-gradient hover:text-gradient-hover transition-all duration-500">
                                    {t('cta.title')}
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed"
                            >
                                {t('cta.subtitle')}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
                                >
                                    <Calendar size={20} />
                                    {t('cta.btn_availability')}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={20} />
                                    {t('cta.btn_whatsapp')}
                                    {/* Spacer to balance the icon and center text like the first button */}
                                    <div className="w-[20px]" />
                                </a>
                            </motion.div>

                            {/* Trust markers - more subtle now */}
                            <div className="mt-12 flex flex-wrap gap-6 border-t border-black/5 dark:border-white/5 pt-8">
                                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Guías Locales
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Soporte Personalizado
                                </div>
                            </div>
                        </div>

                        {/* Image Side - Balancing the layout */}
                        <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                            <img
                                src="/images/ubud.png"
                                alt="Beautiful Bali Landscape"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            />
                            {/* Overlay to blend image with content on mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-dark via-transparent to-transparent lg:hidden" />
                            {/* Subtle side overlay for desktop */}
                            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-surface-dark to-transparent hidden lg:block" />
                        </div>

                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tourTitle="Consulta General"
            />
        </section>
    );
};

export default FinalCTA;
