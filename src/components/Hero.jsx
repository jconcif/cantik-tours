import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with slight scale animation */}
            <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/images/hero.png"
                alt="Bali Sunrise Temple"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg-light dark:to-bg-dark" />

            <div className="relative z-10 px-6 text-center max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl"
                >
                    Bali no se visita, <span className="text-primary italic">se vive.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md"
                >
                    Asistencia 100% en español con el alma de un local.
                </motion.p>
            </div>
        </div>
    );
};

export default Hero;
