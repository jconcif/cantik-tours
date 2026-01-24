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
                        tours: "Explorar Tours",
                        guide: "Guía Bali 2026",
                        contact: "Habla con nosotros",
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
                        per_car: "Precio por coche (1-5 pers.)",
                        no_matches: "No hay coincidencias",
                        see_all: "Ver todos los tours",
                        custom: {
                            title: "Diseña tu Propia Aventura",
                            description: "¿No sabes qué elegir? Cuéntanos qué te gusta y diseñaremos un itinerario 100% exclusivo para ti.",
                            btn: "Crear mi itinerario"
                        },
                        badge_popular: "Más Popular",
                        badge_recommended: "Recomendado",
                        badge_must: "Imprescindible",
                        categories: {
                            todos: "Todos",
                            cultura: "Cultura",
                            cascadas: "Cascadas",
                            fotografia: "Fotografía",
                            playas: "Playas",
                            aventura: "Aventura",
                            naturaleza: "Naturaleza"
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
                        per_person: "/ persona",
                        not_included_msg: "Entradas y comidas no incluidas",
                        view_details: "Ver Actividad",
                        booking_title: "RESERVA TU VIAJE",
                        booking_date: "Fecha de viaje",
                        booking_pax: "Tamaño del Grupo",
                        booking_hotel: "Ubicación / Hotel",
                        booking_hotel_placeholder: "Ej: Maya Ubud Resort",
                        booking_submit: "Confirmar y enviar",
                        booking_payment_info: "Reserva con un pequeño depósito y paga el resto al finalizar.",
                        booking_pax_1: "1 Persona",
                        booking_pax_2: "2 Personas",
                        booking_pax_3: "3 Personas",
                        booking_pax_4: "4 Personas",
                        booking_pax_5: "5 Personas",
                        booking_pax_6: "6 o más personas",
                        booking_pax_12: "12 o más personas",
                        booking_pax_20: "20 o más personas",
                        coupon: "¿Tienes un cupón?",
                        coupon_placeholder: "Introduce tu código",
                        msg_greeting: "Hola Cantik Tours!",
                        msg_intro: "Me gustaría reservar una actividad:",
                        msg_tour: "Tour",
                        msg_date: "Fecha",
                        msg_pax: "Pasajeros",
                        msg_hotel: "Hotel/Zona",
                        msg_coupon: "Cupón",
                        msg_confirm: "¿Me confirman disponibilidad? Gracias!"
                    },
                    guide: {
                        badge: "Imprescindible para tu viaje",
                        title: "Guía Bali",
                        title_accent: "2026.",
                        subtitle: "Todo lo que necesitas saber antes de aterrizar en la Isla de los Dioses.",
                        help_title: "¿Aún tienes dudas?",
                        help_text: "Como locales, conocemos todos los secretos de la isla. Escríbenos por WhatsApp y te ayudaremos a planificar tu viaje sin compromiso.",
                        help_btn: "Consultar ahora"
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
                        water: { title: "Hidratación", text: "Agua fría siempre disponible para combatir el sol tropical de Bali." },
                        car: { title: "Libertad Total", text: "Coches espaciosos y limpios. Tú decides cuándo parar y cuándo seguir." },
                        food: { title: "Gastronomía Real", text: "Te llevamos a los rincones donde los locales realmente disfrutamos comer." }
                    },
                    about: {
                        tag: "Filosofía Cantik",
                        title: "Viaja a tu ritmo",
                        meaning_title: "¿Qué significa Cantik?",
                        meaning_text: "En indonesio, Cantik (pronunciado chantic) significa hermoso. Pero para nosotros, la belleza de Bali no está solo en sus postales. Está en la devoción de una ofrenda matutina, en la sonrisa de un agricultor y en la paz que sientes al comprender nuestra cultura. Queremos que cada momento de tu viaje sea, simplemente, Cantik.",
                        team_intro_title: "El Equipo",
                        team_intro_text: "Sin prisas, con seguridad y en tu idioma.",
                        perty_name: "Pertiyani",
                        perty_role: "Fundadora",
                        perty_title: "Pertiyani (Fundadora)",
                        perty_text: "Con profundas raíces balinesas y una vida dedicada a la educación, he tenido el honor de representar nuestra cultura en diversos países como profesora de lengua indonesia. Hoy, mi verdadera pasión es ser tu vínculo personal con el alma de Bali. Para mí, acompañarte no es solo seguir un itinerario, es invitarte a sentir la mística de nuestros templos, la devoción de nuestros rituales y esos rincones secretos que solo revelamos a quienes nos visitan con el corazón. Mi mayor deseo es que vivas esta isla con el mismo respeto y profundo amor con el que yo la llamo hogar.",
                        javi_title: "Javi (Tu Enlace y Logística)",
                        javi_text: "Viajero incansable y un profundo enamorado de Bali, mi misión en Cantik es ser tu puente directo y confiable con la isla. Me encargo de que cada detalle de tu itinerario sea impecable y de resolver cualquier inquietud que surja en el camino. Estoy aquí para que te desprendas de la logística y te concentres únicamente en disfrutar, con la seguridad de saber que siempre tienes a alguien a tu lado para que todo fluya sin inconvenientes.",
                        promise_title: "",
                        promise_text: "No vendemos transporte, compartimos nuestro hogar. Para asegurar que siempre tengas la mejor experiencia, contamos con una red de conductores locales de total confianza, seleccionados personalmente por nosotros bajo los mismos estándares de calidez y seguridad que nos definen.",
                        closing: "Con Cantik Tours, tu viaje no es solo una visita; es una inmersión real en Bali, diseñada para que cada instante sea, de verdad, Cantik.",
                        meet_team_title: "Nuestros Guías",
                        meet_team_subtitle: "Contamos con ellos por su conocimiento y compromiso.",
                        guide_1_name: "Wayan",
                        guide_1_role: "Cultura y Templos",
                        guide_1_desc: "Experto en historia y arquitectura balinesa.",
                        guide_2_name: "Putu",
                        guide_2_role: "Gastronomía y Vida Local",
                        guide_2_desc: "Especialista en sabores auténticos, mercados locales y la cocina tradicional de Bali.",
                        guide_3_name: "Komang",
                        guide_3_role: "Cultura y Tradición",
                        guide_3_desc: "Experto en las costumbres locales y el día a día en los pueblos balineses.",
                        guide_4_name: "Ketut",
                        guide_4_role: "Cascadas y Aventura",
                        guide_4_desc: "El guía más joven del equipo, experto en descubrir cascadas ocultas y rutas de aventura."
                    },
                    footer: {
                        description: "Tu agencia de confianza en Bali. Experiencias privadas, auténticas y acompañamiento local.",
                        quick_links: "Enlaces rápidos",
                        contact: "Contacto",
                        rights: "Todos los derechos reservados.",
                        trust_1: "Pago Seguro en Destino",
                        trust_2: "Guías Locales Verificados",
                        trust_3: "Soporte Personalizado",
                        made_with: "Hecho con",
                        in_bali: "en Bali"
                    },
                    testimonials: {
                        badge: "Testimonios",
                        title: "Lo que dicen nuestros",
                        title_accent: "viajeros",
                        subtitle: "Historias reales de personas que vivieron la magia de Bali con nosotros.",
                        data: [
                            {
                                name: "Marta y Jorge",
                                location: "España",
                                text: "¡La mejor decisión de nuestro viaje! Perty es una guía excepcional, nos hizo sentir como en familia. Bali es mágica, pero verla con ellos es otro nivel."
                            },
                            {
                                name: "Andrea R.",
                                location: "México",
                                text: "Servicio impecable. El conductor fue súper puntual y el coche muy cómodo. Nos llevaron a sitios que no salen en las guías turísticas. ¡100% recomendados!"
                            },
                            {
                                name: "Familia González",
                                location: "Argentina",
                                text: "Viajamos con dos niños y tuvieron muchísima paciencia y flexibilidad. Nos organizaron un itinerario perfecto para nosotros. Gracias por todo."
                            }
                        ]
                    },
                    common: {
                        loading: "Cargando...",
                        back: "Volver",
                        more_info: "Más información",
                        copied: "¡Enlace copiado!",
                        error: "Algo salió mal",
                        whatsapp_tooltip: "¡Hola! Soy Perty. ¿Hablamos?",
                        whatsapp_message: "Hola Cantik Tours! Me gustaría recibir más información sobre vuestros tours.",
                        language: "Idioma",
                        reviews_title: "Opiniones",
                        reviews_about: "Sobre",
                        reviews_showing: "Mostrando",
                        reviews_verified: "opiniones verificadas"
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        home: "Home",
                        tours: "Explore Tours",
                        guide: "Bali Guide 2026",
                        contact: "Talk to us",
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
                        per_car: "Price per car (1-5 people)",
                        no_matches: "No matches found",
                        see_all: "See all tours",
                        custom: {
                            title: "Design Your Own Adventure",
                            description: "Don't know what to choose? Tell us what you like and we'll design a 100% exclusive itinerary for you.",
                            btn: "Create my itinerary"
                        },
                        badge_popular: "Most Popular",
                        badge_recommended: "Recommended",
                        badge_must: "Must See",
                        categories: {
                            todos: "All",
                            cultura: "Culture",
                            cascadas: "Waterfalls",
                            fotografia: "Photography",
                            playas: "Beaches",
                            aventura: "Adventure",
                            naturaleza: "Nature"
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
                        per_person: "/ person",
                        not_included_msg: "Tickets and meals not included",
                        view_details: "View Details",
                        booking_title: "RESERVE YOUR TRIP",
                        booking_date: "Travel Date",
                        booking_pax: "Group Size",
                        booking_hotel: "Location / Hotel",
                        booking_hotel_placeholder: "e.g., Maya Ubud Resort",
                        booking_submit: "Confirm and send",
                        booking_payment_info: "Book with a small deposit and pay the rest on arrival.",
                        booking_pax_1: "1 Person",
                        booking_pax_2: "2 People",
                        booking_pax_3: "3 People",
                        booking_pax_4: "4 People",
                        booking_pax_5: "5 People",
                        booking_pax_6: "6 or more people",
                        booking_pax_12: "12 or more people",
                        booking_pax_20: "20 or more people",
                        coupon: "Do you have a coupon?",
                        coupon_placeholder: "Enter code",
                        msg_greeting: "Hi Cantik Tours!",
                        msg_intro: "I would like to book an activity:",
                        msg_tour: "Tour",
                        msg_date: "Date",
                        msg_pax: "Passengers",
                        msg_hotel: "Hotel/Area",
                        msg_coupon: "Coupon",
                        msg_confirm: "Can you confirm availability? Thanks!"
                    },
                    guide: {
                        badge: "Essential for your trip",
                        title: "Bali Guide",
                        title_accent: "2026.",
                        subtitle: "Everything you need to know before landing on the Island of the Gods.",
                        help_title: "Still have questions?",
                        help_text: "As locals, we know all the island's secrets. Write to us on WhatsApp and we will help you plan your trip with no strings attached.",
                        help_btn: "Ask us now"
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
                        water: { title: "Hydration", text: "Always cold water available to beat Bali's tropical sun." },
                        car: { title: "Total Freedom", text: "Spacious and clean cars. You decide when to stop and when to keep moving." },
                        food: { title: "Real Gastronomy", text: "We take you to the hidden gems where locals actually enjoy eating." }
                    },
                    about: {
                        tag: "Cantik Philosophy",
                        title: "Travel at your own pace",
                        meaning_title: "What does Cantik mean?",
                        meaning_text: "In Indonesian, Cantik (pronounced Chantik) means beautiful. But for us, the beauty of Bali is not just in its postcards. It is in the devotion of a morning offering, in the smile of a farmer, and in the peace you feel when understanding our culture. We want every moment of your trip to be, simply, Cantik.",
                        team_intro_title: "The Team",
                        team_intro_text: "No rush, safely, and in your language.",
                        perty_name: "Pertiyani",
                        perty_role: "Founder",
                        perty_title: "Pertiyani (Founder)",
                        perty_text: "With deep Balinese roots and a life dedicated to education, I have had the honor of representing our culture in various countries as an Indonesian language teacher. Today, my true passion is being your personal connection to the soul of Bali. For me, guiding you is not just following an itinerary; it's about inviting you to feel the mysticism of our temples, the devotion of our rituals, and those secret spots we only share with those who visit us with an open heart. My greatest wish is for you to experience this island with the same respect and profound love with which I call it home.",
                        javi_title: "Javi (Your Link & Logistics)",
                        javi_text: "A lifelong traveler and deeply in love with Bali, my mission at Cantik is to be your direct and reliable bridge to the island. I oversee every detail of your itinerary to ensure it's flawless and handle any questions you may have along the way. I am here so you can step away from the logistics and focus entirely on the experience, with the peace of mind that comes from knowing someone is always by your side to ensure everything flows without any issues.",
                        promise_title: "",
                        promise_text: "We don't sell transport, we share our home. To ensure you always have the best experience, we have a network of fully trusted local drivers, personally selected by us under the same standards of warmth and safety that define us.",
                        closing: "With Cantik Tours, your trip is not just a visit; it is a real immersion in Bali, designed so that every instant is, truly, Cantik.",
                        meet_team_title: "Our Guides",
                        meet_team_subtitle: "We count on them for their knowledge and commitment.",
                        guide_1_name: "Wayan",
                        guide_1_role: "History & Temples",
                        guide_1_desc: "Expert in Balinese history and architecture.",
                        guide_2_name: "Putu",
                        guide_2_role: "Gastronomy & Local Life",
                        guide_2_desc: "Specialist in authentic flavors, local markets, and traditional Balinese cuisine.",
                        guide_3_name: "Komang",
                        guide_3_role: "Culture & Tradition",
                        guide_3_desc: "Expert in local customs and daily life in Balinese villages.",
                        guide_4_name: "Ketut",
                        guide_4_role: "Waterfalls & Adventure",
                        guide_4_desc: "The youngest guide in the team, expert in discovering hidden waterfalls and adventure routes."
                    },
                    footer: {
                        description: "Your trusted agency in Bali. Private, authentic experiences with local accompaniment.",
                        quick_links: "Quick Links",
                        contact: "Contact",
                        rights: "All rights reserved.",
                        trust_1: "Secure Payment on Arrival",
                        trust_2: "Verified Local Guides",
                        trust_3: "Personalized Support",
                        made_with: "Made with",
                        in_bali: "from Bali"
                    },
                    testimonials: {
                        badge: "Testimonials",
                        title: "What our",
                        title_accent: "travelers",
                        subtitle: "Real stories from people who experienced the magic of Bali with us.",
                        data: [
                            {
                                name: "Marta & Jorge",
                                location: "Spain",
                                text: "The best decision of our trip! Perty is an exceptional guide, she made us feel like family. Bali is magical, but seeing it with them is another level."
                            },
                            {
                                name: "Andrea R.",
                                location: "Mexico",
                                text: "Impeccable service. The driver was super punctual and the car very comfortable. They took us to places not found in travel guides. 100% recommended!"
                            },
                            {
                                name: "González Family",
                                location: "Argentina",
                                text: "We traveled with two children and they had a lot of patience and flexibility. They organized a perfect itinerary for us. Thanks for everything."
                            }
                        ]
                    },
                    common: {
                        loading: "Loading...",
                        back: "Back",
                        more_info: "More info",
                        copied: "Link copied!",
                        error: "Something went wrong",
                        whatsapp_tooltip: "Hi! I'm Perty. Shall we talk?",
                        whatsapp_message: "Hi Cantik Tours! I would like to receive more information about your tours.",
                        language: "Language",
                        reviews_title: "Reviews",
                        reviews_about: "About",
                        reviews_showing: "Showing",
                        reviews_verified: "verified reviews"
                    }
                }
            }
        }
    });

export default i18n;
