import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import { Mail } from 'lucide-react';

export const EmailSettings = () => {
  const [settings, setSettings] = useState({ sendOnBooking: true, sendOnPayment: true });
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    api.getEmailSettings().then(res => {
      if (res.data) setSettings(res.data);
    }).catch(e => console.error(e));
  }, []);

  const toggle = async (key) => {
    const newVal = !settings[key];
    setSettings(s => ({ ...s, [key]: newVal }));
    setSaving(true);
    try {
      await api.updateEmailSettings({ [key]: newVal });
    } catch(e) {
      alert('Error updating settings');
      setSettings(s => ({ ...s, [key]: !newVal })); // revert
    } finally {
      setSaving(false);
    }
  };

  const C = '#11BDDB';

  return (
    <div style={{background: '#1a1a1a', padding: '24px', borderRadius: '24px', color: '#fff', border: '1px solid #333', maxWidth: '600px', margin: '0 auto'}}>
      <h3 style={{marginTop:0, display:'flex', alignItems:'center', gap:'8px'}}><Mail size={20} color={C}/> Configuración de Correos Automáticos</h3>
      <p style={{fontSize:'13px', color:'#aaa', marginBottom:'24px'}}>Activa o desactiva el envío automático de correos a clientes y administradores según los eventos del sistema.</p>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#222', padding:'16px', borderRadius:'16px', marginBottom:'12px', border:'1px solid #444'}}>
        <div>
          <div style={{fontWeight:900, fontSize:'14px'}}>Al Agendar (Nueva Reserva)</div>
          <div style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>Envía confirmación al cliente y alerta al administrador.</div>
        </div>
        <button onClick={() => toggle('sendOnBooking')} disabled={saving} style={{background: settings.sendOnBooking ? '#10b981' : '#444', border:'none', borderRadius:'20px', width:'50px', height:'28px', position:'relative', cursor:'pointer', transition:'all 0.3s', opacity: saving ? 0.5 : 1}}>
          <div style={{background:'#fff', borderRadius:'50%', width:'22px', height:'22px', position:'absolute', top:'3px', left: settings.sendOnBooking ? '25px' : '3px', transition:'all 0.3s'}}/>
        </button>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#222', padding:'16px', borderRadius:'16px', border:'1px solid #444'}}>
        <div>
          <div style={{fontWeight:900, fontSize:'14px'}}>Al Pagar (Subida Comprobante)</div>
          <div style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>Envía alerta al administrador con el comprobante de pago.</div>
        </div>
        <button onClick={() => toggle('sendOnPayment')} disabled={saving} style={{background: settings.sendOnPayment ? '#10b981' : '#444', border:'none', borderRadius:'20px', width:'50px', height:'28px', position:'relative', cursor:'pointer', transition:'all 0.3s', opacity: saving ? 0.5 : 1}}>
          <div style={{background:'#fff', borderRadius:'50%', width:'22px', height:'22px', position:'absolute', top:'3px', left: settings.sendOnPayment ? '25px' : '3px', transition:'all 0.3s'}}/>
        </button>
      </div>
      
      <div style={{marginTop:'20px', fontSize:'11px', color:'#888', fontStyle:'italic'}}>
        Nota: Esta configuración se aplica en tiempo real. Si el servidor se reinicia, la configuración podría volver a sus valores predeterminados (Encendido).
      </div>
    </div>
  );
};
