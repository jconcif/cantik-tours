import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star, Heart, ArrowRight, ArrowLeft, Shield, User, CreditCard, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateStatus, isDateDisabled } from '../data/availability';
import { trackEvent, trackLeadWhatsapp } from '../utils/analytics';
import { tours } from '../data/tours';
import { getAvailability, saveBooking } from '../services/api';

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice, tourId, initialSelectedStops }) => {
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency();
    const [step, setStep] = useState(1);
    const flexibleTour = tours.find(t => t.id === 'ubud-flexible');
    const availableStops = flexibleTour?.availableStops || [];
    const [isPaid, setIsPaid] = useState(false);
    const [availability, setAvailability] = useState({});
    const [viewBankDetails, setViewBankDetails] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [showCoupon, setShowCoupon] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('transfer'); // Default to transfer only
    const [paymentPlan, setPaymentPlan] = useState('full'); // Default to 100% payment
    const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'processing', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [newBookingId, setNewBookingId] = useState(null);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const j = await getAvailability();
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
        paymentType: 'full', // 'deposit' or 'full'
        selectedStops: [],
        acceptedTerms: false
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
                coupon: formData.coupon,
                itinerary: formData.selectedStops.join(', ')
            };

            const result = await saveBooking(data);
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
                experience: 'economy',
                paymentType: 'full',
                selectedStops: [],
                acceptedTerms: false
            });
            setViewBankDetails(false);
            setCopiedField(null);
            setPaymentStatus('idle');
            setErrorMessage('');
            setShowCoupon(false);
        }, 500);
    };

    // Auto-populate itinerary for fixed tours or when initialSelectedStops changes
    useEffect(() => {
        if (isOpen) {
            if (tourId === 'ubud-flexible') {
                if (initialSelectedStops && initialSelectedStops.length > 0) {
                    setFormData(prev => ({ ...prev, selectedStops: initialSelectedStops }));
                }
            } else {
                const foundTour = tours.find(t => t.id === tourId);
                if (foundTour && foundTour.itinerary) {
                    const fixedStops = foundTour.itinerary
                        .filter(item => item.type === 'visit')
                        .map(item => i18n.language === 'en' ? item.activity_en : item.activity);
                    setFormData(prev => ({ ...prev, selectedStops: fixedStops }));
                }
            }
        }
    }, [isOpen, tourId, initialSelectedStops, i18n.language]);

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
        
        trackLeadWhatsapp(tourTitle, currentPayAmount);
        
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
    let expSub = '';
    switch (formData.experience) {
        case 'economy':
            expName = t('detail.exp_economy_title');
            expSub = t('detail.exp_economy_sub');
            extraPrice = 0;
            break;
        case 'comfort':
            expName = t('detail.exp_comfort_title');
            expSub = t('detail.exp_comfort_sub');
            extraPrice = 10;
            break;
        case 'elite':
            expName = t('detail.exp_elite_title');
            expSub = t('detail.exp_elite_sub');
            extraPrice = 25;
            break;
        default:
            expName = '';
            expSub = '';
    }
    const totalPrice = basePrice + extraPrice;
    
    // Extra fee: 5th passenger onwards (2.5€ per extra person)
    const paxNum = parseInt(formData.pax);
    const extraPaxFee = paxNum > 4 ? (paxNum - 4) * 2.5 : 0;
    
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

        // Paso 1: Información básica
        if (step === 1) {
            trackEvent('Booking', 'Step 2 reached (Info)', tourTitle);
            setStep((tourId === 'ubud-flexible' && (!initialSelectedStops || initialSelectedStops.length === 0)) ? 2 : 3);
            return;
        }

        // Paso 2: Selección de paradas (Solo Flexible)
        if (step === 2) {
            if (formData.selectedStops.length === 0) {
                alert(i18n.language.startsWith('es') ? "Por favor selecciona al menos una parada para continuar." : "Please select at least one stop to continue.");
                return;
            }
            trackEvent('Booking', 'Step 3 reached (Exp)', tourTitle);
            setStep(3);
            return;
        }

        // Paso 3: Validar experiencia y pasar al resumen
        if (step === 3) {
            if (!formData.experience) {
                alert(i18n.language.startsWith('es') ? "Por favor selecciona un nivel de experiencia." : "Please select an experience level.");
                return;
            }
            trackEvent('Booking', 'Step 4 reached (Summary)', `${tourTitle} - ${formData.experience}`);
            setStep(4);
            return;
        }
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
✨ *EXPERIENCIA:* ${expName} - ${expSub}
${tourId === 'ubud-flexible' && formData.selectedStops.length > 0 ? `📍 *PARADAS:* ${formData.selectedStops.join(', ')}` : ''}

