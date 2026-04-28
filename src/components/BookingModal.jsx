import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star, Heart, ArrowRight, ArrowLeft, Shield, User, CreditCard, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateStatus, isDateDisabled } from '../data/availability';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { trackEvent } from '../utils/analytics';

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice, tourId }) => {
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency();
    const [step, setStep] = useState(1);
    const [isPaid, setIsPaid] = useState(false);
    const [availability, setAvailability] = useState({});
    const [viewBankDetails, setViewBankDetails] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [showCoupon, setShowCoupon] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('paypal'); // 'paypal' or 'transfer'
    const [paymentPlan, setPaymentPlan] = useState('deposit'); // 'deposit' or 'full'

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const r = await fetch('https://cantiktours.com/api/get_availability.php');
                const j = await r.json();
                if (j.status === 'success') setAvailability(j.data);
            } catch (e) { console.error("Error fetching availability:", e); }
        };
        fetchAvailability();
    }, []);

    const getLocalISO = (date) => {
        if (!date) return '';
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    const getDynamicStatus = (date) => {
        if (!date) return 'green';
        const ds = getLocalISO(date);
        const count = availability[ds] || 0;
        if (count >= 4) return 'red';
        if (count >= 2) return 'yellow';
        return 'green';
    };

    const isDateFullyBooked = (date) => {
        const ds = getLocalISO(date);
        return (availability[ds] || 0) >= 4;
    };

    const [formData, setFormData] = useState({
        name: '',
        date: null,
        pax: '2',
        hotel: '',
        coupon: '',
        experience: 'economy', // Default to cheapest tier
        paymentType: 'full' // 'deposit' or 'full'
    });

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const saveBookingToDB = async (overrideIsPaid = null) => {
        try {
            const data = {
                tour_id: tourId || tourTitle.toLowerCase().replace(/\s+/g, '-'),
                tour_title: tourTitle,
                client_name: formData.name,
                date: formData.date,
                pax: formData.pax,
                hotel: formData.hotel,
                experience: formData.experience,
                payment_type: formData.paymentType,
                total_price: finalTotalPrice,
                deposit_amount: depositAmount,
                is_paid: overrideIsPaid !== null ? overrideIsPaid : isPaid,
                coupon: formData.coupon
            };

            await fetch('https://cantiktours.com/api/save_booking.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error("Error saving booking:", error);
        }
    };

    const resetModal = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setIsPaid(false);
            setFormData({
                name: '',
                date: null,
                pax: '2',
                hotel: '',
                coupon: '',
                experience: 'comfort',
                paymentType: 'deposit'
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
    
    // Expert UX: 5th passenger onwards fee (5€ per extra person)
    const paxNum = parseInt(formData.pax);
    const extraPaxFee = paxNum > 4 ? (paxNum - 4) * 5 : 0;
    
    // Fee for split payment (Deposit + Remaining)
    const finalTotalPrice = totalPrice + extraPaxFee;
    
    // Price calculations based on selected plan
    const splitFee = 5;
    
    const currentPayAmount = paymentPlan === 'deposit' 
        ? Math.round((finalTotalPrice * 0.3) + splitFee) 
        : finalTotalPrice;
    
    const currentRemainingAmount = paymentPlan === 'deposit' 
        ? finalTotalPrice - (currentPayAmount - splitFee) 
        : 0;

    const finalTotalPriceWithFees = paymentPlan === 'deposit' 
        ? finalTotalPrice + splitFee 
        : finalTotalPrice;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Si estamos en el paso 1, y la validacion HTML pasó, vamos al paso 2
        if (step === 1) {
            trackEvent('Booking', 'Step 2 reached', tourTitle);
            setStep(2);
            return;
        }

        // Paso 2: Validar experiencia y pasar al 3
        if (step === 2) {
            if (!formData.experience) {
                alert(i18n.language.startsWith('es') ? "Por favor selecciona un nivel de experiencia." : "Please select an experience level.");
                return;
            }
            trackEvent('Booking', 'Step 3 reached', `${tourTitle} - ${formData.experience}`);
            setStep(3);
            return;
        }

        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);

        const message = `¡Hola Cantik Tours!
Me gustaría reservar este tour, por favor:

• ${t('detail.msg_tour')}: ${tourTitle}
• ${i18n.language === 'en' ? 'Client' : 'Cliente'}: ${formData.name}
• ${t('detail.msg_date')}: ${formData.date ? formData.date.toLocaleDateString('es-ES') : ''}
• ${t('detail.msg_pax')}: ${paxLabel}
• ${t('detail.msg_hotel')}: ${formData.hotel}
• Experiencia: ${expName}

• ${i18n.language === 'en' ? 'Estimated Total' : 'Total estimado'}: ${finalTotalPriceWithFees} €
${isPaid ? `• ${i18n.language === 'en' ? 'Deposit PAID via PayPal:' : 'Depósito PAGADO por PayPal:'} ${currentPayAmount} €` : `(${i18n.language === 'en' ? 'Deposit to pay:' : 'Reserva:'} ${currentPayAmount} €)`}${showCoupon && formData.coupon ? `\n• ${t('detail.msg_coupon')}: ${formData.coupon}` : ''}

${isPaid ? (i18n.language === 'en' ? 'Attached is my payment confirmation. Looking forward to your details!' : '¡Acabo de pagar la reserva por PayPal! Quedo a la espera de la confirmación.') : '¿Me pueden confirmar disponibilidad y próximos pasos?'}
¡Muchas gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;

        trackEvent('Conversion', 'WhatsApp Confirmation', `${tourTitle} (${isPaid ? 'PAID' : 'PENDING'})`);
        saveBookingToDB();
        window.open(whatsappUrl, '_blank');
        resetModal();
    };

    const handleAlternativePayment = (e) => {
        e.preventDefault();
        setViewBankDetails(true);
    };

    const handleConfirmWhatsApp = () => {
        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);
        const dateStr = formData.date ? formData.date.toLocaleDateString('es-ES') : '';
        
        const message = `¡Hola Cantik Tours!
Me gustaría reservar este tour, por favor:

• *Tour:* ${tourTitle}
• *Cliente:* ${formData.name}
• *Fecha:* ${dateStr}
• *Pasajeros:* ${paxLabel}
• *Hotel/Zona:* ${formData.hotel}
• *Experiencia:* ${expName} (${i18n.language === 'en' ? 'English' : 'Español'})

• *Total:* ${finalTotalPriceWithFees} €
${paymentPlan === 'deposit' ? `• *Reserva hoy:* ${currentPayAmount} €\n• *Pendiente:* ${currentRemainingAmount} €` : `• *Pago Completo:* ${currentPayAmount} €`}

${i18n.language === 'en' 
    ? "I want to book via bank transfer (IBAN). Can you verify the payment? I attach the screenshot below.\n\nThank you very much!" 
    : "Quiero reservar con transferencia bancaria (IBAN). ¿Podéis verificar el pago? Adjunto la captura aquí abajo.\n\n¡Muchas gracias!"}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;

        trackEvent('Conversion', 'WhatsApp Bank Details Confirmation', tourTitle);
        saveBookingToDB();
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
                                        {/* Name Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="booking-name" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer">
                                                <User size={14} className="text-primary" />
                                                {t('reviews_page.form.name') || 'Nombre Completo'}
                                            </label>
                                            <input
                                                id="booking-name"
                                                type="text"
                                                required
                                                placeholder={i18n.language === 'en' ? 'Your full name' : 'Tu nombre completo'}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className={`${inputClasses} block w-full`}
                                            />
                                        </div>

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
                                                filterDate={(date) => !isDateFullyBooked(date)}
                                                dayClassName={(date) => {
                                                    const status = getDynamicStatus(date);
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
                                                <option value="6">{t('detail.booking_pax_6')}</option>
                                                <option value="7">{t('detail.booking_pax_7')}</option>
                                                <option value="8">{t('detail.booking_pax_8')}</option>
                                                <option value="9">{t('detail.booking_pax_9')}</option>
                                                <option value="10">{t('detail.booking_pax_10')}</option>
                                                <option value="11">{t('detail.booking_pax_11')}</option>
                                                <option value="12">{t('detail.booking_pax_12')}</option>
                                                <option value="13 o más">{t('detail.booking_pax_more')}</option>
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
                                                <span className="text-[9px] text-gray-500 font-bold">{i18n.language === 'en' ? 'Per vehicle up to 4 pax' : 'Por vehículo hasta 4 pax'}</span>
                                            </div>
                                            <div className="text-2xl font-black text-primary flex items-center gap-1">
                                                {finalTotalPrice}
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
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="space-y-6"
                                    >
                                        {/* Luxury Header */}
                                        <div className="flex flex-col items-center text-center space-y-2 mb-2">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                                <ShieldCheck className="text-primary" size={28} />
                                            </div>
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[5px]">{i18n.language === 'en' ? 'FINAL STEP' : 'ÚLTIMO PASO'}</h4>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{i18n.language === 'en' ? 'Secure your booking' : 'Asegura tu reserva'}</h2>
                                        </div>

                                        {/* Payment Plan Selector */}
                                        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-2xl mb-2">
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentPlan('deposit')}
                                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${paymentPlan === 'deposit' ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
                                            >
                                                {i18n.language === 'en' ? 'Pay 30% Deposit' : 'Pagar Reserva (30%)'}
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentPlan('full')}
                                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${paymentPlan === 'full' ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
                                            >
                                                {i18n.language === 'en' ? 'Pay 100% Full' : 'Pago Completo (100%)'}
                                            </button>
                                        </div>

                                        {/* Layered Luxury Card Container */}
                                        <div className="relative mt-4">
                                            {/* Background Card (Payment 2 - Absolute behind) */}
                                            {paymentPlan === 'deposit' && (
                                                <div className="absolute top-12 left-0 right-0 bg-gray-100 dark:bg-white/5 rounded-[32px] p-8 pb-4 border border-black/5 dark:border-white/5 z-0 opacity-60">
                                                    <div className="mt-8 flex justify-between items-start">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{i18n.language === 'en' ? 'FINAL BALANCE' : 'PAGO RESTANTE'}</span>
                                                            </div>
                                                            <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">{i18n.language === 'en' ? 'To be paid via Web/Transfer' : 'A pagar vía Web o Transferencia'}</div>
                                                            <div className="text-[9px] font-black text-secondary leading-tight max-w-[150px] uppercase italic">
                                                                {i18n.language === 'en' 
                                                                    ? '⚠️ No cash accepted by the driver.' 
                                                                    : '⚠️ No aceptamos pago al conductor.'}
                                                            </div>
                                                        </div>
                                                        <div className="text-xl font-black text-gray-600 dark:text-gray-400">{currentRemainingAmount}€</div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Foreground Card (Payment 1 - Relative on top) */}
                                            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-[32px] p-6 md:p-8 shadow-2xl shadow-primary/20 border border-black/5 dark:border-white/10 z-10 transition-all">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                                                {paymentPlan === 'deposit' 
                                                                    ? (i18n.language === 'en' ? 'RESERVE TODAY' : 'RESERVAR HOY')
                                                                    : (i18n.language === 'en' ? 'PAYMENT IN FULL' : 'PAGO TOTAL')}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">
                                                            {paymentPlan === 'deposit' ? (i18n.language === 'en' ? 'Booking Confirmation' : 'Confirmación de Reserva') : (i18n.language === 'en' ? 'Full Tour Payment' : 'Pago Completo del Tour')}
                                                        </h3>
                                                        <p className="text-[10px] font-bold text-gray-400 italic">
                                                            {i18n.language === 'en' ? 'Support & Reservation insurance included' : 'Incluye soporte 24/7 y garantía de reserva'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-3xl font-black text-primary">{currentPayAmount}€</div>
                                                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mt-1">
                                                            {i18n.language === 'en' ? 'Total tour value:' : 'Valor total del tour:'} {totalPrice}€
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment Method Tabs */}
                                                {!isPaid && (
                                                    <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-2xl mb-6 relative">
                                                        <motion.div 
                                                            className="absolute top-1 bottom-1 bg-white dark:bg-white/10 rounded-xl shadow-sm z-0"
                                                            initial={false}
                                                            animate={{ 
                                                                left: paymentMethod === 'paypal' ? '4px' : '50%',
                                                                right: paymentMethod === 'paypal' ? '50%' : '4px'
                                                            }}
                                                        />
                                                        <button 
                                                            type="button"
                                                            onClick={() => setPaymentMethod('paypal')}
                                                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest z-10 transition-colors ${paymentMethod === 'paypal' ? 'text-primary' : 'text-gray-400'}`}
                                                        >
                                                            PayPal / Card
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => setPaymentMethod('transfer')}
                                                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest z-10 transition-colors ${paymentMethod === 'transfer' ? 'text-primary' : 'text-gray-400'}`}
                                                        >
                                                            Transfer / Wise
                                                        </button>
                                                    </div>
                                                )}

                                                <AnimatePresence mode="wait">
                                                    {paymentMethod === 'paypal' && !isPaid && (
                                                        <motion.div 
                                                            key="paypal-tab"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -10 }}
                                                            className="PayPalArea"
                                                        >
                                                            <PayPalButtons 
                                                                style={{ layout: "vertical", shape: "pill", label: "pay", height: 48 }}
                                                                createOrder={(data, actions) => {
                                                                    return actions.order.create({
                                                                        purchase_units: [{
                                                                            description: `${tourTitle} - ${paymentPlan === 'deposit' ? 'Booking' : 'Full Payment'}`,
                                                                            amount: { value: currentPayAmount.toString() }
                                                                        }]
                                                                    });
                                                                }}
                                                                onApprove={(data, actions) => {
                                                                    return actions.order.capture().then((details) => {
                                                                        setIsPaid(true);
                                                                        handleConfirmPaid();
                                                                    });
                                                                }}
                                                            />
                                                        </motion.div>
                                                    )}

                                                    {paymentMethod === 'transfer' && !isPaid && (
                                                        <motion.div 
                                                            key="transfer-tab"
                                                            initial={{ opacity: 0, x: 10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 10 }}
                                                            className="space-y-3"
                                                        >
                                                            <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-xl border border-black/5 flex justify-between items-center group">
                                                                <div className="overflow-hidden">
                                                                    <span className="block text-[8px] font-bold text-gray-400 uppercase">Titular</span>
                                                                    <span className="text-[10px] font-black truncate max-w-[150px] inline-block">Javier Ignacio Contreras Cifuentes</span>
                                                                </div>
                                                                <button type="button" onClick={() => copyToClipboard('Javier Ignacio Contreras Cifuentes', 'name')} className="text-primary hover:scale-110 transition-transform">
                                                                    {copiedField === 'name' ? <Heart size={14} fill="currentColor" /> : <Ticket size={14} />}
                                                                </button>
                                                            </div>
                                                            <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 flex justify-between items-center group">
                                                                <div>
                                                                    <span className="block text-[8px] font-bold text-primary uppercase">IBAN Wise</span>
                                                                    <span className="text-[11px] font-black tracking-wider">BE97 9673 8690 2549</span>
                                                                </div>
                                                                <button type="button" onClick={() => copyToClipboard('BE97 9673 8690 2549', 'iban')} className="text-primary hover:scale-110 transition-transform">
                                                                    {copiedField === 'iban' ? <Heart size={14} fill="currentColor" /> : <Ticket size={14} />}
                                                                </button>
                                                            </div>
                                                            <button 
                                                                type="button"
                                                                onClick={handleConfirmWhatsApp}
                                                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl text-[10px] font-black shadow-lg flex items-center justify-center gap-2 transition-all mt-2 uppercase tracking-widest"
                                                            >
                                                                <MessageCircle size={14} /> {i18n.language === 'en' ? 'Confirm WhatsApp' : 'Confirmar WhatsApp'}
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                
                                                {isPaid && (
                                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-500/10 text-green-500 py-4 rounded-2xl text-center font-black text-sm flex items-center justify-center gap-2 border border-green-500/20">
                                                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</div> 
                                                        {i18n.language === 'en' ? 'RESERVATION SECURED' : 'RESERVA ASEGURADA'}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-center mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ArrowLeft size={16} /> {i18n.language === 'en' ? 'BACK' : 'VOLVER'}
                                            </button>
                                        </div>

                                        {/* Cancellation Policy Shield */}
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 mt-4">
                                            <ShieldCheck size={14} />
                                            {i18n.language === 'en' ? 'Free cancellation up to 48h before the trip' : 'Cancelación gratuita hasta 48h antes del viaje'}
                                        </div>

                                        {/* Trust Box: Pago Consciente */}
                                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center text-center gap-1.5 mt-2 opacity-60">
                                            <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-1">
                                                <Heart size={14} />
                                                {i18n.language === 'en' ? 'CONSCIOUS PAYMENT' : 'PAGO CONSCIENTE'}
                                            </div>
                                            <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                {i18n.language === 'en' 
                                                    ? 'With your booking we ensure a fair commitment to the local team from the first minute, promoting responsible tourism that directly supports Balinese families.'
                                                    : 'con tu reserva aseguramos un compromiso justo para el equipo local desde el primer minuto, fomentando un turismo responsable y que apoya directamente a las familias de Bali.'}
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
