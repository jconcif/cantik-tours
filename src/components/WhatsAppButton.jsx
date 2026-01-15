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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461 1.993 0 3.866.778 5.275 2.188a7.419 7.419 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.709.88-.131.149-.261.169-.486.056-.224-.113-.953-.351-1.815-1.12-.669-.598-1.12-1.335-1.251-1.56-.131-.224-.014-.345.098-.458.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.429-.006-.149 0-.392.056-.598.28-.205.224-.784.766-.784 1.869 0 1.102.803 2.167.915 2.317.112.15 1.581 2.415 3.832 3.387.536.231.954.369 1.279.473.536.171 1.024.147 1.409.089.429-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.15-.43-.262" />
                </svg>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-white dark:bg-gray-800 text-bg-dark dark:text-bg-light px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-black/5 dark:border-white/5">
                    {t('common.whatsapp_tooltip')}
                </span>
            </a>
        </motion.div>
    );
};

export default WhatsAppButton;
