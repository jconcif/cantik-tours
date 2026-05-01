import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star, Heart, ArrowRight, ArrowLeft, Shield, User, CreditCard, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateStatus, isDateDisabled } from '../data/availability';
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
    const [paymentMethod, setPaymentMethod] = useState('transfer'); // Default to transfer only
    const [paymentPlan, setPaymentPlan] = useState('deposit'); // 'deposit' or 'full'
    const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'processing', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [newBookingId, setNewBookingId] = useState(null);

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
                payment_type: paymentPlan,
                total_price: finalTotalPriceWithFees,
                deposit_amount: currentPayAmount,
                is_paid: overrideIsPaid !== null ? overrideIsPaid : isPaid,
                coupon: formData.coupon
            };

            const response = await fetch('https://cantiktours.com/api/save_booking.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.status === 'success' && result.id) {
                setNewBookingId(result.id);
                return result.id;
            }
        } catch (error) {
            console.error("Error saving booking:", error);
        }
        return null;
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
            setPaymentStatus('idle');
            setErrorMessage('');
        }, 500);
    };

    const handleConfirmPaid = () => {
        const paxLabel = t(`detail.booking_pax_${formData.pax.replace(' o más', '')}`);
        const dateStr = formData.date ? formData.date.toLocaleDateString('es-ES') : '';
        
        const message = `¡Hola Cantik Tours! ✅
Acabo de realizar el pago para mi reserva:

- *Tour:* ${tourTitle}
- *Cliente:* ${formData.name}
- *Fecha:* ${dateStr}
- *Pasajeros:* ${paxLabel}
- *Hotel/Zona:* ${formData.hotel}
- *Experiencia:* ${expName}

- *Pago Realizado:* ${currentPayAmount} € (PayPal/Tarjeta)
${paymentPlan === 'deposit' ? `- *Pendiente:* ${currentRemainingAmount} €` : `- *Estado:* Pago Total Completado`}

¿Me confirmáis que os ha llegado correctamente? ¡Gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;
        
        saveBookingToDB(true).then(id => {
            if (id) {
                 const whatsappUrlWithId = `https://wa.me/34642517787?text=${encodeURIComponent(message + `\n\nReferencia: CT-${id}`)}`;
                 window.open(whatsappUrlWithId, '_blank');
            } else {
                 window.open(whatsappUrl, '_blank');
            }
        });
        // No cerramos el modal inmediatamente para que vean el "RESERVA ASEGURADA"
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
    const splitFee = 5;
    const finalTotalPrice = totalPrice + extraPaxFee;
    
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

- ${t('detail.msg_tour')}: ${tourTitle}
- ${i18n.language === 'en' ? 'Client' : 'Cliente'}: ${formData.name}
- ${t('detail.msg_date')}: ${formData.date ? formData.date.toLocaleDateString('es-ES') : ''}
- ${t('detail.msg_pax')}: ${paxLabel}
- ${t('detail.msg_hotel')}: ${formData.hotel}
- Experiencia: ${expName}

- ${i18n.language === 'en' ? 'Estimated Total' : 'Total estimado'}: ${finalTotalPriceWithFees} €
(${i18n.language === 'en' ? 'Deposit to pay:' : 'Reserva:'} ${currentPayAmount} €)${showCoupon && formData.coupon ? `\n- ${t('detail.msg_coupon')}: ${formData.coupon}` : ''}

¿Me pueden confirmar disponibilidad y enviarme los datos para realizar la transferencia (Euros/Dólares)? 
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
        
        const message = `🌟 *VOUCHER DE RESERVA - CANTIK TOURS* 🌟
------------------------------------------
${newBookingId ? `*Referencia:* #CT-${newBookingId}` : '*Referencia:* Pendiente'}

👤 *CLIENTE:* ${formData.name.toUpperCase()}
🗺️ *TOUR:* ${tourTitle.toUpperCase()}
📅 *FECHA:* ${dateStr}
👥 *PASAJEROS:* ${paxLabel}
🏨 *HOTEL:* ${formData.hotel}
✨ *EXPERIENCIA:* ${expName} (${i18n.language === 'en' ? 'English' : 'Español'})

💰 *DETALLE DEL PAGO:*
- Total Tour: ${finalTotalPriceWithFees} € ${paymentPlan === 'deposit' ? '(Incluye +5€ gestión de pago fraccionado)' : '(Sin comisiones)'}
- Pagado hoy: ${currentPayAmount} € (Transferencia)
${paymentPlan === 'deposit' ? `- *Pendiente:* ${currentRemainingAmount} €` : '- *Estado:* Pago Total Realizado'}

