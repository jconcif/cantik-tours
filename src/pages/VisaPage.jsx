import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import {
    ShieldCheck,
    Lock,
    Clock,
    MessageCircle,
    FileText,
    CheckCircle,
    AlertTriangle,
    ArrowRight,
    Users,
    Smartphone,
    Globe,
    Calendar,
    Camera,
    CreditCard as CardIcon,
    ChevronDown,
} from 'lucide-react';
import SEO from '../components/SEO';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Reusable section header ─── */
const SectionTitle = ({ title, subtitle, badge, light = false }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-12 md:mb-16"
    >
        {badge && (
            <span className={`inline-block font-black uppercase tracking-[0.3em] text-[10px] mb-4 ${light ? 'text-white/50' : 'text-primary'}`}>
                {badge}
            </span>
        )}
        <h2 className={`text-3xl md:text-5xl font-black tracking-tighter mb-4 ${light ? 'text-white' : ''}`}>
            {title}
        </h2>
        {subtitle && (
            <p className={`font-medium max-w-2xl mx-auto leading-relaxed text-base md:text-lg ${light ? 'text-white/50' : 'text-gray-500 dark:text-gray-400'}`}>
                {subtitle}
            </p>
        )}
    </motion.div>
);

/* ─── Select wrapper with arrow ─── */
const StyledSelect = ({ name, required, value, onChange, children, dark = false }) => (
    <div className="relative">
        <select
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className={`w-full rounded-xl px-4 py-3.5 font-medium outline-none appearance-none pr-10 transition-all text-sm
                ${dark
                    ? 'bg-white/10 border border-white/20 text-white focus:border-primary focus:ring-1 focus:ring-primary'
                    : 'bg-black/5 border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary'
                }`}
        >
            {children}
        </select>
        <ChevronDown size={16} className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? 'text-white/40' : 'text-gray-400'}`} />
    </div>
);

/* ─── Form field label ─── */
const Label = ({ children }) => (
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
        {children}
    </label>
);

/* ════════════════════════════════════════ */
const VisaPage = () => {
    const { t } = useTranslation();
    const { formatPrice } = useCurrency();
    const price = formatPrice(20);
    const [formData, setFormData] = React.useState({ name: '', type: 'B1', date: '', time: '10:00' });

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleFormChange = (e) =>
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const generateFormWhatsAppLink = () => {
        const typeText = formData.type === 'B1' ? t('visa_page.form.visa_b1') : t('visa_page.form.visa_c1');
        const msg = t('visa_page.form.message_template')
            .replace('{{name}}', formData.name || '-')
            .replace('{{type}}', typeText)
            .replace('{{date}}', formData.date || '-')
            .replace('{{time}}', formData.time || '-');
        return `https://wa.me/376614535?text=${encodeURIComponent(msg)}`;
    };

    const isFormValid = formData.name.trim() !== '' && formData.date !== '';

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans overflow-x-hidden">
            <SEO title={t('visa_page.seo_title')} description={t('visa_page.seo_desc')} />

            {/* ══════════════════ HERO ══════════════════ */}
            <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-5 md:px-6 overflow-hidden">
                {/* Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/8 rounded-full blur-[90px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black uppercase tracking-widest text-[10px] mb-6 border border-primary/20">
                            {t('visa_page.hero.badge')}
                        </span>

                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.88] mb-6 md:mb-8">
                            {t('visa_page.hero.title_1')}<br />
                            <span className="text-primary italic">{t('visa_page.hero.title_2')}</span>
                        </h1>

                        <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12 px-2">
                            {t('visa_page.hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                            <a
                                href="#booking"
                                className="group px-8 py-4 md:py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-primary/35 flex items-center justify-center gap-3"
                            >
                                <MessageCircle size={17} />
                                {t('visa_page.hero.btn_whatsapp')}
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#tiempos"
                                className="px-8 py-4 md:py-5 rounded-2xl bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 shadow-sm"
                            >
                                <FileText size={17} className="text-primary" />
                                {t('visa_page.hero.btn_types')}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════ WHY US ══════════════════ */}
            <section className="py-16 md:py-24 px-5 md:px-6 bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <SectionTitle
                        title={t('visa_page.why.title')}
                        subtitle={t('visa_page.why.subtitle')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                        {[
                            { icon: <Users size={26} />, title: t('visa_page.why.reason1.title'), text: t('visa_page.why.reason1.text') },
                            { icon: <FileText size={26} />, title: t('visa_page.why.reason2.title'), text: t('visa_page.why.reason2.text') },
                            { icon: <CardIcon size={26} />, title: t('visa_page.why.reason3.title'), text: t('visa_page.why.reason3.text') },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="group p-7 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-lg shadow-black/[0.04] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-sm md:text-base">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ SECURITY ══════════════════ */}
            <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-6xl mx-auto">
                    <SectionTitle
                        title={t('visa_page.security.title')}
                        subtitle={t('visa_page.security.subtitle')}
                        badge="Privacidad y Control"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                        {[
                            { icon: <Lock size={22} />, title: t('visa_page.security.item1.title'), text: t('visa_page.security.item1.text') },
                            { icon: <Globe size={22} />, title: t('visa_page.security.item2.title'), text: t('visa_page.security.item2.text') },
                            { icon: <CheckCircle size={22} />, title: t('visa_page.security.item3.title'), text: t('visa_page.security.item3.text') },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="flex gap-4 p-6 md:p-7 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-md"
                            >
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-base mb-1.5">{item.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ CHECKLIST ══════════════════ */}
            <section className="py-16 md:py-24 px-5 md:px-6 bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="max-w-3xl mx-auto">
                    <SectionTitle
                        title={t('visa_page.checklist.title')}
                        subtitle={t('visa_page.checklist.subtitle')}
                        badge="Documentación"
                    />

                    <div className="space-y-3">
                        {[
                            { icon: <FileText size={18} />, text: t('visa_page.checklist.item_passport') },
                            { icon: <Camera size={18} />, text: t('visa_page.checklist.item_photo') },
                            { icon: <Calendar size={18} />, text: t('visa_page.checklist.item_date') },
                            { icon: <Globe size={18} />, text: t('visa_page.checklist.item_hotel') },
                            { icon: <Smartphone size={18} />, text: t('visa_page.checklist.item_contact') },
                            { icon: <CheckCircle size={18} />, text: t('visa_page.checklist.item_ticket'), badge: 'B1', badgeColor: 'text-primary bg-primary/10 border-primary/20' },
                            { icon: <CardIcon size={18} />, text: t('visa_page.checklist.item_bank'), badge: 'C1', badgeColor: 'text-amber-600 bg-amber-500/10 border-amber-500/20' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm"
                            >
                                <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/8 dark:bg-white/8 flex items-center justify-center text-primary">
                                    {item.icon}
                                </div>
                                <p className="flex-1 text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 leading-snug">{item.text}</p>
                                {item.badge && (
                                    <span className={`shrink-0 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.badgeColor}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ TIMING ══════════════════ */}
            <section id="tiempos" className="py-16 md:py-24 px-5 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <SectionTitle
                        title={t('visa_page.times.title')}
                        badge="Timing"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* B1 */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="p-7 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-2xl bg-green-500/12 flex items-center justify-center text-green-500">
                                    <Clock size={22} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-green-600 bg-green-500/10 px-3 py-1 rounded-full">Instantáneo</span>
                            </div>
                            <h3 className="text-xl font-black mb-3">{t('visa_page.times.b1.title')}</h3>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                {t('visa_page.times.b1.text')}
                            </p>
                        </motion.div>

                        {/* C1 */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                            className="p-7 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-2xl bg-amber-500/12 flex items-center justify-center text-amber-500">
                                    <Clock size={22} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">5–10 días</span>
                            </div>
                            <h3 className="text-xl font-black mb-3">{t('visa_page.times.c1.title')}</h3>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                {t('visa_page.times.c1.text')}
                            </p>
                        </motion.div>
                    </div>

                    <p className="text-center text-sm text-gray-400 font-medium italic mt-8">
                        {t('visa_page.times.completion')}
                    </p>
                </div>
            </section>

            {/* ══════════════════ COMPROMISO CANTIK ══════════════════ */}
            <section className="py-10 px-5 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="flex flex-col sm:flex-row items-center gap-5 p-7 md:p-8 rounded-3xl bg-primary/5 border border-primary/15 dark:bg-primary/10 dark:border-primary/20"
                    >
                        <div className="shrink-0 w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-primary border border-primary/20">
                            <ShieldCheck size={28} />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-lg font-black mb-1.5">{t('visa_page.commitment.title')}</h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                                "{t('visa_page.commitment.text')}"
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════ BOOKING CTA ══════════════════ */}
            <section id="booking" className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                        className="relative rounded-[2.5rem] md:rounded-[3.5rem] bg-bg-dark text-white overflow-hidden border border-white/8 shadow-[0_32px_80px_-16px_rgba(255,107,0,0.25)]"
                    >
                        {/* Glow decorations */}
                        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/25 rounded-full blur-[90px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/15 rounded-full blur-[90px] pointer-events-none" />

                        <div className="relative z-10 p-8 md:p-14">
                            {/* Pricing header */}
                            <div className="text-center mb-10 md:mb-12">
                                <span className="inline-block text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                                    {t('visa_page.pricing.title')}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-3 leading-none">
                                    <span className="text-primary">{price.symbol}{price.amount}</span>
                                    <span className="text-white/60 text-xl md:text-2xl font-bold ml-2">{t('visa_page.pricing.plus_visa')}</span>
                                </h2>
                                <p className="text-white/45 font-medium text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                                    {t('visa_page.pricing.disclaimer')}
                                </p>
                            </div>

                            {/* Form */}
                            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 text-bg-dark shadow-2xl">
                                <h3 className="text-xl md:text-2xl font-black mb-1">{t('visa_page.form.title')}</h3>
                                <p className="text-sm text-gray-500 mb-7 leading-relaxed">{t('visa_page.form.subtitle')}</p>

                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    {/* Name */}
                                    <div>
                                        <Label>{t('visa_page.form.name')} <span className="text-red-500 normal-case font-bold">*</span></Label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            placeholder="Ej: Laura García"
                                            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>

                                    {/* Visa type */}
                                    <div>
                                        <Label>{t('visa_page.form.visa_type')} <span className="text-red-500 normal-case font-bold">*</span></Label>
                                        <StyledSelect name="type" required value={formData.type} onChange={handleFormChange}>
                                            <option value="B1">{t('visa_page.form.visa_b1')}</option>
                                            <option value="C1">{t('visa_page.form.visa_c1')}</option>
                                        </StyledSelect>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <Label>{t('visa_page.form.date')} <span className="text-red-500 normal-case font-bold">*</span></Label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleFormChange}
                                            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <Label>{t('visa_page.form.time')} <span className="text-red-500 normal-case font-bold">*</span></Label>
                                        <StyledSelect name="time" required value={formData.time} onChange={handleFormChange}>
                                            <option value="10:00">10:00 h</option>
                                            <option value="11:00">11:00 h</option>
                                            <option value="12:00">12:00 h</option>
                                            <option value="13:00">13:00 h</option>
                                            <option value="14:00">14:00 h</option>
                                        </StyledSelect>
                                    </div>

                                    {/* Submit */}
                                    <a
                                        href={isFormValid ? generateFormWhatsAppLink() : '#'}
                                        onClick={(e) => {
                                            if (!isFormValid) {
                                                e.preventDefault();
                                                alert('Por favor completa todos los campos requeridos.');
                                            }
                                        }}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`group w-full mt-2 px-8 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-200
                                            ${isFormValid
                                                ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <MessageCircle size={16} />
                                        {t('visa_page.form.btn')}
                                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </form>
                            </div>

                            {/* Offer notice — below form */}
                            <div className="flex items-start gap-3 mt-6 p-5 rounded-2xl bg-white/6 border border-white/10">
                                <AlertTriangle size={20} className="text-primary shrink-0 mt-0.5" />
                                <p className="text-sm text-white/80 font-medium leading-relaxed">
                                    {t('visa_page.it_support')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default VisaPage;
