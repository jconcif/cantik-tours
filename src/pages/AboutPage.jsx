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
                    <p className="text-lg md:text-xl font-medium text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('about.authority_subtitle')}
                    </p>


                </motion.div>
            </section>

            {/* New Trust Section */}
            <section className="px-6 pb-20 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-black mb-3">{t('about.trust_local_title')}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed text-sm">
                            {t('about.trust_local_desc')}
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Star size={32} />
                        </div>
                        <h3 className="text-xl font-black mb-3">{t('about.trust_direct_title')}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed text-sm">
                            {t('about.trust_direct_desc')}
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Award size={32} />
                        </div>
                        <h3 className="text-xl font-black mb-3">{t('about.trust_boutique_title')}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed text-sm">
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
                            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-l-4 border-secondary/20 pl-8">
                                <p className="mb-4">{t('about.perty_text_1')}</p>
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

                {/* Philosophy Text Moved Here */}
                <div className="mt-20 md:mt-32 max-w-4xl mx-auto text-center px-6">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                        {t('about.tag')}
                    </span>
                    <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic border-y border-primary/20 py-10 md:py-16">
                        "{t('about.meaning_text')}"
                    </p>
                </div>

                {/* New Mid-Page Emotional CTA */}
                <div className="mt-24 md:mt-32 max-w-3xl mx-auto text-center bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10">
                    <h3 className="text-2xl md:text-4xl font-black mb-6 leading-tight">
                        {t('about.cta_emotional_title')}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-10">
                        {t('about.cta_emotional_text')}
                    </p>
                    <a
                        href={whatsappLinkHelp}
                        target="_blank"
                        className="inline-flex items-center gap-3 bg-white dark:bg-white/10 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-black/5 hover:scale-105 transition-all text-primary"
                    >
                        {t('about.cta_emotional_btn')} <ArrowRight size={18} />
                    </a>
                </div>
            </section>

            {/* 4. Team - Simplified with reinforced text */}
            <section className="py-32 px-6 max-w-4xl mx-auto text-center border-t border-black/5 dark:border-white/5">
                <ShieldCheck className="mx-auto text-primary opacity-30 mb-8" size={48} />
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">{t('about.meet_team_title')}</h3>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed px-4">
                    {t('about.team_reinforced_text')}
                </p>
                {/* Guides profiles temporarily hidden until defined */}
                {/* <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-6 px-6">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex-shrink-0 w-64 md:w-auto bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 group snap-center"
                        >
                            <div className="relative overflow-hidden aspect-[4/5]">
                                <img
                                    src={guide.image}
                                    alt={guide.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                            </div>
                            <div className="p-4 md:p-5">
                                <h4 className="text-base md:text-lg font-black mb-0.5">{guide.name}</h4>
                                <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-2">{guide.role}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-[11px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                                    {guide.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div> */}
            </section>

            {/* 5. Closing & Simplified CTAs */}
            <section className="py-24 px-6 md:py-32 border-t border-black/5 dark:border-white/5">
                <div className="max-w-4xl mx-auto text-center">


                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link
                            to="/guia-bali"
                            className="w-full md:w-auto px-10 py-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 font-black uppercase tracking-widest text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
                        >
                            {t('nav.view_guide')}
                        </Link>

                        <Link
                            to="/tours"
                            className="w-full md:w-auto px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20"
                        >
                            {t('hero.btn_tours')}
                        </Link>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default AboutPage;
