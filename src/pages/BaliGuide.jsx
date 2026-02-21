import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, ArrowRight, Info, Sun, CloudRain, Calendar, Thermometer,
    Bike, Car, Smartphone, Utensils, Languages, MessageCircle
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
            className="w-full px-5 py-5 md:px-8 md:py-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
        >
            <div className="flex items-center gap-4 text-left">
                <span className="text-lg md:text-xl font-bold">{title}</span>
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
                    className="px-5 pb-5 md:px-8 md:pb-8"
                >
                    <div className="pt-4 border-t border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-300 leading-relaxed font-medium text-base md:text-lg">
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
            title: t('guide.sections.weather.title'),
            content: (
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                { m: 'dec', icon: <Calendar size={16} /> }
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest">{t(`guide.sections.weather.month_${item.m}`)}</span>
                                        <span className="text-primary">{item.icon}</span>
                                    </div>
                                    <p className="text-sm opacity-70 leading-snug">{t(`guide.sections.weather.month_desc_${item.m}`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.visa.title'),
            content: (
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

                    <div className="space-y-4">
                        <h4 className="font-black text-primary uppercase tracking-wider text-base">{t('guide.sections.visa.types_title')}</h4>
                        <div className="grid gap-6">
                            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <h5 className="font-bold text-base md:text-lg mb-2">{t('guide.sections.visa.b1_title')}</h5>
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
                                <h5 className="font-bold text-base md:text-lg mb-2">{t('guide.sections.visa.c1_title')}</h5>
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
                                <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.visa.levy_mgmt')}</span></li>
                                <li className="flex gap-2"><span>•</span> <span>{t('guide.sections.visa.levy_qr')}</span></li>
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
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.levy.intro')}</p>

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
                                    <div className="w-1 h-1 rounded-full bg-primary" /> {t('guide.sections.levy.budget_massage').split(':')[0] || 'Massage'}
                                </p>
                                <p className="font-bold">{t('guide.sections.levy.budget_massage').split(':')[1] || '6€ - 10€'}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-black/5 dark:border-white/5">
                                <p className="text-base font-bold opacity-60 uppercase flex items-center gap-2 mb-1">
                                    <div className="w-1 h-1 rounded-full bg-primary" /> {t('guide.sections.levy.budget_scooter').split(':')[0] || 'Scooter'}
                                </p>
                                <p className="font-bold">{t('guide.sections.levy.budget_scooter').split(':')[1] || 'From 80K'}</p>
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
            title: t('guide.sections.stay.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.stay.intro')}</p>
                    <div className="grid gap-6">
                        {[
                            { k: 'ubud', tip: true },
                            { k: 'uluwatu', tip: true },
                            { k: 'canggu', tip: true },
                            { k: 'sanur', tip: true },
                            { k: 'nusadua', tip: true },
                            { k: 'lovina', tip: true },
                            { k: 'amed', tip: true }
                        ].map((loc) => (
                            <div key={loc.k} className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <h5 className="font-bold text-base md:text-lg mb-2">{t(`guide.sections.stay.${loc.k}_title`)}</h5>
                                <p className="text-base mb-3 opacity-80">{t(`guide.sections.stay.${loc.k}_desc`)}</p>
                                {loc.tip && (
                                    <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                        {t(`guide.sections.stay.${loc.k}_tip`)}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
                        <h4 className="font-bold text-secondary mb-2">{t('guide.sections.stay.advice_title')}</h4>
                        <p className="text-base opacity-80">{t('guide.sections.stay.advice_text')}</p>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.transport.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.transport.intro')}</p>
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h4 className="font-bold text-base md:text-lg mb-4 flex items-center gap-2">
                                <Smartphone size={20} className="text-primary" />
                                {t('guide.sections.transport.apps_title')}
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold">{t('guide.sections.transport.grab_gojek_title')}</p>
                                    <p className="text-base opacity-80">{t('guide.sections.transport.grab_gojek_desc')}</p>
                                </div>
                                <p className="text-sm bg-primary/10 text-primary p-3 rounded-xl font-medium">
                                    {t('guide.sections.transport.grab_gojek_tip')}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h4 className="font-bold text-base md:text-lg mb-4 flex items-center gap-2">
                                <Bike size={24} className="text-primary" />
                                {t('guide.sections.transport.rental_title')}
                            </h4>
                            <p className="text-base mb-4 opacity-80">{t('guide.sections.transport.rental_desc')}</p>
                            <div className="space-y-4 mb-6">
                                <h5 className="font-black text-xs uppercase tracking-widest text-primary">{t('guide.sections.transport.rental_requirements_title')}</h5>
                                <ul className="space-y-3">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-sm"><strong>IDP:</strong> {t('guide.sections.transport.rental_req_license')}</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-sm"><strong>{t('guide.sections.transport.rental_req_helmet').split(':')[0]}:</strong> {t('guide.sections.transport.rental_req_helmet').split(':')[1]}</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-sm"><strong>{t('guide.sections.transport.rental_req_insurance').split(':')[0]}:</strong> {t('guide.sections.transport.rental_req_insurance').split(':')[1]}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                                <p className="text-sm font-bold">{t('guide.sections.transport.rental_price')}</p>
                                <p className="text-sm italic opacity-60">{t('guide.sections.transport.rental_tip')}</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-bg-dark text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2">
                                    <Car size={24} className="text-primary" />
                                    {t('guide.sections.transport.driver_title')}
                                </h4>
                                <p className="text-sm opacity-80 mb-4">{t('guide.sections.transport.driver_desc')}</p>
                                <p className="text-primary font-bold italic">{t('guide.sections.transport.driver_highlight')}</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.food.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.food.intro')}</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { k: 'nasi_goreng', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80' },
                            { k: 'mie_goreng', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80' },
                            { k: 'satay', img: 'https://images.unsplash.com/photo-1511130547944-54778b274f8a?auto=format&fit=crop&w=800&q=80' },
                            { k: 'gado_gado', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' }
                        ].map((dish, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <img src={dish.img} alt={t(`guide.sections.food.${dish.k}_title`)} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                                <div>
                                    <h5 className="font-bold text-base mb-1">{t(`guide.sections.food.${dish.k}_title`)}</h5>
                                    <p className="text-xs opacity-70 leading-relaxed">{t(`guide.sections.food.${dish.k}_desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <Utensils size={24} />
                            <h4 className="font-black uppercase tracking-wider text-base">{t('guide.sections.food.drinks_title')}</h4>
                        </div>
                        <p className="text-base leading-relaxed">{t('guide.sections.food.drinks_desc')}</p>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.apps.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.apps.intro')}</p>
                    <div className="grid gap-6">
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-base md:text-lg mb-2">{t('guide.sections.apps.internet_title')}</h5>
                            <p className="text-base opacity-80">{t('guide.sections.apps.internet_desc')}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                            <h5 className="font-bold text-base md:text-lg mb-2">{t('guide.sections.apps.maps_title')}</h5>
                            <p className="text-base opacity-80">{t('guide.sections.apps.maps_desc')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.phrases.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.phrases.intro')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { id: 'halo', icon: <MessageCircle size={14} /> },
                            { id: 'terima_kasih', icon: <Languages size={14} /> },
                            { id: 'sama_sama', icon: <Languages size={14} /> },
                            { id: 'tolong', icon: <MessageCircle size={14} /> },
                            { id: 'selamat_pagi', icon: <Sun size={14} /> },
                            { id: 'selamat_siang', icon: <Sun size={14} /> },
                            { id: 'berapa', icon: <Languages size={14} /> },
                            { id: 'mahal', icon: <Languages size={14} /> },
                            { id: 'saya_mau', icon: <MessageCircle size={14} /> },
                            { id: 'tidak_pedas', icon: <Utensils size={14} className="text-red-500" /> }
                        ].map((p, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60">{t(`guide.sections.phrases.${p.id}`)}</span>
                                    <p className="font-bold text-base md:text-lg">{p.id.replace(/_/g, ' ').charAt(0).toUpperCase() + p.id.replace(/_/g, ' ').slice(1)}</p>
                                </div>
                                <div className="text-primary/40">{p.icon}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: t('guide.sections.health.title'),
            content: (
                <div className="space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 italic text-base md:text-lg">{t('guide.sections.health.intro')}</p>
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
                        <p className="text-base">{t('guide.sections.safety.safety_tip')}</p>
                    </li>
                </ul>
            )
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 max-w-5xl mx-auto">
            <SEO
                title={`${t('guide.title')} ${t('guide.title_accent')} | Viaja a tu ritmo`}
                description={t('guide.subtitle')}
                keywords="guía bali 2026, consejos viajar bali, visado bali, clima bali, seguridad bali, moneda indonesia"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 md:mb-20"
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-primary/20">
                    <Info size={16} /> {t('guide.badge')}
                </span>
                <h1 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-none">
                    {t('guide.title')} <span className="text-primary italic">{t('guide.title_accent')}</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('guide.subtitle')}
                </p>
            </motion.div>

            <div className="grid gap-6">
                {sections.map((section, idx) => (
                    <GuideSection
                        key={idx}
                        id={idx}
                        title={section.title}
                        isOpen={openSections.includes(idx)}
                        onToggle={() => toggleSection(idx)}
                    >
                        {section.content}
                    </GuideSection>
                ))}
            </div>



            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-24 p-12 md:p-16 rounded-[3.5rem] bg-bg-dark text-white relative overflow-hidden group shadow-2xl text-center"
            >
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        {t('guide.help_title')}
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
                        {t('guide.help_text')}
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/tours"
                            className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-white text-white hover:text-bg-dark font-black px-10 py-5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 text-lg group"
                        >
                            {t('guide.see_tours_btn')}
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                {/* Dynamic Background Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 blur-[120px] -mr-40 -mt-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 blur-[120px] -ml-40 -mb-40 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(19,200,236,0.05)_0%,transparent_70%)]" />
            </motion.div>
        </div>
    );
};

export default BaliGuide;
