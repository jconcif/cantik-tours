import React from 'react';
import { X, Star } from 'lucide-react';
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
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-bg-dark rounded-[2rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-white dark:bg-bg-dark z-10">
                            <div>
                                <h3 className="text-xl font-black">{t('common.reviews_title')}</h3>
                                <p className="text-sm text-gray-600 font-medium">{t('common.reviews_about')} {tourTitle}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable List */}
                        <div className="overflow-y-auto p-6 space-y-4">
                            {reviews.map((review, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                                                {review.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{review.name}</h4>
                                                <span className="text-xs text-gray-400">
                                                    {i18n.language.startsWith('es') ? review.date : review.date_en}
                                                </span>
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
                        <div className="p-4 border-t border-black/5 dark:border-white/5 text-center bg-gray-50 dark:bg-black/20">
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
