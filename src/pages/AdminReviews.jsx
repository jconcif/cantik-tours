import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import * as api from '../services/api';
import { login as apiLogin, logout, verifyToken } from '../services/api';
import { BookingForm, DriverForm, ReviewForm, CouponForm, Modal, FinancialManagement, ItineraryEditor, DriverAssignModal, PassengerManagement } from '../components/AdminComponents';
import { 
  MessageCircle, Ticket, Star, Pencil, MapPin, Wallet, Trash2, 
  Globe, Sun, Moon, DollarSign, Euro, LogOut, LayoutDashboard,
  Calendar, Users, Award, Tag, Bell, Settings, RefreshCcw, Plus, Download, ExternalLink, Lock, Unlock, Clipboard, Car
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useDarkMode } from '../context/DarkModeContext';

const C = '#11BDDB';

const parseLocalDate = (dateStr) => {
  if (!dateStr) return new Date();
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length < 3) return new Date(dateStr);
  return new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
};
const emptyBooking = {client_name:'',client_phone:'',booking_date:'',hotel:'',tour_title:'',total_price:'',deposit_amount:'',pax:2,payment_status:'requested',driver_id:'',experience:'driver_en',reference:'',notes:''};
const emptyDriver = {name:'',phone:'',car_model:''};
const emptyReview = {nombre:'',comentario:'',comentario_en:'',puntuacion:5,aprobado:0};
const emptyCoupon = {code:'',discount_type:'percent',discount_value:10,max_uses:0,active:1};
const TABS = ['bookings','drivers','reviews','coupons','calendar','stats','followup'];
const TLABEL = {bookings:'Reservas',drivers:'Staff',reviews:'Reviews',coupons:'Cupones',calendar:'Calendario',stats:'Dashboard',followup:'Seguimiento'};
const PAY_LABEL = {
  requested:          'Solicitud Recibida',
  pending_payment:    'Pago Pendiente',
  payment_sent:       'Pago Pendiente',
  payment_confirmed:  'Pago Confirmado',
  payment_received:   'Pago Confirmado',
  verifying_payment:  'Pago Confirmado',
  reserved:           'Ratificando Disponibilidad',
  confirmed:          'Tour Confirmado',
  in_progress:        'Tour en Curso',
  completed:          'Tour Finalizado',
  postponed:          'Pospuesto',
  cancelled:          'Cancelado',
  refunded:           'Reembolsado'
};
const PAY_COLOR = {
  requested:          '#f59e0b',
  pending_payment:    '#f97316',
  payment_sent:       '#f97316',
  payment_confirmed:  '#11BDDB',
  payment_received:   '#11BDDB',
  verifying_payment:  '#11BDDB',
  reserved:           '#11BDDB',
  confirmed:          '#10b981',
  in_progress:        '#8b5cf6',
  completed:          '#64748b',
  postponed:          '#6366f1',
  cancelled:          '#ef4444',
  refunded:           '#ec4899'
};

const EXP_LABEL = {
  economy: 'Conductor (EN)',
  comfort: 'Guía (EN)',
  elite: 'Guía (ES)',
  driver_en: 'Conductor (EN)',
  guide_en: 'Guía (EN)',
  guide_es: 'Guía (ES)'
};

