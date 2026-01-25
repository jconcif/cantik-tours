import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Luggage, MapPin, MessageCircle, Plane, Users, Clock, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TransferModal = ({ isOpen, onClose }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState({
        type: '',
        otherType: '',
        date: '',
        time: '',
        flight: '',
        bags: '2',
        pax: '2'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const route = formData.type === 'other' ? formData.otherType : t(`detail.transfer_route_${formData.type}`);

        const message = `${t('detail.msg_transfer_intro')}

- ${t('detail.msg_transfer_type')}: ${route}
- ${t('detail.msg_date')}: ${formData.date}
- ${t('detail.msg_transfer_time')}: ${formData.time}
- ${t('detail.msg_transfer_pax')}: ${formData.pax}
- ${t('detail.msg_transfer_flight')}: ${formData.flight || 'N/A'}
- ${t('detail.msg_transfer_bags')}: ${formData.bags}

${t('detail.msg_confirm')}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/376614535?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const inputClasses = "w-full bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 font-bold outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-gray-700 dark:text-gray-200 min-h-[62px] block box-border relative";

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
                            <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t('detail.transfer_title')}</h3>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white flex items-center justify-center transition-colors"
                            >
                                <X size={20} className="text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">

                            {/* Transfer Route Selector */}
                            <div className="space-y-2">
                                <label className="flex items-start gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    <MapPin size={14} className="text-primary mt-0.5" />
                                    {t('detail.transfer_type')}
                                </label>
                                <select
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className={inputClasses}
                                >
                                    <option value="" disabled>{t('detail.transfer_type_placeholder')}</option>
                                    <option value="7">{t('detail.transfer_route_7')}</option>
                                    <option value="1">{t('detail.transfer_route_1')}</option>
                                    <option value="8">{t('detail.transfer_route_8')}</option>
                                    <option value="4">{t('detail.transfer_route_4')}</option>
                                    <option value="6">{t('detail.transfer_route_6')}</option>
                                    <option value="2">{t('detail.transfer_route_2')}</option>
                                    <option value="3">{t('detail.transfer_route_3')}</option>
                                    <option value="5">{t('detail.transfer_route_5')}</option>
                                    <option value="other">{t('detail.transfer_route_other')}</option>
                                </select>
                            </div>

                            {/* Price Notice */}
                            <AnimatePresence>
                                {formData.type && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2 text-primary">
                                            <Info size={16} />
                                            <span className="text-xs font-bold uppercase tracking-tight">{t('detail.price_special')}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] block font-black text-primary/60 uppercase -mb-1">
                                                {i18n.language.startsWith('es') ? 'Desde' : 'From'}
                                            </span>
                                            <span className="text-xl font-black text-primary">
                                                {formData.type === '1' || formData.type === '2' ? '25€' :
                                                    formData.type === '3' || formData.type === '4' ? '30€' :
                                                        formData.type === '5' || formData.type === '6' ? '20€' :
                                                            formData.type === '7' || formData.type === '8' ? '45€' : '--'}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Conditional Other Route Input */}
                            <AnimatePresence>
                                {formData.type === 'other' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <input
                                            type="text"
                                            required
                                            placeholder={t('detail.transfer_type_placeholder')}
                                            value={formData.otherType}
                                            onChange={(e) => setFormData({ ...formData, otherType: e.target.value })}
                                            className={inputClasses}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Date & Time Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-start gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <Calendar size={14} className="text-primary mt-0.5" />
                                        {t('detail.booking_date')}
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-start gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <Clock size={14} className="text-primary mt-0.5" />
                                        {t('detail.transfer_time')}
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            {/* Pax & Bags Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-start gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <Users size={14} className="text-primary mt-0.5" />
                                        {t('detail.booking_pax')}
                                    </label>
                                    <select
                                        value={formData.pax}
                                        onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                                        className={inputClasses}
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <option key={num} value={num}>{num} {t('detail.booking_pax_1').split(' ')[1]}</option>
                                        ))}
                                        <option value="6+">6+</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-start gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <Luggage size={14} className="text-primary mt-0.5" />
                                        {t('detail.transfer_bags')}
                                    </label>
                                    <select
                                        value={formData.bags}
                                        onChange={(e) => setFormData({ ...formData, bags: e.target.value })}
                                        className={inputClasses}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                        <option value="9+">9+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Flight Number */}
                            <div className="space-y-2">
                                <label className="flex items-start gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    <Plane size={14} className="text-primary mt-0.5" />
                                    {t('detail.transfer_flight')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('detail.transfer_flight_placeholder')}
                                    value={formData.flight}
                                    onChange={(e) => setFormData({ ...formData, flight: e.target.value })}
                                    className={inputClasses}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-4"
                            >
                                <MessageCircle size={24} />
                                {t('detail.transfer_submit')}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TransferModal;
