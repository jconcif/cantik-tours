import React from 'react';
import * as api from '../services/api';
import { useTranslation } from 'react-i18next';
import { tours } from '../data/tours';

const inputStyle = {padding:'10px 14px',borderRadius:'12px',border:'1px solid #333',fontSize:'14px',fontWeight:600,background:'#222',color:'#fff',width:'100%',boxSizing:'border-box',outline:'none'};
const labelStyle = {fontSize:'10px',fontWeight:900,color:'#11BDDB',textTransform:'uppercase',letterSpacing:'0.05em'};

const Field = ({label, htmlFor, children}) => (
  <div style={{display:'flex',flexDirection:'column',gap:'4px'}}><label htmlFor={htmlFor} style={labelStyle}>{label}</label>{children}</div>
);

const Input = ({label,value,onChange,type='text',readOnly,...rest}) => {
  const safeName = (label || '').toLowerCase().replace(/[^a-z0-9]/g, '_');
  return (
    <Field label={label} htmlFor={safeName}>
      <input 
        id={safeName}
        name={safeName}
        type={type} 
        value={value||''} 
        onChange={e=>!readOnly && onChange(e.target.value)} 
        style={{...inputStyle, opacity: readOnly ? 0.6 : 1, cursor: readOnly ? 'not-allowed' : 'text'}} 
        readOnly={readOnly} 
        {...rest} 
      />
    </Field>
  );
};

const Select = ({label,value,onChange,options}) => {
  const safeName = (label || '').toLowerCase().replace(/[^a-z0-9]/g, '_');
  return (
    <Field label={label} htmlFor={safeName}>
      <select 
        id={safeName}
        name={safeName}
        value={value||''} 
        onChange={e=>onChange(e.target.value)} 
        style={inputStyle}
      >
        {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  );
};

export const BookingForm = ({data,onChange}) => {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:'12px'}}>
      {/* Identity & Core Info */}
      <Input label="Código Referencia (ID)" value={data.reference || `CT-${data.id}`} onChange={()=>{}} readOnly />
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
        <Input label="Fecha Tour" value={data.booking_date} onChange={v=>onChange('booking_date',v)} type="date" />
        <Input label="Hora Recogida" value={data.pickup_time} onChange={v=>onChange('pickup_time',v)} type="time" />
      </div>

      {/* Client Info */}
      <Input label="Cliente" value={data.client_name} onChange={v=>onChange('client_name',v)} />
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
        <Input label="WhatsApp" value={data.client_phone} onChange={v=>onChange('client_phone',v)} />
        <Input label="Email" value={data.client_email || ''} onChange={v=>onChange('client_email',v)} type="email" />
      </div>
      <Input label="Hotel / Recogida" value={data.hotel} onChange={v=>onChange('hotel',v)} />

      {/* Tour Setup */}
      <div style={{gridColumn:'1/-1'}}><Input label="Tour" value={data.tour_title} onChange={v=>onChange('tour_title',v)} /></div>
      <Input label="PAX (Pasajeros)" value={data.pax} onChange={v=>onChange('pax',v)} type="number" />
      <Select label="Experiencia" value={data.experience} onChange={v=>onChange('experience',v)} options={[
        {value:'driver_en', label:'S - Conductor privado (inglés)'},
        {value:'guide_en',  label:'M - Guía Local (inglés)'},
        {value:'guide_es',  label:'L - Guía Local Certificado (español)'}
      ]} />
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',gridColumn:'1/-1'}}>
        <Input label="Precio Total (€)" value={data.total_price} onChange={v=>onChange('total_price',v)} type="number" />
        <Input label="Depósito Recibido (€)" value={data.deposit_amount} onChange={v=>onChange('deposit_amount',v)} type="number" />
      </div>
    </div>
  );
};

export const DriverAssignModal = ({data,drivers,onChange,bookings=[]}) => {
  const conflict = React.useMemo(() => {
    if (!data.driver_id || !data.booking_date) return null;
    const sameDateBookings = bookings.filter(b => {
      if (b.id === data.id) return false;
      if (b.payment_status === 'cancelled') return false;
      if (!b.driver_id || !b.booking_date) return false;
      return String(b.driver_id) === String(data.driver_id) && b.booking_date.split('T')[0] === data.booking_date.split('T')[0];
    });
    return sameDateBookings.length > 0 ? sameDateBookings[0] : null;
  }, [data.driver_id, data.booking_date, bookings, data.id]);

  const selectedDriverName = drivers.find(d => String(d.id) === String(data.driver_id))?.name || 'Este chofer';

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
      <div style={{background:'#1a1a1a', padding:'16px', borderRadius:'16px', border:'1px solid #333'}}>
        <div style={{fontSize:'12px', color:'#aaa', marginBottom:'8px'}}>Asignar chofer para el tour de:</div>
        <div style={{fontSize:'14px', fontWeight:900, color:'#fff'}}>{data.client_name} - {data.tour_title}</div>
        <div style={{fontSize:'12px', color:'#11BDDB', marginTop:'4px'}}>📅 Fecha: {data.booking_date}</div>
      </div>

      <Select 
        label="Seleccionar Chofer" 
        value={data.driver_id} 
        onChange={v=>onChange('driver_id',v)} 
        options={[{value:'',label:'-- Sin Asignar --'},...drivers.map(d=>({value:d.id,label:d.name}))]} 
      />

      {conflict && (
        <div style={{background:'#ef444415', color:'#ef4444', border:'1px solid #ef444444', padding:'16px', borderRadius:'16px', fontSize:'12px', fontWeight:900, display:'flex', gap:'10px', alignItems:'center'}}>
          <span style={{fontSize:'16px'}}>⚠️</span>
          <span>
            ¡Alerta de Chofer Duplicado! {selectedDriverName} ya está asignado(a) a la reserva de <strong>{conflict.client_name}</strong> ({conflict.tour_title}) para la misma fecha ({conflict.booking_date.split('T')[0]}).
          </span>
        </div>
      )}
    </div>
  );
};

