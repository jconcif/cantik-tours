import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, ArrowRight, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { trackEvent } from '../utils/analytics';

const GuideSection = ({ title, children, isOpen, onToggle }) => (
    <div className="border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden bg-white dark:bg-white/5 transition-all">
        <button
            onClick={onToggle}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
        >
            <div className="flex items-center gap-4 text-left">
                <h3 className="text-xl font-bold">{title}</h3>
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
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-8"
                >
                    <div className="pt-4 border-t border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-300 leading-relaxed font-medium text-lg">
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

    const toggleSection = (idx) => {
        setOpenSections(prev =>
            prev.includes(idx)
                ? prev.filter(i => i !== idx)
                : [...prev, idx]
        );
    };

    const sections = [
        {
            title: t('guide.sections.visa.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-lg">{t('guide.sections.visa.intro')}</p>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.visa.basic_title')}</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p><strong>{t('guide.sections.visa.passport')}:</strong> {t('guide.sections.visa.passport_desc')}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.visa.types_title')}</h4>
                        <div className="grid gap-6">
                            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <h5 className="font-bold text-lg mb-2">{t('guide.sections.visa.b1_title')}</h5>
                                <p className="text-base mb-2 opacity-80">{t('guide.sections.visa.b1_cost')}</p>
                                <p className="text-base mb-4 opacity-80">{t('guide.sections.visa.b1_duration')}</p>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <p className="text-base font-bold">{t('guide.sections.visa.b1_mgmt')}</p>
                                        <ul className="text-base space-y-2 ml-4">
                                            <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.visa.b1_evoa')}</span></li>
                                            <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.visa.b1_voa')}</span></li>
                                        </ul>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base font-bold">{t('guide.sections.visa.b1_reqs')}</p>
                                        <ul className="text-base space-y-2 ml-4">
                                            <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.visa.b1_exit_desc')}</span></li>
                                        </ul>
                                        <p className="text-sm text-primary font-medium mt-2">{t('guide.sections.visa.b1_exit_tip')}</p>
                                    </div>
                                    <p className="text-sm opacity-70 italic">{t('guide.sections.visa.b1_note')}</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <h5 className="font-bold text-lg mb-2">{t('guide.sections.visa.c1_title')}</h5>
                                <p className="text-base mb-2 opacity-80">{t('guide.sections.visa.c1_cost')}</p>
                                <p className="text-base mb-4 opacity-80">{t('guide.sections.visa.c1_duration')}</p>
                                <div className="space-y-2">
                                    <p className="text-base font-bold">{t('guide.sections.visa.c1_reqs')}</p>
                                    <ul className="text-base space-y-2 ml-4">
                                        <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.visa.c1_solvency')}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.visa.levy_title')}</h4>
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                            <p className="text-base leading-relaxed mb-4">{t('guide.sections.visa.levy_desc')}</p>
                            <ul className="text-base space-y-3 ml-4 mb-4">
                                <li className="flex gap-2"><span>•</span> <span><strong>{t('guide.sections.visa.levy_mgmt').split(':')[0]}:</strong>{t('guide.sections.visa.levy_mgmt').split(':')[1]}</span></li>
                                <li className="flex gap-2"><span>•</span> <span><strong>{t('guide.sections.visa.levy_qr').split(':')[0]}:</strong>{t('guide.sections.visa.levy_qr').split(':')[1]}</span></li>
                            </ul>
                            <p className="text-sm opacity-70 italic">{t('guide.sections.visa.levy_note')}</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
                        <h4 className="font-bold text-secondary mb-2">{t('guide.sections.visa.advice_title')}</h4>
                        <p className="text-base opacity-80">{t('guide.sections.visa.advice_text')}</p>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.levy.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-lg">{t('guide.sections.levy.intro')}</p>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.levy.exchange_title')}</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p className="text-base"><strong>{t('guide.sections.levy.exchange_rate')}</strong></p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p>{t('guide.sections.levy.exchange_bills')}</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p>{t('guide.sections.levy.exchange_where')}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-sm">{t('guide.sections.levy.cards_title')}</h4>
                        <div className="grid gap-4">
                            <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <p className="text-base leading-relaxed mb-3">
                                    <span className="font-bold">{t('guide.sections.levy.cards_recommended')}</span>
                                </p>
                                <p className="text-base leading-relaxed mb-3">
                                    <span className="font-bold">{t('guide.sections.levy.cards_safe')}</span>
                                </p>
                                <p className="text-base bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                    {t('guide.sections.levy.cards_tip')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-sm">{t('guide.sections.levy.budget_title')}</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-black/5 dark:border-white/5">
                                <p className="text-base font-bold opacity-60 uppercase flex items-center gap-2 mb-1">
                                    <div className="w-1 h-1 rounded-full bg-primary" /> {t('guide.sections.levy.budget_food').split(':')[0]}
                                </p>
                                <p className="font-bold">{t('guide.sections.levy.budget_food').split(':')[1]}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-black/5 dark:border-white/5">
                                <p className="text-base font-bold opacity-60 uppercase flex items-center gap-2 mb-1">
                                    <div className="w-1 h-1 rounded-full bg-primary" /> {t('guide.sections.levy.budget_beer').split(':')[0]}
                                </p>
                                <p className="font-bold">{t('guide.sections.levy.budget_beer').split(':')[1]}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-black/5 dark:border-white/5">
                                <p className="text-base font-bold opacity-60 uppercase flex items-center gap-2 mb-1">
                                    <div className="w-1 h-1 rounded-full bg-primary" /> {t('guide.sections.levy.budget_massage').split(':')[0]}
                                </p>
                                <p className="font-bold">{t('guide.sections.levy.budget_massage').split(':')[1]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
                        <h4 className="font-bold text-secondary mb-2">{t('guide.sections.levy.advice_title')}</h4>
                        <p className="text-base opacity-80">{t('guide.sections.levy.advice_text')}</p>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.health.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-lg">{t('guide.sections.health.intro')}</p>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.health.insurance_title')}</h4>
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <p className="text-base leading-relaxed">{t('guide.sections.health.insurance_desc')}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.health.belly_title')}</h4>
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <p className="text-sm leading-relaxed mb-4">{t('guide.sections.health.belly_intro')}</p>
                            <ul className="text-base space-y-3 ml-4">
                                <li className="flex gap-2"><span>•</span> <span><strong>{t('guide.sections.health.belly_probiotics').split(':')[0]}:</strong>{t('guide.sections.health.belly_probiotics').split(':')[1]}</span></li>
                                <li className="flex gap-2"><span>•</span> <span><strong>{t('guide.sections.health.belly_water').split(':')[0]}:</strong>{t('guide.sections.health.belly_water').split(':')[1]}</span></li>
                                <li className="flex gap-2"><span>•</span> <span><strong>{t('guide.sections.health.belly_ice').split(':')[0]}:</strong>{t('guide.sections.health.belly_ice').split(':')[1]}</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.health.repellent_title')}</h4>
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <p className="text-base leading-relaxed">{t('guide.sections.health.repellent_desc')}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.health.yellow_title')}</h4>
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <p className="text-sm leading-relaxed mb-4">{t('guide.sections.health.yellow_intro')}</p>
                            <ul className="text-base space-y-3 ml-4">
                                <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.health.yellow_when')}</span></li>
                                <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.health.yellow_countries')}</span></li>
                                <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.health.yellow_europe')}</span></li>
                            </ul>
                            <p className="text-sm opacity-70 italic mt-4">{t('guide.sections.health.yellow_note')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.stay.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-lg">{t('guide.sections.stay.intro')}</p>

                    <div className="grid gap-6">
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.ubud_title')}</h5>
                            <p className="text-base mb-3 opacity-80">{t('guide.sections.stay.ubud_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.ubud_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.uluwatu_title')}</h5>
                            <p className="text-base mb-3 opacity-80">{t('guide.sections.stay.uluwatu_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.uluwatu_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.canggu_title')}</h5>
                            <p className="text-base mb-3 opacity-80">{t('guide.sections.stay.canggu_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.canggu_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.sanur_title')}</h5>
                            <p className="text-base opacity-80 mb-3">{t('guide.sections.stay.sanur_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.sanur_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.nusadua_title')}</h5>
                            <p className="text-base opacity-80 mb-3">{t('guide.sections.stay.nusadua_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.nusadua_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.lovina_title')}</h5>
                            <p className="text-base opacity-80 mb-3">{t('guide.sections.stay.lovina_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.lovina_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.stay.amed_title')}</h5>
                            <p className="text-base opacity-80 mb-3">{t('guide.sections.stay.amed_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.stay.amed_tip')}
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
                        <h4 className="font-bold text-secondary mb-2">{t('guide.sections.stay.advice_title')}</h4>
                        <p className="text-base opacity-80">{t('guide.sections.stay.advice_text')}</p>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.apps.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic">{t('guide.sections.apps.intro')}</p>

                    <div className="grid gap-6">
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.apps.grab_title')}</h5>
                            <p className="text-base mb-3 opacity-80">{t('guide.sections.apps.grab_desc')}</p>
                            <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                {t('guide.sections.apps.grab_tip')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.apps.internet_title')}</h5>
                            <p className="text-base opacity-80">{t('guide.sections.apps.internet_desc')}</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-lg mb-2">{t('guide.sections.apps.maps_title')}</h5>
                            <p className="text-base opacity-80">{t('guide.sections.apps.maps_desc')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.safety.title'),
            content: (
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-base"><strong>{t('guide.sections.safety.water')}:</strong> {t('guide.sections.safety.water_desc')}</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-base"><strong>{t('guide.sections.safety.sockets')}:</strong> {t('guide.sections.safety.sockets_desc')}</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-base"><strong>{t('guide.sections.safety.transport')}:</strong> {t('guide.sections.safety.transport_desc')}</p>
                    </li>
                    <li className="flex gap-3 pt-4">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-xl italic text-gray-700 dark:text-gray-300 font-bold leading-relaxed">{t('guide.sections.safety.promise')}</p>
                    </li>
                </ul>
            )
        }
    ];

    return (
        <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
            <SEO
                title={`${t('guide.title')} ${t('guide.title_accent')} | Viaja a tu ritmo`}
                description={t('guide.subtitle')}
                keywords="guía bali 2026, consejos viajar bali, visado bali, clima bali, seguridad bali, moneda indonesia"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-primary/20">
                    <Info size={16} /> {t('guide.badge')}
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                    {t('guide.title')} <span className="text-primary italic">{t('guide.title_accent')}</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('guide.subtitle')}
                </p>
            </motion.div>

            <div className="grid gap-6">
                {sections.map((section, idx) => (
                    <GuideSection
                        key={idx}
                        title={section.title}
                        isOpen={openSections.includes(idx)}
                        onToggle={() => toggleSection(idx)}
                    >
                        {section.content}
                    </GuideSection>
                ))}
            </div>

            <div className="mt-20 text-center max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 italic leading-relaxed">
                    {t('about.closing')}
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 p-10 rounded-[3rem] bg-bg-dark text-white relative overflow-hidden group shadow-2xl"
            >
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6">{t('guide.help_title')}</h2>
                    <p className="text-white/70 text-lg mb-8 font-medium">
                        {t('guide.help_text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/tours"
                            className="inline-flex items-center justify-center gap-2 bg-white text-bg-dark font-black px-8 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                        >
                            {t('guide.see_tours_btn')}
                            <ArrowRight size={20} />
                        </Link>
                        <a
                            href="https://wa.me/376614535?text=Hola%20Cantik%20Tours!%20Tengo%20algunas%20dudas%20sobre%20mi%20viaje%20a%20Bali."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('Conversion', 'WhatsApp Click', 'Bali Guide Footer')}
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-black px-8 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                        >
                            {t('guide.help_btn')}
                        </a>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] -mr-32 -mb-32" />
            </motion.div>
        </div>
    );
};

export default BaliGuide;
