import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star, Heart, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateStatus, isDateDisabled } from '../data/availability';
import { PayPalButtons } from "@paypal/react-paypal-js";

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice }) => {
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency();
    const [step, setStep] = useState(1);
    const [isPaid, setIsPaid] = useState(false);
    const [viewBankDetails, setViewBankDetails] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [showCoupon, setShowCoupon] = useState(false);
    const [formData, setFormData] = useState({
        date: null,
        pax: '2',
        hotel: '',
        coupon: '',
        experience: 'comfort', // Default to middle tier for anchoring
        paymentType: 'full' // 'deposit' or 'full'
    });

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const resetModal = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setIsPaid(false);
            setFormData({
                date: null,
                pax: '2',
                hotel: '',
                coupon: '',
                experience: 'comfort',
                paymentType: 'full'
            });
            setViewBankDetails(false);
            setCopiedField(null);
        }, 500);
    };

    const basePrice = tourPrice || 0;
    let extraPrice = 0;
    let expName = '';
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
    const totalPrice = basePrice + extraPrice;
    
    // Updated to 30% deposit rule
    const calculatedDeposit = Math.max(20, Math.round(totalPrice * 0.3));
    const depositAmount = formData.paymentType === 'full' ? totalPrice : calculatedDeposit;
    const remainingAmount = totalPrice - depositAmount;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Si estamos en el paso 1, y la validacion HTML pasó, vamos al paso 2
        if (step === 1) {
            setStep(2);
            return;
        }

        // Paso 2: Validar experiencia y pasar al 3
        if (step === 2) {
            if (!formData.experience) {
                alert(i18n.language.startsWith('es') ? "Por favor selecciona un nivel de experiencia." : "Please select an experience level.");
                return;
            }
            setStep(3);
            return;
        }

        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);



        const message = `¡Hola Cantik Tours!
Me gustaría reservar este tour, por favor:

🛕 ${t('detail.msg_tour')}: ${tourTitle}
📅 ${t('detail.msg_date')}: ${formData.date ? formData.date.toLocaleDateString('es-ES') : ''}
👥 ${t('detail.msg_pax')}: ${paxLabel}
🏨 ${t('detail.msg_hotel')}: ${formData.hotel}
✨ Experiencia: ${expName}

💶 ${i18n.language === 'en' ? 'Estimated Total' : 'Total estimado'}: ${totalPrice} €
${isPaid ? `✅ ${i18n.language === 'en' ? 'Deposit PAID via PayPal:' : 'Depósito PAGADO por PayPal:'} ${depositAmount} €` : `(${i18n.language === 'en' ? 'Deposit to pay:' : 'Reserva:'} ${depositAmount} €)`}${showCoupon && formData.coupon ? `\n🎟️ ${t('detail.msg_coupon')}: ${formData.coupon}` : ''}

${isPaid ? (i18n.language === 'en' ? 'Attached is my payment confirmation. Looking forward to your details!' : '¡Acabo de pagar la reserva por PayPal! Quedo a la espera de la confirmación.') : '¿Me pueden confirmar disponibilidad y próximos pasos?'}
¡Muchas gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        resetModal();
    };

    const handleAlternativePayment = (e) => {
        e.preventDefault();
        setViewBankDetails(true);
    };

    const handleConfirmWhatsApp = () => {
        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);
        
        const message = `¡Hola Cantik Tours!
Me gustaría reservar este tour, por favor:

🛕 ${t('detail.msg_tour')}: ${tourTitle}
📅 ${t('detail.msg_date')}: ${formData.date ? formData.date.toLocaleDateString('es-ES') : ''}
👥 ${t('detail.msg_pax')}: ${paxLabel}
🏨 ${t('detail.msg_hotel')}: ${formData.hotel}
✨ Experiencia: ${expName}

💶 ${i18n.language === 'en' ? 'Estimated Total' : 'Total estimado'}: ${totalPrice} € (${i18n.language === 'en' ? 'Deposit:' : 'Reserva:'} ${depositAmount} €)${showCoupon && formData.coupon ? `\n🎟️ ${t('detail.msg_coupon')}: ${formData.coupon}` : ''}

