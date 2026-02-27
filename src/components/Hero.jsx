import React from 'react';
import { Search } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image - With Parallax */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-full">
                <picture className="w-full h-full">
                    <source srcSet="/images/hero-mobile.webp" type="image/webp" media="(max-width: 768px)" />
                    <source srcSet="/images/hero.webp" type="image/webp" />
                    <img
                        src="/images/hero.webp"
                        alt="Bali Tours - Templos sagrados, arrozales y cascadas en Ubud - Cantik Tours"
                        width="1920"
                        height="1080"
                        fetchpriority="high"
                        className="absolute inset-0 w-full h-full object-cover animate-gentle-zoom"
                    />
                </picture>
            </motion.div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-bg-light dark:to-bg-dark" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="relative z-10 px-6 text-center max-w-5xl mx-auto flex flex-col items-center pt-24 md:pt-32">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium drop-shadow-lg leading-relaxed"
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -4, shadow: "0 25px 50px -12px rgba(19,200,236,0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => scrollTo('tours')}
                        className="btn-primary group flex items-center justify-center gap-2 px-10 py-5 text-lg shadow-[0_20px_40px_-15px_rgba(19,200,236,0.4)] relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t('hero.btn_tours')}
                            <Search size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                        </span>
                        {/* Magnetic Glow Effect */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => scrollTo('nosotros')}
                        className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-black px-10 py-5 rounded-full text-lg transition-all shadow-xl"
                    >
                        {t('hero.btn_story')}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
