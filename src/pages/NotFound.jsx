import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-20 min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-6">
            <SEO 
                title="Página no encontrada" 
                description="Lo sentimos, no hemos podido encontrar la ruta que buscas en Bali."
            />
            
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative mb-12"
                >
                    <div className="text-[12rem] md:text-[16rem] font-black leading-none text-primary/10 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Map size={80} className="text-primary animate-bounce" />
                    </div>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    {t('not_found.title', '¡Perdido en el paraíso?')}
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-md mx-auto">
                    {t('not_found.text', 'Parece que esta ruta no está en nuestro mapa. No te preocupes, siempre hay un camino de vuelta al hotel.')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-4 bg-primary text-white rounded-full font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                    >
                        <Home size={20} />
                        {t('not_found.back_home', 'Volver al Inicio')}
                    </Link>
                    
                    <Link
                        to="/tours"
                        className="px-8 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full font-black flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                    >
                        <Compass size={20} />
                        {t('not_found.see_tours', 'Ver todos los Tours')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
