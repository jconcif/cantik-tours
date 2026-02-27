import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Users } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const columnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="bg-white dark:bg-bg-dark border-t border-black/5 dark:border-white/5 py-16 px-6 sm:px-12">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8"
            >
                <motion.div variants={columnVariants} className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-black tracking-tighter text-primary-dark">CANTIK</span>
                        <span className="text-2xl font-light tracking-widest uppercase dark:text-white">Tours</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {t('footer.description')}
                    </p>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                            <ShieldCheck size={16} className="text-secondary" /> {t('footer.trust_1')}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                            <Users size={16} className="text-secondary" /> {t('footer.trust_2')}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={columnVariants}>
                    <h3 className="font-bold text-lg mb-6">{t('footer.quick_links')}</h3>
                    <ul className="space-y-4 font-medium text-gray-600 dark:text-gray-400">
                        <li><Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
                        <li><Link to="/tours" className="hover:text-primary transition-colors">{t('nav.tours')}</Link></li>
                        <li><Link to="/guia-bali" className="hover:text-primary transition-colors">{t('nav.guide')}</Link></li>
                        <li><Link to="/reviews" className="hover:text-primary transition-colors">{t('common.reviews_title')}</Link></li>
                        <li><Link to="/politicas" className="hover:text-primary transition-colors">{t('footer.policies')}</Link></li>
                    </ul>
                </motion.div>

                <motion.div variants={columnVariants}>
                    <h3 className="font-bold text-lg mb-6">{t('footer.contact')}</h3>
                    <ul className="space-y-4 font-medium text-gray-600 dark:text-gray-400">
                        <li>WhatsApp: +376 614 535</li>
                        <li>Email: info@cantiktours.com</li>
                        <li>Bali, Indonesia</li>
                    </ul>
                </motion.div>
            </motion.div>

            <div className="max-w-7xl mx-auto border-t border-black/5 dark:border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <p>© {currentYear} Cantik Tours. {t('footer.rights')}</p>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0 font-bold uppercase tracking-widest text-[10px]">
                    <span>{t('footer.trust_1')}</span>
                    <span>{t('footer.trust_2')}</span>
                    <span>{t('footer.trust_3')}</span>
                </div>
                <p className="flex items-center gap-2">
                    {t('footer.made_with')} <Heart size={14} className="text-red-500 fill-red-500" /> {t('footer.in_bali')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
