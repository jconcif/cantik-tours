import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Award, ArrowRight, Star } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const guides = [
        {
            name: t('about.guide_2_name'),
            role: t('about.guide_2_role'),
            desc: t('about.guide_2_desc'),
            image: "/images/guides/guide_putu.webp"
        },
        {
            name: t('about.guide_3_name'),
            role: t('about.guide_3_role'),
            desc: t('about.guide_3_desc'),
            image: "/images/guides/guide_komang.webp"
        },
        {
            name: t('about.guide_4_name'),
            role: t('about.guide_4_role'),
            desc: t('about.guide_4_desc'),
            image: "/images/guides/guide_ketut.webp"
        }
    ];

    const whatsappLinkHelp = `https://wa.me/376614535?text=${encodeURIComponent(t('common.whatsapp_about'))}`;

    return (
        <div className="pt-24 min-h-screen bg-bg-light dark:bg-bg-dark font-sans">
            <SEO
                title={t('seo.about.title')}
                description={t('seo.about.description')}
            />

            {/* 1. Simple & Clean Header */}
            <section className="px-6 py-16 md:py-32 max-w-5xl mx-auto text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >

                    <h1 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.95]">
                        {t('about.our')} <span className="text-primary italic">{t('about.essence')}</span>
                    </h1>

                    {/* New Authority Subtitle */}
                    <p className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('about.authority_subtitle')}
                    </p>


                </motion.div>
            </section>

            {/* New Trust Section */}
            <section className="px-6 pb-20 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-black mb-4">{t('about.trust_local_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
                            {t('about.trust_local_desc')}
                        </p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Star size={32} />
                        </div>
                        <h3 className="text-xl font-black mb-4">{t('about.trust_direct_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
                            {t('about.trust_direct_desc')}
                        </p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Award size={32} />
                        </div>
                        <h3 className="text-xl font-black mb-4">{t('about.trust_boutique_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
                            {t('about.trust_boutique_desc')}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Story Grid - Normal sizes */}
            <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
                <div className="grid gap-20 md:gap-32">
                    {/* Perty */}
                    <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
                        <div className="flex-1 w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[2.5rem] overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="/images/team/perty-founder.webp"
                                    alt="Perty"
                                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl md:text-4xl font-black text-secondary mb-2">{t('about.perty_name')}</h3>
                            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">({t('about.perty_role')})</p>
                            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-l-4 border-secondary/20 pl-8 space-y-6">
                                <p>{t('about.perty_text_1')}</p>
                                <p>{t('about.perty_text_2')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Javi */}
                    <div className="flex flex-col lg:flex-row-reverse gap-10 md:gap-16 items-center">
                        <div className="flex-1 w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[2.5rem] overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="/images/team/javier-cofounder.webp"
                                    alt="Javi"
                                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        </div>
                        <div className="flex-1 lg:text-right">
                            <h3 className="text-3xl md:text-4xl font-black text-primary mb-2">Javi</h3>
                            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">({t('about.javi_role') || 'Logística & Enlace'})</p>
                            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-l-4 lg:border-l-0 lg:border-r-4 border-primary/20 pl-8 lg:pl-0 lg:pr-8">
                                {t('about.javi_text')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Philosophy - The Bridge (True Full Width Band) */}
            <section className="bg-primary/5 dark:bg-primary/[0.03] border-y border-primary/10 py-24 md:py-40 overflow-hidden">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Decorative Quotes - Subtly balanced */}
                        <div className="hidden md:block absolute top-0 left-0 text-7xl font-serif text-primary opacity-20 pointer-events-none -translate-x-16 lg:-translate-x-24">“</div>
                        <div className="hidden md:block absolute bottom-0 right-0 text-7xl font-serif text-primary opacity-20 pointer-events-none translate-x-16 lg:translate-x-24 translate-y-4">”</div>

                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-8 block relative z-10">
                            {t('about.tag')}
                        </span>
                        <p className="text-lg md:text-2xl text-gray-800 dark:text-white font-medium italic leading-relaxed relative z-10 max-w-4xl mx-auto">
                            {t('about.meaning_text')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 5. Final Conversion CTA - High Impact */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-bg-dark text-white rounded-[3.5rem] p-12 md:p-24 text-center overflow-hidden border border-white/5"
                    >
                        {/* Interactive Background Glows */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-6xl font-black mb-8 leading-[0.95] tracking-tighter">
                                {t('about.cta_emotional_title')}
                            </h2>

                            <p className="text-lg md:text-2xl text-white/60 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                                {t('about.cta_emotional_text')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link
                                    to="/tours"
                                    className="group relative w-full sm:w-auto px-12 py-6 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
                                >
                                    {t('hero.btn_tours')}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    to="/guia-bali"
                                    className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase tracking-widest text-xs transition-all text-white flex items-center justify-center gap-3"
                                >
                                    {t('nav.view_guide')}
                                </Link>
                            </div>

                            <p className="mt-10 text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                                Reservas 2026 Abiertas
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
