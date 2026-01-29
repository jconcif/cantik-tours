import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Share2, Star,
    Car, Languages, Droplets, Info, MapPin,
    Clock, Check, X, Shield, Calendar, AlertCircle,
    Flag, Landmark, Utensils, Camera, Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours } from '../data/tours';
import BookingModal from '../components/BookingModal';
import TransferModal from '../components/TransferModal';
import ReviewsModal from '../components/ReviewsModal';
import { formatDateAgo } from '../utils/dateUtils';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../utils/i18nUtils';

const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [tour, setTour] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const l = (obj, field) => getLocalized(obj || tour, field, i18n.language);

    const getItineraryIcon = (type) => {
        switch (type) {
            case 'pickup': return <MapPin size={20} />;
            case 'transport': return <Car size={20} />;
            case 'visit': return <Landmark size={20} />;
            case 'food': return <Utensils size={20} />;
            case 'dropoff': return <Flag size={20} />;
            case 'photo': return <Camera size={20} />;
            case 'beach': return <Droplets size={20} />;
            default: return <Map size={20} />;
        }
    };

    const getPackingIcon = (item) => {
        switch (item) {
            case 'shoes': return <Check size={20} />;
            case 'sunscreen': return <Shield size={20} />;
            case 'camera': return <Camera size={20} />;
            case 'swimwear': return <Droplets size={20} />;
            case 'money': return <Clock size={20} />; // Placeholder
            default: return <Check size={20} />;
        }
    };

    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        const foundTour = tours.find(t => t.id == id);
        if (foundTour) {
            setTour(foundTour);
            document.title = `${l(foundTour, 'title')} | Cantik Tours Bali`;
        } else {
            setTour(tours[0]);
        }
        window.scrollTo(0, 0);
    }, [id, i18n.language]);

    if (!tour) return <div className="min-h-screen flex items-center justify-center">{t('common.loading')}</div>;

    const images = tour.images || [tour.image, tour.image, tour.image];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: l(tour, 'title'),
                    text: `${t('detail.share')} - ${l(tour, 'title')}`,
                    url: window.location.href,
                });
            } catch (error) { console.log('Error sharing:', error); }
        } else {
            alert(t('common.copied'));
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleOpenBooking = () => {
        if (tour.isTransfer) {
            setIsTransferModalOpen(true);
        } else {
            setIsBookingModalOpen(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-light dark:bg-bg-dark min-h-screen pb-32 pt-20"
        >
            {/* Header Image Gallery */}
            <div className="max-w-7xl mx-auto px-0 md:px-6">
                <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden md:rounded-[3rem] shadow-2xl group">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={images[currentImageIndex]}
                            className="w-full h-full object-cover"
                            alt={tour.title}
                        />
                    </AnimatePresence>

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 rotate-180"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                        <div>
                            <span className="bg-primary/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                                {t(`tours.categories.${tour.category}`)}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">{l(tour, 'title')}</h1>
                        </div>
                        <button
                            onClick={handleShare}
                            className="hidden md:flex w-14 h-14 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white hover:bg-primary transition-all active:scale-95"
                        >
                            <Share2 size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-black mb-6">{t('detail.description')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                            {l(tour, 'fullDescription') || l(tour, 'description')}
                        </p>
                    </section>

                    {/* Itinerary (only if exists) */}
                    {tour.itinerary && tour.itinerary.length > 0 && (
                        <section className="relative">
                            <h2 className="text-2xl font-black mb-10">{t('detail.itinerary')}</h2>

                            {/* Vertical Line */}
                            <div className="absolute left-[23px] top-[100px] bottom-10 w-0.5 bg-gray-100 dark:bg-white/5" />

                            <div className="space-y-12">
                                {tour.itinerary.map((item, idx) => {
                                    const isTransport = item.type === 'transport';
                                    const isDropoff = item.type === 'dropoff';
                                    return (
                                        <div key={idx} className={`relative flex gap-8 items-start ${isTransport ? 'opacity-60' : ''}`}>
                                            {/* Icon Circle */}
                                            <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/10 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                                                {item.type ? getItineraryIcon(item.type) : (
                                                    <span className="text-[8px] font-black uppercase text-center leading-tight px-1">
                                                        {l(item, 'time')}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="pt-2">
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                                                    <h3 className={`font-black tracking-tight ${isTransport ? 'text-lg' : 'text-xl'} dark:text-gray-100`}>
                                                        {l(item, 'activity')}
                                                    </h3>
                                                    {l(item, 'duration') && !isDropoff && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                            <Clock size={12} />
                                                            {l(item, 'duration')}
                                                        </span>
                                                    )}
                                                </div>
                                                {l(item, 'desc') && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-medium max-w-xl">
                                                        {l(item, 'desc')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Inclusions / Exclusions */}
                    <div className="grid md:grid-cols-2 gap-8 pt-8">
                        <section className="p-8 rounded-[2rem] bg-green-50/50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10">
                            <h3 className="text-xl font-black text-green-700 dark:text-green-500 mb-6 flex items-center gap-2">
                                <Check size={20} /> {t('detail.included')}
                            </h3>
                            <ul className="space-y-4">
                                {(l(tour, 'included') || []).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check size={16} className="text-green-600 mt-1 flex-shrink-0" />
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="p-8 rounded-[2rem] bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                            <h3 className="text-xl font-black text-blue-700 dark:text-blue-500 mb-6 flex items-center gap-2">
                                <Calendar size={20} /> {t('detail.benefits.flexibility_title')}
                            </h3>
                            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6">
                                {t('detail.benefits.flexibility_desc')}
                            </p>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">{t('detail.not_included')}</h4>
                            <ul className="space-y-4">
                                {(l(tour, 'not_included') || []).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <AlertCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* FAQ Section */}
                    <section className="pt-8">
                        <h2 className="text-2xl font-black mb-8">{t('detail.faq_title')}</h2>
                        <div className="space-y-4">
                            {/* Standard FAQs */}
                            {(l(tour, 'faqs') || [
                                { q: "¿Podemos cambiar el orden de las visitas?", a: "¡Claro! Todos nuestros tours son privados y 100% flexibles. Habla con tu guía ese mismo día.", q_en: "Can we change the order of visits?", a_en: "Sure! All our tours are private and 100% flexible. Talk to your guide that same day." },
                                { q: "¿En qué idioma es el tour?", a: "La tarifa base es con conductor experto en Inglés. Puedes añadir Guía en Español por un suplemento.", q_en: "What language is the tour in?", a_en: "The base rate is with an expert English-speaking driver. You can add a Spanish Guide for a supplement." }
                            ]).map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-[1.5rem] border border-black/5 dark:border-white/5 bg-white dark:bg-white/5 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(`faq-${idx}`)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                                    >
                                        <span className="font-black text-gray-900 dark:text-gray-100">{faq.q}</span>
                                        <ChevronLeft size={20} className={`transform transition-transform ${openFaq === `faq-${idx}` ? 'rotate-90' : '-rotate-90'}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === `faq-${idx}` && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="px-8 pb-8 text-gray-500 dark:text-gray-400 font-medium leading-relaxed"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* Packing List as FAQ */}
                            <div className="rounded-[1.5rem] border border-black/5 dark:border-white/5 bg-white dark:bg-white/5 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === 'packing' ? null : 'packing')}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                                >
                                    <span className="font-black text-gray-900 dark:text-gray-100">{t('detail.faq_packing_q')}</span>
                                    <ChevronLeft size={20} className={`transform transition-transform ${openFaq === 'packing' ? 'rotate-90' : '-rotate-90'}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === 'packing' && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="px-8 pb-8"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                {(tour.packingList || ['shoes', 'sunscreen', 'camera', 'money']).map((item) => (
                                                    <div key={item} className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                            {getPackingIcon(item)}
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                                                            {t(`detail.items.${item}`)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Important Info as FAQ */}
                            <div className="rounded-[1.5rem] border border-black/5 dark:border-white/5 bg-white dark:bg-white/5 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === 'info' ? null : 'info')}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                                >
                                    <span className="font-black text-gray-900 dark:text-gray-100">{t('detail.faq_info_q')}</span>
                                    <ChevronLeft size={20} className={`transform transition-transform ${openFaq === 'info' ? 'rotate-90' : '-rotate-90'}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === 'info' && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="px-8 pb-8"
                                        >
                                            <ul className="space-y-3">
                                                {(l(tour, 'importantInfo') || []).map((info, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed">
                                                            {info}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </section>

                    {/* Benefits Banner (Moved below FAQ) */}
                    <div className="pt-8">
                        <div className="grid grid-cols-3 gap-4 md:gap-8 bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm">
                            {[
                                { icon: <Shield size={24} />, label: t('detail.benefits.private') },
                                { icon: <Calendar size={24} />, label: t('detail.benefits.flexible') },
                                { icon: <Clock size={24} />, label: t('detail.benefits.no_rush') }
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
                                    <div className="text-primary">{benefit.icon}</div>
                                    <span className="text-[10px] md:text-sm font-black uppercase tracking-wider dark:text-gray-200">{benefit.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Card (Desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-32 p-10 rounded-[2.5rem] bg-white dark:bg-bg-dark border border-black/5 dark:border-white/5 shadow-xl">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 block">{t('detail.price_special')}</span>
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-5xl font-black text-gray-900 dark:text-white">€{tour.price}</span>
                            <div className="pt-2">
                                <span className="text-gray-400 font-bold text-[11px] uppercase leading-tight block">{t('tours.per_car')}</span>
                            </div>
                        </div>



                        <button
                            onClick={handleOpenBooking}
                            className="w-full btn-primary py-5 rounded-2xl text-xl uppercase tracking-widest mb-8"
                        >
                            {t('detail.book_now')}
                        </button>

                        {/* Full Route Button (Standalone) */}
                        {tour.routeUrl && (
                            <div className="mt-8">
                                <a
                                    href={tour.routeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white dark:bg-gray-800 border border-black/5 dark:border-white/10 py-6 rounded-3xl shadow-lg flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all group/btn"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/btn:bg-white group-hover/btn:text-primary transition-colors">
                                        <Map size={24} />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs font-black uppercase tracking-widest block mb-1">{t('detail.view_full_route')}</span>
                                        <span className="text-[10px] opacity-60 font-medium block">Google Maps Directions</span>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Booking Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5 p-6 z-[60] flex items-center justify-between shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{t('detail.price_special')}</span>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">€{tour.price}</span>
                        <span className="text-gray-400 text-[9px] font-bold uppercase mb-1">{t('tours.per_car')}</span>
                    </div>
                </div>
                <button
                    onClick={handleOpenBooking}
                    className="btn-primary px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                    {t('detail.book_now')}
                </button>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tourTitle={l(tour, 'title')}
                tourPrice={tour.price}
                whatsappNumber="376614535"
            />
            <TransferModal
                isOpen={isTransferModalOpen}
                onClose={() => setIsTransferModalOpen(false)}
            />
            <ReviewsModal
                isOpen={isReviewsModalOpen}
                onClose={() => setIsReviewsModalOpen(false)}
                tourTitle={l(tour, 'title')}
                reviews={tour.reviewsList || []}
            />
        </motion.div>
    );
};

export default TourDetail;
