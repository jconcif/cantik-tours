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
                        subtitle: "Descubre el alma de la isla con guías locales expertos y asistencia 100% en español.",
                        btn_tours: "Ver Experiencias",
                        btn_story: "Nuestra Historia"
                    },
                    tours: {
                        title: "Nuestros",
                        title_accent: "Tours.",
                        subtitle: "Todas nuestras rutas son privadas y 100% personalizables. Dinos qué te interesa y nosotros lo haremos realidad.",
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
                        btn: "¡Quiero empezar ya!"
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
                        title: "¿Por qué elegirnos?",
                        subtitle: "Diseñamos cada detalle para que tu única preocupación sea disfrutar de la Isla de los Dioses.",
                        reason1: { title: "Guía en Español", text: "Olvídate de las barreras del idioma. Te acompañamos en tu lengua materna." },
                        reason2: { title: "Flexibilidad Total", text: "Tours privados a tu ritmo. Tú marcas los tiempos, nosotros la magia." },
                        reason3: { title: "Pago Seguro", text: "Confianza ante todo. Reserva ahora y paga al finalizar el tour." }
                    },
                    about: {
                        tag: "Nuestra Historia",
                        title: "Hola, soy Perty.",
                        p1: "Soy balinesa de nacimiento y me apasiona compartir la cultura de mi isla con amigos que hablan español.",
                        quote: "En Cantik Tours creemos en lo simple: sin intermediarios. Cuando reservas, hablas directamente conmigo.",
                        p2: "Mi misión es mostrarte el Bali real, el que no sale en las postales de siempre, pero con la comodidad y exclusividad que te mereces."
                    },
                    footer: {
                        description: "Tu agencia de confianza en Bali. Experiencias privadas, auténticas y 100% en español.",
                        quick_links: "Enlaces rápidos",
                        contact: "Contacto",
                        rights: "Todos los derechos reservados."
                    },
                    common: {
                        loading: "Cargando...",
                        back: "Volver",
                        more_info: "Más información",
                        copied: "¡Enlace copiado!",
                        error: "Algo salió mal"
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
                        subtitle: "Discover the island's soul with expert local guides and 100% Spanish assistance.",
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
                        btn: "Start my journey!"
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
                        title: "Why choose us?",
                        subtitle: "We design every detail so your only concern is enjoying the Island of the Gods.",
                        reason1: { title: "Spanish Guides", text: "Forget language barriers. We accompany you in your native language." },
                        reason2: { title: "Total Flexibility", text: "Private tours at your own pace. You set the timing, we bring the magic." },
                        reason3: { title: "Secure Payment", text: "Trust above all. Book now and pay at the end of the tour." }
                    },
                    about: {
                        tag: "Our Story",
                        title: "Hi, I'm Perty.",
                        p1: "I am Balinese by birth and I'm passionate about sharing my island's culture with friends from all over the world.",
                        quote: "At Cantik Tours, we believe in simplicity: no intermediaries. When you book, you talk directly with me.",
                        p2: "My mission is to show you the real Bali, the one that doesn't always appear on postcards, with the comfort and exclusivity you deserve."
                    },
                    footer: {
                        description: "Your trusted agency in Bali. Private, authentic experiences, 100% in Spanish.",
                        quick_links: "Quick Links",
                        contact: "Contact",
                        rights: "All rights reserved."
                    },
                    common: {
                        loading: "Loading...",
                        back: "Back",
                        more_info: "More info",
                        copied: "Link copied!",
                        error: "Something went wrong"
                    }
                }
            }
        }
    });

export default i18n;
