import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, ThermometerSnowflake, Car, UtensilsCrossed } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Feature = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:shadow-xl transition-all group"
    >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const FeaturesGrid = () => {
    const { t, i18n } = useTranslation();
    const isEs = i18n.language.startsWith('es');

    const features = [
        {
            icon: Wifi,
            title: t('features.wifi.title'),
            description: t('features.wifi.text')
        },
        {
            icon: ThermometerSnowflake,
            title: t('features.water.title'),
            description: t('features.water.text')
        },
        {
            icon: Car,
            title: t('features.car.title'),
            description: t('features.car.text')
        },
        {
            icon: UtensilsCrossed,
            title: t('features.food.title'),
            description: t('features.food.text')
        }
    ];

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-4">
                    {t('features.title')}{' '}
                    <span className="text-primary italic">{t('features.title_accent')}</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto font-medium">
                    {t('features.subtitle')}
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                    <Feature key={idx} {...feature} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default FeaturesGrid;
