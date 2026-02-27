import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section id="nosotros" className="py-20 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="text-center mb-12 md:hidden">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">
                    {t('about.tag')}
                </span>
                <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                    {t('about.our')} <span className="text-primary italic">{t('about.essence')}</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-[40%_60%] gap-10 lg:gap-20 items-center">
                {/* Left Column: Visual */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="bg-white dark:bg-white/5 p-4 sm:p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] border border-black/5 dark:border-white/10 shadow-2xl relative z-10 max-w-[480px] mx-auto">
                        <img
                            src="/images/team/perty-founder.webp"
                            alt={`${t('about.perty_name')} - ${t('about.perty_role')} - Cantik Tours Bali`}
                            width="600"
                            height="750"
                            loading="lazy"
                            className="w-full aspect-[3/4] object-cover rounded-[1.8rem] md:rounded-[2.5rem] shadow-lg mb-6"
                        />
                        <div className="flex items-center px-2">
                            <div>
                                <h3 className="font-black text-xl md:text-2xl text-primary-dark leading-tight">{t('about.perty_name')}</h3>
                                <p className="text-sm md:text-base font-medium opacity-60 uppercase tracking-wider">{t('about.perty_role')}</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-[100px] -z-10" />
                </motion.div>

                {/* Right Column: Text & CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    <motion.span
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 hidden md:block"
                    >
                        {t('about.tag')}
                    </motion.span>
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        className="text-4xl lg:text-7xl font-black mb-8 tracking-tighter text-gray-900 dark:text-white leading-none hidden md:block"
                    >
                        {t('about.title')}
                    </motion.h2>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        className="prose dark:prose-invert mb-12"
                    >
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic mb-8 border-l-4 border-primary/30 pl-6">
                            «{t('about.meaning_text')}»
                        </p>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                            {t('about.team_intro_text')}
                        </p>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}>
                        <Link
                            to="/nosotros"
                            className="btn-primary inline-flex items-center gap-3 text-lg group"
                        >
                            {t('hero.btn_story')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
