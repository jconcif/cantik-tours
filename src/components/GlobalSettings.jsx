import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import { Mail, DollarSign } from 'lucide-react';

export const GlobalSettings = () => {
  const [settings, setSettings] = useState({ sendToAdmin: true, sendToClient: true, exchangeRate: 1.08 });
  const [saving, setSaving] = useState(false);
  const [rateInput, setRateInput] = useState('1.08');
  
  useEffect(() => {
    api.getGlobalSettings().then(res => {
      if (res.data) {
        setSettings(res.data);
        setRateInput(res.data.exchangeRate.toString());
      }
    }).catch(e => console.error(e));
  }, []);

  const toggle = async (key) => {
    const newVal = !settings[key];
    setSettings(s => ({ ...s, [key]: newVal }));
    setSaving(true);
    try {
      await api.updateGlobalSettings({ [key]: newVal });
    } catch(e) {
      alert('Error updating settings');
      setSettings(s => ({ ...s, [key]: !newVal })); // revert
    } finally {
      setSaving(false);
    }
  };

  const updateRate = async () => {
    const parsed = parseFloat(rateInput);
    if (isNaN(parsed) || parsed <= 0) return alert('Tasa de cambio inválida');
    setSaving(true);
    try {
      await api.updateGlobalSettings({ exchangeRate: parsed });
      setSettings(s => ({ ...s, exchangeRate: parsed }));
      alert('Tasa actualizada correctamente');
    } catch (e) {
      alert('Error actualizando la tasa');
    } finally {
      setSaving(false);
    }
  };

  const C = '#11BDDB';

  return (
    <div style={{background: '#1a1a1a', padding: '24px', borderRadius: '24px', color: '#fff', border: '1px solid #333', maxWidth: '600px', margin: '0 auto'}}>
      
      {/* SECCIÓN CORREOS */}
      <h3 style={{marginTop:0, display:'flex', alignItems:'center', gap:'8px'}}><Mail size={20} color={C}/> Configuración de Correos</h3>
      <p style={{fontSize:'13px', color:'#aaa', marginBottom:'24px'}}>Activa o desactiva el envío de alertas según los destinatarios.</p>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#222', padding:'16px', borderRadius:'16px', marginBottom:'12px', border:'1px solid #444'}}>
        <div>
          <div style={{fontWeight:900, fontSize:'14px'}}>Enviar a Cliente</div>
          <div style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>Envía confirmación al cliente tras agendar la reserva.</div>
        </div>
        <button onClick={() => toggle('sendToClient')} disabled={saving} style={{background: settings.sendToClient ? '#10b981' : '#444', border:'none', borderRadius:'20px', width:'50px', height:'28px', position:'relative', cursor:'pointer', transition:'all 0.3s', opacity: saving ? 0.5 : 1}}>
          <div style={{background:'#fff', borderRadius:'50%', width:'22px', height:'22px', position:'absolute', top:'3px', left: settings.sendToClient ? '25px' : '3px', transition:'all 0.3s'}}/>
        </button>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#222', padding:'16px', borderRadius:'16px', marginBottom:'24px', border:'1px solid #444'}}>
        <div>
          <div style={{fontWeight:900, fontSize:'14px'}}>Enviar a Admin</div>
          <div style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>Envía alertas a ti (Admin) al agendar o al subir un comprobante.</div>
        </div>
        <button onClick={() => toggle('sendToAdmin')} disabled={saving} style={{background: settings.sendToAdmin ? '#10b981' : '#444', border:'none', borderRadius:'20px', width:'50px', height:'28px', position:'relative', cursor:'pointer', transition:'all 0.3s', opacity: saving ? 0.5 : 1}}>
          <div style={{background:'#fff', borderRadius:'50%', width:'22px', height:'22px', position:'absolute', top:'3px', left: settings.sendToAdmin ? '25px' : '3px', transition:'all 0.3s'}}/>
        </button>
      </div>

      <hr style={{borderColor:'#333', marginBottom:'24px'}} />

      {/* SECCIÓN MONEDA */}
      <h3 style={{marginTop:0, display:'flex', alignItems:'center', gap:'8px'}}><DollarSign size={20} color={C}/> Configuración de Moneda</h3>
      <p style={{fontSize:'13px', color:'#aaa', marginBottom:'16px'}}>Actualiza la tasa de conversión global para mostrar precios en USD a los clientes.</p>
      
      <div style={{display:'flex', alignItems:'center', gap:'12px', background:'#222', padding:'16px', borderRadius:'16px', border:'1px solid #444'}}>
        <div style={{flex: 1}}>
          <div style={{fontWeight:900, fontSize:'14px'}}>Tasa (1 EUR = X USD)</div>
          <input 
            type="number" 
            step="0.01"
            value={rateInput}
            onChange={(e) => setRateInput(e.target.value)}
            style={{background:'#111', border:'1px solid #333', color:'#fff', padding:'10px', borderRadius:'8px', width:'100%', marginTop:'8px'}}
          />
        </div>
        <button 
          onClick={updateRate} 
          disabled={saving || parseFloat(rateInput) === settings.exchangeRate}
          style={{background: C, color:'#000', border:'none', padding:'10px 16px', borderRadius:'8px', fontWeight:900, cursor:'pointer', alignSelf:'flex-end', opacity: saving ? 0.5 : 1}}
        >
          Guardar Tasa
        </button>
      </div>
      
      <div style={{marginTop:'24px', fontSize:'11px', color:'#888', fontStyle:'italic'}}>
        Nota: Esta configuración se aplica en tiempo real para todos los clientes nuevos que visiten la web.
      </div>
    </div>
  );
};
