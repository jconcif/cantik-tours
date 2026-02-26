import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ShieldCheck,
    Clock,
    AlertCircle,
    CreditCard,
    Map,
    Mountain,
    Camera,
    Scale,
    CheckCircle2
} from 'lucide-react';
import SEO from '../components/SEO';

const Policies = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <CreditCard className="text-primary" size={24} />,
            title: t('policies_page.sections.s1.title'),
            items: t('policies_page.sections.s1.items', { returnObjects: true })
        },
        {
            icon: <Clock className="text-secondary" size={24} />,
            title: t('policies_page.sections.s2.title'),
            items: t('policies_page.sections.s2.items', { returnObjects: true })
        },
        {
            icon: <Map className="text-blue-500" size={24} />,
            title: t('policies_page.sections.s3.title'),
            items: t('policies_page.sections.s3.items', { returnObjects: true })
        },
        {
            icon: <Mountain className="text-green-600" size={24} />,
            title: t('policies_page.sections.s4.title'),
            content: t('policies_page.sections.s4.content'),
            items: t('policies_page.sections.s4.items', { returnObjects: true })
        },
        {
            icon: <ShieldCheck className="text-red-500" size={24} />,
            title: t('policies_page.sections.s5.title'),
            items: t('policies_page.sections.s5.items', { returnObjects: true })
        },
        {
            icon: <AlertCircle className="text-orange-500" size={24} />,
            title: t('policies_page.sections.s6.title'),
            items: t('policies_page.sections.s6.items', { returnObjects: true })
        },
        {
            icon: <Camera className="text-purple-500" size={24} />,
            title: t('policies_page.sections.s7.title'),
            items: t('policies_page.sections.s7.items', { returnObjects: true })
        },
        {
            icon: <Scale className="text-gray-600" size={24} />,
            title: t('policies_page.sections.s8.title'),
            items: t('policies_page.sections.s8.items', { returnObjects: true })
        }
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-bg-light dark:bg-bg-dark font-sans">
            <SEO
                title={t('policies_page.seo_title')}
                description={t('policies_page.seo_desc')}
            />

            <section className="px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                        {t('policies_page.badge')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
                        {t('policies_page.title')} <span className="text-primary italic">{t('policies_page.title_accent')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                        {t('policies_page.intro')}
                    </p>
                </motion.div>

                <div className="grid gap-12">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                                    {section.icon}
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-black mb-6 tracking-tight text-secondary dark:text-white">{section.title}</h2>

                                    {section.content && (
                                        <p className="mb-6 text-gray-600 dark:text-gray-400 font-bold italic">
                                            {section.content}
                                        </p>
                                    )}

                                    <div className="grid gap-6">
                                        {Array.isArray(section.items) && section.items.map((item, i) => (
                                            <div key={i} className="relative pl-6 border-l-2 border-primary/20">
                                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                </div>
                                                <h3 className="font-black text-gray-900 dark:text-gray-100 mb-1">
                                                    {item.label}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm md:text-base">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-10 md:p-16 rounded-[3rem] bg-bg-dark text-white text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                        <CheckCircle2 size={48} className="text-primary mx-auto mb-6" />
                        <h2 className="text-3xl font-black mb-6">{t('policies_page.commitment_title')}</h2>
                        <p className="text-lg text-white/70 font-medium italic max-w-2xl mx-auto leading-relaxed">
                            {t('policies_page.commitment_text')}
                        </p>
                        <p className="mt-8 text-xs font-black text-primary uppercase tracking-[0.4em]">
                            {t('policies_page.thanks')}
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Policies;
