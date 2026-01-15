import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WhatsAppButton = () => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-32 right-6 md:bottom-10 md:right-10 z-50"
        >
            <a
                href="https://wa.me/376614535?text=Hola%20Cantik%20Tours!%20Me%20interesa%20reservar%20un%20tour%20en%20Bali."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group relative"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    className="w-8 h-8 invert"
                    alt="WhatsApp"
                />

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-white dark:bg-gray-800 text-bg-dark dark:text-bg-light px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-black/5 dark:border-white/5">
                    {t('common.whatsapp_tooltip')}
                </span>
            </a>
        </motion.div>
    );
};

export default WhatsAppButton;
