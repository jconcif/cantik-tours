import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice }) => {
    const { t, i18n } = useTranslation();
    const [showCoupon, setShowCoupon] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        pax: '2',
        hotel: '',
        coupon: '',
        experience: 'comfort' // Default to middle tier for anchoring
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.experience) {
            alert(i18n.language.startsWith('es') ? "Por favor selecciona un nivel de experiencia." : "Please select an experience level.");
            return;
        }

        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);

        let expName;
        let extraPrice = 0;

        switch (formData.experience) {
            case 'economy':
                expName = t('detail.exp_economy_title');
                extraPrice = 0;
                break;
            case 'comfort':
                expName = t('detail.exp_comfort_title');
                extraPrice = 10;
                break;
            case 'elite':
                expName = t('detail.exp_elite_title');
                extraPrice = 25;
                break;
            default:
                expName = '';
        }

        const basePrice = tourPrice || 0;
        const totalPrice = basePrice + extraPrice;

        const message = `¡Hola Cantik Tours!
Me gustaría reservar este tour, por favor:

🛕 ${t('detail.msg_tour')}: ${tourTitle}
📅 ${t('detail.msg_date')}: ${formData.date}
👥 ${t('detail.msg_pax')}: ${paxLabel}
🏨 ${t('detail.msg_hotel')}: ${formData.hotel}
✨ Experiencia: ${expName}

💰 ${i18n.language === 'en' ? 'Estimated Price' : 'Precio estimado'}: ${totalPrice} € (${basePrice} €${extraPrice > 0 ? ` + ${extraPrice} € Extra` : ''})${showCoupon && formData.coupon ? `\n🎟️ ${t('detail.msg_coupon')}: ${formData.coupon}` : ''}

¿Me pueden confirmar disponibilidad y próximos pasos?
¡Muchas gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/376614535?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const inputClasses = "w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-gray-700 dark:text-gray-200 min-h-[62px] block box-border";

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

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-6 flex justify-between items-center border-b border-primary/5">
                            <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t('detail.booking_title')}</h3>
                            <button
                                onClick={onClose}
                                aria-label={t('common.close') || "Cerrar"}
                                className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white flex items-center justify-center transition-colors"
                            >
                                <X size={20} className="text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">

                            {/* Date Input */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="booking-date"
                                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer"
                                >
                                    <Calendar size={14} className="text-primary" />
                                    {t('detail.booking_date')}
                                </label>
                                <input
                                    id="booking-date"
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className={`${inputClasses} appearance-none block w-full relative`}
                                />
                            </div>

                            {/* Pax Input */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="booking-pax"
                                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer"
                                >
                                    <Users size={14} className="text-primary" />
                                    {t('detail.booking_pax')}
                                </label>
                                <select
                                    id="booking-pax"
                                    value={formData.pax}
                                    onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                                    className={`${inputClasses} appearance-none block w-full cursor-pointer`}
                                >
                                    <option value="1">{t('detail.booking_pax_1')}</option>
                                    <option value="2">{t('detail.booking_pax_2')}</option>
                                    <option value="3">{t('detail.booking_pax_3')}</option>
                                    <option value="4">{t('detail.booking_pax_4')}</option>
                                    <option value="5">{t('detail.booking_pax_5')}</option>
                                    <option value="6 o más">{t('detail.booking_pax_6')}</option>
                                    <option value="12 o más">{t('detail.booking_pax_12')}</option>
                                    <option value="20 o más">{t('detail.booking_pax_20')}</option>
                                </select>
                            </div>

                            {/* Hotel Input */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="booking-hotel"
                                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer"
                                >
                                    <MapPin size={14} className="text-primary" />
                                    {t('detail.booking_hotel')}
                                </label>
                                <input
                                    id="booking-hotel"
                                    type="text"
                                    required
                                    placeholder={t('detail.booking_hotel_placeholder')}
                                    value={formData.hotel}
                                    onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                    className={`${inputClasses} block w-full`}
                                />
                            </div>

                            {/* Experience Tiers Input */}
                            <div className="space-y-4 pt-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    <Star size={14} className="text-primary" />
                                    {t('detail.booking_experience')}
                                </label>
                                <div className="grid gap-3">
                                    {/* Economy */}
                                    <label className={`relative flex items-start p-4 rounded-2xl border-2 transition-all cursor-pointer group ${formData.experience === 'economy' ? 'border-gray-400 bg-gray-50 dark:bg-white/5 shadow-md shadow-gray-200/50 dark:shadow-none z-10' : 'border-black/5 dark:border-white/5 bg-transparent hover:border-gray-200 opacity-80 hover:opacity-100'}`}>
                                        <input type="radio" name="experience" value="economy" checked={formData.experience === 'economy'} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="sr-only" />
                                        <div className="mt-0.5 mr-3 flex-shrink-0">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.experience === 'economy' ? 'border-gray-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                                {formData.experience === 'economy' && <div className="w-2 h-2 rounded-full bg-gray-500" />}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`block text-xs font-black uppercase tracking-wide transition-colors ${formData.experience === 'economy' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                                                    {t('detail.exp_economy_title')}
                                                </span>
                                                <span className="text-sm font-black text-gray-900 dark:text-gray-100">{tourPrice}€</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 block mb-1">{t('detail.exp_economy_sub')}</span>
                                            <span className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-snug block">{t('detail.exp_economy_desc')}</span>
                                        </div>
                                    </label>

                                    {/* Comfort (Default / Recommended) */}
                                    <label className={`relative flex items-start p-4 rounded-2xl border-2 transition-all cursor-pointer group ${formData.experience === 'comfort' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 z-10' : 'border-black/5 dark:border-white/5 bg-transparent hover:border-gray-200 opacity-80 hover:opacity-100'}`}>
                                        <input type="radio" name="experience" value="comfort" checked={formData.experience === 'comfort'} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="sr-only" />
                                        <div className="absolute -top-2.5 right-4 bg-primary text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">
                                            Recomendado
                                        </div>
                                        <div className="mt-0.5 mr-3 flex-shrink-0">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.experience === 'comfort' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                                                {formData.experience === 'comfort' && <div className="w-2 h-2 rounded-full bg-primary" />}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`block text-xs font-black uppercase tracking-wide transition-colors ${formData.experience === 'comfort' ? 'text-primary' : 'text-gray-500'}`}>
                                                    {t('detail.exp_comfort_title')}
                                                </span>
                                                <span className="text-sm font-black text-primary">{tourPrice + 10}€</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 block mb-1">{t('detail.exp_comfort_sub')}</span>
                                            <span className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-snug block">{t('detail.exp_comfort_desc')}</span>
                                        </div>
                                    </label>

                                    {/* Elite */}
                                    <label className={`relative flex items-start p-4 rounded-2xl border-2 transition-all cursor-pointer group ${formData.experience === 'elite' ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg shadow-[#D4AF37]/10 z-10' : 'border-black/5 dark:border-white/5 bg-transparent hover:border-gray-200 opacity-80 hover:opacity-100'}`}>
                                        <input type="radio" name="experience" value="elite" checked={formData.experience === 'elite'} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="sr-only" />
                                        <div className="mt-0.5 mr-3 flex-shrink-0">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.experience === 'elite' ? 'border-[#D4AF37]' : 'border-gray-300 dark:border-gray-600'}`}>
                                                {formData.experience === 'elite' && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`block text-xs font-black uppercase tracking-wide transition-colors ${formData.experience === 'elite' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                                                    {t('detail.exp_elite_title')}
                                                </span>
                                                <span className="text-sm font-black text-[#D4AF37]">{tourPrice + 25}€</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 block mb-1">{t('detail.exp_elite_sub')}</span>
                                            <span className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-snug block">{t('detail.exp_elite_desc')}</span>

                                            <AnimatePresence>
                                                {formData.experience === 'elite' && (
                                                    <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 12 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="overflow-hidden">
                                                        <div className="p-3 md:p-3.5 rounded-xl bg-[#D4AF37]/10 text-[#B8860B] dark:text-[#D4AF37] text-[10px] md:text-xs font-bold leading-relaxed border border-[#D4AF37]/20">
                                                            {t('detail.exp_elite_warning')}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Coupon Toggle and Input */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCoupon(!showCoupon)}
                                    className="flex items-center gap-2 text-[10px] font-black text-gray-600 hover:text-primary transition-colors uppercase tracking-widest"
                                    aria-expanded={showCoupon}
                                >
                                    <Ticket size={14} className={showCoupon ? 'text-secondary' : 'text-gray-400'} />
                                    {t('detail.coupon')}
                                </button>

                                <AnimatePresence>
                                    {showCoupon && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-3">
                                                <label htmlFor="booking-coupon" className="sr-only">{t('detail.coupon')}</label>
                                                <input
                                                    id="booking-coupon"
                                                    type="text"
                                                    placeholder={t('detail.coupon_placeholder')}
                                                    value={formData.coupon}
                                                    onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>


                            <button
                                type="submit"
                                className="w-full btn-primary py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-4"
                            >
                                <MessageCircle size={24} />
                                {t('detail.booking_submit')}
                            </button>

                            <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest opacity-80 leading-relaxed px-4">
                                {t('detail.booking_payment_info')}
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
