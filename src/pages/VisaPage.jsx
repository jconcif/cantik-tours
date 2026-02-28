import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ShieldCheck,
    Lock,
    Clock,
    CreditCard,
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
    CreditCard as CardIcon
} from 'lucide-react';
import SEO from '../components/SEO';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

const SectionTitle = ({ title, subtitle, badge }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-16"
    >
        {badge && (
            <span className="inline-block text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                {badge}
            </span>
        )}
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            {title}
        </h2>
        {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {subtitle}
            </p>
        )}
    </motion.div>
);

const VisaPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = React.useState({
        name: '',
        type: 'B1',
        date: '',
        time: '10:00'
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const whatsappLink = `https://wa.me/376614535?text=${encodeURIComponent(t('visa_page.whatsapp_message'))}`;

    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateFormWhatsAppLink = () => {
        const typeText = formData.type === 'B1' ? t('visa_page.form.visa_b1') : t('visa_page.form.visa_c1');
        const msg = t('visa_page.form.message_template')
            .replace('{{name}}', formData.name || '-')
            .replace('{{type}}', typeText)
            .replace('{{date}}', formData.date || '-')
            .replace('{{time}}', formData.time || '-');
        return `https://wa.me/376614535?text=${encodeURIComponent(msg)}`;
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans overflow-hidden">
            <SEO
                title={t('visa_page.seo_title')}
                description={t('visa_page.seo_desc')}
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-5xl mx-auto text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black uppercase tracking-widest text-[10px] mb-8 border border-primary/20">
                            {t('visa_page.hero.badge')}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
                            {t('visa_page.hero.title_1')}<br />
                            <span className="text-primary italic">{t('visa_page.hero.title_2')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                            {t('visa_page.hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noreferrer"
                                className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
                            >
                                <MessageCircle size={18} />
                                {t('visa_page.hero.btn_whatsapp')}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#tiempos"
                                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-sm"
                            >
                                <FileText size={18} className="text-primary" />
                                {t('visa_page.hero.btn_types')}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- WHY US (PAIN POINTS) --- */}
            <section className="py-24 px-6 bg-white/50 dark:bg-transparent relative">
                <div className="max-w-7xl mx-auto">
                    <SectionTitle
                        title={t('visa_page.why.title')}
                        subtitle={t('visa_page.why.subtitle')}
                    />

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Users size={28} />, title: t('visa_page.why.reason1.title'), text: t('visa_page.why.reason1.text') },
                            { icon: <FileText size={28} />, title: t('visa_page.why.reason2.title'), text: t('visa_page.why.reason2.text') },
                            { icon: <CardIcon size={28} />, title: t('visa_page.why.reason3.title'), text: t('visa_page.why.reason3.text') }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/[0.02]"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECURITY SECTION --- */}
            <section id="tiempos" className="py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                                {t('visa_page.security.title')}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.95]">
                                Tu seguridad es <br />
                                <span className="text-primary italic">no negociable.</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-12">
                                {t('visa_page.security.subtitle')}
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: <Lock />, title: t('visa_page.security.item1.title'), text: t('visa_page.security.item1.text') },
                                    { icon: <Globe />, title: t('visa_page.security.item2.title'), text: t('visa_page.security.item2.text') },
                                    { icon: <CheckCircle />, title: t('visa_page.security.item3.title'), text: t('visa_page.security.item3.text') }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 items-start">
                                        <div className="mt-1 text-primary shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative z-10 p-2 bg-white dark:bg-white/10 rounded-[3rem] shadow-2xl border border-black/5 dark:border-white/10">
                                <div className="bg-bg-dark rounded-[2.5rem] p-8 text-white aspect-square flex flex-col justify-center">
                                    <div className="mb-6 p-4 bg-white/10 rounded-2xl w-fit">
                                        <Clock className="text-primary" size={32} />
                                    </div>
                                    <h3 className="text-3xl font-black mb-6 tracking-tighter">{t('visa_page.times.title')}</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <h4 className="font-bold text-lg">{t('visa_page.times.b1.title')}</h4>
                                            </div>
                                            <p className="text-white/60 text-sm leading-relaxed">{t('visa_page.times.b1.text')}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                <h4 className="font-bold text-lg">{t('visa_page.times.c1.title')}</h4>
                                            </div>
                                            <p className="text-white/60 text-sm leading-relaxed">{t('visa_page.times.c1.text')}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="text-white/40 text-xs font-medium italic">
                                            {t('visa_page.times.completion')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- COMPROMISO CANTIK BANNER --- */}
            <section className="py-12 px-6 bg-primary/5 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-bg-dark rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/5 shadow-xl flex flex-col sm:flex-row items-center gap-6 justify-center text-center sm:text-left">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <ShieldCheck size={40} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-2">Compromiso Cantik</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium md:text-lg max-w-xl leading-relaxed italic">
                                "Tratamos tus datos como propios. Nuestra reputación se basa en la confianza y el servicio personalizado."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CHECKLIST SECTION --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <SectionTitle
                        title={t('visa_page.checklist.title')}
                        subtitle={t('visa_page.checklist.subtitle')}
                        badge="Documentación"
                    />

                    <div className="grid gap-4">
                        {[
                            { icon: <FileText size={20} />, text: t('visa_page.checklist.item_passport') },
                            { icon: <Camera size={20} />, text: t('visa_page.checklist.item_photo') },
                            { icon: <Calendar size={20} />, text: t('visa_page.checklist.item_date') },
                            { icon: <Globe size={20} />, text: t('visa_page.checklist.item_hotel') },
                            { icon: <Smartphone size={20} />, text: t('visa_page.checklist.item_contact') },
                            { icon: <CheckCircle size={20} />, text: t('visa_page.checklist.item_ticket'), badge: "B1", badgeColor: "text-primary bg-primary/10 border-primary/20 dark:border-primary/30" },
                            { icon: <CardIcon size={20} />, text: t('visa_page.checklist.item_bank'), badge: "C1", badgeColor: "text-secondary bg-secondary/10 border-secondary/20 dark:border-secondary/30" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] sm:items-center hover:scale-[1.01] transition-transform">
                                <div className="flex gap-4 items-center flex-1">
                                    <div className="text-primary shrink-0 bg-primary/5 p-3 rounded-xl dark:bg-white/5 border border-primary/10 dark:border-white/5">{item.icon}</div>
                                    <p className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base leading-relaxed">{item.text}</p>
                                </div>
                                {item.badge && (
                                    <div className="pl-[3.25rem] sm:pl-0 sm:shrink-0">
                                        <span className={`inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border ${item.badgeColor}`}>
                                            Solo Visa {item.badge}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PRICING CTA --- */}
            <section className="py-32 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-bg-dark text-white rounded-[4rem] p-12 md:p-20 text-center overflow-hidden border border-white/5 shadow-[0_40px_100px_-20px_rgba(255,107,0,0.2)]"
                    >
                        {/* Glows */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center text-left">
                            <div>
                                <span className="inline-block text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">
                                    {t('visa_page.pricing.title')}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                                    {t('visa_page.pricing.cost')}
                                </h2>
                                <p className="text-xl text-white/50 font-medium mb-12">
                                    {t('visa_page.pricing.disclaimer')}
                                </p>

                                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <AlertTriangle className="text-primary mt-1 shrink-0" size={24} />
                                    <p className="text-sm font-bold text-white/90 leading-relaxed">
                                        {t('visa_page.it_support')}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-bg-light/90 rounded-[2.5rem] p-8 text-bg-dark">
                                <h3 className="text-2xl font-black mb-2">{t('visa_page.form.title')}</h3>
                                <p className="text-sm font-medium text-gray-600 mb-8 leading-relaxed">
                                    {t('visa_page.form.subtitle')}
                                </p>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('visa_page.form.name')}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="Ej: Laura García"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('visa_page.form.visa_type')}</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleFormChange}
                                            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                        >
                                            <option value="B1">{t('visa_page.form.visa_b1')}</option>
                                            <option value="C1">{t('visa_page.form.visa_c1')}</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('visa_page.form.date')}</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleFormChange}
                                                className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('visa_page.form.time')}</label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleFormChange}
                                                min="10:00" max="14:00"
                                                className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <a
                                        href={generateFormWhatsAppLink()}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group w-full mt-6 px-12 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-4"
                                    >
                                        <MessageCircle size={18} />
                                        {t('visa_page.form.btn')}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default VisaPage;
