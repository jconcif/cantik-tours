import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star, Heart, ArrowRight, ArrowLeft, ShieldCheck, User, Phone, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const formatCT = (val) => 'CT-' + String(val).replace(/^CT-?/i, '').padStart(4, '0');
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { trackEvent, trackLeadWhatsapp } from '../utils/analytics';
import { tours } from '../data/tours';
import { getAvailability, saveBooking, validateCoupon } from '../services/api';

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice, tourId, initialSelectedStops }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();
    const [step, setStep] = useState(1);
    const flexibleTour = tours.find(t => t.id === 'ubud-flexible');
    const availableStops = flexibleTour?.availableStops || [];
    const [availability, setAvailability] = useState({});
    const [showCoupon, setShowCoupon] = useState(false);
    const [newBookingId, setNewBookingId] = useState(null);

    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        date: null,
        pax: '',
        hotel: '',
        coupon: '',
        experience: 'comfort',
        selectedStops: [],
        acceptedTerms: false,
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (!isOpen) return;
        const fetchAvailability = async () => {
            try {
                const j = await getAvailability();
                if (j.status === 'success') setAvailability(j.data);
            } catch (e) { console.error("Error fetching availability:", e); }
        };
        fetchAvailability();
    }, [isOpen]);

    const getBaliTomorrow = () => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Makassar',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            });
            const parts = formatter.formatToParts(new Date());
            const val = (name) => parts.find(p => p.type === name).value;
            const year = parseInt(val('year'));
            const month = parseInt(val('month')) - 1;
            const day = parseInt(val('day'));
            const baliToday = new Date(year, month, day);
            const baliTomorrow = new Date(baliToday);
            baliTomorrow.setDate(baliTomorrow.getDate() + 1);
            return baliTomorrow;
        } catch (e) {
            const localTomorrow = new Date();
            localTomorrow.setDate(localTomorrow.getDate() + 1);
            localTomorrow.setHours(0, 0, 0, 0);
            return localTomorrow;
        }
    };

    const getMinSelectableDate = () => {
        const tomorrow = getBaliTomorrow();
        const startLimit = new Date(2026, 5, 1);
        return tomorrow > startLimit ? tomorrow : startLimit;
    };

    const getMaxSelectableDate = () => {
        return new Date(2026, 8, 30); // September 30, 2026 (months are 0-indexed)
    };

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
        if (count >= 8) return 'red';
        if (count >= 5) return 'yellow';
        return 'green';
    };

    const isDateFullyBooked = (date) => {
        const ds = getLocalISO(date);
        return (availability[ds] || 0) >= 10;
    };

    const saveBookingToDB = async (customRef = null) => {
        try {
            const data = {
                tour_id: tourId || tourTitle.toLowerCase().replace(/\s+/g, '-'),
                tour_title: tourTitle,
                client_name: formData.name,
                client_phone: formData.phone,
                client_email: formData.email,
                date: formData.date ? getLocalISO(formData.date) : '',
                pax: formData.pax,
                hotel: formData.hotel,
                experience: formData.experience,
                payment_type: 'full',
                total_price: finalTotalPriceWithFees,
                deposit_amount: finalTotalPriceWithFees,
                is_paid: false,
                status: 'pending',
                reference: customRef,
                selected_stops: formData.selectedStops.join(', ')
            };
            const res = await saveBooking(data);
            if (res.status === 'success') {
                setNewBookingId(res.data?.id || res.id);
                return res;
            }
            throw new Error(res.message || 'Error api');
        } catch (e) { 
            console.error("Error saving booking:", e); 
            return null;
        }
    };

    const resetModal = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setFormData({
                name: '',
                date: null,
                pax: '',
                hotel: '',
                coupon: '',
                experience: 'comfort',
                selectedStops: [],
                acceptedTerms: false,
                email: '',
                phone: ''
            });
            setShowCoupon(false);
            setNewBookingId(null);
            setCouponInput('');
            setAppliedCoupon(null);
            setCouponError('');
        }, 500);
    };

    useEffect(() => {
        if (isOpen) {
            const foundTour = tours.find(t => t.id === tourId);
            if (foundTour && foundTour.pricing && foundTour.pricing.elite === null && formData.experience === 'elite') {
                setFormData(prev => ({ ...prev, experience: 'comfort' }));
            }
            if (tourId === 'ubud-flexible') {
                if (initialSelectedStops && initialSelectedStops.length > 0) {
                    setFormData(prev => ({ ...prev, selectedStops: initialSelectedStops }));
                }
            } else {
                if (foundTour && foundTour.itinerary) {
                    const fixedStops = foundTour.itinerary
                        .filter(item => item.type === 'visit')
                        .map(item => i18n.language === 'en' ? item.activity_en : item.activity);
                    setFormData(prev => ({ ...prev, selectedStops: fixedStops }));
                }
            }
        }
    }, [isOpen, tourId, initialSelectedStops, i18n.language]);

    const foundTourObj = tours.find(t => t.id === tourId) || {};
    const pricing = foundTourObj.pricing || {
        economy: tourPrice || 59,
        comfort: (tourPrice || 59) + 10,
        elite: (tourPrice || 59) + 25,
        extraPaxStartThreshold: 5,
        extraPaxFee: 2.5
    };

    let finalPriceForTier = 0;
    let expName = '';
    let expSub = '';
    switch (formData.experience) {
        case 'economy':
            expName = i18n.language === 'en' ? 'S - LOCAL DRIVER (ENGLISH)' : 'S - CONDUCTOR LOCAL (INGLÉS)';
            expSub = t('detail.exp_economy_sub');
            finalPriceForTier = pricing.economy;
            break;
        case 'comfort':
            expName = i18n.language === 'en' ? 'M - PROFESSIONAL GUIDE (ENGLISH)' : 'M - GUÍA PROFESIONAL (INGLÉS)';
            expSub = t('detail.exp_comfort_sub');
            finalPriceForTier = pricing.comfort;
            break;
        case 'elite':
            expName = i18n.language === 'en' ? 'L - PROFESSIONAL GUIDE (SPANISH)' : 'L - GUÍA PROFESIONAL (ESPAÑOL)';
            expSub = t('detail.exp_elite_sub');
            finalPriceForTier = pricing.elite || 0;
            break;
        default:
            expName = '';
            expSub = '';
    }
    const paxNum = parseInt(formData.pax) || 2;
    let extraPaxFee = 0;
    let paxMessage = '';
    let paxMessageEn = '';

    // Lovina specific counts (Base covers 1-4 pax, +10€ per pax from 5th, +35€ per extra boat (max 4 pax per boat))
    const extraPaxCount = Math.max(0, paxNum - 4);
    const paxExtraCost = extraPaxCount * 10;
    const extraBoatsCount = Math.ceil(paxNum / 4) - 1;
    const boatExtraCost = extraBoatsCount * 35;

    if (tourId === 'lovina-dolphins') {
        extraPaxFee = paxExtraCost + boatExtraCost;
        paxMessage = `Extras Lovina (+${extraPaxFee}€)`;
        paxMessageEn = `Lovina Extras (+${extraPaxFee}€)`;
    } else {
        if (paxNum >= 7) {
            extraPaxFee = 30;
            paxMessage = 'Cambio obligatorio a Minivan Hiace o similar (+30€)';
            paxMessageEn = 'Mandatory upgrade to Minivan Hiace or similar (+30€)';
        } else if (paxNum >= 5) {
            extraPaxFee = (paxNum - 4) * 5;
            paxMessage = `Coche estándar al máximo de su capacidad (+${extraPaxFee}€)`;
            paxMessageEn = `Standard car at maximum capacity (+${extraPaxFee}€)`;
        } else {
            extraPaxFee = 0;
            paxMessage = 'Precio base (sin suplemento)';
            paxMessageEn = 'Base price (no supplement)';
        }
    }

    const finalTotalPrice = finalPriceForTier + extraPaxFee;

    // Apply Coupon Discount if exists
    let discountAmount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.discount_type === 'percent') {
            discountAmount = (finalTotalPrice * Number(appliedCoupon.discount_value)) / 100;
        } else {
            discountAmount = Number(appliedCoupon.discount_value);
        }
    }
    const finalTotalPriceWithDiscount = Math.max(0, finalTotalPrice - discountAmount);
    const finalTotalPriceWithFees = finalTotalPriceWithDiscount;

    const isUbudStops = tourId === 'ubud-flexible' && (!initialSelectedStops || (initialSelectedStops?.length || 0) === 0);

    const handleApplyCoupon = async () => {
        if (!couponInput || !couponInput.trim()) return;
        setCouponLoading(true);
        setCouponError('');
        try {
            const res = await validateCoupon(couponInput.trim().toUpperCase());
            if (res.status === 'success' && res.data) {
                setAppliedCoupon(res.data);
                setCouponInput('');
                setCouponError('');
            } else {
                setCouponError(i18n.language === 'en' ? 'Invalid coupon code' : 'Cupón no válido');
                setAppliedCoupon(null);
            }
        } catch (e) {
            setCouponError(i18n.language === 'en' ? 'Error validating coupon' : 'Error al validar cupón');
            setAppliedCoupon(null);
        } finally {
            setCouponLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (isUbudStops) {
                if ((formData.selectedStops?.length || 0) === 0) {
                    alert(i18n.language.startsWith('es') ? "Por favor selecciona al menos una parada." : "Please select at least one stop.");
                    return;
                }
                setStep(2);
            } else {
                setStep(3);
            }
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };

    const handleConfirmBooking = async () => {
        setIsSubmitting(true);
        const startTime = Date.now();
        const instantId = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        const res = await saveBookingToDB(instantId); 
        if (!res) {
            alert(i18n.language === 'en' 
                ? 'Error saving your booking. Please try again.' 
                : 'Error al procesar tu reserva. Por favor, inténtalo de nuevo.');
            setIsSubmitting(false);
            return;
        }

        trackEvent('Conversion', 'Web Booking Request', tourTitle);
        trackLeadWhatsapp(tourTitle, finalTotalPriceWithFees);
        
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, 1500 - elapsed);

        setTimeout(() => {
            resetModal();
            setIsSubmitting(false);
            navigate(`/${i18n.language}/booking?ref=CT-${instantId}`);
        }, remainingDelay);
    };

    const inputClasses = "w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-gray-700 dark:text-gray-200 min-h-[62px] block box-border";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden z-10" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-primary/10 p-6 flex flex-col gap-2 border-b border-primary/5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-primary uppercase tracking-tight">{step === 1 && isUbudStops ? (i18n.language === 'en' ? 'Build your Route' : 'Arma tu Ruta') : t('detail.booking_title')}</h3>
                                <button onClick={resetModal} className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white flex items-center justify-center transition-colors"><X size={20} className="text-gray-600 dark:text-gray-400" /></button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                {[1, 2, 3, 4].map((s) => (
                                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= s ? 'bg-primary' : 'bg-primary/20 dark:bg-white/10'} ${(!isUbudStops) && s === 2 ? 'hidden' : ''}`} />
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="relative p-8 max-h-[80vh] overflow-y-auto custom-scrollbar overflow-x-hidden">
                            <AnimatePresence>
                                {isSubmitting && (
                                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
                                        <Loader2 size={56} className="animate-spin text-primary mb-6" />
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                                            {i18n.language === 'en' ? 'Preparing your Experience...' : 'Preparando tu Experiencia...'}
                                        </h3>
                                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed max-w-[80%] mx-auto">
                                            {i18n.language === 'en' ? 'Saving your booking. You will be redirected to your live ticket momentarily.' : 'Guardando tu reserva. Serás redirigido a tu boleto en un momento.'}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                {step === 1 && isUbudStops && (
                                    <motion.div key="step1-stops" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="flex items-center justify-between bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black">{formData.selectedStops.length}</div>
                                                <span className="text-sm font-black text-primary uppercase tracking-wider">{i18n.language === 'en' ? 'Stops Selected' : 'Paradas Seleccionadas'}</span>
                                            </div>
                                            <span className="text-xs font-bold text-gray-500">{i18n.language === 'en' ? 'Limit: 5' : 'Máximo: 5'}</span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                            {availableStops.map((stop) => {
                                                const isSelected = formData.selectedStops.includes(stop.name);
                                                const isDisabled = !isSelected && formData.selectedStops.length >= 5;
                                                return (
                                                    <button key={stop.id} type="button" disabled={isDisabled} onClick={() => { const current = formData.selectedStops; if (isSelected) setFormData({ ...formData, selectedStops: current.filter(s => s !== stop.name) }); else if (current.length < 5) setFormData({ ...formData, selectedStops: [...current, stop.name] }); }} className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${isSelected ? 'bg-primary/5 border-primary' : isDisabled ? 'opacity-40 grayscale cursor-not-allowed border-black/5' : 'bg-white dark:bg-white/5 border-black/5 hover:border-primary/30'}`}>
                                                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 ${isSelected ? 'bg-primary border-primary' : 'border-gray-200'}`} />
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between gap-2"><span className="text-sm font-black leading-tight text-gray-900 dark:text-white">{i18n.language === 'en' ? stop.name_en : stop.name}</span></div>
                                                            <p className="text-[10px] text-gray-500 font-bold mt-1 line-clamp-1">{i18n.language === 'en' ? stop.desc_en : stop.desc}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="flex gap-3">
                                            <button type="submit" disabled={formData.selectedStops.length === 0} className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${formData.selectedStops.length > 0 ? 'bg-secondary text-white shadow-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>{i18n.language === 'en' ? 'NEXT' : 'SIGUIENTE'} <ArrowRight size={20} className="inline ml-2" /></button>
                                        </div>
                                    </motion.div>
                                )}

                                {((isUbudStops && step === 2) || (!isUbudStops && step === 1)) && (
                                    <motion.div key="step-product" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Star size={14} className="text-primary" />{t('detail.booking_experience')}</label>
                                            <div className="grid gap-3">
                                                {['economy', 'comfort', 'elite']
                                                    .filter((tier) => !(tourId === 'lovina-dolphins' && tier === 'elite'))
                                                    .map((tier) => {
                                                    const price = tier === 'economy' ? pricing.economy : tier === 'comfort' ? pricing.comfort : pricing.elite;
                                                    const isAvailable = price !== null && price !== undefined;
                                                    const isSelected = formData.experience === tier;
                                                    let tierStyles = 'border-black/5 dark:border-white/5';
                                                    let titleStyles = 'text-gray-900 dark:text-white';
                                                    let priceStyles = 'text-gray-900 dark:text-white';
                                                    
                                                    if (!isAvailable) {
                                                        return null;
                                                    }

                                                    if (isSelected) {
                                                        if (tier === 'economy') { 
                                                            tierStyles = 'border-gray-400 dark:border-gray-500 bg-gray-50/50 dark:bg-white/5'; 
                                                            titleStyles = 'text-gray-900 dark:text-white font-extrabold';
                                                            priceStyles = 'text-gray-900 dark:text-white';
                                                        }
                                                        if (tier === 'comfort') { 
                                                            tierStyles = 'border-primary bg-primary/5'; 
                                                            titleStyles = 'text-primary font-extrabold';
                                                            priceStyles = 'text-primary';
                                                        }
                                                        if (tier === 'elite') { 
                                                            tierStyles = 'border-[#D4AF37] bg-[#D4AF37]/5'; 
                                                            titleStyles = 'text-[#D4AF37] font-extrabold';
                                                            priceStyles = 'text-[#D4AF37]';
                                                        }
                                                    } else {
                                                        tierStyles += ' opacity-70 hover:opacity-100 hover:border-black/10 dark:hover:border-white/10';
                                                    }
                                                    return (
                                                        <motion.label key={tier} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`relative flex items-start p-5 rounded-2xl border-2 transition-all cursor-pointer ${tierStyles}`}>
                                                            {isSelected && tier === 'economy' && (
                                                                <div className="absolute -top-2.5 right-4 bg-gray-400 text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">{i18n.language === 'en' ? 'Budget' : 'Económico'}</div>
                                                            )}
                                                            {isSelected && tier === 'comfort' && (
                                                                <div className="absolute -top-2.5 right-4 bg-primary text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">{i18n.language === 'en' ? 'Recommended' : 'Recomendado'}</div>
                                                            )}
                                                            {isSelected && tier === 'elite' && (
                                                                <div className="absolute -top-2.5 right-4 bg-[#D4AF37] text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">{i18n.language === 'en' ? 'Top Choice' : 'Experiencia Top'}</div>
                                                            )}
                                                            <input type="radio" name="experience" value={tier} checked={isSelected} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="sr-only" />
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <div className="flex flex-col">
                                                                        <span className={`text-xs font-black uppercase tracking-wider ${titleStyles}`}>
                                                                            {tier === 'economy'
                                                                                ? (i18n.language === 'en' ? 'S - LOCAL DRIVER (ENGLISH)' : 'S - CONDUCTOR LOCAL (INGLÉS)')
                                                                                : tier === 'comfort'
                                                                                    ? (i18n.language === 'en' ? 'M - PROFESSIONAL GUIDE (ENGLISH)' : 'M - GUÍA PROFESIONAL (INGLÉS)')
                                                                                    : (i18n.language === 'en' ? 'L - PROFESSIONAL GUIDE (SPANISH)' : 'L - GUÍA PROFESIONAL (ESPAÑOL)')}
                                                                        </span>
                                                                    </div>
                                                                    <span className={`text-xl font-black ${priceStyles}`}>{formatPrice(price).symbol}{formatPrice(price).amount}</span>
                                                                </div>
                                                                
                                                                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bold block leading-relaxed pr-4 mt-1">{t(`detail.exp_${tier}_desc`)}</span>
                                                            </div>
                                                        </motion.label>
                                                    );
                                                })}
                                            </div>
                                            {tourId === 'lovina-dolphins' && (
                                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-xs font-bold text-primary flex items-start gap-3 mt-4">
                                                    <ShieldCheck size={18} className="shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-extrabold uppercase tracking-wide mb-1 text-primary">
                                                            {i18n.language === 'en' ? '💎 Exclusive Private Boat Included' : '💎 Barca Privada Exclusiva Incluida'}
                                                        </p>
                                                        <p className="opacity-90 leading-relaxed text-[11px] font-medium">
                                                            {i18n.language === 'en' 
                                                                ? 'This package includes your private vehicle and the charter of a traditional boat (Jukung) exclusive for your group. Maximum capacity is 4 passengers per boat; for larger groups, we will add an additional or larger boat for your absolute safety and comfort.' 
                                                                : 'Este paquete incluye tu vehículo privado y el alquiler de un bote tradicional (Jukung) exclusivo para tu grupo. La capacidad máxima es de 4 pasajeros por bote; para grupos mayores, añadiremos un bote adicional o un barco más grande para tu total comodidad y seguridad.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            {isUbudStops && <button type="button" onClick={() => setStep(1)} className="w-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center transition-colors"><ArrowLeft size={20} /></button>}
                                            <button type="submit" className="flex-1 btn-primary py-4 rounded-2xl text-lg font-black shadow-xl">{i18n.language === 'en' ? 'Next' : 'Siguiente'} <ArrowRight size={20} className="inline ml-2" /></button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step-personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Calendar size={14} className="text-primary" />{t('detail.booking_date')}</label>
                                            <DatePicker 
                                                selected={formData.date} 
                                                onChange={(date) => setFormData({ ...formData, date })} 
                                                minDate={getMinSelectableDate()} 
                                                maxDate={getMaxSelectableDate()}
                                                filterDate={(date) => !isDateFullyBooked(date)} 
                                                dayClassName={(date) => { const status = getDynamicStatus(date); return status === 'yellow' ? 'custom-day-yellow' : (status === 'red' ? 'custom-day-red' : 'custom-day-green'); }} 
                                                dateFormat="dd/MM/yyyy" 
                                                required 
                                                className={inputClasses} 
                                                wrapperClassName="w-full" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Users size={14} className="text-primary" />{t('detail.booking_pax')}</label>
                                            <select 
                                                value={formData.pax} 
                                                onChange={(e) => setFormData({ ...formData, pax: e.target.value })} 
                                                className={inputClasses}
                                                required
                                            >
                                                <option value="" disabled>{i18n.language === 'en' ? 'Select number of people...' : 'Selecciona cantidad...'}</option>
                                                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{t(`detail.booking_pax_${n}`)}</option>)}
                                                <option value="13 o más">{t('detail.booking_pax_more')}</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><User size={14} className="text-primary" />{t('reviews_page.form.name')}</label>
                                            <input type="text" required placeholder={i18n.language === 'en' ? 'Your full name' : 'Tu nombre completo'} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClasses} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><MapPin size={14} className="text-primary" />{t('detail.booking_hotel')}</label>
                                            <input type="text" required placeholder={t('detail.booking_hotel_placeholder')} value={formData.hotel} onChange={(e) => setFormData({ ...formData, hotel: e.target.value })} className={inputClasses} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><span className="text-primary">@</span> {i18n.language === 'en' ? 'Email Address' : 'Correo Electrónico'}</label>
                                            <input type="email" required placeholder={i18n.language === 'en' ? 'your@email.com' : 'tu@correo.com'} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClasses} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Phone size={14} className="text-primary" />{i18n.language === 'en' ? 'WhatsApp / Phone Number' : 'WhatsApp / Teléfono'}</label>
                                            <input type="tel" required placeholder={i18n.language === 'en' ? 'e.g. +34 600 000 000' : 'ej: +34 600 000 000'} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClasses} />
                                        </div>
                                        <div className="flex gap-3">
                                            <button type="button" onClick={() => setStep(isUbudStops ? 2 : 1)} className="w-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center transition-colors"><ArrowLeft size={20} /></button>
                                            <button type="submit" className="flex-1 btn-primary py-4 rounded-2xl text-lg font-black shadow-xl">{i18n.language === 'en' ? 'Next' : 'Siguiente'} <ArrowRight size={20} className="inline ml-2" /></button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="step-confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-6">
                                        <div className="bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-xl">
                                            <div className="bg-primary/10 p-4 flex items-center justify-between"><h3 className="text-[10px] font-black text-primary uppercase tracking-widest">{i18n.language === 'en' ? 'RESERVATION SUMMARY' : 'RESUMEN DE RESERVA'}</h3></div>
                                            <div className="p-5 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div><span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{t('detail.msg_tour')}</span><p className="text-[11px] font-bold leading-tight text-gray-900 dark:text-white">{tourTitle}</p></div>
                                                    <div><span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{t('detail.msg_date')}</span><p className="text-[11px] font-bold text-gray-900 dark:text-white">{formData.date?.toLocaleDateString('es-ES')}</p></div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-black/5">
                                                    <div><span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{i18n.language === 'en' ? 'Client' : 'Cliente'}</span><p className="text-[11px] font-bold text-gray-900 dark:text-white truncate">{formData.name}</p></div>
                                                    <div><span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{t('detail.msg_pax')}</span><p className="text-[11px] font-bold text-gray-900 dark:text-white">{formData.pax} {i18n.language === 'en' ? 'People' : 'Personas'}</p></div>
                                                </div>
                                                <div className="pt-3 border-t border-black/5 flex justify-between items-center">
                                                    <div>
                                                        <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{i18n.language === 'en' ? 'Service Selected' : 'Servicio Contratado'}</span>
                                                        <p className="text-[11px] font-bold text-primary">{expName}</p>
                                                    </div>
                                                    <span className="text-xs font-bold text-primary">{finalPriceForTier}€</span>
                                                </div>
                                                {tourId === 'lovina-dolphins' ? (
                                                    <>
                                                        {extraPaxCount > 0 && (
                                                            <div className="pt-3 border-t border-black/5 flex justify-between items-center">
                                                                <div>
                                                                    <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{i18n.language === 'en' ? 'Extra Passengers' : 'Pasajeros Adicionales'}</span>
                                                                    <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                                                                        {i18n.language === 'en' ? `Supplement for ${extraPaxCount} extra pax` : `Suplemento por ${extraPaxCount} pax extra`}
                                                                    </p>
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">+{paxExtraCost}€</span>
                                                            </div>
                                                        )}
                                                        {extraBoatsCount > 0 && (
                                                            <div className="pt-3 border-t border-black/5 flex justify-between items-center">
                                                                <div>
                                                                    <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{i18n.language === 'en' ? 'Additional Boat' : 'Bote Adicional'}</span>
                                                                    <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                                                                        {i18n.language === 'en' ? `${extraBoatsCount} extra Jukung boat` : `${extraBoatsCount} bote Jukung adicional`}
                                                                    </p>
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">+{boatExtraCost}€</span>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    extraPaxFee > 0 && (
                                                        <div className="pt-3 border-t border-black/5 flex justify-between items-center">
                                                            <div>
                                                                <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{i18n.language === 'en' ? 'Vehicle & Supplement' : 'Vehículo y Suplemento'}</span>
                                                                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300">{i18n.language === 'en' ? paxMessageEn : paxMessage}</p>
                                                            </div>
                                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">+{extraPaxFee}€</span>
                                                        </div>
                                                    )
                                                )}
                                                {appliedCoupon && (
                                                    <div className="pt-3 border-t border-black/5 flex items-center justify-between text-green-500">
                                                        <span className="text-[10px] font-black uppercase tracking-wider">{i18n.language === 'en' ? 'DISCOUNT APPLIED' : 'DESCUENTO APLICADO'}</span>
                                                        <div className="text-sm font-bold">-{discountAmount}€ ({appliedCoupon.code})</div>
                                                    </div>
                                                )}

                                                {/* Coupon Toggle/Form inside Summary Card */}
                                                <div className="pt-3 border-t border-dashed border-black/5 dark:border-white/5 space-y-2">
                                                    <button 
                                                        type="button"
                                                        onClick={() => setShowCoupon(!showCoupon)}
                                                        className="flex items-center justify-between w-full outline-none group text-left"
                                                    >
                                                        <span className="text-[9px] font-black text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors uppercase tracking-wider flex items-center gap-1.5">
                                                            <Ticket size={11} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                                                            {i18n.language === 'en' ? 'HAVE A COUPON?' : '¿TIENES UN CUPÓN?'}
                                                        </span>
                                                        {appliedCoupon ? (
                                                            <span className="text-[8px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                                {i18n.language === 'en' ? 'Applied' : 'Aplicado'}
                                                            </span>
                                                        ) : (
                                                            <span className="text-[8px] font-black text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                                                {showCoupon ? (i18n.language === 'en' ? 'Hide' : 'Ocultar') : (i18n.language === 'en' ? 'Add' : 'Añadir')}
                                                            </span>
                                                        )}
                                                    </button>
                                                    
                                                    {(showCoupon || appliedCoupon) && (
                                                        <div className="pt-1">
                                                            {!appliedCoupon ? (
                                                                <>
                                                                    <div className="flex gap-2">
                                                                        <input 
                                                                            type="text" 
                                                                            placeholder={i18n.language === 'en' ? 'Code...' : 'Código...'} 
                                                                            value={couponInput} 
                                                                            onChange={(e) => setCouponInput(e.target.value)} 
                                                                            className="flex-1 bg-gray-50 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase outline-none focus:border-primary/50 text-gray-800 dark:text-white"
                                                                        />
                                                                        <button 
                                                                            type="button" 
                                                                            onClick={handleApplyCoupon}
                                                                            disabled={couponLoading || !couponInput.trim()}
                                                                            className="px-3 py-1.5 bg-gray-150 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 rounded-lg text-[10px] font-black transition-all active:scale-[0.98] disabled:opacity-50"
                                                                        >
                                                                            {couponLoading ? '...' : (i18n.language === 'en' ? 'APPLY' : 'APLICAR')}
                                                                        </button>
                                                                    </div>
                                                                    {couponError && <p className="text-[9px] text-red-500 font-bold mt-1">{couponError}</p>}
                                                                </>
                                                            ) : (
                                                                <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-1.5 w-fit">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <span className="text-[10px] font-black text-gray-800 dark:text-white">{appliedCoupon.code}</span>
                                                                        <span className="text-[9px] font-bold text-green-500">(-{appliedCoupon.discount_type === 'percent' ? appliedCoupon.discount_value + '%' : appliedCoupon.discount_value + '€'})</span>
                                                                    </div>
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => { setAppliedCoupon(null); setCouponInput(''); }}
                                                                        className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                                                                    >
                                                                        <X size={12} strokeWidth={3} />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-wider">{i18n.language === 'en' ? 'TOTAL' : 'TOTAL'}</span>
                                                    <div className="text-2xl font-black text-primary">{finalTotalPriceWithFees}€</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-1">

                                            <div className="text-center mb-4 px-4">
                                                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 leading-snug">
                                                    {i18n.language === 'en' ? 'You are just one step away from experiencing Bali with us! Request your booking now and secure your spot by making a 100% secure payment next.' : '¡Estás a un paso de vivir Bali con nosotros! Solicita tu reserva ahora y asegura tu plaza realizando el pago de forma 100% segura a continuación.'}
                                                </p>
                                            </div>

                                            {/* CTA Confirm Booking */}
                                            <button type="button" disabled={isSubmitting} onClick={handleConfirmBooking} className={`w-full py-5 rounded-[2rem] bg-primary text-white flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] relative overflow-hidden group ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-95'}`}>
                                                {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />}
                                                {isSubmitting ? <Loader2 size={22} className="animate-spin" /> : <ShieldCheck size={22} />}
                                                <span className="text-[15px] font-black tracking-tight">{isSubmitting ? (i18n.language === 'en' ? 'PROCESSING...' : 'PROCESANDO...') : (i18n.language === 'en' ? 'REQUEST BOOKING' : 'SOLICITAR RESERVA')}</span>
                                            </button>

                                            {/* Terms */}
                                            <p className="text-center text-[9px] font-bold text-gray-400 dark:text-gray-500 leading-relaxed uppercase tracking-widest">
                                                {i18n.language === 'en'
                                                    ? <span>By confirming I accept the <a href="/politicas" target="_blank" className="text-primary underline">Terms of Service</a>.</span>
                                                    : <span>Al confirmar acepto los <a href="/politicas" target="_blank" className="text-primary underline">Términos de Servicio</a>.</span>
                                                }
                                            </p>
                                        </div>

                                        {/* Back button */}
                                        <div className="flex justify-center">
                                            <button type="button" onClick={() => setStep(3)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors">
                                                <ArrowLeft size={14} /> {i18n.language === 'en' ? 'BACK' : 'VOLVER'}
                                            </button>
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
