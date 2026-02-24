import React from 'react';
import { Clock, Users, Languages, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../utils/i18nUtils';
import { useCurrency } from '../context/CurrencyContext';
const TourCard = ({ tour, index }) => {
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency();
    const l = (field) => getLocalized(tour, field, i18n.language);
    const price = formatPrice(tour.price);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
            }}
            className="glass-card motion-safe overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
        >
            <div className="relative h-72 overflow-hidden">
                <img
                    src={tour.image}
                    alt={`${l('title')} - ${l('description')}`}
                    width="800"
                    height="600"
                    loading={index > 2 ? "lazy" : "eager"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                    <Star size={12} className="text-accent fill-accent" />
                    <span>4.9</span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                        {l('badge')}
                    </span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-3 group-hover:text-primary-dark transition-colors leading-tight">{l('title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 text-sm leading-relaxed">
                    {l('description')}
                </p>

                <div className="grid grid-cols-2 gap-y-4 mb-8">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark">
                            <Clock size={14} />
                        </div>
                        <span>{l('duration')}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark">
                            <Languages size={14} />
                        </div>
                        <span>{i18n.language.startsWith('es') ? 'Español/Inglés' : 'ES / EN Guide'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark">
                            <Star size={14} className="fill-primary/20" />
                        </div>
                        <span>{i18n.language.startsWith('es') ? 'Tour Privado' : 'Private Tour'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark">
                            <Users size={14} />
                        </div>
                        <span>{i18n.language.startsWith('es') ? '1-5 pasajeros' : '1-5 passengers'}</span>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div>
                        <span className="text-sm text-gray-400 block mb-1">{t('tours.from')}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-bg-dark dark:text-bg-light">{price.symbol}{price.amount}</span>
                        </div>
                    </div>
                    <Link
                        to={`/tour/${tour.id}`}
                        className="px-6 py-3 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-all active:scale-95 bg-gradient-to-r from-primary to-[#109db8] text-white selection:bg-white/20"
                    >
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
                            <span className="hidden md:inline">{t('detail.view_details')}</span>
                            <span className="md:hidden">{t('detail.view_details_short')}</span>
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default TourCard;
