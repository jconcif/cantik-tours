import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Map, Sun, AlertCircle,
    CreditCard, Plane, Thermometer, ShieldCheck,
    Globe, Camera, Utensils, Info, ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const GuideSection = ({ title, icon: Icon, children, isOpen, onToggle }) => (
    <div className="border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden bg-white dark:bg-white/5 transition-all">
        <button
            onClick={onToggle}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ChevronDown size={20} className="text-gray-400" />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-8"
                >
                    <div className="pt-4 border-t border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const BaliGuide = () => {
    const { t, i18n } = useTranslation();
    const [openSection, setOpenSection] = useState(0);
    const isEs = i18n.language.startsWith('es');

    const sections = [
        {
            title: isEs ? "Preparativos y Visado" : "Preparation & Visa",
            icon: Plane,
            content: (
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Pasaporte:</strong> Debe tener una validez mínima de 6 meses desde el día de entrada.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>VoA (Visa on Arrival):</strong> La mayoría de turistas (incluyendo España y Latam) pueden obtenerla al llegar o online (e-VoA) por unos 35€ (500.000 IDR).</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>QR Aduana:</strong> Debes rellenar el formulario de aduana online (ECD) antes de salir del aeropuerto.</p>
                    </li>
                </ul>
            )
        },
        {
            title: isEs ? "Dinero y Pagos" : "Money & Payments",
            icon: CreditCard,
            content: (
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Moneda:</strong> Rupia Indonesia (IDR). 1€ equivale aproximadamente a 16.000-17.000 IDR.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Tarjetas:</strong> Revolut y Wise funcionan perfectamente. Evita cambiar dinero en la calle en sitios no oficiales.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Efectivo:</strong> Bali sigue siendo muy dependiente del efectivo para mercadillos o propinas.</p>
                    </li>
                </ul>
            )
        },
        {
            title: isEs ? "Clima y Equipaje" : "Weather & Packing",
            icon: Sun,
            content: (
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Temporadas:</strong> Seca (Abril - Octubre) y Lluvias (Noviembre - Marzo). La temperatura es siempre tropical (27-30°C).</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Equipaje:</strong> Ropa ligera, calzado cómodo (para cascadas) y algo para cubrir hombros/rodillas al entrar en templos (Sarong).</p>
                    </li>
                </ul>
            )
        },
        {
            title: isEs ? "Salud y Seguridad" : "Health & Safety",
            icon: ShieldCheck,
            content: (
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Agua:</strong> NUNCA bebas agua del grifo, ni siquiera para cepillarte los dientes si eres muy sensible. Solo agua embotellada.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Seguro Médico:</strong> Imprescindible. La sanidad privada en Bali es buena pero muy cara sin seguro.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Bali Belly:</strong> Malestar estomacal común. Come en sitios con buena rotación de clientes.</p>
                    </li>
                </ul>
            )
        },
        {
            title: isEs ? "Etiqueta Cultural" : "Cultural Etiquette",
            icon: Globe,
            content: (
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Ofrendas (Canang Sari):</strong> Verás cestitas de flores por el suelo. No las pises a propósito.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p><strong>Templos:</strong> Debes llevar sarong. No toques la cabeza de la gente (es sagrada) y usa la mano derecha para dar o recibir cosas.</p>
                    </li>
                </ul>
            )
        }
    ];

    return (
        <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
            <SEO
                title={`${t('guide.title')} ${t('guide.title_accent')} | Viaja a tu ritmo`}
                description={t('guide.subtitle')}
                keywords="guía bali 2026, consejos viajar bali, visado bali, clima bali, seguridad bali, moneda indonesia"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-primary/20">
                    <Info size={16} /> {t('guide.badge')}
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                    {t('guide.title')} <span className="text-primary italic">{t('guide.title_accent')}</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('guide.subtitle')}
                </p>
            </motion.div>

            <div className="grid gap-6">
                {sections.map((section, idx) => (
                    <GuideSection
                        key={idx}
                        title={section.title}
                        icon={section.icon}
                        isOpen={openSection === idx}
                        onToggle={() => setOpenSection(openSection === idx ? -1 : idx)}
                    >
                        {section.content}
                    </GuideSection>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 p-10 rounded-[3rem] bg-bg-dark text-white relative overflow-hidden group shadow-2xl"
            >
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6">{t('guide.help_title')}</h2>
                    <p className="text-white/70 text-lg mb-8 font-medium">
                        {t('guide.help_text')}
                    </p>
                    <a
                        href="https://wa.me/376614535?text=Hola%20Cantik%20Tours!%20Tengo%20algunas%20dudas%20sobre%20mi%20viaje%20a%20Bali."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-white hover:text-bg-dark text-white font-black px-8 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                    >
                        {t('guide.help_btn')}
                    </a>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] -mr-32 -mb-32" />
            </motion.div>
        </div>
    );
};

export default BaliGuide;
