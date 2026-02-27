import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    Bike, Car, Smartphone, Utensils, Languages, MessageCircle, Briefcase,
    Sun, CloudRain, Calendar, Thermometer, ChevronDown, Info, ArrowRight, BookOpen,
    Map, Star, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { trackEvent } from '../utils/analytics';

const GuideSection = ({ title, children, isOpen, onToggle, id }) => (
    <div className="border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden bg-white dark:bg-white/5 transition-all">
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`section-content-${id}`}
            className="w-full px-4 py-5 md:px-8 md:py-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
        >
            <div className="flex items-center gap-4 text-left">
                <span className="text-base md:text-xl font-bold">{title}</span>
            </div>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ChevronDown size={20} className="text-gray-400" />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    id={`section-content-${id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-5 md:px-8 md:pb-8"
                >
                    <div className="pt-4 border-t border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-lg">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const BaliGuide = () => {
    const { t } = useTranslation();
    const [openSections, setOpenSections] = useState([]);
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const toggleSection = (id) => {
        setOpenSections(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const allSections = [
        {
            id: 'weather', tab: 'antes', title: t('guide.sections.weather.title'), content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.weather.intro')}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20">
                            <div className="flex items-center gap-3 mb-4 text-orange-600 dark:text-orange-400">
                                <Sun size={24} />
                                <h4 className="font-black uppercase tracking-wider text-base">{t('guide.sections.weather.dry_season_title')}</h4>
                            </div>
                            <p className="text-base leading-relaxed opacity-80">{t('guide.sections.weather.dry_season_desc')}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20">
                            <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                                <CloudRain size={24} />
                                <h4 className="font-black uppercase tracking-wider text-base">{t('guide.sections.weather.wet_season_title')}</h4>
                            </div>
                            <p className="text-base leading-relaxed opacity-80">{t('guide.sections.weather.wet_season_desc')}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                            <Calendar size={24} />
                            <h4 className="font-black uppercase tracking-wider text-base">{t('guide.sections.weather.months_title')}</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {[
                                { m: 'jan', icon: <CloudRain size={16} /> },
                                { m: 'feb', icon: <CloudRain size={16} /> },
                                { m: 'mar', icon: <Calendar size={16} /> },
                                { m: 'apr', icon: <Sun size={16} /> },
                                { m: 'may', icon: <Sun size={16} /> },
                                { m: 'jun', icon: <Sun size={16} /> },
                                { m: 'jul', icon: <Thermometer size={16} /> },
                                { m: 'aug', icon: <Sun size={16} /> },
                                { m: 'sep', icon: <Sun size={16} /> },
                                { m: 'oct', icon: <Thermometer size={16} /> },
                                { m: 'nov', icon: <CloudRain size={16} /> },
                                { m: 'dec', icon: <CloudRain size={16} /> }
                            ].map((month, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{t(`guide.sections.weather.month_${month.m}`)}</span>
                                    <div className="text-primary">{month.icon}</div>
                                    <span className="text-[8px] text-center opacity-60 font-medium leading-tight">{t(`guide.sections.weather.month_desc_${month.m}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'visa', tab: 'antes', title: t('guide.sections.visa.title'), content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.visa.intro')}</p>
                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.visa.basic_title')}</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p><strong>{t('guide.sections.visa.passport')}:</strong> {t('guide.sections.visa.passport_desc')}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="grid gap-6">
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-base md:text-lg mb-2">{t('guide.sections.visa.b1_title')}</h5>
                            <p className="text-base mb-4">{t('guide.sections.visa.b1_cost')} • {t('guide.sections.visa.b1_duration')}</p>
                            <div className="space-y-4">
                                <div className="text-sm">
                                    <p className="font-bold text-primary mb-1">{t('guide.sections.visa.b1_mgmt')}</p>
                                    <ul className="space-y-1 ml-4 list-disc opacity-80">
                                        <li>{t('guide.sections.visa.b1_evoa')}</li>
                                        <li>{t('guide.sections.visa.b1_voa')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'stay', tab: 'antes', title: t('guide.sections.stay.title'), content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.stay.intro')}</p>
                    <div className="grid gap-4">
                        {['ubud', 'uluwatu', 'canggu', 'sanur'].map((loc) => (
                            <div key={loc} className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <h5 className="font-bold text-base mb-1">{t(`guide.sections.stay.${loc}_title`)}</h5>
                                <p className="text-sm opacity-80">{t(`guide.sections.stay.${loc}_desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'packing', tab: 'antes', title: t('guide.sections.packing.title'), content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.packing.intro')}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <h5 className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">{t(`guide.sections.packing.category_${num}`)}</h5>
                                <p className="text-sm font-medium">{t(`guide.sections.packing.items_${num}`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'apps', tab: 'durante', title: t('guide.sections.apps.title'), content: (
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <Smartphone size={24} />
                            <h4 className="font-black uppercase text-base">{t('guide.sections.apps.internet_title')}</h4>
                        </div>
                        <p className="text-base opacity-80 leading-relaxed">{t('guide.sections.apps.internet_desc')}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <Map size={24} />
                            <h4 className="font-black uppercase text-base">{t('guide.sections.apps.maps_title')}</h4>
                        </div>
                        <p className="text-base opacity-80 leading-relaxed">{t('guide.sections.apps.maps_desc')}</p>
                    </div>
                </div>
            )
        },
        {
            id: 'money', tab: 'durante', title: t('guide.sections.money.title'), content: (
                <div className="space-y-8">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <h5 className="font-bold text-lg mb-3">{t('guide.sections.money.exchange_title')}</h5>
                        <p className="text-sm leading-relaxed mb-4">{t('guide.sections.money.exchange_bills')}</p>
                        <p className="text-xs bg-white/50 dark:bg-white/5 p-3 rounded-lg italic font-bold text-primary">{t('guide.sections.money.exchange_where')}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-black/5 dark:border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{t('guide.sections.money.budget_food')}</p>
                            <p className="font-black">3€ - 7€ por persona</p>
                        </div>
                        <div className="p-4 rounded-xl border border-black/5 dark:border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{t('guide.sections.money.budget_beer')}</p>
                            <p className="font-black">2€ - 3.5€ aprox</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'transport', tab: 'durante', title: t('guide.sections.transport.title'), content: (
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <h5 className="font-bold text-base md:text-lg mb-4 flex items-center gap-2">
                            <Smartphone size={20} className="text-primary" /> {t('guide.sections.transport.grab_gojek_title')}
                        </h5>
                        <p className="text-base opacity-80 leading-relaxed mb-4">{t('guide.sections.transport.grab_gojek_desc')}</p>
                        <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-bold">{t('guide.sections.transport.grab_gojek_tip')}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-bg-dark text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h5 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2">
                                <Car size={24} className="text-primary" /> {t('guide.sections.transport.driver_title')}
                            </h5>
                            <p className="text-sm opacity-80 mb-4">{t('guide.sections.transport.driver_desc')}</p>
                            <p className="text-primary font-black italic">{t('guide.sections.transport.driver_highlight')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'health', tab: 'durante', title: t('guide.sections.health.title'), content: (
                <div className="space-y-8">
                    <div className="p-6 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5">
                        <h5 className="font-black text-primary mb-3">{t('guide.sections.health.best_tip')}</h5>
                        <p className="text-base leading-relaxed font-bold">{t('guide.sections.health.insurance_desc')}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <h5 className="font-bold text-lg mb-3">{t('guide.sections.health.belly_title')}</h5>
                        <ul className="space-y-2 text-sm opacity-80 list-disc ml-4">
                            <li>{t('guide.sections.health.belly_water').split(':')[1]}</li>
                            <li>{t('guide.sections.health.belly_ice').split(':')[1]}</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: 'food', tab: 'experiencia', title: t('guide.sections.food.title'), content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.food.intro')}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {['nasi_goreng', 'mie_goreng', 'satay', 'gado_gado'].map((dish) => (
                            <div key={dish} className="flex gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Utensils size={24} className="text-primary opacity-40" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm mb-1">{t(`guide.sections.food.${dish}_title`)}</h5>
                                    <p className="text-[11px] opacity-70 leading-relaxed">{t(`guide.sections.food.${dish}_desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'phrases', tab: 'experiencia', title: t('guide.sections.phrases.title'), content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['halo', 'terima_kasih', 'sama_sama', 'tolong', 'tidak_pedas'].map((p) => (
                        <div key={p} className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col">
                            <span className="text-[9px] font-black uppercase text-primary mb-1">{p.replace('_', ' ')}</span>
                            <p className="font-bold text-lg">{t(`guide.sections.phrases.${p}`)}</p>
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 'safety', tab: 'experiencia', title: t('guide.sections.safety.title'), content: (
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <p className="text-base mb-4"><strong>{t('guide.sections.safety.sockets_title')}:</strong> {t('guide.sections.safety.sockets_desc')}</p>
                        <p className="text-sm italic opacity-70">{t('guide.sections.safety.safety_tip')}</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-2 md:px-8 max-w-7xl mx-auto">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[70] origin-left"
                style={{ scaleX }}
            />
            <SEO
                title={`${t('guide.title')} ${t('guide.title_accent')} | Viaja a tu ritmo`}
                description={t('guide.subtitle')}
                keywords="guía bali 2026, consejos viajar bali, visado bali, clima bali, seguridad bali, moneda indonesia"
            />

            {/* Header Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 md:mb-24"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-sm uppercase tracking-widest mb-8 border border-primary/20">
                    <BookOpen size={16} /> {t('guide.badge')}
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                    {t('guide.title')} <br />
                    <span className="text-primary italic">{t('guide.title_accent')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('guide.subtitle')}
                </p>
            </motion.div>

            {/* Content Chapters */}
            <div ref={containerRef} className="space-y-32">
                {/* Chapter 1: Preparativos */}
                <section id="antes" className="scroll-mt-32">
                    <div className="mb-12 px-2">
                        <span className="text-primary font-black text-xs uppercase tracking-[0.3em] block mb-2">{t('guide.chapters.preparations.subtitle')}</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                            {t('guide.chapters.preparations.title')} <div className="h-1 w-12 bg-primary/30 rounded-full" />
                        </h2>
                    </div>
                    <div className="grid gap-6">
                        <GuideSection id="visa" title={t('guide.sections.visa.title')} isOpen={openSections.includes('visa')} onToggle={() => toggleSection('visa')}>
                            <div className="space-y-8">
                                <p className="text-gray-600 dark:text-gray-300 italic text-base">{t('guide.sections.visa.intro')}</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 md:p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm flex flex-col h-full">
                                        <h5 className="font-black text-lg mb-4 text-primary">{t('guide.sections.visa.b1_title')}</h5>
                                        <ul className="space-y-2 mb-6 flex-grow">
                                            {t('guide.sections.visa.b1_points', { returnObjects: true })?.map((point, i) => (
                                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                                    <span className="text-primary mt-1.5">•</span> {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 md:p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm flex flex-col h-full">
                                        <h5 className="font-black text-lg mb-4 text-primary">{t('guide.sections.visa.c1_title')}</h5>
                                        <ul className="space-y-2 flex-grow">
                                            {t('guide.sections.visa.c1_points', { returnObjects: true })?.map((point, i) => (
                                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                                    <span className="text-primary mt-1.5">•</span> {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-6 rounded-[2rem] bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20">
                                    <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-400">
                                        <Shield size={24} />
                                        <h4 className="font-black uppercase tracking-wider text-base">{t('guide.sections.visa.levy_title')}</h4>
                                    </div>
                                    <p className="text-sm leading-relaxed mb-4 opacity-80">{t('guide.sections.visa.levy_desc')}</p>
                                </div>
                            </div>
                        </GuideSection>

                        <GuideSection id="weather" title={t('guide.sections.weather.title')} isOpen={openSections.includes('weather')} onToggle={() => toggleSection('weather')}>
                            <div className="space-y-8">
                                <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.weather.intro')}</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 md:p-6 rounded-[2rem] bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20">
                                        <div className="flex items-center gap-3 mb-4 text-orange-600 dark:text-orange-400">
                                            <Sun size={24} />
                                            <h4 className="font-black uppercase tracking-wider text-sm">{t('guide.sections.weather.dry_season_title')}</h4>
                                        </div>
                                        <p className="text-sm leading-relaxed opacity-80">{t('guide.sections.weather.dry_season_desc')}</p>
                                    </div>
                                    <div className="p-4 md:p-6 rounded-[2rem] bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20">
                                        <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                                            <CloudRain size={24} />
                                            <h4 className="font-black uppercase tracking-wider text-sm">{t('guide.sections.weather.wet_season_title')}</h4>
                                        </div>
                                        <p className="text-sm leading-relaxed opacity-80">{t('guide.sections.weather.wet_season_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </GuideSection>

                        <GuideSection id="stay" title={t('guide.sections.stay.title')} isOpen={openSections.includes('stay')} onToggle={() => toggleSection('stay')}>
                            <div className="space-y-8">
                                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20">
                                    <h5 className="font-black text-primary uppercase tracking-widest text-[10px] mb-3">Plataformas Recomendadas</h5>
                                    <p className="text-gray-900 dark:text-white font-medium leading-relaxed">{t('guide.sections.stay.booking_agoda')}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {['ubud', 'uluwatu', 'canggu', 'sanur', 'amed', 'lovina', 'nusadua'].map((loc) => (
                                        <div key={loc} className="p-4 md:p-6 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                            <h5 className="font-black text-primary text-lg mb-2">{t(`guide.sections.stay.${loc}_title`)}</h5>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{t(`guide.sections.stay.${loc}_desc`)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GuideSection>

                        <GuideSection id="packing" title={t('guide.sections.packing.title')} isOpen={openSections.includes('packing')} onToggle={() => toggleSection('packing')}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="p-4 md:p-6 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                        <h5 className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">{t(`guide.sections.packing.category_${num}`)}</h5>
                                        <p className="text-sm font-medium leading-relaxed">{t(`guide.sections.packing.items_${num}`)}</p>
                                    </div>
                                ))}
                            </div>
                        </GuideSection>
                    </div>
                </section>

                {/* Chapter 2: En la Isla */}
                <section id="durante" className="scroll-mt-32">
                    <div className="mb-12 px-2">
                        <span className="text-primary font-black text-xs uppercase tracking-[0.3em] block mb-2">{t('guide.chapters.on_island.subtitle')}</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                            {t('guide.chapters.on_island.title')} <div className="h-1 w-12 bg-primary/30 rounded-full" />
                        </h2>
                    </div>
                    <div className="grid gap-6">
                        <GuideSection id="apps" title={t('guide.sections.apps.title')} isOpen={openSections.includes('apps')} onToggle={() => toggleSection('apps')}>
                            <div className="space-y-6">
                                <p className="text-gray-600 dark:text-gray-300 italic text-base">{t('guide.sections.apps.intro')}</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20">
                                        <Smartphone className="text-indigo-600 mb-4" size={32} />
                                        <h4 className="font-black text-xl mb-2">{t('guide.sections.transport.grab_gojek_title')}</h4>
                                        <p className="text-sm opacity-80 leading-relaxed">{t('guide.sections.transport.grab_gojek_desc')}</p>
                                    </div>
                                    <div className="p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20">
                                        <Map className="text-emerald-600 mb-4" size={32} />
                                        <h4 className="font-black text-xl mb-2">{t('guide.sections.apps.maps_title')}</h4>
                                        <p className="text-sm opacity-80 leading-relaxed">{t('guide.sections.apps.maps_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </GuideSection>

                        <GuideSection id="money" title={t('guide.sections.levy.title')} isOpen={openSections.includes('money')} onToggle={() => toggleSection('money')}>
                            <div className="space-y-6">
                                <div className="p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-primary/5 border border-primary/10">
                                    <h5 className="font-black text-xl mb-4">{t('guide.sections.levy.exchange_title')}</h5>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('guide.sections.levy.exchange_bills')}</p>
                                    <div className="bg-white/80 dark:bg-white/5 p-4 rounded-2xl border border-primary/20 text-primary font-black text-xs uppercase tracking-widest text-center shadow-sm">
                                        {t('guide.sections.levy.exchange_where')}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 md:p-6 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col justify-center">
                                        <span className="text-[10px] font-black uppercase text-gray-400 mb-1">{t('guide.sections.levy.budget_food')}</span>
                                        <p className="font-black text-xl text-gray-900 dark:text-white">3€ - 7€ <span className="text-xs opacity-40 font-bold uppercase tracking-widest">/ por persona</span></p>
                                    </div>
                                    <div className="p-4 md:p-6 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col justify-center">
                                        <span className="text-[10px] font-black uppercase text-gray-400 mb-1">{t('guide.sections.levy.budget_beer')}</span>
                                        <p className="font-black text-xl text-gray-900 dark:text-white">2€ - 3.5€ <span className="text-xs opacity-40 font-bold uppercase tracking-widest">/ aprox</span></p>
                                    </div>
                                </div>
                            </div>
                        </GuideSection>

                        <GuideSection id="transport" title={t('guide.sections.transport.title')} isOpen={openSections.includes('transport')} onToggle={() => toggleSection('transport')}>
                            <div className="space-y-6">
                                <div className="p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                            <Smartphone size={20} />
                                        </div>
                                        <h5 className="font-black text-xl tracking-tight">{t('guide.sections.transport.grab_gojek_title')}</h5>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{t('guide.sections.transport.grab_gojek_desc')}</p>
                                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest text-center">
                                        {t('guide.sections.transport.grab_gojek_tip')}
                                    </div>
                                </div>
                                <div className="p-5 md:p-8 rounded-[2.5rem] bg-bg-dark text-white shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h5 className="font-black text-2xl mb-2 flex items-center gap-2">
                                            <Car size={32} className="text-primary" /> {t('guide.sections.transport.driver_title')}
                                        </h5>
                                        <p className="text-sm opacity-60 mb-6 font-medium leading-relaxed">{t('guide.sections.transport.driver_desc')}</p>
                                        <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                                            <Star size={12} fill="currentColor" /> {t('guide.sections.transport.driver_highlight')}
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                                </div>
                            </div>
                        </GuideSection>
                    </div>
                </section>

                {/* Chapter 3: Cultura */}
                <section id="experiencia" className="scroll-mt-32">
                    <div className="mb-12 px-2">
                        <span className="text-primary font-black text-xs uppercase tracking-[0.3em] block mb-2">{t('guide.chapters.experience.subtitle')}</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                            {t('guide.chapters.experience.title')} <div className="h-1 w-12 bg-primary/30 rounded-full" />
                        </h2>
                    </div>
                    <div className="grid gap-6">
                        <GuideSection id="food" title={t('guide.sections.food.title')} isOpen={openSections.includes('food')} onToggle={() => toggleSection('food')}>
                            <p className="text-gray-600 dark:text-gray-300 italic text-base mb-8">{t('guide.sections.food.intro')}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {['nasi_goreng', 'mie_goreng', 'satay', 'gado_gado'].map((dish) => (
                                    <div key={dish} className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm flex items-start gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <Utensils size={24} />
                                        </div>
                                        <div>
                                            <h5 className="font-black text-lg mb-1">{t(`guide.sections.food.${dish}_title`)}</h5>
                                            <p className="text-xs text-gray-500 leading-normal">{t(`guide.sections.food.${dish}_desc`)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GuideSection>

                        <GuideSection id="phrases" title={t('guide.sections.phrases.title')} isOpen={openSections.includes('phrases')} onToggle={() => toggleSection('phrases')}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {['halo', 'terima_kasih', 'sama_sama', 'tolong', 'tidak_pedas'].map((p) => (
                                    <div key={p} className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10 flex flex-col items-center text-center">
                                        <span className="text-[10px] font-black uppercase text-secondary/60 mb-2 tracking-widest">{p.replace('_', ' ')}</span>
                                        <p className="font-black text-xl text-secondary-dark leading-none">{t(`guide.sections.phrases.${p}`)}</p>
                                    </div>
                                ))}
                            </div>
                        </GuideSection>

                        <GuideSection id="safety" title={t('guide.sections.safety.title')} isOpen={openSections.includes('safety')} onToggle={() => toggleSection('safety')}>
                            <div className="space-y-6">
                                <div className="p-4 md:p-8 rounded-[2rem] border-[3px] border-dashed border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                    <Shield size={48} className="text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-black text-xl mb-1 uppercase tracking-tight">{t('guide.sections.health.insurance_alert_title')}</h4>
                                        <p className="text-sm font-bold opacity-80 leading-relaxed text-gray-700 dark:text-gray-300">{t('guide.sections.health.insurance_desc')}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 md:p-6 rounded-[2rem] bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20">
                                        <h5 className="font-black text-lg mb-2 text-orange-700 dark:text-orange-400">{t('guide.sections.health.belly_title')}</h5>
                                        <p className="text-xs font-medium leading-relaxed opacity-80">{t('guide.sections.health.belly_intro')}</p>
                                    </div>
                                    <div className="p-4 md:p-6 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
                                        <h5 className="font-black text-lg mb-2">{t('guide.sections.safety.sockets')}</h5>
                                        <p className="text-xs font-medium leading-relaxed opacity-60">{t('guide.sections.safety.sockets_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </GuideSection>
                    </div>
                </section>
            </div>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-32 p-12 md:p-20 rounded-[4rem] bg-bg-dark text-white relative overflow-hidden group shadow-[0_40px_100px_rgba(19,200,236,0.3)] text-center"
            >
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                        ¿Listo para vivir <br />
                        <span className="text-primary italic">tu propia historia?</span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-2xl mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                        {t('guide.help_text')}
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/tours"
                            className="inline-flex items-center justify-center gap-4 bg-primary hover:bg-white text-white hover:text-bg-dark font-black px-12 py-6 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 text-xl group"
                        >
                            {t('guide.see_tours_btn')}
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] -mr-64 -mt-64 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] -ml-64 -mb-64 animate-pulse delay-700" />
            </motion.div>
        </div>
    );
};

export default BaliGuide;