const generateVoucher = (b, drivers) => {
  const drv = drivers.find(d => d.id == b.driver_id);
  const refCode = b.reference ? (b.reference.startsWith('CT-') ? b.reference : `CT-${b.reference}`) : `CT-${b.id}`;
  const bookingUrl = `https://cantiktours.com/booking?ref=${refCode}`;
  const w = window.open('', '_blank');
  w.document.write(`<html><head><title>Voucher Cantik - ${b.client_name}</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');body{font-family:'Inter',sans-serif;margin:0;padding:0;background:#f0f2f5;color:#1a1a1a}.ticket{max-width:800px;margin:40px auto;background:#fff;border-radius:32px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1)}.header{background:#11BDDB;padding:40px;color:#fff;display:flex;justify-content:space-between;align-items:center}.logo{font-size:32px;font-weight:900}.status-badge{background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:99px;font-size:12px;font-weight:900;text-transform:uppercase}.content{padding:40px;display:grid;grid-template-columns:2fr 1fr;gap:40px}.main-info{border-right:2px dashed #f0f2f5;padding-right:40px}.label{font-size:10px;font-weight:900;color:#11BDDB;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}.value{font-size:18px;font-weight:700;margin-bottom:24px}.tour-title{font-size:28px;font-weight:900;margin-bottom:32px;color:#11BDDB}.side-info{display:flex;flex-direction:column;align-items:center;text-align:center}.qr-box{background:#f9fafb;padding:20px;border-radius:24px;margin-bottom:16px;border:1px solid #eee}.qr-box img{width:120px;height:120px}.detail-link{display:inline-block;margin-top:12px;padding:8px 16px;background:#11BDDB;color:#fff;text-decoration:none;border-radius:12px;font-size:11px;font-weight:900;letter-spacing:0.5px}.footer-strip{background:#1a1a1a;color:#fff;padding:30px 40px;display:flex;justify-content:space-between;align-items:center}@media print{.no-print{display:none}.ticket{margin:0;border-radius:0;box-shadow:none}}</style></head><body><div class="ticket"><div class="header"><div class="logo">CantikTours</div><div class="status-badge">Voucher de Reserva</div></div><div class="content"><div class="main-info"><div class="label">Tour</div><div class="tour-title">${b.tour_title}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px"><div><div class="label">Cliente</div><div class="value">${b.client_name}</div></div><div><div class="label">Fecha</div><div class="value">${parseLocalDate(b.booking_date).toLocaleDateString()}</div></div><div><div class="label">Hotel</div><div class="value">${b.hotel}</div></div><div><div class="label">Chofer</div><div class="value">${drv?drv.name:'Por confirmar'}</div></div></div></div><div class="side-info"><div class="qr-box"><img src="${`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(bookingUrl)}`}"/></div><div class="label">Detalle de tu Reserva</div><div style="font-size:12px;color:#666">Pax: ${b.pax} · ${refCode}</div><a href="${bookingUrl}" target="_blank" class="detail-link no-print">Ver Estado y Pagos →</a></div></div><div class="footer-strip"><div><div style="font-weight:700">¡Disfruta tu viaje!</div><div style="font-size:11px;color:#666">ES/EN: +34 642 51 77 87</div><div style="font-size:10px;color:#666">ID/EN: +62 856 9153 3356</div></div><div style="text-align:right"><div style="font-size:11px;color:#666">cantiktours.com</div></div></div></div><button onclick="window.print()" style="position:fixed;bottom:20px;right:20px;padding:16px 32px;background:#11BDDB;color:#fff;border:none;border-radius:16px;font-weight:900;cursor:pointer" class="no-print">IMPRIMIR</button></body></html>`);
  w.document.close();
};

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('bookings');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('tour_date_desc');
  const [driverFilter, setDriverFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [modal, setModal] = useState(null);
  const [msg, setMsg] = useState(null);
  const [detailedStats, setDetailedStats] = useState(null);
  const [calMonth, setCalMonth] = useState(new Date());
  const [selectedCalDay, setSelectedCalDay] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { currency, toggleCurrency } = useCurrency();
  const { isDark, toggleDarkMode } = useDarkMode();
  const [annotationTexts, setAnnotationTexts] = useState({});
  const [reloading, setReloading] = useState(false);

  const pendingValidationCount = useMemo(() => {
    return bookings.filter(b => b.payment_status === 'verifying_payment').length;
  }, [bookings]);

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop().replace('_', ' ');

  const statsCharts = useMemo(() => {
    // 1. Month-over-Month trend (last 6 months including current)
    const monthlyMap = {};
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const label = d.toLocaleString('es-ES', { month: 'short' }).toUpperCase() + ' ' + String(d.getFullYear()).slice(-2);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap[key] = { label, revenue: 0, count: 0 };
    }

    bookings.forEach(b => {
      if (b.payment_status === 'cancelled' || b.payment_status === 'blocked') return;
      const dObj = parseLocalDate(b.booking_date);
      const key = `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyMap[key]) {
        monthlyMap[key].revenue += Number(b.total_price || 0);
        monthlyMap[key].count += 1;
      }
    });

    const monthlyData = Object.values(monthlyMap);

    // 2. Popular tours (top 5)
    const tourCounts = {};
    bookings.forEach(b => {
      if (b.payment_status === 'cancelled' || b.payment_status === 'blocked') return;
      const t = b.tour_title || 'Otros';
      tourCounts[t] = (tourCounts[t] || 0) + 1;
    });

    const popularTours = Object.entries(tourCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { monthlyData, popularTours };
  }, [bookings]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    const onExpired = () => { setAuthed(false); toast('Sesión expirada', false); };
    window.addEventListener('auth:expired', onExpired);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('auth:expired', onExpired);
    };
  }, []);

  const toast = (t, ok = true) => { setMsg({ t, ok }); setTimeout(() => setMsg(null), 3000); };

  const theme = {
    bg: isDark ? '#0a0a0a' : '#f8fafc',
    card: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#fff' : '#1e293b',
    textMuted: isDark ? '#666' : '#94a3b8',
    border: isDark ? '#ffffff05' : '#e2e8f0',
    tabBg: isDark ? '#1a1a1a' : '#f1f5f9',
    btnGhost: isDark ? '#ffffff05' : '#e2e8f0',
    header: isDark ? '#1a1a1a99' : '#ffffffcc',
    shadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
  };

  const getProbableLocation = (phone) => {
    if (!phone) return null;
    const p = phone.replace(/\D/g, '');
    if (p.startsWith('34')) return { name: 'España', flag: '🇪🇸' };
    if (p.startsWith('52')) return { name: 'México', flag: '🇲🇽' };
    if (p.startsWith('54')) return { name: 'Argentina', flag: '🇦🇷' };
    if (p.startsWith('56')) return { name: 'Chile', flag: '🇨🇱' };
    if (p.startsWith('57')) return { name: 'Colombia', flag: '🇨🇴' };
    if (p.startsWith('51')) return { name: 'Perú', flag: '🇵🇪' };
    if (p.startsWith('58')) return { name: 'Venezuela', flag: '🇻🇪' };
    if (p.startsWith('593')) return { name: 'Ecuador', flag: '🇪🇨' };
    if (p.startsWith('591')) return { name: 'Bolivia', flag: '🇧🇴' };
    if (p.startsWith('598')) return { name: 'Uruguay', flag: '🇺🇾' };
    if (p.startsWith('595')) return { name: 'Paraguay', flag: '🇵🇾' };
    if (p.startsWith('506')) return { name: 'Costa Rica', flag: '🇨🇷' };
    if (p.startsWith('507')) return { name: 'Panamá', flag: '🇵🇦' };
    if (p.startsWith('502')) return { name: 'Guatemala', flag: '🇬🇹' };
    if (p.startsWith('1')) return { name: 'USA/Canadá', flag: '🇺🇸' };
    if (p.startsWith('44')) return { name: 'UK', flag: '🇬🇧' };
    return null;
  };

  // ── Auto-transition status by date ──────────────────────────
  const autoUpdateStatuses = async (list) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const needsUpdate = list.filter(b => {
      if (!b || !b.booking_date) return false;
      const [y, m, d] = b.booking_date.split('T')[0].split('-').map(Number);
      const tourDay = new Date(y, m - 1, d);
      const isToday = tourDay.getTime() === today.getTime();
      const isPast  = tourDay < today;
      if (isToday && b.payment_status === 'confirmed') return true;
      if (isPast  && ['confirmed', 'in_progress'].includes(b.payment_status)) return true;
      return false;
    });
    if (needsUpdate.length === 0) return;
    await Promise.allSettled(needsUpdate.map(b => {
      const [y, m, d] = b.booking_date.split('T')[0].split('-').map(Number);
      const tourDay = new Date(y, m - 1, d);
      const newStatus = tourDay.getTime() === today.getTime() ? 'in_progress' : 'completed';
      return api.updateBooking({ id: b.id, payment_status: newStatus });
    }));
  };

  const load = useCallback(async () => {
    // If not authed, attempt to verify token on the backend silently
    if (!authed) {
      try {
        const verify = await api.verifyToken();
        if (!verify.valid) return;
      } catch (e) {
        return; // No valid cookie
      }
    }
    setLoading(true);
    try {
      const [b, d, r, c, s] = await Promise.all([
        api.getBookings(), api.getDrivers(), api.getReviews(),
        api.getCoupons(), api.getStats(),
      ]);
      const bList = b.data || [];
      setBookings(bList);
      setDrivers(d.data || []);
      setReviews(r.data || []);
      setCoupons(c.data || []);
      setDetailedStats(s.data);
      setAuthed(true);
      // Auto-transition by date — runs silently after auth
      autoUpdateStatuses(bList);
    } catch (e) {
      setAuthed(false);
      toast(e.message, false);
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = async () => {
    setReloading(true);
    try {
      const [b, d, r, c, s] = await Promise.all([
        api.getBookings().catch(() => ({ data: bookings })),
        api.getDrivers().catch(() => ({ data: drivers })),
        api.getReviews().catch(() => ({ data: reviews })),
        api.getCoupons().catch(() => ({ data: coupons })),
        api.getStats().catch(() => ({ data: detailedStats })),
      ]);
      setBookings([...(b.data || [])]);
      setDrivers([...(d.data || [])]);
      setReviews([...(r.data || [])]);
      setCoupons([...(c.data || [])]);
      setDetailedStats(s.data);
    } catch (e) { toast(e.message, false); }
    finally { setReloading(false); }
  };

  useEffect(() => { load(); }, [load]);


  const save = async () => {
    if (!modal) return;
    const { type, action, data } = modal;
    setLoading(true);
    try {
      let finalData = { ...data };
      
      let actualType = type;
      if (type === 'assign_driver') actualType = 'booking';

      if (actualType === 'booking') {
        let ext = {};
        if (action === 'update') {
          const original = bookings.find(x => String(x.id) === String(data.id));
          if (original) {
            try {
              if (typeof finalData.extras === 'string' && finalData.extras !== '[object Object]') {
                ext = JSON.parse(finalData.extras);
              } else if (typeof finalData.extras === 'object' && finalData.extras !== null) {
                ext = finalData.extras;
              }
            } catch(e) {}
          }
        }
        
        if (!ext.logs) ext.logs = [];
        
        if (action === 'update') {
          const original = bookings.find(x => String(x.id) === String(data.id));
          if (original) {
            let changes = [];
            if (original.payment_status !== finalData.payment_status) {
              const oldLbl = PAY_LABEL[original.payment_status] || original.payment_status;
              const newLbl = PAY_LABEL[finalData.payment_status] || finalData.payment_status;
              changes.push(`Estado cambiado de "${oldLbl}" a "${newLbl}"`);
            }
            if (original.notes !== finalData.notes) {
              changes.push(`Notas internas actualizadas: "${finalData.notes || '(vacio)'}"`);
            }
            if (original.driver_id !== finalData.driver_id) {
              const oldDrv = drivers.find(d => String(d.id) === String(original.driver_id))?.name || 'Sin asignar';
              const newDrv = drivers.find(d => String(d.id) === String(finalData.driver_id))?.name || 'Sin asignar';
              changes.push(`Chofer cambiado de "${oldDrv}" a "${newDrv}"`);
            }
            
            if (changes.length > 0) {
              changes.forEach(cMsg => {
                ext.logs.push({
                  timestamp: new Date().toISOString(),
                  text: cMsg
                });
              });
            }
          }
        } else {
          ext.logs.push({
            timestamp: new Date().toISOString(),
            text: 'Reserva creada en el sistema.'
          });
        }
        
        if (finalData.pickup_time !== undefined) {
          ext.pickup_time = finalData.pickup_time;
        }
        if (finalData.client_email !== undefined) {
          ext.client_email = finalData.client_email;
        }
        finalData.extras = JSON.stringify(ext);
      }

      const fn = api[`${action}${actualType[0].toUpperCase() + actualType.slice(1)}`];
      await fn(finalData);
      setModal(null);
      await reload();
      toast('Guardado ✓');
    } catch (e) { toast(e.message, false); } finally { setLoading(false); }
  };

  const del = async (type, id, confirmed = false) => {
    if (!confirmed) {
      setModal({ type, action: 'delete', data: { id } });
      return;
    }
    setLoading(true);
    try {
      await api[`delete${type[0].toUpperCase() + type.slice(1)}`](id);
      setModal(null);
      await reload();
      toast('Eliminado');
    } catch (e) { toast(e.message, false); } finally { setLoading(false); }
  };

  const setField=(k,v)=>setModal(m=>({...m,data:{...m.data,[k]:v}}));
  const openNew=(type)=>setModal({type,action:'create',data:{...{booking:emptyBooking,driver:emptyDriver,review:emptyReview,coupon:emptyCoupon}[type]}});
  const openEdit=(type,row)=>{
    let dataToEdit = {...row};
    if (type === 'booking') {
      try {
        let ext = {};
        if (typeof row.extras === 'string' && row.extras !== '[object Object]') {
          ext = JSON.parse(row.extras);
        } else if (typeof row.extras === 'object' && row.extras !== null) {
          ext = row.extras;
        }
        dataToEdit.pickup_time = ext.pickup_time || row.pickup_time || '';
        dataToEdit.client_email = ext.client_email || '';
      } catch(e) {}
    }
    setModal({type,action:'update',data:dataToEdit});
  };

  const handleManagePayments = (b) => {
    setModal({type:'finance', action:'view', data:b});
  };

  const filter = (l) => {
    if (!l || !Array.isArray(l)) return [];
    let result = l;
    if (tab === 'bookings') {
      result = result.filter(x => x.payment_status !== 'blocked');
      if (statusFilter !== 'ALL') {
        result = result.filter(x => String(x.payment_status).toUpperCase() === statusFilter);
      }
      if (driverFilter !== 'ALL') {
        if (driverFilter === 'null') {
          result = result.filter(x => !x.driver_id);
        } else {
          result = result.filter(x => String(x.driver_id) === driverFilter);
        }
      }
    }
    
    // Búsqueda textual
    result = result.filter(x => {
      if (!x) return false;
      try {
        return Object.values(x).some(v => 
          v !== null && v !== undefined && String(v).toLowerCase().includes((search || '').toLowerCase())
        );
      } catch (e) { return false; }
    });

    // Ordenamiento por fecha del tour o creación
    if (tab === 'bookings') {
      result = [...result].sort((a, b) => {
        if (sortBy === 'tour_date_desc') {
          return new Date(b.booking_date || 0) - new Date(a.booking_date || 0);
        } else if (sortBy === 'tour_date_asc') {
          return new Date(a.booking_date || 0) - new Date(b.booking_date || 0);
        } else if (sortBy === 'created_at_desc') {
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        } else if (sortBy === 'created_at_asc') {
          return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        }
        return 0;
      });
    }
    
    return result;
  };
  const waLink=(p,m)=>`https://wa.me/${(p||'').replace(/\D/g,'')}?text=${encodeURIComponent(m)}`;
  const exportCSV=()=>{
    const h=['ID','Cliente','Teléfono','Fecha','Tour','Pax','Hotel','Ingreso Base (€)','Total Extras (€)','Estado Pago'];
    const r=filteredList().map(b=>{
      let totalCharges = 0;
      try {
        const ext = typeof b.extras === 'string' ? JSON.parse(b.extras) : (b.extras || {});
        totalCharges = ext.total_charges || 0;
      } catch(e) {}
      
      const cleanString = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;
      
      return [
        b.id,
        cleanString(b.client_name),
        cleanString(b.client_phone),
        b.booking_date,
        cleanString(b.tour_title),
        b.pax,
        cleanString(b.hotel),
        b.total_price,
        totalCharges,
        PAY_LABEL[b.payment_status] || b.payment_status
      ];
    });
    const c=[h,...r].map(e=>e.join(',')).join('\n');
    const blob=new Blob(['\ufeff'+c],{type:'text/csv;charset=utf-8;'});
    const u=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=u;
    a.download=`Export_Contabilidad_CantikTours_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const copyReviewLink = (b, lang = 'es') => {
    const ref = b.reference ? (b.reference.startsWith('CT-') ? b.reference : `CT-${b.reference}`) : `CT-${b.id}`;
    const link = `https://cantiktours.com/reviews?ref=${ref}`;
    navigator.clipboard.writeText(link);
    toast(`Link de review (${lang.toUpperCase()}) copiado`);

    if (b.client_phone) {
      const message = lang === 'en'
        ? `Hello ${b.client_name}! We hope you had an amazing experience with Cantik Tours in Bali. It would mean the world to us if you could take 1 minute to share your experience - it helps other travelers and supports our local team: ${link} -- Thank you so much!`
        : `Hola ${b.client_name}! Esperamos que hayas tenido una experiencia increible con Cantik Tours en Bali. Nos ayudaria mucho que dedicaras 1 minuto a compartir tu experiencia - ayuda a otros viajeros y a nuestro equipo local: ${link} -- Muchas gracias!`;
      const url = waLink(b.client_phone, message);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast('Cliente sin teléfono registrado', false);
    }
  };

  const handleToggleBlock = async (d) => {
    if(!d) return;
    const dateStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    try {
      const res = await api.toggleAvailability(dateStr);
      toast(res.message, res.status === 'success');
      load();
    } catch (e) {
      toast('Error al cambiar bloqueo', false);
    }
  };

  const handleQuickStatusChange = async (b, newStatus) => {
    if (b.payment_status === newStatus) return;
    
    let ext = {};
    try {
      ext = typeof b.extras === 'string' ? JSON.parse(b.extras) : (b.extras || {});
    } catch(e) {}
    if (!ext.logs) ext.logs = [];
    
    const oldStatusLabel = PAY_LABEL[b.payment_status] || b.payment_status;
    const newStatusLabel = PAY_LABEL[newStatus] || newStatus;
    
    ext.logs.push({
      timestamp: new Date().toISOString(),
      text: `Estado cambiado de "${oldStatusLabel}" a "${newStatusLabel}" (Rápido)`
    });

    try {
      const res = await api.updateBooking({ ...b, payment_status: newStatus, extras: JSON.stringify(ext) });
      toast(res.status === 'success' ? 'Estado actualizado' : 'Error al actualizar', res.status === 'success');
      load();
    } catch (e) {
      toast('Error de red al actualizar estado', false);
    }
  };

  const handleAddLog = async (b) => {
    const text = annotationTexts[b.id];
    if (!text || !text.trim()) return;
    
    let ext = {};
    try {
      if (typeof b.extras === 'string' && b.extras !== '[object Object]') {
        ext = JSON.parse(b.extras);
      } else if (typeof b.extras === 'object' && b.extras !== null) {
        ext = b.extras;
      }
    } catch(e) {}
    if (!ext.logs) ext.logs = [];
    ext.logs.push({
      timestamp: new Date().toISOString(),
      text: `Anotación: ${text.trim()}`
    });
    
    try {
      await api.updateBooking({ ...b, extras: JSON.stringify(ext) });
      toast('Anotación registrada');
      setAnnotationTexts(prev => ({ ...prev, [b.id]: '' }));
      const updatedBooking = { ...b, extras: JSON.stringify(ext) };
      setModal(prev => prev ? { ...prev, data: updatedBooking } : null);
      load();
    } catch(e) {
      toast('Error al guardar anotación', false);
    }
  };

  const copyLogsToClipboard = (b) => {
    let ext = {};
    try {
      if (typeof b.extras === 'string' && b.extras !== '[object Object]') ext = JSON.parse(b.extras);
      else if (typeof b.extras === 'object' && b.extras !== null) ext = b.extras;
    } catch(e) {}
    const logs = Array.isArray(ext.logs) ? ext.logs : [];
    
    let text = `*BITÁCORA DE OPERACIONES*\n`;
    text += `*Ref:* CT-${(b.reference || String(b.id)).replace('CT-', '')}\n`;
    text += `*Cliente:* ${b.client_name}\n`;
    text += `*Tour:* ${b.tour_title}\n\n`;
    
    if (logs.length === 0) {
      text += `_Sin anotaciones registradas_`;
    } else {
      // Revertimos para copiar en orden cronológico, o dejamos como está (más reciente primero)
      // Lo dejaremos cronológico (el más antiguo primero) para que se lea como una historia.
      [...logs].forEach(log => {
        const logText = typeof log === 'object' && log !== null ? log.text : String(log);
        const logTime = typeof log === 'object' && log !== null ? log.timestamp : null;
        const dateObj = new Date(logTime);
        const baliTime = (logTime && !isNaN(dateObj.getTime())) 
          ? dateObj.toLocaleString('es-ES', { timeZone: 'Asia/Makassar', day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }) 
          : '--';
        text += `• *[${baliTime}]* ${logText.replace('Anotación: ', '')}\n`;
      });
    }
    
    navigator.clipboard.writeText(text);
    toast('📋 Bitácora copiada para WhatsApp');
  };

  const renderBookingLogs = (b) => {
    let ext = {};
    try {
      if (typeof b.extras === 'string' && b.extras !== '[object Object]') {
        ext = JSON.parse(b.extras);
      } else if (typeof b.extras === 'object' && b.extras !== null) {
        ext = b.extras;
      }
    } catch(e) {}
    const logs = Array.isArray(ext.logs) ? ext.logs : [];
    const passengers = Array.isArray(ext.passengers) ? ext.passengers : [];
    const hasCheckin = passengers.length > 0 && passengers.some(p => p.name || p.passport);

    return (
      <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        {/* Timeline */}
        <div style={{background:'#1a1a1a', padding:'24px', borderRadius:'24px', border:'1px solid #ffffff0a', flex:1, display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
            <div style={{fontSize:'12px', fontWeight:900, color:'#fff', letterSpacing:'1px', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'8px'}}>
              <div style={{width:'8px', height:'8px', background:C, borderRadius:'50%'}} /> Historial de Operaciones
            </div>
            <button 
              onClick={() => copyLogsToClipboard(b)}
              style={{background:'#ffffff11', border:`1px solid #ffffff22`, color:'#fff', padding:'4px 12px', borderRadius:'8px', fontSize:'10px', fontWeight:900, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px'}}
              onMouseOver={e=>e.target.style.background='#ffffff22'}
              onMouseOut={e=>e.target.style.background='#ffffff11'}
            >
              📋 Copiar para WP
            </button>
          </div>

          <div style={{marginBottom:'20px', fontSize:'10px', display:'flex', gap:'12px', alignItems:'center', padding:'10px 14px', background:'#ffffff05', borderRadius:'12px', width:'fit-content'}}>
            <span style={{color:C, fontWeight:900}}>Creado (Hora Bali): {new Date(b.created_at).toLocaleString('es-ES', {timeZone: 'Asia/Makassar', day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'})} 🌴</span>
          </div>
          
          <div style={{display:'flex', flexDirection:'column', gap:'16px', maxHeight:'350px', overflowY:'auto', marginBottom:'20px', paddingRight:'8px', scrollbarWidth:'thin'}}>
            {logs.length === 0 ? (
              <div style={{fontSize:'12px', color:'#555', fontStyle:'italic', padding:'20px', textAlign:'center', background:'#111', borderRadius:'16px'}}>Sin anotaciones registradas en el historial.</div>
            ) : (
              [...logs].reverse().map((log, idx) => {
                const logText = typeof log === 'object' && log !== null ? log.text : String(log);
                const logTime = typeof log === 'object' && log !== null ? log.timestamp : null;
                const dateObj = new Date(logTime);
                const isValidDate = logTime && !isNaN(dateObj.getTime());
                const baliTime = isValidDate ? dateObj.toLocaleString('es-ES', { timeZone: 'Asia/Makassar', day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }) : '--';
                const isAuto = !logText.startsWith('Anotación:');
                
                return (
                  <div key={idx} style={{display:'flex', gap:'16px', alignItems:'flex-start'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4px'}}>
                      <div style={{width:'10px', height:'10px', borderRadius:'50%', background: isAuto ? '#555' : C, border:`2px solid #1a1a1a`, zIndex:2}} />
                      {idx !== logs.length - 1 && <div style={{width:'2px', height:'100%', background:'#333', marginTop:'-2px', marginBottom:'-14px', zIndex:1}} />}
                    </div>
                    <div style={{flex:1, background: isAuto ? '#111' : '#11BDDB11', padding:'12px 16px', borderRadius:'16px', border: isAuto ? '1px solid #333' : `1px solid ${C}33`}}>
                      <div style={{fontSize:'12px', color: isAuto ? '#ccc' : '#fff', lineHeight:'1.5', fontWeight: isAuto ? 500 : 700}}>
                        {logText.replace('Anotación: ', '')}
                      </div>
                      <div style={{fontSize:'9px', color:'#666', marginTop:'6px', display:'flex', gap:'12px', fontWeight:900, textTransform:'uppercase'}}>
                        <span>🌴 Hora Bali: {baliTime}</span>
                        {isAuto && <span style={{color:'#888'}}>[SISTEMA]</span>}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{display:'flex', gap:'8px', marginTop:'auto'}}>
            <input 
              value={annotationTexts[b.id] || ''} 
              onChange={e=>setAnnotationTexts({...annotationTexts, [b.id]: e.target.value})} 
              placeholder="Escribe una nota interna..." 
              style={{flex:1, padding:'14px 16px', borderRadius:'16px', border:'1px solid #333', background:'#111', color:'#fff', outline:'none', fontSize:'13px', transition:'border 0.2s'}}
              onFocus={e=>e.target.style.border=`1px solid ${C}`}
              onBlur={e=>e.target.style.border=`1px solid #333`}
              onKeyDown={e => e.key === 'Enter' && handleAddLog(b)}
            />
            <button 
              onClick={()=>handleAddLog(b)} 
              style={{background:C, color:'#000', border:'none', padding:'0 24px', borderRadius:'16px', fontWeight:900, cursor:'pointer', transition:'opacity 0.2s'}}
              onMouseOver={e=>e.target.style.opacity=0.8}
              onMouseOut={e=>e.target.style.opacity=1}
            >Guardar</button>
          </div>
        </div>
      </div>
    );
  };

  const calDays=useMemo(()=>{
    const d=new Date(calMonth.getFullYear(),calMonth.getMonth(),1);
    const days=[];for(let i=0;i<d.getDay();i++)days.push(null);
    while(d.getMonth()===calMonth.getMonth()){days.push(d.getDate());d.setDate(d.getDate()+1);}
    return days;
  },[calMonth]);

  const stats=useMemo(()=>{
    const list = (bookings || []).filter(b => b && b.payment_status !== 'blocked');
    const isPaid = s => ['payment_confirmed','payment_received','verifying_payment','reserved','confirmed','in_progress','completed'].includes(s);
    const rev = list.filter(b => b && isPaid(b.payment_status)).reduce((a,b) => a + Number(b.total_price || 0), 0);
    const byTour = list.reduce((a,b) => {
      if (!b || !b.tour_title) return a;
      return {...a, [b.tour_title]: (a[b.tour_title] || 0) + 1};
    }, {});
    const top = Object.entries(byTour).sort((a,b) => b[1] - a[1])[0]?.[0] || 'Ninguno';
    return {rev, total: list.length, top, paid: list.filter(b => b && isPaid(b.payment_status)).length};
  }, [bookings]);

  const recent=bookings.filter(b=>{const d=parseLocalDate(b.booking_date);const y=new Date();y.setDate(y.getDate()-1);return d<=y && d>new Date(y.getTime()-7*24*60*60*1000);});

  const s={
    btn:(bg,c='#fff')=>({background:bg,color:c,border:'none',padding:'8px 16px',borderRadius:'12px',fontWeight:900,cursor:'pointer',fontSize:'12px',transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px'}),
    card:{background:theme.card,borderRadius:'16px',padding:'16px',marginBottom:'12px',display:'flex',flexDirection:'column',gap:'16px',border:`1px solid ${theme.border}`, position:'relative', boxShadow: theme.shadow},
    tag:(c)=>({background:c+'22',color:c,padding:'2px 8px',borderRadius:'8px',fontSize:'10px',fontWeight:900,textTransform:'uppercase'}),
    tabBtn:(a)=>({background:a?C+'22':'transparent',color:a?C:theme.text,border:'none',padding:'10px 20px',borderRadius:'14px',fontWeight:900,cursor:'pointer', whiteSpace:'nowrap', fontSize:'13px', transition:'all 0.3s'})
  };

  if (!authed) return (
    <div style={{minHeight:'100vh',background:theme.bg,display:'flex',alignItems:'center',justifyContent:'center', padding:'20px'}}>
      <div style={{background:theme.card,padding:'40px',borderRadius:'32px',width:'100%',maxWidth:'380px',borderTop:`8px solid ${C}`, boxShadow: theme.shadow}}>
        <h2 style={{color:theme.text,textAlign:'center',marginBottom:'30px', fontSize:'28px', fontWeight:900}}>Cantik <span style={{color:C}}>Admin</span></h2>
        <form onSubmit={async e => {
          e.preventDefault();
          setLoading(true);
          try {
            await apiLogin(password);
            await load();
          } catch (err) {
            toast(err.message || 'Contraseña incorrecta', false);
          } finally { setLoading(false); }
        }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Introduce el PIN" style={{width:'100%',padding:'16px',borderRadius:'16px',border:`1px solid ${theme.border}`,background:theme.bg,color:theme.text,marginBottom:'16px',boxSizing:'border-box', textAlign:'center', fontSize:'18px', fontWeight:900}}/>
          <button type="submit" style={{...s.btn(C),width:'100%',padding:'16px', fontSize:'16px'}}>{loading?'Autenticando...':'Entrar'}</button>
        </form>
      </div>
    </div>
  );

  return(
    <div style={{paddingTop: isMobile ? '135px' : '90px', paddingBottom:'40px',minHeight:'100vh',background:theme.bg,color:theme.text, fontFamily:'"Inter", sans-serif'}}>
      
      {/* MENU SUPERIOR / SETTINGS & NAVIGATION */}
      <div style={{position:'fixed', top:0, left:0, right:0, zIndex:100, background:theme.header, backdropFilter:'blur(20px)', borderBottom:`1px solid ${theme.border}`, padding: isMobile ? '12px 0 6px 0' : '14px 0'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto', padding:'0 16px', display:'flex', flexDirection: 'column', gap: isMobile ? '10px' : '0px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
              <div style={{width:'32px', height:'32px', background:C, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontWeight:900}}>C</div>
              <div style={{fontSize:'16px', fontWeight:900, letterSpacing:'-0.5px', color: theme.text}}>CANTIK <span style={{color:C}}>ADMIN</span></div>
            </div>
            
            {/* Desktop Tabs integrated in Header */}
            {!isMobile && (
              <div style={{display:'flex', gap:'4px', background:theme.tabBg, padding:'4px', borderRadius:'14px'}}>
                {TABS.map(t => {
                  const count = t === 'bookings' ? pendingValidationCount : 0;
                  return (
                    <button 
                      key={t} 
                      style={{...s.tabBtn(tab===t), fontSize:'12px', padding:'6px 12px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px'}} 
                      onClick={()=>setTab(t)}
                    >
                      <span>{TLABEL[t]}</span>
                      {count > 0 && (
                        <span style={{background:'#ef4444', color:'#fff', fontSize:'9px', fontWeight:900, borderRadius:'99px', minWidth:'14px', padding:'1px 4px', lineHeight:1, display:'inline-block', textAlign:'center'}}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <button 
                onClick={toggleDarkMode} 
                style={{...s.btn(theme.btnGhost, theme.text), width:'36px', height:'36px', padding:0, border:`1px solid ${theme.border}`}}
                title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              <div style={{width:'1px', height:'20px', background:theme.border, margin:'0 4px'}}></div>

              <button 
                onClick={async () => { await logout().catch(()=>{}); setAuthed(false); window.location.reload(); }} 
                style={{...s.btn('#ef444415', '#ef4444'), width:'36px', height:'36px', padding:0}}
                title="Cerrar Sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Mobile Tabs sub-header */}
          {isMobile && (
            <div style={{display:'flex', gap:'4px', background:theme.tabBg, padding:'4px', borderRadius:'14px', overflowX:'auto', scrollbarWidth:'none', msOverflowStyle:'none', marginTop:'4px'}}>
              {TABS.map(t => {
                const count = t === 'bookings' ? pendingValidationCount : 0;
                return (
                  <button 
                    key={t} 
                    style={{...s.tabBtn(tab===t), fontSize:'11px', padding:'6px 10px', borderRadius:'8px', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:'4px'}} 
                    onClick={()=>setTab(t)}
                  >
                    <span>{TLABEL[t]}</span>
                    {count > 0 && (
                      <span style={{background:'#ef4444', color:'#fff', fontSize:'8px', fontWeight:900, borderRadius:'99px', minWidth:'12px', padding:'1px 3px', lineHeight:1}}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
          <h2 style={{margin:0, fontSize:'22px', fontWeight:900, color:'#fff', letterSpacing:'-0.5px'}}>{TLABEL[tab]}</h2>
        </div>

        {msg&&(
          <div style={{
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            zIndex: 9999,
            padding: '16px 24px',
            borderRadius: '16px',
            background: msg.ok ? '#10b981' : '#ef4444',
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            fontWeight: 900,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{fontSize:'20px'}}>{msg.ok ? '✅' : '⚠️'}</span>
            <span>{msg.t}</span>
          </div>
        )}

        {['bookings','drivers','reviews','coupons'].includes(tab) && <>
          <div style={{display:'flex', gap:'12px', marginBottom:'16px', flexWrap:'wrap', alignItems:'center'}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar..." style={{flex:'1 1 200px', padding:'12px', borderRadius:'14px', background:theme.card, border:`1px solid ${theme.border}`, color:theme.text, fontSize:'13px', minWidth:'150px'}}/>
            
            {tab==='bookings' && (
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                style={{
                  ...s.btn(showFilters ? C : theme.btnGhost, showFilters ? '#000' : theme.text), 
                  border: showFilters ? `1px solid ${C}` : `1px solid ${theme.border}`, 
                  fontSize: '13px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontWeight: 900
                }}
              >
                Filtros ⚙️
              </button>
            )}

            <div style={{display:'flex', gap:'8px', marginLeft:'auto'}}>
              <button 
                style={{...s.btn(theme.btnGhost, theme.text), border:`1px solid ${theme.border}`, flexShrink:0, opacity: reloading ? 0.6 : 1}} 
                onClick={reload} 
                disabled={reloading}
                title="Refrescar"
              >
                <RefreshCcw size={16} className={reloading ? "animate-spin" : ""} />
              </button>
              <button style={{...s.btn(C), flexShrink:0}} onClick={()=>openNew({bookings:'booking',drivers:'driver',reviews:'review',coupons:'coupon'}[tab])} title="Nuevo"><Plus size={16} /></button>
              {tab==='bookings'&&<button style={{...s.btn('#10b981'), flexShrink:0}} onClick={exportCSV} title="Exportar CSV"><Download size={16} /></button>}
            </div>
          </div>

          {tab==='bookings' && showFilters && (
            <div style={{
              display:'flex', 
              gap:'12px', 
              marginBottom:'16px', 
              flexWrap:'wrap', 
              padding:'16px', 
              background:'#ffffff03', 
              borderRadius:'18px', 
              border:`1px solid ${theme.border}`
            }}>
              {/* Selector de Orden */}
              <div style={{display:'flex', flexDirection:'column', gap:'6px', flex:'1 1 200px'}}>
                <label style={{fontSize:'10px', fontWeight:900, color:'#888', textTransform:'uppercase'}}>Ordenar por</label>
                <select 
                  value={sortBy} 
                  onChange={e=>setSortBy(e.target.value)} 
                  style={{padding:'12px', borderRadius:'12px', background:theme.card, border:`1px solid ${theme.border}`, color:theme.text, fontSize:'13px', outline:'none', cursor:'pointer', width:'100%'}}
                >
                  <option value="tour_date_desc">📅 Fecha Tour (Recientes primero)</option>
                  <option value="tour_date_asc">📅 Fecha Tour (Antiguos primero)</option>
                  <option value="created_at_desc">➕ Fecha Creación (Recientes primero)</option>
                  <option value="created_at_asc">➕ Fecha Creación (Antiguos primero)</option>
                </select>
              </div>

              {/* Filtro por Chofer */}
              <div style={{display:'flex', flexDirection:'column', gap:'6px', flex:'1 1 200px'}}>
                <label style={{fontSize:'10px', fontWeight:900, color:'#888', textTransform:'uppercase'}}>Filtrar por Chofer</label>
                <select 
                  value={driverFilter} 
                  onChange={e=>setDriverFilter(e.target.value)} 
                  style={{padding:'12px', borderRadius:'12px', background:theme.card, border:`1px solid ${theme.border}`, color:theme.text, fontSize:'13px', outline:'none', cursor:'pointer', width:'100%'}}
                >
                  <option value="ALL">👤 Todos los Choferes</option>
                  <option value="null">👤 Sin Chofer Asignado</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>👤 {d.name}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Estado */}
              <div style={{display:'flex', flexDirection:'column', gap:'6px', flex:'1 1 100%'}}>
                <label style={{fontSize:'10px', fontWeight:900, color:'#888', textTransform:'uppercase'}}>Filtrar por Estado</label>
                <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
                  {[
                    { k: 'ALL', l: 'Todas 📋' },
                    { k: 'PENDING_PAYMENT', l: 'Pago Pendiente ⌛' },
                    { k: 'CONFIRMED', l: 'Confirmadas ✅' },
                    { k: 'COMPLETED', l: 'Completadas 🏁' },
                    { k: 'CANCELLED', l: 'Canceladas ❌' }
                  ].map(p => {
                    const isActive = statusFilter === p.k;
                    return (
                      <button
                        key={p.k}
                        onClick={() => setStatusFilter(p.k)}
                        style={{
                          background: isActive ? C : '#ffffff05',
                          color: isActive ? '#000' : '#888',
                          border: isActive ? `1px solid ${C}` : '1px solid #ffffff05',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          fontSize: '11px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {p.l}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {tab==='bookings'&&filter(bookings).map(b=>(
            <div key={b.id} style={{...s.card, cursor:'pointer', border: expandedId===b.id ? `1px solid ${C}` : '1px solid #ffffff05'}} onClick={()=>setExpandedId(expandedId===b.id?null:b.id)}>
              {/* BLOQUE SUPERIOR: Siempre visible */}
              <div style={{display:'flex', gap:'16px', alignItems:'flex-start', width:'100%'}}>
                <div style={{background:C+'22',color:C,padding:'8px',borderRadius:'14px',textAlign:'center',minWidth:'40px', height:'fit-content'}}>
                  <div style={{fontSize:'9px',fontWeight:900}}>{parseLocalDate(b.booking_date).toLocaleString('es',{month:'short'}).toUpperCase()}</div>
                  <div style={{fontSize:'18px',fontWeight:900}}>{parseLocalDate(b.booking_date).getDate()}</div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap', marginBottom:'2px'}}>
                    <div style={{fontWeight:900, fontSize: isMobile ? '14px' : '16px', color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{b.client_name}</div>
                    {b.reference && <span style={{fontSize:'9px', background:C+'22', padding:'1px 6px', borderRadius:'4px', fontWeight:900, color:C}}>CT-{b.reference.replace('CT-', '')}</span>}
                    {b.payment_status === 'verifying_payment' && (
                       <span 
                         onClick={(e) => {
                           e.stopPropagation();
                           setModal({type:'finance', action:'view', data:b});
                         }}
                         title="Comprobante de pago pendiente de validar (Haz clic para validar)" 
                         style={{
                           fontSize:'9px',
                           background:'rgba(59, 130, 246, 0.15)',
                           color:'#3b82f6',
                           border:'1px solid rgba(59, 130, 246, 0.25)',
                           padding:'1px 6px',
                           borderRadius:'4px',
                           fontWeight:900,
                           display:'inline-flex',
                           alignItems:'center',
                           gap:'2px',
                           cursor:'pointer'
                         }}
                       >
                         🔔 Validar Pago
                       </span>
                     )}
                    {(() => {
                      let ext = {};
                      try {
                        if (typeof b.extras === 'string' && b.extras !== '[object Object]') {
                          ext = JSON.parse(b.extras);
                        } else if (typeof b.extras === 'object' && b.extras !== null) {
                          ext = b.extras;
                        }
                      } catch(e){}
                      const passengers = Array.isArray(ext.passengers) ? ext.passengers : [];
                      const completedPassengers = passengers.filter(p => p.name && p.name.trim() !== '').length;
                      const expectedPax = Number(b.pax || 1);
                      const hasCheckin = completedPassengers >= expectedPax;
                      if (!hasCheckin) return (
                        <span 
                          title="Check-In de pasajeros pendiente" 
                          style={{
                            fontSize:'9px',
                            background:'rgba(245, 158, 11, 0.15)',
                            color:'#f59e0b',
                            border:'1px solid rgba(245, 158, 11, 0.25)',
                            padding:'1px 6px',
                            borderRadius:'4px',
                            fontWeight:900,
                            display:'inline-flex',
                            alignItems:'center',
                            gap:'2px'
                          }}
                        >
                          ⚠️ Pax
                        </span>
                      );
                      return null;
                    })()}
                  </div>
                  <div style={{fontSize:'11px',color:C, fontWeight:900}}>{b.tour_title}</div>
                  {(() => {
                    const extraCharges = Number(b.total_charges || 0);
                    const paid = Number(b.total_paid || 0);
                    const total = Number(b.total_price || 0) + extraCharges;
                    const pct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
                    return (
                      <div style={{display:'flex', alignItems:'center', gap:'8px', marginTop:'6px'}}>
                        <div style={{width:'80px', height:'4px', background:'#ffffff0c', borderRadius:'2px', overflow:'hidden'}}>
                          <div style={{width:`${pct}%`, height:'100%', background: pct >= 100 ? '#10b981' : pct > 0 ? '#f59e0b' : '#444'}} />
                        </div>
                        <span style={{fontSize:'9px', color: pct >= 100 ? '#10b981' : pct > 0 ? '#f59e0b' : '#888', fontWeight: 900}}>
                          {pct}% cobrado ({paid}€)
                        </span>
                      </div>
                    );
                  })()}
                  <div style={{marginTop:'4px'}} onClick={e=>e.stopPropagation()}>
                    <select 
                      value={b.payment_status} 
                      onChange={e => handleQuickStatusChange(b, e.target.value)}
                      style={{
                        background: PAY_COLOR[b.payment_status] + '22',
                        color: PAY_COLOR[b.payment_status],
                        border: `1px solid ${PAY_COLOR[b.payment_status]}55`,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        outline: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                        paddingRight: '16px' // space for custom arrow if needed
                      }}
                    >
                      {[
                        {k:'requested', l:'Solicitud Recibida'},
                        {k:'pending_payment', l:'Pago Pendiente'},
                        {k:'verifying_payment', l:'Validar Comprobante 🔔'},
                        {k:'payment_confirmed', l:'Pago Confirmado'},
                        {k:'reserved', l:'Ratificando Disp.'},
                        {k:'confirmed', l:'Tour Confirmado'},
                        {k:'in_progress', l:'Tour en Curso'},
                        {k:'completed', l:'Tour Finalizado'},
                        {k:'postponed', l:'Pospuesto'},
                        {k:'cancelled', l:'Cancelado'},
                        {k:'refunded', l:'Reembolsado'}
                      ].map(opt => (
                        <option key={opt.k} value={opt.k} style={{background:'#1a1a1a', color:'#fff'}}>{opt.l}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{textAlign:'right', flexShrink:0}}>
                   <div style={{fontSize:'16px', fontWeight:900, color:C}}>
                     {(() => {
                       let ext = {};
                       try { ext = typeof b.extras === 'string' ? JSON.parse(b.extras) : (b.extras || {}); } catch(e){}
                       return Number(b.total_price || 0) + Number(ext.total_charges || 0);
                     })()}€
                   </div>
                   <div style={{fontSize:'9px', fontWeight:700, color:'#555'}}>{b.pax} PAX</div>
                </div>
              </div>

              {/* DETALLES OCULTOS: Se expanden al hacer clic */}
              {expandedId === b.id && (
                <div style={{marginTop:'16px', paddingTop:'16px', borderTop:'1px solid #ffffff05', width:'100%', display:'flex', flexDirection:'column', gap:'12px'}}>
                  
                  {/* Grid de Centro de Control */}
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:'8px', width:'100%', marginTop:'8px'}}>
                    
                    {/* -- GESTIÓN PRINCIPAL -- */}
                    <button style={{...s.btn(C+'11',C), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); openEdit('booking',b)}} title="Editar Reserva">
                      <Pencil size={16} /><span style={{fontSize:'11px'}}>Editar Datos</span>
                    </button>
                    
                    <button style={{...s.btn(C+'11',C), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); setModal({type:'itinerary', action:'edit', data:b})}} title="Editar Itinerario">
                      <MapPin size={16} /><span style={{fontSize:'11px'}}>Itinerario</span>
                    </button>

                    <button style={{...s.btn(C+'11',C), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); setModal({type:'logs', action:'view', data:b})}} title="Bitácora y Contexto">
                      <Clipboard size={16} /><span style={{fontSize:'11px'}}>Bitácora</span>
                    </button>

                    <button style={{...s.btn(C+'11',C), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); setModal({type:'passengers', action:'edit', data:b})}} title="Gestionar Pasajeros (Check-In)">
                      <Users size={16} /><span style={{fontSize:'11px'}}>Check-In Pax</span>
                    </button>

                      {(() => {
                        let ext = {};
                        try {
                          if (typeof b.extras === 'string' && b.extras !== '[object Object]') ext = JSON.parse(b.extras);
                          else if (typeof b.extras === 'object' && b.extras !== null) ext = b.extras;
                        } catch(e){}
                        const receipts = ext.receipts || (ext.receipt_url ? [{ url: ext.receipt_url, filename: 'Comprobante', timestamp: b.updated_at }] : []);
                        if (receipts.length > 0) {
                          return receipts.map((r, rIdx) => {
                            const fullReceiptUrl = r.url.startsWith('http') 
                              ? r.url 
                              : `https://cantik-tours.onrender.com${r.url}`;
                            const displayLabel = receipts.length > 1 
                              ? `Comprobante #${rIdx + 1}` 
                              : 'Ver Comprobante';
                            return (
                              <a 
                                key={rIdx}
                                href={fullReceiptUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{...s.btn('#3b82f611','#3b82f6'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px', display:'inline-flex', alignItems:'center', textDecoration:'none', border:'1px solid rgba(59, 130, 246, 0.25)', borderRadius:'12px'}} 
                                onClick={e=>e.stopPropagation()}
                                title={receipts.length > 1 ? `Ver ${r.filename || `Comprobante #${rIdx + 1}`}` : 'Ver Comprobante de Pago'}
                              >
                                <ExternalLink size={16} />
                                <span style={{fontSize:'11px'}}>{displayLabel}</span>
                              </a>
                            );
                          });
                        }
                        return null;
                      })()}

                    <button style={{...s.btn(C+'11',C), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); handleManagePayments(b)}} title="Finanzas">
                      <Wallet size={16} /><span style={{fontSize:'11px'}}>Finanzas</span>
                    </button>

                    <button style={{...s.btn(C+'11',C), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); setModal({type:'assign_driver', action:'update', data:b})}} title="Asignar Chofer">
                      <Car size={16} /><span style={{fontSize:'11px'}}>Chofer</span>
                    </button>

                    {/* -- COMUNICACIÓN -- */}
                    <a href={b.client_phone ? waLink(b.client_phone, `¡Hola ${b.client_name}! Soy de Cantik Tours.`) : '#'} target={b.client_phone ? "_blank" : "_self"} rel="noreferrer" onClick={e => { if (!b.client_phone) { e.preventDefault(); toast('Sin número', false); } e.stopPropagation(); }} style={{...s.btn(b.client_phone ? '#25D36611' : '#ffffff05', b.client_phone ? '#25D366' : '#666'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px', opacity: b.client_phone ? 1 : 0.5, pointerEvents: b.client_phone ? 'auto' : 'none'}}>
                      <MessageCircle size={16} /><span style={{fontSize:'11px'}}>WhatsApp</span>
                    </a>

                    <button style={{...s.btn('#ffffff05','#fff'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); generateVoucher(b,drivers)}} title="Generar Voucher">
                      <Ticket size={16} /><span style={{fontSize:'11px'}}>Voucher</span>
                    </button>

                    <button style={{...s.btn('#ffffff05','#fff'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{ e.stopPropagation(); const ref = b.reference ? (b.reference.startsWith('CT-') ? b.reference : `CT-${b.reference}`) : `CT-${b.id}`; navigator.clipboard.writeText(`https://cantiktours.com/booking?ref=${ref}`); toast('Link público copiado ✓', true); }} title="Copiar Link Público">
                      <ExternalLink size={16} /><span style={{fontSize:'11px'}}>Booking</span>
                    </button>

                    <button style={{...s.btn('#f59e0b11','#f59e0b'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); copyReviewLink(b, 'es')}} title="Copiar Link y Enviar WhatsApp (Español)">
                      <Star size={16} /><span style={{fontSize:'11px'}}>Review ES</span>
                    </button>

                    <button style={{...s.btn('#f59e0b11','#f59e0b'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); copyReviewLink(b, 'en')}} title="Copiar Link y Enviar WhatsApp (Inglés)">
                      <Star size={16} /><span style={{fontSize:'11px'}}>Review EN</span>
                    </button>

                    {/* -- ZONA DE PELIGRO -- */}
                    <button style={{...s.btn('#ef444411','#ef4444'), height:'44px', padding:'0 12px', justifyContent:'flex-start', gap:'8px'}} onClick={e=>{e.stopPropagation(); del('booking',b.id)}}>
                      <Trash2 size={16} /><span style={{fontSize:'11px'}}>Eliminar</span>
                    </button>

                  </div>
                </div>
              )}
            </div>
          ))}
          {tab==='drivers'&&filter(drivers).map(d=>(
            <div key={d.id} style={s.card}>
              <div><div style={{fontWeight:900}}>{d.name}</div><div style={{color:'#666',fontSize:'12px'}}>{d.car_model}</div></div>
              <div style={{display:'flex',gap:'6px'}}>
                <button style={{...s.btn('#ffffff15','#fff'), width:'36px', height:'36px', padding:0}} title="Editar" onClick={()=>openEdit('driver',d)}><Pencil size={16} /></button>
                <button style={{...s.btn('#ef444422','#ef4444'), width:'36px', height:'36px', padding:0}} title="Eliminar" onClick={()=>del('driver',d.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {tab==='reviews'&&filter(reviews).map(r=>(
            <div key={r.id} style={s.card}>
              <div style={{flex:1}}>
                <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom:'4px', flexWrap:'wrap'}}>
                  <div style={{fontWeight:900}}>{r.nombre} {'★'.repeat(Math.max(1, Math.min(5, Math.round(Number(r.puntuacion)) || 5)))}</div>
                  {r.tour_id && String(r.tour_id).includes('[CT-') && (
                    <button style={s.tag(C)} onClick={() => {
                        const id = r.tour_id && String(r.tour_id).match(/\[CT-(\d+)\]/)?.[1];
                        if(id) {
                           const b = bookings.find(x => x.id == id);
                           if(b) openEdit('booking', b);
                           else toast('Reserva no encontrada en la lista', false);
                        }
                    }}>VER RESERVA</button>
                  )}
                </div>
                <div style={{fontSize:'12px',color:'#888',display:'flex',flexDirection:'column',gap:'6px',marginTop:'8px'}}>
                  <div><strong style={{color:'#aaa',fontSize:'10px',textTransform:'uppercase',marginRight:'4px'}}>ES:</strong> "{r.comentario}"</div>
                  <div style={{display:'flex',alignItems:'flex-start',gap:'4px'}}>
                    <strong style={{color:'#aaa',fontSize:'10px',textTransform:'uppercase',marginRight:'4px',marginTop:'2px'}}>EN:</strong>
                    {r.comentario_en ? (
                      <span>"{r.comentario_en}"</span>
                    ) : (
                      <span style={{color:'#f59e0b',fontStyle:'italic',fontWeight:500,background:'#f59e0b15',padding:'2px 6px',borderRadius:'6px',fontSize:'11px'}}>
                        Pendiente de traducción
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                <button style={{...s.btn('#ffffff15','#fff'), width:'36px', height:'36px', padding:0}} title="Editar" onClick={()=>openEdit('review',r)}><Pencil size={16} /></button>
                <button style={{...s.btn('#ef444422','#ef4444'), width:'36px', height:'36px', padding:0}} title="Eliminar" onClick={()=>del('review',r.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {tab==='coupons'&&filter(coupons).map(c=>(
            <div key={c.id} style={s.card}>
              <div><div style={{fontWeight:900}}>{c.code}</div><div style={{fontSize:'12px',color:'#666'}}>{c.discount_value}${c.discount_type==='percent'?'%':'€'}</div></div>
              <div style={{display:'flex',gap:'6px'}}>
                <button style={{...s.btn('#ffffff15','#fff'), width:'36px', height:'36px', padding:0}} title="Editar" onClick={()=>openEdit('coupon',c)}><Pencil size={16} /></button>
                <button style={{...s.btn('#ef444422','#ef4444'), width:'36px', height:'36px', padding:0}} title="Eliminar" onClick={()=>del('coupon',c.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </>}

        {tab==='calendar'&&(
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <div style={{background:'#1a1a1a',borderRadius:'24px',padding: isMobile ? '16px' : '24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <button style={s.btn('#222')} onClick={()=>{setCalMonth(new Date(calMonth.getFullYear(),calMonth.getMonth()-1)); setSelectedCalDay(null);}}>◀</button>
                <h3 style={{margin:0, textTransform:'capitalize'}}>{calMonth.toLocaleString('es',{month:'long',year:'numeric'})}</h3>
                <button style={s.btn('#222')} onClick={()=>{setCalMonth(new Date(calMonth.getFullYear(),calMonth.getMonth()+1)); setSelectedCalDay(null);}}>▶</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'6px'}}>
                {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d=><div key={d} style={{textAlign:'center',fontSize:'11px',fontWeight:900,color:'#666',paddingBottom:'8px'}}>{d}</div>)}
                {calDays.map((d,i)=>{
                  if (!d) return <div key={i} style={{aspectRatio:'1',background:'transparent'}} />;
                  
                  const dayBookings = bookings.filter(b => {
                    const dObj = parseLocalDate(b.booking_date);
                    return dObj.getDate() === d && dObj.getMonth() === calMonth.getMonth() && dObj.getFullYear() === calMonth.getFullYear();
                  });
                  const isBlocked = dayBookings.some(b => b.payment_status === 'blocked');
                  const validBookings = dayBookings.filter(b => b.payment_status !== 'blocked');
                  const isSelected = selectedCalDay === d;

                  return (
                  <div key={i} onClick={()=>setSelectedCalDay(d)} style={{
                    aspectRatio:'1',
                    background: isSelected ? C+'22' : '#222',
                    borderRadius:'12px',
                    padding:'6px', 
                    cursor:'pointer', 
                    position:'relative', 
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-between',
                    alignItems:'center',
                    border: isSelected ? `2px solid ${C}` : isBlocked ? '1px solid #ef444444' : '1px solid transparent', 
                    transition:'all 0.2s'
                  }}>
                    <div style={{fontSize:'13px',fontWeight:900, color: isBlocked ? '#ef4444' : '#fff'}}>{d}</div>
                    
                    <div style={{display:'flex', gap:'2px', flexWrap:'wrap', justifyContent:'center', marginTop:'4px'}}>
                      {isBlocked && <Lock size={12} color="#ef4444" />}
                      {!isBlocked && validBookings.length > 0 && (
                        <div style={{
                          background: C, 
                          color: '#000', 
                          fontSize: '8px', 
                          fontWeight: 900, 
                          borderRadius: '6px', 
                          padding: '1px 4px', 
                          minWidth: '10px', 
                          textAlign: 'center'
                        }}>
                          {validBookings.length}
                        </div>
                      )}
                    </div>
                  </div>
                )})}
              </div>
            </div>

            {/* Detalle del Día Seleccionado */}
            {selectedCalDay && (() => {
              const d = selectedCalDay;
              const dayBookings = bookings.filter(b => {
                const dObj = parseLocalDate(b.booking_date);
                return dObj.getDate() === d && dObj.getMonth() === calMonth.getMonth() && dObj.getFullYear() === calMonth.getFullYear();
              });
              const isBlocked = dayBookings.some(b => b.payment_status === 'blocked');
              const validBookings = dayBookings.filter(b => b.payment_status !== 'blocked');
              
              return (
                <div style={{background:theme.card, borderRadius:'24px', padding:'24px', border:`1px solid ${theme.border}`, boxShadow: theme.shadow}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px', marginBottom:'20px', borderBottom:`1px solid ${theme.border}`, paddingBottom:'16px'}}>
                    <div>
                      <h4 style={{margin:0, fontSize:'18px', fontWeight:900}}>
                        {new Date(calMonth.getFullYear(), calMonth.getMonth(), d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </h4>
                      <p style={{margin:'4px 0 0 0', fontSize:'13px', color:'#888'}}>
                        {isBlocked ? 'Este día está bloqueado para nuevas reservas' : `${validBookings.length} reservas programadas`}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleBlock(d)} 
                      style={s.btn(isBlocked ? '#10b981' : '#ef4444', '#fff')}
                    >
                      {isBlocked ? <Unlock size={14} /> : <Lock size={14} />}
                      {isBlocked ? 'Desbloquear Día' : 'Bloquear Día'}
                    </button>
                  </div>

                  <h5 style={{margin:'0 0 12px 0', fontSize:'13px', fontWeight:900, color:'#888', textTransform:'uppercase', letterSpacing:'1px'}}>Reservas de la Jornada</h5>
                  
                  {validBookings.length === 0 ? (
                    <div style={{padding:'20px', textAlign:'center', color:'#555', border:`2px dashed ${theme.border}`, borderRadius:'16px'}}>
                      No hay reservas programadas para este día
                    </div>
                  ) : (
                    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                      {validBookings.map(b => (
                        <div key={b.id} style={{
                          background: theme.bg,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '16px',
                          padding: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}>
                          <div>
                            <div style={{fontWeight:900, fontSize:'15px'}}>{b.client_name}</div>
                            <div style={{fontSize:'12px', color: C, fontWeight:700, marginTop:'2px'}}>{b.tour_title}</div>
                            <div style={{fontSize:'11px', color:'#777', marginTop:'4px'}}>
                              📍 Hotel: {b.hotel} • 👥 Pax: {b.pax}
                            </div>
                          </div>
                          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px'}}>
                            <div style={{fontWeight:900, fontSize:'16px'}}>{b.total_price}€</div>
                            <span style={s.tag(PAY_COLOR[b.payment_status] || '#555')}>{PAY_LABEL[b.payment_status] || b.payment_status}</span>
                            <button 
                              style={{...s.btn('rgba(255,255,255,0.05)', theme.text), padding:'4px 8px', borderRadius:'8px', fontSize:'10px'}} 
                              onClick={() => {
                                setTab('bookings');
                                setSearch(b.reference || b.client_name);
                              }}
                            >
                              Ver Ficha
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {tab==='stats'&&(
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            
            {/* Visual Objective Progress */}
            {(() => {
              const TARGET_MONTHLY = 5000;
              const currentRev = detailedStats?.revenue || 0;
              const pct = Math.min(100, (currentRev / TARGET_MONTHLY) * 100);
              return (
                <div style={{background:'#1a1a1a', padding:'24px', borderRadius:'24px', border:'1px solid #ffffff05', position:'relative', overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,0.2)'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'16px', position:'relative', zIndex:2}}>
                    <div>
                      <div style={{fontSize:'12px', fontWeight:900, color:'#888', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px'}}>Progreso de Ingresos del Mes (Objetivo: {TARGET_MONTHLY}€)</div>
                      <div style={{fontSize:'32px', fontWeight:900, color:'#fff'}}>{currentRev.toFixed(0)}€ <span style={{fontSize:'16px', color:'#666', fontWeight:700}}>/ {TARGET_MONTHLY}€</span></div>
                    </div>
                    <div style={{fontSize:'24px', fontWeight:900, color: pct >= 100 ? '#10b981' : C}}>{pct.toFixed(1)}%</div>
                  </div>
                  <div style={{width:'100%', height:'16px', background:'#ffffff0a', borderRadius:'99px', overflow:'hidden', position:'relative', zIndex:2}}>
                    <div style={{
                      width: `${pct}%`, height:'100%', borderRadius:'99px',
                      background: `linear-gradient(90deg, #11BDDB, #10b981)`,
                      boxShadow: '0 0 10px rgba(17,189,219,0.5)',
                      transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  </div>
                  <div style={{
                    position:'absolute', top:0, right:0, bottom:0, width:'200px',
                    background:`radial-gradient(circle at right, ${C}15 0%, transparent 70%)`,
                    zIndex:1
                  }} />
                </div>
              );
            })()}

            <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit,minmax(200px,1fr))',gap: isMobile ? '10px' : '16px'}}>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#666', textTransform:'uppercase', marginBottom:'8px'}}>Cobrado (Caja)</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:C}}>{(detailedStats?.revenue || 0).toFixed(0)}€</div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Total de la reserva: {(detailedStats?.expected_revenue || 0).toFixed(0)}€</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #f59e0b44'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#f59e0b', textTransform:'uppercase', marginBottom:'8px'}}>Pendiente Cobro</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#f59e0b'}}>{(detailedStats?.pending_collection || 0).toFixed(0)}€</div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Fuga de capital (A reclamar)</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ef444444'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#ef4444', textTransform:'uppercase', marginBottom:'8px'}}>Gastos (Operación)</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#ef4444'}}>{(detailedStats?.expenses || 0).toFixed(0)}€</div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Choferes, Tickets, etc.</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #10b98144'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#10b981', textTransform:'uppercase', marginBottom:'8px'}}>Beneficio Neto</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#10b981'}}>{(detailedStats?.profit || 0).toFixed(0)}€</div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Rentabilidad global real</div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: isMobile ? '10px' : '16px'}}>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#666', textTransform:'uppercase', marginBottom:'8px'}}>Total Reservas</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#fff'}}>{detailedStats?.total_bookings || 0}</div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Reservas ingresadas</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #10b98115'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#10b981', textTransform:'uppercase', marginBottom:'8px'}}>Tours Realizados</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#10b981'}}>{detailedStats?.completed_bookings || 0}</div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Confirmados, en curso o finalizados</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:C, textTransform:'uppercase', marginBottom:'8px'}}>Tasa de Conversión</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:C}}>
                  {(((detailedStats?.completed_bookings || 0) / (detailedStats?.total_bookings || 1)) * 100).toFixed(1)}%
                </div>
                <div style={{fontSize:'10px',color:'#888',marginTop:'4px'}}>Éxito de tours finalizados</div>
              </div>
            </div>

            {/* GRÁFICOS VISUALES */}
            <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'20px', marginTop:'12px'}}>
              {/* Tendencia de Ingresos */}
              <div style={{background:'#1a1a1a', padding:'24px', borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <h3 style={{margin:'0 0 16px 0', fontSize:'14px', fontWeight:900, color:C, letterSpacing:'0.5px', textTransform:'uppercase'}}>Ingresos Mensuales (€)</h3>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', height:'180px', padding:'10px 0', borderBottom:'1px solid #ffffff11'}}>
                  {statsCharts.monthlyData.map((d, i) => {
                    const maxRev = Math.max(...statsCharts.monthlyData.map(x => x.revenue), 100);
                    const pct = (d.revenue / maxRev) * 100;
                    return (
                      <div key={i} style={{flex: 1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px'}}>
                        <div style={{fontSize:'9px', fontWeight:900, color:C}}>{d.revenue.toFixed(0)}€</div>
                        <div style={{width:'24px', height:`${Math.max(10, pct * 1.2)}px`, background:`linear-gradient(to top, ${C}33, ${C})`, borderRadius:'6px', transition:'all 0.5s'}}></div>
                        <div style={{fontSize:'8px', color:'#666', fontWeight:900}}>{d.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tours Populares */}
              <div style={{background:'#1a1a1a', padding:'24px', borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <h3 style={{margin:'0 0 16px 0', fontSize:'14px', fontWeight:900, color:C, letterSpacing:'0.5px', textTransform:'uppercase'}}>Tours Más Vendidos (Popularidad)</h3>
                <div style={{display:'flex', flexDirection:'column', gap:'12px', padding:'10px 0'}}>
                  {statsCharts.popularTours.length === 0 ? (
                    <div style={{fontSize:'12px', color:'#666', fontStyle:'italic', textAlign:'center', padding:'20px 0'}}>Sin datos suficientes.</div>
                  ) : (
                    statsCharts.popularTours.map((t, i) => {
                      const maxCount = Math.max(...statsCharts.popularTours.map(x => x.count), 1);
                      const pct = (t.count / maxCount) * 100;
                      return (
                        <div key={i} style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                          <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', fontWeight:700}}>
                            <span style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'80%', color:'#fff'}}>{t.name}</span>
                            <span style={{color:C, fontWeight:900}}>{t.count} Reservas</span>
                          </div>
                          <div style={{width:'100%', height:'8px', background:'#222', borderRadius:'4px', overflow:'hidden'}}>
                            <div style={{width:`${pct}%`, height:'100%', background:`linear-gradient(to right, ${C}66, ${C})`, borderRadius:'4px', transition:'width 0.5s'}}></div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==='followup'&&(
          <div>
            <h3>Seguimiento Post-Venta</h3>
            {recent.length===0&&<p style={{textAlign:'center',color:'#666'}}>No hay tours recientes.</p>}
            {recent.map(b=>{
              const ref = b.reference ? (b.reference.startsWith('CT-') ? b.reference : `CT-${b.reference}`) : `CT-${b.id}`;
              const link = `https://cantiktours.com/reviews?ref=${ref}`;
              return (
                <div key={b.id} style={{...s.card, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div><div style={{fontWeight:900}}>{b.client_name}</div><div style={{fontSize:'12px',color:'#666'}}>{b.tour_title}</div></div>
                  <div style={{display:'flex', gap:'8px'}}>
                    <button onClick={() => copyReviewLink(b, 'es')} style={s.btn('#10b981')}>Review ES</button>
                    <button onClick={() => copyReviewLink(b, 'en')} style={s.btn('#10b981')}>Review EN</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {modal&&(
          <Modal 
            title={
              modal.action === 'delete' 
                ? 'Confirmar Eliminación' 
                : modal.type === 'finance' 
                  ? 'Finanzas del Tour' 
                  : modal.type === 'itinerary' 
                    ? 'Editar Itinerario' 
                    : modal.type === 'logs' 
                      ? 'Bitácora y Historial' 
                      : modal.type === 'passengers'
                        ? 'Gestionar Check-In Pasajeros'
                        : modal.type === 'assign_driver'
                          ? 'Asignar Chofer'
                          : `${modal.action==='create'?'Nuevo':'Editar'} ${TLABEL[modal.type] || modal.type}`
            } 
            onClose={()=>setModal(null)} 
            onSave={save} 
            loading={loading} 
            hideFooter={['finance', 'itinerary', 'logs', 'passengers'].includes(modal.type) || modal.action === 'delete'}
          >
            {modal.action === 'delete' ? (
               <div style={{textAlign:'center', padding:'20px 0'}}>
                  <div style={{fontSize:'48px', marginBottom:'16px'}}>⚠️</div>
                  <h3 style={{marginBottom:'12px', fontSize:'18px'}}>¿Estás seguro?</h3>
                  <p style={{color:'#aaa', marginBottom:'24px', fontSize:'14px', lineHeight:'1.5'}}>
                    Esta acción no se puede deshacer. Se eliminará permanentemente {modal.type === 'booking' ? 'la reserva y todo su historial de pagos y gastos' : 'este registro'}.
                  </p>
                  <div style={{display:'flex', gap:'12px'}}>
                    <button style={{flex:1, background:'#ffffff15', color:'#fff', padding:'12px', borderRadius:'12px', fontWeight:900, border:'none'}} onClick={()=>setModal(null)}>Cancelar</button>
                    <button style={{flex:1, background:'#ef4444', color:'#fff', padding:'12px', borderRadius:'12px', fontWeight:900, border:'none'}} onClick={()=>del(modal.type, modal.data.id, true)}>
                      {loading ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                  </div>
               </div>
            ) : (
              <>
                {modal.type==='booking'&&<BookingForm data={modal.data} drivers={drivers} onChange={setField} bookings={bookings}/>}
                {modal.type==='finance' && (
                  <FinancialManagement 
                    booking={modal.data} 
                    onUpdate={reload} 
                  />
                )}
                {modal.type==='itinerary' && (
                  <ItineraryEditor 
                    booking={modal.data} 
                    onUpdate={reload} 
                  />
                )}
                {modal.type==='logs' && (
                  renderBookingLogs(modal.data)
                )}
                {modal.type==='passengers' && (
                  <PassengerManagement 
                    booking={modal.data} 
                    onUpdate={reload} 
                    onClose={() => setModal(null)}
                  />
                )}
                {modal.type==='assign_driver' && <DriverAssignModal data={modal.data} drivers={drivers} onChange={setField} bookings={bookings} />}
                {modal.type==='driver'&&<DriverForm data={modal.data} onChange={setField}/>}
                {modal.type==='review'&&<ReviewForm data={modal.data} onChange={setField}/>}
                {modal.type==='coupon'&&<CouponForm data={modal.data} onChange={setField}/>}
              </>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
