import React from 'react';
import * as api from '../services/api';

const inputStyle = {padding:'10px 14px',borderRadius:'12px',border:'1px solid #333',fontSize:'14px',fontWeight:600,background:'#222',color:'#fff',width:'100%',boxSizing:'border-box',outline:'none'};
const labelStyle = {fontSize:'10px',fontWeight:900,color:'#11BDDB',textTransform:'uppercase',letterSpacing:'0.05em'};

const Field = ({label, children}) => (
  <div style={{display:'flex',flexDirection:'column',gap:'4px'}}><label style={labelStyle}>{label}</label>{children}</div>
);

const Input = ({label,value,onChange,type='text',...rest}) => (
  <Field label={label}><input type={type} value={value||''} onChange={e=>onChange(e.target.value)} style={inputStyle} {...rest} /></Field>
);

const Select = ({label,value,onChange,options}) => (
  <Field label={label}><select value={value||''} onChange={e=>onChange(e.target.value)} style={inputStyle}>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></Field>
);

export const BookingForm = ({data,drivers,onChange}) => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:'12px'}}>
    <Input label="Cliente" value={data.client_name} onChange={v=>onChange('client_name',v)} />
    <Input label="WhatsApp" value={data.client_phone} onChange={v=>onChange('client_phone',v)} />
    <Input label="Fecha Tour" value={data.booking_date} onChange={v=>onChange('booking_date',v)} type="date" />
    <Input label="Hotel" value={data.hotel} onChange={v=>onChange('hotel',v)} />
    <div style={{gridColumn:'1/-1'}}><Input label="Tour" value={data.tour_title} onChange={v=>onChange('tour_title',v)} /></div>
    <Input label="Precio €" value={data.total_price} onChange={v=>onChange('total_price',v)} type="number" />
    <Input label="Depósito €" value={data.deposit_amount} onChange={v=>onChange('deposit_amount',v)} type="number" />
    <Input label="PAX" value={data.pax} onChange={v=>onChange('pax',v)} type="number" />
    <Select label="Estado Pago" value={data.payment_status} onChange={v=>onChange('payment_status',v)} options={[
      {value:'requested',label:'Pago Pendiente'},
      {value:'reserved',label:'Reservado (Seña)'},
      {value:'confirmed',label:'Confirmado'},
      {value:'paid',label:'Pago Completado'},
      {value:'on_tour',label:'En Tour'},
      {value:'finished',label:'Finalizado'},
      {value:'postponed',label:'Pospuesto'},
      {value:'cancelled',label:'Cancelado'},
      {value:'refunded',label:'Reembolsado'}
    ]} />
    <Select label="Chofer" value={data.driver_id} onChange={v=>onChange('driver_id',v)} options={[{value:'',label:'Sin asignar'},...drivers.map(d=>({value:d.id,label:d.name}))]} />
    <Select label="Experiencia" value={data.experience} onChange={v=>onChange('experience',v)} options={[{value:'driver_en',label:'Conductor privado (inglés)'},{value:'guide_en',label:'Guía Local (inglés)'},{value:'guide_es',label:'Guía Local Certificado (español)'}]} />
    <Input label="Código Referencia (ej: GP7D)" value={data.reference} onChange={v=>onChange('reference',v)} />
  </div>
);

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
      <input type="checkbox" checked={data.aprobado==1} onChange={e=>onChange('aprobado',e.target.checked?1:0)} style={{width:'18px',height:'18px',accentColor:'#11BDDB'}} /> Publicar en web
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
      <input type="checkbox" checked={data.active==1} onChange={e=>onChange('active',e.target.checked?1:0)} style={{width:'18px',height:'18px',accentColor:'#11BDDB'}} /> Cupón activo
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

  React.useEffect(() => { load(); }, [load]);

  // -- Calculations --
  const totalPaid    = payments.reduce((s, p) => s + Number(p.amount), 0);
  const totalExp     = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const totalCharges = charges.reduce((s, c) => s + Number(c.amount), 0);
  const totalOwed    = basePrice + totalCharges; // Lo que debe el cliente en total
  const balance      = totalOwed - totalPaid;    // Saldo pendiente del cliente
  const profit       = totalPaid - totalExp;     // Beneficio neto del negocio
  const paidPct      = Math.min(100, (totalPaid / Math.max(totalOwed, 1)) * 100);

  // -- Helpers --
  const delPayment = async (id) => { if (!window.confirm('¿Eliminar cobro?')) return; try { await api.deletePayment(id); await load(); if (onUpdate) onUpdate(); } catch(e) { alert(e.message); } };
  const delExpense = async (id) => { if (!window.confirm('¿Eliminar gasto?')) return; try { await api.deleteExpense(id); await load(); if (onUpdate) onUpdate(); } catch(e) { alert(e.message); } };
  const delCharge  = async (id) => { if (!window.confirm('¿Eliminar cargo extra?')) return; try { await api.deleteCharge(id); await load(); if (onUpdate) onUpdate(); } catch(e) { alert(e.message); } };

  const tabStyle = (t) => ({
    flex: 1, padding: '10px 4px', background: activeTab === t ? C : '#222',
    color: activeTab === t ? '#000' : '#666', border: 'none', borderRadius: '12px',
    fontWeight: 900, cursor: 'pointer', fontSize: '11px', transition: 'all 0.2s'
  });

  const rowStyle = (color) => ({
    display:'flex', gap:'12px', alignItems:'center',
    background:'#1a1a1a', padding:'14px 16px', borderRadius:'16px',
    border:`1px solid ${color}22`
  });

  // -- Add Forms --
  const PayForm = () => {
    const [d, setD] = React.useState({amount:'', payment_date: new Date().toISOString().split('T')[0], payment_method:'Efectivo', notes:''});
    const save = async () => {
      if (!d.amount) return;
      setLoading(true);
      try { await api.addPayment({...d, booking_id: bookingId}); await load(); setAdding(false); if(onUpdate) onUpdate(); }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:`1px solid ${C}44`}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'10px'}}>
          <Input label="Importe €" type="number" value={d.amount} onChange={v=>setD({...d,amount:v})} />
          <Input label="Fecha" type="date" value={d.payment_date} onChange={v=>setD({...d,payment_date:v})} />
          <Select label="Método" value={d.payment_method} onChange={v=>setD({...d,payment_method:v})}
            options={[{value:'Efectivo',label:'Efectivo'},{value:'Transferencia',label:'Transferencia'},{value:'PayPal',label:'PayPal'},{value:'Tarjeta',label:'Tarjeta'}]} />
          <Input label="Notas" value={d.notes} onChange={v=>setD({...d,notes:v})} />
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={save} style={{flex:2,padding:'12px',background:C,color:'#000',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✓ GUARDAR COBRO</button>
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#666',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
        </div>
      </div>
    );
  };

  const ExpForm = () => {
    const [d, setD] = React.useState({concept:'', amount:'', expense_date: new Date().toISOString().split('T')[0], category:'Chofer'});
    const save = async () => {
      if (!d.amount || !d.concept) return;
      setLoading(true);
      try { await api.addExpense({...d, booking_id: bookingId}); await load(); setAdding(false); if(onUpdate) onUpdate(); }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:'1px solid #ef444444'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'10px'}}>
          <Input label="Concepto" value={d.concept} onChange={v=>setD({...d,concept:v})} />
          <Input label="Importe €" type="number" value={d.amount} onChange={v=>setD({...d,amount:v})} />
          <Input label="Fecha" type="date" value={d.expense_date} onChange={v=>setD({...d,expense_date:v})} />
          <Select label="Categoría" value={d.category} onChange={v=>setD({...d,category:v})}
            options={[{value:'Chofer',label:'Pago Chofer'},{value:'Combustible',label:'Combustible'},{value:'Entradas',label:'Entradas'},{value:'Comida',label:'Comida'},{value:'Otros',label:'Otros'}]} />
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={save} style={{flex:2,padding:'12px',background:'#ef4444',color:'#fff',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✓ GUARDAR GASTO</button>
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#666',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
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
      try { await api.addCharge({...d, booking_id: bookingId}); await load(); setAdding(false); if(onUpdate) onUpdate(); }
      catch(e) { alert(e.message); } finally { setLoading(false); }
    };
    return (
      <div style={{background:'#222', padding:'18px', borderRadius:'20px', marginBottom:'16px', border:'1px solid #f59e0b44'}}>
        <div style={{marginBottom:'10px'}}>
          <label style={{fontSize:'10px',fontWeight:900,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.05em'}}>Concepto Rápido</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'6px'}}>
            {PRESETS.map(p => (
              <button key={p} onClick={()=>setD({...d,concept:p})}
                style={{padding:'5px 10px',background: d.concept===p ? '#f59e0b22' : '#333',color: d.concept===p ? '#f59e0b' : '#666',border: d.concept===p ? '1px solid #f59e0b44' : '1px solid #444',borderRadius:'8px',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>
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
          <button onClick={()=>setAdding(false)} style={{flex:1,padding:'12px',background:'#333',color:'#666',border:'none',borderRadius:'12px',fontWeight:900,cursor:'pointer'}}>✕</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{color:'#fff'}}>
      {/* === RESUMEN FINANCIERO === */}
      <div style={{background:'linear-gradient(135deg,#11BDDB11,#10b98111)', border:'1px solid #11BDDB22', borderRadius:'20px', padding:'20px', marginBottom:'20px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))', gap:'12px', marginBottom:'16px'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#aaa',textTransform:'uppercase',marginBottom:'4px'}}>Precio Base</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#fff'}}>{basePrice.toFixed(2)}€</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'9px',fontWeight:900,color:'#f59e0b',textTransform:'uppercase',marginBottom:'4px'}}>+ Extras</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'#f59e0b'}}>{totalCharges.toFixed(2)}€</div>
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
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',fontSize:'10px',color:'#666'}}>
            <span>Cobrado {paidPct.toFixed(0)}%</span>
            <span>Total a cobrar: {totalOwed.toFixed(2)}€</span>
          </div>
          <div style={{height:'6px',background:'#333',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',background:balance > 0 ? C : '#10b981',width:`${paidPct}%`,borderRadius:'4px',transition:'width 0.5s'}}></div>
          </div>
        </div>
      </div>

      {/* === TABS === */}
      <div style={{display:'flex',gap:'6px',marginBottom:'16px', background:'#111', padding:'4px', borderRadius:'14px'}}>
        <button style={tabStyle('cobros')} onClick={()=>{setActiveTab('cobros');setAdding(false);}}>💰 Cobros ({payments.length})</button>
        <button style={tabStyle('extras')} onClick={()=>{setActiveTab('extras');setAdding(false);}}>⚡ Extras ({charges.length})</button>
        <button style={tabStyle('gastos')} onClick={()=>{setActiveTab('gastos');setAdding(false);}}>📉 Gastos ({expenses.length})</button>
      </div>

      {/* === BOTÓN AÑADIR === */}
      {!adding && (
        <button onClick={()=>setAdding(true)} style={{
          width:'100%', marginBottom:'16px', padding:'13px',
          background: activeTab==='cobros' ? C : activeTab==='extras' ? '#f59e0b' : '#ef4444',
          color: activeTab==='cobros' ? '#000' : '#fff',
          border:'none', borderRadius:'14px', fontWeight:900, cursor:'pointer', fontSize:'13px'
        }}>
          + {activeTab==='cobros' ? 'REGISTRAR COBRO' : activeTab==='extras' ? 'AÑADIR CARGO EXTRA AL CLIENTE' : 'REGISTRAR GASTO'}
        </button>
      )}

      {adding && activeTab==='cobros' && <PayForm />}
      {adding && activeTab==='extras' && <ChargeForm />}
      {adding && activeTab==='gastos' && <ExpForm />}

      {/* === LISTA DE MOVIMIENTOS === */}
      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {activeTab==='cobros' && payments.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#555',padding:'30px',border:'2px dashed #222',borderRadius:'20px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>💰</div>
            <div>Sin cobros registrados</div>
          </div>
        )}
        {activeTab==='cobros' && payments.map(p => (
          <div key={p.id} style={rowStyle(C)}>
            <div style={{background:C+'22',color:C,width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,flexShrink:0}}>▲</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'16px',fontWeight:900,color:C}}>+{Number(p.amount).toFixed(2)}€</div>
                <div style={{fontSize:'10px',color:C,background:C+'11',padding:'2px 8px',borderRadius:'6px',fontWeight:900}}>{(p.payment_method||'').toUpperCase()}</div>
              </div>
              <div style={{fontSize:'11px',color:'#555',marginTop:'2px'}}>
                {new Date(p.payment_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{p.created_at ? new Date(p.created_at).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) : ''}</span>
                {p.notes && <span style={{marginLeft:'8px'}}>· {p.notes}</span>}
              </div>
            </div>
            <button onClick={()=>delPayment(p.id)} style={{width:'32px',height:'32px',borderRadius:'10px',background:'#ef444411',border:'none',color:'#ef4444',cursor:'pointer',flexShrink:0}}>✕</button>
          </div>
        ))}

        {activeTab==='extras' && charges.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#555',padding:'30px',border:'2px dashed #222',borderRadius:'20px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>⚡</div>
            <div>Sin cargos extra</div>
            <div style={{fontSize:'12px',color:'#444',marginTop:'4px'}}>Pasajeros extra, tiempo adicional, actividades...</div>
          </div>
        )}
        {activeTab==='extras' && charges.map(c => (
          <div key={c.id} style={rowStyle('#f59e0b')}>
            <div style={{background:'#f59e0b22',color:'#f59e0b',width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,flexShrink:0}}>+€</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'14px',fontWeight:900}}>{c.concept}</div>
                <div style={{fontSize:'16px',fontWeight:900,color:'#f59e0b'}}>+{Number(c.amount).toFixed(2)}€</div>
              </div>
              <div style={{fontSize:'11px',color:'#555',marginTop:'2px'}}>
                {new Date(c.charge_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{c.created_at ? new Date(c.created_at).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) : ''}</span>
                <span style={{marginLeft:'8px',fontSize:'10px',color:'#f59e0b',background:'#f59e0b11',padding:'2px 6px',borderRadius:'4px'}}>CARGO AL CLIENTE</span>
              </div>
            </div>
            <button onClick={()=>delCharge(c.id)} style={{width:'32px',height:'32px',borderRadius:'10px',background:'#ef444411',border:'none',color:'#ef4444',cursor:'pointer',flexShrink:0}}>✕</button>
          </div>
        ))}

        {activeTab==='gastos' && expenses.length===0 && !adding && (
          <div style={{textAlign:'center',color:'#555',padding:'30px',border:'2px dashed #222',borderRadius:'20px'}}>
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
              <div style={{fontSize:'11px',color:'#555',marginTop:'2px'}}>
                {new Date(e.expense_date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
                <span style={{marginLeft:'6px', opacity:0.5}}>{e.created_at ? new Date(e.created_at).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) : ''}</span>
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


