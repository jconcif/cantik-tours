import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section id="nosotros" className="py-20 md:py-32 px-6 max-w-4xl mx-auto overflow-hidden text-center">
            {/* Mobile Header */}
            <div className="mb-10 md:hidden">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block"
                >
                    {t('about.tag')}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white leading-none"
                >
                    {t('about.our')} <span className="text-primary italic">{t('about.essence')}</span>
                </motion.h2>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="flex flex-col items-center"
            >
                {/* Desktop Header */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    className="hidden md:block mb-12"
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                        {t('about.tag')}
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                        {t('about.title')}
                    </h2>
                </motion.div>

                <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    className="mb-12 w-full"
                >
                    <div className="relative mb-8 group max-w-3xl mx-auto">
                        {/* Decorative Quote Mark */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-7xl md:text-8xl font-serif text-primary/10 select-none pointer-events-none group-hover:text-primary/20 transition-colors">
                            “
                        </div>
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-white font-medium italic leading-relaxed relative z-10 pt-4">
                            {t('about.meaning_text')}
                        </p>
                    </div>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto mt-6">
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
        </section>
    );
};

export default AboutUs;
