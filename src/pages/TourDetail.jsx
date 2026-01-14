import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Share2, Star,
    Car, Languages, Droplets, Info, MapPin,
    Clock, Check, X, Shield, Calendar, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours } from '../data/tours';
import BookingModal from '../components/BookingModal';
import ReviewsModal from '../components/ReviewsModal';
import { formatDateAgo } from '../utils/dateUtils';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../utils/i18nUtils';

const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [tour, setTour] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const l = (obj, field) => getLocalized(obj || tour, field, i18n.language);

    useEffect(() => {
        const foundTour = tours.find(t => t.id == id);
        if (foundTour) {
            setTour(foundTour);
            document.title = `${l(foundTour, 'title')} | Cantik Tours Bali`;
        } else {
            setTour(tours[0]);
        }
    }, [id, i18n.language]);

    if (!tour) return <div className="min-h-screen flex items-center justify-center">{t('common.loading')}</div>;

    const images = tour.images || [tour.image, tour.image, tour.image];

    const inclusions = [
        { icon: Car, label: i18n.language.startsWith('es') ? "Trasporte Privado (A/C, Gasolina, Parking, Peajes)" : "Private Transport (A/C, Gas, Parking, Tolls)" },
        { icon: Languages, label: t('why.reason1.title') },
        { icon: Droplets, label: i18n.language.startsWith('es') ? "Agua mineral" : "Mineral water" },
        { icon: Info, label: i18n.language.startsWith('es') ? "Brochure / Guía Impresa" : "Brochure / Printed Guide" }
    ];

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-light dark:bg-bg-dark min-h-screen pb-32 pt-20"
        >
            {/* Share and back buttons are now handled by the global Navbar, 
                but we keep a share button here for convenience in the detail section if needed, 
                or just remove the local detail navbar entirely. 
                I will remove the local fixed detail navbar. */}

            {/* Header Image Gallery */}
            <div className="max-w-7xl mx-auto px-0 md:px-6">
                <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden md:rounded-[3rem] shadow-2xl group">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 opacity-0 group-hover:opacity-100 rotate-180"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                        <div>
                            <div className="flex gap-2 mb-4">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 transition-all rounded-full ${idx === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-white/40'}`}
                                    />
                                ))}
                            </div>
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
                <div className="lg:col-span-2 space-y-12">

                    {/* Key Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
                            <Clock className="text-primary mb-3" size={28} />
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{t('detail.duration')}</span>
                            <span className="font-bold text-sm">{l(tour, 'duration')}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
                            <Shield className="text-primary mb-3" size={28} />
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{t('detail.private')}</span>
                            <span className="font-bold text-sm">{t('detail.private_label')}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
                            <Star className="text-accent mb-3 fill-accent" size={28} />
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{t('detail.rating')}</span>
                            <span className="font-bold text-sm">{tour.rating} (120+)</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
                            <Calendar className="text-primary mb-3" size={28} />
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{t('detail.availability')}</span>
                            <span className="font-bold text-sm">{t('detail.availability_label')}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            {t('detail.itinerary')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                            {l(tour, 'fullDescription')}
                        </p>
                    </section>

                    {/* Itinerary */}
                    <section>
                        <h2 className="text-2xl font-black mb-8">{t('detail.itinerary')}</h2>
                        <div className="space-y-4">
                            {tour.itinerary.map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center font-black text-xs text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                            {item.time}
                                        </div>
                                        {idx !== tour.itinerary.length - 1 && (
                                            <div className="w-0.5 h-12 bg-gray-100 dark:bg-white/10 my-2" />
                                        )}
                                    </div>
                                    <div className="pt-3">
                                        <p className="font-bold text-lg dark:text-gray-100">{l(item, 'activity')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Inclusions / Exclusions */}
                    <div className="grid md:grid-cols-2 gap-8 pt-8">
                        <section className="p-8 rounded-[2.5rem] bg-green-50/50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10">
                            <h3 className="text-xl font-black text-green-700 dark:text-green-500 mb-6 flex items-center gap-2">
                                <Check size={24} /> {t('detail.included')}
                            </h3>
                            <ul className="space-y-4">
                                {(l(tour, 'included') || []).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check size={18} className="text-green-600 mt-1 flex-shrink-0" />
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="p-8 rounded-[2.5rem] bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
                            <h3 className="text-xl font-black text-red-700 dark:text-red-500 mb-6 flex items-center gap-2">
                                <X size={24} /> {t('detail.not_included')}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <AlertCircle size={18} className="text-red-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{i18n.language.startsWith('es') ? "Almuerzos y cenas (no especificados)" : "Lunches and dinners (not specified)"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle size={18} className="text-red-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{i18n.language.startsWith('es') ? "Seguro personal de viaje" : "Personal travel insurance"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle size={18} className="text-red-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{i18n.language.startsWith('es') ? "Gastos personales" : "Personal expenses"}</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    {/* Reviews Preview */}
                    <section className="pt-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                {t('detail.reviews')}
                            </h2>
                            <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full font-black text-accent">
                                <Star size={16} fill="currentColor" />
                                <span>{tour.rating}</span>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {(tour.reviewsList || []).slice(0, 2).map((review, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                                                {review.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm tracking-tight">{review.name}</h4>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                    {i18n.language.startsWith('es') ? formatDateAgo(review.date) : review.date_en}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"{l(review, 'text')}"</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsReviewsModalOpen(true)}
                            className="w-full py-5 rounded-2xl bg-gray-100 dark:bg-white/5 font-black hover:bg-primary hover:text-white transition-all text-sm uppercase tracking-widest shadow-inner"
                        >
                            {i18n.language.startsWith('es') ? `Ver las ${tour.reviews} opiniones` : `See all ${tour.reviews} reviews`}
                        </button>
                    </section>
                </div>

                {/* Right Column: Booking Card (Desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-32 p-10 rounded-[3rem] bg-white dark:bg-bg-dark border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 block">{t('detail.price_special')}</span>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">€{tour.price}</span>
                            <span className="text-gray-400 font-bold">{t('detail.per_person')}</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                                <Check size={18} className="text-primary" />
                                <span>{i18n.language.startsWith('es') ? "Confirmación inmediata" : "Instant confirmation"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                                <Check size={18} className="text-primary" />
                                <span>{i18n.language.startsWith('es') ? "Cancelación flexible" : "Flexible cancellation"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                                <Check size={18} className="text-primary" />
                                <span>{i18n.language.startsWith('es') ? "Asistencia personalizada" : "Personalized assistance"}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="w-full btn-primary py-5 rounded-3xl text-xl uppercase tracking-widest"
                        >
                            {t('detail.book_now')}
                        </button>

                        <p className="text-center mt-6 text-xs text-gray-400 font-bold">
                            {i18n.language.startsWith('es') ? "Sin pagos hoy. Reserva y paga en Bali." : "No payments today. Book and pay in Bali."}
                        </p>
                    </div>
                </div>
            </main>

            {/* Mobile Booking Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 z-40 pb-10">
                <div className="flex items-center justify-between gap-6">
                    <div>
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 block">{t('tours.from')}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black">€{tour.price}</span>
                            <span className="text-gray-400 text-xs font-bold">{i18n.language.startsWith('es') ? "/pax" : "/person"}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="flex-grow btn-primary py-4 rounded-2xl shadow-lg font-black uppercase tracking-widest"
                    >
                        {t('detail.book_now')}
                    </button>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tourTitle={l(tour, 'title')}
                whatsappNumber="376614535"
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
