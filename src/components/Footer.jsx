import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Instagram, Heart, MessageCircle, ShieldCheck, Users, Banknote } from 'lucide-react';

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
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <ShieldCheck size={16} className="text-secondary" /> {t('footer.trust_1')}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <Users size={16} className="text-secondary" /> {t('footer.trust_2')}
                        </div>
                    </div>
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
                        <a href="https://instagram.com/CantikToursBali" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                            <Instagram size={24} />
                        </a>
                        <a href="https://wa.me/376614535" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                            <MessageCircle size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-black/5 dark:border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
                <p>© {currentYear} Cantik Tours. {t('footer.rights')}</p>
                <p className="flex items-center gap-2">
                    {t('footer.made_with')} <Heart size={14} className="text-red-500 fill-red-500" /> {t('footer.in_bali')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
