import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, Eye, EyeOff, CheckCircle2, Languages, Plus, RefreshCw, AlertCircle, Trash2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminReviews = () => {
    const { i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [successId, setSuccessId] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const apiPath = window.location.origin + '/api/admin_get_reviews.php';
            const response = await fetch(`${apiPath}?token=${password}`, {
                headers: { 'Authorization': password }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `Error ${response.status}` }));
                throw new Error(errorData.message || 'Error en el servidor');
            }

            const result = await response.json();
            if (result.status === 'success') {
                setReviews(result.data);
                setIsAuthenticated(true);
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Error de conexión' });
        } finally {
            setLoading(false);
        }
    };

    const updateReview = async (id, data) => {
        setUpdatingId(id);
        setMessage(null);
        try {
            const apiPath = window.location.origin + '/api/admin_update_review.php';
            const response = await fetch(apiPath, {
                method: 'POST',
                headers: {
                    'Authorization': password,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, token: password, ...data })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar');
            }

            const result = await response.json();
            if (result.status === 'success') {
                // No message set for success as per user request
                setSuccessId(id);
                setTimeout(() => setSuccessId(null), 2000);
            } else {
                setMessage({ type: 'error', text: result.message || 'Error al actualizar' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Error al actualizar' });
        } finally {
            setUpdatingId(null);
            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const deleteReview = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta reseña permanentemente?')) return;

        try {
            const apiPath = window.location.origin + '/api/admin_delete_review.php';
            const response = await fetch(apiPath, {
                method: 'POST',
                headers: {
                    'Authorization': password,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, token: password })
            });

            if (!response.ok) throw new Error('Error al eliminar');
            const result = await response.json();
            if (result.status === 'success') {
                fetchReviews();
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const createReview = async () => {
        try {
            const apiPath = window.location.origin + '/api/admin_create_review.php';
            const response = await fetch(apiPath, {
                method: 'POST',
                headers: {
                    'Authorization': password,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: password })
            });

            if (!response.ok) throw new Error('Error al crear');
            const result = await response.json();
            if (result.status === 'success') {
                fetchReviews();
            } else {
                setMessage({ type: 'error', text: result.message || 'Error al crear' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const countriesList = [
        { code: 'de', name: '🇩🇪 Alemania' },
        { code: 'ad', name: '🇦🇩 Andorra' },
        { code: 'ar', name: '🇦🇷 Argentina' },
        { code: 'au', name: '🇦🇺 Australia' },
        { code: 'be', name: '🇧🇪 Bélgica' },
        { code: 'bo', name: '🇧🇴 Bolivia' },
        { code: 'ca', name: '🇨🇦 Canadá' },
        { code: 'cl', name: '🇨🇱 Chile' },
        { code: 'co', name: '🇨🇴 Colombia' },
        { code: 'cr', name: '🇨🇷 Costa Rica' },
        { code: 'ec', name: '🇪🇨 Ecuador' },
        { code: 'es', name: '🇪🇸 España' },
        { code: 'us', name: '🇺🇸 USA' },
        { code: 'fr', name: '🇫🇷 Francia' },
        { code: 'gt', name: '🇬🇹 Guatemala' },
        { code: 'id', name: '🇮🇩 Indonesia' },
        { code: 'it', name: '🇮🇹 Italia' },
        { code: 'mx', name: '🇲🇽 México' },
        { code: 'nl', name: '🇳🇱 P. Bajos' },
        { code: 'pa', name: '🇵🇦 Panamá' },
        { code: 'py', name: '🇵🇾 Paraguay' },
        { code: 'pe', name: '🇵🇪 Perú' },
        { code: 'pt', name: '🇵🇹 Portugal' },
        { code: 'gb', name: '🇬🇧 Reino Unido' },
        { code: 'do', name: '🇩🇴 Rep. Dominicana' },
        { code: 'ch', name: '🇨🇭 Suiza' },
        { code: 'th', name: '🇹🇭 Tailandia' },
        { code: 'uy', name: '🇺🇾 Uruguay' },
        { code: 'venezuela', name: '🇻🇪 Venezuela' },
        { code: 'other', name: '🌐 Otro' }
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-black/5 shadow-2xl"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                        <ShieldCheck size={40} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-center mb-2">Panel Admin</h1>
                    <p className="text-center text-gray-500 mb-8 font-medium italic">Introduce la clave de acceso</p>

                    <form onSubmit={(e) => { e.preventDefault(); fetchReviews(); }} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-center"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Entrar'}
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-6 text-center text-sm font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                            {message.text}
                        </p>
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-bg-light dark:bg-bg-dark px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2">Gestionar <span className="text-primary italic">Reseñas</span></h1>
                        <p className="text-gray-500 font-medium">Panel de control de testimonios · Cantik Tours</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={createReview}
                            className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-white/5 border border-black/5 text-secondary dark:text-white rounded-2xl font-black hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Plus size={20} className="text-primary" />
                            Nueva Reseña
                        </button>
                        <button
                            onClick={fetchReviews}
                            className="p-4 bg-white dark:bg-white/5 border border-black/5 rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
                            title="Refrescar"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>

                {message && message.type === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-3xl font-black border flex items-center gap-4 shadow-2xl backdrop-blur-md bg-red-50/90 border-red-100 text-red-600 shadow-red-500/20"
                    >
                        <div className="p-2 rounded-full bg-red-100">
                            <AlertCircle size={24} />
                        </div>
                        <span className="text-lg">{message.text}</span>
                    </motion.div>
                )}

                <div className="grid gap-8">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-black/5 flex flex-col gap-8 shadow-xl"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Nombre</label>
                                    <input
                                        id={`nombre-${review.id}`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary"
                                        defaultValue={review.nombre || ''}
                                    />
                                </div>

                                {/* Tour */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tour</label>
                                    <select
                                        id={`tour-${review.id}`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary"
                                        defaultValue={review.tour_id || ''}
                                    >
                                        <option value="">-- Seleccionar Tour --</option>
                                        <option value="ubud_central">Ubud Central</option>
                                        <option value="ubud_north">Ubud North</option>
                                        <option value="lovina">Lovina / Delfines</option>
                                        <option value="east">East Bali / Besakih</option>
                                        <option value="lempuyang">Lempuyang</option>
                                        <option value="transfer">Traslado</option>
                                        <option value="custom">Tour Personalizado</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>

                                {/* Rating */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Estrellas</label>
                                    <select
                                        id={`stars-${review.id}`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary text-yellow-500"
                                        defaultValue={review.estrellas}
                                    >
                                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                        <option value="4">⭐⭐⭐⭐ (4)</option>
                                        <option value="3">⭐⭐⭐ (3)</option>
                                        <option value="2">⭐⭐ (2)</option>
                                        <option value="1">⭐ (1)</option>
                                    </select>
                                </div>

                                {/* Country */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">País</label>
                                    <select
                                        id={`pais-${review.id}`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary"
                                        defaultValue={review.pais || 'es'}
                                    >
                                        {countriesList.map(c => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Instagram */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Instagram</label>
                                    <input
                                        id={`ig-${review.id}`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary text-pink-500"
                                        defaultValue={review.ig_user || ''}
                                        placeholder="@usuario"
                                    />
                                </div>

                                {/* Status Toggle */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Estado</label>
                                    <select
                                        id={`aprobado-${review.id}`}
                                        className={`w-full px-4 py-3 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary ${review.aprobado == 1 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}
                                        defaultValue={review.aprobado}
                                    >
                                        <option value="1">✅ Publicado</option>
                                        <option value="0">❌ Oculto</option>
                                    </select>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                        Comentario (ES)
                                    </label>
                                    <textarea
                                        id={`orig-${review.id}`}
                                        className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary h-32 italic leading-relaxed"
                                        defaultValue={review.comentario || ''}
                                        placeholder="Comentario original..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-pink-500 tracking-widest flex items-center gap-2">
                                        <Languages size={12} />
                                        Translation (EN)
                                    </label>
                                    <textarea
                                        id={`trans-${review.id}`}
                                        className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary h-32 italic leading-relaxed"
                                        defaultValue={review.comentario_en || ''}
                                        placeholder="Traduce el comentario aquí..."
                                    />
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/5">
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            id={`auth-${review.id}`}
                                            className="w-5 h-5 rounded-lg border-2 border-primary/30 text-primary focus:ring-primary"
                                            defaultChecked={review.autorizacion_fotos == 1}
                                        />
                                        <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                                            Autoriza Redes/Web
                                        </span>
                                    </label>
                                    <span className="text-[10px] font-medium text-gray-400">
                                        ID: {review.id} · Fecha: {new Date(review.fecha).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                                        title="Eliminar Reseña"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <button
                                        disabled={updatingId === review.id}
                                        onClick={() => {
                                            const values = {
                                                nombre: document.getElementById(`nombre-${review.id}`).value,
                                                tour_id: document.getElementById(`tour-${review.id}`).value,
                                                estrellas: document.getElementById(`stars-${review.id}`).value,
                                                pais: document.getElementById(`pais-${review.id}`).value,
                                                ig_user: document.getElementById(`ig-${review.id}`).value,
                                                aprobado: document.getElementById(`aprobado-${review.id}`).value,
                                                comentario: document.getElementById(`orig-${review.id}`).value,
                                                comentario_en: document.getElementById(`trans-${review.id}`).value,
                                                autorizacion_fotos: document.getElementById(`auth-${review.id}`).checked ? 1 : 0
                                            };
                                            updateReview(review.id, values);
                                        }}
                                        className={`flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black shadow-lg transition-all ${updatingId === review.id
                                            ? 'bg-gray-400 cursor-not-allowed opacity-70'
                                            : successId === review.id
                                                ? 'bg-green-500 shadow-green-200'
                                                : 'bg-primary shadow-primary/25 hover:scale-105 active:scale-95 cursor-pointer'
                                            }`}
                                    >
                                        {updatingId === review.id ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Guardando...
                                            </>
                                        ) : successId === review.id ? (
                                            <>
                                                <CheckCircle2 size={20} />
                                                ¡Guardado!
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                Guardar Cambios
                                            </>
                                        )}
                                    </button>
                                </div>
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
