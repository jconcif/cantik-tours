import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice }) => {
    const { t, i18n } = useTranslation();
    const [showCoupon, setShowCoupon] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        pax: '2',
        hotel: '',
        coupon: '',
        language: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.language) {
            alert(t('detail.error_language_required') || "Por favor selecciona un idioma / Please select a language");
            return;
        }

        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);

        let langValue;
        if (i18n.language === 'en') {
            langValue = formData.language === 'es' ? 'Spanish' : 'English';
        } else {
            langValue = formData.language === 'es' ? 'Español' : 'Inglés';
        }

        const basePrice = tourPrice || 0;
        const extraPrice = formData.language === 'es' ? 15 : 0;
        const totalPrice = basePrice + extraPrice;

        const priceLabel = i18n.language === 'en' ? 'Price' : 'Precio';
        const extraLabel = i18n.language === 'en' ? 'Extra' : 'Extra'; // 'Extra' works for both, but good to be explicit

        const message = `Hola Cantik Tours 👋
Me gustaría reservar este tour, por favor:

🛕 ${t('detail.msg_tour')}: ${tourTitle}
📅 ${t('detail.msg_date')}: ${formData.date}
👥 ${t('detail.msg_pax')}: ${paxLabel}
🏨 ${t('detail.msg_hotel')}: ${formData.hotel}
🗣️ ${i18n.language === 'en' ? 'Preferred Language' : 'Idioma preferido'}: ${langValue}

💰 ${i18n.language === 'en' ? 'Estimated Price' : 'Precio estimado'}: ${totalPrice} € (${basePrice} €${extraPrice > 0 ? ` + ${extraPrice} € ${extraLabel}` : ''})${showCoupon && formData.coupon ? `\n🎟️ ${t('detail.msg_coupon')}: ${formData.coupon}` : ''}

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

                            {/* Language Input */}
                            <div className="space-y-4 pt-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    <Languages size={14} className="text-primary" />
                                    {t('detail.booking_language')}
                                </label>
                                <div className="grid gap-3">
                                    <label className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer group ${formData.language === 'en' ? 'border-primary bg-primary/5' : 'border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="language"
                                            value="en"
                                            checked={formData.language === 'en'}
                                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div className="flex-1">
                                            <span className={`block text-sm font-black uppercase tracking-wide ${formData.language === 'en' ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>
                                                {t('detail.lang_english')}
                                            </span>
                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mt-0.5">
                                                {t('detail.lang_english_desc')}
                                            </span>
                                        </div>
                                        {formData.language === 'en' && <div className="w-2 h-2 rounded-full bg-primary shadow-sm" />}
                                    </label>

                                    <label className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer group ${formData.language === 'es' ? 'border-primary bg-primary/5' : 'border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="language"
                                            value="es"
                                            checked={formData.language === 'es'}
                                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`block text-sm font-black uppercase tracking-wide ${formData.language === 'es' ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>
                                                    {t('detail.lang_spanish')}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mt-0.5">
                                                {t('detail.lang_spanish_desc')}
                                            </span>
                                        </div>
                                        {formData.language === 'es' && <div className="w-2 h-2 rounded-full bg-primary shadow-sm" />}
                                    </label>
                                </div>
                                <div className="text-[10px] text-gray-400 font-bold italic flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    {t('detail.availability_disclaimer')}
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
