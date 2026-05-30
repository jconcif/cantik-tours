import { Resend } from 'resend';
import dotenv from 'dotenv';
import { emailSettings } from './settings.js';

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Helper to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price).replace('EUR', '€');
};

/**
 * Send Booking Confirmation Email to the Client
 */
export const sendClientConfirmation = async (booking) => {
  if (!emailSettings.sendOnBooking) {
    console.log(`⚠️ Client confirmation email disabled in settings for reference ${booking.reference || booking.id}`);
    return { status: 'disabled_in_settings' };
  }

  const emailTo = booking.extras?.client_email || booking.client_email;
  if (!emailTo) {
    console.warn('⚠️ Cannot send client confirmation: client_email is missing.');
    return;
  }

  const referenceCode = `CT-${(booking.reference || String(booking.id)).replace('CT-', '')}`;
  const frontendUrl = process.env.FRONTEND_URL || 'https://cantiktours.com';
  const bookingLink = `${frontendUrl}/booking?ref=${referenceCode}`;

  const fromName = 'Cantik Tours';
  const fromEmail = process.env.SMTP_USER || 'reservas@cantiktours.com';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Reserva - Cantik Tours</title>
        <style>
          body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #F6F8F8;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid #eef2f2;
          }
          .header {
            background-color: #0B0F19;
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          .logo {
            font-size: 22px;
            letter-spacing: 2px;
            color: #ffffff;
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .logo span {
            font-weight: 300;
            letter-spacing: 4px;
            color: #13C8EC;
          }
          .subtitle {
            font-size: 10px;
            font-weight: 800;
            color: #13C8EC;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-top: 10px;
          }
          .content {
            padding: 40px 30px;
          }
          h1 {
            font-size: 20px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 0;
            color: #0B0F19;
          }
          p {
            font-size: 14px;
            line-height: 1.6;
            color: #555555;
          }
          .ticket-card {
            background-color: #F6F8F8;
            border-radius: 16px;
            padding: 24px;
            margin: 30px 0;
            border: 1px solid #eef2f2;
          }
          .ticket-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 13px;
          }
          .ticket-row:last-child {
            margin-bottom: 0;
            padding-top: 12px;
            border-top: 1px dashed #d1d5db;
          }
          .label {
            font-size: 10px;
            font-weight: 800;
            color: #777777;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .value {
            font-weight: 800;
            color: #0B0F19;
          }
          .value-primary {
            font-weight: 900;
            color: #00A8C5;
          }
          .btn-container {
            text-align: center;
            margin: 30px 0 10px 0;
          }
          .btn {
            display: inline-block;
            background-color: #13C8EC;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 36px;
            font-size: 12px;
            font-weight: 900;
            border-radius: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 8px 20px rgba(19,200,236,0.25);
            transition: all 0.3s ease;
          }
          .footer {
            background-color: #0B0F19;
            padding: 30px;
            text-align: center;
            font-size: 11px;
            color: #777777;
            border-top: 1px solid #1a2629;
          }
          .footer a {
            color: #13C8EC;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">CANTIK <span>TOURS</span></div>
            <div class="subtitle">¡Comienza tu aventura en Bali! 🌴</div>
          </div>
          <div class="content">
            <h1>¡Tu Experiencia está Confirmada!</h1>
            <p>Hola <strong>${booking.client_name}</strong>,</p>
            <p>¡Qué alegría que nos elijas para guiarte en esta aventura! Hemos recibido y registrado con éxito tu reserva. A continuación tienes todos los detalles importantes:</p>
            
            <div class="ticket-card">
              <div class="ticket-row">
                <span class="label">Código de Reserva</span>
                <span class="value" style="font-family: monospace; font-size: 15px; color: #13C8EC;">${referenceCode}</span>
              </div>
              <div class="ticket-row">
                <span class="label">Experiencia</span>
                <span class="value">${booking.tour_title}</span>
              </div>
              <div class="ticket-row">
                <span class="label">Plan / Servicio</span>
                <span class="value" style="text-transform: uppercase;">${booking.experience}</span>
              </div>
              <div class="ticket-row">
                <span class="label">Fecha del Tour</span>
                <span class="value">${booking.booking_date}</span>
              </div>
              <div class="ticket-row">
                <span class="label">Pasajeros</span>
                <span class="value">${booking.pax} PAX</span>
              </div>
              <div class="ticket-row">
                <span class="label">Total</span>
                <span class="value-primary">${formatPrice(booking.total_price)}</span>
              </div>
            </div>

            <p>Para ver tu itinerario detallado, subir tu comprobante de pago o completar el registro de viajeros (check-in), haz clic en el siguiente enlace de acceso personalizado:</p>
            
            <div class="btn-container">
              <a href="${bookingLink}" class="btn">Acceder a Mi Reserva</a>
            </div>

            <p style="font-size: 12px; color: #777777; margin-top: 25px;">
              Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
              <a href="${bookingLink}" style="color: #00A8C5; word-break: break-all;">${bookingLink}</a>
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0; color: #9CA3AF;">© ${new Date().getFullYear()} Cantik Tours. Todos los derechos reservados.</p>
            <p style="margin: 5px 0 0 0; color: #6B7280;">¿Tienes dudas? Contáctanos a <a href="mailto:info@cantiktours.com">info@cantiktours.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: emailTo,
    subject: `Confirmación de Reserva ${referenceCode} - Cantik Tours 🌴`,
    html
  };

  try {
    if (!resend) {
      console.log('✉️ [Mock Client Email Sent] (No RESEND_API_KEY)');
      return;
    }
    const { data, error } = await resend.emails.send(mailOptions);
    if (error) throw error;
    console.log(`✅ Client confirmation email sent for reference ${referenceCode}. Resend ID: ${data?.id}`);
    return data;
  } catch (err) {
    console.error('❌ Error sending client confirmation email:', err);
    throw err;
  }
};