${i18n.language === 'en' ? "I would like to pay the deposit via Wise or Bank transfer. Could you provide the account details?" : "Quiero reservar pero me gustaría abonar el depósito por transferencia bancaria (IBAN) o Wise. ¿Me pasáis la cuenta?"}
¡Muchas gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        resetModal();
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
                        onClick={resetModal}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-6 flex flex-col gap-2 border-b border-primary/5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-primary uppercase tracking-tight">
                                    {t('detail.booking_title')}
                                </h3>
                                <button
                                    onClick={resetModal}
                                    aria-label={t('common.close') || "Cerrar"}
                                    className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white flex items-center justify-center transition-colors"
                                >
                                    <X size={20} className="text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                            {/* Progress Indicator */}
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 bg-primary`} />
                                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-primary' : 'bg-primary/20 dark:bg-white/10'}`} />
                                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step === 3 ? 'bg-primary' : 'bg-primary/20 dark:bg-white/10'}`} />
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar overflow-x-hidden">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Date Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="booking-date" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer">
                                                <Calendar size={14} className="text-primary" />
                                                {t('detail.booking_date')}
                                            </label>
                                            <DatePicker
                                                id="booking-date"
                                                selected={formData.date}
                                                onChange={(date) => setFormData({ ...formData, date })}
                                                minDate={new Date()}
                                                filterDate={(date) => !isDateDisabled(date)}
                                                dayClassName={(date) => {
                                                    const status = getDateStatus(date);
                                                    return status === 'yellow' ? 'custom-day-yellow' : (status === 'red' ? 'custom-day-red' : 'custom-day-green');
                                                }}
                                                dateFormat="dd/MM/yyyy"
                                                required
                                                className={`${inputClasses} appearance-none block w-[100%] relative`}
                                                wrapperClassName="w-full"
                                            />
                                        </div>

                                        {/* Pax Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="booking-pax" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer">
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
                                            <label htmlFor="booking-hotel" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer">
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
                                            className="w-full btn-primary py-4 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-6"
                                        >
                                            Siguiente
                                            <ArrowRight size={20} />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Brief Summary of Step 1 */}
                                        <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <Calendar size={14} className="text-primary" />
                                                <span>{formData.date ? formData.date.toLocaleDateString(i18n.language === 'en' ? 'en-GB' : 'es-ES') : '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <Users size={14} className="text-primary" />
                                                <span>{t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`)}</span>
                                            </div>
                                        </div>

                                        {/* Experience Tiers Input */}
                                        <div className="space-y-4">
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
                                                            <span className="text-sm font-black text-gray-900 dark:text-gray-100">{(() => { const p = formatPrice(tourPrice); return `${p.symbol}${p.amount}`; })()}</span>
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
                                                            <span className="text-sm font-black text-primary">{(() => { const p = formatPrice(tourPrice + 10); return `${p.symbol}${p.amount}`; })()}</span>
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
                                                            <span className="text-sm font-black text-[#D4AF37]">{(() => { const p = formatPrice(tourPrice + 25); return `${p.symbol}${p.amount}`; })()}</span>
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

                                        {/* Expert UX: Real-time price update to avoid sticker shock */}
                                        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between mt-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-primary uppercase tracking-wider">{i18n.language === 'en' ? 'Total Price Estimated' : 'Precio Total Estimado'}</span>
                                                <span className="text-[9px] text-gray-500 font-bold">{i18n.language === 'en' ? 'Per vehicle up to 5 pax' : 'Por vehículo hasta 5 pax'}</span>
                                            </div>
                                            <div className="text-2xl font-black text-primary flex items-center gap-1">
                                                {totalPrice}
                                                <span className="text-xs">€</span>
                                            </div>
                                        </div>

                                        {/* Navigation Buttons for Step 2 */}
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="w-16 flex-none bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
                                                aria-label="Volver"
                                            >
                                                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 btn-primary py-4 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                                            >
                                                Siguiente
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Final Summary Card */}
                                        <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-3xl border border-black/5 dark:border-white/5 space-y-4 shadow-inner">
                                            <div className="border-b border-black/5 dark:border-white/5 pb-4">
                                                <h4 className="text-sm font-black text-primary mb-3">Resumen del Viaje</h4>
                                                <ul className="text-xs font-bold text-gray-600 dark:text-gray-300 space-y-2">
                                                    <li className="flex justify-between">
                                                        <span>Tour:</span>
                                                        <span className="text-right max-w-[60%] truncate">{tourTitle}</span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                        <span>Fecha:</span>
                                                        <span>{formData.date ? formData.date.toLocaleDateString(i18n.language === 'en' ? 'en-GB' : 'es-ES') : '-'}</span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                        <span>Pasajeros:</span>
                                                        <span>{t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`)}</span>
                                                    </li>
                                                    <li className="flex justify-between text-primary-dark">
                                                        <span>Experiencia:</span>
                                                        <span>{expName}</span>
                                                    </li>
                                                    {formData.hotel && (
                                                    <li className="flex justify-between">
                                                        <span>Hotel:</span>
                                                        <span className="text-right max-w-[60%] truncate">{formData.hotel}</span>
                                                    </li>
                                                    )}
                                                </ul>
                                            </div>
                                            
                                            <div className="pt-2">
                                                <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl mb-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, paymentType: 'full' })}
                                                        className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.paymentType === 'full' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-gray-500'}`}
                                                    >
                                                        {i18n.language === 'en' ? 'PAY 100% TOTAL' : 'ABONAR TOTAL (100%)'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, paymentType: 'deposit' })}
                                                        className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.paymentType === 'deposit' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-gray-500'}`}
                                                    >
                                                        {i18n.language === 'en' ? 'PAY 30% DEPOSIT' : 'ABONAR RESERVA (30%)'}
                                                    </button>
                                                </div>

                                                <h4 className="text-sm font-black text-primary mb-3">Detalle de Pago</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center bg-white dark:bg-black/20 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                                                        <span className="text-xs font-bold text-gray-500">Valor Total</span>
                                                        <span className="text-base font-black text-gray-900 dark:text-white">{totalPrice} €</span>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center bg-primary/10 border border-primary/20 p-3 rounded-xl">
                                                        <div>
                                                            <span className="block text-xs font-black text-primary">
                                                                {formData.paymentType === 'full' ? (i18n.language === 'en' ? 'Total to pay' : 'Total a pagar') : (i18n.language === 'en' ? 'Deposit (30%)' : 'Abonar ahora (30%)')}
                                                            </span>
                                                            <span className="block text-[10px] text-gray-500">
                                                                {isPaid ? (i18n.language === 'en' ? 'Paid with PayPal' : 'Pagado con PayPal') : 'Vía PayPal o Tarjeta'}
                                                            </span>
                                                        </div>
                                                        <span className="text-lg font-black text-primary">{depositAmount} €</span>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center p-3">
                                                        <span className="text-xs font-bold text-gray-500">{isPaid ? "Pagado ✓" : (i18n.language === 'en' ? "Remaining balance (48h before)" : "Pago Restante (48h antes del viaje)")}</span>
                                                        <span className="text-sm font-black text-gray-700 dark:text-gray-300">{remainingAmount} €</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="w-16 flex-none bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
                                                aria-label="Volver"
                                            >
                                                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                                            </button>
                                            {!isPaid ? (
                                                <div className="flex-1 flex flex-col gap-3 min-w-[200px]" style={{ zIndex: 0, position: 'relative' }}>
                                                    <PayPalButtons 
                                                        style={{ layout: "horizontal", shape: "pill", color: "gold", label: "pay", height: 55, tagline: false }}
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [{
                                                                    description: formData.paymentType === 'full' ? `Pago Total - Cantik Tours (${tourTitle.substring(0, 40)})` : `Reserva (30%) - Cantik Tours (${tourTitle.substring(0, 40)})`,
                                                                    amount: { value: depositAmount.toString() }
                                                                }]
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order.capture().then((details) => {
                                                                setIsPaid(true);
                                                            });
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleAlternativePayment(e)}
                                                        className="text-xs font-bold text-gray-500 hover:text-primary transition-colors text-center underline decoration-dashed underline-offset-4 mb-2"
                                                    >
                                                        {i18n.language === 'en' ? 'Or reserve paying via Wise / Bank transfer' : 'Quiero reservar por Transferencia Bancaria o Wise'}
                                                    </button>

                                                    {viewBankDetails && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 bg-white dark:bg-white/5 border-2 border-primary/20 rounded-2xl p-5 space-y-4 shadow-xl"
                                                        >
                                                            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-wider mb-2">
                                                                <Ticket size={14} />
                                                                {i18n.language === 'en' ? 'BANK TRANSFER DETAILS' : 'DATOS PARA TRANSFERENCIA'}
                                                            </div>
                                                            
                                                            <div className="space-y-3">
                                                                <div className="group relative">
                                                                    <span className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Nombre Titular</span>
                                                                    <div className="flex items-center justify-between bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-black/5">
                                                                        <span className="text-xs font-black truncate pr-2 italic">Javier Ignacio Contreras Cifuentes</span>
                                                                        <button onClick={() => copyToClipboard('Javier Ignacio Contreras Cifuentes', 'name')} className="text-primary hover:scale-110 transition-transform">
                                                                            {copiedField === 'name' ? <Heart size={14} fill="currentColor" /> : <Ticket size={14} />}
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="group relative">
                                                                    <span className="block text-[10px] font-bold text-gray-400 mb-1 uppercase text-primary font-black">Tu IBAN (Wise)</span>
                                                                    <div className="flex items-center justify-between bg-primary/5 p-2 rounded-lg border border-primary/20">
                                                                        <span className="text-xs font-black tracking-wider">BE97 9673 8690 2549</span>
                                                                        <button onClick={() => copyToClipboard('BE97 9673 8690 2549', 'iban')} className="text-primary hover:scale-110 transition-transform">
                                                                            {copiedField === 'iban' ? <Heart size={14} fill="currentColor" /> : <Ticket size={14} />}
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="group relative">
                                                                    <span className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Swift / BIC</span>
                                                                    <div className="flex items-center justify-between bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-black/5">
                                                                        <span className="text-xs font-black">TRWIBEB1XXX</span>
                                                                        <button onClick={() => copyToClipboard('TRWIBEB1XXX', 'bic')} className="text-primary hover:scale-110 transition-transform">
                                                                            {copiedField === 'bic' ? <Heart size={14} fill="currentColor" /> : <Ticket size={14} />}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p className="text-[9px] text-gray-500 italic mt-2 leading-relaxed">
                                                                {i18n.language === 'en' 
                                                                    ? 'Once done, send us the receipt via WhatsApp to block your dates.' 
                                                                    : 'Una vez realizada la transferencia, pulsa el botón de WhatsApp para enviarnos el comprobante.'}
                                                            </p>

                                                            <button
                                                                type="button"
                                                                onClick={handleConfirmWhatsApp}
                                                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl text-sm font-black shadow-lg flex items-center justify-center gap-2 transition-all mt-4"
                                                            >
                                                                <MessageCircle size={18} />
                                                                {i18n.language === 'en' ? 'CONFIRM VIA WHATSAPP' : 'CONFIRMAR POR WHATSAPP'}
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="flex-1 btn-primary py-4 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white"
                                                >
                                                    <MessageCircle size={24} />
                                                    {i18n.language === 'en' ? 'Send Receipt via WhatsApp' : 'Enviar recibo por WhatsApp'}
                                                </button>
                                            )}
                                        </div>

                                        {/* Expert UX: Cancellation Guarantee Shield */}
                                        <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 py-2 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                                            <Shield size={14} />
                                            {i18n.language === 'en' ? 'Free cancellation up to 48h before the trip' : 'Cancelación gratuita hasta 48h antes del viaje'}
                                        </div>

                                        {/* Trust Box: Pago Consciente */}
                                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center text-center gap-1.5 mt-4">
                                            <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-1">
                                                <Heart size={14} className="animate-pulse" />
                                                {t('detail.fair_payment_title')}
                                            </div>
                                            <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed opacity-90">
                                                {t('detail.fair_payment_desc')}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;

