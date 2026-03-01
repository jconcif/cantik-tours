import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle2, Instagram } from 'lucide-react';
import SEO from '../components/SEO';

const ReviewsPage = () => {
    const { t, i18n } = useTranslation();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        tour_type: 'ubud_central',
        comment: '',
        ig_user: '',
        country: 'es',
        auth: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/save_review.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, rating, lang: i18n.language })
            });

            if (!response.ok) throw new Error('Failed to submit');

            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error submitting review:', error);
            setStatus('error');
        }
    };

    const inputClasses = "w-full px-6 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 font-medium";
    const labelClasses = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1";

    if (status === 'success') {
        return (
            <div className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 px-6">
                <SEO
                    title={t('seo.reviews.title')}
                    description={t('seo.reviews.description')}
                />
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle2 size={48} />
                    </motion.div>

                    <h1 className="text-4xl font-black mb-4">
                        {t('reviews_page.form.success_title')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
                        {t('reviews_page.form.success_text')}
                    </p>

                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
                            <p className="text-gray-900 dark:text-white font-bold text-lg mb-6">
                                {t('reviews_page.form.ig_follow_text')}
                            </p>
                            <a
                                href="https://instagram.com/cantiktours"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-base"
                            >
                                <Instagram size={20} />
                                {t('reviews_page.form.ig_follow_btn')}
                            </a>
                        </div>

                        <div className="bg-white/50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5">
                            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                                {t('reviews_page.form.wsp_groups_text')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            <SEO
                title={t('seo.reviews.title')}
                description={t('seo.reviews.description')}
            />

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-8 leading-tight"
                    >
                        {t('reviews_page.title')} <span className="text-primary italic">{t('reviews_page.title_accent')}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 dark:text-gray-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto"
                    >
                        {t('reviews_page.subtitle')}
                    </motion.p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-black">
                            {i18n.language.startsWith('es') ? 'Danos tu opinión' : 'Give us your feedback'}
                        </h2>
                        <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 backdrop-blur-sm"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Rating */}
                            <div className="text-center pb-6 border-b border-black/5 dark:border-white/5">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                                    {t('reviews_page.form.rating')}
                                </label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform active:scale-90 p-1"
                                        >
                                            <Star
                                                size={32}
                                                fill={(hoverRating || rating) >= star ? '#FBBF24' : 'transparent'}
                                                className={(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        {t('reviews_page.form.name')}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        className={inputClasses}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                {/* Tour Type */}
                                <div>
                                    <label htmlFor="tour_type" className={labelClasses}>
                                        {t('reviews_page.form.tour_type')}
                                    </label>
                                    <select
                                        id="tour_type"
                                        required
                                        className={inputClasses}
                                        value={formData.tour_type}
                                        onChange={(e) => setFormData({ ...formData, tour_type: e.target.value })}
                                    >
                                        <option value="ubud_central">{t('reviews_page.form.tours.ubud_central')}</option>
                                        <option value="ubud_north">{t('reviews_page.form.tours.ubud_north')}</option>
                                        <option value="lovina">{t('reviews_page.form.tours.lovina')}</option>
                                        <option value="east">{t('reviews_page.form.tours.east')}</option>
                                        <option value="lempuyang">{t('reviews_page.form.tours.lempuyang')}</option>
                                        <option value="transfer">{t('reviews_page.form.tours.transfer')}</option>
                                        <option value="custom">{t('reviews_page.form.tours.custom')}</option>
                                    </select>
                                </div>

                                {/* Country */}
                                <div>
                                    <label htmlFor="country" className={labelClasses}>
                                        {t('reviews_page.form.country')}
                                    </label>
                                    <select
                                        id="country"
                                        required
                                        className={inputClasses}
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    >
                                        {Object.entries(t('reviews_page.form.countries', { returnObjects: true })).map(([code, name]) => (
                                            <option key={code} value={code}>{name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Comment */}
                                <div>
                                    <label htmlFor="comment" className={labelClasses}>
                                        {t('reviews_page.form.comment')}
                                    </label>
                                    <textarea
                                        id="comment"
                                        required
                                        rows={4}
                                        placeholder={t('reviews_page.form.comment_placeholder')}
                                        className={`${inputClasses} resize-none`}
                                        value={formData.comment}
                                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    />
                                </div>

                                {/* Instagram */}
                                <div>
                                    <label htmlFor="ig_user" className={labelClasses}>
                                        {t('reviews_page.form.ig_user')}
                                    </label>
                                    <div className="relative">
                                        <Instagram size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="ig_user"
                                            type="text"
                                            placeholder={t('reviews_page.form.ig_placeholder')}
                                            className={`${inputClasses} pl-14`}
                                            value={formData.ig_user}
                                            onChange={(e) => setFormData({ ...formData, ig_user: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Auth Checkbox */}
                                <div
                                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${formData.auth ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-primary/30'}`}
                                    onClick={() => setFormData({ ...formData, auth: !formData.auth })}
                                >
                                    <div className={`mt-1 min-w-[20px] h-5 rounded-lg border-2 transition-colors flex items-center justify-center ${formData.auth ? 'bg-primary border-primary' : 'border-black/10 dark:border-white/10'}`}>
                                        {formData.auth && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    <p className={`text-xs font-bold transition-colors ${formData.auth ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {t('reviews_page.form.auth')}
                                    </p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold text-center"
                                >
                                    {t('common.error')}. Por favor, inténtalo de nuevo.
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`w-full py-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 ${status === 'loading' ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed' : 'btn-primary shadow-xl shadow-primary/20'}`}
                                >
                                    {status === 'loading' ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            {t('reviews_page.form.submit')}
                                        </>
                                    )}
                                </button>
                                <p className="text-[9px] text-center text-gray-400 font-medium px-4">
                                    {t('reviews_page.form.implicit_consent')}
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
