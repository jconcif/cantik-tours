import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2, Instagram, ArrowRight, ArrowLeft, User, MapPin, Star as StarIcon, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { reviewService } from '../services/reviewService';

const ReviewsPage = () => {
    const { t, i18n } = useTranslation();
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    
    const [ratings, setRatings] = useState({
        rating_booking: 5,
        rating_logistics: 5,
        rating_route: 5,
        rating_driver: 5,
        rating_vehicle: 5,
        rating_price: 5
    });
    
    const [hoverRatings, setHoverRatings] = useState({
        rating_booking: 0,
        rating_logistics: 0,
        rating_route: 0,
        rating_driver: 0,
        rating_vehicle: 0,
        rating_price: 0
    });

    const [formData, setFormData] = useState({
        name: '',
        tour_type: 'ubud_central',
        driver_name: '',
        find_us: 'instagram',
        comment: '',
        ig_user: '',
        country: 'es',
        auth: false
    });

    const [searchParams] = useSearchParams();
    const ref = searchParams.get('ref');

    useEffect(() => {
        if (ref) {
            const fetchPreFill = async () => {
                try {
                    const r = await fetch(`https://cantiktours.com/api/get_itinerary.php?ref=${ref}`);
                    const j = await r.json();
                    if (j.status === 'success') {
                        setFormData(prev => ({
                            ...prev,
                            name: j.data.client_name || '',
                            tour_type: j.data.tour_id || 'ubud_central',
                            driver_name: j.data.driver_name || '',
                            // Optionally map country if you have it in booking
                        }));
                    }
                } catch (e) { console.error("Error pre-filling review:", e); }
            };
            fetchPreFill();
        }
    }, [ref]);

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await reviewService.submitReview({ ...formData, ...ratings });
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error submitting review:', error);
            setStatus('error');
        }
    };

    const inputClasses = "w-full px-6 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 font-medium";
    const labelClasses = "block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1";

    if (status === 'success') {
        return (
            <div className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 px-6">
                <SEO title={t('seo.reviews.title')} description={t('seo.reviews.description')} />
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle2 size={48} />
                    </motion.div>
                    <h1 className="text-4xl font-black mb-4">{t('reviews_page.form.success_title')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">{t('reviews_page.form.success_text')}</p>
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
                            <p className="text-gray-900 dark:text-white font-bold text-lg mb-6">{t('reviews_page.form.ig_follow_text')}</p>
                            <a href="https://instagram.com/cantiktours" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-base">
                                <Instagram size={20} />
                                {t('reviews_page.form.ig_follow_btn')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            <SEO title={t('seo.reviews.title')} description={t('seo.reviews.description')} />
            
            {/* Progress Bar */}
            <div className="max-w-xl mx-auto mb-16">
                <div className="flex justify-between mb-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${step >= s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                                {s === 1 && <User size={18} />}
                                {s === 2 && <StarIcon size={18} />}
                                {s === 3 && <MessageSquare size={18} />}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-primary" 
                        animate={{ width: `${((step - 1) / 2) * 100}%` }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    />
                </div>
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <motion.h1 className="text-4xl md:text-6xl font-black mb-4">
                        {t('reviews_page.title')} <span className="text-primary italic">{t('reviews_page.title_accent')}</span>
                    </motion.h1>
                </div>

                <motion.div 
                    layout 
                    className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-black/5 backdrop-blur-sm"
                >
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="name" className={labelClasses}>{t('reviews_page.form.name')}</label>
                                    <input id="name" type="text" className={inputClasses} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="tour_type" className={labelClasses}>{t('reviews_page.form.tour_type')}</label>
                                        <select id="tour_type" className={inputClasses} value={formData.tour_type} onChange={(e) => setFormData({ ...formData, tour_type: e.target.value })}>
                                            {Object.entries(t('reviews_page.form.tours', { returnObjects: true })).map(([val, label]) => (
                                                <option key={val} value={val}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="country" className={labelClasses}>{t('reviews_page.form.country')}</label>
                                        <select id="country" className={inputClasses} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                                            {Object.entries(t('reviews_page.form.countries', { returnObjects: true })).map(([code, name]) => (
                                                <option key={code} value={code}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="driver_name" className={labelClasses}>{t('reviews_page.form.driver_name')}</label>
                                    <input id="driver_name" type="text" placeholder={t('reviews_page.form.driver_placeholder')} className={inputClasses} value={formData.driver_name} onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="find_us" className={labelClasses}>{t('reviews_page.form.find_us')}</label>
                                    <select id="find_us" className={inputClasses} value={formData.find_us} onChange={(e) => setFormData({ ...formData, find_us: e.target.value })}>
                                        {Object.entries(t('reviews_page.form.find_us_options', { returnObjects: true })).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={nextStep} className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 group">
                                    Siguiente <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid gap-6">
                                    {[
                                        { id: 'rating_booking', label: t('reviews_page.form.rating_booking') },
                                        { id: 'rating_logistics', label: t('reviews_page.form.rating_logistics') },
                                        { id: 'rating_route', label: t('reviews_page.form.rating_route') },
                                        { id: 'rating_driver', label: t('reviews_page.form.rating_driver') },
                                        { id: 'rating_vehicle', label: t('reviews_page.form.rating_vehicle') },
                                        { id: 'rating_price', label: t('reviews_page.form.rating_price') }
                                    ].map((cat) => (
                                        <div key={cat.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5">
                                            <span className="text-sm font-bold">{cat.label}</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRatings({ ...ratings, [cat.id]: star })}
                                                        onMouseEnter={() => setHoverRatings({ ...hoverRatings, [cat.id]: star })}
                                                        onMouseLeave={() => setHoverRatings({ ...hoverRatings, [cat.id]: 0 })}
                                                        className="transition-transform active:scale-95"
                                                    >
                                                        <Star
                                                            size={24}
                                                            fill={(hoverRatings[cat.id] || ratings[cat.id]) >= star ? '#FBBF24' : 'transparent'}
                                                            className={(hoverRatings[cat.id] || ratings[cat.id]) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={prevStep} className="flex-1 px-8 py-5 rounded-2xl font-black bg-gray-100 dark:bg-white/5 flex items-center justify-center gap-3">
                                        <ArrowLeft size={20} /> Atrás
                                    </button>
                                    <button onClick={nextStep} className="flex-[2] btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 group text-lg">
                                        Valoración Final <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="comment" className={labelClasses}>{t('reviews_page.form.comment')}</label>
                                    <textarea
                                        id="comment"
                                        required
                                        rows={5}
                                        placeholder={t('reviews_page.form.comment_placeholder')}
                                        className={`${inputClasses} resize-none`}
                                        value={formData.comment}
                                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ig_user" className={labelClasses}>{t('reviews_page.form.ig_user')}</label>
                                    <div className="relative">
                                        <Instagram size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input id="ig_user" type="text" placeholder={t('reviews_page.form.ig_placeholder')} className={`${inputClasses} pl-14`} value={formData.ig_user} onChange={(e) => setFormData({ ...formData, ig_user: e.target.value })} />
                                    </div>
                                </div>
                                <div 
                                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${formData.auth ? 'bg-primary/5 border-primary shadow-sm' : 'bg-gray-50 dark:bg-white/5 border-transparent hover:border-primary/30'}`}
                                    onClick={() => setFormData({ ...formData, auth: !formData.auth })}
                                >
                                    <div className={`mt-1 min-w-[22px] h-[22px] rounded-lg border-2 transition-colors flex items-center justify-center ${formData.auth ? 'bg-primary border-primary' : 'border-gray-300 dark:border-white/10'}`}>
                                        {formData.auth && <CheckCircle2 size={14} className="text-white" />}
                                    </div>
                                    <p className={`text-xs font-bold leading-relaxed ${formData.auth ? 'text-primary' : 'text-gray-500'}`}>{t('reviews_page.form.auth')}</p>
                                </div>

                                {status === 'error' && <div className="text-red-500 text-center font-bold text-sm">Error al enviar. Inténtalo de nuevo.</div>}

                                <div className="flex gap-4">
                                    <button onClick={prevStep} className="flex-1 px-8 py-5 rounded-2xl font-black bg-gray-100 dark:bg-white/5 flex items-center justify-center gap-3">
                                        <ArrowLeft size={20} /> Atrás
                                    </button>
                                    <button 
                                        onClick={handleSubmit} 
                                        disabled={status === 'loading'}
                                        className="flex-[2] btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 group text-lg shadow-xl shadow-primary/20"
                                    >
                                        {status === 'loading' ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={20} /> {t('reviews_page.form.submit')}</>}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default ReviewsPage;
