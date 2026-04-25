import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Lock, Eye, EyeOff, CheckCircle2, Languages, Plus, RefreshCw, AlertCircle, Trash2, ShieldCheck, Calendar, Users, MapPin, Wallet, TrendingUp, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { reviewService } from '../services/reviewService';
import { adminService } from '../services/adminService';

const AdminReviews = () => {
    const { i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('bookings');
    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [successId, setSuccessId] = useState(null);
    const [message, setMessage] = useState(null);

    // Simple password check
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'javiperty2026';

    const fetchData = async () => {
        setLoading(true);
        setMessage(null);
        try {
            if (activeTab === 'reviews') {
                const data = await reviewService.getReviews(password);
                setReviews(data);
            } else {
                const data = await adminService.getBookings(password);
                setBookings(data);
            }
            setIsAuthenticated(true);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al conectar con la base de datos' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [activeTab, isAuthenticated]);

    const updateReview = async (id, data) => {
        setUpdatingId(id);
        setMessage(null);
        try {
            await reviewService.updateReview(id, { ...data, token: password });
            setSuccessId(id);
            setTimeout(() => setSuccessId(null), 2000);
            fetchData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al actualizar' });
        } finally {
            setUpdatingId(null);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const deleteReview = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta reseña permanentemente?')) return;
        try {
            await reviewService.deleteReview(id, password);
            fetchData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al eliminar' });
        }
    };

    const createReview = async () => {
        try {
            await reviewService.createReview(password);
            fetchData();
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const countriesList = [
        { code: 'de', name: '🇩🇪 Alemania' }, { code: 'ad', name: '🇦🇩 Andorra' }, { code: 'ar', name: '🇦🇷 Argentina' },
        { code: 'au', name: '🇦🇺 Australia' }, { code: 'be', name: '🇧🇪 Bélgica' }, { code: 'bo', name: '🇧🇴 Bolivia' },
        { code: 'ca', name: '🇨🇦 Canadá' }, { code: 'cl', name: '🇨🇱 Chile' }, { code: 'co', name: '🇨🇴 Colombia' },
        { code: 'cr', name: '🇨🇷 Costa Rica' }, { code: 'ec', name: '🇪🇨 Ecuador' }, { code: 'es', name: '🇪🇸 España' },
        { code: 'us', name: '🇺🇸 USA' }, { code: 'fr', name: '🇫🇷 Francia' }, { code: 'gt', name: '🇬🇹 Guatemala' },
        { code: 'id', name: '🇮🇩 Indonesia' }, { code: 'it', name: '🇮🇹 Italia' }, { code: 'mx', name: '🇲🇽 México' },
        { code: 'nl', name: '🇳🇱 P. Bajos' }, { code: 'pa', name: '🇵🇦 Panamá' }, { code: 'py', name: '🇵🇾 Paraguay' },
        { code: 'pe', name: '🇵🇪 Perú' }, { code: 'pt', name: '🇵🇹 Portugal' }, { code: 'gb', name: '🇬🇧 Reino Unido' },
        { code: 'do', name: '🇩🇴 Rep. Dominicana' }, { code: 'ch', name: '🇨🇭 Suiza' }, { code: 'th', name: '🇹🇭 Tailandia' },
        { code: 'uy', name: '🇺🇾 Uruguay' }, { code: 'venezuela', name: '🇻🇪 Venezuela' }, { code: 'other', name: '🌐 Otro' }
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-black/5 shadow-2xl">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                        <ShieldCheck size={40} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-center mb-2">Cantik Dashboard</h1>
                    <p className="text-center text-gray-500 mb-8 font-medium italic">Acceso restringido</p>
                    <form onSubmit={(e) => { e.preventDefault(); fetchData(); }} className="space-y-4">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-center" />
                        <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Entrar al Panel'}
                        </button>
                    </form>
                    {message && <p className={`mt-6 text-center text-sm font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message.text}</p>}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-bg-light dark:bg-bg-dark px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-2">
                            <ShieldCheck size={14} />
                            Panel de Administración
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black">Cantik <span className="text-primary italic">Control</span></h1>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 shadow-sm">
                        <button 
                            onClick={() => setActiveTab('bookings')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'bookings' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Calendar size={18} />
                            Reservas
                        </button>
                        <button 
                            onClick={() => setActiveTab('reviews')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'reviews' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Star size={18} />
                            Reseñas
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'bookings' ? (
                        <motion.div key="bookings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-black/5 shadow-sm">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Reservas</div>
                                    <div className="text-3xl font-black text-primary">{bookings.length}</div>
                                </div>
                                <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-black/5 shadow-sm">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pagadas</div>
                                    <div className="text-3xl font-black text-emerald-500">{bookings.filter(b => b.is_paid == 1).length}</div>
                                </div>
                                <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-black/5 shadow-sm">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ingresos Depósitos</div>
                                    <div className="text-3xl font-black text-secondary">{bookings.reduce((acc, b) => acc + (b.is_paid == 1 ? Number(b.deposit_amount) : 0), 0).toFixed(0)}€</div>
                                </div>
                                <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-black/5 shadow-sm">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pendientes</div>
                                    <div className="text-3xl font-black text-orange-400">{bookings.filter(b => b.is_paid == 0).length}</div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-black/5 shadow-xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-black/5">
                                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Fecha Tour</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Tour / Cliente</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Grupo / Hotel</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Precio / Pago</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                                    <td className="px-6 py-6">
                                                        <div className="text-sm font-black text-gray-900 dark:text-white">
                                                            {new Date(booking.booking_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                                        </div>
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                                                            {new Date(booking.booking_date).toLocaleDateString('es-ES', { year: 'numeric' })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <div className="text-sm font-black text-primary truncate max-w-[180px]">{booking.tour_title}</div>
                                                        <div className="text-xs font-bold text-gray-500 italic">ID: #{booking.id}</div>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-gray-700 dark:text-gray-300">
                                                            <Users size={12} className="text-gray-400" />
                                                            {booking.pax} Pers.
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 truncate max-w-[150px]">
                                                            <MapPin size={10} />
                                                            {booking.hotel}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <div className="text-sm font-black text-gray-900 dark:text-white">{booking.total_price}€</div>
                                                        <div className="text-[10px] font-bold text-gray-400">Dep: {booking.deposit_amount}€</div>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${booking.is_paid == 1 ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                                                            {booking.is_paid == 1 ? (
                                                                <><CheckCircle2 size={12} /> PAGADO</>
                                                            ) : (
                                                                <><Wallet size={12} /> PENDIENTE</>
                                                            )}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {bookings.length === 0 && (
                                    <div className="p-20 text-center text-gray-400 font-medium italic">No hay reservas registradas aún</div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="reviews" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                            {/* Reviews Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                                {[
                                    { label: 'Reserva', key: 'rating_booking' },
                                    { label: 'Logística', key: 'rating_logistics' },
                                    { label: 'Ruta', key: 'rating_route' },
                                    { label: 'Conductor', key: 'rating_driver' },
                                    { label: 'Vehículo', key: 'rating_vehicle' },
                                    { label: 'Precio', key: 'rating_price' }
                                ].map((stat) => {
                                    const validReviews = reviews.filter(r => r[stat.key]);
                                    const avg = validReviews.length > 0 
                                        ? (validReviews.reduce((acc, r) => acc + Number(r[stat.key]), 0) / validReviews.length).toFixed(1)
                                        : '-';
                                    return (
                                        <div key={stat.key} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-black/5 text-center shadow-sm">
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                                            <div className="text-xl font-black text-primary flex items-center justify-center gap-0.5">{avg}<Star size={12} fill="currentColor" /></div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end gap-3 mb-6">
                                <button onClick={createReview} className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-primary/20">
                                    <Plus size={20} />
                                    Nueva Reseña Manual
                                </button>
                                <button onClick={fetchData} className="p-4 bg-white dark:bg-white/5 border border-black/5 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                                </button>
                            </div>

                            <div className="grid gap-6">
                                {reviews.map((review) => (
                                    <motion.div key={review.id} className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-black/5 flex flex-col gap-8 shadow-xl">
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Nombre</label>
                                                <input id={`nombre-${review.id}`} className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary" defaultValue={review.nombre || ''} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tour</label>
                                                <select id={`tour-${review.id}`} className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary" defaultValue={review.tour_id || ''}>
                                                    <option value="ubud_central">Ubud Central</option>
                                                    <option value="ubud_north">Ubud North</option>
                                                    <option value="lovina">Lovina / Delfines</option>
                                                    <option value="east">East Bali</option>
                                                    <option value="lempuyang">Lempuyang</option>
                                                    <option value="custom">Personalizado</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Estado</label>
                                                <select id={`aprobado-${review.id}`} className={`w-full px-4 py-3 border border-black/5 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary ${review.aprobado == 1 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`} defaultValue={review.aprobado}>
                                                    <option value="1">✅ Publicado</option>
                                                    <option value="0">❌ Oculto</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <textarea id={`orig-${review.id}`} className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary h-32 italic" defaultValue={review.comentario || ''} />
                                            <textarea id={`trans-${review.id}`} className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-black/5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary h-32 italic text-primary" defaultValue={review.comentario_en || ''} placeholder="Traducción al inglés..." />
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-black/5">
                                            <div className="text-[10px] font-bold text-gray-400">ID: #{review.id} · {new Date(review.fecha).toLocaleDateString()}</div>
                                            <div className="flex gap-3">
                                                <button onClick={() => deleteReview(review.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                                <button 
                                                    onClick={() => {
                                                        const values = {
                                                            nombre: document.getElementById(`nombre-${review.id}`).value,
                                                            tour_id: document.getElementById(`tour-${review.id}`).value,
                                                            aprobado: document.getElementById(`aprobado-${review.id}`).value,
                                                            comentario: document.getElementById(`orig-${review.id}`).value,
                                                            comentario_en: document.getElementById(`trans-${review.id}`).value,
                                                            // Keep other hidden values
                                                            driver_name: review.driver_name,
                                                            find_us: review.find_us,
                                                            rating_booking: review.rating_booking,
                                                            rating_logistics: review.rating_logistics,
                                                            rating_route: review.rating_route,
                                                            rating_driver: review.rating_driver,
                                                            rating_vehicle: review.rating_vehicle,
                                                            rating_price: review.rating_price,
                                                            pais: review.pais,
                                                            ig_user: review.ig_user,
                                                            autorizacion_fotos: review.autorizacion_fotos
                                                        };
                                                        updateReview(review.id, values);
                                                    }}
                                                    className="px-6 py-3 bg-primary text-white rounded-xl font-black shadow-lg flex items-center gap-2"
                                                >
                                                    {updatingId === review.id ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                                                    {successId === review.id ? '¡Guardado!' : 'Guardar'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminReviews;

