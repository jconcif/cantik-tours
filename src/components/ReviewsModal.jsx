import React from 'react';
import { X, Star, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../utils/i18nUtils';

const ReviewsModal = ({ isOpen, onClose, tourTitle, reviews = [] }) => {
    const { t, i18n } = useTranslation();
    const l = (obj, field) => getLocalized(obj, field, i18n.language);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-black/5 dark:border-white/10"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#1a1a1a] z-10">
                            <div>
                                <h3 className="text-xl font-black">{t('common.reviews_title')}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('common.reviews_about')} {tourTitle}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable List */}
                        <div className="overflow-y-auto p-6 space-y-4">
                            {reviews.map((review, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0 border border-primary/5">
                                                {review.name ? review.name[0].toUpperCase() : 'U'}
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                                    <h4 className="font-bold text-sm leading-none">{review.name}</h4>
                                                    {review.ig_user && (review.authorized || review.autorizacion_fotos == 1) && (
                                                        <span className="flex items-center gap-1 text-[9px] text-pink-500 font-black bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-100 dark:border-pink-500/20">
                                                            <Instagram size={8} />
                                                            @{review.ig_user.replace('@', '')}
                                                        </span>
                                                    )}
                                                    {review.pais && (
                                                        <span className="text-[9px] text-gray-400 font-bold bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                                                            {(() => {
                                                                const flags = { ar: '🇦🇷', cl: '🇨🇱', co: '🇨🇴', es: '🇪🇸', mx: '🇲🇽', pe: '🇵🇪', uy: '🇺🇾', us: '🇺🇸' };
                                                                const flag = flags[review.pais] || '🌐';
                                                                // Use a fallback if translation doesn't exist to prevent crash
                                                                let countryName = '';
                                                                try {
                                                                    countryName = t(`reviews_page.form.countries.${review.pais}`);
                                                                } catch (e) {
                                                                    countryName = review.pais.toUpperCase();
                                                                }
                                                                return `${flag} ${countryName}`;
                                                            })()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5 text-yellow-500">
                                            {[...Array(5)].map((_, stars) => (
                                                <Star key={stars} size={14} fill={stars < (review.rating || 5) ? "currentColor" : "none"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"{l(review, 'text')}"</p>
                                </div>
                            ))}
                        </div>

                        {/* Footer decorative */}
                        <div className="p-4 border-t border-black/5 dark:border-white/10 text-center bg-gray-50 dark:bg-white/5">
                            <p className="text-xs text-gray-400 font-medium">
                                {t('common.reviews_showing')} {reviews.length} {t('common.reviews_verified')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReviewsModal;
