import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-HSVS7RPZP7";

/**
 * Initializes Google Analytics 4
 * Only initializes if not on localhost and measurement ID is present
 */
export const initGA = () => {
    // Check if we are on localhost
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (!isLocalhost) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        console.log("GA4 Initialized");
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
