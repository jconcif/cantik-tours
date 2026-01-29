import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Award, ArrowRight, Star } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const guides = [
        {
            name: t('about.guide_1_name'),
            role: t('about.guide_1_role'),
            desc: t('about.guide_1_desc'),
            image: "/images/guides/guide_wayan.png"
        },
        {
            name: t('about.guide_2_name'),
            role: t('about.guide_2_role'),
            desc: t('about.guide_2_desc'),
            image: "/images/guides/guide_putu.png"
        },
        {
            name: t('about.guide_3_name'),
            role: t('about.guide_3_role'),
            desc: t('about.guide_3_desc'),
            image: "/images/guides/guide_komang.png"
        },
        {
            name: t('about.guide_4_name'),
            role: t('about.guide_4_role'),
            desc: t('about.guide_4_desc'),
            image: "/images/guides/guide_ketut.png"
        }
    ];

    const whatsappLinkHelp = "https://wa.me/376614535?text=Hola%20Cantik%20Tours!%20He%20visto%20vuestra%20historia%20y%20me%20gustar%C3%ADa%20haceros%20una%20consulta%20sobre%20mi%20viaje.";

    return (
        <div className="pt-24 min-h-screen bg-bg-light dark:bg-bg-dark font-sans">
            <SEO
                title="Nosotros | Cantik Tours Bali"
                description="Conoce la historia detrás de Cantik Tours."
            />

            {/* 1. Simple & Clean Header */}
            <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                        {t('about.tag')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter">
                        Nuestra <span className="text-primary italic">Esencia.</span>
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                            "{t('about.meaning_text')}"
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* 2. Story Grid - Normal sizes */}
            <section className="px-6 py-24 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
                <div className="grid gap-24">
                    {/* Perty */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="rounded-[2rem] overflow-hidden shadow-xl"
                            >
                                <img
                                    src="/images/team/perty_portrait.jpg"
                                    alt="Pertiyani"
                                    className="w-full aspect-[4/5] object-cover"
                                />
                            </motion.div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl font-black text-secondary mb-2">{t('about.perty_name')}</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">({t('about.perty_role')})</p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-l-4 border-secondary/20 pl-6">
                                {t('about.perty_text')}
                            </p>
                        </div>
                    </div>

                    {/* Javi */}
                    <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                        <div className="flex-1 w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="rounded-[2rem] overflow-hidden shadow-xl"
                            >
                                <img
                                    src="/images/team/team_spirit_bali.png"
                                    alt="Javi"
                                    className="w-full aspect-[4/5] object-cover"
                                />
                            </motion.div>
                        </div>
                        <div className="flex-1 lg:text-right">
                            <h3 className="text-3xl font-black text-primary mb-2">Javi</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">(Logística & Enlace)</p>
                            <div className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed lg:border-r-4 border-primary/20 lg:pr-6">
                                {t('about.javi_text')}
                                <div className="pt-8 flex lg:justify-end">
                                    <a
                                        href={whatsappLinkHelp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center gap-2"
                                    >
                                        {t('guide.help_btn')} <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Commitment - Discreet */}
            <section className="py-24 bg-white dark:bg-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <ShieldCheck className="mx-auto text-primary opacity-20" size={40} />
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed px-4">
                            {t('about.promise_text')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 4. Team - Compact cards */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{t('about.meet_team_title')}</h3>
                    <p className="text-gray-500 font-medium">{t('about.meet_team_subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-md border border-black/5 dark:border-white/5"
                        >
                            <img src={guide.image} alt={guide.name} className="w-full aspect-[4/3] object-cover" />
                            <div className="p-6">
                                <h4 className="text-xl font-black mb-1">{guide.name}</h4>
                                <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">{guide.role}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{guide.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. Closing & Additional CTAs */}
            <section className="py-32 px-6 text-center border-t border-black/5 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.02]">
                <div className="max-w-4xl mx-auto space-y-16">
                    <p className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed italic">
                        {t('about.closing')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Option 1: Guide */}
                        <Link
                            to="/guia-bali-2026"
                            className="group p-8 rounded-[2.5rem] bg-white dark:bg-gray-800 border border-black/5 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Star size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Prepara tu viaje</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-medium">
                                Descubre consejos locales, visados y todo para tu aventura en nuestra Guía 2026.
                            </p>
                            <span className="btn-primary w-full py-4 text-sm tracking-widest uppercase">
                                Ver Guía 2026
                            </span>
                        </Link>

                        {/* Option 2: Contact */}
                        <a
                            href={whatsappLinkHelp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-8 rounded-[2.5rem] bg-white dark:bg-gray-800 border border-black/5 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Habla con nosotros</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-medium">
                                ¿Prefieres que te ayudemos directamente? Escríbenos por WhatsApp sin compromiso.
                            </p>
                            <span className="btn-secondary w-full py-4 text-sm tracking-widest uppercase">
                                {t('guide.help_btn')}
                            </span>
                        </a>
                    </div>

                    <div className="pt-8">
                        <Link to="/tours" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest hover:gap-4 transition-all">
                            {t('hero.btn_tours')} <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
