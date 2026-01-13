import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Share2, Star,
    Car, Languages, Droplets, Info, MapPin,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours } from '../data/tours';
import BookingModal from '../components/BookingModal';
import ReviewsModal from '../components/ReviewsModal';
import { formatDateAgo } from '../utils/dateUtils';


const TourDetail = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [tour, setTour] = useState(null);

    useEffect(() => {
        const foundTour = tours.find(t => t.id == id);
        if (foundTour) {
            setTour(foundTour);
        } else {
            setTour(tours[0]);
        }
    }, [id]);

    const whatsAppMessage = tour ? `Hola! Me interesa reservar el tour: ${tour.title}` : 'Hola! Me interesa reservar un tour.';
    const encodedMessage = encodeURIComponent(whatsAppMessage);
    const whatsAppLink = `https://wa.me/376614535?text=${encodedMessage}`;


    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!tour) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    // Helper to map icon names/types if needed, or just use hardcoded ones for now as in original data structure
    // Since data/tours.js structure might be slightly different than the hardcoded one in TourDetail, 
    // let's adapt specific fields below.

    // Default images array if not present in data (data usually has one main image)
    const images = tour.images || [tour.image, tour.image, tour.image];

    // Default inclusions with icons (since data only has strings)
    const inclusions = [
        { icon: Car, label: "Trasporte Privado (A/C, Gasolina, Parking, Peajes)" },
        { icon: Languages, label: "Guía español/inglés" },
        { icon: Droplets, label: "Agua mineral" },
        { icon: Info, label: "Brochure / Guía Impresa" }
    ];

    // Default highlights if not present
    const highlights = tour.highlights || [
        "Experiencia cultural única e inmersiva.",
        "Guía experto local (Idioma sujeto a disponibilidad).",
        "Transporte cómodo y seguro con aire acondicionado."
    ];


    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: tour.title,
                    text: `Echa un vistazo al tour ${tour.title} de Cantik Tours Bali.`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert("Enlace copiado al portapapeles!");
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-light dark:bg-bg-dark min-h-screen pb-32"
        >
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/5 dark:border-white/5 py-4 px-6 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-sm font-black uppercase tracking-widest truncate max-w-[200px]">Detalle de la Actividad</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleShare}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                    >
                        <Share2 size={20} />
                    </button>

                </div>
            </nav>

            {/* Header Image Gallery */}
            <div className="pt-0 md:pt-24 max-w-7xl mx-auto">
                <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden md:rounded-[2.5rem] shadow-2xl group">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={images[currentImageIndex]}
                            className="w-full h-full object-cover"
                            alt={tour.title}
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Navigation Buttons */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all active:scale-95 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all active:scale-95 opacity-0 group-hover:opacity-100 rotate-180"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="flex gap-2">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-white/50'}`}
                                />
                            ))}
                        </div>
                        <span className="bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                            {currentImageIndex + 1} / {images.length} fotos
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pt-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-grow">
                        {/* Summary Badges */}
                        <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar py-2">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary whitespace-nowrap">
                                <Car size={14} strokeWidth={3} />
                                <span className="text-xs font-black uppercase tracking-wider">Tour Privado</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 whitespace-nowrap">
                                <Clock size={14} strokeWidth={3} />
                                <span className="text-xs font-black uppercase tracking-wider">8 - 10 Horas</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{tour.title}</h1>

                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span className="text-lg font-black">{tour.rating}</span>
                            <span className="text-gray-400 font-medium font-sm">({tour.reviews} reseñas)</span>
                        </div>

                        {/* Highlights */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                Lo más <span className="text-primary italic">destacado</span>
                            </h2>
                            <div className="grid gap-4">
                                {highlights.map((h, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i}
                                        className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-black/5 dark:border-white/5 shadow-sm"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{h}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* What's Included */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-black mb-6">¿Qué incluye?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                    <Car className="text-primary" size={24} />
                                    <div>
                                        <h4 className="font-bold text-sm">Transporte Privado</h4>
                                        <p className="text-xs text-gray-500">Coche con A/C, Gasolina, Parking y Peajes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                    <Languages className="text-primary" size={24} />
                                    <div>
                                        <h4 className="font-bold text-sm">Guía Local</h4>
                                        <p className="text-xs text-gray-500">Español/Inglés (según disponibilidad)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                    <Droplets className="text-primary" size={24} />
                                    <div>
                                        <h4 className="font-bold text-sm">Agua Mineral</h4>
                                        <p className="text-xs text-gray-500">Para mantenerte hidratado</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                    <Info className="text-primary" size={24} />
                                    <div>
                                        <h4 className="font-bold text-sm">Extra Especial</h4>
                                        <p className="text-xs text-gray-500">Brochure / Guía Impresa del Tour</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                                    <Ticket size={18} /> No incluido
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Las entradas a los templos/atracciones y comidas se pagan aparte (aprox. 15-20€/persona en total).
                                </p>
                            </div>
                        </section>

                        {/* Itinerary */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-black mb-8">Itinerario del <span className="text-primary italic">viaje</span></h2>
                            <div className="relative ml-2 space-y-10 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/20">
                                {tour.itinerary.map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        key={i}
                                        className="relative pl-12"
                                    >
                                        <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-bg-dark border-4 border-primary z-10 shadow-lg shadow-primary/20" />
                                        <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-2">
                                            {item.time}
                                        </span>
                                        <h4 className="text-xl font-black mb-2">{item.activity || item.title}</h4>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc || "Actividad programada en el tour."}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                Opiniones de <span className="text-primary italic">viajeros</span> ({tour.reviews})
                            </h2>
                            <div className="space-y-6">
                                {(tour.reviewsList || []).slice(0, 2).map((review, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-black/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                                                    {review.name[0]}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">{review.name}</h4>
                                                    <span className="text-xs text-gray-400">{formatDateAgo(review.date)}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5 text-yellow-500">
                                                {[...Array(5)].map((_, stars) => (
                                                    <Star key={stars} size={14} fill={stars < review.rating ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">"{review.text}"</p>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setIsReviewsModalOpen(true)}
                                    className="w-full py-4 rounded-xl border border-black/10 dark:border-white/10 font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm">
                                    Ver todas las opiniones
                                </button>
                            </div>
                        </section>

                        {/* Map Area */}
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black">Recogida incluida</h2>
                                <span className="text-primary font-bold text-sm flex items-center gap-2 text-right">
                                    Lobby de tu Hotel <br /> (Zona Bali Sur/Ubud) <MapPin size={16} />
                                </span>
                            </div>
                            <div className="w-full h-64 rounded-[2.5rem] overflow-hidden relative border border-black/5 dark:border-white/5 shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1559390648-5c9540d96000?q=80&w=2670&auto=format&fit=crop"
                                    alt="Bali Map Area"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <MapPin size={48} fill="currentColor" className="text-red-500" />
                                    </motion.div>
                                    <div className="bg-white dark:bg-gray-800 px-6 py-2 rounded-2xl shadow-2xl mt-4 border border-black/5 text-sm font-black tracking-widest uppercase absolute top-[60%]">
                                        Zona de Recogida Flexible
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Desktop Booking Sidebar */}
                    <div className="hidden lg:block w-96 shrink-0">
                        <div className="sticky top-28 bg-white dark:bg-gray-800 p-10 rounded-[3rem] shadow-2xl border border-black/5 dark:border-white/5">
                            <div className="text-center mb-8">
                                <span className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 block">Precio especial</span>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-5xl font-black text-primary">€{tour.price}</span>
                                    <span className="text-lg font-bold text-gray-400">/persona</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Clock size={20} />
                                    </div>
                                    <span>Duración: 8-10h</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Info size={20} />
                                    </div>
                                    <span>Grupo privado</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="w-full btn-primary flex items-center justify-center gap-3 py-6 text-xl shadow-primary/30"
                            >
                                <span>Reservar ahora</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Sticky Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 z-40 pb-10">
                <div className="flex items-center justify-between gap-6 max-w-lg mx-auto">
                    <div>
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 block">Desde</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black">€{tour.price}</span>
                            <span className="text-gray-400 text-xs font-bold">/persona</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="flex-grow btn-primary flex items-center justify-center py-4 rounded-2xl shadow-lg shadow-primary/20 text-lg font-black"
                    >
                        Reservar ahora
                    </button>
                </div>
            </div>
            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tourTitle={tour.title}
                whatsappNumber="376614535"
            />

            <ReviewsModal
                isOpen={isReviewsModalOpen}
                onClose={() => setIsReviewsModalOpen(false)}
                tourTitle={tour.title}
                reviews={tour.reviewsList || []}
            />

        </motion.div>
    );
};

export default TourDetail;
