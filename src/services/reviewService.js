const BASE_URL = 'https://cantiktours.com';

export const reviewService = {
    async submitReview(data) {
        try {
            const response = await fetch(`${BASE_URL}/api/save_review.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return result;
        } catch (error) {
            console.error('Review Service Error:', error);
            throw error;
        }
    },

    async getReviews(token) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_get_reviews.php?token=${token}`, {
                headers: { 'Authorization': token }
            });

            const result = await response.json();
            if (result.row) return result.row; // For details
            if (result.status === 'error') throw new Error(result.message);
            return result.data || result;
        } catch (error) {
            console.error('Review Service Error:', error);
            throw error;
        }
    },

    async updateReview(id, data) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_update_review.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data })
            });

            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return true;
        } catch (error) {
            console.error('Review Service Error:', error);
            throw error;
        }
    },

    async deleteReview(id, token) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_delete_review.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, token })
            });

            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return true;
        } catch (error) {
            console.error('Review Service Error:', error);
            throw error;
        }
    },

    async createReview(token) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_create_review.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return result;
        } catch (error) {
            console.error('Review Service Error:', error);
            throw error;
        }
    }
};
