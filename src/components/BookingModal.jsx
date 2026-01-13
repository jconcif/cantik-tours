import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, tourTitle }) => {
    const [formData, setFormData] = useState({
        date: '',
        pax: '2',
        hotel: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir el mensaje de WhatsApp
        // Construir el mensaje de WhatsApp - Texto plano para evitar errores de codificación
        const message = `Hola Cantik Tours!
Me gustaría reservar una actividad:

- Tour: ${tourTitle}
- Fecha: ${formData.date}
- Pasajeros: ${formData.pax}
- Hotel/Zona: ${formData.hotel}

¿Me confirman disponibilidad? Gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/376614535?text=${encodedMessage}`;

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                        <div className="bg-primary/10 p-6 flex justify-between items-center">
                            <h3 className="text-xl font-black text-primary">Detalles del Viaje</h3>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/50 hover:bg-white flex items-center justify-center transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">

                            {/* Date Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    <Calendar size={16} className="text-primary" />
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>

                            {/* Pax Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    <Users size={16} className="text-primary" />
                                    Personas
                                </label>
                                <select
                                    value={formData.pax}
                                    onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary/50 transition-colors appearance-none"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Personas'}</option>
                                    ))}
                                    <option value="Más de 12">Más de 12 Personas (Grupo Grande)</option>
                                </select>
                            </div>

                            {/* Hotel Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    <MapPin size={16} className="text-primary" />
                                    Hotel / Ubicación
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: Maya Ubud Resort"
                                    value={formData.hotel}
                                    onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-4 rounded-xl text-lg font-black shadow-lg shadow-primary/25 flex items-center justify-center gap-2 mt-4"
                            >
                                <MessageCircle size={24} />
                                Enviar a WhatsApp
                            </button>

                            <p className="text-center text-xs text-gray-400 font-medium">
                                Te responderemos lo antes posible para confirmar.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
