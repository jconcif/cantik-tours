import SEO from "../components/SEO";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Plane,
    Sun,
    Home,
    Smartphone,
    Wallet,
    Heart,
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    AlertCircle,
    Utensils,
    BookOpen,
    Star,
    MessageCircle
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { baliGuideTranslations } from '../data/baliGuideTranslations';

const getIcon = (id) => {
    switch (id) {
        case 'preparativos': return <Plane size={22} />;
        case 'clima': return <Sun size={22} />;
        case 'alojamiento': return <Home size={22} />;
        case 'movilidad': return <Smartphone size={22} />;
        case 'dinero': return <Wallet size={22} />;
        case 'cultura': return <Heart size={22} />;
        default: return <Plane size={22} />;
    }
};

const getRuleIcon = (label) => {
    if (label.includes('Seguro') || label.includes('Insurance')) return <ShieldCheck size={20} />;
    if (label.includes('Belly') || label.includes('Nyepi')) return <AlertCircle size={20} />;
    if (label.includes('Enchufes') || label.includes('Outlets')) return <BookOpen size={20} />;
    if (label.includes('Templos') || label.includes('Temples')) return <Star size={20} />;
    return <Heart size={20} />;
};

/* ─── Animation variants ───────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Section wrapper ───────────────────────────────────────────── */
const Section = ({ id, icon, number, title, children }) => (
    <section id={id} className="scroll-mt-28">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
        >
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            </div>
            <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                    {icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                    {title}
                </h2>
            </div>
            {children}
        </motion.div>
    </section>
);

/* ─── Info card ─────────────────────────────────────────────────── */
const InfoCard = ({ label, children, accent = false }) => (
    <div className={`p-6 rounded-2xl border ${accent
        ? 'bg-primary/5 border-primary/20'
        : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 shadow-md shadow-black/5'
        }`}>
        {label && (
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">{label}</p>
        )}
        {children}
    </div>
);

/* ─── Bullet point ──────────────────────────────────────────────── */
const Bullet = ({ children }) => (
    <li className="flex gap-3 items-start">
        <ChevronRight size={16} className="text-primary shrink-0 mt-1" />
        <span className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-base">
            {children}
        </span>
    </li>
);

/* ─── Helper to parse prices dynamically ────────────────────────── */
const renderWithPrices = (text, formatPrice) => {
    if (!text || typeof text !== 'string') return text;
    // Regex for {{PRICE_XX}}
    const parts = text.split(/(\{\{PRICE_\d+\}\})/g);
    return parts.map((part, index) => {
        const match = part.match(/\{\{PRICE_(\d+)\}\}/);
        if (match) {
            const price = parseInt(match[1], 10);
            const formatted = formatPrice(price);
            return <strong key={index}>{formatted.symbol}{formatted.amount}</strong>;
        }
        return part;
    });
};

/* ─── Main component ────────────────────────────────────────────── */
const BaliGuide = () => {
    const { i18n } = useTranslation();
    const { formatPrice } = useCurrency();
    const lang = i18n.language && i18n.language.startsWith('en') ? 'en' : 'es';
    const c = baliGuideTranslations[lang];

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const whatsappLink = `https://wa.me/376614535?text=${encodeURIComponent(c.wspText)}`;

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans">
            <SEO
                title={c.seoTitle}
                description={c.seoDescription}
            />

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="inline-block text-primary font-black uppercase tracking-[0.35em] text-xs mb-6">
                            {c.badge}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
                            {c.title1}{' '}
                            <span className="text-primary italic">{c.title2}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            {c.subtitle}
                        </p>
                    </motion.div>

                    {/* Chapter nav pills */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={1}
                        className="mt-12 flex flex-wrap justify-center gap-3"
                    >
                        {c.chapters.map((ch) => (
                            <a
                                key={ch.id}
                                href={`#${ch.id}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:border-primary/40 hover:text-primary transition-all text-sm font-semibold"
                            >
                                <span className="text-primary">{getIcon(ch.id)}</span>
                                {ch.title}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CONTENT ───────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 pb-24 grid gap-24">

                {/* ── 01 Preparativos ─────────────────────────── */}
                <Section id="preparativos" icon={<Plane size={22} />} number={c.chapters[0].number} title={c.s1Label}>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 text-base uppercase tracking-widest">
                        {c.s1Tag}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <InfoCard label={c.visaB1Title}>
                            <ul className="grid gap-2">
                                {c.visaB1Points.map((pt, i) => <Bullet key={i}>{renderWithPrices(pt, formatPrice)}</Bullet>)}
                            </ul>
                        </InfoCard>

                        <InfoCard label={c.visaC1Title}>
                            <ul className="grid gap-2">
                                {c.visaC1Points.map((pt, i) => (
                                    <Bullet key={i}>
                                        {i === 4 ? (
                                            <>
                                                {pt}
                                                <a href="https://evisa.imigrasi.go.id/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                                                    evisa.imigrasi.go.id
                                                </a>
                                            </>
                                        ) : renderWithPrices(pt, formatPrice)}
                                    </Bullet>
                                ))}
                            </ul>
                        </InfoCard>
                    </div>

                    <InfoCard label={c.ecdTitle} accent>
                        <ul className="grid gap-3">
                            <Bullet>
                                {renderWithPrices(c.ecdP1.split('Love Bali')[0], formatPrice)}
                                <a href="https://lovebali.baliprov.go.id/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                                    Love Bali
                                </a>
                                {c.ecdP1.split('Love Bali')[1]}
                            </Bullet>
                            <Bullet>
                                {c.ecdP2}
                            </Bullet>
                        </ul>
                        <p className="mt-4 text-base font-bold text-primary/80 italic">
                            {c.ecdTip}
                        </p>
                    </InfoCard>
                </Section>

                {/* ── 02 Clima ────────────────────────────────── */}
                <Section id="clima" icon={<Sun size={22} />} number={c.chapters[1].number} title={c.s2Label}>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed text-base">
                        {c.s2Desc}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoCard label={c.weatherDryTitle}>
                            <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                {c.weatherDryDesc}
                            </p>
                        </InfoCard>
                        <InfoCard label={c.weatherRainTitle}>
                            <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                {c.weatherRainDesc}
                            </p>
                        </InfoCard>
                    </div>

                    <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                        <p className="text-base font-bold text-gray-700 dark:text-gray-300">
                            {c.weatherBest}
                        </p>
                    </div>
                </Section>

                {/* ── 03 Alojamiento ──────────────────────────── */}
                <Section id="alojamiento" icon={<Home size={22} />} number={c.chapters[2].number} title={c.s3Label}>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed text-base">
                        {c.s3Desc}
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {c.accommodationAreas.map((area) => (
                            <div
                                key={area.name}
                                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-md shadow-black/5 hover:border-primary/30 transition-colors"
                            >
                                <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{area.tag}</p>
                                <h3 className="text-xl font-black mb-2">{area.name}</h3>
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{area.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-base text-gray-400 font-medium italic">
                        {c.s3Tip}
                    </p>
                </Section>

                {/* ── 04 Movilidad ────────────────────────────── */}
                <Section id="movilidad" icon={<Smartphone size={22} />} number={c.chapters[3].number} title={c.s4Label}>

                    <div className="grid gap-6">
                        <InfoCard label={c.appsTitle}>
                            <ul className="grid gap-3">
                                <Bullet>{c.appInternet}</Bullet>
                                <Bullet>{c.appGrab}</Bullet>
                                <Bullet>{c.appMaps}</Bullet>
                            </ul>
                        </InfoCard>

                        <InfoCard label={c.transportTitle}>
                            <ul className="grid gap-3">
                                <Bullet>{c.transPrivate}</Bullet>
                                <Bullet>{c.transMoto}</Bullet>
                                <Bullet>{c.transLicense}</Bullet>
                                <Bullet>{c.transWarning}</Bullet>
                            </ul>
                        </InfoCard>
                    </div>
                </Section>

                {/* ── 05 Dinero ───────────────────────────────── */}
                <Section id="dinero" icon={<Wallet size={22} />} number={c.chapters[4].number} title={c.s5Label}>
                    <div className="grid gap-6">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                            <p className="font-black text-gray-800 dark:text-gray-100 mb-1">{c.moneyWarningTitle}</p>
                            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                                {c.moneyWarningDesc}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <InfoCard label={c.atmTitle}>
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    {c.atmDesc}
                                </p>
                            </InfoCard>
                            <InfoCard label={c.exchangeTitle}>
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    {c.exchangeDesc}
                                </p>
                            </InfoCard>
                            <InfoCard label={c.budgetTitle}>
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed whitespace-pre-line">
                                    {renderWithPrices(c.budgetText, formatPrice)}
                                </p>
                            </InfoCard>
                        </div>
                    </div>
                </Section>

                {/* ── 06 Cultura ──────────────────────────────── */}
                <Section id="cultura" icon={<Heart size={22} />} number={c.chapters[5].number} title={c.s6Label}>

                    {/* Gastronomy */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Utensils size={18} className="text-primary" />
                            <h3 className="text-xl font-black">{c.foodTitle}</h3>
                        </div>
                        <InfoCard>
                            <p className="text-base text-gray-500 dark:text-gray-400 font-medium mb-4">
                                {c.foodDesc}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {c.foods.map((dish) => (
                                    <div key={dish.name} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                                        <div>
                                            <p className="font-black text-base">{dish.name}</p>
                                            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">{dish.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </InfoCard>
                    </div>

                    {/* Pocket dictionary */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageCircle size={18} className="text-primary" />
                            <h3 className="text-xl font-black">{c.dictTitle}</h3>
                        </div>
                        <InfoCard accent>
                            <div className="grid sm:grid-cols-2 gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                {c.dictWords.map((word) => (
                                    <div key={word.indo} className="flex justify-between gap-4 py-1.5 border-b border-primary/10 last:border-0">
                                        <span className="font-black text-primary">{word.indo}</span>
                                        <span className="text-gray-500 dark:text-gray-400">{word.local}</span>
                                    </div>
                                ))}
                            </div>
                        </InfoCard>
                    </div>

                    {/* Survival rules */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck size={18} className="text-primary" />
                            <h3 className="text-xl font-black">{c.rulesTitle}</h3>
                        </div>
                        <div className="grid gap-4">
                            {c.survivalRules.map((rule) => (
                                <div
                                    key={rule.label}
                                    className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        {getRuleIcon(rule.label)}
                                    </div>
                                    <div>
                                        <p className="font-black mb-1">{rule.label}</p>
                                        <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{rule.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>

            {/* ── CTA FINAL ─────────────────────────────────────── */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative bg-bg-dark text-white rounded-[3rem] p-12 md:p-20 text-center overflow-hidden border border-white/5"
                    >
                        {/* Glows */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
                                {c.ctaTitle}
                            </h2>
                            <p className="text-lg md:text-xl text-white/60 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                                {c.ctaDesc}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    to="/tours"
                                    className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
                                >
                                    {c.ctaBtn1}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase tracking-widest text-xs transition-all text-white flex items-center justify-center gap-3"
                                >
                                    {c.ctaBtn2}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BaliGuide;
