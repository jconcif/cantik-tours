import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import { Mail, DollarSign, Check } from 'lucide-react';

const EVENTS = [
  { key: 'nueva_reserva', label: 'Registro de Nueva Reserva', defaults: { cliente: true, admin: true, notificacion: true } },
  { key: 'pago_pendiente', label: 'Pago Pendiente', defaults: { cliente: false, admin: false, notificacion: false } },
  { key: 'pago_ingresado', label: 'Pago Ingresado (Comprobante Subido)', defaults: { cliente: false, admin: true, notificacion: true } },
  { key: 'pago_validado', label: 'Pago Validado / Confirmado', defaults: { cliente: false, admin: false, notificacion: true } },
  { key: 'disponibilidad', label: 'Ratificando Disponibilidad', defaults: { cliente: false, admin: false, notificacion: false } },
  { key: 'confirmado', label: 'Tour Confirmado', defaults: { cliente: true, admin: false, notificacion: true } },
  { key: 'en_curso', label: 'Tour en Curso', defaults: { cliente: false, admin: false, notificacion: false } },
  { key: 'finalizado', label: 'Tour Finalizado', defaults: { cliente: true, admin: false, notificacion: false } },
  { key: 'pospuesto', label: 'Pospuesto / Reprogramado', defaults: { cliente: false, admin: false, notificacion: false } },
  { key: 'cancelado', label: 'Cancelado', defaults: { cliente: false, admin: false, notificacion: false } },
  { key: 'reembolsado', label: 'Reembolsado', defaults: { cliente: false, admin: false, notificacion: false } }
];

export const GlobalSettings = () => {
  const [settings, setSettings] = useState({ 
    exchangeRate: 1.08,
    notifications: {}
  });
  const [saving, setSaving] = useState(false);
  const [rateInput, setRateInput] = useState('1.08');
  
  useEffect(() => {
    api.getGlobalSettings().then(res => {
      if (res.data) {
        setSettings({
          exchangeRate: res.data.exchangeRate ?? 1.08,
          notifications: res.data.notifications ?? {}
        });
        setRateInput((res.data.exchangeRate ?? 1.08).toString());
      }
    }).catch(e => console.error(e));
  }, []);

  const handleCheckboxChange = async (eventKey, target, defaultValue) => {
    const currentNotifications = settings.notifications || {};
    const eventSettings = currentNotifications[eventKey] || { 
      cliente: defaultValue.cliente, 
      admin: defaultValue.admin, 
      notificacion: defaultValue.notificacion 
    };
    const newVal = !eventSettings[target];
    
    const updatedNotifications = {
      ...currentNotifications,
      [eventKey]: {
        ...eventSettings,
        [target]: newVal
      }
    };
    
    setSettings(s => ({ ...s, notifications: updatedNotifications }));
    setSaving(true);
    try {
      await api.updateGlobalSettings({ notifications: updatedNotifications });
    } catch (e) {
      alert('Error actualizando la configuración de notificaciones');
      // Revert on error
      setSettings(s => ({ ...s, notifications: currentNotifications }));
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
    <div style={{display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto', paddingBottom: '40px'}}>
      
      {/* SECCIÓN CONFIGURACIÓN DE CORREOS & ALERTAS */}
      <div style={{background: '#1a1a1a', padding: '24px', borderRadius: '24px', color: '#fff', border: '1px solid #333'}}>
        <h3 style={{marginTop:0, display:'flex', alignItems:'center', gap:'8px'}}><Mail size={20} color={C}/> Configuración de Correos y Alertas</h3>
        <p style={{fontSize:'13px', color:'#aaa', marginBottom:'24px'}}>Configura qué correos y notificaciones automáticas se disparan para cada acontecimiento de la reserva.</p>
        
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px'}}>
            <thead>
              <tr style={{borderBottom: '1px solid #333'}}>
                <th style={{padding: '12px 8px', fontSize: '13px', color: '#888', fontWeight: 700}}>ACONTECIMIENTO / ESTADO</th>
                <th style={{padding: '12px 8px', fontSize: '13px', color: '#888', fontWeight: 700, textAlign: 'center'}}>CLIENTE (EMAIL)</th>
                <th style={{padding: '12px 8px', fontSize: '13px', color: '#888', fontWeight: 700, textAlign: 'center'}}>ADMIN (EMAIL)</th>
                <th style={{padding: '12px 8px', fontSize: '13px', color: '#888', fontWeight: 700, textAlign: 'center'}}>NOTIFICACIÓN (PUSH POP-UP)</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((evt) => {
                const eventSettings = (settings.notifications || {})[evt.key] || evt.defaults;
                return (
                  <tr key={evt.key} style={{borderBottom: '1px solid #222', transition: 'background 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.background = '#222'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{padding: '14px 8px', fontSize: '14px', fontWeight: 600}}>{evt.label}</td>
                    
                    {/* CLIENTE */}
                    <td style={{padding: '14px 8px', textAlign: 'center'}}>
                      <label style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                        <input 
                          type="checkbox" 
                          checked={!!eventSettings.cliente} 
                          disabled={saving}
                          onChange={() => handleCheckboxChange(evt.key, 'cliente', evt.defaults)}
                          style={{
                            appearance: 'none',
                            width: '20px',
                            height: '20px',
                            border: '2px solid #555',
                            borderRadius: '4px',
                            background: eventSettings.cliente ? C : 'transparent',
                            borderColor: eventSettings.cliente ? C : '#555',
                            cursor: 'pointer',
                            display: 'inline-grid',
                            placeContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        />
                      </label>
                    </td>

                    {/* ADMIN */}
                    <td style={{padding: '14px 8px', textAlign: 'center'}}>
                      <label style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                        <input 
                          type="checkbox" 
                          checked={!!eventSettings.admin} 
                          disabled={saving}
                          onChange={() => handleCheckboxChange(evt.key, 'admin', evt.defaults)}
                          style={{
                            appearance: 'none',
                            width: '20px',
                            height: '20px',
                            border: '2px solid #555',
                            borderRadius: '4px',
                            background: eventSettings.admin ? C : 'transparent',
                            borderColor: eventSettings.admin ? C : '#555',
                            cursor: 'pointer',
                            display: 'inline-grid',
                            placeContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        />
                      </label>
                    </td>

                    {/* NOTIFICACIÓN (PUSH POP-UP) */}
                    <td style={{padding: '14px 8px', textAlign: 'center'}}>
                      <label style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                        <input 
                          type="checkbox" 
                          checked={!!eventSettings.notificacion} 
                          disabled={saving}
                          onChange={() => handleCheckboxChange(evt.key, 'notificacion', evt.defaults)}
                          style={{
                            appearance: 'none',
                            width: '20px',
                            height: '20px',
                            border: '2px solid #555',
                            borderRadius: '4px',
                            background: eventSettings.notificacion ? C : 'transparent',
                            borderColor: eventSettings.notificacion ? C : '#555',
                            cursor: 'pointer',
                            display: 'inline-grid',
                            placeContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        />
                      </label>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN MONEDA */}
      <div style={{background: '#1a1a1a', padding: '24px', borderRadius: '24px', color: '#fff', border: '1px solid #333'}}>
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
        
        <div style={{marginTop:'16px', fontSize:'11px', color:'#888', fontStyle:'italic'}}>
          Nota: Esta configuración se guarda de forma persistente y se aplica en tiempo real para todos los clientes nuevos que visiten la web.
        </div>
      </div>

    </div>
  );
};
