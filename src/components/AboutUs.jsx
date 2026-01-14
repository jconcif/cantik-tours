import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section id="nosotros" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 relative"
                >
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                        <img
                            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000"
                            alt="Perty, tu guía local"
                            className="w-full aspect-square object-cover"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{t('about.tag')}</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                        {t('about.title')}
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-medium">
                        <p>
                            {t('about.p1')}
                        </p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-2xl italic"
                        >
                            "{t('about.quote')}"
                        </motion.p>
                        <p>
                            {t('about.p2')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
