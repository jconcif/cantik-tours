import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, MapPin, CreditCard, MessageCircle, ArrowLeft, Star, CheckCircle2, Clock, ShieldCheck, Ship, Info, Headphones, ExternalLink } from 'lucide-react';
import { getItinerary } from '../services/api';
import { tours } from '../data/tours';
import { useTranslation } from 'react-i18next';

const SUPPORT_PHONE_ES = '34642517787';
const SUPPORT_PHONE_ID = '6285691533356';

export default function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const rawRef = searchParams.get('ref') || '';
  const ref = rawRef.replace(/^CT-/, ''); // Clean prefix if exists
  const [booking, setBooking] = useState(null);
  const [payments, setPayments] = useState([]);
  const [charges, setCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('EUR');

  useEffect(() => {
    if (!ref) {
      setError("Referencia no válida");
      setLoading(false);
      return;
    }

    const fetchItinerary = async () => {
      try {
        const data = await getItinerary(ref);
        if (data && data.status === 'success') {
          setBooking(data.data);
          setPayments(data.payments || []);
          setCharges(data.charges || []);
        } else {
          setError("Reserva no encontrada");
        }
      } catch (err) {
        setError("Error al cargar el itinerario");
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [ref]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-t-2 border-[#11BDDB] rounded-full" />
    </div>
  );

  if (error || !booking) return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-500/10 p-6 rounded-3xl border border-red-500/20 mb-8">
        <Info size={48} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black mb-2">{error || "Reserva no encontrada"}</h2>
        <p className="text-gray-400 font-bold">Por favor, verifica el enlace enviado por WhatsApp o contacta con soporte.</p>
      </div>
      <Link to="/" className="bg-[#11BDDB] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#11BDDB]/20">Volver al Inicio</Link>
    </div>
  );

  const totalPayments = payments.reduce((acc, p) => acc + parseFloat(p.amount), 0);
  const totalCharges = charges.reduce((acc, c) => acc + parseFloat(c.amount), 0);
  const due = (parseFloat(booking.total_price) + totalCharges) - totalPayments;
  const isExpired = new Date(booking.tour_date) < new Date();

  const statusMap = {
    requested: { label: i18n.language.startsWith('en') ? 'REQUESTED' : 'SOLICITADO', color: 'bg-amber-500', desc: i18n.language.startsWith('en') ? 'We have received your request.' : 'Hemos recibido tu solicitud.' },
    reserved: { label: i18n.language.startsWith('en') ? 'RESERVED' : 'RESERVADO', color: 'bg-[#11BDDB]', desc: i18n.language.startsWith('en') ? 'Your spot is saved, waiting for confirmation.' : 'Tu plaza está bloqueada, a la espera de confirmación.' },
    confirmed: { label: i18n.language.startsWith('en') ? 'CONFIRMED' : 'CONFIRMADO', color: 'bg-emerald-500', desc: i18n.language.startsWith('en') ? 'Everything is ready for your tour!' : '¡Todo listo para tu tour!' },
    paid: { label: i18n.language.startsWith('en') ? 'FULLY PAID' : 'PAGADO', color: 'bg-emerald-500', desc: i18n.language.startsWith('en') ? 'Booking fully paid. Enjoy Bali!' : 'Reserva totalmente pagada. ¡Disfruta Bali!' }
  };

  const currentStatus = statusMap[booking.payment_status] || statusMap.requested;
  const StatusIcon = currentStatus.label.includes('CONFIRMED') || currentStatus.label.includes('PAID') ? ShieldCheck : Clock;
  const supportMsg = encodeURIComponent(`Hola! Necesito ayuda con mi reserva CT-${ref}`);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-12 overflow-x-hidden">
      
      {/* Refined Header */}
      <div className="relative pt-16 pb-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#11BDDB]/10 via-transparent to-transparent opacity-30"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col items-center mb-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#11BDDB]"></div>
                <span className="text-[9px] font-black tracking-[0.2em] text-[#11BDDB] uppercase">
                  {i18n.language.startsWith('en') ? 'Official Voucher' : 'Voucher Oficial'}
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4 text-center uppercase"
            >
              {i18n.language.startsWith('en') ? <>TOUR <span className="text-[#11BDDB]">ITINERARY</span></> : <>ITINERARIO <span className="text-[#11BDDB]">DE VIAJE</span></>}
            </motion.h1>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-bold text-gray-300 tracking-tight">
                {booking.client_name}
              </p>
            </div>
          </div>

          {/* Compact Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: 'REF', val: `CT-${ref}` },
              { label: 'DATE', val: new Date(booking.booking_date).toLocaleDateString(i18n.language, { day:'2-digit', month:'short' }) },
              { label: 'PAX', val: `${booking.pax} PAX` },
              { label: 'STATUS', val: currentStatus.label, highlight: true }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${item.highlight ? 'bg-[#11BDDB] border-[#11BDDB] text-white' : 'bg-white/5 border-white/5 text-gray-400'}`}>
                <span className={`text-[8px] font-black uppercase tracking-widest block mb-1 ${item.highlight ? 'text-white/70' : 'text-[#11BDDB]'}`}>{item.label}</span>
                <div className="text-xs font-black uppercase tracking-tight">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20 pb-20">
        
        {/* Status Box - More subtle */}
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#141414] rounded-3xl p-6 shadow-xl border border-white/5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`p-3 rounded-xl ${currentStatus.color} bg-opacity-10 flex-shrink-0`}>
                <StatusIcon className={`${currentStatus.color.replace('bg-', 'text-')}`} size={20} />
              </div>
              <div>
                <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Booking Status</div>
                <div className="font-black text-sm text-white uppercase tracking-tight">{currentStatus.desc}</div>
              </div>
            </div>
            
            <div className="flex-1 max-w-xs flex justify-between items-center px-2">
              {['requested', 'reserved', 'confirmed', 'paid'].map((s, idx) => {
                const active = Object.keys(statusMap).indexOf(booking.payment_status) >= Object.keys(statusMap).indexOf(s);
                return (
                  <React.Fragment key={s}>
                    <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#11BDDB]' : 'bg-gray-800'} transition-all`} />
                    {idx < 3 && <div className={`flex-1 h-[1px] ${active ? 'bg-[#11BDDB]' : 'bg-gray-800'} mx-1`} />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Timeline */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Info Summary */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#141414] rounded-2xl p-6 border border-white/5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-2">EXPERIENCE</span>
                  <div className="font-bold text-sm text-gray-200">{booking.tour_title}</div>
                </div>
                <div>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-2">PICKUP LOCATION</span>
                  <div className="font-bold text-sm text-gray-200 truncate">{booking.hotel}</div>
                </div>
                <div>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-2">VEHICLE</span>
                  <div className="font-bold text-sm text-gray-200 uppercase tracking-tighter">{booking.car_model || 'Premium Unit'}</div>
                </div>
              </div>
            </motion.div>

            {/* ITINERARY */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#141414] rounded-[2rem] p-8 md:p-10 shadow-xl border border-white/5 relative overflow-hidden">
              <h3 className="text-[10px] font-black text-[#11BDDB] uppercase tracking-[0.3em] flex items-center gap-3 mb-12">
                <Clock size={14} /> {i18n.language.startsWith('en') ? 'Daily Timeline' : 'Cronograma'}
              </h3>

              <div className="relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-white/5"></div>
                
                <div className="space-y-10">
                  {(() => {
                    let items = [];
                    try {
                      items = JSON.parse(booking.itinerary || '[]');
                      if (!Array.isArray(items)) items = [];
                    } catch (e) {
                      // If it's not JSON, treat as plain text
                      if (booking.itinerary) {
                        items = [{ time: 'Full Day', desc: booking.itinerary }];
                      }
                    }

                    if (items.length === 0) return <p className="text-center text-gray-600 font-bold italic py-10">Preparing itinerary...</p>;
                    
                    return items.map((item, idx) => {
                      const isFirst = idx === 0;
                      return (
                        <div key={idx} className="flex gap-8 items-start group">
                          <div className="relative flex-shrink-0 z-10 pt-1.5">
                            <div className={`w-6 h-6 rounded-full ${isFirst ? 'bg-[#11BDDB]' : 'bg-[#141414]'} border border-[#11BDDB] flex items-center justify-center transition-all`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${isFirst ? 'bg-white' : 'bg-[#11BDDB]'}`}></div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-[10px] font-black text-white bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                                {item.time || 'Schedule'}
                              </span>
                              <div className="h-[1px] flex-1 bg-white/5"></div>
                            </div>
                            <h4 className="text-base font-bold text-gray-200 tracking-tight leading-snug">
                              {item.desc}
                            </h4>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-white/5 flex items-start gap-4">
                <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                <p className="text-[9px] text-gray-500 font-bold leading-relaxed">
                  {i18n.language.startsWith('en') 
                    ? 'Flexible itinerary subject to local conditions. We prioritize your comfort.' 
                    : 'Itinerario flexible sujeto a condiciones locales. Priorizamos tu comodidad.'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-8">
            
            {/* Driver */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#141414] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-5">
                <div className="bg-[#11BDDB]/10 p-3 rounded-xl border border-[#11BDDB]/20">
                  <User className="text-[#11BDDB]" size={20} />
                </div>
                <div>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Your Specialist</span>
                  <div className="font-black text-lg text-white tracking-tight uppercase">{booking.drivers?.name || 'ASSIGNING...'}</div>
                </div>
              </div>
            </motion.div>

            {/* Financials */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#141414] rounded-2xl p-6 border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[9px] font-black text-[#11BDDB] uppercase tracking-widest flex items-center gap-2">
                  <CreditCard size={14} /> Financial Summary
                </h3>
                {due <= 0 && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">Voucher Paid</span>}
              </div>
              
              <div className="space-y-3 mb-6">
                {payments.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-[11px] bg-black/20 p-3 rounded-xl border border-white/5">
                    <span className="font-bold text-gray-400">{p.payment_method}</span>
                    <span className="font-black text-emerald-400">+{parseFloat(p.amount).toFixed(2)}€</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="font-black text-[9px] text-gray-600 uppercase tracking-widest">Balance Due</span>
                <span className={`text-2xl font-black tracking-tighter ${due > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>{Math.max(0, due).toFixed(2)}€</span>
              </div>

              {due > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex gap-2 p-1 bg-black/30 rounded-xl">
                    {['EUR', 'USD'].map(curr => (
                      <button key={curr} onClick={() => setCurrency(curr)} className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${currency === curr ? 'bg-[#11BDDB] text-white shadow-lg' : 'text-gray-600'}`}>{curr}</button>
                    ))}
                  </div>

                  <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
                    <div className="group cursor-pointer" onClick={() => { navigator.clipboard.writeText(currency === 'EUR' ? 'BE97967386902549' : '101019628'); alert('Copied!'); }}>
                      <span className="text-[8px] font-black text-gray-700 uppercase block mb-1">{currency === 'EUR' ? 'IBAN' : 'ROUTING'}</span>
                      <code className="text-xs font-bold text-gray-300 block tracking-wider">{currency === 'EUR' ? 'BE97 9673 8690 2549' : '101019628'}</code>
                    </div>
                    {currency === 'USD' && (
                      <div className="group cursor-pointer" onClick={() => { navigator.clipboard.writeText('214247934891'); alert('Copied!'); }}>
                        <span className="text-[8px] font-black text-gray-700 uppercase block mb-1">ACCOUNT</span>
                        <code className="text-xs font-bold text-gray-300 block tracking-wider">2142 4793 4891</code>
                      </div>
                    )}
                    <div className="group cursor-pointer" onClick={() => { navigator.clipboard.writeText(currency === 'EUR' ? 'TRWIBEB1XXX' : 'TRWIUS35XXX'); alert('Copied!'); }}>
                      <span className="text-[8px] font-black text-gray-700 uppercase block mb-1">SWIFT / BIC</span>
                      <code className="text-xs font-bold text-gray-300 block tracking-wider">{currency === 'EUR' ? 'TRWIBEB1XXX' : 'TRWIUS35XXX'}</code>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${encodeURIComponent(`Hello! Here is the proof of payment for CT-${ref}`)}`}
                    target="_blank" rel="noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-black text-[10px] py-4 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all uppercase tracking-widest"
                  >
                    <MessageCircle size={16} /> Send Receipt
                  </a>
                </div>
              )}
            </motion.div>

            {/* Compact Support */}
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
              <Headphones size={24} className="text-[#11BDDB] mx-auto mb-3 opacity-50" />
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-3">Concierge Support</p>
              <a href={`https://wa.me/${SUPPORT_PHONE_ES}?text=${supportMsg}`} target="_blank" rel="noreferrer" className="text-[10px] font-black text-white hover:text-[#11BDDB] transition-colors underline decoration-[#11BDDB]/30 underline-offset-4">
                WHATSAPP CHAT
              </a>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        {isExpired && (
          <motion.a 
            href={`https://cantiktours.com/reviews?ref=${ref}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-12 bg-white/5 w-full p-10 rounded-[2rem] flex flex-col items-center text-center border border-white/5"
          >
            <Star className="text-[#11BDDB] mb-4 opacity-50" size={32} />
            <h4 className="font-black text-xl text-white uppercase tracking-tight">Your Feedback</h4>
            <p className="text-xs text-gray-500 font-bold mt-1">Help us maintain our 5-star service quality.</p>
          </motion.a>
        )}

        {/* Footer */}
        <div className="mt-16 text-center opacity-30">
          <a href="https://cantiktours.com" target="_blank" rel="noopener noreferrer" className="text-white font-black text-[8px] uppercase tracking-[10px]">
            CANTIKTOURS.COM
          </a>
        </div>
      </div>
    </div>
  );
}
