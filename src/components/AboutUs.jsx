import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section id="nosotros" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Text & CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                        {t('about.tag')}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-gray-900 dark:text-white">
                        {t('about.title')}
                    </h2>

                    <div className="prose dark:prose-invert mb-10">
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic mb-6">
                            "{t('about.meaning_text')}"
                        </p>
                        <p className="text-lg text-gray-500 font-medium">
                            {t('about.team_intro_text')}
                        </p>
                    </div>

                    <Link
                        to="/nosotros"
                        className="btn-primary inline-flex items-center gap-3 text-lg group"
                    >
                        {t('hero.btn_story')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Right Column: Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className="bg-white dark:bg-white/5 p-8 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl relative z-10">
                        <img
                            src="/images/team/perty_portrait.png"
                            alt="Cantik Tours Team"
                            className="w-full h-auto rounded-[2rem] shadow-lg mb-6"
                        />
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-black text-xl text-primary">{t('about.perty_name')}</h4>
                                <p className="text-sm font-medium opacity-60">{t('about.perty_role')}</p>
                            </div>
                            <div className="px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-xs uppercase tracking-widest">
                                Local Experts
                            </div>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-[100px] -z-10" />
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
