import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, Star, CheckCircle2, ShieldCheck, Info,
  Heart, Sun, Moon, Plane, Copy, ExternalLink,
  Clock, MapPin, Coffee, Camera, Waves, Map
} from 'lucide-react';
import { getItinerary } from '../services/api';
import { useTranslation } from 'react-i18next';
import { tours } from '../data/tours';

const SUPPORT_PHONE_ES = '34642517787';

// Safe date parser — avoids timezone shift issues with ISO strings
function parseLocalDate(str) {
  if (!str) return null;
  const parts = String(str).split('T')[0].split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export default function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const rawRef = searchParams.get('ref') || '';
  const ref = rawRef.replace(/^CT-/, '');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [statusExpanded, setStatusExpanded] = useState(false);

  useEffect(() => {
    if (!ref) { setError('Referencia no válida'); setLoading(false); return; }
    const fetch_ = async () => {
      try {
        const data = await getItinerary(ref);
        if (data && data.status === 'success') setBooking(data.data);
        else setError('Reserva no encontrada');
      } catch { setError('Error al cargar'); }
      finally { setLoading(false); }
    };
    fetch_();
  }, [ref]);

  const dark = darkMode;
  const bg    = dark ? 'bg-[#0a0a0a]' : 'bg-gray-100';
  const text  = dark ? 'text-white'   : 'text-gray-900';
  const sub   = dark ? 'text-gray-500' : 'text-gray-500';
  const card  = dark ? 'bg-[#141414] border-white/5'  : 'bg-white border-gray-200';
  const cardAlt = dark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200';
  const notchBg = dark ? '#0a0a0a' : '#f3f4f6';

  if (loading) return (
    <div className={`min-h-screen ${bg} flex items-center justify-center`}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-12 h-12 border-t-2 border-primary rounded-full" />
    </div>
  );

  if (error || !booking) return (
    <div className={`min-h-screen ${bg} ${text} flex flex-col items-center justify-center p-6 text-center`}>
      <div className="bg-red-500/10 p-10 rounded-[2.5rem] border border-red-500/20 mb-8 max-w-md">
        <Info size={48} className="text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-black mb-3">{error || 'Reserva no encontrada'}</h2>
        <p className="text-gray-400 font-bold leading-relaxed">Verifica el enlace recibido por WhatsApp.</p>
      </div>
      <Link to="/" className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black shadow-xl shadow-primary/20 uppercase tracking-widest text-xs">Volver al Inicio</Link>
    </div>
  );

  // ── Date ────────────────────────────────────────────────────
  const tourDate = parseLocalDate(booking.booking_date);
  const isExpired = tourDate ? tourDate < new Date() : false;
  const en = i18n.language === 'en';

  const dateStr = tourDate
    ? tourDate.toLocaleDateString(en ? 'en-US' : 'es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    : (en ? 'Date pending' : 'Fecha pendiente');
  const dayNum   = tourDate ? String(tourDate.getDate()).padStart(2, '0') : '--';
  const monthStr = tourDate ? tourDate.toLocaleDateString(en ? 'en-US' : 'es-ES', { month: 'short' }).toUpperCase() : '---';
  const yearStr  = tourDate ? tourDate.getFullYear() : '----';

  // ── 5-step status flow ──────────────────────────────────────────
  const statusMap = {
    requested:        { step: 1, label: en ? 'REQUEST RECEIVED'          : 'SOLICITUD RECIBIDA',            desc: en ? 'We have received your request and will contact you shortly.' : 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo muy pronto.', color: 'text-amber-400',   bg_: 'bg-amber-400/10' },
    pending_payment:  { step: 2, label: en ? 'PAYMENT PENDING'            : 'PAGO PENDIENTE',                desc: en ? 'We sent payment details via WhatsApp. Please transfer to secure your spot.' : 'Te hemos enviado los datos de pago por WhatsApp. Realiza la transferencia para asegurar tu plaza.', color: 'text-orange-400',  bg_: 'bg-orange-400/10' },
    payment_sent:     { step: 2, label: en ? 'PAYMENT PENDING'            : 'PAGO PENDIENTE',                desc: en ? 'We sent payment details via WhatsApp. Please transfer to secure your spot.' : 'Te hemos enviado los datos de pago por WhatsApp. Realiza la transferencia para asegurar tu plaza.', color: 'text-orange-400',  bg_: 'bg-orange-400/10' },
    payment_received: { step: 3, label: en ? 'PAYMENT CONFIRMED'          : 'PAGO CONFIRMADO',               desc: en ? 'Payment received! Thank you. We are now preparing your experience.' : '¡Pago recibido! Gracias. Estamos preparando tu experiencia.', color: 'text-primary',     bg_: 'bg-primary/10' },
    payment_confirmed:{ step: 3, label: en ? 'PAYMENT CONFIRMED'          : 'PAGO CONFIRMADO',               desc: en ? 'Payment received! Thank you. We are now preparing your experience.' : '¡Pago recibido! Gracias. Estamos preparando tu experiencia.', color: 'text-primary',     bg_: 'bg-primary/10' },
    verifying_payment:{ step: 3, label: en ? 'PAYMENT CONFIRMED'          : 'PAGO CONFIRMADO',               desc: en ? 'Payment received! Thank you. We are now preparing your experience.' : '¡Pago recibido! Gracias. Estamos preparando tu experiencia.', color: 'text-primary',     bg_: 'bg-primary/10' },
    reserved:         { step: 4, label: en ? 'CONFIRMING AVAILABILITY'    : 'RATIFICANDO DISPONIBILIDAD',    desc: en ? 'Coordinating with our local Bali team to ensure every detail is perfect.' : 'Estamos coordinando con nuestro equipo local en Bali para asegurar todos los detalles.', color: 'text-primary',     bg_: 'bg-primary/10' },
    confirmed:        { step: 5, label: en ? 'TOUR CONFIRMED'             : 'TOUR CONFIRMADO',               desc: en ? 'See you in Bali! Everything is ready for your adventure.' : '¡Nos vemos en Bali! Todo está listo para tu aventura.', color: 'text-emerald-400', bg_: 'bg-emerald-400/10' },
    in_progress:      { step: 6, label: en ? 'TOUR IN PROGRESS'           : 'TOUR EN CURSO',                 desc: en ? 'Your tour is underway! Enjoy every moment in Bali.' : '¡Tu tour está en marcha! Disfruta cada momento en Bali.', color: 'text-primary',     bg_: 'bg-primary/10' },
    completed:        { step: 7, label: en ? 'COMPLETED'                  : 'TOUR FINALIZADO',               desc: en ? 'We hope it was an unforgettable experience. Thank you for choosing Cantik Tours!' : '¡Esperamos que haya sido una experiencia inolvidable. Gracias por confiar en Cantik Tours!', color: 'text-gray-400',   bg_: 'bg-white/5' },
    postponed:        { step: 1, label: en ? 'POSTPONED'                  : 'TOUR POSPUESTO',                desc: en ? 'Your tour has been postponed. Please contact us for new dates.' : 'Tu tour ha sido pospuesto. Contacta con nosotros para acordar nuevas fechas.', color: 'text-indigo-400', bg_: 'bg-indigo-400/10' },
    cancelled:        { step: 0, label: en ? 'CANCELLED'                  : 'CANCELADO',                     desc: en ? 'This booking has been cancelled.' : 'Esta reserva ha sido cancelada.', color: 'text-red-400',    bg_: 'bg-red-400/10' },
    refunded:         { step: 0, label: en ? 'REFUNDED'                   : 'REEMBOLSADO',                   desc: en ? 'Your payment has been refunded.' : 'Tu pago ha sido reembolsado.', color: 'text-pink-400',   bg_: 'bg-pink-400/10' },
  };

  const priceLabel = booking.payment_status === 'confirmed' ? (en ? 'Total Paid' : 'Total Pagado') : (en ? 'Estimated Total' : 'Total Estimado');
  const status = statusMap[booking.payment_status] || statusMap.requested;

  // ── Experience ────────────────────────────────────────────────
  const expType = booking.experience_tier
    || (booking.tour_title?.toLowerCase().includes('elite') ? 'elite'
      : booking.tour_title?.toLowerCase().includes('comfort') ? 'comfort' : 'economy');
  const expLabel = expType === 'economy' ? 'S' : expType === 'comfort' ? 'M' : 'L';
  const expName  = expType === 'economy' ? (en ? 'Local Driver' : 'Conductor Local')
    : expType === 'comfort' ? (en ? 'Local Guide' : 'Guía Local') : (en ? 'Elite Guide' : 'Guía Elite');
  const expColor = expType === 'economy' ? '#9ca3af' : expType === 'comfort' ? '#11BDDB' : '#D4AF37';

  const fichaUrl = `https://cantiktours.com/booking?ref=CT-${ref}`;
  const supportMsg = encodeURIComponent(
    `Hola Cantik Tours! Necesito ayuda con mi solicitud CT-${ref}.\n\nFicha: ${fichaUrl}`
  );

  const currentStep = status.step;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fichaUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Full lifecycle steps
  const steps = [
    { done: status.step >= 1, text: en ? 'Request received'                  : 'Solicitud recibida' },
    { done: status.step >= 2, text: en ? 'Payment pending'                   : 'Pago pendiente' },
    { done: status.step >= 3, text: en ? 'Payment confirmed'                 : 'Pago confirmado' },
    { done: status.step >= 4, text: en ? 'Confirming availability'           : 'Ratificando disponibilidad con el equipo local' },
    { done: status.step >= 5, text: en ? 'Tour confirmed — See you in Bali!' : 'Tour confirmado — ¡Nos vemos en Bali!' },
    { done: status.step >= 6, text: en ? 'Tour in progress'                  : 'Tour en curso' },
    { done: status.step >= 7, text: en ? 'Completed — Thank you!'            : 'Finalizado — ¡Gracias!' },
  ];

  // ── Resolved Itinerary ───────────────────────────────────────
  const tourData = tours.find(t => t.id === booking.tour_id) || tours.find(t => t.title === booking.tour_title);
  
  // If we have selected_stops, we use those for the 'visit' parts
  const customStops = booking.selected_stops ? booking.selected_stops.split(',').map(s => s.trim()) : [];
  
  const displayItinerary = tourData?.itinerary ? [...tourData.itinerary] : [];
  
  // If it's a flexible tour or has custom stops, we might want to show them
  // For now, let's just use the tour's default itinerary if available,
  // but if it's 'ubud-flexible', we build it from customStops.
  let finalItinerary = displayItinerary;
  
  if (customStops.length > 0) {
    const pickup = displayItinerary.find(i => i.type === 'pickup') || { type: 'pickup', duration: '08:30', activity: 'Recogida en hotel', activity_en: 'Hotel pickup', desc: en ? 'Picking you up at your accommodation.' : 'Comenzamos el día recogiéndote en tu alojamiento.' };
    const dropoff = displayItinerary.find(i => i.type === 'dropoff') || { type: 'dropoff', duration: '17:00', activity: 'Regreso al hotel', activity_en: 'Return to hotel', desc: en ? 'End of the day.' : 'Fin de la jornada.' };
    
    const defaultStopsStr = displayItinerary.filter(i => i.type === 'visit').map(i => i.activity).join(', ');
    const customStopsStr = customStops.join(', ');
    
    // For flexible or if admin manually changed stops, we show the custom sequence
    if (booking.tour_id === 'ubud-flexible' || defaultStopsStr !== customStopsStr) {
      finalItinerary = [
        pickup,
        ...customStops.map(s => {
          // Try to find if this stop exists in the tour data to get more info (like desc)
          const originalStop = displayItinerary.find(i => i.activity === s || i.activity_en === s);
          return {
            type: 'visit',
            activity: s,
            activity_en: s,
            desc: originalStop?.desc || '',
            desc_en: originalStop?.desc_en || '',
            duration: originalStop?.duration || ''
          };
        }),
        dropoff
      ];
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'pickup':  return <Plane size={14} className="rotate-90 text-primary" />;
      case 'visit':   return <MapPin size={14} className="text-primary" />;
      case 'food':    return <Coffee size={14} className="text-primary" />;
      case 'photo':   return <Camera size={14} className="text-primary" />;
      case 'beach':   return <Waves size={14} className="text-primary" />;
      case 'dropoff': return <Plane size={14} className="-rotate-90 text-primary" />;
      default:        return <Map size={14} className="text-primary" />;
    }
  };

  return (
    <div className={`min-h-screen ${bg} ${text} font-sans pb-24 overflow-x-hidden transition-colors duration-300`}>

      {/* Navbar */}
      <div className={`sticky top-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-xl border-b ${dark ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-white/80 border-gray-200'}`}>
        <Link to="/" className="flex items-center gap-2">
          <span className="font-black text-primary text-sm tracking-widest uppercase">Cantik</span>
          <span className={`font-black text-sm tracking-widest uppercase ${sub}`}>Tours</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${dark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-gray-300 text-gray-500'}`}
          >
            {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? (en ? 'Copied!' : '¡Copiado!') : (en ? 'Share' : 'Copiar enlace')}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${dark ? 'border-white/10 text-gray-400' : 'border-gray-300 text-gray-500'}`}
          >
            {dark ? <Sun size={12} /> : <Moon size={12} />}
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-10 space-y-5">

        {/* ── BOARDING PASS ─────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>

          {/* Strip + fields */}
          <div className={`rounded-t-[2.5rem] overflow-hidden shadow-2xl ${dark ? 'shadow-black/50' : 'shadow-gray-300/80'}`}>

            {/* Header strip */}
            <div className="bg-primary px-8 pt-8 pb-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '8px 8px' }} />
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div>
                  <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">
                    {en ? 'BOARDING PASS' : 'TARJETA DE EMBARQUE'}
                  </div>
                  <div className="text-white font-black text-2xl tracking-tight uppercase">{booking.client_name}</div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${status.bg_} ${status.color}`}>
                  {status.label}
                </div>
              </div>

              {/* FROM → TO */}
              <div className="flex items-center justify-between relative z-10">
                <div className="text-center">
                  <div className="text-4xl font-black text-white tracking-tighter">HOME</div>
                  <div className="text-[8px] text-white/50 font-bold uppercase tracking-widest mt-1">{en ? 'Origin' : 'Origen'}</div>
                </div>
                <div className="flex-1 flex flex-col items-center px-4 gap-1">
                  <Plane size={18} className="text-white/70 rotate-90" />
                  <div className="w-full h-px bg-white/20" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-white tracking-tighter">DPS</div>
                  <div className="text-[8px] text-white/50 font-bold uppercase tracking-widest mt-1">UBUD · BALI</div>
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 py-6`}>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                {[
                  { label: en ? 'DATE' : 'FECHA',       val: `${dayNum} ${monthStr} ${yearStr}` },
                  { label: en ? 'PASSENGERS' : 'PAX',   val: `${booking.pax} PAX` },
                  { label: en ? 'CLASS' : 'CLASE',      val: `${expLabel} · ${expName}`, style: { color: expColor } },
                  { label: en ? 'GATE / PICKUP' : 'RECOGIDA', val: booking.hotel },
                  { label: en ? 'BOARDING' : 'HORA',    val: booking.pickup_time || (en ? 'TBD' : 'Por confirmar') },
                  { label: priceLabel, val: `${parseFloat(booking.total_price).toFixed(0)}€`, style: { color: '#11BDDB' } },
                ].map((f, i) => (
                  <div key={i}>
                    <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${sub}`}>{f.label}</div>
                    <div className={`font-black text-sm ${text} truncate`} style={f.style}>{f.val}</div>
                  </div>
                ))}
              </div>

              <div className={`mt-5 pt-5 border-t ${dark ? 'border-white/5' : 'border-gray-100'}`}>
                <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${sub}`}>
                  {en ? 'TOUR' : 'EXPERIENCIA'}
                </div>
                <div className={`font-black text-sm ${text} uppercase tracking-tight leading-snug`}>{booking.tour_title}</div>
              </div>
            </div>

            {/* Perforated divider */}
            <div className={`relative h-8 flex items-center ${dark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
              <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
              <div className={`w-full mx-6 border-t-2 border-dashed ${dark ? 'border-white/10' : 'border-gray-200'}`} />
            </div>

            {/* Stub */}
            <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 py-6 rounded-b-[2.5rem] flex items-center justify-between gap-6`}>
              <div>
                <div className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 ${sub}`}>
                  {en ? 'BOOKING REF' : 'REFERENCIA'}
                </div>
                <div className="font-mono font-black text-xl tracking-widest text-primary">CT-{ref}</div>
              </div>

              {/* Mini status progress */}
              <div 
                className="text-right space-y-2 cursor-pointer group"
                onClick={() => setStatusExpanded(!statusExpanded)}
              >
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${status.bg_} ${status.color} group-hover:opacity-80 transition-opacity`}>
                  <CheckCircle2 size={11} /> {status.label}
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-2">
                  {[1,2,3,4,5,6,7].map(s => (
                    <div key={s} className={`w-1.5 h-1.5 rounded-full transition-all ${status.step >= s ? 'bg-primary' : dark ? 'bg-white/10' : 'bg-gray-200'}`} />
                  ))}
                </div>
                <div className={`text-[8px] font-bold tracking-widest uppercase mt-1 ${sub}`}>
                  {statusExpanded ? (en ? 'HIDE TIMELINE' : 'OCULTAR ESTADOS') : (en ? 'SHOW TIMELINE' : 'VER ESTADOS')}
                </div>
              </div>
            </div>

            {/* Expandable Status Timeline */}
            {statusExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`mt-4 ${dark ? 'bg-[#1a1a1a]' : 'bg-white'} p-6 rounded-[2rem] shadow-xl ${dark ? 'shadow-black/50' : 'shadow-gray-300/80'}`}
              >
                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${sub}`}>
                  {en ? 'Booking Timeline' : 'Línea de tiempo de la reserva'}
                </div>
                <div className="space-y-6 relative">
                  <div className={`absolute top-2 bottom-2 left-2 w-0.5 ${dark ? 'bg-white/5' : 'bg-gray-100'} z-0`} />
                  {[
                    statusMap.requested, 
                    statusMap.pending_payment, 
                    statusMap.payment_received, 
                    statusMap.reserved, 
                    statusMap.confirmed,
                    statusMap.in_progress,
                    statusMap.completed
                  ].map((st, i) => {
                    const isPast = st.step <= currentStep;
                    const isCurrent = st.step === currentStep;
                    return (
                      <div key={i} className="flex gap-4 relative z-10">
                        <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${isCurrent ? 'bg-primary shadow-[0_0_10px_rgba(17,189,219,0.5)]' : (isPast ? 'bg-primary/50' : (dark ? 'bg-white/10' : 'bg-gray-200'))}`} />
                        <div>
                          <div className={`text-xs font-black uppercase tracking-widest ${isPast ? 'text-primary' : sub}`}>{st.label}</div>
                          <div className={`text-[10px] mt-1 leading-relaxed ${isCurrent ? text : sub}`}>{st.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>

        {/* ── DETAILED ITINERARY ────────────────────────── */}
        {finalItinerary.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
            className={`rounded-[2.5rem] p-8 shadow-2xl ${card}`}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black tracking-tight uppercase">
                  {en ? 'Detailed Itinerary' : 'Itinerario Detallado'}
                </h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${sub}`}>
                  {en ? 'Your planned route' : 'Tu ruta planificada'}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${dark ? 'bg-white/5' : 'bg-primary/5'}`}>
                <Map className="text-primary" size={20} />
              </div>
            </div>

            <div className="space-y-8 relative">
              {/* Connector line */}
              <div className={`absolute top-4 bottom-4 left-[1.125rem] w-px border-l border-dashed ${dark ? 'border-white/10' : 'border-gray-200'}`} />

              {finalItinerary.map((item, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center z-10 transition-colors shadow-sm ${dark ? 'bg-[#1a1a1a] border border-white/5' : 'bg-white border border-gray-100'}`}>
                    {getActivityIcon(item.type)}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="text-xs font-black uppercase tracking-widest">{en ? (item.activity_en || item.activity) : item.activity}</h4>
                      {item.duration && (
                        <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter ${sub}`}>
                          <Clock size={10} />
                          {en ? (item.duration_en || item.duration) : item.duration}
                        </div>
                      )}
                    </div>
                    <p className={`text-[11px] leading-relaxed font-medium ${sub}`}>
                      {en ? (item.desc_en || item.desc) : item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-10 p-5 rounded-2xl border border-dashed ${dark ? 'border-white/10 bg-white/5' : 'border-primary/20 bg-primary/5'}`}>
              <div className="flex gap-4">
                <Info size={16} className="text-primary flex-shrink-0" />
                <p className="text-[10px] font-bold leading-relaxed text-gray-500">
                  {en 
                    ? 'Our tours are private and flexible. You can adjust the order or duration of stops directly with your guide.' 
                    : 'Nuestros tours son privados y flexibles. Puedes ajustar el orden o la duración de las paradas directamente con tu guía.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}



        {/* ── TRUST ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className={`rounded-[2rem] p-6 border ${cardAlt} text-center`}>
          <Heart size={16} className="text-primary mx-auto mb-3" />
          <p className={`text-[10px] font-bold leading-relaxed ${sub} italic`}>
            {en ? 'Every booking funds local guides and their families — fair pay, no delays.'
              : 'Cada reserva financia directamente a nuestros guías y sus familias — pago justo, sin demoras.'}
          </p>
          <div className={`flex items-center justify-center gap-2 mt-3 ${sub}`}>
            <ShieldCheck size={11} className="text-emerald-500" />
            <span className="text-[8px] font-black uppercase tracking-widest">
              {en ? 'Free cancellation 48h before' : 'Cancelación gratuita 48h antes'}
            </span>
          </div>
        </motion.div>

        {/* Post-tour review */}
        {isExpired && (
          <motion.a href={`https://cantiktours.com/reviews?ref=${ref}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`block rounded-[2rem] p-10 border ${card} text-center hover:border-primary/30 transition-all`}>
            <Star className="text-primary mb-3 mx-auto" size={28} />
            <h4 className={`font-black text-lg uppercase tracking-tight mb-1 ${text}`}>
              {en ? 'Share Your Experience' : 'Comparte tu Experiencia'}
            </h4>
            <p className={`text-xs font-bold ${sub}`}>
              {en ? 'Inspire future travelers with your review.' : 'Inspira a futuros viajeros con tu reseña.'}
            </p>
          </motion.a>
        )}

        {/* ── SUPPORT / WHATSAPP ─────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className={`rounded-[2rem] p-6 border ${card} flex flex-col items-center text-center gap-4`}>
          <div className={`text-[8px] font-black uppercase tracking-[0.2em] ${sub}`}>
            {en ? 'NEED HELP OR CHANGES?' : '¿DUDAS O CAMBIOS?'}
          </div>
          <p className={`text-xs font-bold leading-relaxed ${sub} max-w-xs`}>
            {en
              ? 'Chat directly with your Bali coordinator. We reply within minutes.'
              : 'Habla directamente con tu coordinador en Bali. Respondemos en minutos.'}
          </p>
          <a href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${supportMsg}`} target="_blank" rel="noreferrer"
            className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1fb355] transition-all shadow-lg shadow-[#25D366]/20">
            <MessageCircle size={15} />
            {en ? 'Chat on WhatsApp' : 'Soporte por WhatsApp'}
          </a>
        </motion.div>

        {/* Footer */}
        <div className="pt-4 text-center opacity-20">
          <Link to="/" className={`text-[8px] font-black uppercase tracking-[1em] ${text}`}>CANTIKTOURS.COM</Link>
        </div>
      </div>
    </div>
  );
}
