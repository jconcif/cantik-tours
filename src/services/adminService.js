/**
 * @deprecated Use src/services/api.js directly.
 * This file re-exports from the unified API client for backwards compatibility.
 */
export {
  getBookings, createBooking, updateBooking, deleteBooking,
  getDrivers,  createDriver,  updateDriver,  deleteDriver,
  getReviews,  createReview,  updateReview,  deleteReview,
  getCoupons,  createCoupon,  updateCoupon,  deleteCoupon,
  getPayments, addPayment,    updatePayment, deletePayment,
  getExpenses, addExpense,    updateExpense, deleteExpense,
  getCharges,  addCharge,     deleteCharge,
  getStats,
} from './api.js';
