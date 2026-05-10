import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket, Star, Heart, ArrowRight, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { trackEvent, trackLeadWhatsapp } from '../utils/analytics';
import { tours } from '../data/tours';
import { getAvailability, saveBooking } from '../services/api';

const BookingModal = ({ isOpen, onClose, tourTitle, tourPrice, tourId, initialSelectedStops }) => {
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency();
    const [step, setStep] = useState(1);
    const flexibleTour = tours.find(t => t.id === 'ubud-flexible');
    const availableStops = flexibleTour?.availableStops || [];
    const [availability, setAvailability] = useState({});
    const [showCoupon, setShowCoupon] = useState(false);
    const [newBookingId, setNewBookingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        date: null,
        pax: '2',
        hotel: '',
        coupon: '',
        experience: 'comfort',
        selectedStops: [],
        acceptedTerms: false
    });

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
        if (count >= 8) return 'red';
        if (count >= 5) return 'yellow';
        return 'green';
    };

    const isDateFullyBooked = (date) => {
        const ds = getLocalISO(date);
        return (availability[ds] || 0) >= 10; // Relaxed to 10 for request model
    };

    const saveBookingToDB = async (customRef = null) => {
        try {
            const data = {
                tour_id: tourId || tourTitle.toLowerCase().replace(/\s+/g, '-'),
                tour_title: tourTitle,
                client_name: formData.name,
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
            }
        } catch (e) { 
            console.error("Error saving booking:", e); 
        }
    };

    const resetModal = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setFormData({
                name: '',
                date: null,
                pax: '2',
                hotel: '',
                coupon: '',
                experience: 'comfort',
                selectedStops: [],
                acceptedTerms: false
            });
            setShowCoupon(false);
            setNewBookingId(null);
        }, 500);
    };

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
    const paxNum = parseInt(formData.pax) || 2;
    const extraPaxFee = paxNum > 4 ? (paxNum - 4) * 2.5 : 0;
    const finalTotalPrice = totalPrice + extraPaxFee;
    const finalTotalPriceWithFees = finalTotalPrice; // No extra fees for request flow

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep((tourId === 'ubud-flexible' && (!initialSelectedStops || (initialSelectedStops?.length || 0) === 0)) ? 2 : 3);
        } else if (step === 2) {
            if ((formData.selectedStops?.length || 0) === 0) {
                alert(i18n.language.startsWith('es') ? "Por favor selecciona al menos una parada." : "Please select at least one stop.");
                return;
            }
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };

    const handleConfirmWhatsApp = () => {
        const instantId = Math.random().toString(36).substring(2, 6).toUpperCase();
        const paxValue = String(formData.pax).replace(' o más', '');
        const paxLabel = t(`detail.booking_pax_${paxValue}`);
        const dateStr = formData.date ? formData.date.toLocaleDateString('es-ES') : '';
        
        // Sanitize tour title to remove emojis that might cause 
        const cleanTourTitle = tourTitle.replace(/[\u\d][\u\d][\u\d][\u\d][\u\d]|[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();

        const message = `*SOLICITUD DE RESERVA - CANTIK TOURS*
------------------------------------------
• *Referencia:* #CT-${instantId}

• *CLIENTE:* ${formData.name.toUpperCase()}
• *TOUR:* ${cleanTourTitle.toUpperCase()}
• *FECHA:* ${dateStr}
• *PASAJEROS:* ${paxLabel}
• *HOTEL:* ${formData.hotel.toUpperCase()}
• *EXPERIENCIA:* ${expName}
${tourId === 'ubud-flexible' && formData.selectedStops.length > 0 ? `• *PARADAS:* ${formData.selectedStops.join(', ')}` : ''}

• *PRECIO ESTIMADO:* ${finalTotalPriceWithFees} EUR

------------------------------------------
*PASO FINAL:* Hola Cantik Tours, me gustaría solicitar esta reserva. ¿Me podéis confirmar disponibilidad y enviarme los datos para el pago? ¡Gracias!

*Ficha de solicitud:* https://cantiktours.com/booking?ref=CT-${instantId}`;

        const finalUrl = `https://wa.me/34642517787?text=${encodeURIComponent(message)}`;
        window.open(finalUrl, '_blank');

        saveBookingToDB(instantId); 
        trackEvent('Conversion', 'WhatsApp Booking Request', tourTitle);
        trackLeadWhatsapp(tourTitle, finalTotalPriceWithFees);
        resetModal();
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
                                <h3 className="text-xl font-black text-primary uppercase tracking-tight">{step === 1 ? (i18n.language === 'en' ? 'Build your Route' : 'Arma tu Ruta') : t('detail.booking_title')}</h3>
                                <button onClick={resetModal} className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white flex items-center justify-center transition-colors"><X size={20} className="text-gray-600 dark:text-gray-400" /></button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                {[1, 2, 3, 4].map((s) => (
                                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= s ? 'bg-primary' : 'bg-primary/20 dark:bg-white/10'} ${(tourId !== 'ubud-flexible' || (initialSelectedStops && initialSelectedStops.length > 0)) && s === 2 ? 'hidden' : ''}`} />
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar overflow-x-hidden">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><User size={14} className="text-primary" />{t('reviews_page.form.name')}</label>
                                            <input type="text" required placeholder={i18n.language === 'en' ? 'Your full name' : 'Tu nombre completo'} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClasses} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Calendar size={14} className="text-primary" />{t('detail.booking_date')}</label>
                                            <DatePicker selected={formData.date} onChange={(date) => setFormData({ ...formData, date })} minDate={new Date()} filterDate={(date) => !isDateFullyBooked(date)} dayClassName={(date) => { const status = getDynamicStatus(date); return status === 'yellow' ? 'custom-day-yellow' : (status === 'red' ? 'custom-day-red' : 'custom-day-green'); }} dateFormat="dd/MM/yyyy" required className={inputClasses} wrapperClassName="w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Users size={14} className="text-primary" />{t('detail.booking_pax')}</label>
                                            <select value={formData.pax} onChange={(e) => setFormData({ ...formData, pax: e.target.value })} className={inputClasses}>
                                                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{t(`detail.booking_pax_${n}`)}</option>)}
                                                <option value="13 o más">{t('detail.booking_pax_more')}</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><MapPin size={14} className="text-primary" />{t('detail.booking_hotel')}</label>
                                            <input type="text" required placeholder={t('detail.booking_hotel_placeholder')} value={formData.hotel} onChange={(e) => setFormData({ ...formData, hotel: e.target.value })} className={inputClasses} />
                                        </div>
                                        <button type="submit" className="w-full btn-primary py-4 rounded-2xl text-lg font-black shadow-xl flex items-center justify-center gap-3">Siguiente <ArrowRight size={20} /></button>
                                    </motion.div>
                                )}

                                {step === 2 && tourId === 'ubud-flexible' && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
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
                                            <button type="button" onClick={() => setStep(1)} className="w-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center transition-colors"><ArrowLeft size={20} /></button>
                                            <button type="submit" disabled={formData.selectedStops.length < 5} className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${formData.selectedStops.length === 5 ? 'bg-secondary text-white shadow-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>SIGUIENTE <ArrowRight size={20} className="inline ml-2" /></button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"><Star size={14} className="text-primary" />{t('detail.booking_experience')}</label>
                                            <div className="grid gap-3">
                                                {['economy', 'comfort', 'elite'].map((tier) => {
                                                    const price = tier === 'economy' ? tourPrice : tier === 'comfort' ? tourPrice + 10 : tourPrice + 25;
                                                    const isSelected = formData.experience === tier;
                                                    
                                                    // S, M, L Labels
                                                    const sizePrefix = tier === 'economy' ? 'S - ' : tier === 'comfort' ? 'M - ' : 'L - ';
                                                    
                                                    // Define colors based on tier
                                                    let tierStyles = '';
                                                    let textStyles = 'text-gray-900 dark:text-white';
                                                    
                                                    if (isSelected) {
                                                        if (tier === 'economy') {
                                                            tierStyles = 'border-gray-400';
                                                            textStyles = 'text-gray-200';
                                                        }
                                                        if (tier === 'comfort') {
                                                            tierStyles = 'border-primary';
                                                            textStyles = 'text-primary';
                                                        }
                                                        if (tier === 'elite') {
                                                            tierStyles = 'border-[#D4AF37]';
                                                            textStyles = 'text-[#D4AF37]';
                                                        }
                                                    } else {
                                                        tierStyles = 'border-black/5 dark:border-white/5 opacity-80';
                                                    }
                                                    
                                                    return (
                                                        <motion.label 
                                                            key={tier} 
                                                            whileHover={{ scale: 1.01 }}
                                                            whileTap={{ scale: 0.99 }}
                                                            className={`relative flex items-start p-5 rounded-2xl border-2 transition-all cursor-pointer ${tierStyles}`}
                                                        >
                                                            {isSelected && tier === 'comfort' && (
                                                                <div className="absolute -top-2.5 right-4 bg-primary text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">
                                                                    {i18n.language === 'en' ? 'Recommended' : 'Recomendado'}
                                                                </div>
                                                            )}
                                                            <input type="radio" name="experience" value={tier} checked={isSelected} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="sr-only" />
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between mb-1.5">
                                                                    <div className="flex flex-col">
                                                                        <span className={`text-sm font-black uppercase tracking-tight ${textStyles}`}>
                                                                            {sizePrefix}{t(`detail.exp_${tier}_title`)}
                                                                        </span>
                                                                    </div>
                                                                    <span className={`text-xl font-black ${textStyles}`}>
                                                                        {formatPrice(price).symbol}{formatPrice(price).amount}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bold block leading-relaxed pr-4">
                                                                    {t(`detail.exp_${tier}_desc`)}
                                                                </span>
                                                            </div>
                                                        </motion.label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button type="button" onClick={() => setStep(tourId === 'ubud-flexible' ? 2 : 1)} className="w-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center transition-colors"><ArrowLeft size={20} /></button>
                                            <button type="submit" className="flex-1 btn-primary py-4 rounded-2xl text-lg font-black shadow-xl">Siguiente <ArrowRight size={20} className="inline ml-2" /></button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-6">
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
                                                <div className="pt-3 border-t border-black/5">
                                                    <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">{i18n.language === 'en' ? 'Service Selected' : 'Servicio Contratado'}</span>
                                                    <p className="text-[11px] font-bold text-primary">{expName}</p>
                                                </div>
                                                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-wider">{i18n.language === 'en' ? 'TOTAL ESTIMATED' : 'TOTAL ESTIMADO'}</span>
                                                    <div className="text-2xl font-black text-primary">{finalTotalPriceWithFees}€</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <button type="button" onClick={handleConfirmWhatsApp} className="w-full py-6 rounded-[2rem] bg-[#25D366] text-white text-sm font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#25D366]/20 active:scale-[0.98] hover:bg-[#1fb355]">
                                                <MessageCircle size={24} /> 
                                                <span>{i18n.language === 'en' ? 'CONFIRM AND REQUEST VIA WHATSAPP' : 'CONFIRMAR Y SOLICITAR POR WHATSAPP'}</span>
                                            </button>
                                            <div className="text-center px-4">
                                                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 leading-relaxed uppercase tracking-widest">
                                                    {i18n.language === 'en' 
                                                        ? <>By clicking I Accept the <a href="/politicas" target="_blank" className="text-primary underline">Terms of Service</a>.</> 
                                                        : <>Al hacer clic Acepto los <a href="/politicas" target="_blank" className="text-primary underline">Términos de Servicio</a>.</>
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center pt-2">
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