export const DriverForm = ({data,onChange}) => (
  <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
    <Input label="Nombre" value={data.name} onChange={v=>onChange('name',v)} />
    <Input label="Teléfono" value={data.phone} onChange={v=>onChange('phone',v)} />
    <Input label="Vehículo" value={data.car_model} onChange={v=>onChange('car_model',v)} />
  </div>
);

export const ReviewForm = ({data,onChange}) => (
  <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
      <Input label="Nombre" value={data.nombre} onChange={v=>onChange('nombre',v)} />
      <Input label="País" value={data.pais} onChange={v=>onChange('pais',v)} />
      <Input label="Instagram" value={data.ig_user} onChange={v=>onChange('ig_user',v)} placeholder="@usuario" />
      <Input label="Chofer" value={data.driver_name} onChange={v=>onChange('driver_name',v)} />
    </div>
    
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
      <Input label="Puntuación Global (1-5)" value={data.puntuacion} onChange={v=>onChange('puntuacion',v)} type="number" min={1} max={5} />
      <Input label="Tour ID" value={data.tour_id} onChange={v=>onChange('tour_id',v)} />
    </div>

    <div style={{background:'#222', padding:'16px', borderRadius:'16px', border:'1px solid #333'}}>
      <label style={{...labelStyle, display:'block', marginBottom:'12px'}}>Valoraciones Detalladas (1-5)</label>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'10px'}}>
        <Input label="Booking" value={data.rating_booking} onChange={v=>onChange('rating_booking',v)} type="number" />
        <Input label="Logística" value={data.rating_logistics} onChange={v=>onChange('rating_logistics',v)} type="number" />
        <Input label="Ruta" value={data.rating_route} onChange={v=>onChange('rating_route',v)} type="number" />
        <Input label="Chofer" value={data.rating_driver} onChange={v=>onChange('rating_driver',v)} type="number" />
        <Input label="Vehículo" value={data.rating_vehicle} onChange={v=>onChange('rating_vehicle',v)} type="number" />
        <Input label="Precio" value={data.rating_price} onChange={v=>onChange('rating_price',v)} type="number" />
      </div>
    </div>

    <Field label="Comentario (Español)"><textarea rows={3} value={data.comentario||''} onChange={e=>onChange('comentario',e.target.value)} style={{...inputStyle,resize:'vertical'}} /></Field>
    <Field label="Comment (English)"><textarea rows={3} value={data.comentario_en||''} onChange={e=>onChange('comentario_en',e.target.value)} style={{...inputStyle,resize:'vertical'}} /></Field>
    
    <label style={{display:'flex',alignItems:'center',gap:'10px',fontWeight:700,fontSize:'14px',color:'#fff'}}>
      <input id="aprobado" name="aprobado" type="checkbox" checked={data.aprobado==1} onChange={e=>onChange('aprobado',e.target.checked?1:0)} style={{width:'18px',height:'18px',accentColor:'#11BDDB'}} /> Publicar en web
    </label>
  </div>
);

export const CouponForm = ({data,onChange}) => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'12px'}}>
    <Input label="Código" value={data.code} onChange={v=>onChange('code',v)} />
    <Select label="Tipo Descuento" value={data.discount_type} onChange={v=>onChange('discount_type',v)} options={[{value:'percent',label:'Porcentaje %'},{value:'fixed',label:'Importe fijo €'}]} />
    <Input label="Valor" value={data.discount_value} onChange={v=>onChange('discount_value',v)} type="number" />
    <Input label="Usos máximos (0=ilimitado)" value={data.max_uses} onChange={v=>onChange('max_uses',v)} type="number" />
    <label style={{display:'flex',alignItems:'center',gap:'10px',fontWeight:700,fontSize:'14px',color:'#fff',gridColumn:'1/-1'}}>
      <input id="active" name="active" type="checkbox" checked={data.active==1} onChange={e=>onChange('active',e.target.checked?1:0)} style={{width:'18px',height:'18px',accentColor:'#11BDDB'}} /> Cupón activo
    </label>
  </div>
);

export const Modal = ({title,children,onClose,onSave,loading,hideFooter=false}) => (
  <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',backdropFilter:'blur(8px)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'10px'}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{background:'#1a1a1a',borderRadius:'28px',padding:'clamp(20px, 5vw, 32px)',width:'100%',maxWidth:'560px',maxHeight:'90vh',overflowY:'auto',borderTop:'8px solid #11BDDB'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
        <h2 style={{margin:0,fontSize:'20px',fontWeight:900,color:'#fff'}}>{title}</h2>
        <button onClick={onClose} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#666'}}>✕</button>
      </div>
      {children}
      {!hideFooter && (
        <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
          <button onClick={onClose} style={{flex:1,padding:'14px',borderRadius:'16px',border:'none',background:'#333',color:'#999',fontWeight:900,cursor:'pointer',fontSize:'13px'}}>CANCELAR</button>
          <button onClick={onSave} disabled={loading} style={{flex:1,padding:'14px',borderRadius:'16px',border:'none',background:'#11BDDB',color:'#fff',fontWeight:900,cursor:'pointer',fontSize:'13px',opacity:loading?0.5:1}}>
            {loading ? 'GUARDANDO...' : 'GUARDAR'}
          </button>
        </div>
      )}
    </div>
  </div>
);

