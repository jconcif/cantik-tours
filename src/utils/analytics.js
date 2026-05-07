import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-HSVS7RPZP7"; // Bali Tours Flow

/**
 * Initializes Google Analytics 4
 * Only initializes if not on localhost and measurement ID is present
 */
export const initGA = () => {
    // Check if we are on localhost
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (!isLocalhost) {
        ReactGA.initialize(MEASUREMENT_ID);
        console.log("GA4 & Google Tag Initialized");
    } else {
        console.log("GA4 Skipped (Localhost)");
    }
};

/**
 * Tracks a page view
 * @param {string} path - The path to track
 */
export const trackPageView = (path) => {
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (!isLocalhost) {
        ReactGA.send({ hitType: "pageview", page: path });
    }
};

/**
 * Tracks a custom event
 * @param {string} category - The event category (e.g., 'Conversion')
 * @param {string} action - The action (e.g., 'WhatsApp Click')
 * @param {string} label - Optional label
 */
export const trackEvent = (category, action, label) => {
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (!isLocalhost) {
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
