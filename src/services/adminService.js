const BASE = 'https://cantiktours.com/api';

const req = async (url, opts = {}) => {
  try {
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = `${url}${separator}_cb=${Date.now()}`;
    const r = await fetch(finalUrl, { 
      headers: { 'Content-Type': 'application/json' }, 
      ...opts 
    });
    
    const text = await r.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.error("Respuesta no es JSON:", text);
      throw new Error(`Error del servidor (No JSON). Revisa la consola.`);
    }

    if (json.status === 'error') throw new Error(json.message || 'Error');
    return json;
  } catch (e) {
    console.error("Admin API Error:", e);
    throw e;
  }
};

const post = (url, body) => req(url, { method: 'POST', body: JSON.stringify(body) });

// EXPORTS
export const getBookings = (token) => req(`${BASE}/admin_get_bookings.php?token=${token}`);
export const getDrivers  = (token) => req(`${BASE}/admin_get_drivers.php?token=${token}`);
export const getReviews  = (token) => req(`${BASE}/admin_get_reviews.php?token=${token}`);
export const getCoupons  = (token) => req(`${BASE}/admin_get_coupons.php?token=${token}`);
export const getStats    = (token) => req(`${BASE}/admin_get_stats.php?token=${token}`);

export const createBooking = (t, d) => post(`${BASE}/admin_create_booking.php?token=${t}`, d);
export const createDriver  = (t, d) => post(`${BASE}/admin_create_driver.php?token=${t}`, d);
export const createReview  = (t, d) => post(`${BASE}/admin_create_review.php?token=${t}`, d);
export const createCoupon  = (t, d) => post(`${BASE}/admin_create_coupon.php?token=${t}`, d);
export const addPayment    = (t, d) => post(`${BASE}/admin_add_payment.php?token=${t}`, d);
export const getPayments   = (t, bid) => req(`${BASE}/admin_get_payments.php?token=${t}&booking_id=${bid}`);
export const updatePayment = (t, d) => post(`${BASE}/admin_update_payment.php?token=${t}`, d);
export const deletePayment = (t, id) => req(`${BASE}/admin_delete_payment.php?token=${t}&id=${id}`, { method: 'POST' });

export const getExpenses   = (t, bid) => req(`${BASE}/admin_get_expenses.php?token=${t}&booking_id=${bid}`);
export const addExpense    = (t, d) => post(`${BASE}/admin_add_expense.php?token=${t}`, d);
export const updateExpense = (t, d) => post(`${BASE}/admin_update_expense.php?token=${t}`, d);
export const deleteExpense = (t, id) => req(`${BASE}/admin_delete_expense.php?token=${t}&id=${id}`);

export const getCharges    = (t, bid) => req(`${BASE}/admin_get_charges.php?token=${t}&booking_id=${bid}`);
export const addCharge     = (t, d) => post(`${BASE}/admin_add_charge.php?token=${t}`, d);
export const deleteCharge  = (t, id) => req(`${BASE}/admin_delete_charge.php?token=${t}&id=${id}`);

export const updateBooking = (t, d) => post(`${BASE}/admin_update_booking.php?token=${t}`, d);
export const updateDriver  = (t, d) => post(`${BASE}/admin_update_driver.php?token=${t}`, d);
export const updateReview  = (t, d) => post(`${BASE}/admin_update_review.php?token=${t}`, d);
export const updateCoupon  = (t, d) => post(`${BASE}/admin_update_coupon.php?token=${t}`, d);

export const deleteBooking = (t, id) => req(`${BASE}/admin_delete_booking.php?token=${t}&id=${id}`, { method: 'POST' });
export const deleteDriver  = (t, id) => req(`${BASE}/admin_delete_driver.php?token=${t}&id=${id}`, { method: 'POST' });
export const deleteReview  = (t, id) => req(`${BASE}/admin_delete_review.php?token=${t}&id=${id}`, { method: 'POST' });
export const deleteCoupon  = (t, id) => req(`${BASE}/admin_delete_coupon.php?token=${t}&id=${id}`, { method: 'POST' });
