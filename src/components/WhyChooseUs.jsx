import React from 'react';
import { GraduationCap, Wifi, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
    const { t } = useTranslation();

    const reasons = [
        {
            icon: GraduationCap,
            title: t('why.reason1.title'),
            text: t('why.reason1.text')
        },
        {
            icon: Wifi,
            title: t('why.reason2.title'),
            text: t('why.reason2.text')
        },
        {
            icon: HeartHandshake,
            title: t('why.reason4.title'),
            text: t('why.reason4.text')
        }
    ];

    return (
        <section id="why-us" className="py-24 bg-white dark:bg-bg-dark/50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black mb-4">{t('why.title')}</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">{t('why.subtitle')}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                            className="flex flex-col items-center text-center p-8 rounded-[2.5rem] hover:bg-bg-light dark:hover:bg-white/5 transition-all duration-300 group motion-safe"
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary-dark mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <reason.icon size={36} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">{reason.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{reason.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
