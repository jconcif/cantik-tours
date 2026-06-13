import LocalLink from '../components/LocalLink';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Star, CheckCircle2, ShieldCheck, Info,
  Heart, Sun, Moon, Plane, Copy, ExternalLink,
  Clock, MapPin, Coffee, Camera, Waves, Map, Activity, Upload,
  ChevronLeft, ChevronRight, CreditCard, Users
} from 'lucide-react';
import { getItinerary, submitCheckin, uploadReceipt, capturePayPalPayment, getGlobalSettings } from '../services/api';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useTranslation } from 'react-i18next';
import { tours } from '../data/tours';
import { useCurrency } from '../context/CurrencyContext';
import { useDarkMode } from '../context/DarkModeContext';

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
  const toSentenceCase = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const searchParams = useSearchParams()[0];
  const { i18n } = useTranslation();
  const { currency, toggleCurrency, formatPrice } = useCurrency();
  const { isDark: darkMode, toggleDarkMode } = useDarkMode();
  const rawRef = searchParams.get('ref') || '';
  const ref = rawRef.replace(/^CT-?/i, '').replace(/^0+/, '');
  const formatCT = (val) => 'CT-' + String(val).replace(/^CT-?/i, '').padStart(4, '0');
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };
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
  const [paymentTab, setPaymentTab] = useState('paypal');
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showStatusCard, setShowStatusCard] = useState(false);
  const [showStatusAlert, setShowStatusAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('ticket');
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const [pushNotification, setPushNotification] = useState(null);
  const [globalSettings, setGlobalSettings] = useState(null);
  const [showTimelineDetails, setShowTimelineDetails] = useState(false);
  const [showNextStepAlert, setShowNextStepAlert] = useState(true);
  const [showWhatHappens, setShowWhatHappens] = useState(false);

  useEffect(() => {
    getGlobalSettings().then(res => {
      if (res.data) setGlobalSettings(res.data);
    }).catch(err => console.error(err));
  }, []);

  const [transitionedToPending, setTransitionedToPending] = useState(false);

  useEffect(() => {
    if (booking && booking.payment_status === 'requested') {
      const timer = setTimeout(() => {
        setTransitionedToPending(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [booking]);

  const en = i18n.language === 'en';
  const extraCharges = charges.reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const finalTotal = parseFloat(booking?.total_price || 0) + extraCharges;
  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const balance = finalTotal - totalPaid;
  const hasPendingPayment = booking ? (balance > 0.01 && !['cancelled', 'completed', 'refunded'].includes(booking.payment_status)) : false;
  const isCheckinPending = checkinData.some(p => !p.name || !p.passport);
  const effectiveStatus = !booking
    ? 'requested'
    : (booking.payment_status === 'verifying_payment')
      ? 'verifying_payment'
      : (balance <= 0.01 && ['requested', 'pending_payment'].includes(booking.payment_status))
        ? 'payment_received'
        : (booking.payment_status === 'requested' && !transitionedToPending)
          ? 'requested'
          : hasPendingPayment 
            ? 'pending_payment' 
            : booking.payment_status;

  let nextStepText = '';
  if (booking) {
    if (effectiveStatus === 'pending_payment' || effectiveStatus === 'payment_sent' || effectiveStatus === 'requested') {
      nextStepText = en 
        ? 'Next Step: 💸 Make the payment to secure your booking.' 
        : 'Próximo paso: 💸 Realizar pago para asegurar tu plaza.';
    } else if ((effectiveStatus === 'payment_received' || effectiveStatus === 'payment_confirmed') && isCheckinPending) {
      nextStepText = en 
        ? 'Next Step: 🪪 Complete traveler details in the form below.' 
        : 'Próximo paso: 🪪 Completar datos de viajeros.';
    } else if (effectiveStatus === 'verifying_payment') {
      nextStepText = en 
        ? 'Next Step: 🔍 Waiting for payment verification by our team.' 
        : 'Próximo paso: 🔍 Esperar validación del pago por nuestro equipo.';
    } else if (effectiveStatus === 'confirmed' || effectiveStatus === 'reserved') {
      nextStepText = en 
        ? 'Next Step: 🚗 Wait for professional driver coordination.' 
        : 'Próximo paso: 🚗 Esperar asignación y detalles del chofer.';
    } else if (effectiveStatus === 'in_progress') {
      nextStepText = en 
        ? 'Next Step: 🎒 Enjoy your unforgettable experience in Bali!' 
        : 'Próximo paso: 🎒 ¡Disfrutar de tu experiencia inolvidable en Bali!';
    } else if (effectiveStatus === 'completed') {
      nextStepText = en 
        ? 'Next Step: ⭐ Share your feedback with a review!' 
        : 'Próximo paso: ⭐ Compartir tu experiencia con una reseña!';
    }
  }

  const hasShownNotification = useRef(false);
  const managementRef = useRef(null);

  useEffect(() => {
    if (booking && !loading && !hasShownNotification.current && globalSettings) {
      const pushTimer = setTimeout(() => {
        const notifications = globalSettings.notifications || {};
        
        // Event triggers mapped from configuration matrix
        const showDriverAssigned = notifications.confirmado?.notificacion !== false;
        const showConfirmed = notifications.confirmado?.notificacion !== false || notifications.pago_validado?.notificacion !== false;
        const showPendingPayment = notifications.pago_pendiente?.notificacion !== false;

        // Custom notification flow matching the user's specific request
        if ((effectiveStatus === 'payment_received' || effectiveStatus === 'payment_confirmed') && isCheckinPending) {
          setPushNotification({
            title: en ? 'Payment Received! 💳' : '¡Pago Recibido Correctamente! 💳',
            body: en 
              ? 'Next step: 🪪 Complete traveler details in the form below.' 
              : 'Próximo paso: 🪪 Completar datos de viajeros.'
          });
          hasShownNotification.current = true;
        } else if (booking.drivers && showDriverAssigned) {
          setPushNotification({
            title: en ? 'Driver Assigned 🚗' : 'Chofer Asignado 🚗',
            body: en 
              ? `Your driver ${booking.drivers.name} has been assigned. Next step: 🎒 Enjoy your tour!`
              : `Tu chofer ${booking.drivers.name} ha sido asignado. Próximo paso: 🎒 ¡Disfrutar de tu tour!`
          });
          hasShownNotification.current = true;
        } else if ((booking.payment_status === 'confirmed' || booking.payment_status === 'payment_confirmed') && showConfirmed) {
          setPushNotification({
            title: en ? 'Booking Confirmed ✓' : 'Reserva Confirmada ✓',
            body: en 
              ? 'Your booking is active and all payments are successfully validated. Next step: 🚗 Coordinator details.' 
              : 'Tu reserva está activa y todos los pagos han sido validados con éxito. Próximo paso: 🚗 El chofer coordinará la recogida.'
          });
          hasShownNotification.current = true;
        } else if (balance > 0.01 && showPendingPayment) {
          setPushNotification({
            title: en ? 'Request Received 🌴' : '¡Solicitud Recibida! 🌴',
            body: en 
              ? `Pending: ${formatPrice(balance).symbol}${formatPrice(balance).amount}. Next step: 💸 Make payment to secure your booking.` 
              : `Saldo pendiente: ${formatPrice(balance).symbol}${formatPrice(balance).amount}. Próximo paso: 💸 Realizar pago para asegurar tu plaza.`
          });
          hasShownNotification.current = true;
        }
      }, 2000);
      return () => clearTimeout(pushTimer);
    }
  }, [booking, loading, en, balance, globalSettings, effectiveStatus, isCheckinPending]);

  useEffect(() => {
    if (pushNotification) {
      const dismissTimer = setTimeout(() => {
        setPushNotification(null);
      }, 7000);
      return () => clearTimeout(dismissTimer);
    }
  }, [pushNotification]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStatusAlert(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const [allRelatedData, setAllRelatedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!ref) { setError('Referencia no válida'); setLoading(false); return; }
    const fetch_ = async () => {
      try {
        const data = await getItinerary(ref);
        if (data && data.status === 'success') {
          // If there are related bookings, fetch all their details concurrently
          let fullDataArray = [data];
          if (data.related && data.related.length > 1) {
            const otherRefs = data.related
              .map(r => r.reference || String(r.id))
              .map(r => r.replace(/^CT-/, ''))
              .filter(r => r !== ref);
            
            if (otherRefs.length > 0) {
              const otherPromises = otherRefs.map(r => getItinerary(r).catch(() => null));
              const others = await Promise.all(otherPromises);
              const validOthers = others.filter(o => o && o.status === 'success');
              fullDataArray = [...fullDataArray, ...validOthers];
              
              // Sort the full array by booking date
              fullDataArray.sort((a, b) => {
                const dateA = parseLocalDate(a.data.booking_date) || new Date(0);
                const dateB = parseLocalDate(b.data.booking_date) || new Date(0);
                return dateA.getTime() - dateB.getTime();
              });
            }
          }
          
          setAllRelatedData(fullDataArray);
          
          // Find the index of the currently requested ref in the sorted array
          const initialIdx = fullDataArray.findIndex(d => {
            const dRef = d.data.reference || String(d.data.id);
            return dRef.replace(/^CT-/, '') === ref;
          });
          const safeIdx = initialIdx >= 0 ? initialIdx : 0;
          setCurrentIndex(safeIdx);
          
          applyBookingData(fullDataArray[safeIdx]);
        }
        else setError('Reserva no encontrada');
      } catch { setError('Error al cargar'); }
      finally { setLoading(false); }
    };
    fetch_();
  }, [ref]);

  // Auto-update (polling) every 15 seconds
  useEffect(() => {
    if (!ref || !allRelatedData.length) return;
    
    const interval = setInterval(async () => {
      try {
        const currentRef = allRelatedData[currentIndex]?.data?.reference?.replace(/^CT-/, '') || allRelatedData[currentIndex]?.data?.id;
        if (!currentRef) return;
        
        const data = await getItinerary(currentRef);
        if (data && data.status === 'success') {
          // Update the current view silently
          applyBookingData(data, true);
          setAllRelatedData(prev => {
            const arr = [...prev];
            arr[currentIndex] = data;
            return arr;
          });
        }
      } catch (e) {
        // Silent fail for polling
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [ref, allRelatedData, currentIndex]);

  const applyBookingData = (data, isPolling = false) => {
    setBooking(data.data);
    if (data.related) setRelatedBookings(data.related);
    
    const currentPayments = data.payments || [];
    const currentCharges = data.charges || [];
    setPayments(currentPayments);
    setCharges(currentCharges);
    
    const extraCharges = currentCharges.reduce((sum, c) => sum + Number(c.amount), 0);
    const finalTotal = parseFloat(data.data.total_price || 0) + extraCharges;
    const totalPaid = currentPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    const balance = finalTotal - totalPaid;
    const hasPending = balance > 0.01 && !['cancelled', 'completed', 'refunded'].includes(data.data.payment_status);
    
    if (!isPolling) {
      let existingPax = [];
      try {
        const ext = typeof data.data.extras === 'string' ? JSON.parse(data.data.extras) : data.data.extras;
        if (ext && ext.passengers) existingPax = ext.passengers;
      } catch(e) {}
      
      const numPax = Math.max(1, Math.abs(parseInt(data.data.pax) || 1));
      const initCheckin = Array(numPax).fill(0).map((_, i) => existingPax[i] || { name: '', passport: '', age: '', emergency: '', medical: '' });
      setCheckinData(initCheckin);
      
    }
  };

  const switchBooking = (direction) => {
    const newIdx = currentIndex + direction;
    if (newIdx >= 0 && newIdx < allRelatedData.length) {
      setCurrentIndex(newIdx);
      applyBookingData(allRelatedData[newIdx]);
    }
  };

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

  useEffect(() => {
    if (showPaymentModal || showCheckin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentModal, showCheckin]);



  const handleCheckinSubmit = async () => {
    const missing = checkinData.some(p => !(p.name || '').trim() || !(p.passport || '').trim() || !String(p.age || '').trim());
    if (missing) {
      showToast(i18n.language.startsWith('en') ? 'Please fill in the Full Name, Passport Number, and Age for all passengers.' : 'Por favor, completa el Nombre Completo, el Número de Pasaporte y la Edad para todos los pasajeros.', 'error');
      return;
    }
    setSubmittingCheckin(true);
    try {
      await submitCheckin({ ref: booking.reference || ref, passengers: checkinData });
      showToast(i18n.language.startsWith('en') ? 'Check-in saved!' : 'Check-in guardado con éxito!', 'success');
      setShowCheckin(false);
      // reload booking to get updated extras
      const data = await getItinerary(ref);
      if (data && data.status === 'success') {
        setBooking(data.data);
        if (data.payments) setPayments(data.payments);
        if (data.charges) setCharges(data.charges);
      }
    } catch (err) {
      showToast(err.message || 'Error', 'error');
    } finally {
      setSubmittingCheckin(false);
    }
  };

  const handleReceiptUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast(i18n.language.startsWith('en') ? 'File size must be under 10MB.' : 'El archivo debe pesar menos de 10MB.', 'error');
      return;
    }

    setUploadingReceipt(true);

    const processFile = async (fileToProcess) => {
      if (!fileToProcess.type.startsWith('image/')) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(fileToProcess);
        });
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const maxDimension = 1200;

            if (width > height) {
              if (width > maxDimension) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              }
            } else {
              if (height > maxDimension) {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            resolve(canvas.toDataURL('image/jpeg', 0.6));
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(fileToProcess);
      });
    };

    try {
      const fileData = await processFile(file);
      const res = await uploadReceipt(booking.id, {
        filename: file.name,
        fileData
      });

      if (res.status === 'success' && res.data) {
        setBooking(res.data);
        setShowPaymentModal(false);
        showToast(i18n.language.startsWith('en') ? 'Receipt uploaded successfully! We are verifying your payment.' : '¡Comprobante subido con éxito! Estamos verificando tu pago.', 'success');
      } else {
        throw new Error(res.message || 'Error uploading file');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      showToast(i18n.language.startsWith('en') ? 'Failed to upload receipt. Please try again.' : 'Error al subir el comprobante. Por favor, vuelve a intentarlo.', 'error');
    } finally {
      setUploadingReceipt(false);
    }
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
        <h2 className="text-2xl font-black mb-3">{error || (en ? 'Booking not found' : 'Reserva no encontrada')}</h2>
        <p className="text-gray-400 font-bold leading-relaxed">
          {en 
            ? 'We could not load your booking details. Please verify the link received or try again in a few moments.'
            : 'No hemos podido cargar los detalles de tu reserva. Verifica el enlace recibido o vuelve a intentarlo en unos instantes.'}
        </p>
      </div>
      <LocalLink to="/" className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black shadow-xl shadow-primary/20 uppercase tracking-widest text-xs">Volver al Inicio</LocalLink>
    </div>
  );

  // ── Date ────────────────────────────────────────────────────
  const tourDate = parseLocalDate(booking.booking_date);
  const isExpired = tourDate ? tourDate < new Date() : false;

  const dateStr = tourDate
    ? tourDate.toLocaleDateString(en ? 'en-US' : 'es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    : (en ? 'Date pending' : 'Fecha pendiente');
  const dayNum   = tourDate ? String(tourDate.getDate()).padStart(2, '0') : '--';
  const monthStr = tourDate ? tourDate.toLocaleDateString(en ? 'en-US' : 'es-ES', { month: 'short' }).toUpperCase() : '---';
  const yearStr  = tourDate ? tourDate.getFullYear() : '----';

  // ── 5-step status flow ──────────────────────────────────────────
  const statusMap = {
    requested:        { step: 1, label: en ? 'REQUEST RECEIVED'          : 'SOLICITUD RECIBIDA',            desc: en ? 'Request received. Proceed to payment to reserve.' : 'Solicitud recibida. Procede al pago para reservar.', color: 'text-amber-400',   bg_: 'bg-amber-400/10' },
    pending_payment:  { step: 2, label: en ? 'PAYMENT PENDING'            : 'PAGO PENDIENTE',                desc: en ? 'Please complete the payment to secure your spot.' : 'Realiza el pago para asegurar tu plaza.', color: 'text-orange-400',  bg_: 'bg-orange-400/10' },
    payment_sent:     { step: 2, label: en ? 'PAYMENT PENDING'            : 'PAGO PENDIENTE',                desc: en ? 'Please complete the payment to secure your spot.' : 'Realiza el pago para asegurar tu plaza.', color: 'text-orange-400',  bg_: 'bg-orange-400/10' },
    payment_received: { step: 3, label: en ? 'PAYMENT CONFIRMED'          : 'PAGO CONFIRMADO',               desc: en ? 'Receipt received. Payment validated.' : 'Comprobante recibido. Pago validado.', color: 'text-primary',     bg_: 'bg-primary/10' },
    payment_confirmed:{ step: 3, label: en ? 'PAYMENT CONFIRMED'          : 'PAGO CONFIRMADO',               desc: en ? 'Receipt received. Payment validated.' : 'Comprobante recibido. Pago validado.', color: 'text-primary',     bg_: 'bg-primary/10' },
    verifying_payment:{ step: 3, label: en ? 'VERIFYING PAYMENT'          : 'VERIFICANDO PAGO',               desc: en ? 'Receipt received. Waiting for validation.' : 'Comprobante recibido. En espera de validación.', color: 'text-amber-400',     bg_: 'bg-amber-400/10' },
    reserved:         { step: 4, label: en ? 'CONFIRMING AVAILABILITY'    : 'RATIFICANDO DISPONIBILIDAD',    desc: en ? 'Coordinating details with the team in Bali.' : 'Coordinando detalles con el equipo en Bali.', color: 'text-primary',     bg_: 'bg-primary/10' },
    confirmed:        { step: 5, label: en ? 'TOUR CONFIRMED'             : 'TOUR CONFIRMADO',               desc: en ? 'All set! Booking 100% guaranteed.' : '¡Todo listo! Reserva 100% garantizada.', color: 'text-emerald-400', bg_: 'bg-emerald-400/10' },
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

  const priceData = formatPrice(finalTotal);
  const priceVal = `${priceData.symbol}${priceData.amount}`;
  const isPaymentPending = hasPendingPayment;
  // Receipt is considered verified only when there's no pending balance and status is confirmed/received
  const isReceiptSentOrVerified = !hasPendingPayment && ['verifying_payment', 'payment_received', 'payment_confirmed', 'reserved', 'confirmed', 'in_progress', 'completed'].includes(booking.payment_status);
  // Show upload button whenever there's a pending balance
  const canUploadReceipt = hasPendingPayment;
  const status = statusMap[effectiveStatus] || statusMap.requested;

  const fichaUrl = `https://cantiktours.com/booking?ref=${formatCT(ref)}`;

  const whatsappPhone = SUPPORT_PHONE_ES;
  const supportMsg = encodeURIComponent(
    en 
      ? `Hello Cantik Tours!\nI need help with my booking.\n${fichaUrl}`
      : `Hola Cantik Tours!\nNecesito ayuda con mi reserva.\n${fichaUrl}`
  );
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${supportMsg}`;

  const receiptMsg = encodeURIComponent(
    en
      ? `Hello Cantik Tours! I have completed the bank transfer of ${formatPrice(balance).symbol}${formatPrice(balance).amount} for my booking ${ref}. Here is my payment receipt:\n\nLink: ${fichaUrl}`
      : `¡Hola Cantik Tours! He realizado la transferencia bancaria por ${formatPrice(balance).symbol}${formatPrice(balance).amount}, para mi reserva ${ref}. Aquí os comparto el comprobante de pago:\n\nFicha: ${fichaUrl}`
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

  const getStatusAlertStyles = () => {
    switch (effectiveStatus) {
      case 'pending_payment':
      case 'payment_sent':
      case 'requested':
        return {
          bg: dark ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50 border-orange-200',
          text: 'text-orange-500',
          dot: 'bg-orange-500',
          label: en ? 'Payment Pending' : 'Pago Pendiente',
          desc: en ? 'Please make the payment to secure your booking.' : 'Realiza el pago para asegurar tu plaza.'
        };
      case 'verifying_payment':
      case 'payment_received':
      case 'payment_confirmed':
      case 'reserved':
        return {
          bg: dark ? 'bg-sky-500/10 border-sky-500/30' : 'bg-sky-50 border-sky-200',
          text: 'text-sky-500',
          dot: 'bg-sky-500',
          label: en ? 'Confirming Availability' : 'Ratificando Disponibilidad',
          desc: en ? 'We are verifying the final details.' : 'Estamos verificando los últimos detalles.'
        };
      case 'confirmed':
        return {
          bg: dark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200',
          text: 'text-emerald-500',
          dot: 'bg-emerald-500',
          label: en ? 'Booking Guaranteed' : 'Reserva Confirmada',
          desc: en ? 'Booking 100% guaranteed.' : 'Reserva 100% garantizada.'
        };
      case 'in_progress':
        return {
          bg: dark ? 'bg-primary/10 border-primary/30' : 'bg-cyan-50 border-cyan-200',
          text: 'text-primary',
          dot: 'bg-primary',
          label: en ? 'Tour in Progress' : 'Tour en Curso',
          desc: en ? 'Your tour is underway! Enjoy Bali.' : '¡Tu tour está en marcha! Disfruta de Bali.'
        };
      case 'completed':
        return {
          bg: dark ? 'bg-gray-500/10 border-gray-500/30' : 'bg-gray-50 border-gray-200',
          text: 'text-gray-500',
          dot: 'bg-gray-500',
          label: en ? 'Tour Completed' : 'Tour Finalizado',
          desc: en ? 'Tour completed. Thank you!' : 'Tour finalizado. ¡Gracias!'
        };
      default:
        return {
          bg: dark ? 'bg-gray-500/10 border-gray-500/30' : 'bg-gray-50 border-gray-200',
          text: 'text-gray-500',
          dot: 'bg-gray-500',
          label: en ? 'Status Pending' : 'Estado Pendiente',
          desc: en ? 'We are processing your booking.' : 'Estamos procesando tu reserva.'
        };
    }
  };

  const statusAlert = getStatusAlertStyles();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fichaUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Helper Functions for dynamic status, progress and timeline ──
  const getProgressPercentage = () => {
    if (booking.payment_status === 'completed') return 100;
    if (booking.payment_status === 'in_progress') return 95;
    if (booking.payment_status === 'confirmed') return 85;
    if (['reserved', 'payment_received', 'payment_confirmed'].includes(booking.payment_status)) {
      return 70;
    }
    if (booking.payment_status === 'verifying_payment') return 50;
    if (!hasPendingPayment) return 70;
    if (!isCheckinPending) return 30;
    return 15;
  };

  const getStepTimestamp = (stepNum) => {
    try {
      const ext = typeof booking.extras === 'string' ? JSON.parse(booking.extras) : (booking.extras || {});
      const logs = ext.logs || [];
      
      if (stepNum === 1) return booking.created_at;
      if (stepNum === 2) return booking.created_at;
      if (stepNum === 3) {
        if (payments && payments.length > 0) {
          const dates = payments.map(p => p.created_at || p.payment_date).filter(Boolean);
          if (dates.length > 0) return dates[dates.length - 1];
        }
        const log = logs.find(l => l.text?.toLowerCase().includes('pago validado') || l.text?.toLowerCase().includes('comprobante de pago subido'));
        if (log) return log.timestamp;
      }
      if (stepNum === 4) {
        const log = logs.find(l => l.text?.toLowerCase().includes('reserved') || l.text?.toLowerCase().includes('disponibilidad'));
        if (log) return log.timestamp;
      }
      if (stepNum === 5) {
        const log = logs.find(l => l.text?.toLowerCase().includes('confirmed') || l.text?.toLowerCase().includes('chofer') || l.text?.toLowerCase().includes('driver'));
        if (log) return log.timestamp;
      }
      if (stepNum === 6) {
        const log = logs.find(l => l.text?.toLowerCase().includes('en curso') || l.text?.toLowerCase().includes('in progress'));
        if (log) return log.timestamp;
      }
      if (stepNum === 7) {
        const log = logs.find(l => l.text?.toLowerCase().includes('finalizado') || l.text?.toLowerCase().includes('completed'));
        if (log) return log.timestamp;
      }
    } catch(e) {}
    return null;
  };

  const formatStepDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate();
    const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = en ? monthsEn[date.getMonth()] : monthsEs[date.getMonth()];
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return en ? `${month} ${day} · ${hours}:${minutes}` : `${day} ${month} · ${hours}:${minutes}`;
  };

  const getLastUpdateStr = () => {
    try {
      const ext = typeof booking.extras === 'string' ? JSON.parse(booking.extras) : (booking.extras || {});
      const logs = ext.logs || [];
      if (logs.length > 0) {
        return formatStepDate(logs[logs.length - 1].timestamp);
      }
      if (booking.created_at) {
        return formatStepDate(booking.created_at);
      }
    } catch(e) {}
    return '';
  };

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
    <div className={`min-h-screen ${bg} ${text} font-sans overflow-x-hidden transition-colors duration-300 flex flex-col`}>

      {/* Simulated Push Notification Banner */}
      <AnimatePresence>
        {false && pushNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-white p-4 rounded-2xl shadow-2xl border border-gray-150 dark:border-white/10 z-[300] flex gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 text-white font-black text-xs tracking-wider">
              CT
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black tracking-widest text-primary uppercase">CANTIK TOURS</span>
                <span className="text-[8px] font-bold text-gray-400">{en ? 'now' : 'ahora'}</span>
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-wider">{pushNotification.title}</h4>
              <p className="text-[10px] font-bold text-gray-400 leading-relaxed mt-0.5">{pushNotification.body}</p>
            </div>
            <button 
              onClick={() => setPushNotification(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white flex-shrink-0 text-xs self-start w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${dark ? 'border-white/10 text-gray-400' : 'border-gray-300 text-gray-500'}`}
          >
            {dark ? <Sun size={12} /> : <Moon size={12} />}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-5 flex-1 w-full">

        {/* ── UNIFIED TICKET CONTAINER ────────────────────────────── */}
        <div className={`rounded-[2.5rem] overflow-hidden shadow-2xl ${dark ? 'shadow-black/50 bg-[#1a1a1a]' : 'shadow-gray-300/80 bg-white'}`}>

          {/* Header strip (always visible) */}
          <div className="bg-primary px-6 sm:px-8 py-9 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '8px 8px' }} />
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div>
                <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">
                  {en ? 'BOOKING CARD' : 'TARJETA DE RESERVA'}
                </div>
                <div className="text-white font-black text-xl sm:text-2xl tracking-tight uppercase leading-none mb-2" style={{ wordBreak: 'break-word' }}>
                  {booking.client_name}
                </div>
                {/* Reference directly under name, alongside arrows */}
                <div className="flex items-center gap-3 mt-1">
                  {allRelatedData.length > 1 && currentIndex > 0 && (
                    <button onClick={() => switchBooking(-1)} className="text-white hover:bg-white/30 p-1.5 rounded-full transition-colors flex items-center justify-center bg-white/20 backdrop-blur-md shadow-sm">
                      <ChevronLeft size={18} />
                    </button>
                  )}
                  
                  <div className="font-mono font-black text-base sm:text-lg tracking-widest text-white flex items-center gap-2 px-1">
                    <span>{formatCT(booking.reference || booking.id)}</span>
                    <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-widest font-bold bg-white/10 px-2 py-0.5 rounded-md">({dayNum} {monthStr})</span>
                  </div>

                  {allRelatedData.length > 1 && currentIndex < allRelatedData.length - 1 && (
                    <button onClick={() => switchBooking(1)} className="text-white hover:bg-white/30 p-1.5 rounded-full transition-colors flex items-center justify-center bg-white/20 backdrop-blur-md shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div>
              {/* Fields */}
              <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 py-6`}>
                <div className="grid className='grid-cols-3 gap-x-4 gap-y-5'" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.25rem 1rem' }}>
                  {[
                    { label: en ? 'DATE' : 'FECHA',       val: `${dayNum} ${monthStr} ${yearStr}` },
                    { label: en ? 'START TIME' : 'HORA INICIO', val: (function(){try{const ext = typeof booking.extras === 'string' ? JSON.parse(booking.extras) : (booking.extras || {}); return ext.pickup_time;}catch(e){return '';}})() || booking.pickup_time || (en ? 'TBD' : 'Por confirmar') },
                    { label: en ? 'PAX' : 'PAX',   val: `${booking.pax} PAX` },
                    { label: en ? 'PICKUP' : 'RECOGIDA', val: booking.hotel },
                    { label: en ? 'DRIVER' : 'CHOFER',    val: booking.drivers ? booking.drivers.name : (en ? 'TBD' : 'Por confirmar') },
                    { label: en ? 'VEHICLE' : 'VEHÍCULO', val: booking.drivers && booking.drivers.car_model ? booking.drivers.car_model : (en ? 'TBD' : 'Por confirmar') },
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

                  {/* Perforated divider exactly on the transition from fields to itinerary stub */}
                  <div className="relative h-8 flex items-center z-20">
                    <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
                    <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
                    <div className={`w-full mx-6 border-t-2 border-dashed ${dark ? 'border-white/10' : 'border-gray-200'}`} />
                  </div>

                  {/* Stub (Detailed Itinerary) */}
                  <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 pt-6 pb-10 rounded-b-[2.5rem] transition-all duration-300`}>
                    <button
                      onClick={() => setShowItinerary(!showItinerary)}
                      className="w-full flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${sub}`}>
                        <Map className="text-primary" size={14} />
                        {en ? 'DETAILED ITINERARY' : 'ITINERARIO DETALLADO'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${sub}`}>
                          {en ? 'Your Route' : 'Tu Ruta'}
                        </span>
                        <span className={`text-[10px] ${sub} transition-transform duration-300 ${showItinerary ? 'rotate-180' : ''}`} style={{ display: 'inline-block' }}>
                          ▼
                        </span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {showItinerary && finalItinerary.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
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
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

        {/* Next step notification alert (dismissible) between cards */}
        <AnimatePresence>
          {false && showNextStepAlert && nextStepText && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`p-4 rounded-[1.5rem] flex items-center justify-between gap-4 border shadow-md relative backdrop-blur-xl ${
                dark 
                  ? 'bg-[#141414] text-gray-300 border-white/5 shadow-black/10' 
                  : 'bg-white text-gray-700 border-gray-150 shadow-gray-250/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider leading-snug">
                  {nextStepText}
                </span>
              </div>
              <button
                onClick={() => setShowNextStepAlert(false)}
                className={`text-gray-400 hover:text-gray-600 dark:hover:text-white flex-shrink-0 text-xs w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer`}
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-6" />

        {/* ── BOOKING MANAGEMENT CONTAINER ────────────────────────── */}
        <div ref={managementRef} className={`rounded-[2.5rem] overflow-hidden shadow-2xl ${dark ? 'shadow-black/50 bg-[#1a1a1a]' : 'shadow-gray-300/80 bg-white'}`}>
          <div className="relative overflow-hidden">
            <div>
              {/* Top part: Booking Management Header + Progress + Timeline */}
              <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 pt-10 transition-all duration-300 ${showTimelineDetails ? 'pb-4' : 'pb-6'}`}>
                {/* Header: Title + dot on left, Status toggle on right */}
                <button
                  onClick={() => setShowTimelineDetails(!showTimelineDetails)}
                  className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 flex-shrink-0 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${sub} leading-none`}>
                      {en ? 'BOOKING MANAGEMENT' : 'GESTIÓN DE RESERVA'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black tracking-widest ${sub} leading-none`}>
                      {toSentenceCase(status.label)}
                    </span>
                    <span className={`text-[10px] ${sub} transition-transform duration-300 ${showTimelineDetails ? 'rotate-180' : ''} leading-none`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                      ▼
                    </span>
                  </div>
                </button>

                {/* Progress Bar & Timeline (Animated via AnimatePresence / motion.div) */}
                <AnimatePresence initial={false}>
                  {showTimelineDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                      className={showTimelineDetails ? "mb-2 pb-2" : "mb-0 pb-0"}
                    >
                      {/* Progress bar container */}
                      <div className="mt-6 w-full">
                        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest mb-1.5 opacity-70">
                          <span>{en ? 'Booking Progress' : 'Progreso de Reserva'}</span>
                          <span className="font-black">{getProgressPercentage()}%</span>
                        </div>
                        <div className={`h-1.5 w-full rounded-full overflow-hidden ${dark ? 'bg-white/10' : 'bg-gray-100'} mb-4`}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${getProgressPercentage()}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>

                      {/* Timeline steps container */}
                      <div className={`rounded-2xl p-4 mb-4 ${dark ? "bg-white/5 border border-white/5" : "bg-gray-50 border border-gray-100"}`}>
                        <div className="space-y-5 relative pl-1">
                          {[
                            statusMap.requested, 
                            statusMap.pending_payment, 
                            (effectiveStatus === 'verifying_payment' ? statusMap.verifying_payment : statusMap.payment_received), 
                            statusMap.reserved, 
                            statusMap.confirmed,
                            statusMap.in_progress,
                            statusMap.completed
                          ].map((st, i) => {
                            const isPast = st.step < currentStep;
                            const isCurrent = st.step === currentStep;
                            
                            const stepTime = getStepTimestamp(st.step);
                            const stepTimeStr = stepTime ? formatStepDate(stepTime) : '';
                            
                            return (
                              <div key={i} className="flex gap-3 relative z-10">
                                <div className="flex flex-col items-center justify-start pt-0.5">
                                  <div className="relative z-10">
                                    {isPast ? (
                                      <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center shadow-sm">
                                        <CheckCircle2 size={8} className="stroke-[3]" />
                                      </div>
                                    ) : isCurrent ? (
                                      <div className="relative flex h-4 w-4 items-center justify-center">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                        <div className="relative w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center shadow-md">
                                          <div className="w-1 h-1 bg-white rounded-full" />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className={`w-3.5 h-3.5 rounded-full border-2 ${dark ? 'bg-[#1a1a1a] border-white/10' : 'bg-gray-50 border-gray-200'} flex items-center justify-center`} />
                                    )}
                                  </div>
                                  
                                  {i < 6 && (
                                    <div 
                                      className={`absolute top-4 bottom-[-20px] left-[7px] w-0.5 ${
                                        st.step < currentStep ? 'bg-primary' : (dark ? 'bg-white/5' : 'bg-gray-200')
                                      } z-0`}
                                    />
                                  )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-3">
                                    <span className={`text-[9px] font-black uppercase tracking-wider ${
                                      isCurrent ? 'text-primary' : isPast ? text : 'text-gray-400 dark:text-gray-600'
                                    }`}>
                                      {st.label}
                                    </span>
                                    {stepTimeStr && (
                                      <span className={`text-[7.5px] font-bold uppercase tracking-tighter ${sub}`}>
                                        {stepTimeStr}
                                      </span>
                                    )}
                                  </div>
                                  {isCurrent && (
                                    <p className={`text-[9.5px] font-semibold mt-0.5 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                      {st.desc}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Perforated divider */}
              <div className="relative h-8 flex items-center z-20">
                <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
                <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full z-10" style={{ backgroundColor: notchBg }} />
                <div className={`w-full mx-6 border-t-2 border-dashed ${dark ? 'border-white/10' : 'border-gray-200'}`} />
              </div>

              {/* Bottom part: Contextual Panels, Payments, Check-in */}
              <div className={`${dark ? 'bg-[#1a1a1a]' : 'bg-white'} px-8 pt-5 sm:pt-6 pb-10 rounded-b-[2.5rem]`}>
                <div className="space-y-6">
                  {/* Panel Operativo Contextual (Mejora 6) */}
                  {(function() {
                    if (effectiveStatus === 'confirmed' && !isCheckinPending) {
                      return (
                        <div className={`p-5 rounded-2xl border transition-all ${dark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50'}`}>
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 size={16} />
                            </div>
                            <div className="flex-1">
                              <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                                {en ? 'Booking Guaranteed ✓' : 'Reserva Garantizada ✓'}
                              </div>
                              <div className={`text-[11px] font-bold mt-1.5 leading-relaxed ${sub}`}>
                                {en 
                                  ? 'All set! Your professional driver will pick you up at your hotel at the scheduled time.' 
                                  : '¡Todo listo! Tu chofer profesional te recogerá en tu hotel a la hora acordada.'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    if (effectiveStatus === 'in_progress') {
                      return (
                        <div className={`p-5 rounded-2xl border transition-all ${dark ? 'bg-primary/5 border-primary/10' : 'bg-cyan-50/20 border-primary/15'}`}>
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                              <Activity size={16} />
                            </div>
                            <div className="flex-1">
                              <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                                {en ? 'Tour in Progress' : 'Tour en Curso'}
                              </div>
                              <div className={`text-[11px] font-bold mt-1 leading-relaxed ${sub}`}>
                                {en 
                                  ? 'Your Bali experience is underway! Please contact your driver or our support team for any immediate assistance.' 
                                  : '¡Tu experiencia en Bali está en marcha! Si necesitas asistencia operativa inmediata, contacta con tu chofer o soporte.'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    if (effectiveStatus === 'completed') {
                      return (
                        <div className={`p-6 rounded-3xl border transition-all ${dark ? 'bg-[#181818] border-white/5 shadow-md shadow-black/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                          <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                              <Star size={24} className="fill-primary/20" />
                            </div>
                            <h4 className={`text-sm font-black uppercase tracking-wider ${text}`}>
                              {en ? 'How was your experience?' : '¿Qué tal fue tu experiencia?'}
                            </h4>
                            <p className={`text-[11px] font-bold mt-1.5 leading-relaxed max-w-sm ${sub}`}>
                              {en 
                                ? 'We hope you had a magical time. Leaving a review helps other travelers and supports our local guides!' 
                                : 'Esperamos que haya sido un día mágico. ¡Dejar una reseña ayuda a otros viajeros y apoya a nuestros guías locales!'}
                            </p>
                            <div className="mt-4">
                              <Link
                                to={`/${en ? 'en' : 'es'}/reviews`}
                                className="inline-flex px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-lg shadow-primary/10"
                              >
                                {en ? 'Leave a Review' : 'Dejar Reseña'}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    return null;
                  })()}

                  {/* Bloque de Pago / Finanzas (Mejoras 2 y 3) */}
                  <div>
                    <div className={`text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block`}>
                      {en ? 'FINANCES & PAYMENTS' : 'FINANZAS Y PAGOS'}
                    </div>
                    {hasPendingPayment ? (
                      <div className={`p-6 rounded-3xl border-2 transition-all shadow-md ${dark ? 'bg-[#181818] border-primary/30' : 'bg-cyan-50/20 border-primary/20'}`}>
                        <div className="flex flex-col items-center text-center justify-center gap-2">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">
                              {en ? 'PENDING AMOUNT' : 'IMPORTE PENDIENTE'}
                            </div>
                            <div className={`text-3xl sm:text-4xl font-black ${text} tracking-tight`}>
                              <span className="text-xl sm:text-2xl opacity-50 mr-1">{formatPrice(balance).symbol}</span>
                              {formatPrice(balance).amount}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <button
                            onClick={() => setShowPaymentModal(true)}
                            className="w-full py-4 bg-primary text-white hover:opacity-90 font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:animate-pulse"
                          >
                            <CreditCard size={14} />
                            {en ? 'Pay Booking Securely' : 'Pagar Reserva Ahora'}
                          </button>
                          
                          {/* Trust Seal */}
                          <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-500">
                            <ShieldCheck size={12} />
                            <span>{en ? '100% SECURE CARD OR TRANSFER PAYMENT' : 'PAGA SEGURO CON TARJETA O TRANSFERENCIA BANCARIA'}</span>
                          </div>
                        </div>
                        
                        {/* ¿Qué ocurre después? Section (Mejora 3) */}
                        <div className={`mt-6 pt-4 border-t border-dashed ${dark ? 'border-white/10' : 'border-gray-200/80'} text-[11px]`}>
                          <button
                            onClick={() => setShowWhatHappens(!showWhatHappens)}
                            className={`w-full flex items-center justify-between py-2 text-left font-black uppercase tracking-wider transition-colors ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary'}`}
                          >
                            <span>{en ? 'What happens next?' : '¿Qué ocurre después?'}</span>
                            <ChevronLeft size={14} className={`transform transition-transform duration-300 ${showWhatHappens ? '-rotate-90' : 'rotate-180'}`} />
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {showWhatHappens && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-3.5 font-medium pt-3.5 pb-1">
                                  <div className="flex gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                      <span className={`font-bold block ${text}`}>
                                        {en ? 'Card or PayPal Payment' : 'Pago con Tarjeta o PayPal'}
                                      </span>
                                      <span className="text-gray-400">
                                        {en ? 'Confirmation is immediate through the payment platform.' : 'La confirmación es inmediata a través de la plataforma de pago.'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex gap-2.5">
                                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <div>
                                      <span className={`font-bold block ${text}`}>
                                        {en ? 'Bank Transfers' : 'Transferencias Bancarias'}
                                      </span>
                                      <span className="text-gray-400">
                                        {en ? 'Send your receipt after making the payment. We will validate it shortly; keep in mind there might be time zone differences depending on your location.' : 'Envía tu comprobante tras realizar el pago. Lo validaremos a la brevedad; recuerda que puede haber diferencias de zona horaria según donde te encuentres.'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex gap-2.5">
                                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <div>
                                      <span className={`font-bold block ${text}`}>
                                        {en ? 'Your Booking' : 'Tu Reserva'}
                                      </span>
                                      <span className="text-gray-400">
                                        {en ? 'This page will update automatically with all your travel details.' : 'Esta página se actualizará automáticamente con todos los detalles de tu viaje.'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex gap-2.5">
                                    <MessageCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                      <span className={`font-bold block ${text}`}>
                                        {en ? 'Direct Support' : 'Asistencia Directa'}
                                      </span>
                                      <span className="text-gray-400">
                                        {en ? 'We will contact you via WhatsApp to coordinate final details: driver, route, and scheduling.' : 'Te contactaremos vía WhatsApp para coordinar los detalles finales: conductor, ruta y horarios.'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ) : (
                      <div className={`p-5 rounded-2xl border transition-all ${dark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={16} />
                          </div>
                          <div>
                            <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                              {en ? 'Payment Completed ✓' : 'Pago Completado ✓'}
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${sub}`}>
                              {en ? 'No pending balance for this tour.' : 'No tienes ningún pago pendiente para este tour.'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Registro de Pasajeros / Check-in (Mejora 7) */}
                  {isCheckinPending ? (
                    <div>
                      <div className={`text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block`}>
                        {en ? 'PASSENGER CHECK-IN' : 'REGISTRO DE PASAJEROS'}
                      </div>
                      <div className={`p-5 rounded-2xl border transition-all ${
                        hasPendingPayment 
                          ? (dark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200/80 shadow-sm')
                          : (dark ? 'bg-[#181818] border-primary/30' : 'bg-cyan-50/20 border-primary/20')
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            hasPendingPayment ? 'bg-gray-500/20 text-gray-500' : 'bg-amber-500/20 text-amber-500'
                          }`}>
                            <Users size={16} />
                          </div>
                          <div className="flex-1">
                            <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                              {en ? 'Passenger Check-In' : 'Check in Viajeros'}
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${sub}`}>
                              {en ? 'Please complete passenger details.' : 'Completa los datos de todos los pasajeros.'}
                            </div>
                            
                            {hasPendingPayment && (
                              <p className="text-[10px] font-bold text-amber-500 mt-2">
                                {en ? 'Puedes completarlo ahora o después del pago.' : 'Puedes completarlo ahora o después del pago.'}
                              </p>
                            )}
                            
                            <div className="mt-4">
                              <button
                                onClick={() => setShowCheckin(true)}
                                className={`inline-flex px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all border ${
                                  hasPendingPayment
                                    ? 'bg-transparent text-gray-400 border-gray-300 dark:border-white/10 hover:border-primary hover:text-primary'
                                    : 'bg-primary text-white border-primary hover:opacity-90 shadow-md shadow-primary/10 animate-pulse'
                                }`}
                              >
                                {en ? 'Complete Check-in' : 'Hacer Check-in'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={`text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block`}>
                        {en ? 'PASSENGER CHECK-IN' : 'REGISTRO DE PASAJEROS'}
                      </div>
                      <div className={`p-5 rounded-2xl border transition-all ${dark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={16} />
                          </div>
                          <div>
                            <div className={`text-xs font-black uppercase tracking-wider ${text}`}>
                              {en ? 'Check-in Completed ✓' : 'Check-in Completado ✓'}
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${sub}`}>
                              {en ? 'All passengers registered successfully.' : 'Todos los pasajeros han sido registrados correctamente.'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-6" />

      </div>

      {/* Footer */}
      <div className="pt-8 pb-12 text-center opacity-20 mt-auto">
        <LocalLink to="/" className={`text-[8px] font-black uppercase tracking-[1em] ${text}`}>CANTIKTOURS.COM</LocalLink>
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
                        {en ? 'Age *' : 'Edad *'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={pax.age || ''}
                        onChange={(e) => {
                          const nd = [...checkinData];
                          nd[idx] = { ...nd[idx], age: e.target.value };
                          setCheckinData(nd);
                        }}
                        className={`w-full max-w-[120px] px-4 py-3 rounded-xl text-sm font-bold border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${dark ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-gray-300 text-black'}`}
                        placeholder="Ej: 28"
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
                  </div>
                </div>
              ))}
            </div>



            <button
              onClick={handleCheckinSubmit}
              disabled={submittingCheckin}
              className="w-full mt-4 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submittingCheckin ? (en ? 'SAVING...' : 'GUARDANDO...') : (en ? 'SAVE CHECK-IN' : 'GUARDAR CHECK-IN')}
            </button>
          </motion.div>
        </div>
      )}

      {/* ── PAYMENT MODAL ────────────────────────────────── */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative custom-scrollbar ${dark ? 'bg-[#141414] border border-white/10' : 'bg-white border border-gray-100'}`}
          >
            {/* Header */}
            <div className={`sticky top-0 z-10 px-8 py-6 flex justify-between items-center border-b backdrop-blur-xl ${dark ? 'border-white/10 bg-[#141414]/80' : 'border-gray-100 bg-white/80'}`}>
              <h3 className={`text-xs font-black uppercase tracking-widest ${sub}`}>
                {en ? 'Payment & Transfer' : 'Pago y Transferencia'}
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                ✕
              </button>
            </div>

            <div className="px-8 pt-8 pb-10">
              {/* Total Amount */}
              <div className="text-center mb-8">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                  {en ? 'AMOUNT TO PAY' : 'MONTO A PAGAR'}
                </div>
                <div className={`text-5xl font-black mb-6 tracking-tighter ${text}`}>
                  <span className="text-3xl opacity-50 mr-1">{formatPrice(balance).symbol}</span>
                  {formatPrice(balance).amount}
                </div>
                
                {/* Reference Pill */}
                <div className="inline-flex flex-col items-center">
                  <div className={`flex items-center gap-3 pl-5 pr-2 py-1.5 rounded-full border ${dark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">REF:</span>
                    <span className={`text-sm font-mono font-black tracking-widest ${text}`}>{formatCT(ref)}</span>
                    <button
                      onClick={() => handleCopy(formatCT(ref), 'ref')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${copiedField === 'ref' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-white/10 text-gray-500 hover:text-primary shadow-sm'}`}
                    >
                      {copiedField === 'ref' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest mt-3 opacity-60 ${sub}`}>
                    {en ? 'Include this REF in your transfer' : 'Incluye esta REF en el concepto'}
                  </span>
                </div>
              </div>

              
              
              {/* Slide Animation Container */}
              <div className="relative overflow-hidden w-full" style={{ minHeight: '300px' }}>
                <AnimatePresence mode="wait">
                  {!showBankTransfer ? (
                    <motion.div
                      key="paypal-slide"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* PayPal Default Section */}
                      <div className="mb-8 text-center mt-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                          {en ? 'PAY SECURELY WITH CARD (NO LOGIN REQUIRED) OR PAYPAL' : 'PAGO SEGURO CON TARJETA (SIN LOGIN) O PAYPAL'}
                        </div>
                        <PayPalScriptProvider options={{ 
                          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", 
                          currency: currency,
                          locale: en ? 'en_US' : 'es_ES'
                        }}>
                          <PayPalButtons 
                            style={{ layout: "vertical", shape: "rect", color: "blue" }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [{
                                  amount: {
                                    value: Number(formatPrice(balance).amount).toFixed(2),
                                    currency_code: currency
                                  },
                                  description: `Booking ${formatCT(ref)} - ${booking?.client_name}`
                                }]
                              });
                            }}
                            onApprove={async (data, actions) => {
                              try {
                                setUploadingReceipt(true);
                                const details = await actions.order.capture();
                                const res = await capturePayPalPayment({
                                  orderID: data.orderID,
                                  bookingRef: ref,
                                  amount: Number(formatPrice(balance).amount).toFixed(2),
                                  currency: currency,
                                  payerName: details.payer.name.given_name + ' ' + details.payer.name.surname,
                                  payerEmail: details.payer.email_address
                                });
                                if (res.status === 'success') {
                                  showToast(en ? 'Payment successful!' : '¡Pago exitoso!', 'success');
                                  setShowPaymentModal(false);
                                  setTimeout(() => window.location.reload(), 1500);
                                } else {
                                  throw new Error('Server returned error');
                                }
                              } catch (err) {
                                showToast(en ? 'Error validating payment.' : 'Error al validar el pago.', 'error');
                              } finally {
                                setUploadingReceipt(false);
                              }
                            }}
                          />
                        </PayPalScriptProvider>
                        <p className={`text-[11px] mt-4 ${sub}`}>
                          {en ? 'You can pay with your PayPal account or safely with any credit/debit card.' : 'Puedes pagar con tu cuenta PayPal o de forma segura con cualquier tarjeta de crédito/débito.'}
                        </p>
                      </div>

                      <div className={`pt-6 border-t ${dark ? 'border-white/10' : 'border-gray-100'}`}>
                        <button 
                          onClick={() => setShowBankTransfer(true)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all hover:-translate-y-0.5 ${dark ? 'border-white/10 hover:bg-white/5 bg-[#1a1a1a]' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}
                        >
                          <div className="flex items-center gap-3">
                             <span className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                             </span>
                             <span className={`text-xs font-black uppercase tracking-widest ${text}`}>
                                {en ? 'Pay by Bank Transfer' : 'Pago por Transferencia Bancaria'}
                             </span>
                          </div>
                          <div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    
                    <motion.div
                      key="transfer-slide"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mt-2">
                        
                        {/* Step 1 */}
                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                          <h3 className={`text-xs font-black uppercase tracking-widest text-primary mb-6 text-center`}>
                            {en ? 'Step 1: Make the Transfer' : 'Paso 1: Haz la transferencia'}
                          </h3>
                          
                          {/* Pill Tabs for EUR / USD inside bank transfer */}
                          <div className={`flex p-1 rounded-2xl mb-8 ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
                              <button
                                onClick={() => setPaymentTab('eur')}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${paymentTab === 'eur' ? 'bg-white dark:bg-[#2a2a2a] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}
                              >
                                {en ? 'EUR Account' : 'Cuenta EUR'}
                              </button>
                              <button
                                onClick={() => setPaymentTab('usd')}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${paymentTab === 'usd' ? 'bg-white dark:bg-[#2a2a2a] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}
                              >
                                {en ? 'USD Account' : 'Cuenta USD'}
                              </button>
                          </div>

                          <div className="space-y-5 mb-10">
                            {[
                              { label: en ? 'BENEFICIARY' : 'BENEFICIARIO', value: 'Javier Ignacio Contreras Cifuentes', id: 'name' },
                              ...(paymentTab === 'eur' || paymentTab === 'paypal' ? [ // Fallback if tab is paypal
                                { label: 'IBAN', value: 'BE97 9673 8690 2549', id: 'iban', mono: true },
                                { label: 'SWIFT / BIC', value: 'TRWIBEB1XXX', id: 'bic', mono: true },
                                { label: en ? 'BANK' : 'BANCO', value: 'Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium', id: 'bank', noCopy: true }
                              ] : [
                                { label: en ? 'ACCOUNT NO.' : 'CUENTA', value: '214247934891', id: 'acc', mono: true },
                                { label: en ? 'ROUTING' : 'RUTEO', value: '101019628', id: 'route', mono: true },
                                { label: 'SWIFT / BIC', value: 'TRWIUS35XXX', id: 'bic_us', mono: true },
                                { label: en ? 'BANK' : 'BANCO', value: 'Wise US Inc, 108 W 13th St, Wilmington, DE, 19801, USA', id: 'bank_us', noCopy: true }
                              ])
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start justify-between group">
                                <div className="flex-1 pr-4">
                                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</div>
                                  <div className={`text-sm ${item.mono ? 'font-mono tracking-wider' : ''} font-bold ${text} ${item.noCopy ? 'leading-snug opacity-70 text-xs' : ''}`}>
                                    {item.value}
                                  </div>
                                </div>
                                {!item.noCopy && (
                                  <button 
                                    onClick={() => handleCopy(item.value, item.id)} 
                                    className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${copiedField === item.id ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-primary hover:bg-primary/10'}`}
                                  >
                                    {copiedField === item.id ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className={`pt-8 border-t ${dark ? 'border-white/10' : 'border-gray-100'}`}>
                          <div className="text-center mb-6">
                            <h4 className={`text-xs font-black uppercase tracking-widest text-primary`}>
                              {en ? 'Step 2: Upload Receipt' : 'Paso 2: Subir comprobante'}
                            </h4>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center gap-4">
                            <label className="relative overflow-hidden group cursor-pointer flex w-full justify-center items-center gap-3 px-8 py-5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98]">
                              {uploadingReceipt ? (
                                <>
                                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>{en ? 'UPLOADING...' : 'SUBIENDO...'}</span>
                                </>
                              ) : (
                                <>
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                <span>{en ? 'SELECT IMAGE' : 'SELECCIONAR IMAGEN'}</span>
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
                              className={`text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 ${sub}`}
                            >
                              <span>{en ? 'Or send via WhatsApp' : 'O envíalo por WhatsApp'}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                          </div>
                        </motion.div>

                        {/* Back Button */}
                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className={`pt-8 mt-8 border-t ${dark ? 'border-white/10' : 'border-gray-100'}`}>
                          <button 
                            onClick={() => setShowBankTransfer(false)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all hover:-translate-y-0.5 ${dark ? 'border-white/10 hover:bg-white/5 bg-[#1a1a1a]' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}
                          >
                            <div className="flex items-center gap-3">
                               <span className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                               </span>
                               <span className={`text-xs font-black uppercase tracking-widest ${text}`}>
                                  {en ? 'Back to Card Payment' : 'Volver a Pago con tarjeta'}
                               </span>
                            </div>
                            <div className="opacity-50">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                            </div>
                          </button>
                        </motion.div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Notification */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: toast.show ? 1 : 0, y: toast.show ? 0 : 50 }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm px-6 py-3 rounded-2xl md:rounded-full shadow-2xl z-[200] flex items-center justify-center gap-3 pointer-events-none transition-all duration-300 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}
      >
        {toast.type === 'error' ? <Info size={16} className="flex-shrink-0" /> : <CheckCircle2 size={16} className="flex-shrink-0" />}
        <span className="text-[10px] font-black uppercase tracking-widest text-center leading-normal">{toast.message}</span>
      </motion.div>

      {/* Floating Status Alert */}
      <AnimatePresence>
        {false && showStatusAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 left-6 md:left-auto md:w-96 z-[150]"
          >
            {(function() {
              let alertDesc = statusAlert.desc;
              if (booking.drivers) {
                alertDesc += en ? ` Assigned Driver: ${booking.drivers.name}.` : ` Chofer asignado: ${booking.drivers.name}.`;
              }
              if (booking.selected_stops) {
                alertDesc += en ? ` Itinerary customized.` : ` Itinerario personalizado.`;
              }

              return (
                <div className={`p-4 rounded-2xl border shadow-xl flex items-start gap-4 relative backdrop-blur-xl ${dark ? 'bg-[#141414]/95 border-white/10 text-white' : 'bg-white/95 border-gray-200/80 text-gray-900'} transition-all duration-300`}>
                  <div className="relative flex h-3 w-3 flex-shrink-0 mt-1">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusAlert.dot}`} />
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${statusAlert.dot}`} />
                  </div>
                  <div className="flex-1 pr-6">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${statusAlert.text}`}>
                      {statusAlert.label}
                    </h4>
                    <p className={`text-[11px] font-bold mt-1 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {alertDesc}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowStatusAlert(false)}
                    className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-xs transition-colors ${dark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Support WhatsApp Button with Language Selector */}
      <motion.div 
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-[160]"
      >
        <AnimatePresence>
          {showSupportMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-14 right-0 mb-2 w-52 rounded-2xl p-3 border shadow-2xl backdrop-blur-xl ${dark ? 'bg-[#141414]/95 border-white/10 text-white' : 'bg-white/95 border-gray-200 text-gray-900'}`}
            >
              <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2.5 px-2">
                {en ? 'Need assistance?' : '¿Necesitas ayuda?'}
              </div>
              <div className="flex flex-col gap-1.5">
                <a
                  href={`https://wa.me/34642517787?text=${encodeURIComponent(
                    `Hola Cantik Tours!\nNecesito ayuda con mi reserva.\n${fichaUrl}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowSupportMenu(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-colors ${dark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <span className="text-sm">🇪🇸</span> Español (ES)
                </a>
                <a
                  href={`https://wa.me/34642517787?text=${encodeURIComponent(
                    `Hello Cantik Tours!\nI need help with my booking.\n${fichaUrl}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowSupportMenu(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-colors ${dark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <span className="text-sm">🇬🇧</span> English (EN)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowSupportMenu(!showSupportMenu)}
          aria-label={en ? 'Contact Support' : 'Contactar Soporte'}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          {showSupportMenu ? (
            <span className="font-sans text-sm font-black w-6 h-6 flex items-center justify-center">✕</span>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461 1.993 0 3.866.778 5.275 2.188a7.419 7.419 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.709.88-.131.149-.261.169-.486.056-.224-.113-.953-.351-1.815-1.12-.669-.598-1.12-1.335-1.251-1.56-.131-.224-.014-.345.098-.458.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.429-.006-.149 0-.392.056-.598.28-.205.224-.784.766-.784 1.869 0 1.102.803 2.167.915 2.317.112.15 1.581 2.415 3.832 3.387.536.231.954.369 1.279.473.536.171 1.024.147 1.409.089.429-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.15-.43-.262" />
            </svg>
          )}
        </button>
      </motion.div>
    </div>
  );
}
