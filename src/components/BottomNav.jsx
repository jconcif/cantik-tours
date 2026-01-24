import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, CalendarCheck, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
    const { t } = useTranslation();
    return (
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
            <div className="glass px-8 py-4 flex items-center justify-between rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/10">
                <NavLink to="/" className="relative">
                    {({ isActive }) => (
                        <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
                            <Compass size={22} strokeWidth={isActive ? 3 : 2} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{t('nav.home')}</span>
                        </div>
                    )}
                </NavLink>

                <NavLink to="/tours" className="relative">
                    {({ isActive }) => (
                        <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
                            <CalendarCheck size={22} strokeWidth={isActive ? 3 : 2} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{t('nav.tours')}</span>
                        </div>
                    )}
                </NavLink>

                <a
                    href={`https://wa.me/376614535?text=${encodeURIComponent(t('common.whatsapp_message'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                >
                    <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-500 transition-all">
                        <MessageCircle size={22} strokeWidth={2} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">WhatsApp</span>
                    </div>
                </a>
            </div>
        </div>
    );
};


export default BottomNav;
