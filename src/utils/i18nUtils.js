export const getLocalized = (obj, field, lang) => {
    if (!obj) return "";
    const currentLang = lang.split('-')[0]; // handle cases like 'en-US'
    if (currentLang === 'es') return obj[field] || "";
    const localizedField = `${field}_${currentLang}`;
    return obj[localizedField] || obj[field] || "";
};
