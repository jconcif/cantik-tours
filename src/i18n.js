import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: {
                translation: {
                    nav: {
                        home: "Inicio",
                        tours: "Tours",
                        guide: "Guía Bali 2026",
                        contact: "Hablar con Perty",
                        about: "Nosotros"
                    },
                    hero: {
                        badge: "Experiencias Premium en Indonesia",
                        title_1: "Bali no se visita,",
                        title_2: "se vive.",
                        subtitle: "Descubre el alma de la isla con guías locales expertos y asistencia 100% personalizada.",
                        btn_tours: "Ver Experiencias",
                        btn_story: "Nuestra Historia",
                        trust_1: "Guías 100% en Español",
                        trust_2: "Pago Flexible en Destino",
                        trust_3: "Transporte Privado Premium"
                    },
                    tours: {
                        title: "Nuestros",
                        title_accent: "Tours.",
                        subtitle: "Todas nuestras rutas son privadas y 100% flexibles. Dinos qué te interesa y nosotros lo haremos realidad.",
                        search_placeholder: "Buscar aventura (ej. Ubud, cascadas...)",
                        from: "Desde",
                        per_car: "/coche",
                        no_matches: "No hay coincidencias",
                        see_all: "Ver todos los tours",
                        badge_popular: "Más Popular",
                        badge_recommended: "Recomendado",
                        badge_must: "Imprescindible",
                        categories: {
                            todos: "Todos",
                            cultura: "Cultura",
                            cascadas: "Cascadas",
                            fotografia: "Fotografía",
                            playas: "Playas",
                            aventura: "Aventura"
                        }
                    },
                    cta: {
                        title: "¿Listo para vivir Bali como un local?",
                        subtitle: "Reserva hoy y vive el Bali que siempre soñaste con guías expertos.",
                        btn_availability: "Ver Todos los Tours",
                        btn_whatsapp: "WhatsApp directo"
                    },
                    detail: {
                        itinerary: "Itinerario",
                        included: "Incluido",
                        not_included: "No incluido",
                        reviews: "Reseñas",
                        book_now: "Reservar Ahora",
                        share: "Compartir",
                        duration: "Duración",
                        private: "Privado",
                        private_label: "Tour Exclusivo",
                        rating: "Valoración",
                        availability: "Disponibilidad",
                        availability_label: "Todo el año",
                        price_special: "Precio Especial",
                        per_person: "/ persona"
                    },
                    guide: {
                        badge: "Imprescindible para tu viaje",
                        title: "Guía Bali",
                        title_accent: "2026.",
                        subtitle: "Todo lo que necesitas saber antes de aterrizar en la Isla de los Dioses.",
                        help_title: "¿Aún tienes dudas?",
                        help_text: "Como locales, conocemos todos los secretos de la isla. Escríbenos por WhatsApp y te ayudaremos a planificar tu viaje sin compromiso.",
                        help_btn: "Preguntar a Perty"
                    },
                    why: {
                        title: "¿Por qué Cantik Tours?",
                        subtitle: "No somos una agencia masiva. Somos locales especializados en crear recuerdos que duran toda la vida.",
                        reason1: { title: "Expertos en Cultura Local", text: "No solo te llevamos, te sumergimos. Todo nuestro equipo comparte la misma pasión por explicarte el 'por qué' de cada tradición, templo y paisaje." },
                        reason2: { title: "Confort sin Compromisos", text: "Vehículos premium, climatizados y con todas las facilidades para que Bali sea un placer de principio a fin." },
                        reason3: { title: "Confianza de Amigos", text: "Sin letras pequeñas. Reserva con un pequeño depósito y paga el resto al finalizar. Tu satisfacción es nuestra prioridad." }
                    },
                    features: {
                        title: "Detalles que marcan la",
                        title_accent: "diferencia",
                        subtitle: "No solo nos importa a dónde vas, sino cómo te sientes en cada kilómetro del trayecto.",
                        wifi: { title: "WiFi a Bordo*", text: "Comparte tus momentos al instante mientras recorres la isla." },
                        water: { title: "Hidratación Premium", text: "Agua fría siempre disponible para combatir el sol tropical de Bali." },
                        car: { title: "Libertad en Movimiento", text: "Coches espaciosos y limpios. Tú decides cuándo parar y cuándo seguir." },
                        food: { title: "Gastronomía Real", text: "Te llevamos a los rincones donde los locales realmente disfrutamos comer." }
                    },
                    about: {
                        tag: "Nuestra Esencia",
                        title: "Viaja a tu ritmo",
                        meaning_title: "¿Qué significa Cantik?",
                        meaning_text: "En indonesio, Cantik (pronunciado Chantik) significa hermoso. Pero para nosotros, la belleza de Bali no está solo en sus postales. Está en la devoción de una ofrenda matutina, en la sonrisa de un agricultor y en la paz que sientes al comprender nuestra cultura. Queremos que cada momento de tu viaje sea, simplemente, Cantik.",
                        team_intro_title: "El Equipo",
                        team_intro_text: "Sin prisas, con seguridad y en tu idioma.",
                        perty_title: "Perty (El Alma Local)",
                        perty_text: "Indonesia de raíces balinesas y profesora de lengua indonesia. Con un Máster en Educación y años recorriendo la isla como guía, Perty no solo te muestra el camino; es tu ventana real a los templos, rutas escondidas y rituales que otros solo ven de lejos.",
                        javi_title: "Javi (Tu Garantía y Logística)",
                        javi_text: "Chileno-español y viajero por naturaleza. Mi misión es ser tu puente en Bali. Coordino cada detalle: desde itinerarios a medida hasta tus consultas diarias, asegurando una comunicación fluida en español. Estoy aquí para que tú solo disfrutes, sabiendo que la logística está bajo control.",
                        promise_title: "Nuestra Promesa",
                        promise_text: "No vendemos transporte, compartimos nuestro hogar. Para asegurar que siempre tengas la mejor experiencia, contamos con una red de conductores locales de total confianza, seleccionados personalmente por nosotros bajo los mismos estándares de calidez y seguridad que nos definen.",
                        closing: "Con Cantik Tours, tu viaje no es solo una visita; es una inmersión real en Bali, diseñada para que cada instante sea, de verdad, Cantik.",
                        meet_team_title: "Nuestros Guías Expertos",
                        meet_team_subtitle: "Contamos con ellos por su conocimiento, calidez y compromiso.",
                        join_team_title: "¿Eres guía en Bali?",
                        join_team_text: "Creemos en el trabajo colaborativo. Buscamos personas apasionadas por compartir su cultura. ¡Escríbenos!",
                        guide_1_name: "Wayan",
                        guide_1_role: "Guardián de Templos",
                        guide_1_desc: "Experto en historia y arquitectura balinesa. 10 años compartiendo secretos ancestrales.",
                        guide_2_name: "Made",
                        guide_2_role: "Aventurero Innato",
                        guide_2_desc: "Especialista en trekkings y cascadas ocultas. Su energía es contagiosa.",
                        guide_3_name: "Komang",
                        guide_3_role: "Sonrisa de Bali",
                        guide_3_desc: "Especialista en cultura local y gastronomía. Te hará sentir parte de su familia."
                    },
                    footer: {
                        description: "Tu agencia de confianza en Bali. Experiencias privadas, auténticas y acompañamiento local.",
                        quick_links: "Enlaces rápidos",
                        contact: "Contacto",
                        rights: "Todos los derechos reservados.",
                        trust_1: "Pago Seguro en Destino",
                        trust_2: "Guías Locales Verificados",
                        made_with: "Hecho con",
                        in_bali: "en Bali"
                    },
                    common: {
                        loading: "Cargando...",
                        back: "Volver",
                        more_info: "Más información",
                        copied: "¡Enlace copiado!",
                        error: "Algo salió mal",
                        whatsapp_tooltip: "¡Hola! Soy Perty. ¿Hablamos?"
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        home: "Home",
                        tours: "Tours",
                        guide: "Bali Guide 2026",
                        contact: "Talk to Perty",
                        about: "About Us"
                    },
                    hero: {
                        badge: "Premium Experiences in Indonesia",
                        title_1: "Bali isn't visited,",
                        title_2: "it's lived.",
                        subtitle: "Discover the island's soul with expert local guides and 100% personalized assistance.",
                        btn_tours: "See Experiences",
                        btn_story: "Our Story",
                        trust_1: "100% Spanish Speaking Guides",
                        trust_2: "Flexible Payment on Arrival",
                        trust_3: "Premium Private Transport"
                    },
                    tours: {
                        title: "Our",
                        title_accent: "Tours.",
                        subtitle: "All our routes are private and 100% customizable. Tell us what you are interested in and we will make it happen.",
                        search_placeholder: "Search adventure (eg. Ubud, waterfalls...)",
                        from: "From",
                        per_car: "/car",
                        no_matches: "No matches found",
                        see_all: "See all tours",
                        badge_popular: "Most Popular",
                        badge_recommended: "Recommended",
                        badge_must: "Must See",
                        categories: {
                            todos: "All",
                            cultura: "Culture",
                            cascadas: "Waterfalls",
                            fotografia: "Photography",
                            playas: "Beaches",
                            aventura: "Adventure"
                        }
                    },
                    cta: {
                        title: "Ready to live Bali like a local?",
                        subtitle: "Book today and experience the Bali you've always dreamed of with expert guides.",
                        btn_availability: "See All Tours",
                        btn_whatsapp: "Direct WhatsApp"
                    },
                    detail: {
                        itinerary: "Itinerary",
                        included: "Included",
                        not_included: "Not included",
                        reviews: "Reviews",
                        book_now: "Book Now",
                        share: "Share",
                        duration: "Duration",
                        private: "Private",
                        private_label: "Exclusive Tour",
                        rating: "Rating",
                        availability: "Availability",
                        availability_label: "Year-round",
                        price_special: "Special Price",
                        per_person: "/ person"
                    },
                    guide: {
                        badge: "Essential for your trip",
                        title: "Bali Guide",
                        title_accent: "2026.",
                        subtitle: "Everything you need to know before landing on the Island of the Gods.",
                        help_title: "Still have questions?",
                        help_text: "As locals, we know all the island's secrets. Write to us on WhatsApp and we will help you plan your trip with no strings attached.",
                        help_btn: "Ask Perty"
                    },
                    why: {
                        title: "Why Cantik Tours?",
                        subtitle: "We are not a mass-market agency. We are locals specialized in creating memories that last a lifetime.",
                        reason1: { title: "Local Culture Experts", text: "We don't just take you there, we immerse you. Our entire team shares the same passion for explaining the 'why' of every tradition, temple, and landscape." },
                        reason2: { title: "Uncompromising Comfort", text: "Premium, air-conditioned vehicles with all the facilities to make Bali a pleasure from start to finish." },
                        reason3: { title: "Friends' Trust", text: "No fine print. Book with a small deposit and pay the rest at the end. Your satisfaction is our priority." }
                    },
                    features: {
                        title: "Details that make a",
                        title_accent: "difference",
                        subtitle: "We don't just care about where you go, but how you feel at every mile along the way.",
                        wifi: { title: "On-board WiFi*", text: "Share your moments instantly as you travel across the island." },
                        water: { title: "Premium Hydration", text: "Always cold water available to beat Bali's tropical sun." },
                        car: { title: "Freedom in Motion", text: "Spacious and clean cars. You decide when to stop and when to keep moving." },
                        food: { title: "Real Gastronomy", text: "We take you to the hidden gems where locals actually enjoy eating." }
                    },
                    about: {
                        tag: "Our Essence",
                        title: "Travel at your own pace",
                        meaning_title: "What does Cantik mean?",
                        meaning_text: "In Indonesian, Cantik (pronounced Chantik) means beautiful. But for us, the beauty of Bali is not just in its postcards. It is in the devotion of a morning offering, in the smile of a farmer, and in the peace you feel when understanding our culture. We want every moment of your trip to be, simply, Cantik.",
                        team_intro_title: "The Team",
                        team_intro_text: "No rush, safely, and in your language.",
                        perty_title: "Perty (The Local Soul)",
                        perty_text: "Indonesian with Balinese roots and a teacher of the Indonesian language. With a Master's in Education and years traveling the island as a guide, Perty doesn't just show you the way; she is your real window to the temples, hidden routes, and rituals that others only see from afar.",
                        javi_title: "Javi (Your Guarantee & Logistics)",
                        javi_text: "Chilean-Spanish and traveler by nature. My mission is to be your bridge in Bali. I coordinate every detail: from custom itineraries to your daily queries, ensuring fluid communication in Spanish. I am here so you can just enjoy, knowing the logistics are under control.",
                        promise_title: "Our Promise",
                        promise_text: "We don't sell transport, we share our home. To ensure you always have the best experience, we have a network of fully trusted local drivers, personally selected by us under the same standards of warmth and safety that define us.",
                        closing: "With Cantik Tours, your trip is not just a visit; it is a real immersion in Bali, designed so that every instant is, truly, Cantik.",
                        meet_team_title: "Our Expert Guides",
                        meet_team_subtitle: "We count on them for their knowledge, warmth, and commitment.",
                        join_team_title: "Are you a guide in Bali?",
                        join_team_text: "We believe in collaborative work. We are looking for people passionate about sharing their culture. Write to us!",
                        guide_1_name: "Wayan",
                        guide_1_role: "Temple Guardian",
                        guide_1_desc: "Expert in Balinese history and architecture. 10 years sharing ancestral secrets.",
                        guide_2_name: "Made",
                        guide_2_role: "Natural Adventurer",
                        guide_2_desc: "Specialist in trekking and hidden waterfalls. His energy is contagious.",
                        guide_3_name: "Komang",
                        guide_3_role: "Bali's Smile",
                        guide_3_desc: "Specialist in local culture and gastronomy. He will make you feel part of his family."
                    },
                    footer: {
                        description: "Your trusted agency in Bali. Private, authentic experiences with local accompaniment.",
                        quick_links: "Quick Links",
                        contact: "Contact",
                        rights: "All rights reserved.",
                        trust_1: "Secure Payment on Arrival",
                        trust_2: "Verified Local Guides",
                        made_with: "Made with",
                        in_bali: "from Bali"
                    },
                    common: {
                        loading: "Loading...",
                        back: "Back",
                        more_info: "More info",
                        copied: "Link copied!",
                        error: "Something went wrong",
                        whatsapp_tooltip: "Hi! I'm Perty. Shall we talk?"
                    }
                }
            }
        }
    });

export default i18n;