export const FinancialManagement = ({booking, onUpdate}) => {
  const bookingId = booking.id;
  const basePrice = Number(booking.total_price) || 0;
  const C = '#11BDDB';

  const [payments, setPayments] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);
  const [charges, setCharges] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('summary'); // summary | cobros | gastos | extras
  const [adding, setAdding] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [p, e, c] = await Promise.allSettled([
        api.getPayments(bookingId),
        api.getExpenses(bookingId),
        api.getCharges(bookingId),
      ]);
      setPayments(p.status === 'fulfilled' ? (p.value.data || []) : []);
      setExpenses(e.status === 'fulfilled' ? (e.value.data || []) : []);
      setCharges(c.status === 'fulfilled' ? (c.value.data || []) : []);
    } catch(err) { console.error(err); }
    finally { setLoading(false); }
  }, [bookingId]);

  const addSystemLog = async (logText) => {
    try {
      const ext = typeof booking.extras === 'string' ? JSON.parse(booking.extras) : (booking.extras || {});
      if (!ext.logs) ext.logs = [];
      ext.logs.push({
        timestamp: new Date().toISOString(),
        text: logText
      });
      await api.updateBooking({ ...booking, extras: JSON.stringify(ext) });
    } catch (e) {
      console.error('Error adding system log', e);
    }
  };

  React.useEffect(() => { load(); }, [load]);

  const updateBookingExtrasTotal = async (newCharges) => {
    try {
      const ext = typeof booking.extras === 'string' ? JSON.parse(booking.extras) : (booking.extras || {});
      const chargesTotal = newCharges.reduce((sum, c) => sum + Number(c.amount), 0);
      ext.total_charges = chargesTotal;
      await api.updateBooking({ ...booking, extras: JSON.stringify(ext) });
    } catch(e) { console.error('Error updating total_charges', e); }
  };

  // -- Calculations --
  const totalPaid    = payments.reduce((s, p) => s + Number(p.amount), 0);
  const totalExp     = expenses.reduce((s, e) => s + Number(e.amount), 0);
  
  const positiveCharges = charges.filter(c => Number(c.amount) >= 0);
  const discounts       = charges.filter(c => Number(c.amount) < 0);

  const totalCharges   = positiveCharges.reduce((s, c) => s + Number(c.amount), 0);
  const totalDiscounts = discounts.reduce((s, c) => s + Math.abs(Number(c.amount)), 0);

  const totalOwed    = basePrice + totalCharges - totalDiscounts; // Lo que debe el cliente en total
  const balance      = totalOwed - totalPaid;    // Saldo pendiente del cliente
  const profit       = totalPaid - totalExp;     // Beneficio neto del negocio
  const paidPct      = Math.min(100, (totalPaid / Math.max(totalOwed, 1)) * 100);

  // -- Helpers --
  const delPayment = async (id) => { 
    if (!window.confirm('¿Eliminar cobro?')) return; 
    try { 
      const item = payments.find(p => p.id === id);
      const amountStr = item ? `${item.amount}€` : '';
      await api.deletePayment(id); 
      await addSystemLog(`Cobro eliminado: ${amountStr}.`);
      await load(); 
      if (onUpdate) onUpdate(); 
    } catch(e) { alert(e.message); } 
  };

  const delExpense = async (id) => { 
    if (!window.confirm('¿Eliminar gasto?')) return; 
    try { 
      const item = expenses.find(e => e.id === id);
      const detailStr = item ? `${item.amount}€ (${item.concept})` : '';
      await api.deleteExpense(id); 
      await addSystemLog(`Gasto eliminado: ${detailStr}.`);
      await load(); 
      if (onUpdate) onUpdate(); 
    } catch(e) { alert(e.message); } 
  };

  const delCharge  = async (id) => { 
    if (!window.confirm('¿Eliminar cargo extra?')) return; 
    try { 
      const item = charges.find(c => c.id === id);
      const detailStr = item ? `${item.amount}€ (${item.concept})` : '';
      await api.deleteCharge(id); 
      const newCharges = charges.filter(c => c.id !== id);
      setCharges(newCharges);
      await updateBookingExtrasTotal(newCharges);
      await addSystemLog(`Cargo extra eliminado: ${detailStr}.`);
      await load(); 
      if (onUpdate) onUpdate(); 
    } catch(e) { alert(e.message); } 
  };

  const tabStyle = (t) => ({
    flex: 1, padding: '10px 4px', background: activeTab === t ? C : '#1a1a1a',
    color: activeTab === t ? '#000' : '#aaa', border: 'none', borderRadius: '12px',
    fontWeight: 900, cursor: 'pointer', fontSize: '11px', transition: 'all 0.2s'
  });

  const rowStyle = (color) => {
    const bg = color ? `${color}15` : '#222';
    const border = color ? `1px solid ${color}33` : '1px solid #ffffff05';
    return {
      display:'flex', gap:'12px', alignItems:'center',
      padding:'12px 16px', background:bg,
      borderRadius:'16px', border:border,
      marginBottom:'8px', justifyContent:'space-between'
    };
  };

  // -- Add Forms --
  const PayForm = () => {
    const [d, setD] = React.useState({amount:'', payment_date: new Date().toISOString().split('T')[0], payment_method:'Transferencia', notes:'', status:'completado'});
    const save = async () => {
      if (!d.amount) return;
      setLoading(true);
      const finalNotes = d.status === 'verificando' ? `[VERIFICANDO] ${d.notes}`.trim() : d.notes;
      try { 
        await api.addPayment({amount:d.amount, payment_date:d.payment_date, payment_method:d.payment_method, notes:finalNotes, booking_id: bookingId}); 
        await addSystemLog(`Cobro registrado: ${d.amount}€ vía ${d.payment_method} (${d.status === 'verificando' ? 'Pendiente Verificación' : 'Completado'}).`);
        await load(); 
        setAdding(false); 
        if(onUpdate) onUpdate(); 
      }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:`1px solid ${C}44`}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'10px'}}>
          <Input label="Importe €" type="number" value={d.amount} onChange={v=>setD({...d,amount:v})} />
          <Input label="Fecha" type="date" value={d.payment_date} onChange={v=>setD({...d,payment_date:v})} />
          <Select label="Método" value={d.payment_method} onChange={v=>setD({...d,payment_method:v})}
            options={[{value:'Transferencia',label:'Transferencia'},{value:'Efectivo',label:'Efectivo'},{value:'PayPal',label:'PayPal'},{value:'Tarjeta',label:'Tarjeta'},{value:'Wise',label:'Wise'}]} />
          <Select label="Estado" value={d.status} onChange={v=>setD({...d,status:v})}
            options={[{value:'completado',label:'✅ Completado (Recibido)'},{value:'verificando',label:'⏳ Verificando (Justificante)'}]} />
          <div style={{gridColumn:'1/-1'}}><Input label="Referencia / Notas" value={d.notes} onChange={v=>setD({...d,notes:v})} placeholder="ID Transacción o Banco..." /></div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={save} style={{flex:2,padding:'12px',background:C,color:'#000',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✓ GUARDAR COBRO</button>
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#ccc',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
        </div>
      </div>
    );
  };

  const ExpForm = () => {
    const [d, setD] = React.useState({concept:'', amount:'', expense_date: new Date().toISOString().split('T')[0], category:'Sueldo Chofer'});
    const save = async () => {
      if (!d.amount || !d.concept) return;
      setLoading(true);
      try { 
        await api.addExpense({...d, booking_id: bookingId}); 
        await addSystemLog(`Gasto registrado: ${d.amount}€ en concepto de "${d.concept}" (${d.category}).`);
        await load(); 
        setAdding(false); 
        if(onUpdate) onUpdate(); 
      }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:'1px solid #ef444444'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'10px'}}>
          <Select label="Categoría" value={d.category} onChange={v=>setD({...d,category:v})}
            options={[{value:'Sueldo Chofer',label:'🚘 Sueldo Chofer'},{value:'Gasolina',label:'⛽ Gasolina'},{value:'Peajes / Parkings',label:'🎫 Peajes/Parkings'},{value:'Entradas Actividades',label:'🎟️ Entradas/Actividades'},{value:'Comida Chofer',label:'🍲 Comida Chofer'},{value:'Otros',label:'⚙️ Otros Expenses'}]} />
          <Input label="Concepto / Detalle" value={d.concept} onChange={v=>setD({...d,concept:v})} placeholder="Ej: Pago de gasolina ruta norte..." />
          <Input label="Importe €" type="number" value={d.amount} onChange={v=>setD({...d,amount:v})} />
          <Input label="Fecha" type="date" value={d.expense_date} onChange={v=>setD({...d,expense_date:v})} />
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={save} style={{flex:2,padding:'12px',background:'#ef4444',color:'#fff',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✓ GUARDAR GASTO</button>
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#ccc',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
        </div>
      </div>
    );
  };

  const ChargeForm = () => {
    const PRESETS = ['Pasajero Extra','Tiempo Adicional','Comida','Actividad Extra','Entrada Adicional','Transporte Extra','Otros'];
    const [d, setD] = React.useState({concept:'', amount:'', charge_date: new Date().toISOString().split('T')[0]});
    const save = async () => {
      if (!d.amount || !d.concept) return;
      setLoading(true);
      try { 
        await api.addCharge({...d, booking_id: bookingId}); 
        const res = await api.getCharges(bookingId);
        const newCharges = res.data || [];
        setCharges(newCharges);
        await updateBookingExtrasTotal(newCharges);
        await addSystemLog(`Cargo extra registrado: ${d.amount}€ en concepto de "${d.concept}".`);
        await load(); 
        setAdding(false); 
        if(onUpdate) onUpdate(); 
      }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:'1px solid #f59e0b44'}}>
        <div style={{marginBottom:'10px'}}>
          <label style={{fontSize:'10px',fontWeight:900,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.05em'}}>Concepto Rápido</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'6px'}}>
            {PRESETS.map(p => (
              <button key={p} onClick={()=>setD({...d,concept:p})}
                style={{padding:'5px 10px',background: d.concept===p ? '#f59e0b22' : '#333',color: d.concept===p ? '#f59e0b' : '#aaa',border: d.concept===p ? '1px solid #f59e0b44' : '1px solid #444',borderRadius:'8px',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'10px'}}>
          <Input label="Concepto" value={d.concept} onChange={v=>setD({...d,concept:v})} />
          <Input label="Importe €" type="number" value={d.amount} onChange={v=>setD({...d,amount:v})} />
          <Input label="Fecha" type="date" value={d.charge_date} onChange={v=>setD({...d,charge_date:v})} />
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={save} style={{flex:2,padding:'12px',background:'#f59e0b',color:'#000',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✓ GUARDAR CARGO EXTRA</button>
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#ccc',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
        </div>
      </div>
    );
  };

  const DiscountForm = () => {
    const PRESETS = ['Descuento Especial','Cortesía','Cupón Manual','Ajuste de Precio','Descuento Grupo','Otros'];
    const [d, setD] = React.useState({concept:'', amount:'', charge_date: new Date().toISOString().split('T')[0]});
    const save = async () => {
      if (!d.amount || !d.concept) return;
      setLoading(true);
      try { 
        const negAmount = -Math.abs(Number(d.amount));
        await api.addCharge({concept: d.concept, amount: negAmount, charge_date: d.charge_date, booking_id: bookingId}); 
        const res = await api.getCharges(bookingId);
        const newCharges = res.data || [];
        setCharges(newCharges);
        await updateBookingExtrasTotal(newCharges);
        await addSystemLog(`Descuento registrado: -${Math.abs(negAmount)}€ en concepto de "${d.concept}".`);
        await load(); 
        setAdding(false); 
        if(onUpdate) onUpdate(); 
      }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:'1px solid #ec489944'}}>
        <div style={{marginBottom:'10px'}}>
          <label style={{fontSize:'10px',fontWeight:900,color:'#ec4899',textTransform:'uppercase',letterSpacing:'0.05em'}}>Concepto de Descuento</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'6px'}}>
            {PRESETS.map(p => (
              <button key={p} type="button" onClick={()=>setD({...d,concept:p})}
                style={{padding:'5px 10px',background: d.concept===p ? '#ec489922' : '#333',color: d.concept===p ? '#ec4899' : '#aaa',border: d.concept===p ? '1px solid #ec489944' : '1px solid #444',borderRadius:'8px',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'10px'}}>
          <Input label="Concepto" value={d.concept} onChange={v=>setD({...d,concept:v})} />
          <Input label="Importe Descuento €" type="number" value={d.amount} onChange={v=>setD({...d,amount:v})} placeholder="Ej: 15" />
          <Input label="Fecha" type="date" value={d.charge_date} onChange={v=>setD({...d,charge_date:v})} />
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={save} style={{flex:2,padding:'12px',background:'#ec4899',color:'#fff',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✓ GUARDAR DESCUENTO</button>
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#ccc',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{color:'#fff'}}>
      {/* === RESUMEN FINANCIERO === */}
      <div style={{background:'linear-gradient(135deg,#11BDDB11,#10b98111)', border:'1px solid #11BDDB22', borderRadius:'20px', padding:'20px', marginBottom:'20px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(95px,1fr))', gap:'12px', marginBottom:'16px'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#aaa',textTransform:'uppercase',marginBottom:'4px'}}>Precio Base</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#fff'}}>{basePrice.toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#f59e0b',textTransform:'uppercase',marginBottom:'4px'}}>+ Extras</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#f59e0b'}}>{totalCharges.toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#ec4899',textTransform:'uppercase',marginBottom:'4px'}}>- Descuentos</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#ec4899'}}>{totalDiscounts.toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:C,textTransform:'uppercase',marginBottom:'4px'}}>Cobrado</div>
            <div style={{fontSize:'20px',fontWeight:900,color:C}}>{totalPaid.toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color: balance > 0 ? '#ef4444':'#10b981',textTransform:'uppercase',marginBottom:'4px'}}>Pendiente</div>
            <div style={{fontSize:'20px',fontWeight:900,color: balance > 0 ? '#ef4444':'#10b981'}}>{Math.max(0,balance).toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#ef4444',textTransform:'uppercase',marginBottom:'4px'}}>Gastos</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#ef4444'}}>{totalExp.toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#10b981',textTransform:'uppercase',marginBottom:'4px'}}>Beneficio</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#10b981'}}>{profit.toFixed(2)}€</div>
          </div>
        </div>
        {/* Barra de progreso cobro */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',fontSize:'10px',color:'#aaa'}}>
            <span>Cobrado {paidPct.toFixed(0)}%</span>
            <span>Total a cobrar: {totalOwed.toFixed(2)}€</span>
          </div>
          <div style={{height:'6px',background:'#333',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',background:balance > 0 ? C : '#10b981',width:`${paidPct}%`,borderRadius:'4px',transition:'width 0.5s'}}></div>
          </div>
        </div>

        {/* Desglose de Cálculo */}
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px dashed #ffffff10',
          fontSize: '11px',
          color: '#aaa',
          fontFamily: 'monospace',
          lineHeight: '1.6'
        }}>
          <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desglose Matemático (Suma / Resta)</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Precio Base del Tour:</span>
            <span style={{ color: '#fff' }}>{basePrice.toFixed(2)}€</span>
          </div>
          {positiveCharges.map(c => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#f59e0b' }}>
              <span>[+] Extra: {c.concept}:</span>
              <span>+{Number(c.amount).toFixed(2)}€</span>
            </div>
          ))}
          {discounts.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#ec4899' }}>
              <span>[-] Descuento: {d.concept}:</span>
              <span>-{Math.abs(Number(d.amount)).toFixed(2)}€</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', marginTop: '4px', paddingTop: '4px', fontWeight: 'bold', color: '#fff' }}>
            <span>(=) VALOR TOTAL DEL TOUR:</span>
            <span>{totalOwed.toFixed(2)}€</span>
          </div>
          {payments.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', color: C }}>
              <span>[-] Pago Recibido ({p.payment_method} - {p.payment_date}):</span>
              <span>-{Number(p.amount).toFixed(2)}€</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #555', marginTop: '6px', paddingTop: '6px', fontWeight: '900', color: balance > 0.01 ? '#ef4444' : '#10b981', fontSize: '12px' }}>
            <span>(=) SALDO PENDIENTE FINAL:</span>
            <span>{balance.toFixed(2)}€</span>
          </div>
        </div>
      </div>

      {/* === TABS === */}
      <div style={{display:'flex',gap:'6px',marginBottom:'16px', background:'#111', padding:'4px', borderRadius:'14px'}}>
        <button style={tabStyle('cobros')} onClick={()=>{setActiveTab('cobros');setAdding(false);}}>💰 Cobros ({payments.length})</button>
        <button style={tabStyle('extras')} onClick={()=>{setActiveTab('extras');setAdding(false);}}>⚡ Extras ({positiveCharges.length})</button>
        <button style={tabStyle('descuentos')} onClick={()=>{setActiveTab('descuentos');setAdding(false);}}>🏷️ Descuentos ({discounts.length})</button>
        <button style={tabStyle('gastos')} onClick={()=>{setActiveTab('gastos');setAdding(false);}}>📉 Gastos ({expenses.length})</button>
      </div>

      {/* === BOTÓN AÑADIR === */}
      {!adding && (
        <button onClick={()=>setAdding(true)} style={{
          width:'100%', marginBottom:'16px', padding:'13px',
          background: activeTab==='cobros' ? C : activeTab==='extras' ? '#f59e0b' : activeTab==='descuentos' ? '#ec4899' : '#ef4444',
          color: activeTab==='cobros' ? '#000' : '#fff',
          border:'none', borderRadius:'14px', fontWeight:900, cursor:'pointer', fontSize:'13px'
        }}>
          + {activeTab==='cobros' ? 'REGISTRAR COBRO' : activeTab==='extras' ? 'AÑADIR CARGO EXTRA AL CLIENTE' : activeTab==='descuentos' ? 'AÑADIR DESCUENTO AL CLIENTE' : 'REGISTRAR GASTO'}
        </button>
      )}

      {adding && activeTab==='cobros' && <PayForm />}
      {adding && activeTab==='extras' && <ChargeForm />}
      {adding && activeTab==='descuentos' && <DiscountForm />}
      {adding && activeTab==='gastos' && <ExpForm />}

      {/* === LISTA DE MOVIMIENTOS === */}
      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {activeTab==='cobros' && payments.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#aaa',padding:'30px',border:'2px dashed #333',borderRadius:'20px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>💰</div>
            <div>Sin cobros registrados</div>
          </div>
        )}
        {activeTab==='cobros' && payments.map(p => {
          const isVerifying = (p.notes||'').includes('[VERIFICANDO]');
          const cleanNotes = (p.notes||'').replace('[VERIFICANDO]', '').trim();
          return (
          <div key={p.id} style={rowStyle(isVerifying ? '#f59e0b' : C)}>
            <div style={{background:isVerifying ? '#f59e0b22' : C+'22',color:isVerifying ? '#f59e0b' : C,width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,flexShrink:0}}>
              {isVerifying ? '⏳' : '▲'}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'16px',fontWeight:900,color:isVerifying ? '#f59e0b' : C}}>+{Number(p.amount).toFixed(2)}€</div>
                <div style={{display:'flex', gap:'4px'}}>
                  {isVerifying && <div style={{fontSize:'9px',color:'#f59e0b',border:'1px solid #f59e0b',padding:'2px 6px',borderRadius:'6px',fontWeight:900}}>VERIFICANDO</div>}
                  <div style={{fontSize:'10px',color:isVerifying ? '#f59e0b' : C,background:isVerifying ? '#f59e0b11' : C+'11',padding:'2px 8px',borderRadius:'6px',fontWeight:900}}>{(p.payment_method||'').toUpperCase()}</div>
                </div>
              </div>
              <div style={{fontSize:'11px',color:'#aaa',marginTop:'2px'}}>
                {new Date(p.payment_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{p.created_at ? '🌴 ' + new Date(p.created_at).toLocaleTimeString('es-ES',{timeZone:'Asia/Makassar',hour:'2-digit',minute:'2-digit'}) : ''}</span>
                {cleanNotes && <span style={{marginLeft:'8px'}}>· {cleanNotes}</span>}
              </div>
            </div>
            <button onClick={()=>delPayment(p.id)} style={{width:'32px',height:'32px',borderRadius:'10px',background:'#ef444411',border:'none',color:'#ef4444',cursor:'pointer',flexShrink:0}}>✕</button>
          </div>
        )})}

        {activeTab==='extras' && positiveCharges.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#aaa',padding:'30px',border:'2px dashed #333',borderRadius:'20px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>⚡</div>
            <div>Sin cargos extra</div>
            <div style={{fontSize:'12px',color:'#777',marginTop:'4px'}}>Pasajeros extra, tiempo adicional, actividades...</div>
          </div>
        )}
        {activeTab==='extras' && positiveCharges.map(c => (
          <div key={c.id} style={rowStyle('#f59e0b')}>
            <div style={{background:'#f59e0b22',color:'#f59e0b',width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,flexShrink:0}}>+€</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'14px',fontWeight:900}}>{c.concept}</div>
                <div style={{fontSize:'16px',fontWeight:900,color:'#f59e0b'}}>+{Number(c.amount).toFixed(2)}€</div>
              </div>
              <div style={{fontSize:'11px',color:'#aaa',marginTop:'2px'}}>
                {new Date(c.charge_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{c.created_at ? '🌴 ' + new Date(c.created_at).toLocaleTimeString('es-ES',{timeZone:'Asia/Makassar',hour:'2-digit',minute:'2-digit'}) : ''}</span>
                <span style={{marginLeft:'8px',fontSize:'10px',color:'#f59e0b',background:'#f59e0b11',padding:'2px 6px',borderRadius:'4px'}}>CARGO AL CLIENTE</span>
              </div>
            </div>
            <button onClick={()=>delCharge(c.id)} style={{width:'32px',height:'32px',borderRadius:'10px',background:'#ef444411',border:'none',color:'#ef4444',cursor:'pointer',flexShrink:0}}>✕</button>
          </div>
        ))}

        {activeTab==='descuentos' && discounts.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#aaa',padding:'30px',border:'2px dashed #333',borderRadius:'20px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>🏷️</div>
            <div>Sin descuentos aplicados</div>
            <div style={{fontSize:'12px',color:'#777',marginTop:'4px'}}>Descuentos especiales, compensaciones, cortesías...</div>
          </div>
        )}
        {activeTab==='descuentos' && discounts.map(c => (
          <div key={c.id} style={rowStyle('#ec4899')}>
            <div style={{background:'#ec489922',color:'#ec4899',width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,flexShrink:0}}>-€</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'14px',fontWeight:900}}>{c.concept}</div>
                <div style={{fontSize:'16px',fontWeight:900,color:'#ec4899'}}>-{Math.abs(Number(c.amount)).toFixed(2)}€</div>
              </div>
              <div style={{fontSize:'11px',color:'#aaa',marginTop:'2px'}}>
                {new Date(c.charge_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{c.created_at ? '🌴 ' + new Date(c.created_at).toLocaleTimeString('es-ES',{timeZone:'Asia/Makassar',hour:'2-digit',minute:'2-digit'}) : ''}</span>
                <span style={{marginLeft:'8px',fontSize:'10px',color:'#ec4899',background:'#ec489911',padding:'2px 6px',borderRadius:'4px'}}>DESCUENTO</span>
              </div>
            </div>
            <button onClick={()=>delCharge(c.id)} style={{width:'32px',height:'32px',borderRadius:'10px',background:'#ef444411',border:'none',color:'#ef4444',cursor:'pointer',flexShrink:0}}>✕</button>
          </div>
        ))}

        {activeTab==='gastos' && expenses.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#aaa',padding:'30px',border:'2px dashed #333',borderRadius:'20px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>📉</div>
            <div>Sin gastos registrados</div>
          </div>
        )}
        {activeTab==='gastos' && expenses.map(e => (
          <div key={e.id} style={rowStyle('#ef4444')}>
            <div style={{background:'#ef444422',color:'#ef4444',width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,flexShrink:0}}>▼</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'14px',fontWeight:900}}>{e.concept}</div>
                <div style={{fontSize:'16px',fontWeight:900,color:'#ef4444'}}>-{Number(e.amount).toFixed(2)}€</div>
              </div>
              <div style={{fontSize:'11px',color:'#aaa',marginTop:'2px'}}>
                {new Date(e.expense_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{e.created_at ? '🌴 ' + new Date(e.created_at).toLocaleTimeString('es-ES',{timeZone:'Asia/Makassar',hour:'2-digit',minute:'2-digit'}) : ''}</span>
                <span style={{marginLeft:'8px',fontSize:'10px',color:'#ef4444',background:'#ef444411',padding:'2px 6px',borderRadius:'4px'}}>{(e.category||'').toUpperCase()}</span>
              </div>
            </div>
            <button onClick={()=>delExpense(e.id)} style={{width:'32px',height:'32px',borderRadius:'10px',background:'#ef444411',border:'none',color:'#ef4444',cursor:'pointer',flexShrink:0}}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};



export const ItineraryEditor = ({booking, onUpdate}) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  React.useEffect(() => {
    if (booking?.itinerary) {
      try {
        if (booking.itinerary.startsWith('[')) {
          setItems(JSON.parse(booking.itinerary));
        } else {
          setItems(booking.itinerary.split(',').map(s => ({time: '--:--', desc: s.trim()})));
        }
      } catch(e) {
        setItems([]);
      }
    } else {
      // Fallback to tour data or selected_stops to help admin start editing
      const tour = tours.find(t => t.id === booking.tour_id) || tours.find(t => t.title === booking.tour_title);
      
      if (booking.selected_stops) {
        setItems(booking.selected_stops.split(',').map(s => ({ time: '--:--', activity: s.trim(), subtitle: '' })));
      } else if (tour && tour.itinerary) {
        setItems(tour.itinerary.map(i => ({
          time: i.duration || '--:--',
          activity: isEn ? (i.activity_en || i.activity) : i.activity,
          subtitle: isEn ? (i.desc_en || i.desc) : i.desc
        })));
      } else {
        setItems([]);
      }
    }
  }, [booking]);

  const save = async () => {
    if (!booking?.id) {
      alert('Error: ID de reserva no encontrado');
      return;
    }
    setLoading(true);
    try {
      // Ensure we save the correct structure
      const dataToSave = items.map(it => ({
        time: it.time,
        activity: it.activity || it.desc || '', // backward compatibility
        subtitle: it.subtitle || ''
      }));
      await api.updateBooking({ id: booking.id, itinerary: JSON.stringify(dataToSave) });
      if (onUpdate) onUpdate();
      alert(isEn ? 'Itinerary saved ✓' : 'Itinerario guardado ✓');
    } catch(e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => setItems([...items, {time: '08:00', activity: 'Nueva parada', subtitle: ''}]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx, k, v) => {
    const next = [...items];
    next[idx][k] = v;
    setItems(next);
  };
  const moveItem = (idx, dir) => {
    if (idx + dir < 0 || idx + dir >= items.length) return;
    const next = [...items];
    [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
    setItems(next);
  };

  return (
    <div style={{color:'#fff'}}>
      <p style={{fontSize:'12px', color:'#666', marginBottom:'20px'}}>
        {isEn ? 'Configure the trip schedule. These changes will be reflected instantly on the client itinerary.' : 'Configura el cronograma del viaje. Estos cambios se verán reflejados instantáneamente en el itinerario del cliente.'}
      </p>
      
      <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'24px'}}>
        {items.map((item, idx) => (
          <div key={idx} style={{display:'flex', gap:'10px', alignItems:'flex-start', background:'#222', padding:'12px', borderRadius:'16px', border:'1px solid #333'}}>
            <div style={{width:'80px'}}>
              <input id={`time_${idx}`} name={`time_${idx}`} value={item.time} onChange={e=>updateItem(idx, 'time', e.target.value)} style={{...inputStyle, textAlign:'center', padding:'8px'}} placeholder="08:00" />
            </div>
            <div style={{flex:1, display:'flex', flexDirection:'column', gap:'6px'}}>
              <input id={`activity_${idx}`} name={`activity_${idx}`} value={item.activity || item.desc} onChange={e=>updateItem(idx, 'activity', e.target.value)} style={{...inputStyle, padding:'8px'}} placeholder={isEn ? 'Activity...' : 'Actividad...'} />
              <input id={`subtitle_${idx}`} name={`subtitle_${idx}`} value={item.subtitle} onChange={e=>updateItem(idx, 'subtitle', e.target.value)} style={{...inputStyle, padding:'8px', fontSize:'11px', opacity:0.7}} placeholder={isEn ? 'Subtitle / Details...' : 'Subtítulo / Detalles...'} />
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'4px', marginTop:'4px'}}>
              <button onClick={()=>moveItem(idx, -1)} disabled={idx === 0} style={{background:'transparent', border:`1px solid ${idx===0?'#222':'#444'}`, color:idx === 0 ? '#333' : '#aaa', width:'28px', height:'24px', borderRadius:'6px', cursor:idx === 0 ? 'default' : 'pointer', fontSize:'10px', padding:0}}>▲</button>
              <button onClick={()=>moveItem(idx, 1)} disabled={idx === items.length - 1} style={{background:'transparent', border:`1px solid ${idx===items.length-1?'#222':'#444'}`, color:idx === items.length - 1 ? '#333' : '#aaa', width:'28px', height:'24px', borderRadius:'6px', cursor:idx === items.length - 1 ? 'default' : 'pointer', fontSize:'10px', padding:0}}>▼</button>
            </div>
            <button onClick={()=>removeItem(idx)} style={{background:'#ef444415', border:'none', color:'#ef4444', width:'32px', height:'52px', borderRadius:'10px', cursor:'pointer', marginTop:'4px'}}>✕</button>
          </div>
        ))}
        
        <button onClick={addItem} style={{padding:'12px', background:'#ffffff05', border:'1px dashed #333', color:'#fff', borderRadius:'16px', cursor:'pointer', fontWeight:900, fontSize:'11px'}}>
          {isEn ? '+ ADD STOP OR TIME' : '+ AÑADIR PARADA O HORA'}
        </button>
      </div>

      <button onClick={save} disabled={loading} style={{width:'100%', padding:'16px', background:'#11BDDB', color:'#fff', border:'none', borderRadius:'16px', fontWeight:900, cursor:'pointer', opacity:loading?0.5:1}}>
        {loading ? (isEn ? 'SAVING...' : 'GUARDANDO...') : (isEn ? 'SAVE CUSTOM ITINERARY' : 'GUARDAR ITINERARIO PERSONALIZADO')}
      </button>
    </div>
  );
};

export const PassengerManagement = ({booking, onUpdate, onClose}) => {
  const C = '#11BDDB';
  const [passengers, setPassengers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let ext = {};
    try {
      if (typeof booking.extras === 'string' && booking.extras !== '[object Object]') {
        ext = JSON.parse(booking.extras);
      } else if (typeof booking.extras === 'object' && booking.extras !== null) {
        ext = booking.extras;
      }
    } catch(e) {}
    
    let existingPax = Array.isArray(ext.passengers) ? ext.passengers : [];
    const numPax = Math.max(1, Math.abs(parseInt(booking.pax) || 1));
    let initCheckin = Array(numPax).fill(0).map((_, i) => existingPax[i] || { name: '', passport: '', age: '', emergency: '', medical: '' });
    
    setPassengers(initCheckin);
  }, [booking]);

  const updateField = (idx, key, val) => {
    const list = [...passengers];
    list[idx] = { ...list[idx], [key]: val };
    setPassengers(list);
  };

  const save = async () => {
    setLoading(true);
    try {
      let ext = {};
      try {
        if (typeof booking.extras === 'string' && booking.extras !== '[object Object]') {
          ext = JSON.parse(booking.extras);
        } else if (typeof booking.extras === 'object' && booking.extras !== null) {
          ext = booking.extras;
        }
      } catch(e) {}

      // Clean empty rows if any
      const cleanedPassengers = passengers.filter(p => (p.name || '').trim() || (p.passport || '').trim() || (p.age || '').trim() || (p.emergency || '').trim() || (p.medical || '').trim());
      
      ext.passengers = cleanedPassengers;

      // Add log
      if (!ext.logs) ext.logs = [];
      ext.logs.push({
        timestamp: new Date().toISOString(),
        text: `Datos de pasajeros (Check-In) actualizados desde el Panel Admin (${cleanedPassengers.length} pasajeros registrados).`
      });

      await api.updateBooking({
        ...booking,
        extras: JSON.stringify(ext)
      });

      if (onUpdate) await onUpdate();
      if (onClose) onClose();
    } catch (e) {
      alert('Error guardando pasajeros: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
      <p style={{fontSize:'12px', color:'#666', marginBottom:'10px'}}>
        Gestiona y edita los datos oficiales de los pasajeros registrados para el Check-In. Estos datos se utilizan para el seguro del viaje y la coordinación del tour.
      </p>

      <div style={{display:'flex', flexDirection:'column', gap:'12px', maxHeight:'400px', overflowY:'auto', paddingRight:'6px', scrollbarWidth:'thin'}}>
        {passengers.length === 0 ? (
          <div style={{
            fontSize: '12px',
            color: '#888',
            fontStyle: 'italic',
            padding: '30px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '16px',
            border: '1px dashed #333'
          }}>
            Sin pasajeros registrados en este tour. Haz clic en el botón de abajo para registrar el primero.
          </div>
        ) : (
          passengers.map((p, idx) => (
            <div key={idx} style={{
              background: '#222',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #333',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative'
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:'11px', fontWeight:900, color:C, textTransform:'uppercase', letterSpacing:'0.05em'}}>
                  Pasajero #{idx + 1}
                </span>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px'}}>
                <Field label="Nombre Completo">
                  <input 
                    id={`pax_name_${idx}`}
                    name={`pax_name_${idx}`}
                    value={p.name || ''} 
                    onChange={e => updateField(idx, 'name', e.target.value)} 
                    style={inputStyle}
                    placeholder="Ej. Juan Pérez"
                  />
                </Field>
                <Field label="Número de Pasaporte">
                  <input 
                    id={`pax_pass_${idx}`}
                    name={`pax_pass_${idx}`}
                    value={p.passport || ''} 
                    onChange={e => updateField(idx, 'passport', e.target.value)} 
                    style={inputStyle}
                    placeholder="Ej. P1234567"
                  />
                </Field>
                <Field label="Edad">
                  <input 
                    id={`pax_age_${idx}`}
                    name={`pax_age_${idx}`}
                    type="number"
                    min="0"
                    max="120"
                    value={p.age || ''} 
                    onChange={e => updateField(idx, 'age', e.target.value)} 
                    style={inputStyle}
                    placeholder="Ej. 35"
                  />
                </Field>
                <Field label="Contacto de Emergencia">
                  <input 
                    id={`pax_emg_${idx}`}
                    name={`pax_emg_${idx}`}
                    value={p.emergency || ''} 
                    onChange={e => updateField(idx, 'emergency', e.target.value)} 
                    style={inputStyle}
                    placeholder="Ej. María Pérez +34..."
                  />
                </Field>
                <Field label="Alergias o condiciones médicas">
                  <input 
                    id={`pax_med_${idx}`}
                    name={`pax_med_${idx}`}
                    value={p.medical || ''} 
                    onChange={e => updateField(idx, 'medical', e.target.value)} 
                    style={inputStyle}
                    placeholder="Dejar en blanco si ninguna"
                  />
                </Field>
              </div>
            </div>
          ))
        )}
      </div>

      <button 
        onClick={save} 
        disabled={loading} 
        style={{
          width: '100%',
          padding: '16px',
          background: C,
          color: '#000',
          border: 'none',
          borderRadius: '16px',
          fontWeight: 900,
          cursor: 'pointer',
          opacity: loading ? 0.5 : 1,
          marginTop: '10px'
        }}
      >
        {loading ? 'GUARDANDO CAMBIOS...' : 'GUARDAR DATOS DE CHECK-IN ✓'}
      </button>
    </div>
  );
};
