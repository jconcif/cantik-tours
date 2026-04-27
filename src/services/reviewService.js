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
            const response = await fetch(`${BASE_URL}/api/admin_get_reviews.php?token=${token}`);
            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);
        } catch (error) {
            console.error('Review Service (Get) Error:', error);
            throw error;
        }
    },

    async updateReview(id, data) {
        // data ya contiene el token dentro
        const token = data.token;
        try {
            const response = await fetch(`${BASE_URL}/api/admin_update_review.php?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data })
            });
            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return result;
        } catch (error) {
            console.error('Review Service (Update) Error:', error);
            throw error;
        }
    },

    async deleteReview(id, token) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_delete_review.php?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return result;
        } catch (error) {
            console.error('Review Service (Delete) Error:', error);
            throw error;
        }
    },

    async createReview(token, reviewData) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_create_review.php?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return result;
        } catch (error) {
            console.error('Review Service (Create) Error:', error);
            throw error;
        }
    }
};
