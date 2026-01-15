import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Award, ArrowRight, Users, MapPin } from 'lucide-react';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fake Guides Data using i18n keys
    const guides = [
        {
            name: t('about.guide_1_name'),
            role: t('about.guide_1_role'),
            desc: t('about.guide_1_desc'),
            image: "/images/guide_wayan.png"
        },
        {
            name: t('about.guide_2_name'),
            role: t('about.guide_2_role'),
            desc: t('about.guide_2_desc'),
            image: "/images/guide_made.png"
        },
        {
            name: t('about.guide_3_name'),
            role: t('about.guide_3_role'),
            desc: t('about.guide_3_desc'),
            image: "/images/guide_komang.png"
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-bg-light dark:bg-bg-dark overflow-hidden">
            {/* Header Section */}
            <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />

                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                >
                    {t('about.tag')}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-black mb-12 tracking-tighter"
                >
                    {t('about.title')}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative inline-block max-w-4xl mx-auto"
                >
                    <div className="bg-white/50 dark:bg-white/5 p-10 md:p-16 rounded-[3rem] border border-black/5 dark:border-white/10 backdrop-blur-md relative z-10 shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-black mb-6 text-primary">{t('about.meaning_title')}</h3>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic">
                            "{t('about.meaning_text')}"
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Founders Section */}
            <section className="px-6 py-24 max-w-7xl mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-24">
                    <h3 className="text-2xl md:text-4xl font-bold mb-6">{t('about.team_intro_title')}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                        {t('about.team_intro_text')}
                    </p>
                </div>

                <div className="grid gap-32">
                    {/* Perty */}
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 relative group"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="/images/perty_portrait.png"
                                    alt="Perty portrait"
                                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-white font-bold text-xs uppercase tracking-widest mb-3">
                                        <Award size={14} /> Master en Educación
                                    </span>
                                    <p className="text-white font-black text-3xl">Perty</p>
                                    <p className="text-white/70 font-medium">Alma Local & Guía</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-secondary mb-2">
                                {t('about.perty_title').split('(')[0]}
                            </h3>
                            <span className="block text-2xl md:text-3xl text-gray-400 font-bold mb-8">
                                ({t('about.perty_title').split('(')[1]}
                            </span>
                            <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                <p>{t('about.perty_text')}</p>
                                <div className="pt-4">
                                    <a
                                        href="https://wa.me/376614535"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline inline-flex items-center gap-2"
                                    >
                                        {t('guide.help_btn')} <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Javi */}
                    <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 relative group"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="/images/team_spirit_bali.png"
                                    alt="Javi portrait"
                                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 text-right">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-widest mb-3">
                                        <ShieldCheck size={14} /> Garantía & Logística
                                    </span>
                                    <p className="text-white font-black text-3xl">Javi</p>
                                    <p className="text-white/70 font-medium">Visión Global</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-primary mb-2">
                                {t('about.javi_title').split('(')[0]}
                            </h3>
                            <span className="block text-2xl md:text-3xl text-gray-400 font-bold mb-8">
                                ({t('about.javi_title').split('(')[1]}
                            </span>
                            <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                <p>{t('about.javi_text')}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Extended Team Section */}
            <section className="py-24 bg-white dark:bg-white/5 border-y border-black/5 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('about.meet_team_title')}</h3>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            {t('about.meet_team_subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Render Fake Guides */}
                        {guides.map((guide, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-3xl aspect-[4/5]">
                                <img
                                    src={guide.image}
                                    alt={guide.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                    <h4 className="text-white text-2xl font-black mb-1">{guide.name}</h4>
                                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">{guide.role}</p>
                                    <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-100 transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        {guide.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Join Team Card */}
                        <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center group hover:bg-white dark:hover:bg-white/10 transition-colors aspect-[4/5]">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Users size={28} />
                            </div>
                            <h4 className="text-xl font-bold mb-2">{t('about.join_team_title')}</h4>
                            <p className="text-gray-500 text-sm">{t('about.join_team_text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promise Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-[3rem] -rotate-1 transform scale-105" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 p-12 md:p-24 rounded-[3rem] shadow-xl text-center"
                    >
                        <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8">
                            {t('about.tag')}
                        </p>
                        <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">
                            {t('about.promise_title')}
                        </h3>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-4xl mx-auto mb-16">
                            {t('about.promise_text')}
                        </p>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-16 rounded-full" />
                        <p className="text-3xl md:text-4xl font-serif italic text-gray-800 dark:text-white leading-relaxed mb-16">
                            "{t('about.closing')}"
                        </p>

                        <Link to="/tours" className="btn-primary inline-flex items-center gap-3 text-lg">
                            {t('hero.btn_tours')} <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
