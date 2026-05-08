import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as api from '../services/api';
import { login as apiLogin, getToken, clearToken } from '../services/api';
import { BookingForm, DriverForm, ReviewForm, CouponForm, Modal, FinancialManagement, ItineraryEditor } from '../components/AdminComponents';

const C = '#11BDDB';
const emptyBooking = {client_name:'',client_phone:'',booking_date:'',hotel:'',tour_title:'',total_price:'',deposit_amount:'',pax:2,payment_status:'requested',driver_id:'',experience:'driver_en',reference:'',notes:''};
const emptyDriver = {name:'',phone:'',car_model:''};
const emptyReview = {nombre:'',comentario:'',comentario_en:'',puntuacion:5,aprobado:0};
const emptyCoupon = {code:'',discount_type:'percent',discount_value:10,max_uses:0,active:1};
const TABS = ['bookings','drivers','reviews','coupons','calendar','stats','followup'];
const TLABEL = {bookings:'Reservas',drivers:'Staff',reviews:'Reviews',coupons:'Cupones',calendar:'Calendario',stats:'Dashboard',followup:'Seguimiento'};
const PAY_LABEL = {
  pending: 'Pago Pendiente',
  requested: 'Pago Pendiente',
  'pago pendiente': 'Pago Pendiente',
  reserved: 'Reservado (Seña)',
  confirmed: 'Confirmado',
  confirmado: 'Confirmado',
  paid: 'Pago Completado',
  on_tour: 'En Tour',
  finished: 'Finalizado',
  postponed: 'Pospuesto',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado'
};
const PAY_COLOR = {
  pending: '#f59e0b',
  requested: '#f59e0b',
  reserved: '#3b82f6',
  confirmed: '#10b981',
  paid: '#059669',
  on_tour: '#8b5cf6',
  finished: '#64748b',
  postponed: '#6366f1',
  cancelled: '#ef4444',
  refunded: '#ec4899'
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
  const itineraryUrl = `https://cantiktours.com/itinerario?ref=${refCode}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(itineraryUrl)}`;
  const w = window.open('', '_blank');
  w.document.write(`<html><head><title>Voucher Cantik - ${b.client_name}</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');body{font-family:'Inter',sans-serif;margin:0;padding:0;background:#f0f2f5;color:#1a1a1a}.ticket{max-width:800px;margin:40px auto;background:#fff;border-radius:32px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);display:flex;flex-direction:column}.header{background:#11BDDB;padding:40px;color:#fff;display:flex;justify-content:space-between;align-items:center}.logo{font-size:32px;font-weight:900}.status-badge{background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:99px;font-size:12px;font-weight:900;text-transform:uppercase}.content{padding:40px;display:grid;grid-template-columns:2fr 1fr;gap:40px}.main-info{border-right:2px dashed #f0f2f5;padding-right:40px}.label{font-size:10px;font-weight:900;color:#11BDDB;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}.value{font-size:18px;font-weight:700;margin-bottom:24px}.tour-title{font-size:28px;font-weight:900;margin-bottom:32px;color:#11BDDB}.side-info{display:flex;flex-direction:column;align-items:center;text-align:center}.qr-box{background:#f9fafb;padding:20px;border-radius:24px;margin-bottom:16px;border:1px solid #eee}.qr-box img{width:120px;height:120px}.detail-link{display:inline-block;margin-top:12px;padding:8px 16px;background:#11BDDB;color:#fff;text-decoration:none;border-radius:12px;font-size:11px;font-weight:900;letter-spacing:0.5px}.footer-strip{background:#1a1a1a;color:#fff;padding:30px 40px;display:flex;justify-content:space-between;align-items:center}@media print{.no-print{display:none}.ticket{margin:0;border-radius:0;box-shadow:none}}</style></head><body><div class="ticket"><div class="header"><div class="logo">CantikTours</div><div class="status-badge">Voucher de Reserva</div></div><div class="content"><div class="main-info"><div class="label">Tour</div><div class="tour-title">${b.tour_title}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px"><div><div class="label">Cliente</div><div class="value">${b.client_name}</div></div><div><div class="label">Fecha</div><div class="value">${new Date(b.booking_date).toLocaleDateString()}</div></div><div><div class="label">Hotel</div><div class="value">${b.hotel}</div></div><div><div class="label">Chofer</div><div class="value">${drv?drv.name:'Por confirmar'}</div></div></div></div><div class="side-info"><div class="qr-box"><img src="${qrUrl}"/></div><div class="label">Detalle de tu Reserva</div><div style="font-size:12px;color:#666">Pax: ${b.pax} · ${refCode}</div><a href="${itineraryUrl}" target="_blank" class="detail-link no-print">Ver Estado y Pagos →</a></div></div><div class="footer-strip"><div><div style="font-weight:700">¡Disfruta tu viaje!</div><div style="font-size:11px;color:#666">ES/EN: +34 642 51 77 87</div><div style="font-size:10px;color:#666">ID/EN: +62 856 9153 3356</div></div><div style="text-align:right"><div style="font-size:11px;color:#666">cantiktours.com</div></div></div></div><button onclick="window.print()" style="position:fixed;bottom:20px;right:20px;padding:16px 32px;background:#11BDDB;color:#fff;border:none;border-radius:16px;font-weight:900;cursor:pointer" class="no-print">IMPRIMIR</button></body></html>`);
  w.document.close();
};

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(!!getToken());
  const [tab, setTab] = useState('bookings');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [modal, setModal] = useState(null);
  const [msg, setMsg] = useState(null);
  const [detailedStats, setDetailedStats] = useState(null);
  const [calMonth, setCalMonth] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop().replace('_', ' ');

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

  const load = useCallback(async () => {
    if (!getToken()) return;
    setLoading(true);
    try {
      const [b, d, r, c, s] = await Promise.all([
        api.getBookings(), api.getDrivers(), api.getReviews(),
        api.getCoupons(), api.getStats(),
      ]);
      setBookings(b.data || []);
      setDrivers(d.data || []);
      setReviews(r.data || []);
      setCoupons(c.data || []);
      setDetailedStats(s.data);
      setAuthed(true);
    } catch (e) {
      setAuthed(false);
      clearToken();
      toast(e.message, false);
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = async () => {
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
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const save = async () => {
    if (!modal) return;
    const { type, action, data } = modal;
    setLoading(true);
    try {
      const fn = api[`${action}${type[0].toUpperCase() + type.slice(1)}`];
      await fn(data);
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
  const openEdit=(type,row)=>setModal({type,action:'update',data:{...row}});

  const handleManagePayments = (b) => {
    setModal({type:'finance', action:'view', data:b});
  };

  const filter = (l) => {
    if (!l || !Array.isArray(l)) return [];
    return l.filter(x => {
      if (!x) return false;
      try {
        return Object.values(x).some(v => 
          v !== null && v !== undefined && String(v).toLowerCase().includes((search || '').toLowerCase())
        );
      } catch (e) { return false; }
    });
  };
  const waLink=(p,m)=>`https://wa.me/${(p||'').replace(/\D/g,'')}?text=${encodeURIComponent(m)}`;
  const exportCSV=()=>{
    const h=['ID','Cliente','Fecha','Tour','Pax','Total','Estado'];
    const r=bookings.map(b=>[b.id,b.client_name,b.booking_date,b.tour_title,b.pax,b.total_price,b.payment_status]);
    const c=[h,...r].map(e=>e.join(',')).join('\n');
    const b=new Blob([c],{type:'text/csv'});const u=URL.createObjectURL(b);const a=document.createElement('a');
    a.href=u;a.download='reservas.csv';a.click();
  };

  const copyReviewLink = (b) => {
    const ref = b.reference ? (b.reference.startsWith('CT-') ? b.reference : `CT-${b.reference}`) : `CT-${b.id}`;
    const link = `https://cantiktours.com/reviews?ref=${ref}`;
    navigator.clipboard.writeText(link);
    toast('Link de review copiado');
  };

  const calDays=useMemo(()=>{
    const d=new Date(calMonth.getFullYear(),calMonth.getMonth(),1);
    const days=[];for(let i=0;i<d.getDay();i++)days.push(null);
    while(d.getMonth()===calMonth.getMonth()){days.push(d.getDate());d.setDate(d.getDate()+1);}
    return days;
  },[calMonth]);

  const stats=useMemo(()=>{
    const list = bookings || [];
    const isPaid = s => ['paid','on_tour','finished'].includes(s);
    const rev = list.filter(b => b && isPaid(b.payment_status)).reduce((a,b) => a + Number(b.total_price || 0), 0);
    const byTour = list.reduce((a,b) => {
      if (!b || !b.tour_title) return a;
      return {...a, [b.tour_title]: (a[b.tour_title] || 0) + 1};
    }, {});
    const top = Object.entries(byTour).sort((a,b) => b[1] - a[1])[0]?.[0] || 'Ninguno';
    return {rev, total: list.length, top, paid: list.filter(b => b && isPaid(b.payment_status)).length};
  }, [bookings]);

  const recent=bookings.filter(b=>{const d=new Date(b.booking_date);const y=new Date();y.setDate(y.getDate()-1);return d<=y && d>new Date(y.getTime()-7*24*60*60*1000);});

  const s={
    btn:(bg,c='#fff')=>({background:bg,color:c,border:'none',padding:'8px 16px',borderRadius:'12px',fontWeight:900,cursor:'pointer',fontSize:'12px',transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px'}),
    card:{background:'#1a1a1a',borderRadius:'16px',padding:'16px',marginBottom:'12px',display:'flex',flexDirection:'column',gap:'16px',border:'1px solid #ffffff05', position:'relative', boxShadow:'0 10px 20px rgba(0,0,0,0.2)'},
    tag:(c)=>({background:c+'22',color:c,padding:'2px 8px',borderRadius:'8px',fontSize:'10px',fontWeight:900,textTransform:'uppercase'}),
    tabBtn:(a)=>({background:a?C+'22':'transparent',color:a?C:'#fff',border:'none',padding:'10px 20px',borderRadius:'14px',fontWeight:900,cursor:'pointer', whiteSpace:'nowrap', fontSize:'13px', transition:'all 0.3s'})
  };

  if (!authed) return (
    <div style={{minHeight:'100vh',background:'#0f0f0f',display:'flex',alignItems:'center',justifyContent:'center', padding:'20px'}}>
      <div style={{background:'#1a1a1a',padding:'40px',borderRadius:'32px',width:'100%',maxWidth:'380px',borderTop:`8px solid ${C}`, boxShadow:'0 30px 60px rgba(0,0,0,0.5)'}}>
        <h2 style={{color:'#fff',textAlign:'center',marginBottom:'30px', fontSize:'28px', fontWeight:900}}>Cantik <span style={{color:C}}>Admin</span></h2>
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
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Introduce el PIN" style={{width:'100%',padding:'16px',borderRadius:'16px',border:'1px solid #333',background:'#0f0f0f',color:'#fff',marginBottom:'16px',boxSizing:'border-box', textAlign:'center', fontSize:'18px', fontWeight:900}}/>
          {msg && <div style={{padding:'12px',borderRadius:'12px',background:msg.ok?C+'22':'#ef444422',color:msg.ok?C:'#ef4444',textAlign:'center',marginBottom:'16px',fontWeight:900,fontSize:'14px'}}>{msg.t}</div>}
          <button type="submit" style={{...s.btn(C),width:'100%',padding:'16px', fontSize:'16px'}}>{loading?'Autenticando...':'Entrar'}</button>
        </form>
      </div>
    </div>
  );

  return(
    <div style={{paddingTop: isMobile ? '80px' : '100px', paddingBottom:'40px',minHeight:'100vh',background:'#0f0f0f',color:'#fff', fontFamily:'"Inter", sans-serif'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 16px'}}>
        <div style={{display:'flex',flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between',alignItems: isMobile ? 'flex-start' : 'center',marginBottom:'32px', gap:'20px'}}>
          <h1 style={{margin:0,fontSize:'26px',fontWeight:900, letterSpacing:'-1px'}}>Cantik<span style={{color:C}}>Admin</span></h1>
          <div style={{display:'flex',gap:'4px',background:'#1a1a1a',padding:'6px',borderRadius:'20px', overflowX:'auto', maxWidth:'100%', scrollbarWidth:'none', msOverflowStyle:'none'}}>
            {TABS.map(t=><button key={t} style={s.tabBtn(tab===t)} onClick={()=>setTab(t)}>{TLABEL[t]}</button>)}
            <button style={s.tabBtn(false)} onClick={() => { clearToken(); setAuthed(false); }}>✕</button>
          </div>
        </div>

        {msg&&<div style={{padding:'12px',borderRadius:'12px',background:msg.ok?C+'22':'#ef444422',color:msg.ok?C:'#ef4444',textAlign:'center',marginBottom:'12px',fontWeight:900}}>{msg.t}</div>}

        {['bookings','drivers','reviews','coupons'].includes(tab) && <>
          <div style={{display:'flex',gap:'8px',marginBottom:'16px', flexWrap:'nowrap', overflowX:'auto', paddingBottom:'8px', scrollbarWidth:'none'}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar..." style={{flex:'0 0 150px',padding:'12px',borderRadius:'14px',background:'#1a1a1a',border:'none',color:'#fff', fontSize:'13px'}}/>
            <button style={{...s.btn(C), flexShrink:0}} onClick={reload}>↻</button>
            <button style={{...s.btn(C), flexShrink:0}} onClick={()=>openNew({bookings:'booking',drivers:'driver',reviews:'review',coupons:'coupon'}[tab])}>+ Nuevo</button>
            {tab==='bookings'&&<button style={{...s.btn('#10b981'), flexShrink:0}} onClick={exportCSV}>CSV</button>}
          </div>
          {tab==='bookings'&&filter(bookings).map(b=>(
            <div key={b.id} style={{...s.card, cursor:'pointer', border: expandedId===b.id ? `1px solid ${C}` : '1px solid #ffffff05'}} onClick={()=>setExpandedId(expandedId===b.id?null:b.id)}>
              {/* BLOQUE SUPERIOR: Siempre visible */}
              <div style={{display:'flex', gap:'16px', alignItems:'flex-start', width:'100%'}}>
                <div style={{background:C+'22',color:C,padding:'8px',borderRadius:'14px',textAlign:'center',minWidth:'40px', height:'fit-content'}}>
                  <div style={{fontSize:'9px',fontWeight:900}}>{new Date(b.booking_date).toLocaleString('es',{month:'short'}).toUpperCase()}</div>
                  <div style={{fontSize:'18px',fontWeight:900}}>{new Date(b.booking_date).getDate()}</div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap', marginBottom:'2px'}}>
                    <div style={{fontWeight:900, fontSize: isMobile ? '14px' : '16px', color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{b.client_name}</div>
                    {b.reference && <span style={{fontSize:'9px', background:C+'22', padding:'1px 6px', borderRadius:'4px', fontWeight:900, color:C}}>CT-{b.reference.replace('CT-', '')}</span>}
                  </div>
                  <div style={{fontSize:'11px',color:C, fontWeight:900}}>{b.tour_title}</div>
                  <div style={{fontSize:'10px', color:'#555', fontWeight:900, marginTop:'2px'}}>{PAY_LABEL[b.payment_status]}</div>
                </div>
                <div style={{textAlign:'right', flexShrink:0}}>
                   <div style={{fontSize:'16px', fontWeight:900, color:C}}>{b.total_price}€</div>
                   <div style={{fontSize:'9px', fontWeight:700, color:'#555'}}>{b.pax} PAX</div>
                </div>
              </div>

              {/* DETALLES OCULTOS: Se expanden al hacer clic */}
              {expandedId === b.id && (
                <div style={{marginTop:'16px', paddingTop:'16px', borderTop:'1px solid #ffffff05', width:'100%', display:'flex', flexDirection:'column', gap:'12px'}}>
                  <div style={{fontSize:'12px', color:'#fff', background:'#ffffff05', padding:'12px', borderRadius:'12px'}}>
                    <div style={{marginBottom:'8px'}}><span style={{color:'#666', fontWeight:900}}>HOTEL:</span> {b.hotel}</div>
                    {b.notes && <div style={{marginBottom:'8px'}}><span style={{color:'#666', fontWeight:900}}>NOTAS:</span> {b.notes}</div>}
                    <div style={{display:'flex', gap:'12px', fontSize:'10px'}}>
                      <span style={{color:C}}>🕒 Creado: {new Date(b.created_at).toLocaleString('es-ES', {hour:'2-digit', minute:'2-digit'})}</span>
                      <span style={{opacity:0.6}}>🌴 Bali: {new Date(b.created_at).toLocaleString('es-ES', {timeZone: 'Asia/Makassar', hour:'2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>

                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', background:'#00000033', padding:'8px 12px', borderRadius:'12px'}}>
                    <div style={{display:'flex', gap:'12px'}}>
                      <div style={{fontSize:'10px', fontWeight:900}}><span style={{color:'#666'}}>PAGADO:</span> <span style={{color:'#10b981'}}>{Number(b.total_paid||0).toFixed(0)}€</span></div>
                      {(b.total_price - (b.total_paid||0)) > 0 && <div style={{fontSize:'10px', fontWeight:900}}><span style={{color:'#666'}}>FALTA:</span> <span style={{color:'#ef4444'}}>{(b.total_price - (b.total_paid||0)).toFixed(0)}€</span></div>}
                    </div>
                  </div>

                  <div style={{display:'flex', gap:'8px', width:'100%', marginTop:'4px'}}>
                    <a href={waLink(b.client_phone, `¡Hola ${b.client_name}! Soy de Cantik Tours.`)} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{...s.btn('#25D366'), flex:2, height:'40px'}}>WHATSAPP</a>
                    <button style={{...s.btn(C+'22',C), flex:1.2, height:'40px'}} onClick={e=>{e.stopPropagation(); generateVoucher(b,drivers)}}>VOUCHER</button>
                    <div style={{display:'flex', gap: isMobile ? '4px' : '6px', overflowX: isMobile ? 'auto' : 'visible', scrollbarWidth:'none', paddingBottom:'2px', width:'100%'}}>
                      <button style={{...s.btn('#f59e0b22','#f59e0b'), minWidth:'42px', height:'42px', padding:0, flexShrink:0}} title="Copiar Link Review" onClick={e=>{e.stopPropagation(); copyReviewLink(b)}}>⭐</button>
                      <button style={{...s.btn('#ffffff11','#fff'), minWidth:'42px', height:'42px', padding:0, flexShrink:0}} onClick={e=>{e.stopPropagation(); openEdit('booking',b)}}>✎</button>
                      <button style={{...s.btn(C+'11',C), minWidth:'42px', height:'42px', padding:0, flexShrink:0}} title="Editar Itinerario" onClick={e=>{e.stopPropagation(); setModal({type:'itinerary', action:'edit', data:b})}}>📍</button>
                      <button style={{...s.btn(C+'11',C), minWidth:'42px', height:'42px', padding:0, flexShrink:0}} title="Finanzas del Tour" onClick={e=>{e.stopPropagation(); handleManagePayments(b)}}>💰</button>
                      <button style={{...s.btn('#ef444411','#ef4444'), minWidth:'42px', height:'42px', padding:0, flexShrink:0}} onClick={e=>{e.stopPropagation(); del('booking',b.id)}}>✕</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {tab==='drivers'&&filter(drivers).map(d=>(
            <div key={d.id} style={s.card}>
              <div><div style={{fontWeight:900}}>{d.name}</div><div style={{color:'#666',fontSize:'12px'}}>{d.car_model}</div></div>
              <div style={{display:'flex',gap:'6px'}}>
                <button style={s.btn('#ffffff15','#fff')} onClick={()=>openEdit('driver',d)}>✎</button>
                <button style={s.btn('#ef444422','#ef4444')} onClick={()=>del('driver',d.id)}>✕</button>
              </div>
            </div>
          ))}
          {tab==='reviews'&&filter(reviews).map(r=>(
            <div key={r.id} style={s.card}>
              <div style={{flex:1}}>
                <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom:'4px', flexWrap:'wrap'}}>
                  <div style={{fontWeight:900}}>{r.nombre} {'★'.repeat(r.puntuacion || 5)}</div>
                  {r.tour_id && r.tour_id.includes('[CT-') && (
                    <button style={s.tag(C)} onClick={() => {
                        const id = r.tour_id && r.tour_id.match(/\[CT-(\d+)\]/)?.[1];
                        if(id) {
                           const b = bookings.find(x => x.id == id);
                           if(b) openEdit('booking', b);
                           else toast('Reserva no encontrada en la lista', false);
                        }
                    }}>VER RESERVA</button>
                  )}
                </div>
                <div style={{fontSize:'12px',color:'#888'}}>"{r.comentario}"</div>
              </div>
              <div style={{display:'flex',gap:'6px'}}><button style={s.btn('#ffffff15','#fff')} onClick={()=>openEdit('review',r)}>✎</button><button style={s.btn('#ef444422','#ef4444')} onClick={()=>del('review',r.id)}>✕</button></div>
            </div>
          ))}
          {tab==='coupons'&&filter(coupons).map(c=>(
            <div key={c.id} style={s.card}>
              <div><div style={{fontWeight:900}}>{c.code}</div><div style={{fontSize:'12px',color:'#666'}}>{c.discount_value}${c.discount_type==='percent'?'%':'€'}</div></div>
              <div style={{display:'flex',gap:'6px'}}><button style={s.btn('#ffffff15','#fff')} onClick={()=>openEdit('coupon',c)}>✎</button><button style={s.btn('#ef444422','#ef4444')} onClick={()=>del('coupon',c.id)}>✕</button></div>
            </div>
          ))}
        </>}

        {tab==='calendar'&&(
          <div style={{background:'#1a1a1a',borderRadius:'24px',padding:'24px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <button style={s.btn('#222')} onClick={()=>setCalMonth(new Date(calMonth.getFullYear(),calMonth.getMonth()-1))}>◀</button>
              <h3 style={{margin:0}}>{calMonth.toLocaleString('es',{month:'long',year:'numeric'})}</h3>
              <button style={s.btn('#222')} onClick={()=>setCalMonth(new Date(calMonth.getFullYear(),calMonth.getMonth()+1))}>▶</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'4px'}}>
              {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d=><div key={d} style={{textAlign:'center',fontSize:'10px',fontWeight:900,color:'#444'}}>{d}</div>)}
              {calDays.map((d,i)=>(
                <div key={i} style={{minHeight:'60px',background:d?'#222':'transparent',borderRadius:'12px',padding:'8px'}}>
                  {d&&<div style={{fontSize:'12px',fontWeight:900}}>{d}</div>}
                  {bookings.filter(b=>new Date(b.booking_date).getDate()===d&&new Date(b.booking_date).getMonth()===calMonth.getMonth()).map(b=>(
                    <div key={b.id} style={{fontSize:'8px',background:PAY_COLOR[b.payment_status],padding:'2px',borderRadius:'4px',marginTop:'2px',overflow:'hidden'}}>{b.client_name.split(' ')[0]}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='stats'&&(
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit,minmax(200px,1fr))',gap: isMobile ? '10px' : '16px'}}>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#666', textTransform:'uppercase', marginBottom:'8px'}}>Ingresos</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:C}}>{(detailedStats?.revenue || stats.rev).toFixed(0)}€</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#666', textTransform:'uppercase', marginBottom:'8px'}}>Gastos</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#ef4444'}}>{(detailedStats?.expenses || 0).toFixed(0)}€</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#666', textTransform:'uppercase', marginBottom:'8px'}}>Beneficio</div>
                <div style={{fontSize: isMobile ? '20px' : '32px',fontWeight:900,color:'#10b981'}}>{(detailedStats?.profit || 0).toFixed(0)}€</div>
              </div>
              <div style={{background:'#1a1a1a',padding: isMobile ? '16px' : '24px',borderRadius:'24px', border:'1px solid #ffffff05'}}>
                <div style={{fontSize: isMobile ? '9px' : '12px', fontWeight:900, color:'#666', textTransform:'uppercase', marginBottom:'8px'}}>Tour Top</div>
                <div style={{fontSize: isMobile ? '12px' : '18px',fontWeight:900,color:C, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{stats.top}</div>
              </div>
            </div>
          </div>
        )}

        {tab==='followup'&&(
          <div>
            <h3>Seguimiento Post-Venta</h3>
            {recent.length===0&&<p style={{textAlign:'center',color:'#666'}}>No hay tours recientes.</p>}
            {recent.map(b=>(
              <div key={b.id} style={s.card}>
                <div><div style={{fontWeight:900}}>{b.client_name}</div><div style={{fontSize:'12px',color:'#666'}}>{b.tour_title}</div></div>
                <a href={waLink(b.client_phone,`¡Hola ${b.client_name}! ✨ ¿Qué te pareció tu tour con Cantik? Nos ayudaría mucho tu reseña: https://cantiktours.com/reviews?ref=CT-${b.id}`)} target="_blank" rel="noopener" style={s.btn('#10b981')}>Pedir Reseña</a>
              </div>
            ))}
          </div>
        )}

        {modal&&(
          <Modal title={`${modal.action==='create'?'Nuevo':modal.action==='delete'?'Confirmar Eliminación':'Editar'} ${modal.type === 'finance' ? 'Finanzas del Tour' : modal.type}`} onClose={()=>setModal(null)} onSave={save} loading={loading} hideFooter={modal.type === 'finance' || modal.action === 'delete'}>
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
                {modal.type==='booking'&&<BookingForm data={modal.data} drivers={drivers} onChange={setField}/>}
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
