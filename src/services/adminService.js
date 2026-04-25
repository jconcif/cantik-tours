const BASE_URL = ''; // Relative path for local/prod compatibility

export const adminService = {
    async getBookings(token) {
        try {
            const response = await fetch(`${BASE_URL}/api/admin_get_bookings.php?token=${token}`, {
                headers: { 'Authorization': token }
            });

            const result = await response.json();
            if (result.status === 'error') throw new Error(result.message);
            return result;
        } catch (error) {
            console.error('Admin Service Error:', error);
            throw error;
        }
    }
    // We can add updateBooking, deleteBooking here later
};
