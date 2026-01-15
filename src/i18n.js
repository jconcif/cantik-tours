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
                        contact: "Hablar con Perty"
                    },
                    hero: {
                        badge: "Experiencias Premium en Indonesia",
                        title_1: "Bali no se visita,",
                        title_2: "se vive.",
                        subtitle: "Descubre el alma de la isla con guías locales expertos y asistencia 100% personalizada.",
                        btn_tours: "Ver Experiencias",
                        btn_story: "Nuestra Historia"
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
                        title_1: "¿Listo para",
                        title_2: "tu aventura?",
                        subtitle: "Reserva hoy y vive el Bali que siempre soñaste.",
                        btn: "Ver Experiencias"
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
                        reason1: { title: "La Sabiduría de una Maestra", text: "Nuestros guías no solo conducen; te enseñan. Con la paciencia y el conocimiento de Perty, cada parada tiene un 'por qué' cultural." },
                        reason2: { title: "Confort sin Compromisos", text: "Vehículos premium, climatizados y con todas las facilidades para que Bali sea un placer de principio a fin." },
                        reason3: { title: "Confianza de Amigos", text: "Sin letras pequeñas. Reserva con un pequeño depósito y paga el resto al finalizar. Tu satisfacción es nuestra prioridad." }
                    },
                    features: {
                        title: "Detalles que marcan la",
                        title_accent: "diferencia",
                        subtitle: "No solo nos importa a dónde vas, sino cómo te sientes en cada kilómetro del trayecto.",
                        wifi: { title: "WiFi a Bordo", text: "Comparte tus momentos al instante mientras recorres la isla." },
                        water: { title: "Hidratación Premium", text: "Agua fría siempre disponible para combatir el sol tropical de Bali." },
                        car: { title: "Libertad en Movimiento", text: "Coches espaciosos y limpios. Tú decides cuándo parar y cuándo seguir." },
                        food: { title: "Gastronomía Real", text: "Te llevamos a los rincones donde los locales realmente disfrutamos comer." }
                    },
                    about: {
                        tag: "Nuestra Esencia",
                        title: "El Alma detrás de Cantik Tours",
                        meaning_title: "Más que un nombre, un sentimiento.",
                        meaning_text: "En indonesio, Cantik significa 'hermoso'. Pero para nosotros, la belleza de Bali no está solo en sus atardeceres. Está en la devoción de una ofrenda matutina, en la sonrisa genuina de un agricultor y en la paz que se siente al comprender nuestra cultura. Nuestra misión es que cada momento de tu viaje sea, simplemente, Cantik.",
                        perty_title: "¡Hola! Soy Perty.",
                        perty_text: "Soy indonesia de raíces balinesas y profesora de vocación. Con un Máster en Educación, he dedicado mi vida a enseñar nuestra lengua y tradiciones. En Cantik Tours, no soy solo tu guía; soy tu ventana a la verdadera Bali. Mi misión es que no solo veas los monumentos, sino que comprendas el 'por qué' de cada ritual y te lleves contigo la sabiduría de mi isla. Conmigo, aprenderás a vivir Bali como un local, no como un turista.",
                        team_title: "El Puente entre dos Mundos",
                        team_text: "Cantik Tours nació de la unión de dos pasiones. Por un lado, la profundidad cultural y el conocimiento local de Perty. Por otro, la visión de nuestro socio chileno, quien entiende perfectamente las expectativas del viajero occidental: seguridad, puntualidad impecable y una comunicación fluida en tu idioma. Juntos, hemos diseñado una propuesta donde la autenticidad balinesa se encuentra con los más altos estándares de servicio y confianza. Él cuida cada detalle logístico y captura tus mejores momentos, para que tú solo tengas que estar presente.",
                        why_title: "¿Por qué confiar en nosotros?",
                        why_1_title: "Conexión Directa",
                        why_1_text: "Sin agencias ni intermediarios. Hablas directamente con quienes diseñan y viven tu viaje.",
                        why_2_title: "Tus tiempos son ley",
                        why_2_text: "¿Te enamoraste de un rincón? Nos quedamos. Nuestra flexibilidad es total porque el viaje es tuyo.",
                        why_3_title: "Cero Barreras",
                        why_3_text: "Te acompañamos en español e inglés, asegurando que cada detalle y anécdota se entienda a la perfección."
                    },
                    footer: {
                        description: "Tu agencia de confianza en Bali. Experiencias privadas, auténticas y acompañamiento local.",
                        quick_links: "Enlaces rápidos",
                        contact: "Contacto",
                        rights: "Todos los derechos reservados."
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
                        contact: "Talk to Perty"
                    },
                    hero: {
                        badge: "Premium Experiences in Indonesia",
                        title_1: "Bali isn't visited,",
                        title_2: "it's lived.",
                        subtitle: "Discover the island's soul with expert local guides and 100% personalized assistance.",
                        btn_tours: "See Experiences",
                        btn_story: "Our Story"
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
                        title_1: "Ready for",
                        title_2: "your adventure?",
                        subtitle: "Book today and experience the Bali you've always dreamed of.",
                        btn: "See Experiences"
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
                        reason1: { title: "A Teacher's Wisdom", text: "Our guides don't just drive; they teach. With Perty's patience and knowledge, every stop has a cultural 'why'." },
                        reason2: { title: "Uncompromising Comfort", text: "Premium, air-conditioned vehicles with all the facilities to make Bali a pleasure from start to finish." },
                        reason3: { title: "Friends' Trust", text: "No fine print. Book with a small deposit and pay the rest at the end. Your satisfaction is our priority." }
                    },
                    features: {
                        title: "Details that make a",
                        title_accent: "difference",
                        subtitle: "We don't just care about where you go, but how you feel at every mile along the way.",
                        wifi: { title: "On-board WiFi", text: "Share your moments instantly as you travel across the island." },
                        water: { title: "Premium Hydration", text: "Always cold water available to beat Bali's tropical sun." },
                        car: { title: "Freedom in Motion", text: "Spacious and clean cars. You decide when to stop and when to keep moving." },
                        food: { title: "Real Gastronomy", text: "We take you to the hidden gems where locals actually enjoy eating." }
                    },
                    about: {
                        tag: "Our Essence",
                        title: "The Soul behind Cantik Tours",
                        meaning_title: "More than a name, a feeling.",
                        meaning_text: "In Indonesian, Cantik means 'beautiful'. But for us, Bali's beauty isn't just in its sunsets. It's in the devotion of a morning offering, in the genuine smile of a farmer, and in the peace felt when understanding our culture. Our mission is for every moment of your trip to be, simply, Cantik.",
                        perty_title: "Hi! I'm Perty.",
                        perty_text: "I am Indonesian with Balinese roots and a teacher by vocation. With a Master's in Education, I have dedicated my life to teaching our language and traditions. At Cantik Tours, I am not just your guide; I am your window to the real Bali. My mission is for you to not only see the monuments but to understand the 'why' behind every ritual and take the wisdom of my island home with you. With me, you will learn to live Bali as a local, not as a tourist.",
                        team_title: "The Bridge Between Two Worlds",
                        team_text: "Cantik Tours was born from the union of two passions. On one hand, Perty's cultural depth and local knowledge. On the other, the vision of our Chilean partner, who perfectly understands the expectations of the Western traveler: safety, impeccable punctuality, and fluid communication in your language. Together, we have designed a proposal where Balinese authenticity meets the highest standards of service and trust. He takes care of every logistical detail and captures your best moments, so you only have to be present.",
                        why_title: "Why trust us?",
                        why_1_title: "Direct Connection",
                        why_1_text: "No agencies or middlemen. You speak directly with those who design and live your trip.",
                        why_2_title: "Your Time, Your Way",
                        why_2_text: "Fell in love with a spot? We stay. Our flexibility is total because the trip is yours.",
                        why_3_title: "Zero Barriers",
                        why_3_text: "We accompany you in Spanish and English, ensuring every detail and story is perfectly understood."
                    },
                    footer: {
                        description: "Your trusted agency in Bali. Private, authentic experiences with local accompaniment.",
                        quick_links: "Quick Links",
                        contact: "Contact",
                        rights: "All rights reserved."
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
