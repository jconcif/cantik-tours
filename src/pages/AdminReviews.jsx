import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Trash2, Star, Lock, Eye, EyeOff, CheckCircle2, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminReviews = () => {
    const { i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin_get_reviews.php?token=${password}`, {
                headers: { 'Authorization': password }
            });
            const result = await response.json();
            if (result.status === 'success') {
                setReviews(result.data);
                setIsAuthenticated(true);
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error de conexión' });
        } finally {
            setLoading(false);
        }
    };

    const updateReview = async (id, data) => {
        try {
            const response = await fetch('/api/admin_update_review.php', {
                method: 'POST',
                headers: {
                    'Authorization': password,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, token: password, ...data })
            });
            const result = await response.json();
            if (result.status === 'success') {
                setMessage({ type: 'success', text: 'Reseña actualizada' });
                fetchReviews();
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al actualizar' });
        }
    };


    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark pt-32 px-6 flex items-center justify-center">
                <div className="max-w-md w-full bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-black/5 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-black">Panel de Control</h1>
                        <p className="text-gray-500">Introduce la contraseña de administrador</p>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); fetchReviews(); }} className="space-y-4">
                        <input
                            type="password"
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-black/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn-primary w-full py-4 text-lg font-bold">
                            Entrar
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center text-red-500 font-medium">{message.text}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black mb-2">Gestión de Reseñas</h1>
                        <p className="text-gray-500 font-medium">Administra y aprueba los comentarios de los clientes</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="text-sm font-bold text-primary hover:underline">
                        Cerrar Sesión
                    </button>
                </div>

                {message && (
                    <div className={`mb-8 p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid gap-6">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-white/5 p-6 rounded-[2rem] border border-black/5 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-lg"
                        >
                            {/* Avatar Section */}
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl shrink-0 border-2 border-primary/5">
                                {review.nombre ? review.nombre[0].toUpperCase() : 'U'}
                            </div>

                            {/* Info Section */}
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-black">{review.nombre}</h3>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase flex items-center gap-2">
                                        {(() => {
                                            const flags = { ar: '🇦🇷', cl: '🇨🇱', co: '🇨🇴', es: '🇪🇸', mx: '🇲🇽', pe: '🇵🇪', uy: '🇺🇾', us: '🇺🇸' };
                                            return flags[review.pais] || '🌐';
                                        })()}
                                        {review.tour_id}
                                    </span>
                                </div>
                                <div className="flex gap-1 text-yellow-400 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < review.estrellas ? "currentColor" : "transparent"} />
                                    ))}
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                            Original (ES)
                                        </label>
                                        <textarea
                                            id={`orig-${review.id}`}
                                            className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary h-24 italic"
                                            defaultValue={review.comentario || ''}
                                            placeholder="Comentario original..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-pink-500 tracking-widest flex items-center gap-2">
                                            <Languages size={12} />
                                            {i18n?.language === 'en' ? 'Translation (EN)' : 'Traducción (EN)'}
                                        </label>
                                        <div className="flex gap-2">
                                            <textarea
                                                id={`trans-${review.id}`}
                                                className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary h-24 italic"
                                                defaultValue={review.comentario_en || ''}
                                                placeholder="Traduce el comentario aquí..."
                                            />
                                            <button
                                                onClick={() => {
                                                    const origText = document.getElementById(`orig-${review.id}`).value;
                                                    const transText = document.getElementById(`trans-${review.id}`).value;
                                                    updateReview(review.id, { aprobado: review.aprobado, comentario: origText, comentario_en: transText });
                                                }}
                                                className="self-end p-4 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                                title="Guardar Cambios"
                                            >
                                                <CheckCircle2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {review.ig_user && (
                                    <p className="text-xs text-primary font-bold mt-2">IG: @{review.ig_user.replace('@', '')}</p>
                                )}

                                {/* Info de Autorización */}
                                <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${review.autorizacion_fotos == 1 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                    <CheckCircle2 size={12} />
                                    {review.autorizacion_fotos == 1 ? 'Autoriza Web/Redes' : 'No Autoriza Redes'}
                                </div>
                            </div>

                            {/* Actions Section */}
                            <div className="flex gap-3 shrink-0">
                                <button
                                    onClick={() => {
                                        const origText = document.getElementById(`orig-${review.id}`).value;
                                        const transText = document.getElementById(`trans-${review.id}`).value;
                                        const newStatus = (review.aprobado === "1" || review.aprobado === 1) ? 0 : 1;
                                        updateReview(review.id, { aprobado: newStatus, comentario: origText, comentario_en: transText });
                                    }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${review.aprobado === "1" || review.aprobado === 1 ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    {(review.aprobado === "1" || review.aprobado === 1) ? (
                                        <><EyeOff size={18} /> Ocultar</>
                                    ) : (
                                        <><Eye size={18} /> Visualizar</>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {reviews.length === 0 && !loading && (
                    <div className="text-center py-24 bg-gray-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10">
                        <p className="text-gray-400 font-medium">No hay reseñas para gestionar aún</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
