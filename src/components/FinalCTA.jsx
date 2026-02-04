import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Compass, ArrowRight } from 'lucide-react';
import BookingModal from './BookingModal';

const FinalCTA = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const whatsappMessage = encodeURIComponent(t('common.whatsapp_message'));
    const whatsappLink = `https://wa.me/376614535?text=${whatsappMessage}`;

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-bg-dark">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-bg-light dark:bg-surface-dark rounded-[3rem] overflow-hidden shadow-xl border border-black/5 dark:border-white/5">

                    <div className="flex flex-col lg:flex-row items-stretch">

                        {/* Content Side */}
                        <div className="flex-1 p-10 md:p-16 lg:p-20 flex flex-col justify-center text-center lg:text-left">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight"
                            >
                                <span className="text-gradient">
                                    {t('cta.title')}
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed"
                            >
                                {t('cta.subtitle')}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
                            >
                                <Link
                                    to="/tours"
                                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
                                >
                                    <Compass size={20} />
                                    {t('cta.btn_availability')}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={20} />
                                    {t('cta.btn_whatsapp')}
                                </a>
                            </motion.div>
                        </div>

                        {/* Image Side */}
                        <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                            <img
                                src="images/ubud.png?v=2"
                                alt="Ubud Landscape"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    console.log('Error loading ubud.png, using Ubud Tegalalang fallback...');
                                    e.target.src = 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80';
                                }}
                            />
                            {/* Gradient overlays to blend */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-light dark:from-surface-dark via-transparent to-transparent lg:hidden" />
                            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-light dark:from-surface-dark to-transparent hidden lg:block" />
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
