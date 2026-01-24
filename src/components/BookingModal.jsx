import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BookingModal = ({ isOpen, onClose, tourTitle }) => {
    const { t } = useTranslation();
    const [showCoupon, setShowCoupon] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        pax: '1-5 Personas',
        hotel: '',
        coupon: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = `Hola Cantik Tours!
Me gustaría reservar una actividad:

- Tour: ${tourTitle}
- Fecha: ${formData.date}
- Pasajeros: ${formData.pax}
- Hotel/Zona: ${formData.hotel}
${showCoupon && formData.coupon ? `- Cupón: ${formData.coupon}` : ''}

¿Me confirman disponibilidad? Gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/376614535?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-6 flex justify-between items-center border-b border-primary/5">
                            <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t('detail.booking_title')}</h3>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white flex items-center justify-center transition-colors"
                            >
                                <X size={20} className="text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">

                            {/* Date Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    <Calendar size={14} className="text-primary" />
                                    Fecha de viaje
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-gray-700 dark:text-gray-200 min-h-[58px]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5">
                                {/* Pax Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <Users size={14} className="text-primary" />
                                        Tamaño del Grupo
                                    </label>
                                    <select
                                        value={formData.pax}
                                        onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-primary/50 transition-all appearance-none text-gray-700 dark:text-gray-200"
                                    >
                                        <option value="1-5 Personas">1-5 Personas</option>
                                        <option value="6 o más">6 o más Personas</option>
                                        <option value="12 o más">12 o más Personas (Grupo Grande)</option>
                                    </select>
                                </div>

                                {/* Hotel Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <MapPin size={14} className="text-primary" />
                                        Ubicación / Hotel
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej: Maya Ubud Resort"
                                        value={formData.hotel}
                                        onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-primary/50 transition-all text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                    />
                                </div>

                                {/* Coupon Toggle and Input */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCoupon(!showCoupon)}
                                        className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-primary transition-colors uppercase tracking-widest"
                                    >
                                        <Ticket size={14} className={showCoupon ? 'text-secondary' : 'text-gray-400'} />
                                        {t('detail.coupon')}
                                    </button>

                                    <AnimatePresence>
                                        {showCoupon && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-3">
                                                    <input
                                                        type="text"
                                                        placeholder={t('detail.coupon_placeholder')}
                                                        value={formData.coupon}
                                                        onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-secondary/50 transition-all text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 uppercase"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-4"
                            >
                                <MessageCircle size={24} />
                                Confirmar y enviar
                            </button>

                            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">
                                Sin pagos online. Reserva y paga en Bali.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
