import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-HSVS7RPZP7"; // Bali Tours Flow

/**
 * Initializes Google Analytics 4
 * Only initializes if not on localhost and measurement ID is present
 */
export const initGA = () => {
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
    
    // Check if the user is an admin (has a token or is on admin path)
    const isAdmin = localStorage.getItem('ctk_jwt') || window.location.pathname.includes('admin');

    if (!isLocalhost && !isAdmin) {
        ReactGA.initialize(MEASUREMENT_ID);
        console.log("GA4 Initialized (Customer View)");
    } else {
        console.log("GA4 Skipped (Admin or Localhost)");
    }
};

export const trackPageView = (path) => {
    const isAdmin = localStorage.getItem('ctk_jwt') || path.includes('admin');
    if (window.location.hostname !== "localhost" && !isAdmin) {
        ReactGA.send({ hitType: "pageview", page: path });
    }
};

export const trackEvent = (category, action, label) => {
    const isAdmin = localStorage.getItem('ctk_jwt') || window.location.pathname.includes('admin');
    if (window.location.hostname !== "localhost" && !isAdmin) {
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    }
};

/**
 * Tracks WhatsApp lead generation specifically formatted for Google Ads/Analytics
 * @param {string} label - Optional label (e.g., Tour Name)
 * @param {number} value - Optional value of the conversion
 */
export const trackLeadWhatsapp = (label = 'Tour Bali 2026', value = 1.0) => {
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (!isLocalhost) {
        if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
            window.gtag('event', 'generar_lead_whatsapp', {
                'event_category': 'contacto',
                'event_label': label,
                'value': value
            });
        } else {
            ReactGA.event({
                category: "contacto",
                action: "generar_lead_whatsapp",
                label: label,
                value: value
            });
        }
    }
};
