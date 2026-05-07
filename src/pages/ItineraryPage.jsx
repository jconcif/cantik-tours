import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, MapPin, CreditCard, MessageCircle, ArrowLeft, Star, CheckCircle2, Clock, ShieldCheck, Ship, Info, Headphones, ExternalLink } from 'lucide-react';
import { getItinerary } from '../services/api';

const SUPPORT_PHONE_ES = '34642517787';
const SUPPORT_PHONE_ID = '6285691533356';

export default function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');
  const [booking, setBooking] = useState(null);
  const [payments, setPayments] = useState([]);
  const [charges, setCharges] = useState([]);
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
        const j = await getItinerary(ref);
        if (j.status === 'success') {
          setBooking(j.data);
          setPayments(j.payments || []);
          setCharges(j.charges || []);
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
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-[#11BDDB]/10 rounded-full flex items-center justify-center mb-8">
        <Clock className="text-[#11BDDB] animate-pulse" size={48} />
      </div>
      
      <h2 className="text-white text-3xl font-black mb-4 leading-tight">
        Estamos preparando tu <br/><span className="text-[#11BDDB]">Itinerario Personalizado</span>
      </h2>
      
      <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
        Tu reserva <span className="text-white font-bold">{ref}</span> ha sido recibida correctamente. En breves momentos podrás ver todos los detalles aquí mismo.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <a 
          href={`https://wa.me/34642517787?text=${encodeURIComponent(`Hola Cantik Tours! Estoy consultando mi itinerario con referencia ${ref} y me gustaría recibir más información.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 rounded-2xl font-black shadow-xl transition-all flex items-center justify-center gap-3 transform hover:scale-105"
        >
          <MessageCircle size={24} />
          Consultar por WhatsApp
        </a>
        
        <Link to="/" className="text-gray-500 font-bold hover:text-white transition-colors py-2">
          Volver a la web principal
        </Link>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 w-full max-w-md">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          Cantik Tours Bali · Soporte 24/7
        </p>
      </div>
    </div>
  );

  const statusMap = {
    requested: { label: 'Pago Pendiente', color: 'bg-amber-500', icon: Clock, desc: 'Recibimos tu solicitud, estamos procesándola.' },
    reserved: { label: 'Reservado', color: 'bg-blue-500', icon: Calendar, desc: 'Depósito recibido. Tu fecha está bloqueada.' },
    confirmed: { label: 'Confirmado', color: 'bg-emerald-500', icon: ShieldCheck, desc: '¡Todo listo! Chofer y logística asignados.' },
    paid: { label: 'Pago Completado', color: 'bg-green-600', icon: CheckCircle2, desc: 'Reserva totalmente pagada. ¡A disfrutar!' },
    on_tour: { label: 'En Tour', color: 'bg-purple-500', icon: Ship, desc: '¡Estás en ruta! Esperamos que lo pases genial.' },
    finished: { label: 'Finalizado', color: 'bg-gray-500', icon: Star, desc: 'Tour finalizado. ¡Gracias por confiar en nosotros!' },
    postponed: { label: 'Pospuesto', color: 'bg-indigo-500', icon: Clock, desc: 'Tu tour ha sido reprogramado para otra fecha.' },
    cancelled: { label: 'Cancelado', color: 'bg-red-500', icon: Info, desc: 'Esta reserva ha sido cancelada.' },
    refunded: { label: 'Reembolsado', color: 'bg-pink-500', icon: CreditCard, desc: 'Se ha procesado la devolución de tu pago.' }
  };

  const currentStatus = statusMap[booking?.payment_status] || statusMap.requested;
  const StatusIcon = currentStatus.icon;

  const totalPaid = payments.reduce((acc, p) => acc + parseFloat(p.amount || 0), 0);
  const totalCharges = charges.reduce((acc, c) => acc + parseFloat(c.amount || 0), 0);
  const totalOwed = parseFloat(booking?.total_price || 0) + totalCharges;
  const due = totalOwed - totalPaid;
  const isExpired = booking?.booking_date ? new Date(booking.booking_date) < new Date() : false;
  const supportMsg = encodeURIComponent(`Hola Cantik Tours! Tengo una consulta sobre mi reserva ${ref} - ${booking?.tour_title}`);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans pb-12">
      {/* Header */}
      <div className={`p-8 pb-16 rounded-b-[40px] shadow-2xl relative overflow-hidden transition-colors duration-500 ${currentStatus.color}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex justify-between items-center mb-6">
          <span className="text-white/80 font-black tracking-widest text-xs uppercase">Mi Viaje · {ref}</span>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <StatusIcon size={10} className="text-white" />
            <span className="text-[10px] font-black uppercase text-white">
              {currentStatus.label}
            </span>
          </div>
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
        
        {/* Status Timeline */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${currentStatus.color} bg-opacity-20`}>
              <StatusIcon className={`${currentStatus.color.replace('bg-', 'text-')}`} size={24} />
            </div>
            <div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Estado de tu reserva</div>
              <div className="font-black text-lg text-white mb-1">{currentStatus.label}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{currentStatus.desc}</p>
            </div>
          </div>
          
          {/* Simple Timeline visual */}
          <div className="mt-6 flex justify-between items-center px-2">
            {['requested', 'reserved', 'confirmed', 'paid'].map((s, idx) => {
              const active = Object.keys(statusMap).indexOf(booking.payment_status) >= Object.keys(statusMap).indexOf(s);
              return (
                <React.Fragment key={s}>
                  <div className={`w-3 h-3 rounded-full ${active ? 'bg-[#11BDDB]' : 'bg-gray-800'} transition-colors`} />
                  {idx < 3 && <div className={`flex-1 h-[2px] ${active ? 'bg-[#11BDDB]' : 'bg-gray-800'} mx-1`} />}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6">
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
            {booking.experience && (
              <div className="col-span-2">
                <div className="text-[10px] font-black text-[#11BDDB] uppercase tracking-wider mb-1">Experiencia</div>
                <div className="font-bold text-xs bg-[#11BDDB]/10 text-[#11BDDB] px-3 py-2 rounded-lg inline-block">{{economy:'🚗 Conductor Local (Inglés)',comfort:'🗺️ Guía Local (Inglés)',elite:'⭐ Guía Local (Español)'}[booking.experience] || booking.experience}</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Personalized Itinerary */}
        {booking.itinerary && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6">
            <h3 className="text-xs font-black text-[#11BDDB] uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin size={14} /> Itinerario Personalizado
            </h3>
            <div className="space-y-3">
              {booking.itinerary.split(',').map((stop, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#11BDDB]/10 flex items-center justify-center text-[#11BDDB] font-black text-[10px]">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-200">{stop.trim()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Conductor Card — sin botón de WSP al conductor */}
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
          </div>
        </motion.div>

        {/* Pagos + Cargos Extra */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 mb-6">
          <h3 className="text-xs font-black text-[#11BDDB] uppercase tracking-widest mb-4 flex items-center gap-2">
            <CreditCard size={14} /> Estado de Cuenta
          </h3>
          
          {/* Pagos realizados */}
          <div className="space-y-2 mb-4">
            {payments.map((p) => (
              <div key={p.id} className="flex justify-between items-center text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <div className="font-black text-gray-300">{p.payment_method}</div>
                  <div className="text-[9px] text-gray-500">
                    {new Date(p.payment_date).toLocaleDateString('es-ES')}
                    {p.notes && ` · ${p.notes}`}
                  </div>
                </div>
                <div className="font-black text-green-400">+{parseFloat(p.amount).toFixed(2)} €</div>
              </div>
            ))}
          </div>

          {/* Cargos extra al cliente */}
          {charges.length > 0 && (
            <div className="space-y-2 mb-4">
              <div className="text-[9px] font-black text-amber-400 uppercase tracking-wider mb-2">Servicios Adicionales</div>
              {charges.map((c) => (
                <div key={c.id} className="flex justify-between items-center text-xs bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
                  <div>
                    <div className="font-black text-gray-300">{c.concept}</div>
                    <div className="text-[9px] text-gray-500">{new Date(c.charge_date).toLocaleDateString('es-ES')}</div>
                  </div>
                  <div className="font-black text-amber-400">+{parseFloat(c.amount).toFixed(2)} €</div>
                </div>
              ))}
            </div>
          )}

          {/* Resumen */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-gray-500">Precio Base</span>
              <span className="font-black text-sm">{parseFloat(booking.total_price).toFixed(2)} €</span>
            </div>
            {charges.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-amber-400">+ Extras</span>
                <span className="font-black text-sm text-amber-400">+{totalCharges.toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="font-bold text-xs text-white">Saldo Pendiente</span>
              <span className={`text-xl font-black ${due > 0 ? 'text-amber-400' : 'text-green-400'}`}>{Math.max(0, due).toFixed(2)} €</span>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-2xl text-[10px] text-primary font-bold leading-relaxed text-center italic border border-primary/10 mt-4">
            {due <= 0 
              ? "¡Tu reserva está totalmente pagada! Disfruta el viaje." 
              : "El pago completo debe realizarse al menos 48 horas antes del tour."}
          </div>
        </motion.div>

        {/* Botón Soporte WSP */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider text-center mb-3">¿Necesitas ayuda?</p>
          <div className="grid grid-cols-2 gap-3">
            <a 
              href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${supportMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-black text-xs py-4 rounded-2xl hover:bg-[#25D366]/20 transition-colors"
            >
              <Headphones size={16} />
              Español / English
            </a>
            <a 
              href={`https://wa.me/${SUPPORT_PHONE_ID}?text=${supportMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-black text-xs py-4 rounded-2xl hover:bg-[#25D366]/20 transition-colors"
            >
              <Headphones size={16} />
              Indonesio / English
            </a>
          </div>
        </motion.div>

        {/* Feedback / Review */}
        {isExpired && (
          <motion.a 
            href={`https://cantiktours.com/reviews?ref=${ref}`}
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-[#11BDDB] to-[#0ea5be] w-full p-6 rounded-3xl flex flex-col items-center text-center shadow-2xl shadow-[#11BDDB]/20 border border-white/10 mb-8"
          >
            <Star className="text-white mb-2" size={32} fill="white" />
            <h4 className="font-black text-lg">¿Qué te ha parecido el viaje?</h4>
            <p className="text-xs text-white/80 font-bold">Tu reseña nos ayuda a seguir creciendo</p>
          </motion.a>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <a 
            href="https://cantiktours.com" 
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#11BDDB] font-black text-xs uppercase tracking-[3px] hover:opacity-80 transition-opacity"
          >
            <ExternalLink size={12} />
            cantiktours.com
          </a>
          <p className="text-[9px] text-gray-700 mt-1">Bali · Indonesia</p>
        </div>
      </div>
    </div>
  );
}

