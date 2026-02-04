import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                src="/images/hero.png"
                alt="Bali Landscape"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-bg-light dark:to-bg-dark" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="relative z-10 px-6 text-center max-w-5xl mx-auto flex flex-col items-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-2 px-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-10 shadow-2xl">
                        {t('hero.badge')}
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] tracking-tight">
                        {t('hero.title_1')} <br />
                        <span className="text-primary italic">
                            {t('hero.title_2')}
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium drop-shadow-lg leading-relaxed"
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                    <button
                        onClick={() => scrollTo('tours')}
                        className="btn-primary group flex items-center gap-2 px-10 py-5 text-lg"
                    >
                        {t('hero.btn_tours')}
                        <Search size={20} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => scrollTo('nosotros')}
                        className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-black px-10 py-5 rounded-full text-lg hover:bg-white hover:text-bg-dark transition-all shadow-xl"
                    >
                        {t('hero.btn_story')}
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
