export const formatDateAgo = (dateString) => {
    if (!dateString) return '';

    // Check if the dateString is already a "Hace..." string to support legacy/static text
    if (dateString.toString().toLowerCase().startsWith('hace')) {
        return dateString;
    }

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid format
    }

    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';

    if (diffDays < 7) {
        return `Hace ${diffDays} días`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `Hace ${years} año${years > 1 ? 's' : ''}`;
    }
};