💰 *DETALLE DEL PAGO:*
- Total Tour: ${finalTotalPriceWithFees} € (Sin comisiones)
- Estado: Pago Pendiente (A la espera de transferencia)

------------------------------------------`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/34642517787?text=${encodedMessage}`;

        trackEvent('Conversion', 'WhatsApp Bank Details Confirmation', tourTitle);
        trackLeadWhatsapp(tourTitle, finalTotalPriceWithFees);
        
        saveBookingToDB().then(id => {
            let finalMessage = message;
            if (id) {
                finalMessage = message.replace('*Referencia:* Pendiente', `*Referencia:* #CT-${id}`);
                finalMessage += `\n\n📄 *Detalles de mi reserva:* https://cantiktours.com/itinerario?ref=CT-${id}`;
            }
            
            finalMessage += `\n------------------------------------------\n✅ *PASO FINAL:* Envíanos la captura del pago realizado (transferencia bancaria) para confirmar la reserva. La verificaremos en un momento. ¡Gracias!`;
            
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
                                    {step === 1 ? (i18n.language === 'en' ? 'Build your Route' : 'Arma tu Ruta') : t('detail.booking_title')}
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
                                {[1, 2, 3, 4].map((s) => (
                                    <div 
                                        key={s}
                                        className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                                            step >= s ? 'bg-primary' : 'bg-primary/20 dark:bg-white/10'
                                        } ${(tourId !== 'ubud-flexible' || (initialSelectedStops && initialSelectedStops.length > 0)) && s === 2 ? 'hidden' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar overflow-x-hidden">
                            <AnimatePresence mode="wait">
                                {step === 2 && tourId === 'ubud-flexible' && (
                                    <motion.div
                                        key="step2-selection"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black">
                                                    {formData.selectedStops.length}
                                                </div>
                                                <span className="text-sm font-black text-primary uppercase tracking-wider">
                                                    {i18n.language === 'en' ? 'Stops Selected' : 'Paradas Seleccionadas'}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold text-gray-500">
                                                {i18n.language === 'en' ? 'Limit: 5' : 'Máximo: 5'}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {availableStops.map((stop) => {
                                                const isSelected = formData.selectedStops.includes(stop.name);
                                                const isDisabled = !isSelected && formData.selectedStops.length >= 5;
                                                
                                                return (
                                                    <button
                                                        key={stop.id}
                                                        type="button"
                                                        disabled={isDisabled}
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                setFormData({
                                                                    ...formData,
                                                                    selectedStops: formData.selectedStops.filter(s => s !== stop.name)
                                                                });
                                                            } else {
                                                                setFormData({
                                                                    ...formData,
                                                                    selectedStops: [...formData.selectedStops, stop.name]
                                                                });
                                                            }
                                                        }}
                                                        className={`flex items-center gap-4 p-4 rounded-[1.5rem] border text-left transition-all relative ${
                                                            isSelected 
                                                                ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5' 
                                                                : isDisabled 
                                                                    ? 'opacity-40 grayscale cursor-not-allowed border-black/5 dark:border-white/5' 
                                                                    : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-primary/30 hover:bg-primary/[0.02]'
                                                        }`}
                                                    >
                                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-primary border-primary scale-110' : 'border-gray-200 dark:border-gray-700'}`}>
                                                            {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-[2px]" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <span className="text-sm font-black leading-tight text-gray-900 dark:text-white">{i18n.language === 'en' ? stop.name_en : stop.name}</span>
                                                                <span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full font-bold text-gray-500 whitespace-nowrap">{stop.duration}</span>
                                                            </div>
                                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold mt-1 line-clamp-1">{i18n.language === 'en' ? stop.desc_en : stop.desc}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="w-16 flex-none bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-[1.5rem] flex items-center justify-center transition-colors shadow-sm"
                                            >
                                                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={formData.selectedStops.length < 5}
                                                className={`flex-1 py-5 rounded-[1.5rem] text-lg font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                                                    formData.selectedStops.length === 5 
                                                        ? 'btn-primary shadow-primary/20 cursor-pointer' 
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                                }`}
                                            >
                                                {i18n.language === 'en' ? 'NEXT' : 'SIGUIENTE'}
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div
                                        key="step1-info"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
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

                                        <div className="flex mt-6">
                                            <button
                                                type="submit"
                                                className="w-full btn-primary py-4 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
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
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <div className="flex flex-col">
                                                                <span className={`block text-sm font-black transition-colors ${formData.experience === 'economy' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                                                    {t('detail.exp_economy_title')}
                                                                </span>
                                                            </div>
                                                            <span className="text-lg font-black text-gray-900 dark:text-gray-100">{(() => { const p = formatPrice(tourPrice); return `${p.symbol}${p.amount}`; })()}</span>
                                                        </div>
                                                        <span className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 leading-relaxed block font-medium">{t('detail.exp_economy_desc')}</span>
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
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <div className="flex flex-col">
                                                                <span className={`block text-sm font-black transition-colors ${formData.experience === 'comfort' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>
                                                                    {t('detail.exp_comfort_title')}
                                                                </span>
                                                            </div>
                                                            <span className="text-lg font-black text-primary">{(() => { const p = formatPrice(tourPrice + 10); return `${p.symbol}${p.amount}`; })()}</span>
                                                        </div>
                                                        <span className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 leading-relaxed block font-medium">{t('detail.exp_comfort_desc')}</span>
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
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <div className="flex flex-col">
                                                                <span className={`block text-sm font-black transition-colors ${formData.experience === 'elite' ? 'text-[#D4AF37]' : 'text-gray-600 dark:text-gray-400'}`}>
                                                                    {t('detail.exp_elite_title')}
                                                                </span>
                                                            </div>
                                                            <span className="text-lg font-black text-[#D4AF37]">{(() => { const p = formatPrice(tourPrice + 25); return `${p.symbol}${p.amount}`; })()}</span>
                                                        </div>
                                                        <span className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 leading-relaxed block font-medium">{t('detail.exp_elite_desc')}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>



                                        {/* Navigation Buttons for Step 3 */}
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep((tourId === 'ubud-flexible' && (!initialSelectedStops || initialSelectedStops.length === 0)) ? 2 : 1)}
                                                className="w-16 flex-none bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
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

                                {/* Step 4: Summary & Confirm */}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
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

                                        {/* Premium Summary Info */}
                                        <div className="bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-xl">
                                            <div className="bg-primary/10 p-4 border-b border-primary/10 flex items-center justify-between">
                                                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{i18n.language === 'en' ? 'RESERVATION SUMMARY' : 'RESUMEN DE LA RESERVA'}</h3>
                                                <div className="bg-primary/20 px-2 py-0.5 rounded-full text-[8px] font-black text-primary uppercase">{i18n.language === 'en' ? 'Awaiting Payment' : 'Pendiente de Pago'}</div>
                                            </div>
                                            <div className="p-5 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{t('detail.msg_tour')}</span>
                                                        <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">{tourTitle}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{t('detail.msg_date')}</span>
                                                        <p className="text-[11px] font-bold text-gray-900 dark:text-white">{formData.date?.toLocaleDateString('es-ES')}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-2">
                                                    <div className="space-y-1 pt-2 border-t border-black/5 dark:border-white/5">
                                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{t('detail.msg_pax')}</span>
                                                        <p className="text-[11px] font-bold text-gray-900 dark:text-white">{formData.pax} {i18n.language === 'en' ? 'People' : 'Personas'}</p>
                                                    </div>
                                                    <div className="space-y-1 pt-2 border-t border-black/5 dark:border-white/5">
                                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{t('detail.booking_hotel')}</span>
                                                        <p className="text-[11px] font-bold text-gray-900 dark:text-white">{formData.hotel || '-'}</p>
                                                    </div>
                                                    <div className="space-y-1 pt-2 border-t border-black/5 dark:border-white/5">
                                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{i18n.language === 'en' ? 'Experience' : 'Experiencia'}</span>
                                                        <p className="text-[11px] font-bold text-gray-900 dark:text-white">{expName}</p>
                                                    </div>
                                                </div>

                                                {/* Hidden selected stops in modal as per user request */}



                                                <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-1">
                                                    {extraPaxFee > 0 && (
                                                        <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold">
                                                            <span>{i18n.language === 'en' ? 'Extra passenger supplement' : 'Suplemento pasajeros extra'}</span>
                                                            <span>+{extraPaxFee}€</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-primary uppercase tracking-wider">{i18n.language === 'en' ? 'TOTAL PRICE' : 'PRECIO TOTAL'}</span>
                                                            <span className="text-[8px] text-gray-400 font-bold italic">{i18n.language === 'en' ? '100% via Bank Transfer' : '100% vía Transferencia Bancaria'}</span>
                                                        </div>
                                                    <div className="text-2xl font-black text-primary">{finalTotalPriceWithFees}€</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                        {/* Terms & Action */}
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 p-2">
                                                <input 
                                                    id="terms-check"
                                                    type="checkbox" 
                                                    checked={formData.acceptedTerms}
                                                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                                />
                                                <label htmlFor="terms-check" className="text-[10px] font-bold text-gray-500 dark:text-gray-400 leading-snug cursor-pointer">
                                                    {i18n.language === 'en' 
                                                        ? <>I accept the <a href="/politicas" target="_blank" className="text-primary underline">Terms and Conditions</a>.</>
                                                        : <>Acepto los <a href="/politicas" target="_blank" className="text-primary underline">Términos y Condiciones</a>.</>
                                                    }
                                                </label>
                                            </div>
                                            
                                            <button 
                                                type="button"
                                                onClick={handleConfirmWhatsApp}
                                                disabled={!formData.acceptedTerms}
                                                className={`w-full py-5 rounded-3xl text-[11px] font-black shadow-xl flex flex-col items-center justify-center gap-1 transition-all group ${
                                                    formData.acceptedTerms 
                                                        ? 'bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[#25D366]/20 active:scale-[0.98]' 
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <MessageCircle size={22} className={formData.acceptedTerms ? "group-hover:scale-110 transition-transform" : ""} /> 
                                                    <span>{i18n.language === 'en' ? 'ACCEPT & SEND BOOKING VIA WHATSAPP' : 'ACEPTAR Y ENVIAR RESERVA POR WHATSAPP'}</span>
                                                </div>
                                                <span className="text-[8px] opacity-70 font-bold uppercase tracking-[0.2em]">{i18n.language === 'en' ? 'CONNECT WITH OUR TEAM NOW' : 'CONECTA CON NUESTRO EQUIPO AHORA'}</span>
                                            </button>

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

                                            <div className="flex justify-center pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(3)}
                                                    className="px-8 py-3 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <ArrowLeft size={14} /> {i18n.language === 'en' ? 'BACK' : 'VOLVER'}
                                                </button>
                                            </div>


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