------------------------------------------
✅ *PASO FINAL:* Adjunto aquí la captura del pago para verificar mi reserva. ¡Gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;

        trackEvent('Conversion', 'WhatsApp Bank Details Confirmation', tourTitle);
        
        saveBookingToDB().then(id => {
            const finalMessage = id 
                ? message.replace('*Referencia:* Pendiente', `*Referencia:* #CT-${id}`)
                : message;
            const finalUrl = `https://wa.me/34642517787?text=${encodeURIComponent(finalMessage)}`;
            window.open(finalUrl, '_blank');
            resetModal();
        });
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

                                        {/* Payment Plan Selector - Premium Cards */}
                                        <div className="grid grid-cols-2 gap-3 mb-2">
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentPlan('deposit')}
                                                className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1 ${paymentPlan === 'deposit' ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 opacity-60'}`}
                                            >
                                                <div className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">RESERVA (30%)</div>
                                                <div className="text-sm font-black text-gray-900 dark:text-white">Depósito</div>
                                                <div className="text-[8px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full mt-1">+5€ Gestión</div>
                                                {paymentPlan === 'deposit' && <motion.div layoutId="plan-check" className="absolute top-2 right-2 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center"><ShieldCheck size={10} /></motion.div>}
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentPlan('full')}
                                                className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1 ${paymentPlan === 'full' ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 opacity-60'}`}
                                            >
                                                <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">TOTAL (100%)</div>
                                                <div className="text-sm font-black text-gray-900 dark:text-white">Pago Único</div>
                                                <div className="text-[8px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full mt-1">Sin Comisiones</div>
                                                {paymentPlan === 'full' && <motion.div layoutId="plan-check" className="absolute top-2 right-2 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center"><ShieldCheck size={10} /></motion.div>}
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

                                                <div className="space-y-4">
                                                    {/* Next Steps Info Card */}
                                                    <div className="bg-primary/5 p-6 rounded-[24px] border border-primary/20 flex flex-col items-center text-center gap-4 transition-all hover:border-primary/50 shadow-sm">
                                                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                                            <MessageCircle className="text-primary" size={24} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                                {i18n.language === 'en' ? 'Next: Payment Details' : 'Siguiente: Datos de Pago'}
                                                            </h4>
                                                            <p className="text-[10px] font-bold text-gray-500 leading-relaxed px-4">
                                                                {i18n.language === 'en' 
                                                                    ? 'Once you send the booking, we will provide you with the transfer details (EUR or USD) via WhatsApp to secure your dates.' 
                                                                    : 'Al enviar la reserva, te proporcionaremos los datos de transferencia (Euros o Dólares) por WhatsApp para bloquear tus fechas.'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="pt-2">
                                                        <button 
                                                            type="button"
                                                            onClick={handleConfirmWhatsApp}
                                                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-[24px] text-xs font-black shadow-xl shadow-[#25D366]/20 flex flex-col items-center justify-center gap-1 transition-all group active:scale-[0.98]"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> 
                                                                <span>{i18n.language === 'en' ? 'SEND BOOKING & GET PAYMENT INFO' : 'ENVIAR RESERVA Y RECIBIR DATOS'}</span>
                                                            </div>
                                                            <span className="text-[9px] opacity-70 font-bold uppercase tracking-widest">{i18n.language === 'en' ? 'Connect via WhatsApp' : 'Contactar por WhatsApp'}</span>
                                                        </button>
                                                    </div>

                                                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex gap-3 items-start">
                                                        <Shield size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                                        <p className="text-[9px] text-amber-700 dark:text-amber-400 font-bold leading-tight">
                                                            {i18n.language === 'en' 
                                                                ? 'Important: Your reservation will be confirmed once we verify the deposit in our bank account.' 
                                                                : 'Importante: Tu reserva se confirmará definitivamente una vez verifiquemos el ingreso en nuestra cuenta bancaria.'}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {isPaid && (
                                                    <motion.div 
                                                        initial={{ scale: 0.9, opacity: 0 }} 
                                                        animate={{ scale: 1, opacity: 1 }} 
                                                        className="flex flex-col items-center space-y-6 py-4"
                                                    >
                                                        <div className="flex flex-col items-center text-center">
                                                            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg shadow-green-500/20 mb-4 animate-bounce">✓</div> 
                                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{i18n.language === 'en' ? 'RESERVATION SECURED!' : '¡RESERVA ASEGURADA!'}</h3>
                                                            <p className="text-xs font-bold text-gray-500 mt-1">{i18n.language === 'en' ? 'We have received your payment correctly.' : 'Hemos recibido tu pago correctamente.'}</p>
                                                        </div>

                                                        <div className="w-full space-y-3">
                                                            <button 
                                                                onClick={handleConfirmPaid}
                                                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-2xl text-sm font-black shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 transition-all uppercase tracking-widest group"
                                                            >
                                                                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> 
                                                                {i18n.language === 'en' ? 'Send Confirmation WhatsApp' : 'Enviar Confirmación WhatsApp'}
                                                            </button>

                                                            {newBookingId && (
                                                                <a 
                                                                    href={`/itinerario?ref=CT-${newBookingId}`} 
                                                                    target="_blank" 
                                                                    rel="noreferrer"
                                                                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary py-5 rounded-2xl text-sm font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest border border-primary/20"
                                                                >
                                                                    <Ticket size={20} />
                                                                    {i18n.language === 'en' ? 'View My Itinerary & Receipt' : 'Ver mi Itinerario y Recibo'}
                                                                </a>
                                                            )}

                                                            <button 
                                                                onClick={resetModal}
                                                                className="w-full py-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                                                            >
                                                                {i18n.language === 'en' ? 'Close & Return to Web' : 'Cerrar y volver a la web'}
                                                            </button>
                                                        </div>
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
