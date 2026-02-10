import React from 'react';
import { GraduationCap, Wifi, ShieldCheck } from 'lucide-react';
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
            icon: ShieldCheck,
            title: t('why.reason3.title'),
            text: t('why.reason3.text')
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

                <div className="grid md:grid-cols-3 gap-12">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="flex flex-col items-center text-center p-8 rounded-3xl hover:bg-bg-light dark:hover:bg-white/5 transition-colors group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary-dark mb-6 group-hover:scale-110 transition-transform">
                                <reason.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{reason.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
