import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-bg-dark border-t border-black/5 dark:border-white/5 py-16 px-6 sm:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-black tracking-tighter text-primary">CANTIK</span>
                        <span className="text-2xl font-light tracking-widest uppercase dark:text-white">Tours</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {t('footer.description')}
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">{t('footer.quick_links')}</h4>
                    <ul className="space-y-4 font-medium text-gray-500 dark:text-gray-400">
                        <li><Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
                        <li><Link to="/tours" className="hover:text-primary transition-colors">{t('nav.tours')}</Link></li>
                        <li><Link to="/guia-bali" className="hover:text-primary transition-colors">{t('nav.guide')}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">{t('footer.contact')}</h4>
                    <ul className="space-y-4 font-medium text-gray-500 dark:text-gray-400">
                        <li>WhatsApp: +34 661 45 35 15</li>
                        <li>Email: info@cantiktours.com</li>
                        <li>Bali, Indonesia</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Social</h4>
                    <div className="flex gap-4">
                        <a href="https://instagram.com/CantikToursBali" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                            <Instagram size={20} />
                        </a>
                        <a href="https://wa.me/376614535" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                            <MessageCircle size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-black/5 dark:border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <p>© {currentYear} CANTIK TOURS. {t('footer.rights')}</p>
                <p className="flex items-center gap-2">
                    Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Bali
                </p>
            </div>
        </footer>
    );
};

export default Footer;