/**
 * Send Booking Alert Email to Admin
 */
export const sendAdminAlert = async (booking) => {
  if (!emailSettings.sendOnBooking) {
    console.log(`⚠️ Admin alert email disabled in settings for reference ${booking.reference || booking.id}`);
    return { status: 'disabled_in_settings' };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn('⚠️ Cannot send admin alert: ADMIN_EMAIL is not configured in environment variables.');
    return;
  }

  const referenceCode = `CT-${(booking.reference || String(booking.id)).replace('CT-', '')}`;
  const frontendUrl = process.env.FRONTEND_URL || 'https://cantiktours.com';
  const adminGeneralLink = `${frontendUrl}/admin`;

  const fromName = 'Cantik Tours Alerts';
  const fromEmail = process.env.SMTP_USER || 'alertas@cantiktours.com';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NUEVA RESERVA INGRESADA</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background-color: #0B0F19; padding: 30px; text-align: center; }
          .logo { font-size: 22px; letter-spacing: 2px; color: #ffffff; font-weight: 900; text-transform: uppercase; }
          .logo span { font-weight: 300; letter-spacing: 4px; color: #13C8EC; }
          .subtitle { font-size: 10px; font-weight: 800; color: #13C8EC; text-transform: uppercase; letter-spacing: 3px; margin-top: 8px; }
          .content { padding: 30px; }
          .alert-banner { background-color: #13C8EC; color: #ffffff; font-weight: bold; padding: 12px; border-radius: 6px; font-size: 14px; margin-bottom: 25px; text-align: center; letter-spacing: 1px; }
          h2 { color: #111827; margin-top: 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 10px 0; font-size: 14px; border-bottom: 1px solid #f3f4f6; }
          td.label { color: #6b7280; font-weight: 600; width: 150px; }
          td.value { color: #111827; font-weight: 500; }
          .btn { display: inline-block; background-color: #111827; color: #ffffff !important; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 5px; }
          .btn-outline { display: inline-block; background-color: #f3f4f6; color: #111827 !important; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 5px; border: 1px solid #d1d5db; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">CANTIK <span>TOURS</span></div>
            <div class="subtitle">Admin Alerts</div>
          </div>
          <div class="content">
            <div class="alert-banner">NUEVA RESERVA RECIBIDA</div>
            <h2>Detalles de la Reserva (${referenceCode})</h2>
            <table>
              <tr><td class="label">Referencia:</td><td class="value"><strong>${referenceCode}</strong></td></tr>
              <tr><td class="label">Cliente:</td><td class="value">${booking.client_name}</td></tr>
              <tr><td class="label">Email Cliente:</td><td class="value">${booking.extras?.client_email || booking.client_email || 'No provisto'}</td></tr>
              <tr><td class="label">Teléfono:</td><td class="value">${booking.client_phone || 'No provisto'}</td></tr>
              <tr><td class="label">Experiencia:</td><td class="value">${booking.tour_title}</td></tr>
              <tr><td class="label">Fecha del Tour:</td><td class="value">${booking.booking_date}</td></tr>
              <tr><td class="label">Pasajeros:</td><td class="value">${booking.pax} PAX</td></tr>
              <tr><td class="label">Hotel Recogida:</td><td class="value">${booking.hotel || 'No provisto'}</td></tr>
              <tr><td class="label">Plan / Servicio:</td><td class="value" style="text-transform: uppercase;">${booking.experience}</td></tr>
              <tr><td class="label">Precio Total:</td><td class="value" style="color:#00A8C5; font-weight:bold; font-size:16px;">${formatPrice(booking.total_price)}</td></tr>
            </table>
            <div style="text-align: center; margin-top: 25px;">
              <a href="${adminGeneralLink}" class="btn-outline">Abrir Cantik Admin</a>
              <a href="${adminBookingLink}" class="btn">Abrir Reserva CT</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: adminEmail.split(',').map(e => e.trim()),
    subject: `NUEVA RESERVA: ${booking.client_name} - ${referenceCode}`,
    html
  };

  try {
    if (!resend) {
      console.log('✉️ [Mock Admin Email Sent] (No RESEND_API_KEY)');
      return;
    }
    const { data, error } = await resend.emails.send(mailOptions);
    if (error) throw error;
    console.log(`✅ Admin alert email sent for reference ${referenceCode}. Resend ID: ${data?.id}`);
    return data;
  } catch (err) {
    console.error('❌ Error sending admin alert email:', err);
    throw err;
  }
};

/**
 * Send Alert to Admin when a payment receipt is uploaded
 */
export const sendReceiptUploadedAlert = async (booking, receiptRelativeUrl) => {
  if (!emailSettings.sendOnPayment) {
    console.log(`⚠️ Receipt alert email disabled in settings for reference ${booking.reference || booking.id}`);
    return { status: 'disabled_in_settings' };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn('⚠️ Cannot send receipt upload alert: ADMIN_EMAIL is not configured.');
    return;
  }

  const referenceCode = `CT-${(booking.reference || String(booking.id)).replace('CT-', '')}`;
  const serverUrl = process.env.API_URL || 'http://localhost:3001';
  const receiptFullUrl = receiptRelativeUrl.startsWith('data:') ? receiptRelativeUrl : `${serverUrl}${receiptRelativeUrl}`;
  const frontendUrl = process.env.FRONTEND_URL || 'https://cantiktours.com';
  const adminGeneralLink = `${frontendUrl}/admin`;
  const adminBookingLink = `${frontendUrl}/booking?ref=${referenceCode}`;

  const fromName = 'Cantik Tours Alerts';
  const fromEmail = process.env.SMTP_USER || 'alertas@cantiktours.com';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NUEVO COMPROBANTE SUBIDO</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background-color: #0B0F19; padding: 30px; text-align: center; }
          .logo { font-size: 22px; letter-spacing: 2px; color: #ffffff; font-weight: 900; text-transform: uppercase; }
          .logo span { font-weight: 300; letter-spacing: 4px; color: #13C8EC; }
          .subtitle { font-size: 10px; font-weight: 800; color: #13C8EC; text-transform: uppercase; letter-spacing: 3px; margin-top: 8px; }
          .content { padding: 30px; }
          .alert-banner { background-color: #10B981; color: #ffffff; font-weight: bold; padding: 12px; border-radius: 6px; font-size: 14px; margin-bottom: 25px; text-align: center; letter-spacing: 1px; }
          h2 { color: #111827; margin-top: 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
          ul { padding-left: 20px; margin: 15px 0 25px 0; color: #4b5563; }
          li { margin-bottom: 8px; font-size: 14px; }
          .btn-primary { display: inline-block; background-color: #10B981; color: #ffffff !important; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 5px; }
          .btn-secondary { display: inline-block; background-color: #111827; color: #ffffff !important; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 5px; }
          .btn-outline { display: inline-block; background-color: #f3f4f6; color: #111827 !important; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 5px; border: 1px solid #d1d5db; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">CANTIK <span>TOURS</span></div>
            <div class="subtitle">Admin Alerts</div>
          </div>
          <div class="content">
            <div class="alert-banner">NUEVO COMPROBANTE DE PAGO</div>
            <h2>Reserva: ${booking.client_name} (${referenceCode})</h2>
            <p style="font-size:14px; line-height:1.6;">El cliente ha subido un nuevo comprobante de pago a través de la web. Revisa el archivo para verificar el pago y actualizar el estado de la reserva.</p>
            <ul>
              <li><strong>Fecha del Tour:</strong> ${booking.booking_date}</li>
              <li><strong>Total a Pagar:</strong> ${formatPrice(booking.total_price)}</li>
              <li><strong>Plan Elegido:</strong> <span style="text-transform:uppercase;">${booking.experience}</span></li>
            </ul>
            
            <div style="text-align: center; margin: 25px 0; background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px dashed #d1d5db;">
              <img src="${receiptFullUrl}" alt="Comprobante de Pago" style="max-width: 100%; border-radius: 8px; max-height: 500px; object-fit: contain;" />
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${adminGeneralLink}" class="btn-outline">Abrir Cantik Admin</a>
              <a href="${adminBookingLink}" class="btn-secondary">Abrir Reserva CT</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: adminEmail.split(',').map(e => e.trim()),
    subject: `COMPROBANTE SUBIDO: ${booking.client_name} - ${referenceCode}`,
    html
  };

  try {
    if (!resend) {
      console.log('✉️ [Mock Admin Receipt Email Sent] (No RESEND_API_KEY)');
      return;
    }
    const { data, error } = await resend.emails.send(mailOptions);
    if (error) throw error;
    console.log(`✅ Admin receipt alert email sent for reference ${referenceCode}. Resend ID: ${data?.id}`);
    return data;
  } catch (err) {
    console.error('❌ Error sending admin receipt alert email:', err);
    throw err;
  }
};

