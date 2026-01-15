import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Globe, Award, Camera, Heart, ArrowRight } from 'lucide-react';

const AboutUs = () => {
    const { t } = useTranslation();

    const values = [
        {
            title: t('about.why_1_title'),
            text: t('about.why_1_text'),
            icon: ShieldCheck
        },
        {
            title: t('about.why_2_title'),
            text: t('about.why_2_text'),
            icon: Zap
        },
        {
            title: t('about.why_3_title'),
            text: t('about.why_3_text'),
            icon: Globe
        }
    ];

    return (
        <section id="nosotros" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Unique Selling Proposition Header */}
            <div className="max-w-4xl mx-auto text-center mb-24">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                >
                    {t('about.tag')}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-7xl font-black mb-12 tracking-tighter"
                >
                    {t('about.title')}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative inline-block"
                >
                    <div className="bg-primary/5 dark:bg-primary/10 p-10 md:p-16 rounded-[3rem] border border-primary/10 backdrop-blur-sm relative z-10">
                        <Heart className="text-primary/20 absolute -top-6 -left-6 w-24 h-24 rotate-[-15deg] pointer-events-none" />
                        <h3 className="text-2xl md:text-3xl font-black mb-6 text-primary">{t('about.meaning_title')}</h3>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic">
                            "{t('about.meaning_text')}"
                        </p>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                </motion.div>
            </div>

            {/* The Duo Section */}
            <div className="grid gap-24">
                {/* Perty: The Educator */}
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
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-widest mb-3">
                                    <Award size={14} /> Master en Educación
                                </span>
                                <p className="text-white font-black text-3xl">Perty</p>
                                <p className="text-white/70 font-medium">Fundadora & Guía Principal</p>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black tracking-tight">{t('about.perty_title')}</h3>
                        </div>
                        <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3">
                                {t('about.perty_text')}
                            </p>
                            <div className="pt-4">
                                <a
                                    href="https://wa.me/376614535"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform border-b-2 border-primary pb-1"
                                >
                                    {t('guide.help_btn')} <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* The Partner: The Vision */}
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
                                alt="Logistics and photography"
                                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 text-right">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-widest mb-3">
                                    <Camera size={14} /> Fotografía & Estrategia
                                </span>
                                <p className="text-white font-black text-3xl">Visión Occidental</p>
                                <p className="text-white/70 font-medium">Logística & Estándares de Confianza</p>
                            </div>
                        </div>
                        <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black tracking-tight">{t('about.team_title')}</h3>
                        </div>
                        <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                            <p>{t('about.team_text')}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Why Us Redesign */}
            <div className="mt-32 pt-24 border-t border-black/5 dark:border-white/5">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-black mb-16 text-center tracking-tight"
                >
                    {t('about.why_title')}
                </motion.h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-white/5 p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-black/5 dark:border-white/5 hover:-translate-y-3 transition-all duration-500 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                <v.icon size={32} />
                            </div>
                            <h4 className="text-2xl font-black mb-4 tracking-tight">{v.title}</h4>
                            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-lg">{v.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
