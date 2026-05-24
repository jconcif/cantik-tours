import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-HSVS7RPZP7"; // Bali Tours Flow

// Función para verificar si la sesión debe ser rastreada
const shouldSkipAnalytics = () => {
    // Si entran al admin una vez, ignoramos este navegador para siempre
    if (typeof window !== "undefined" && window.location.pathname.includes('admin')) {
        localStorage.setItem('ignore_analytics', 'true');
    }
    
    const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const isIgnored = typeof localStorage !== "undefined" && localStorage.getItem('ignore_analytics') === 'true';
    
    return isLocalhost || isIgnored;
};

export const initGA = () => {
    if (!shouldSkipAnalytics()) {
        ReactGA.initialize(MEASUREMENT_ID);
        console.log("GA4 Initialized (Customer View)");
    } else {
        console.log("GA4 Skipped (Admin or Localhost - Ignored)");
    }
};

export const trackPageView = (path) => {
    if (!shouldSkipAnalytics()) {
        ReactGA.send({ hitType: "pageview", page: path });
    }
};

export const trackEvent = (category, action, label) => {
    if (!shouldSkipAnalytics()) {
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    }
};

export const trackLeadWhatsapp = (label = 'Tour Bali 2026', value = 1.0) => {
    if (!shouldSkipAnalytics()) {
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
