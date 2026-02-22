import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Share2, Star,
    Car, Languages, Droplets, Info, MapPin,
    Clock, Check, X, Shield, Calendar, AlertCircle,
    Flag, Landmark, Utensils, Camera, Map, TreeDeciduous, Repeat, Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours } from '../data/tours';
import BookingModal from '../components/BookingModal';
import TransferModal from '../components/TransferModal';
import ReviewsModal from '../components/ReviewsModal';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../utils/i18nUtils';
import SEO from '../components/SEO';

const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [tour, setTour] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [tourReviews, setTourReviews] = useState([]);
    const [isGlobalReviews, setIsGlobalReviews] = useState(false);
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setShowSticky(true);
            } else {
                setShowSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchTourReviews = async (tourId) => {
        const reviewIdMap = {
            'ubud-central': 'ubud_central',
            'north-lake-temple': 'ubud_north',
            'lovina-dolphins': 'lovina',
            'east-bali-besakih': 'east',
            'lempuyang-gates': 'lempuyang',
            'transfers-bali': 'transfer'
        };
        const apiTourId = reviewIdMap[tourId] || tourId;

        try {
            // First attempt: Specific reviews
            let response = await fetch(`/api/get_reviews.php?tour_id=${apiTourId}`);
            let result = await response.json();

            // If no specific reviews, fetch ALL (global)
            if (result.status === 'success' && (!result.data || result.data.length === 0)) {
                response = await fetch(`/api/get_reviews.php`);
                result = await response.json();
                setIsGlobalReviews(true);
            } else {
                setIsGlobalReviews(false);
            }

            if (result.status === 'success' && result.data) {
                const formatted = result.data.map(r => ({
                    name: r.nombre,
                    rating: parseInt(r.estrellas),
                    text: r.comentario,
                    text_en: r.comentario_en || r.comentario,
                    date: r.fecha,
                    date_en: r.fecha,
                    image: r.foto_url,
                    pais: r.pais,
                    ig_user: r.ig_user,
                    authorized: r.autorizacion_fotos === "1" || r.autorizacion_fotos === 1,
                    location: r.tour_id // Keep original tour id for context
                }));
                setTourReviews(formatted);
            }
        } catch (error) {
            console.error("Error fetching tour reviews:", error);
        }
    };

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
            fetchTourReviews(foundTour.id);
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
            } catch (error) { /* error ignored */ }
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

    const tourSchema = tour ? {
        "@context": "https://schema.org",
        "@type": "Tour",
        "name": l(tour, 'title'),
        "description": l(tour, 'description'),
        "image": `https://www.cantiktours.com${tour.image}`,
        "provider": {
            "@type": "TravelAgency",
            "name": "Cantik Tours Bali",
            "url": "https://www.cantiktours.com"
        },
        "offers": {
            "@type": "Offer",
            "price": tour.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
        },
        "itinerary": tour.itinerary?.map(item => ({
            "@type": "HowToStep",
            "name": l(item, 'activity'),
            "text": l(item, 'desc')
        }))
    } : null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-light dark:bg-bg-dark min-h-screen pb-32 pt-20"
        >
            <SEO
                title={l(tour, 'title')}
                description={l(tour, 'description')}
                image={tour.image}
                schema={tourSchema}
            />
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
                            alt={`${l(tour, 'title')} - Imagen ${currentImageIndex + 1} de ${images.length}`}
                            width="1920"
                            height="1080"
                            fetchpriority={currentImageIndex === 0 ? "high" : "auto"}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevImage}
                        aria-label={i18n.language.startsWith('es') ? "Imagen anterior" : "Previous image"}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextImage}
                        aria-label={i18n.language.startsWith('es') ? "Siguiente imagen" : "Next image"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 rotate-180"
                    >
                        <ChevronLeft size={28} />
                    </button>



                    <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex items-end gap-4 justify-between">
                        <div className="flex-1 min-w-0 space-y-3">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-2xl md:text-5xl font-black text-white drop-shadow-lg leading-tight break-words"
                            >
                                {l(tour, 'title')}
                            </motion.h1>
                        </div>
                        <button
                            onClick={handleShare}
                            aria-label={t('detail.share')}
                            className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white hover:bg-primary transition-all active:scale-95"
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
                        {l(tour, 'heroSubtitle') && (
                            <p className="text-xl font-medium text-primary mb-4 italic leading-relaxed">
                                {l(tour, 'heroSubtitle')}
                            </p>
                        )}
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                            {l(tour, 'fullDescription') || l(tour, 'description')}
                        </p>
                    </section>

                    {/* Day Summary - NEW */}
                    <section className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
                        <h3 className="text-base font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                            <Info size={18} /> {i18n.language.startsWith('es') ? 'Resumen del día' : 'Day Summary'}
                        </h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        {t('detail.duration')}
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                                        {l(tour, 'duration')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Car size={16} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        {i18n.language.startsWith('es') ? 'Transporte' : 'Transport'}
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                                        {i18n.language.startsWith('es') ? 'Privado + AC' : 'Private + AC'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <TreeDeciduous size={16} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        {i18n.language.startsWith('es') ? 'Estilo' : 'Style'}
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm capitalize">
                                        {tour.category[0]} + {tour.category[1] || (i18n.language.startsWith('es') ? 'Relax' : 'Relax')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Repeat size={16} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        {i18n.language.startsWith('es') ? 'Flexibilidad' : 'Flexibility'}
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                                        100% {i18n.language.startsWith('es') ? 'Personalizable' : 'Customizable'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Itinerary (The Route) */}
                    {tour.itinerary && tour.itinerary.length > 0 && (
                        <section className="relative">
                            <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
                                <div className="w-2 h-8 bg-primary rounded-full" />
                                {t('detail.itinerary')}
                            </h2>

                            <div className="relative ml-6">
                                {/* Vertical Line with Gradient */}
                                <div className="absolute left-[23px] top-[20px] bottom-0 w-1 bg-gradient-to-b from-primary/30 via-gray-100 to-transparent dark:from-primary/30 dark:via-white/5 dark:to-transparent" />

                                <div className="space-y-12">
                                    {tour.itinerary.map((item, idx) => {
                                        const isTransport = item.type === 'transport';
                                        const isDropoff = item.type === 'dropoff';
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`relative flex gap-8 items-start ${isTransport ? 'opacity-70' : ''}`}
                                            >
                                                {/* Icon Circle */}
                                                <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-white/10 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                                                    {item.type ? getItineraryIcon(item.type) : (
                                                        <span className="text-[8px] font-black uppercase text-center leading-tight px-1">
                                                            {l(item, 'time')}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="pt-2">
                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                                                        <h3 className={`font-black tracking-tight ${isTransport ? 'text-lg text-gray-500' : 'text-xl'} dark:text-gray-100`}>
                                                            {l(item, 'activity')}
                                                        </h3>
                                                        {l(item, 'duration') && !isDropoff && (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-[10px] font-black text-primary uppercase tracking-widest border border-primary/10">
                                                                <Clock size={12} />
                                                                {l(item, 'duration')}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {l(item, 'desc') && (
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-medium max-w-xl">
                                                            {l(item, 'desc')}
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
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
                                <Shield size={20} /> {t('detail.benefits.cancellation_title')}
                            </h3>
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-6">
                                {t('detail.benefits.cancellation_desc')}
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
                        <h2 className="text-2xl font-black mb-4">{t('detail.faq_title')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 font-bold mb-8">{t('detail.faq_intro')}</p>
                        <div className="space-y-4">
                            {/* Standard FAQs */}
                            {(l(tour, 'faqs') || [
                                { q: "¿Podemos cambiar el orden de las visitas?", a: "¡Claro! Todos nuestros tours son privados y 100% flexibles. Habla con tu guía ese mismo día.", q_en: "Can we change the order of visits?", a_en: "Sure! All our tours are private and 100% flexible. Talk to your guide that same day." },
                                { q: "¿En qué idioma es el tour?", a: "La tarifa base es con conductor experto en Inglés. El español está disponible bajo solicitud y sujeto a disponibilidad. En caso de no haber guía en español ese día, te lo confirmamos antes de cerrar la reserva.", q_en: "What language is the tour in?", a_en: "The base rate is with an expert English-speaking driver. Spanish is available upon request and subject to availability. If no Spanish-speaking guide is available on that day, we will confirm it before closing the reservation." }
                            ]).map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-[1.5rem] border border-black/5 dark:border-white/5 bg-white dark:bg-white/5 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(`faq-${idx}`)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                                    >
                                        <span className="font-black text-gray-900 dark:text-gray-100">{l(faq, 'q')}</span>
                                        <ChevronLeft size={20} className={`transform transition-transform ${openFaq === `faq-${idx}` ? 'rotate-90' : '-rotate-90'}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === `faq-${idx}` && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="px-8 pb-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed"
                                            >
                                                {l(faq, 'a')}
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
                                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed">
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

                    <section className="pt-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black">
                                    {isGlobalReviews
                                        ? (i18n.language.startsWith('es') ? 'Opiniones sobre Cantik Tours' : 'Reviews about Cantik Tours')
                                        : (i18n.language.startsWith('es') ? 'Experiencias en este tour' : 'Experiences on this tour')
                                    }
                                </h2>
                                {isGlobalReviews && (
                                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">
                                        {i18n.language.startsWith('es') ? 'Lo que dicen otros viajeros' : 'What other travelers say'}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => setIsReviewsModalOpen(true)}
                                className="text-sm font-bold text-primary hover:underline"
                            >
                                {i18n.language.startsWith('es') ? 'Ver todas' : 'View all'}
                            </button>
                        </div>

                        {tourReviews.length > 0 ? (
                            <div className="grid gap-6">
                                {tourReviews.slice(0, 3).map((rev, idx) => (
                                    <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl border border-primary/20 shrink-0">
                                                {rev.name ? rev.name[0].toUpperCase() : 'U'}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h4 className="font-bold text-sm leading-none">{rev.name}</h4>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {rev.ig_user && rev.authorized && (
                                                        <span className="flex items-center gap-1 text-[9px] text-pink-500 font-bold bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-lg border border-pink-100 dark:border-pink-500/20">
                                                            <Instagram size={8} />
                                                            @{rev.ig_user.replace('@', '')}
                                                        </span>
                                                    )}
                                                    {rev.pais && (
                                                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-black/5 dark:border-white/5">
                                                            {(() => {
                                                                const flags = { ar: '🇦🇷', cl: '🇨🇱', co: '🇨🇴', es: '🇪🇸', mx: '🇲🇽', pe: '🇵🇪', uy: '🇺🇾', us: '🇺🇸' };
                                                                const flag = flags[rev.pais] || '🌐';
                                                                const countryName = t(`reviews_page.form.countries.${rev.pais}`);
                                                                return `${flag} ${countryName}`;
                                                            })()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-0.5 text-yellow-400 mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={10} fill={i < rev.rating ? "currentColor" : "transparent"} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium italic leading-relaxed">
                                            "{i18n.language.startsWith('es') ? rev.text : (rev.text_en || rev.text)}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 rounded-3xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 text-center">
                                <p className="text-sm text-gray-400 font-bold">
                                    {i18n.language.startsWith('es') ? 'Aún no hay reseñas para este tour específico.' : 'No reviews for this specific tour yet.'}
                                </p>
                            </div>
                        )}
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
                            className="w-full btn-primary py-5 rounded-2xl text-xl uppercase tracking-widest mb-4 flex flex-col items-center justify-center gap-1"
                        >
                            <span>{t('detail.book_now')}</span>
                            <span className="text-[10px] opacity-80 font-normal normal-case">
                                {i18n.language.startsWith('es') ? 'Confirmación vía WhatsApp' : 'Confirmation via WhatsApp'}
                            </span>
                        </button>

                        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-500 mb-2">
                            <Shield size={14} />
                            <span className="text-[10px] font-black uppercase tracking-wider">
                                {t('detail.benefits.cancellation_title')}
                            </span>
                        </div>

                        <p className="text-center text-[10px] font-bold text-gray-400">
                            {i18n.language.startsWith('es') ? 'Sin compromiso hasta confirmar' : 'No commitment until confirmed'}
                        </p>

                        {/* Full Route Button (Standalone) - Hidden until maps are ready for all tours
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
                        */}
                    </div>
                </div>
            </main>

            {/* Only show the non-sticky bar if user hasn't scrolled far enough, but wait, 
                let's just use the sticky one for all mobile cases to keep it clean, 
                OR let's have a static one in the content and a sticky one that appears later.
                
                Actually, let's remove this fixed one and keep only the sticky one.
            */}

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
                reviews={tourReviews.length > 0 ? tourReviews : (tour.reviewsList || [])}
            />
            {/* Sticky Mobile CTA */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-white/90 dark:bg-bg-dark/90 backdrop-blur-xl border-t border-black/5 dark:border-white/10"
                    >
                        <div className="flex items-center justify-between gap-6 max-w-lg mx-auto">
                            <div className="flex-shrink-0 flex flex-col justify-center">
                                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-gray-400 block -mb-0.5">{t('detail.price_special') || t('tours.per_car')}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-gray-900 dark:text-white">€{tour?.price}</span>
                                    <span className="text-[10px] font-bold text-gray-400">/car</span>
                                </div>
                            </div>
                            <button
                                onClick={handleOpenBooking}
                                className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 active:scale-95 transition-all flex flex-col items-center justify-center"
                            >
                                <span>{t('detail.book_now')}</span>
                                <span className="text-[8px] opacity-70 font-bold uppercase tracking-tighter">
                                    {i18n.language.startsWith('es') ? 'Confirmación vía WhatsApp' : 'Confirmation via WhatsApp'}
                                </span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TourDetail;
