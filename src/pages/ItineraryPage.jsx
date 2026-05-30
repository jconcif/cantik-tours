import LocalLink from '../components/LocalLink';
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, Star, CheckCircle2, ShieldCheck, Info,
  Heart, Sun, Moon, Plane, Copy, ExternalLink,
  Clock, MapPin, Coffee, Camera, Waves, Map, Activity, Upload
} from 'lucide-react';
import { getItinerary, submitCheckin, uploadReceipt } from '../services/api';
import { useTranslation } from 'react-i18next';
import { tours } from '../data/tours';
import { useCurrency } from '../context/CurrencyContext';

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
  const { currency, toggleCurrency, formatPrice } = useCurrency();
  const rawRef = searchParams.get('ref') || '';
  const ref = rawRef.replace(/^CT-/, '');
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [relatedBookings, setRelatedBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [charges, setCharges] = useState([]);
  const [showCheckin, setShowCheckin] = useState(false);
  const [checkinData, setCheckinData] = useState([]);
  const [submittingCheckin, setSubmittingCheckin] = useState(false);
  const [showStatusDetail, setShowStatusDetail] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [paymentTab, setPaymentTab] = useState('eur');
  const [showChecklist, setShowChecklist] = useState(false);
  const [showStatusCard, setShowStatusCard] = useState(false);

  useEffect(() => {
    if (!ref) { setError('Referencia no válida'); setLoading(false); return; }
    const fetch_ = async () => {
      try {
        const data = await getItinerary(ref);
        if (data && data.status === 'success') {
          setBooking(data.data);
          if (data.related) setRelatedBookings(data.related);
          if (data.payments) setPayments(data.payments);
          if (data.charges) setCharges(data.charges);
          
          let existingPax = [];
          try {
            const ext = typeof data.data.extras === 'string' ? JSON.parse(data.data.extras) : data.data.extras;
            if (ext && ext.passengers) existingPax = ext.passengers;
          } catch(e) {}
          
          const numPax = Math.max(1, Math.abs(parseInt(data.data.pax) || 1));
          const initCheckin = Array(numPax).fill(0).map((_, i) => existingPax[i] || { name: '', passport: '', age: '', emergency: '', medical: '' });
          setCheckinData(initCheckin);
        }
        else setError('Reserva no encontrada');
      } catch { setError('Error al cargar'); }
      finally { setLoading(false); }
    };
    fetch_();
  }, [ref]);

  useEffect(() => {
    if (booking && !loading) {
      const extraCharges = charges.reduce((sum, c) => sum + Number(c.amount), 0);
      const finalTotal = parseFloat(booking.total_price || 0) + extraCharges;
      const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
      const balance = finalTotal - totalPaid;
      const isPaymentPending = balance > 0.01 && !['cancelled', 'completed', 'refunded'].includes(booking.payment_status);
      const isReceiptSentOrVerified = ['verifying_payment', 'payment_received', 'payment_confirmed', 'reserved', 'confirmed', 'in_progress', 'completed'].includes(booking.payment_status);
      const isCheckinPending = checkinData.some(p => !p.name || !p.passport);
      const hasPending = isPaymentPending || isCheckinPending || !isReceiptSentOrVerified;
    }
  }, [loading, booking, payments, charges, checkinData]);

  const handleCheckinSubmit = async () => {
    const missing = checkinData.some(p => !(p.name || '').trim() || !(p.passport || '').trim());
    if (missing) {
      alert(i18n.language.startsWith('en') ? 'Please fill in the Full Name and Passport Number for all passengers.' : 'Por favor, completa el Nombre Completo y el Número de Pasaporte para todos los pasajeros.');
      return;
    }
    setSubmittingCheckin(true);
    try {
      await submitCheckin({ ref: booking.reference || ref, passengers: checkinData });
      alert(i18n.language.startsWith('en') ? 'Check-in saved!' : 'Check-in guardado con éxito!');
      setShowCheckin(false);
      // reload booking to get updated extras
      const data = await getItinerary(ref);
      if (data && data.status === 'success') {
        setBooking(data.data);
        if (data.payments) setPayments(data.payments);
        if (data.charges) setCharges(data.charges);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingCheckin(false);
    }
  };

  const handleReceiptUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert(i18n.language.startsWith('en') ? 'File size must be under 10MB.' : 'El archivo debe pesar menos de 10MB.');
      return;
    }

    setUploadingReceipt(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const fileData = reader.result;
        const res = await uploadReceipt(booking.id, {
          filename: file.name,
          fileData
        });

        if (res.status === 'success' && res.data) {
          setBooking(res.data);
          alert(i18n.language.startsWith('en') ? 'Receipt uploaded successfully! We are verifying your payment.' : '¡Comprobante subido con éxito! Estamos verificando tu pago.');
        } else {
          throw new Error(res.message || 'Error uploading file');
        }
      } catch (err) {
        console.error('Upload Error:', err);
        alert(i18n.language.startsWith('en') ? 'Failed to upload receipt. Please try again.' : 'Error al subir el comprobante. Por favor, vuelve a intentarlo.');
      } finally {
        setUploadingReceipt(false);
      }
    };

    reader.onerror = () => {
      alert(i18n.language.startsWith('en') ? 'Failed to read file.' : 'Error al leer el archivo.');
      setUploadingReceipt(false);
    };

    reader.readAsDataURL(file);
  };

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
      <LocalLink to="/" className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black shadow-xl shadow-primary/20 uppercase tracking-widest text-xs">Volver al Inicio</LocalLink>
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

  const priceLabel = booking.payment_status === 'confirmed' ? (en ? 'Total Paid' : 'Total Pagado') : (en ? 'Total' : 'Total');

  // ── Experience ────────────────────────────────────────────────
  const expType = booking.experience
    || booking.experience_tier
    || (booking.tour_title?.toLowerCase().includes('elite') ? 'elite'
      : booking.tour_title?.toLowerCase().includes('comfort') ? 'comfort' : 'economy');
  const expLabel = expType === 'economy' ? 'S' : expType === 'comfort' ? 'M' : 'L';
  const expName = expType === 'economy' 
    ? 'S - CONDUCTOR LOCAL (INGLES)' 
    : expType === 'comfort' 
      ? 'M - GUIA PROFESIONAL (INGLÉS)' 
      : 'L - GUIA PROFESIONAL (ESPAÑOL)';
  const expColor = '#11BDDB';

  const extraCharges = charges.reduce((sum, c) => sum + Number(c.amount), 0);
  const finalTotal = parseFloat(booking.total_price || 0) + extraCharges;
  const priceData = formatPrice(finalTotal);
  const priceVal = `${priceData.symbol}${priceData.amount}`;

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const balance = finalTotal - totalPaid;
  const hasPendingPayment = balance > 0.01 && !['cancelled', 'completed', 'refunded'].includes(booking.payment_status);
  
  const isPaymentPending = hasPendingPayment;
  // Receipt is considered verified only when there's no pending balance and status is confirmed/received
  const isReceiptSentOrVerified = !hasPendingPayment && ['verifying_payment', 'payment_received', 'payment_confirmed', 'reserved', 'confirmed', 'in_progress', 'completed'].includes(booking.payment_status);
  // Show upload button whenever there's a pending balance
  const canUploadReceipt = hasPendingPayment;
  const isCheckinPending = checkinData.some(p => !p.name || !p.passport);
  // If there's a pending balance, always show PAGO PENDIENTE regardless of payment_status
  const effectiveStatus = hasPendingPayment ? 'pending_payment' : booking.payment_status;
  const status = statusMap[effectiveStatus] || statusMap.requested;

  const fichaUrl = `https://cantiktours.com/booking?ref=CT-${ref}`;
  const supportMsg = encodeURIComponent(
    `Hola Cantik Tours! Necesito ayuda con mi solicitud CT-${ref}.\n\nFicha: ${fichaUrl}`
  );

  const receiptMsg = encodeURIComponent(
    en
      ? `Hello Cantik Tours! I have completed the bank transfer of ${formatPrice(balance).symbol}${formatPrice(balance).amount} for my booking CT-${ref}. Here is my payment receipt:\n\nLink: ${fichaUrl}`
      : `¡Hola Cantik Tours! He realizado la transferencia bancaria por ${formatPrice(balance).symbol}${formatPrice(balance).amount}, para mi reserva CT-${ref}. Aquí os comparto el comprobante de pago:\n\nFicha: ${fichaUrl}`
  );

  const handleCopy = (txt, fieldName) => {
    navigator.clipboard.writeText(txt);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const getTourCode = (id) => {
    const s = String(id || '').toLowerCase();
    if (s.includes('ubud')) return 'UBD';
    if (s.includes('lovina')) return 'LOV';
    if (s.includes('nusa')) return 'PEN';
    if (s.includes('east')) return 'EST';
    if (s.includes('south')) return 'STH';
    if (s.includes('bedugul')) return 'BDG';
    return 'CTK';
  };
  const tourCode = getTourCode(booking.tour_id);

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

  // ── Manual Override ──────────────────────────────────────────
  // If the admin has manually edited the itinerary (JSON format), use it as top priority
  if (booking.itinerary && booking.itinerary.startsWith('[')) {
    try {
      const manualItems = JSON.parse(booking.itinerary);
      if (Array.isArray(manualItems) && manualItems.length > 0) {
        finalItinerary = manualItems.map(item => ({
          type: item.type || ((item.activity || item.desc || '').toLowerCase().includes('recogida') || (item.activity || item.desc || '').toLowerCase().includes('pickup') ? 'pickup' : 
                (item.activity || item.desc || '').toLowerCase().includes('regreso') || (item.activity || item.desc || '').toLowerCase().includes('dropoff') ? 'dropoff' : 'visit'),
          duration: item.time,
          activity: item.activity || item.desc || '', // backward compatibility
          activity_en: item.activity || item.desc || '',
          desc: item.subtitle || '',
          desc_en: item.subtitle || ''
        }));
      }
    } catch(e) { /* ignore */ }
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
        <LocalLink to="/" className="flex items-center gap-2">
          <span className="font-black text-primary text-sm tracking-widest uppercase">Cantik</span>
          <span className={`font-black text-sm tracking-widest uppercase ${sub}`}>Tours</span>
        </LocalLink>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => {
              const nextLang = en ? 'es' : 'en';
              i18n.changeLanguage(nextLang);
              let newPath = location.pathname;
              if (newPath.startsWith('/es/') || newPath === '/es') {
                newPath = newPath.replace(/^\/es/, `/${nextLang}`);
              } else if (newPath.startsWith('/en/') || newPath === '/en') {
                newPath = newPath.replace(/^\/en/, `/${nextLang}`);
              } else {
                newPath = `/${nextLang}${newPath.startsWith('/') ? newPath : `/${newPath}`}`;
              }
              navigate(newPath + location.search);
            }}
            className={`flex items-center justify-center w-8 h-8 rounded-full border text-[9px] font-black tracking-widest transition-all ${dark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-gray-300 text-gray-500'}`}
          >
            {en ? 'ES' : 'EN'}
          </button>

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className={`flex items-center justify-center w-8 h-8 rounded-full border text-[9px] font-black tracking-widest transition-all ${dark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-gray-300 text-gray-500'}`}
          >
            {currency === 'EUR' ? '€' : '$'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${dark ? 'border-white/10 text-gray-400' : 'border-gray-300 text-gray-500'}`}
          >
            {dark ? <Sun size={12} /> : <Moon size={12} />}
          </button>

          <div className={`w-px h-4 mx-1 ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />

          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${dark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-gray-300 text-gray-500'}`}
          >
            {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span className="hidden sm:inline">{copied ? (en ? 'Copied!' : '¡Copiado!') : (en ? 'Share' : 'Copiar')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-10 space-y-5">

        {/* ── MULTI-DAY TABS ────────────────────────────── */}
        {relatedBookings.length > 1 && (
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            {[...relatedBookings]
              .sort((a, b) => {
                const da = parseLocalDate(a.booking_date) || new Date(0);
                const db = parseLocalDate(b.booking_date) || new Date(0);
                return da.getTime() - db.getTime();
              })
              .map((rb) => {
                const dObj = parseLocalDate(rb.booking_date);
                const formattedTabDate = dObj ? dObj.toLocaleDateString(en ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short' }) : '';
                const refCode = `CT-${(rb.reference || String(rb.id)).replace('CT-', '')}`;
                const isPast = dObj ? (() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return dObj < today;
                })() : false;
                const isTabActive = rb.id === booking.id;
                let tabClass = '';
                if (isTabActive) {
                  tabClass = isPast 
                    ? 'bg-gray-600 text-white shadow-lg' 
                    : 'bg-primary text-white shadow-lg shadow-primary/20';
                } else {
                  tabClass = isPast
                    ? (dark ? 'bg-white/5 text-gray-600 hover:bg-white/10 opacity-50' : 'bg-gray-200 text-gray-400 hover:bg-gray-300 opacity-60')
                    : (dark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-200 text-gray-500 hover:bg-gray-300');
                }
                return (
                  <button
                    key={rb.id}
                    onClick={() => navigate(`/booking?ref=${refCode}`)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${tabClass}`}
                  >
                    {refCode} {formattedTabDate ? `(${formattedTabDate})` : ''}
                  </button>
                );
              })}
          </div>
        )}

        {/* ── BOARDING PASS ─────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>

          {/* Strip + fields */}
          <div className={`rounded-t-[2.5rem] overflow-hidden shadow-2xl ${dark ? 'shadow-black/50' : 'shadow-gray-300/80'}`}>

            {/* Header strip */}
            <div className="bg-primary px-8 py-7 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '8px 8px' }} />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">
                    {en ? 'BOOKING CARD' : 'TARJETA DE RESERVA'}
                  </div>
                  <div className="text-white font-black text-2xl tracking-tight uppercase">{booking.client_name}</div>
                </div>
                <div className="font-mono font-black text-xs sm:text-sm tracking-wider text-white bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  CT-{ref}
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 py-6`}>
              <div className="grid className='grid-cols-3 gap-x-4 gap-y-5'" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.25rem 1rem' }}>
                {[
                  { label: en ? 'DATE' : 'FECHA',       val: `${dayNum} ${monthStr} ${yearStr}` },
                  { label: en ? 'PASSENGERS' : 'PAX',   val: `${booking.pax} PAX` },
                  { label: priceLabel,                  val: priceVal, style: { color: '#11BDDB' } },
                  { label: en ? 'GATE / PICKUP' : 'RECOGIDA', val: booking.hotel },
                  { label: en ? 'START TIME' : 'Hora Inicio', val: (function(){try{const ext = typeof booking.extras === 'string' ? JSON.parse(booking.extras) : (booking.extras || {}); return ext.pickup_time;}catch(e){return '';}})() || booking.pickup_time || (en ? 'TBD' : 'Por confirmar') },
                  { label: en ? 'DRIVER' : 'CHOFER',    val: booking.drivers ? booking.drivers.name : (en ? 'TBD' : 'Por confirmar') },
                ].map((f, i) => (
                  <div key={i}>
                    <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${sub}`}>{f.label}</div>
                    <div className={`font-black text-sm ${text} truncate`} style={f.style}>{f.val}</div>
                  </div>
                ))}
              </div>

              <div className={`mt-5 pt-5 border-t ${dark ? 'border-white/5' : 'border-gray-100'} flex flex-col gap-4`}>
                <div>
                  <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${sub}`}>
                    {en ? 'TOUR' : 'EXPERIENCIA'}
                  </div>
                  <div className={`font-black text-sm ${text} uppercase tracking-tight`}>
                    {booking.tour_title}
                  </div>
                </div>

                <div>
                  <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${sub}`}>
                    {en ? 'SERVICE' : 'SERVICIO'}
                  </div>
                  <div className="font-black text-[10px] uppercase tracking-widest" style={{ color: expColor }}>
                    {expName}
                  </div>
                </div>
              </div>
            </div>

            {/* Perforated divider */}
            <div className={`relative h-8 flex items-center ${dark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
              <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
              <div className={`w-full mx-6 border-t-2 border-dashed ${dark ? 'border-white/10' : 'border-gray-200'}`} />
            </div>

            {/* Stub (Detailed Itinerary) */}
            <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 py-6 rounded-b-[2.5rem] transition-all duration-300`}>
              <button
                onClick={() => setShowItinerary(!showItinerary)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <div className={`text-[8px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${sub}`}>
                  <Map className="text-primary" size={12} />
                  {en ? 'DETAILED ITINERARY' : 'ITINERARIO DETALLADO'}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${sub}`}>
                    {en ? 'Your Route' : 'Tu Ruta'}
                  </span>
                  <span className={`text-[9px] ${sub} transition-transform duration-300 ${showItinerary ? 'rotate-180' : ''}`} style={{ display: 'inline-block' }}>
                    ▼
                  </span>
                </div>
              </button>

              {showItinerary && finalItinerary.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 space-y-6 relative pt-5 border-t border-dashed border-gray-200 dark:border-white/10"
                >
                  {/* Connector line */}
                  <div className={`absolute top-6 bottom-4 left-[0.875rem] w-px border-l border-dashed ${dark ? 'border-white/10' : 'border-gray-200'}`} />

                  {finalItinerary.map((item, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center z-10 transition-colors shadow-sm ${dark ? 'bg-[#1a1a1a] border border-white/5' : 'bg-white border border-gray-100'}`}>
                        {getActivityIcon(item.type)}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest">{en ? (item.activity_en || item.activity) : item.activity}</h4>
                          {item.duration && (
                            <div className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter ${sub}`}>
                              <Clock size={8} />
                              {en ? (item.duration_en || item.duration) : item.duration}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>

        {/* ── BOOKING PROGRESS & TIMELINE CARD ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-[2rem] border shadow-xl ${card} transition-all duration-300 ${showStatusCard ? 'p-6' : 'p-5 sm:p-6'}`}
        >
          {/* Header */}
          <button
            onClick={() => setShowStatusCard(!showStatusCard)}
            className={`w-full flex flex-row items-center justify-between gap-3 text-left focus:outline-none transition-all ${
              showStatusCard 
                ? 'mb-6 pb-6 border-b border-dashed border-gray-200 dark:border-white/10' 
                : ''
            }`}
          >
            <div>
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${sub}`}>
                {en ? 'OFFICIAL STATUS' : 'ESTADO DE LA RESERVA'}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${status.step >= 5 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <h3 className={`text-xs sm:text-sm font-black uppercase tracking-widest ${text}`}>
                  {status.label}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {(isPaymentPending || isCheckinPending || !isReceiptSentOrVerified) ? (
                <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
                  {en ? 'Action Required' : 'Acción Requerida'}
                </span>
              ) : (
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                  {en ? 'Completed ✓' : 'Completado ✓'}
                </span>
              )}
              <span className={`text-[9px] ${sub} transition-transform duration-300 ${showStatusCard ? 'rotate-180' : ''}`} style={{ display: 'inline-block' }}>
                ▼
              </span>
            </div>
          </button>

          {/* Checklist Content & Timeline */}
          {showStatusCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              {/* Checklist Content */}
              <div className="space-y-4 mb-6">
                {/* Step 1: Payment */}
                <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${!isPaymentPending ? (dark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50') : (dark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100')}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${!isPaymentPending ? 'bg-emerald-500/20 text-emerald-500' : 'bg-orange-500/20 text-orange-500'}`}>
                      {!isPaymentPending ? <CheckCircle2 size={16} /> : <div className="text-xs font-black">1</div>}
                    </div>
                    <div>
                      <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                        {en ? '1. Booking Payment' : '1. Pago de Reserva'}
                      </div>
                      <div className={`text-[11px] font-bold mt-0.5 ${sub}`}>
                        {!isPaymentPending
                          ? (en ? 'Booking fully paid!' : '¡Reserva totalmente pagada!')
                          : (en 
                              ? `Remaining balance: ${formatPrice(balance).symbol}${formatPrice(balance).amount}` 
                              : `Saldo pendiente: ${formatPrice(balance).symbol}${formatPrice(balance).amount}`)}
                      </div>
                    </div>
                  </div>
                  {isPaymentPending && (
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-primary/10 hover:opacity-90"
                    >
                      {en ? 'Pay by Transfer' : 'Pagar con Transferencia'}
                    </button>
                  )}
                </div>

                {/* Step 2: Send Receipt */}
                <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${isReceiptSentOrVerified ? (dark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50') : (dark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100')}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isReceiptSentOrVerified
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : canUploadReceipt
                          ? 'bg-orange-500/20 text-orange-500'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {isReceiptSentOrVerified ? <CheckCircle2 size={16} /> : <div className="text-xs font-black">2</div>}
                    </div>
                    <div>
                      <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                        {en ? '2. Send Payment Receipt' : '2. Enviar Comprobante'}
                      </div>
                      <div className={`text-[11px] font-bold mt-0.5 ${sub}`}>
                        {isReceiptSentOrVerified
                          ? (en ? 'Receipt received and verified!' : '¡Comprobante verificado con éxito!')
                          : canUploadReceipt
                            ? (en
                                ? `Pending balance: ${formatPrice(balance).symbol}${formatPrice(balance).amount} — upload proof of payment.`
                                : `Saldo pendiente: ${formatPrice(balance).symbol}${formatPrice(balance).amount} — sube el comprobante de pago.`)
                            : (en ? 'Please send proof of payment once transferred.' : 'Envíanos el comprobante tras realizar el pago.')}
                      </div>
                    </div>
                  </div>
                  {canUploadReceipt && (
                    <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end gap-2">
                      <label className="px-4 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-primary/10 hover:opacity-90 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none">
                        {uploadingReceipt ? (
                          <>
                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{en ? 'Uploading...' : 'Subiendo...'}</span>
                          </>
                        ) : (
                          <>
                            <Upload size={12} />
                            <span>{en ? 'Upload Receipt' : 'Subir Comprobante'}</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={handleReceiptUpload}
                          disabled={uploadingReceipt}
                        />
                      </label>
                      <a
                        href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${receiptMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[9px] font-bold uppercase tracking-wider text-center underline hover:text-primary transition-all ${sub}`}
                      >
                        {en ? 'Or send via WhatsApp' : 'O enviar por WhatsApp'}
                      </a>
                    </div>
                  )}
                </div>

                {/* Step 3: Check-in */}
                <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${!isCheckinPending ? (dark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50') : (dark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100')}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${!isCheckinPending ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                      {!isCheckinPending ? <CheckCircle2 size={16} /> : <div className="text-xs font-black">3</div>}
                    </div>
                    <div>
                      <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                        {en ? '3. Passenger Check-in' : '3. Registro de Pasajeros'}
                      </div>
                      <div className={`text-[11px] font-bold mt-0.5 ${sub}`}>
                        {!isCheckinPending
                          ? (en ? 'All passengers registered!' : '¡Todos los viajeros registrados!')
                          : (en ? 'Please register passenger passports.' : 'Completa los datos y pasaportes de los viajeros.')}
                      </div>
                    </div>
                  </div>
                  {isCheckinPending && (
                    <button
                      onClick={() => setShowCheckin(true)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-primary/10 hover:opacity-90"
                    >
                      {en ? 'Complete Check-in' : 'Hacer Check-in'}
                    </button>
                  )}
                </div>
              </div>

              {/* Official Timeline */}
              <div className="pt-6 border-t border-dashed border-gray-200 dark:border-white/10">
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block`}>
                  {en ? 'Official Timeline & History' : 'Historial y Línea de Tiempo Oficial'}
                </span>

                <div className="mt-4 space-y-4 relative pl-2 pt-2">
                  <div className={`absolute top-2 bottom-2 left-[15px] w-0.5 ${dark ? 'bg-white/5' : 'bg-gray-100'} z-0`} />
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
                        <div className={`w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-all duration-500 ${isCurrent ? 'bg-primary shadow-[0_0_10px_rgba(17,189,219,0.4)]' : (isPast ? 'bg-primary/40' : (dark ? 'bg-white/5' : 'bg-gray-100'))}`}>
                          {isPast && !isCurrent && <CheckCircle2 size={6} className="text-white" />}
                          {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                        </div>
                        <div className="flex-1">
                          <div className={`text-[9px] font-black uppercase tracking-widest ${isCurrent ? 'text-primary' : isPast ? text : sub}`}>{st.label}</div>
                          {isCurrent && <div className={`text-[10px] mt-0.5 leading-relaxed font-medium ${text}`}>{st.desc}</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
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
        <motion.div 
          id="support-section"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className={`rounded-[2rem] p-8 border ${card} flex flex-col items-center text-center gap-5`}
        >
          <div className={`text-[8px] font-black uppercase tracking-[0.3em] text-primary`}>
            {en ? 'QUESTIONS OR CHANGES?' : '¿DUDAS O CAMBIOS?'}
          </div>
          <p className={`text-sm font-black leading-relaxed ${text} max-w-xs`}>
            {en
              ? 'Talk to us, we reply within minutes.'
              : 'Habla con nosotros, te respondemos en minutos.'}
          </p>
          <div className="w-full flex flex-row gap-2">
            {en ? (
              <>
                {/* English (Primary) */}
                <a 
                  href={`https://wa.me/6285691533356?text=${encodeURIComponent(`Hello Cantik Tours! I need help with my booking CT-${ref}.\n\nLink: ${fichaUrl}`)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-3 px-3 rounded-xl bg-[#25D366] text-white font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#1fb355] transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle size={14} />
                  English (EN)
                </a>
                {/* Spanish (Secondary) */}
                <a 
                  href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${supportMsg}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`flex-1 py-3 px-3 rounded-xl border font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${dark ? 'border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20' : 'border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400'}`}
                >
                  <MessageCircle size={14} />
                  Español (ES)
                </a>
              </>
            ) : (
              <>
                {/* Spanish (Primary) */}
                <a 
                  href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${supportMsg}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-3 px-3 rounded-xl bg-[#25D366] text-white font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#1fb355] transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle size={14} />
                  Español (ES)
                </a>
                {/* English (Secondary) */}
                <a 
                  href={`https://wa.me/6285691533356?text=${encodeURIComponent(`Hello Cantik Tours! I need help with my booking CT-${ref}.\n\nLink: ${fichaUrl}`)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`flex-1 py-3 px-3 rounded-xl border font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${dark ? 'border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20' : 'border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400'}`}
                >
                  <MessageCircle size={14} />
                  English (EN)
                </a>
              </>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="pt-4 text-center opacity-20">
          <LocalLink to="/" className={`text-[8px] font-black uppercase tracking-[1em] ${text}`}>CANTIKTOURS.COM</LocalLink>
        </div>
      </div>

      {/* ── CHECK-IN MODAL ─────────────────────────────── */}
      {showCheckin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 border shadow-2xl ${dark ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-gray-200'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-black uppercase tracking-widest ${text}`}>
                {en ? 'Passenger Check-In' : 'Registro de Pasajeros'}
              </h3>
              <button onClick={() => setShowCheckin(false)} className={`w-8 h-8 flex items-center justify-center rounded-full ${dark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-800'}`}>
                ✕
              </button>
            </div>

            <p className={`text-xs font-bold mb-6 ${sub}`}>
              {en ? 'Please provide the details for all passengers.' : 'Por favor, proporciona los datos de todos los viajeros.'}
            </p>

            <div className="space-y-6">
              {checkinData.map((pax, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${text}`}>
                    {en ? `Passenger ${idx + 1}` : `Pasajero ${idx + 1}`}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-[9px] font-black uppercase tracking-widest mb-1.5 ${sub}`}>
                        {en ? 'Full Name *' : 'Nombre Completo *'}
                      </label>
                      <input
                        type="text"
                        value={pax.name}
                        onChange={(e) => {
                          const nd = [...checkinData];
                          nd[idx] = { ...nd[idx], name: e.target.value };
                          setCheckinData(nd);
                        }}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${dark ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-gray-300 text-black'}`}
                        placeholder={en ? 'John Doe' : 'Juan Pérez'}
                      />
                    </div>
                    <div>
                      <label className={`block text-[9px] font-black uppercase tracking-widest mb-1.5 ${sub}`}>
                        {en ? 'Passport Number *' : 'Número de Pasaporte *'}
                      </label>
                      <input
                        type="text"
                        value={pax.passport}
                        onChange={(e) => {
                          const nd = [...checkinData];
                          nd[idx] = { ...nd[idx], passport: e.target.value };
                          setCheckinData(nd);
                        }}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${dark ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-gray-300 text-black'}`}
                        placeholder="Ej: P1234567"
                      />
                    </div>
                    <div>
                      <label className={`block text-[9px] font-black uppercase tracking-widest mb-1.5 ${sub}`}>
                        {en ? 'Age' : 'Edad'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={pax.age}
                        onChange={(e) => {
                          const nd = [...checkinData];
                          nd[idx] = { ...nd[idx], age: e.target.value };
                          setCheckinData(nd);
                        }}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${dark ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-gray-300 text-black'}`}
                        placeholder="Ej: 35"
                      />
                    </div>
                    <div>
                      <label className={`block text-[9px] font-black uppercase tracking-widest mb-1.5 ${sub}`}>
                        {en ? 'Emergency Contact' : 'Contacto de Emergencia'}
                      </label>
                      <input
                        type="text"
                        value={pax.emergency}
                        onChange={(e) => {
                          const nd = [...checkinData];
                          nd[idx] = { ...nd[idx], emergency: e.target.value };
                          setCheckinData(nd);
                        }}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${dark ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-gray-300 text-black'}`}
                        placeholder="Ej: María Pérez +34..."
                      />
                    </div>
                    <div>
                      <label className={`block text-[9px] font-black uppercase tracking-widest mb-1.5 ${sub}`}>
                        {en ? 'Medical conditions / Allergies' : 'Alergias o condiciones médicas'}
                      </label>
                      <input
                        type="text"
                        value={pax.medical}
                        onChange={(e) => {
                          const nd = [...checkinData];
                          nd[idx] = { ...nd[idx], medical: e.target.value };
                          setCheckinData(nd);
                        }}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${dark ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-gray-300 text-black'}`}
                        placeholder={en ? 'Leave blank if none' : 'Dejar en blanco si ninguna'}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleCheckinSubmit}
              disabled={submittingCheckin}
              className="w-full mt-6 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submittingCheckin ? (en ? 'SAVING...' : 'GUARDANDO...') : (en ? 'SAVE CHECK-IN' : 'GUARDAR CHECK-IN')}
            </button>
          </motion.div>
        </div>
      )}

      {/* ── PAYMENT MODAL ────────────────────────────────── */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 border shadow-2xl ${dark ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-gray-200'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-black uppercase tracking-widest ${text}`}>
                {en ? 'Transfer Details' : 'Datos de Transferencia'}
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className={`w-8 h-8 flex items-center justify-center rounded-full ${dark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-800'}`}>
                ✕
              </button>
            </div>

            <div className={`p-5 rounded-2xl border mb-6 text-center ${dark ? 'bg-orange-500/5 border-orange-500/10' : 'bg-orange-50 border-orange-200'}`}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2">
                {en ? 'AMOUNT TO PAY' : 'MONTO A PAGAR'}
              </div>
              <div className={`text-3xl font-black mb-4 ${text}`}>
                {formatPrice(balance).symbol}{formatPrice(balance).amount}
              </div>
              <div className="flex items-center justify-center gap-2 bg-black/20 dark:bg-black/40 py-2 px-4 rounded-xl max-w-xs mx-auto">
                <div className="text-left">
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                    {en ? 'REFERENCE / CONCEPT' : 'REFERENCIA / CONCEPTO'}
                  </div>
                  <div className={`text-xs font-bold ${text}`}>
                    CT-{ref}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`CT-${ref}`, 'ref')}
                  className={`ml-auto p-2 rounded-lg transition-colors ${dark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
                  title={en ? 'Copy reference' : 'Copiar referencia'}
                >
                  {copiedField === 'ref' ? (
                    <span className="text-[9px] font-black text-emerald-500 uppercase">Copied</span>
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-black/20 dark:bg-black/40 rounded-xl mb-6">
              <button
                onClick={() => setPaymentTab('eur')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${paymentTab === 'eur' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Wise EUR (IBAN)
              </button>
              <button
                onClick={() => setPaymentTab('usd')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${paymentTab === 'usd' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Wise USD (ACH/Wire)
              </button>
            </div>

            {/* Tab Contents */}
            <div className="space-y-4 mb-8">
              {paymentTab === 'eur' ? (
                <>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Name / Beneficiario</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${text}`}>Javier Ignacio Contreras Cifuentes</span>
                      <button onClick={() => handleCopy('Javier Ignacio Contreras Cifuentes', 'name')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'name' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">IBAN</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono font-bold ${text}`}>BE97 9673 8690 2549</span>
                      <button onClick={() => handleCopy('BE97 9673 8690 2549', 'iban')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'iban' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Swift / BIC</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono font-bold ${text}`}>TRWIBEB1XXX</span>
                      <button onClick={() => handleCopy('TRWIBEB1XXX', 'bic')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'bic' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Bank Name / Banco</div>
                    <div className="text-xs font-bold leading-normal text-gray-400">
                      Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Name / Beneficiario</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${text}`}>Javier Ignacio Contreras Cifuentes</span>
                      <button onClick={() => handleCopy('Javier Ignacio Contreras Cifuentes', 'name')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'name' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Account Number / Cuenta</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono font-bold ${text}`}>214247934891</span>
                      <button onClick={() => handleCopy('214247934891', 'acc')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'acc' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Routing Number / Ruteo</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono font-bold ${text}`}>101019628</span>
                      <button onClick={() => handleCopy('101019628', 'route')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'route' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Swift / BIC (Outside US)</div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono font-bold ${text}`}>TRWIUS35XXX</span>
                      <button onClick={() => handleCopy('TRWIUS35XXX', 'bic_us')} className="text-gray-400 hover:text-primary">
                        {copiedField === 'bic_us' ? <span className="text-[8px] font-bold text-emerald-500">Copied</span> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${dark ? 'bg-[#1a1a1a] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Bank Name / Banco</div>
                    <div className="text-xs font-bold leading-normal text-gray-400">
                      Wise US Inc, 108 W 13th St, Wilmington, DE, 19801, United States
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
