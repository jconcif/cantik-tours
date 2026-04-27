import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, MapPin, CreditCard, MessageCircle, ArrowLeft, Star } from 'lucide-react';

export default function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');
  const [booking, setBooking] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ref) {
      setError("Referencia no válida");
      setLoading(false);
      return;
    }

    const fetchItinerary = async () => {
      try {
        const r = await fetch(`https://cantiktours.com/api/get_itinerary.php?ref=${ref}`);
        const j = await r.json();
        if (j.status === 'success') {
          setBooking(j.data);
          setPayments(j.payments || []);
        } else {
          setError(j.message);
        }
      } catch (e) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [ref]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#11BDDB]"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-500/10 p-4 rounded-full mb-4">
        <ArrowLeft className="text-red-500" size={40} />
      </div>
      <h2 className="text-white text-2xl font-black mb-2">¡Ups! Algo salió mal</h2>
      <p className="text-gray-400 mb-8">{error}</p>
      <Link to="/" className="bg-[#11BDDB] text-white px-8 py-4 rounded-2xl font-black shadow-lg">Volver a la web</Link>
    </div>
  );

  const totalPaid = payments.reduce((acc, p) => acc + parseFloat(p.amount), 0);
  const due = booking.total_price - totalPaid;
  const isExpired = new Date(booking.booking_date) < new Date();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans pb-12">
      {/* Header */}
      <div className="bg-[#11BDDB] p-8 pb-16 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex justify-between items-center mb-6">
          <span className="text-white/80 font-black tracking-widest text-xs uppercase">Mi Viaje · {ref}</span>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${due <= 0 ? 'bg-white text-[#11BDDB]' : 'bg-yellow-400 text-black'}`}>
            {due <= 0 ? 'Pagado ✓' : 'Pago Pendiente'}
          </span>
        </div>
        <h1 className="text-3xl font-black text-white leading-tight mb-2 relative z-10">
          {booking.tour_title}
        </h1>
        <div className="flex items-center gap-2 text-white/80 font-bold relative z-10">
          <Calendar size={16} />
          {new Date(booking.booking_date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 -mt-8 relative z-20">
        
        {/* Info Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] font-black text-[#11BDDB] uppercase tracking-wider mb-1">Cliente</div>
              <div className="font-bold text-sm truncate">{booking.client_name}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-[#11BDDB] uppercase tracking-wider mb-1">Pasajeros</div>
              <div className="font-bold text-sm">{booking.pax} PAX</div>
            </div>
            <div className="col-span-2">
              <div className="text-[10px] font-black text-[#11BDDB] uppercase tracking-wider mb-1">Lugar de Recogida</div>
              <div className="font-bold text-sm flex items-center gap-2">
                <MapPin size={14} className="text-[#11BDDB]" />
                {booking.hotel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conductor Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6 overflow-hidden relative">
          <div className="flex items-center gap-4">
            <div className="bg-[#11BDDB]/20 p-3 rounded-2xl">
              <User className="text-[#11BDDB]" size={24} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-[#11BDDB] uppercase tracking-wider mb-1">Tu Conductor</div>
              <div className="font-bold text-lg">{booking.driver_name || 'Pendiente de asignar'}</div>
              {booking.car_model && <div className="text-xs text-gray-500">{booking.car_model}</div>}
            </div>
            {booking.driver_phone && (
              <a href={`https://wa.me/${booking.driver_phone.replace(/\D/g,'')}`} className="bg-[#25D366] p-3 rounded-2xl shadow-lg shadow-[#25D366]/20">
                <MessageCircle size={24} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Pagos Card Historial */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6">
          <h3 className="text-xs font-black text-[#11BDDB] uppercase tracking-widest mb-4 flex items-center gap-2">
            <CreditCard size={14} /> Historial de Pagos
          </h3>
          
          <div className="space-y-3 mb-6">
            {payments.map((p) => (
              <div key={p.id} className="flex justify-between items-center text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <div className="font-black text-gray-300">{p.payment_method}</div>
                  <div className="text-[9px] text-gray-500">
                    {new Date(p.payment_date).toLocaleDateString('es-ES')} · {new Date(p.payment_date).toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'})}
                  </div>
                </div>
                <div className="font-black text-green-500">+{parseFloat(p.amount).toFixed(2)} €</div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-xs text-gray-500">Precio Total</span>
              <span className="font-black text-sm">{parseFloat(booking.total_price).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-white">Pendiente</span>
              <span className="text-xl font-black text-[#11BDDB]">{due.toFixed(2)} €</span>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-2xl text-[10px] text-primary font-bold leading-relaxed text-center italic border border-primary/10">
            {due <= 0 ? "¡Tu reserva está totalmente pagada! Disfruta el viaje." : "El pago restante se realiza directamente al conductor el día del tour o vía transferencia."}
          </div>
        </motion.div>

        {/* Feedback / Review */}
        {isExpired && (
          <motion.a 
            href="https://cantiktours.com/reviews"
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-[#11BDDB] to-[#0ea5be] w-full p-6 rounded-3xl flex flex-col items-center text-center shadow-2xl shadow-[#11BDDB]/20 border border-white/10"
          >
            <Star className="text-white mb-2" size={32} fill="white" />
            <h4 className="font-black text-lg">¿Qué te ha parecido el viaje?</h4>
            <p className="text-xs text-white/80 font-bold">Tu reseña nos ayuda a seguir creciendo</p>
          </motion.a>
        )}

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[3px]">Bali · Indonesia</p>
        </div>
      </div>
    </div>
  );
}
