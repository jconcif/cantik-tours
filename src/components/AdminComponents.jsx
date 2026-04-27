import React from 'react';

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
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
    <Input label="Cliente" value={data.client_name} onChange={v=>onChange('client_name',v)} />
    <Input label="WhatsApp" value={data.client_phone} onChange={v=>onChange('client_phone',v)} />
    <Input label="Fecha Tour" value={data.booking_date} onChange={v=>onChange('booking_date',v)} type="date" />
    <Input label="Hotel" value={data.hotel} onChange={v=>onChange('hotel',v)} />
    <div style={{gridColumn:'1/-1'}}><Input label="Tour" value={data.tour_title} onChange={v=>onChange('tour_title',v)} /></div>
    <Input label="Precio €" value={data.total_price} onChange={v=>onChange('total_price',v)} type="number" />
    <Input label="Depósito €" value={data.deposit_amount} onChange={v=>onChange('deposit_amount',v)} type="number" />
    <Input label="PAX" value={data.pax} onChange={v=>onChange('pax',v)} type="number" />
    <Select label="Estado Pago" value={data.payment_status} onChange={v=>onChange('payment_status',v)} options={[{value:'pending',label:'En Espera'},{value:'reserved',label:'Reservado'},{value:'paid',label:'Total Pagado'},{value:'cancelled',label:'Cancelado'},{value:'refunded',label:'Devolución'}]} />
    <Select label="Chofer" value={data.driver_id} onChange={v=>onChange('driver_id',v)} options={[{value:'',label:'Sin asignar'},...drivers.map(d=>({value:d.id,label:d.name}))]} />
    <Select label="Experiencia" value={data.experience} onChange={v=>onChange('experience',v)} options={[{value:'economy',label:'Economy'},{value:'comfort',label:'Comfort'},{value:'premium',label:'Premium'}]} />
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
  <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
    <Input label="Nombre" value={data.nombre} onChange={v=>onChange('nombre',v)} />
    <Field label="Comentario (Español)"><textarea rows={3} value={data.comentario||''} onChange={e=>onChange('comentario',e.target.value)} style={{...inputStyle,resize:'vertical'}} /></Field>
    <Field label="Comment (English)"><textarea rows={3} value={data.comentario_en||''} onChange={e=>onChange('comentario_en',e.target.value)} style={{...inputStyle,resize:'vertical'}} /></Field>
    <Input label="Puntuación (1-5)" value={data.puntuacion} onChange={v=>onChange('puntuacion',v)} type="number" min={1} max={5} />
    <label style={{display:'flex',alignItems:'center',gap:'10px',fontWeight:700,fontSize:'14px',color:'#fff'}}>
      <input type="checkbox" checked={data.aprobado==1} onChange={e=>onChange('aprobado',e.target.checked?1:0)} style={{width:'18px',height:'18px',accentColor:'#11BDDB'}} /> Publicar en web
    </label>
  </div>
);

export const CouponForm = ({data,onChange}) => (
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
    <Input label="Código" value={data.code} onChange={v=>onChange('code',v)} />
    <Select label="Tipo Descuento" value={data.discount_type} onChange={v=>onChange('discount_type',v)} options={[{value:'percent',label:'Porcentaje %'},{value:'fixed',label:'Importe fijo €'}]} />
    <Input label="Valor" value={data.discount_value} onChange={v=>onChange('discount_value',v)} type="number" />
    <Input label="Usos máximos (0=ilimitado)" value={data.max_uses} onChange={v=>onChange('max_uses',v)} type="number" />
    <label style={{display:'flex',alignItems:'center',gap:'10px',fontWeight:700,fontSize:'14px',color:'#fff',gridColumn:'1/-1'}}>
      <input type="checkbox" checked={data.active==1} onChange={e=>onChange('active',e.target.checked?1:0)} style={{width:'18px',height:'18px',accentColor:'#11BDDB'}} /> Cupón activo
    </label>
  </div>
);

export const Modal = ({title,children,onClose,onSave,loading}) => (
  <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',backdropFilter:'blur(8px)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{background:'#1a1a1a',borderRadius:'28px',padding:'32px',width:'100%',maxWidth:'560px',maxHeight:'90vh',overflowY:'auto',borderTop:'8px solid #11BDDB'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
        <h2 style={{margin:0,fontSize:'20px',fontWeight:900,color:'#fff'}}>{title}</h2>
        <button onClick={onClose} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#666'}}>✕</button>
      </div>
      {children}
      <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
        <button onClick={onClose} style={{flex:1,padding:'14px',borderRadius:'16px',border:'none',background:'#333',color:'#999',fontWeight:900,cursor:'pointer',fontSize:'13px'}}>CANCELAR</button>
        <button onClick={onSave} disabled={loading} style={{flex:1,padding:'14px',borderRadius:'16px',border:'none',background:'#11BDDB',color:'#fff',fontWeight:900,cursor:'pointer',fontSize:'13px',opacity:loading?0.5:1}}>
          {loading ? 'GUARDANDO...' : 'GUARDAR'}
        </button>
      </div>
    </div>
  </div>
);
