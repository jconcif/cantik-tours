/**
 * @deprecated Use src/services/api.js directly.
 * This file re-exports from the unified API client for backwards compatibility.
 */
export const reviewService = {
  submitReview: (data) => import('./api.js').then(m => m.submitReview(data)),
  getReviews:   (token) => import('./api.js').then(m => m.getReviews()),
  updateReview: (id, data) => import('./api.js').then(m => m.updateReview({ id, ...data })),
  deleteReview: (id, token) => import('./api.js').then(m => m.deleteReview(id)),
  createReview: (token, data) => import('./api.js').then(m => m.createReview(data)),
};
