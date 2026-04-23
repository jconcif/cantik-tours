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
                        view_guide: "Ver Guía Bali 2026",
                        contact: "Habla con nosotros",
                        about: "Nosotros",
                        expert_choice: "Elección del Experto",
                        visa_assistance: "Asistencia de Visado"
                    },
                    hero: {
                        badge: "Experiencias Premium en Indonesia.",
                        title_1: "Bali no se visita,",
                        title_2: "se vive.",
                        subtitle: "Descubre la esencia de Bali con guías que hablan tu idioma, un servicio honesto y una experiencia diseñada exclusivamente para ti.",
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
                        per_car: "Precio por coche (1-4 pers.)",
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
                            naturaleza: "Naturaleza",
                            traslados: "Traslados"
                        },
                        badge: "Elige tu propia aventura"
                    },
                    cta: {
                        title: "¿Listo para vivir Bali como un local?",
                        subtitle: "Reserva hoy y vive el Bali que siempre soñaste con guías expertos.",
                        btn_availability: "Ver Todos los Tours",
                        btn_guide: "Ver Guía Bali 2026",
                        btn_whatsapp: "WhatsApp directo",
                        general_inquiry: "Consulta General"
                    },
                    seo: {
                        home: {
                            title: "Tours Privados en Bali | Cantik Tours",
                            description: "Agencia de viajes local en Bali con guías en español. Tours privados, itinerarios flexibles y experiencias auténticas con Perty y su equipo.",
                            keywords: "bali tours, guias en español bali, turismo bali, viaje a bali, bali tours privados, cantiktours"
                        },
                        about: {
                            title: "Nosotros | Cantik Tours Bali",
                            description: "Conoce la historia detrás de Cantik Tours."
                        },
                        reviews: {
                            title: "Comparte tu Experiencia | Cantik Tours",
                            description: "Cuéntanos qué tal fue tu tour en Bali con nosotros. Tu opinión nos ayuda a mejorar."
                        }
                    },
                    detail: {
                        itinerary: "Itinerario",
                        description: "Descripción",
                        included: "Incluido",
                        not_included: "No incluido",
                        reviews: "Reseñas",
                        book_now: "Comprobar Disponibilidad",
                        share: "Compartir",
                        duration: "Duración",
                        private: "Privado",
                        private_label: "Tour Exclusivo",
                        rating: "Valoración",
                        availability: "Disponibilidad",
                        availability_label: "Todo el año",

                        per_person: "/ persona",
                        not_included_msg: "Entradas y comidas no incluidas",
                        view_details: "Ver detalles",
                        view_details_short: "Detalles",
                        booking_title: "RESERVA TU VIAJE",
                        booking_date: "Fecha de viaje",
                        booking_pax: "Tamaño del Grupo",
                        booking_hotel: "Ubicación / Hotel",
                        booking_hotel_placeholder: "Ej: Maya Ubud Resort",
                        booking_submit: "Confirmar y enviar",
                        booking_payment_info: "Abona el 100% ahora o solo el 30% como reserva. Pago restante 48h antes.",
                        booking_pax_1: "1 Persona",
                        booking_pax_2: "2 Personas",
                        booking_pax_3: "3 Personas",
                        booking_pax_4: "4 Personas",
                        booking_pax_5: "5 Personas",
                        booking_pax_6: "6 Personas",
                        booking_pax_7: "7 Personas",
                        booking_pax_8: "8 Personas",
                        booking_pax_9: "9 Personas",
                        booking_pax_10: "10 Personas",
                        booking_pax_11: "11 Personas",
                        booking_pax_12: "12 Personas",
                        booking_pax_more: "Más de 12 personas",
                        coupon: "¿Tienes un cupón?",
                        coupon_placeholder: "Introduce tu código",
                        msg_greeting: "Hola Cantik Tours!",
                        msg_intro: "Me gustaría reservar una actividad:",
                        msg_tour: "Tour",
                        msg_date: "Fecha",
                        msg_pax: "Pasajeros",
                        msg_hotel: "Hotel/Zona",
                        msg_coupon: "Cupón",
                        msg_hotel: "Hotel/Zona",
                        msg_coupon: "Cupón",
                        msg_confirm: "¿Me confirman disponibilidad? Gracias!",
                        faq_intro: "Las preguntas que siempre nos hacen nuestros viajeros:",
                        availability_disclaimer: "Confirmaremos la disponibilidad del idioma elegido directamente por wsp.",
                        error_language_required: "Por favor, selecciona un idioma para continuar.",
                        booking_experience: "Tipo de servicio:",
                        exp_economy_title: "Transporte Privado",
                        exp_economy_sub: "Conductor Local (idioma inglés)",
                        exp_economy_desc: "Vehículo estándar o superior. Tu conductor te lleva seguro, mientras tú exploras a tu ritmo.",
                        exp_economy_price_label: "",
                        exp_comfort_title: "Guía en Inglés",
                        exp_comfort_sub: "Guía local (Idioma Inglés)",
                        exp_comfort_desc: "Vehículo superior. Descubre la historia profunda de Bali con un experto a tu lado.",
                        exp_comfort_price_label: "",
                        exp_elite_title: "GUÍA EN ESPAÑOL 💎",
                        exp_elite_sub: "Guía local certificado (Idioma español)",
                        exp_elite_desc: "La máxima comodidad y acompañamiento total sin barreras de idioma.",
                        exp_elite_warning: "⚠️ Alta demanda de guías en español. Te confirmaremos la disponibilidad de forma prioritaria.",
                        exp_elite_price_label: "",
                        price_special: "Desde",
                        transfer_title: "RESERVA TU TRASLADO",
                        transfer_type: "Trayecto",
                        transfer_type_placeholder: "Selecciona el trayecto",
                        transfer_route_1: "Aeropuerto → Ubud",
                        transfer_route_2: "Ubud → Aeropuerto",
                        transfer_route_3: "Ubud → Puerto Padangbai",
                        transfer_route_4: "Puerto Padangbai → Ubud",
                        transfer_route_5: "Ubud → Puerto Sanur",
                        transfer_route_6: "Puerto Sanur → Ubud",
                        transfer_route_7: "Aeropuerto → Puerto Padangbai",
                        transfer_route_8: "Puerto Padangbai → Aeropuerto",
                        transfer_route_other: "Otro trayecto",
                        transfer_time: "Hora de recogida",
                        transfer_flight: "Nº de Vuelo / Barco",
                        transfer_flight_placeholder: "Opcional (para monitorizar retrasos)",
                        transfer_bags: "Número de maletas",
                        transfer_submit: "Solicitar presupuesto",
                        msg_transfer_intro: "Hola Cantik Tours! Necesito un traslado:",
                        msg_transfer_type: "Trayecto",
                        msg_transfer_time: "Hora",
                        msg_transfer_flight: "Vuelo/Barco",
                        msg_transfer_bags: "Maletas",
                        msg_transfer_pax: "Pasajeros",

                        // New Detail enhancements
                        packing_list: "Qué llevar",
                        important_info: "Información Importante",
                        faq_title: "Preguntas Frecuentes",
                        faq_packing_q: "¿Qué debo llevar al tour?",
                        faq_info_q: "Información importante sobre el tour",
                        fair_payment_title: "Pago Consciente",
                        fair_payment_desc: "Tu reserva te permite abonar el 100% hasta 48h antes del tour. Con este sistema aseguramos un trato justo para el equipo local desde el primer minuto, fomentando un turismo responsable y que apoya directamente a las familias de Bali.",
                        view_full_route: "Ver el recorrido real en Google Maps",
                        benefits: {
                            private: "100% Privado",
                            flexible: "Totalmente Flexible",
                            no_rush: "Sin Prisas",
                            flexibility_title: "Flexibilidad en Entradas",
                            flexibility_desc: "Tú decides dónde entrar. No incluimos las entradas para darte libertad total de cambiar de planes sobre la marcha. Si prefieres que nosotros las gestionemos, podemos ayudarte (consultar precio).",
                            cancellation_title: "Política de Cancelación",
                            cancellation_desc: "Cancelación gratuita hasta 24h antes del tour. Sin depósitos complicados."
                        },
                        items: {
                            shoes: "Calzado cómodo",
                            sunscreen: "Protector solar",
                            camera: "Cámara / Móvil",
                            swimwear: "Bañador y toalla",
                            sarong: "Sarong (incluido en templos)",
                            money: "Efectivo local (IDR)"
                        }
                    },
                    guide: {
                        badge: "Bali Guide 2026",
                        title: "Guía Bali",
                        title_accent: "2026",
                        subtitle: "Todo lo que necesitas saber antes de aterrizar en la \"Isla de los Dioses\".",
                        chapters: {
                            c1: { title: "Los Preparativos", subtitle: "Antes de despegar" },
                            c2: { title: "El Clima", subtitle: "¿Cuándo viajar?" },
                            c3: { title: "El Alojamiento", subtitle: "Dónde dormir" },
                            c4: { title: "Movilidad", subtitle: "Cómo moverse" },
                            c5: { title: "Dinero", subtitle: "Tarjetas y Cajeros (ATM)" },
                            c6: { title: "Cultura", subtitle: "Experiencia Bali" }
                        },
                        sections: {
                            visa: {
                                title: "🛂 Visado e Ingreso (Actualizado 2026)",
                                intro: "Para que tu llegada al \"País de las 17.000 islas\" sea perfecta, revisa estos requisitos esenciales:",
                                b1: {
                                    title: "Visa B1 - Turismo (1-60 días)",
                                    points: [
                                        "Coste: 500.000 IDR (aprox. $35) por cada 30 días.",
                                        "Duración: 30 días, extensible una vez (máx 60).",
                                        "Trámite: Online (e-VoA) o al llegar (VoA).",
                                        "Requisito: Pasaporte (>6 meses) y pasaje de salida."
                                    ]
                                },
                                c1: {
                                    title: "Visa C1 - Larga Estancia (180 días)",
                                    points: [
                                        "Coste: 1.000.000 IDR (aprox. $65) cada 60 días.",
                                        "Trámite: Solo Online (evisa.imigrasi.go.id).",
                                        "Requisito: Extracto bancario (>2000 USD)."
                                    ]
                                },
                                ecd: {
                                    ecd_title: "🎟️ Tasas y Aduanas (Obligatorio)",
                                    ecd_text: "Todos los extranjeros deben pagar la Tasa Turística (150.000 IDR) en Love Bali y rellenar la declaración de aduanas (ECD) online 48h antes del vuelo.",
                                    ecd_tip: "Tip: Ten listos los códigos QR en tu móvil al aterrizar para evitar filas."
                                }
                            },
                            weather: {
                                title: "🌤️ Clima",
                                months_title: "Resumen por Meses",
                                intro: "Bali goza de un clima tropical constante (26-30°C).",
                                dry: { title: "Seca (Abr-Oct)", desc: "Sol garantizado y humedad baja. La mejor época para playas y buceo." },
                                rainy: { title: "Lluvias (Nov-Mar)", desc: "Verdor intenso y menos multitudes. Lluvias fuertes pero breves." },
                                dry_best: "Temporada Top", dry_best_desc: "Julio y Agosto (Clima perfecto pero mucha gente)",
                                perfect: "Meses Ideales", perfect_desc: "Abril, Mayo, Junio y Septiembre (Equilibrio total)",
                                rainy: "Pura Lluvia", rainy_desc: "Enero y Febrero (Mucha humedad y lluvia constante)",
                                transition: "Transición", transition_desc: "Marzo y Octubre (Clima variable y cambio de estación)"
                            },
                            stay: {
                                title: "🏠 Alojamiento",
                                intro: "Desde arrozales místicos hasta acantilados infinitos. Elige tu base según el ambiente que busques:",
                                areas: [
                                    { area: "Ubud", title: "El Corazón Cultural", desc: "Entre arrozales, templos y yoga. Perfecto para conectar con la espiritualidad." },
                                    { area: "Uluwatu", title: "Vibra Surf & Lujo", desc: "Acantilados impresionantes y los mejores atardeceres de la isla." },
                                    { area: "Canggu", title: "Lifestyle Aesthetic", desc: "Beach clubs, cafeterías modernas y vida nocturna vibrante." },
                                    { area: "Sanur", title: "Paz Familiar", desc: "Aguas tranquilas y amaneceres únicos. Ideal para familias o estancias relajadas." }
                                ],
                                booking_agoda: "Tip: Booking y Agoda son los reyes aquí. ¡Compara siempre!"
                            },
                            mobility: {
                                title: "🛵 Movilidad",
                                intro: "Moverse por Bali es una aventura en sí misma. Aquí tienes las herramientas clave:",
                                apps: [
                                    { title: "Internet & eSIM", desc: "Usa Airalo (eSIM) o compra una SIM local de Telkomsel para estar conectado desde el minuto uno." },
                                    { title: "Grab & Gojek", desc: "El 'Uber' asiático. Úsalo para coches, motos y comida (GoFood). Vincula tu tarjeta y olvida el efectivo." },
                                    { title: "Google Maps", desc: "Usa siempre modo 'coche' aunque vayas en moto para evitar rutas peligrosas o intransitables." }
                                ],
                                transport: [
                                    { title: "Moto (Scooter)", desc: "Libertad total, pero solo para expertos. Casco obligatorio y cuidado con la policía.", tip: "Lleva siempre Carnet Internacional (IDP)" },
                                    { title: "Conductor Privado", desc: "La opción Cantik. Comodidad, aire acondicionado y conocimiento local sin estrés.", highlight: "Recomendado para tours de día completo" }
                                ]
                            },
                            money: {
                                title: "💰 Dinero",
                                intro: "La moneda es la Rupia (IDR). Manejar efectivo es vital fuera de las zonas turísticas.",
                                tips: [
                                    { title: "¡Tarjeta Física!", desc: "Los cajeros (ATM) no tienen contactless. Sin la tarjeta física no podrás sacar dinero. Lleva al menos dos por si acaso." },
                                    { title: "Cajeros Seguros", desc: "Usa solo cajeros dentro de bancos o supermercados (Indomaret) para evitar clonaciones." },
                                    { title: "Cambio de Divisa", desc: "Tus billetes de Euro deben estar impecables. Cambia solo en sitios oficiales como BMC." }
                                ],
                                budget_title: "Presupuesto de Referencia",
                                budget: [
                                    { concept: "Comida Warung", price: "$3 - $8 pax" },
                                    { concept: "Cerveza / Café", price: "$2 - $5" }
                                ]
                            },
                            culture: {
                                title: "⛩️ Cultura",
                                intro: "Bali es la 'Isla de los Dioses'. El respeto a sus tradiciones es lo más importante.",
                                food: {
                                    food_title: "🍱 Gastronomía Imprescindible",
                                    food_text: "Debes probar: Nasi Goreng (arroz), Mie Goreng (fideos), Satay (brochetas), Gado-Gado (vegetariano) y Babi Guling (cochinillo)."
                                },
                                phrases: {
                                    dict_title: "🗣️ Diccionario de Bolsillo",
                                    dict_items: [
                                        "Halo: Hola | Terima kasih: Gracias | Sama-sama: De nada.",
                                        "Tolong: Por favor | No picante: No picante | Berapa?: ¿Cuánto cuesta?"
                                    ]
                                },
                                rules_title: "💡 Reglas de Oro",
                                rules: [
                                    { label: "Seguro Médico", text: "Obligatorio. La sanidad privada es excelente pero muy cara sin seguro." },
                                    { label: "Bali Belly", text: "Nunca bebas agua del grifo. Usa desinfectante de manos frecuentemente." },
                                    { label: "Templos", text: "Cubre tus hombros y piernas (Sarong). Nunca pises las ofrendas del suelo." },
                                    { label: "Respeto", text: "No toques la cabeza de los locales y usa la mano derecha para dar/recibir." }
                                ]
                            }
                        },
                        cta_title: "¿Listo para vivir tu propia historia?",
                        cta_text: "Ahora que conoces los secretos, es hora de vivirlos. Únete a Cantik Tours y siente la verdadera magia.",
                        cta_btn_tours: "Ver Experiencias",
                        cta_btn_wsp: "Hablar con nosotros",
                    },
                    why: {
                        title: "¿Por qué Cantik Tours?",
                        subtitle: "No somos una agencia masiva. Somos locales especializados en crear recuerdos que duran toda la vida.",
                        reason1: { title: "Expertos en Cultura Local", text: "No solo te llevamos, te sumergimos. Todo nuestro equipo comparte la misma pasión por mostrar y explicar cada tradición, templo y paisaje." },
                        reason2: { title: "Confort sin Compromisos", text: "Vehículos premium, climatizados y con todas las facilidades para que Bali sea un placer de principio a fin." },
                        reason4: { title: "Turismo Consciente", text: "Al reservar, garantizas un pago justo y sin retrasos a nuestro equipo local, impulsando directamente a las familias de Bali." }
                    },
                    features: {
                        title: "Detalles que marcan la",
                        title_accent: "diferencia",
                        subtitle: "No solo nos importa a dónde vas, sino cómo te sientes en cada kilómetro del trayecto.",
                        wifi: { title: "WiFi a Bordo*", text: "Comparte tus momentos al instante mientras recorres la isla." },
                        water: { title: "Hidratación", text: "Agua fría siempre disponible para combatir el sol tropical de Bali." },
                        car: { title: "Libertad Total", text: "Coches espaciosos y limpios. Tú decides cuándo parar y cuándo seguir." },
                        food: { title: "Gastronomía Real", text: "Descubre los sabores más auténticos de Bali y la esencia de Indonesia." }
                    },
                    about: {
                        tag: "Filosofía Cantik",
                        title: "Viaja a tu ritmo",
                        meaning_title: "¿Qué significa Cantik?",
                        meaning_text: "En indonesio, Cantik (pronunciado chantic) significa hermoso. Pero para nosotros, la belleza de Bali no solo está en sus postales. Está también en la devoción de una ofrenda matutina, en la sonrisa de un agricultor y en la paz que sientes al comprender nuestra cultura. Queremos que cada momento de tu viaje sea, simplemente, Cantik.",
                        authority_subtitle: "Agencia local en Bali especializada en tours privados y atención personalizada en español e inglés.",
                        trust_local_title: "Agencia 100% Local",
                        trust_local_desc: "Sin intermediarios internacionales. Operamos directamente desde Bali, apoyando la economía local.",
                        trust_direct_title: "Trato Directo",
                        trust_direct_desc: "Diseñamos tu viaje nosotros mismos, sin call centers ni respuestas automáticas.",
                        trust_boutique_title: "Sin Masas",
                        trust_boutique_desc: "Huimos de los autobuses llenos. Solo ofrecemos experiencias privadas para garantizar la calidad.",
                        cta_emotional_title: "¿Te imaginas tu viaje así?",
                        cta_emotional_text: "Lejos de lo convencional. Cerca de la auténtica magia de Bali.",
                        cta_emotional_btn: "Hablemos por WhatsApp",

                        impact_title: "Tu viaje impacta",
                        impact_desc: "Cada reserva financia a los conductores y sus familias, gracias a un pago justo y sin demoras.",

                        team_intro_title: "El Equipo",
                        team_intro_text: "Sin prisas, con seguridad y en tu idioma.",
                        perty_name: "Perty",
                        perty_role: "Fundadora",
                        local_experts: "Expertos Locales",
                        perty_title: "Perty (Fundadora)",
                        perty_text_1: "Con un Magister en Educación y una vida dedicada a la enseñanza, he tenido el honor de representar nuestra cultura en diversos países como profesora de lengua indonesia. Hoy, mi verdadera pasión es ser tu vínculo personal con el alma de Bali.",
                        perty_text_2: "Para mí, acompañarte no es solo seguir un itinerario, es invitarte a sentir la mística de nuestros templos, la devoción de los rituales y esos rincones secretos que solo revelamos a quienes nos visitan con el corazón. Mi mayor deseo es que vivas esta isla con el mismo respeto y profundo amor con el que yo la llamo hogar.",
                        javi_title: "Javi (Tu Enlace y Logística)",
                        javi_role: "Logística & Enlace",
                        javi_text: "Viajero incansable y un profundo enamorado de Bali, mi misión en Cantik es ser tu puente directo y confiable con la isla. Me encargo de que cada detalle de tu itinerario sea impecable y de resolver cualquier inquietud que surja en el camino. Estoy aquí para que te desprendas de la logística y te concentres únicamente en disfrutar, con la seguridad de saber que siempre tienes a alguien a tu lado para que todo fluya sin inconvenientes.",
                        promise_title: "",
                        promise_text: "Para asegurar que siempre tengas la mejor experiencia, contamos con una red de conductores locales de total confianza para que solo te preocupes de disfrutar.",

                        meet_team_title: "Nuestros Guías",
                        team_reinforced_text: "Para asegurar que siempre tengas la mejor experiencia, trabajamos con una red de conductores locales de total confianza, elegidos por nosotros mismos por su profesionalidad, carisma y honestidad.",
                        our: "Nuestra",
                        essence: "Esencia.",
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
                        contact_spain: "Atención en Español",
                        contact_bali: "Soporte Local en Bali",
                        location: "Ubud, Bali • Indonesia",
                        social: "Redes Sociales",
                        rights: "Todos los derechos reservados.",
                        trust_1: "Pago Seguro",
                        trust_2: "Guías Locales Verificados",
                        trust_3: "Apoyo a la comunidad",
                        made_with: "Hecho con",
                        in_bali: "en Bali",
                        policies: "Términos y condiciones",
                        visa_assistance: "Asistencia de Visado"
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
                                name: "Raquel B.",
                                location: "España",
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
                        whatsapp_tooltip: "¡Hola! ¿Hablamos?",
                        whatsapp_message: "Hola Cantik Tours! Me gustaría recibir más información sobre sus tours.",
                        language: "Idioma",
                        reviews_title: "Reseñas",
                        reviews_about: "Sobre",
                        reviews_showing: "Mostrando",
                        reviews_verified: "opiniones verificadas",
                        whatsapp_about: "Hola Cantik Tours! He visto su historia y me gustaría hacer una consulta sobre mi viaje."
                    },
                    reviews_page: {
                        title: "Tu experiencia",
                        title_accent: "importa",
                        subtitle: "Ayúdanos a seguir mejorando y ayuda a otros viajeros a descubrir Bali de forma responsable.",
                        form: {
                            name: "Tu nombre",
                            tour_type: "¿Qué tour realizaste?",
                            rating: "Valoración Global",
                            rating_booking: "Proceso de Reserva",
                            rating_logistics: "Puntualidad y Logística",
                            rating_route: "Ruta e Itinerario",
                            rating_driver: "Conductor / Guía",
                            rating_vehicle: "Estado del Vehículo",
                            rating_price: "Relación Calidad/Precio",
                            driver_name: "¿Quién fue tu conductor?",
                            driver_placeholder: "Ej: Made, Ketut, Gede...",
                            find_us: "¿Cómo nos conociste?",
                            find_us_options: {
                                instagram: "Instagram",
                                google: "Google / Web",
                                recommendation: "Recomendación / Amigos",
                                whatsapp: "Grupos WhatsApp",
                                other: "Otro"
                            },
                            country: "¿Desde dónde nos visitas?",
                            comment: "Tu comentario",
                            comment_placeholder: "Cuéntanos qué fue lo mejor de tu viaje...",
                            ig_user: "Usuario de Instagram (Opcional)",
                            ig_placeholder: "@tuusuario",
                            auth: "Autorizo a Cantik Tours a compartir mi reseña e imágenes en su web y redes sociales.",
                            submit: "Enviar Reseña",
                            success_title: "¡Terima Kasih! (Gracias)",
                            success_text: "Tu reseña ha sido enviada con éxito. Nos ayuda muchísimo a seguir apoyando a las familias locales de Bali.",
                            ig_follow_text: "Síguenos en Instagram para ver más de la vida en Bali",
                            ig_follow_btn: "Seguir a @cantiktours",
                            wsp_groups_text: "Y si quieres seguir conectado con la comunidad, ¡te esperamos en nuestros grupos de WhatsApp!",
                            implicit_consent: "Al enviar, aceptas nuestra política de privacidad.",
                            tours: {
                                ubud_central: "Ubud Central",
                                ubud_north: "Ubud Norte",
                                lovina: "Lovina / Delfines",
                                east: "Este de Bali",
                                lempuyang: "Lempuyang",
                                transfer: "Traslado / Otros",
                                custom: "Tour Personalizado"
                            },
                            countries: {
                                es: "España",
                                mx: "México",
                                ar: "Argentina",
                                cl: "Chile",
                                co: "Colombia",
                                pe: "Perú",
                                us: "Estados Unidos",
                                other: "Otro País"
                            }
                        }
                    },
                    policies_page: {
                        seo_title: "Términos y Condiciones | Cantik Tours Bali",
                        seo_desc: "Consulta los términos y condiciones de servicio de Cantik Tours para asegurar tu mejor experiencia en Bali.",
                        badge: "Cantik Tours Bali",
                        title: "Términos y",
                        title_accent: "Condiciones",
                        intro: "Bienvenido a Cantik Tours. Al realizar una reserva con nosotros, usted acepta los siguientes términos y condiciones, diseñados para garantizar su seguridad y la mejor experiencia en la \"Isla de los Dioses\".",
                        commitment_title: "Compromiso Cantik",
                        commitment_text: "\"En Cantik Tours creemos en un trato justo y humano. Si tienes una situación especial, no dudes en escribirnos por WhatsApp y buscaremos la mejor solución juntos.\"",
                        thanks: "Gracias por elegirnos para descubrir Bali",
                        sections: {
                            s1: {
                                title: "1. PROCESO DE RESERVA Y PAGOS",
                                items: [
                                    { label: "Depósito de Confirmación", text: "Se requiere el pago íntegro o un abono del 30% del total por Tour contratado, pagado al momento de realizar la reserva de forma oficial, para bloquear fechas y servicios." },
                                    { label: "Pago Total", text: "El saldo restante (70% del costo del tour) debe estar liquidado 48 horas antes del inicio del viaje." },
                                    { label: "Métodos de Pago", text: "Aceptamos pagos vía Transferencia Bancaria y Wise. Los gastos por comisiones bancarias o de conversión de divisa corren por cuenta del cliente." }
                                ]
                            },
                            s2: {
                                title: "2. CANCELACIONES Y PUNTUALIDAD",
                                items: [
                                    { label: "Cancelación Gratuita", text: "Si cancelas con más de 24 horas de antelación al inicio del tour, se reembolsará el depósito íntegro." },
                                    { label: "Penalización Parcial", text: "Si cancelas entre 24 y 12 horas antes del inicio, el depósito inicial no será reembolsable (gastos de gestión)." },
                                    { label: "Gastos de Gestión Totales", text: "Las cancelaciones con menos de 12 horas de antelación no tendrán derecho a reembolso del pago total." },
                                    { label: "Tiempo de Espera", text: "El guía/conductor esperará un máximo de 30 minutos en el punto de encuentro. Pasado ese tiempo, sin comunicación por parte del cliente, el servicio se dará por cancelado sin reembolso por \"No Show\" (no presentarse)." },
                                    { label: "Zona Horaria de Referencia", text: "Para el cumplimiento de los plazos de cancelación y avisos, se utilizará el horario local de Bali (WITA - UTC+8), estimando las 8:00 am como hora de referencia para el inicio del conteo de días/horas." }
                                ]
                            },
                            s3: {
                                title: "3. MODIFICACIONES DE ITINERARIO",
                                items: [
                                    { label: "Cambios por el Cliente", text: "Los cambios de fecha se pueden revisar sin costo adicional según disponibilidad. Si solicita un cambio de hotel en la misma zona, no hay cargo. Si el nuevo hotel está en una zona distinta de Bali, podría aplicarse un suplemento por concepto de transporte." },
                                    { label: "Cambios por la Agencia", text: "Debido a condiciones climáticas adversas, ceremonias religiosas imprevistas, tráfico extremo, cierre de templos o de caminos, Cantik Tours se reserva el derecho de ajustar la ruta. Cualquier cambio importante será avisado y consensuado con el cliente." },
                                    { label: "Fuerza Mayor", text: "En caso de desastres naturales (inundaciones, actividad volcánica), priorizaremos su seguridad ofreciendo reagendar el tour o modificar la ruta hacia una zona segura." }
                                ]
                            },
                            s4: {
                                title: "4. ACTIVIDADES DE AVENTURA",
                                content: "Al contratar actividades como rafting, trekking o buceo, el cliente declara y acepta:",
                                items: [
                                    { label: "Asunción de Riesgo", text: "El cliente reconoce que estas actividades implican un riesgo inherente y participa bajo su propia responsabilidad." },
                                    { label: "Estado de Salud", text: "Confirma que no padece afecciones cardíacas, lesiones graves, cirugías recientes o embarazo." },
                                    { label: "Objetos Personales", text: "Cantik Tours no se hace responsable por daños o pérdidas de objetos electrónicos (móviles, cámaras) durante las actividades." }
                                ]
                            },
                            s5: {
                                title: "5. RESPONSABILIDAD Y SEGUROS",
                                items: [
                                    { label: "Seguro de Viaje", text: "Cantik Tours recomienda encarecidamente contar con un seguro de viaje internacional. Cada viajero es responsable de su propia integridad física." },
                                    { label: "Vuelos", text: "No gestionamos vuelos internacionales; la puntualidad para el inicio del tour es responsabilidad exclusiva del cliente." }
                                ]
                            },
                            s6: {
                                title: "6. RESPETO CULTURAL",
                                items: [
                                    { label: "Comportamiento", text: "Se exige respeto absoluto a las tradiciones y códigos de vestimenta en los templos de Bali. Nos reservamos el derecho de finalizar el servicio ante conductas irrespetuosas." }
                                ]
                            },
                            s7: {
                                title: "7. USO DE IMAGEN",
                                items: [
                                    { label: "Uso de Imagen", text: "Al finalizar el tour, solicitaremos completar una encuesta de satisfacción. En ella, el cliente podrá señalar expresamente si autoriza o no el uso de su nombre, imágenes y/o videos en nuestras redes sociales." }
                                ]
                            },
                            s8: {
                                title: "8. INCIDENCIAS Y RECLAMACIONES",
                                items: [
                                    { label: "Durante el tour", text: "Con el fin de ofrecer una solución inmediata, cualquier disconformidad con el servicio deberá comunicarse en el momento a nuestro equipo de soporte. Esto nos permite actuar en tiempo real para mejorar su experiencia." },
                                    { label: "Post-tour", text: "Si desea realizar una reclamación formal tras el servicio, dispone de un plazo máximo de 24 horas desde la finalización del tour. Este margen es esencial para que podamos investigar lo sucedido con nuestro equipo local y ofrecer una resolución precisa y objetiva." },
                                    { label: "Ley Aplicable", text: "Este contrato se rige bajo las leyes vigentes de la República de Indonesia." }
                                ]
                            }
                        }
                    },
                    visa_page: {
                        seo_title: "Asistencia de Visado Indonesia | Cantik Tours",
                        seo_desc: "Gestión paso a paso de tu visa B1 o C1 para Indonesia. Videollamada personalizada, optimización de documentos y garantía de pago.",
                        hero: {
                            badge: "Servicio Premium",
                            title_1: "Tu Visado a Indonesia",
                            title_2: "sin complicaciones",
                            subtitle: "Te ayudamos paso a paso en una videollamada personalizada para gestionar tu visa B1 o C1. Evita errores, formatos incorrectos y pagos rechazados.",
                            btn_whatsapp: "Quiero agendar mi cita por WhatsApp",
                            btn_types: "Ver tipos de Visa B1 / C1"
                        },
                        why: {
                            title: "¿Por qué hacerlo con nosotros?",
                            subtitle: "Evita dolores de cabeza con expertos.",
                            reason1: {
                                title: "Acompañamiento Real",
                                text: "Llenamos el formulario contigo en vivo por videollamada. Resolvemos dudas al instante y evitamos la barrera del idioma."
                            },
                            reason2: {
                                title: "Optimización de Archivos",
                                text: "Ajustamos tus fotos y pasaporte a los requisitos exactos del sistema para asegurar una solicitud impecable."
                            },
                            reason3: {
                                title: "Cero Estrés de Pago",
                                text: "Realizamos el pago de la visa con una tarjeta local, evitando el común rechazo de tarjetas extranjeras."
                            }
                        },
                        security: {
                            title: "Seguridad y Responsabilidad",
                            subtitle: "Tu tranquilidad es nuestra prioridad. Transparencia total.",
                            item1: {
                                title: "Privacidad Garantizada",
                                text: "Los documentos se reciben por WhatsApp y se borran en tiempo real frente a ti antes de colgar la llamada."
                            },
                            item2: {
                                title: "Control del Cliente",
                                text: "Creamos la cuenta con tu correo y clave para que mantengas la propiedad absoluta del trámite."
                            },
                            item3: {
                                title: "Responsabilidad Compartida",
                                text: "Validamos juntos los datos. Tú tienes la última palabra antes del envío final y la aprobación depende del gobierno indonesio."
                            }
                        },
                        times: {
                            title: "Tiempos y Entrega",
                            b1: {
                                title: "Visa B1 (Turismo General)",
                                text: "Suele llegar casi al instante a tu correo electrónico tras el pago."
                            },
                            c1: {
                                title: "Visa C1 (Turismo Larga Estancia)",
                                text: "El tiempo estimado de respuesta de Inmigración es de 5 a 10 días hábiles."
                            },
                            completion: "Nuestro servicio de asesoría concluye una vez realizado el pago de la tasa oficial en la plataforma."
                        },
                        pricing: {
                            title: "Tarifas y Reserva",
                            label: "Gestión",
                            plus_visa: "+ Costo Visa",
                            disclaimer: "El importe total se abona por adelantado (vía Wise o Transferencia) para la reserva de la cita técnica.",
                            btn: "Agendar por WhatsApp"
                        },
                        whatsapp_message: "Hola Cantik Tours! Tengo dudas sobre los visados, ¿me podéis ayudar?",
                        it_support: "¡Oferta Exclusiva! Si reservas un tour con nosotros posteriormente, te aplicaremos un descuento especial en tu reserva.",
                        commitment: {
                            title: "Compromiso Cantik",
                            text: "Tratamos tus datos con total seguridad y confidencialidad. Nuestra reputación se basa en la confianza y el servicio personalizado."
                        },
                        checklist: {
                            title: "Requisitos Previos",
                            subtitle: "Reúne estos documentos en formato digital (foto o PDF) antes de nuestra videollamada.",
                            common: "Para todas las visas:",
                            b1: "Específico para Visa B1 (Turismo - 60 días):",
                            c1: "Específico para Visa C1 (Larga Estancia - 180 días):",
                            item_passport: "Foto a color de la página de datos de tu pasaporte (vigencia mínima de 6 meses).",
                            item_photo: "Fotografía tipo carnet (fondo liso y claro, a color, sin gafas).",
                            item_date: "Fecha prevista de tu entrada a Indonesia.",
                            item_hotel: "Nombre o dirección de tu alojamiento en Indonesia para los primeros días.",
                            item_contact: "Correo electrónico personal y número de WhatsApp activo.",
                            item_ticket: "Boleto de salida de Indonesia. Si no tienes o no sabes cuándo saldrás, te ayudamos a crear un boleto temporal (Onward Ticket).",
                            item_bank: "Cartola o extracto bancario de los últimos 3 meses que acredite solvencia."
                        },
                        form: {
                            title: "Agenda tu videollamada",
                            subtitle: "Reserva tu espacio de asesoría técnica de 10:00 a 14:00 (Hora España).",
                            name: "Nombre Completo",
                            visa_type: "Tipo de visa a tramitar",
                            visa_b1: "Visa B1 (Turismo de 1 a 60 días)",
                            visa_c1: "Visa C1 (Turismo de 1 a 180 días)",
                            date: "Día de la cita",
                            time: "Hora de la cita",
                            btn: "Enviar solicitud por WhatsApp",
                            success: "¡Solicitud generada! Te redirigiremos a WhatsApp para confirmar la cita.",
                            message_template: "Hola Cantik Tours!\n\nMe gustar\u00eda agendar una videollamada para tramitar mi visado a Indonesia.\n\n\uD83D\uDC64 *Nombre:* {{name}}\n\uD83D\uDEC2 *Tipo de Visa:* {{type}}\n\uD83D\uDCC5 *D\u00eda:* {{date}}\n\u23F0 *Hora:* {{time}} (Hora de Espa\u00f1a)\n\n\u00BFMe confirm\u00E1is disponibilidad? \u00A1Gracias!"
                        }
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        home: "Home",
                        tours: "Explore Tours",
                        guide: "Bali Guide 2026",
                        view_guide: "View Bali Guide 2026",
                        contact: "Talk to us",
                        about: "About Us",
                        expert_choice: "Expert's Choice",
                        visa_assistance: "Visa Assistance"
                    },
                    hero: {
                        badge: "Premium Experiences in Indonesia.",
                        title_1: "Don't just visit Bali.",
                        title_2: "Live it.",
                        subtitle: "Uncover the island's true soul through the eyes of those who call it home — a personalized, honest journey designed just for you.",
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
                        per_car: "Price per car (1-4 people)",
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
                            naturaleza: "Nature",
                            traslados: "Transfers"
                        },
                        badge: "Choose your own adventure"
                    },
                    cta: {
                        title: "Ready to live Bali like a local?",
                        subtitle: "Book today and experience the Bali you've always dreamed of with expert guides.",
                        btn_availability: "See All Tours",
                        btn_guide: "View Bali Guide 2026",
                        btn_whatsapp: "Direct WhatsApp",
                        general_inquiry: "General Inquiry"
                    },
                    seo: {
                        home: {
                            title: "Private Bali Tours | Cantik Tours",
                            description: "Local travel agency in Bali with Spanish and English speaking guides. Private tours, flexible itineraries and authentic experiences.",
                            keywords: "bali tours, spanish guides bali, bali tourism, trip to bali, private bali tours, cantiktours"
                        },
                        about: {
                            title: "About Us | Cantik Tours Bali",
                            description: "Get to know the story behind Cantik Tours."
                        },
                        reviews: {
                            title: "Share your Experience | Cantik Tours",
                            description: "Tell us about your tour in Bali. Your review helps us grow."
                        }
                    },
                    detail: {
                        itinerary: "Itinerary",
                        description: "Description",
                        included: "Included",
                        not_included: "Not included",
                        reviews: "Reviews",
                        book_now: "Check Availability",
                        share: "Share",
                        duration: "Duration",
                        private: "Private",
                        private_label: "Exclusive Tour",
                        rating: "Rating",
                        availability: "Availability",
                        availability_label: "Year-round",

                        per_person: "/ person",
                        not_included_msg: "Tickets and meals not included",
                        view_details: "View details",
                        view_details_short: "Details",
                        booking_title: "RESERVE YOUR TRIP",
                        booking_date: "Travel Date",
                        booking_pax: "Group Size",
                        booking_hotel: "Location / Hotel",
                        booking_hotel_placeholder: "e.g., Maya Ubud Resort",
                        booking_submit: "Confirm and send",
                        booking_payment_info: "Pay 100% upfront or 30% as a deposit. Rest is due 48h before.",
                        booking_pax_1: "1 Person",
                        booking_pax_2: "2 People",
                        booking_pax_3: "3 People",
                        booking_pax_4: "4 People",
                        booking_pax_5: "5 People",
                        booking_pax_6: "6 People",
                        booking_pax_7: "7 People",
                        booking_pax_8: "8 People",
                        booking_pax_9: "9 People",
                        booking_pax_10: "10 People",
                        booking_pax_11: "11 People",
                        booking_pax_12: "12 People",
                        booking_pax_more: "More than 12 people",
                        coupon: "Do you have a coupon?",
                        coupon_placeholder: "Enter code",
                        msg_greeting: "Hi Cantik Tours!",
                        msg_intro: "I would like to book an activity:",
                        msg_tour: "Tour",
                        msg_date: "Date",
                        msg_pax: "Passengers",
                        msg_hotel: "Hotel/Area",
                        msg_coupon: "Coupon",
                        msg_confirm: "Can you confirm availability? Thanks!",
                        faq_intro: "The questions our travelers always ask us:",
                        availability_disclaimer: "We will confirm the availability of the chosen language directly via WhatsApp.",
                        error_language_required: "Please select a language to continue.",
                        booking_experience: "Service Type",
                        exp_economy_title: "Private Transport",
                        exp_economy_sub: "Local Driver (English language)",
                        exp_economy_desc: "Standard or superior vehicle. Your driver takes you safely, while you explore at your own pace.",
                        exp_economy_price_label: "",
                        exp_comfort_title: "English Guide",
                        exp_comfort_sub: "Certified local guide (English language)",
                        exp_comfort_desc: "Superior vehicle. Discover the deep history of Bali with an expert by your side.",
                        exp_comfort_price_label: "",
                        exp_elite_title: "SPANISH GUIDE 💎",
                        exp_elite_sub: "Certified local guide (Spanish language)",
                        exp_elite_desc: "Maximum comfort and complete accompaniment without language barriers.",
                        exp_elite_warning: "⚠️ High demand for Spanish guides. We will confirm availability with priority.",
                        exp_elite_price_label: "",
                        price_special: "From",
                        transfer_title: "BOOK YOUR TRANSFER",
                        transfer_type: "Route",
                        transfer_type_placeholder: "Select route",
                        transfer_route_1: "Airport → Ubud",
                        transfer_route_2: "Ubud → Airport",
                        transfer_route_3: "Ubud → Padangbai Harbor",
                        transfer_route_4: "Padangbai Harbor → Ubud",
                        transfer_route_5: "Ubud → Sanur Harbor",
                        transfer_route_6: "Sanur Harbor → Ubud",
                        transfer_route_7: "Airport → Padangbai Harbor",
                        transfer_route_8: "Padangbai Harbor → Airport",
                        transfer_route_other: "Other route",
                        transfer_time: "Pickup Time",
                        transfer_flight: "Flight / Boat Number",
                        transfer_flight_placeholder: "Optional (to monitor delays)",
                        transfer_bags: "Number of bags",
                        transfer_submit: "Request Quote",
                        msg_transfer_intro: "Hi Cantik Tours! I need a transfer:",
                        msg_transfer_type: "Route",
                        msg_transfer_time: "Time",
                        msg_transfer_flight: "Flight/Boat",
                        msg_transfer_bags: "Bags",
                        msg_transfer_pax: "Passengers",

                        // New Detail enhancements
                        packing_list: "What to bring",
                        important_info: "Important Information",
                        faq_title: "Frequently Asked Questions",
                        faq_packing_q: "What should I bring to the tour?",
                        faq_info_q: "Important information about the tour",
                        fair_payment_title: "Conscious Payment",
                        fair_payment_desc: "Your booking allows you to pay 100% up to 48h before the tour. With this system, we ensure fair treatment for the local team from minute one, fostering responsible tourism that directly supports Balinese families.",
                        view_full_route: "View the real route on Google Maps",
                        benefits: {
                            private: "100% Private",
                            flexible: "Totally Flexible",
                            no_rush: "No Rush",
                            flexibility_title: "Entry Fee Flexibility",
                            flexibility_desc: "You decide where to go. We don't include entry fees to give you total freedom to change plans on the fly. If you prefer us to manage them, we can help (ask for pricing).",
                            cancellation_title: "Cancellation Policy",
                            cancellation_desc: "Free cancellation up to 24h before the tour. No complicated deposits."
                        },
                        items: {
                            shoes: "Comfortable shoes",
                            sunscreen: "Sunscreen",
                            camera: "Camera / Phone",
                            swimwear: "Swimwear & towel",
                            sarong: "Sarong (provided at temples)",
                            money: "Local cash (IDR)"
                        }
                    },
                    guide: {
                        badge: "Bali Guide 2026",
                        title: "Bali Guide",
                        title_accent: "2026",
                        subtitle: "Everything you need to know before landing in the \"Island of the Gods\".",
                        chapters: {
                            c1: { title: "Preparations", subtitle: "Before taking off" },
                            c2: { title: "The Weather", subtitle: "When to travel?" },
                            c3: { title: "Accommodation", subtitle: "Where to stay" },
                            c4: { title: "Mobility", subtitle: "How to get around" },
                            c5: { title: "Money", subtitle: "Cards and ATMs" },
                            c6: { title: "Culture", subtitle: "Bali Experience" }
                        },
                        sections: {
                            visa: {
                                title: "🛂 Visa & Entry",
                                intro: "To make your arrival in the \"Country of 17,000 islands\" perfect, check these essential requirements:",
                                b1: {
                                    title: "Visa B1 - Tourism (30-60 days)",
                                    points: [
                                        "Cost: 500,000 IDR (approx. $35) per 30 days.",
                                        "Duration: 30 days, extendable once (max 60).",
                                        "Process: Online (e-VoA) or on arrival (VoA).",
                                        "Requirement: Passport (>6 months) and exit ticket."
                                    ]
                                },
                                c1: {
                                    title: "Visa C1 - Long Stay (180 days)",
                                    points: [
                                        "Cost: 1,000,000 IDR (approx. $65) every 60 days.",
                                        "Process: Only Online (evisa.imigrasi.go.id).",
                                        "Requirement: Bank statement (>2000 USD)."
                                    ]
                                },
                                ecd: {
                                    ecd_title: "🎟️ Fees & Customs (Mandatory)",
                                    ecd_text: "All foreigners must pay the Bali Levy (150,000 IDR) on Love Bali and fill out the customs declaration (ECD) online 48h before the flight.",
                                    ecd_tip: "Tip: Have your QR codes ready on your mobile to avoid queues."
                                }
                            },
                            weather: {
                                title: "🌤️ Weather",
                                months_title: "Monthly Summary",
                                intro: "Bali enjoys a constant tropical climate (26-30°C).",
                                dry: { title: "Dry (Apr-Oct)", desc: "Guaranteed sun and low humidity. Best time for beaches and diving." },
                                rainy: { title: "Rainy (Nov-Mar)", desc: "Intense greenery and fewer crowds. Heavy but brief rains." },
                                dry_best: "Top Season", dry_best_desc: "July and August (Perfect weather but crowded)",
                                perfect: "Ideal Months", perfect_desc: "April, May, June and September (Best balance)",
                                transition: "Transition", transition_desc: "March and October (Variable weather)",
                                rainy: "Pure Rain", rainy_desc: "January and February (High humidity and constant rain)"
                            },
                            stay: {
                                title: "🏠 Accommodation",
                                intro: "From mystic rice fields to infinite cliffs. Choose your base based on the vibe you're looking for:",
                                areas: [
                                    { area: "Ubud", title: "Cultural Heart", desc: "Amidst rice fields, temples, and yoga. Perfect for spiritual connection." },
                                    { area: "Uluwatu", title: "Surf & Luxury Vibe", desc: "Breathtaking cliffs and the best sunsets on the island." },
                                    { area: "Canggu", title: "Aesthetic Lifestyle", desc: "Beach clubs, modern cafes, and vibrant nightlife." },
                                    { area: "Sanur", title: "Family Peace", desc: "Calm waters and unique sunrises. Ideal for families or relaxed stays." }
                                ],
                                booking_agoda: "Tip: Booking and Agoda are the kings here. Always compare!"
                            },
                            mobility: {
                                title: "🛵 Mobility",
                                intro: "Getting around Bali is an adventure in itself. Here are the key tools:",
                                apps: [
                                    { title: "Internet & eSIM", desc: "Use Airalo (eSIM) or buy a local SIM from Telkomsel to be connected from minute one." },
                                    { title: "Grab & Gojek", desc: "The 'Uber' of Asia. Use it for cars, bikes, and food (GoFood). Link your card and forget cash." },
                                    { title: "Google Maps", desc: "Always use 'car' mode even if on a bike to avoid dangerous or impassable routes." }
                                ],
                                transport: [
                                    { title: "Scooter (Moto)", desc: "Total freedom, but only for experts. Helmet mandatory and watch out for police.", tip: "Always carry International Driving Permit (IDP)" },
                                    { title: "Private Driver", desc: "The Cantik option. Comfort, AC, and local knowledge without stress.", highlight: "Recommended for full-day tours" }
                                ]
                            },
                            money: {
                                title: "💰 Money",
                                intro: "The currency is the Rupiah (IDR). Cash is vital outside tourist areas.",
                                tips: [
                                    { title: "Physical Card!", desc: "ATMs don't have contactless. Without the physical card, you can't withdraw money. Carry at least two." },
                                    { title: "Safe ATMs", desc: "Only use ATMs inside banks or supermarkets (Indomaret) to avoid skimming." },
                                    { title: "Currency Exchange", desc: "Your bills must be pristine. Only exchange at official places like BMC." }
                                ],
                                budget_title: "Reference Budget",
                                budget: [
                                    { concept: "Warung Meal", price: "$3 - $8 pax" },
                                    { concept: "Beer / Coffee", price: "$2 - $5" }
                                ]
                            },
                            culture: {
                                title: "⛩️ Culture",
                                intro: "Bali is the 'Island of the Gods'. Respect for their traditions is paramount.",
                                food: {
                                    food_title: "🍱 Must-Try Gastronomy",
                                    food_text: "You must try: Nasi Goreng (rice), Mie Goreng (noodles), Satay (skewers), Gado-Gado (vegetarian), and Babi Guling (roast pig)."
                                },
                                phrases: {
                                    dict_title: "🗣️ Pocket Dictionary",
                                    dict_items: [
                                        "Halo: Hello | Terima kasih: Thank you | Sama-sama: You're welcome.",
                                        "Tolong: Please | Tidak pedas: Not spicy | Berapa?: How much is it?"
                                    ]
                                },
                                rules_title: "💡 Golden Rules",
                                rules: [
                                    { label: "Travel Insurance", text: "Mandatory. Private healthcare is excellent but very expensive without insurance." },
                                    { label: "Bali Belly", text: "Never drink tap water. Use hand sanitizer frequently." },
                                    { label: "Temples", text: "Cover your shoulders and legs (Sarong). Never step on offerings on the ground." },
                                    { label: "Respect", text: "Do not touch locals' heads and use your right hand to give/receive." }
                                ]
                            }
                        },
                        cta_title: "Ready to live your own story?",
                        cta_text: "Now that you know the secrets, it's time to live them. Join Cantik Tours and feel the true magic.",
                        cta_btn_tours: "See Experiences",
                        cta_btn_wsp: "Talk to us",
                    },
                    why: {
                        title: "Why Cantik Tours?",
                        subtitle: "We are not a mass-market agency. We are locals specialized in creating memories that last a lifetime.",
                        reason1: { title: "Local Culture Experts", text: "We don't just take you there, we immerse you. Our entire team shares the same passion for explaining the 'why' of every tradition, temple, and landscape." },
                        reason2: { title: "Uncompromising Comfort", text: "Premium, air-conditioned vehicles with all the facilities to make Bali a pleasure from start to finish." },
                        reason4: { title: "Conscious Tourism", text: "When you book, you ensure fair and immediate payment to our local team, directly supporting Balinese families." }
                    },
                    features: {
                        title: "Details that make a",
                        title_accent: "difference",
                        subtitle: "We don't just care about where you go, but how you feel at every mile along the way.",
                        wifi: { title: "On-board WiFi*", text: "Share your moments instantly as you travel across the island." },
                        water: { title: "Hydration", text: "Always cold water available to beat Bali's tropical sun." },
                        car: { title: "Total Freedom", text: "Spacious and clean cars. You decide when to stop and when to keep moving." },
                        food: { title: "Real Gastronomy", text: "Discover the most authentic flavors of Bali and the essence of Indonesia in the hidden gems where locals actually enjoy eating." }
                    },
                    about: {
                        tag: "Cantik Philosophy",
                        title: "Travel at your own pace",
                        meaning_title: "What does Cantik mean?",
                        meaning_text: "In Indonesian, Cantik (pronounced Chantik) means beautiful. But for us, the beauty of Bali is not just in its postcards. It is also in the devotion of a morning offering, in the smile of a farmer, and in the peace you feel when understanding our culture. We want every moment of your trip to be, simply, Cantik.",
                        authority_subtitle: "Local agency in Bali specialized in private tours and personalized attention in Spanish and English.",
                        trust_local_title: "100% Local Agency",
                        trust_local_desc: "No international intermediaries. We operate directly from Bali, supporting the local economy.",
                        trust_direct_title: "Direct Contact",
                        trust_direct_desc: "We design your trip ourselves, no call centers or automated responses.",
                        trust_boutique_title: "No Crowds",
                        trust_boutique_desc: "We flee from full buses. Only private experiences to guarantee quality.",
                        cta_emotional_title: "Can you imagine your trip like this?",
                        cta_emotional_text: "Far from the conventional. Close to the authentic magic of Bali.",
                        cta_emotional_btn: "Let's talk on WhatsApp",

                        impact_title: "Your trip creates impact",
                        impact_desc: "Every booking funds our drivers and their families directly, through prompt and fair payments.",

                        team_intro_title: "The Team",
                        team_intro_text: "No rush, safely, and in your language.",
                        perty_name: "Perty",
                        perty_role: "Founder",
                        local_experts: "Local Experts",
                        perty_title: "Perty (Founder)",
                        perty_text_1: "With a Master's degree in Education and a lifetime dedicated to teaching, I have had the honor of representing our culture in various countries as an Indonesian language teacher. Today, my true passion is being your personal connection to the soul of Bali.",
                        perty_text_2: "For me, guiding you is not just following an itinerary; it's about inviting you to feel the mysticism of our temples, the devotion of the rituals, and those secret spots we only share with those who visit us with an open heart. My greatest wish is for you to experience this island with the same respect and profound love with which I call it home.",
                        javi_title: "Javi (Your Link & Logistics)",
                        javi_role: "Logistics & Link",
                        javi_text: "A lifelong traveler and deeply in love with Bali, my mission at Cantik is to be your direct and reliable bridge to the island. I oversee every detail of your itinerary to ensure it's flawless and handle any questions you may have along the way. I am here so you can step away from the logistics and focus entirely on the experience, with the peace of mind that comes from knowing someone is always by your side to ensure everything flows without any issues.",
                        promise_title: "",
                        promise_text: "To ensure you always have the best experience, we have a network of fully trusted local drivers, personally selected by us under the same standards of warmth and safety that define us.",

                        meet_team_title: "Our Guides",
                        team_reinforced_text: "To ensure you always have the best experience, we work with a network of fully trusted local drivers, chosen by ourselves for their professionalism, charisma, and honesty.",
                        our: "Our",
                        essence: "Essence.",
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
                        contact_spain: "Spanish Support",
                        contact_bali: "Local Bali Support",
                        location: "Ubud, Bali • Indonesia",
                        social: "Social",
                        rights: "All rights reserved.",
                        trust_1: "Secure Payment",
                        trust_2: "Verified Local Guides",
                        trust_3: "Personalized Support",
                        made_with: "Made with",
                        in_bali: "from Bali",
                        policies: "Terms and Conditions",
                        visa_assistance: "Visa Assistance"
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
                                name: "Raquel B.",
                                location: "Spain",
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
                        whatsapp_tooltip: "Hi! Shall we talk?",
                        whatsapp_message: "Hi Cantik Tours! I would like to receive more information about your tours.",
                        language: "Language",
                        reviews_title: "Reviews",
                        reviews_about: "About",
                        reviews_showing: "Showing",
                        reviews_verified: "verified reviews",
                        whatsapp_about: "Hi Cantik Tours! I've seen your story and would like to ask you a question about my trip."
                    },
                    reviews_page: {
                        title: "Your experience",
                        title_accent: "matters",
                        subtitle: "Help us keep improving and help other travelers discover Bali responsibly.",
                        form: {
                            name: "Your name",
                            tour_type: "Which tour did you take?",
                            rating: "Overall Rating",
                            rating_booking: "Booking Process",
                            rating_logistics: "Punctuality & Logistics",
                            rating_route: "Route & Itinerary",
                            rating_driver: "Driver / Guide",
                            rating_vehicle: "Vehicle Condition",
                            rating_price: "Value for Money",
                            driver_name: "Who was your driver?",
                            driver_placeholder: "Ex: Made, Ketut, Gede...",
                            find_us: "How did you find us?",
                            find_us_options: {
                                instagram: "Instagram",
                                google: "Google / Web",
                                recommendation: "Recommendation",
                                whatsapp: "WhatsApp Groups",
                                other: "Other"
                            },
                            country: "Where are you visiting from?",
                            comment: "Your comment",
                            comment_placeholder: "Tell us what was the best part of your trip...",
                            ig_user: "Instagram Username (Optional)",
                            ig_placeholder: "@youruser",
                            auth: "I authorize Cantik Tours to share my review and images on their website and social media.",
                            submit: "Submit Review",
                            success_title: "Terima Kasih! (Thank you)",
                            success_text: "Your review has been successfully submitted. It helps us a lot to continue supporting local families in Bali.",
                            ig_follow_text: "Follow us on Instagram to see more of life in Bali",
                            ig_follow_btn: "Follow @cantiktours",
                            wsp_groups_text: "And if you want to stay connected with the community, we'll see you in our WhatsApp groups!",
                            implicit_consent: "By submitting, you agree to our privacy policy.",
                            tours: {
                                ubud_central: "Ubud Central",
                                ubud_north: "Ubud North",
                                lovina: "Lovina / Dolphins",
                                east: "East Bali",
                                lempuyang: "Lempuyang",
                                transfer: "Transfer / Other",
                                custom: "Custom Tour"
                            },
                            countries: {
                                es: "Spain",
                                mx: "Mexico",
                                ar: "Argentina",
                                cl: "Chile",
                                co: "Colombia",
                                pe: "Peru",
                                us: "USA",
                                other: "Other Country"
                            }
                        }
                    },
                    policies_page: {
                        seo_title: "Terms and Conditions | Cantik Tours Bali",
                        seo_desc: "Consult Cantik Tours' terms and conditions of service to ensure your best experience in Bali.",
                        badge: "Cantik Tours Bali",
                        title: "Terms and",
                        title_accent: "Conditions",
                        intro: "Welcome to Cantik Tours. By making a booking with us, you agree to the following terms and conditions, designed to ensure your safety and the best experience in the \"Island of the Gods\".",
                        commitment_title: "Cantik Commitment",
                        commitment_text: "\"At Cantik Tours, we believe in fair and human treatment. If you have a special situation, do not hesitate to write to us on WhatsApp and we will find the best solution together.\"",
                        thanks: "Thank you for choosing us to discover Bali",
                        sections: {
                            s1: {
                                title: "1. BOOKING PROCESS AND PAYMENTS",
                                items: [
                                    { label: "Confirmation Deposit", text: "Full payment or a 30% deposit of the total per booked Tour is required at the time of booking to officially block dates and services." },
                                    { label: "Total Payment", text: "The remaining balance (70% of the tour cost) must be settled 48 hours before the start of the trip." },
                                    { label: "Payment Methods", text: "We accept payments via Bank Transfer and Wise. Costs for bank commissions or currency conversion are the responsibility of the client." }
                                ]
                            },
                            s2: {
                                title: "2. CANCELLATIONS AND PUNCTUALITY",
                                items: [
                                    { label: "Free Cancellation", text: "If you cancel more than 48 hours before the start of the tour, the full deposit will be refunded." },
                                    { label: "Partial Penalty", text: "If you cancel between 48 and 24 hours before the start, the €20 deposit will not be refundable (management fees)." },
                                    { label: "Total Management Fees", text: "Cancellations less than 24 hours before will not be entitled to a refund of the total payment." },
                                    { label: "Waiting Time", text: "The guide/driver will wait a maximum of 30 minutes at the meeting point. After that time, without communication from the client, the service will be canceled without a refund due to \"No Show\" (non-appearance)." },
                                    { label: "Reference Time Zone", text: "For the fulfillment of cancellation deadlines and notices, Bali local time (WITA - UTC+8) will be used, with 8:00 am as the reference time for the start of the day/hour count." }
                                ]
                            },
                            s3: {
                                title: "3. ITINERARY MODIFICATIONS",
                                items: [
                                    { label: "Changes by the Client", text: "Date changes can be reviewed at no additional cost subject to availability. If you request a hotel change in the same area, there is no charge. If the new hotel is in a different area of Bali, a transport supplement might apply." },
                                    { label: "Changes by the Agency", text: "Due to adverse weather conditions, unforeseen religious ceremonies, extreme traffic, temple or road closures, Cantik Tours reserves the right to adjust the route. Any important change will be notified and agreed upon with the client." },
                                    { label: "Force Majeure", text: "In case of natural disasters (floods, volcanic activity), we will prioritize your safety by offering to reschedule the tour or modify the route to a safe zone." }
                                ]
                            },
                            s4: {
                                title: "4. ADVENTURE ACTIVITIES",
                                content: "By hiring activities such as rafting, trekking, or diving, the client declares and accepts:",
                                items: [
                                    { label: "Assumption of Risk", text: "The client recognizes that these activities involve an inherent risk and participates under their own responsibility." },
                                    { label: "Health Status", text: "Confirms that they do not suffer from heart conditions, serious injuries, recent surgeries, or pregnancy." },
                                    { label: "Personal Belongings", text: "Cantik Tours is not responsible for damage or loss of electronic objects (mobiles, cameras) during activities." }
                                ]
                            },
                            s5: {
                                title: "5. RESPONSIBILITY AND INSURANCE",
                                items: [
                                    { label: "Travel Insurance", text: "Cantik Tours strongly recommends having international travel insurance. Each traveler is responsible for their own physical integrity." },
                                    { label: "Flights", text: "We do not manage international flights; punctuality for the start of the tour is the client's exclusive responsibility." }
                                ]
                            },
                            s6: {
                                title: "6. CULTURAL RESPECT",
                                items: [
                                    { label: "Behavior", text: "Absolute respect for traditions and dress codes in Bali temples is required. We reserve the right to end the service in case of disrespectful behavior." }
                                ]
                            },
                            s7: {
                                title: "7. IMAGE USE",
                                items: [
                                    { label: "Image Use", text: "Upon completion of the tour, we will request you to fill out a satisfaction survey. In it, the client may expressly indicate whether or not they authorize the use of their name, images and/o videos on our social networks." }
                                ]
                            },
                            s8: {
                                title: "8. INCIDENTS AND CLAIMS",
                                items: [
                                    { label: "During the tour", text: "In order to offer an immediate solution, any dissatisfaction with the service must be communicated at the time to our support team. This allows us to act in real time to improve your experience." },
                                    { label: "Post-tour", text: "If you wish to make a formal claim after the service, you have a maximum period of 24 hours from the end of the tour. This margin is essential for us to investigate what happened with our local team and offer a precise and objective resolution." },
                                    { label: "Applicable Law", text: "This contract is governed by the current laws of the Republic of Indonesia." }
                                ]
                            }
                        }
                    },
                    visa_page: {
                        seo_title: "Indonesia Visa Assistance | Cantik Tours",
                        seo_desc: "Step-by-step management of your B1 or C1 visa for Indonesia. Personalized video call, document optimization, and payment guarantee.",
                        hero: {
                            badge: "Premium Service",
                            title_1: "Your Indonesia Visa",
                            title_2: "without complications",
                            subtitle: "We help you step-by-step in a personalized video call to manage your B1 or C1 visa. Avoid errors, incorrect formats, and rejected payments.",
                            btn_whatsapp: "I want to schedule my appointment via WhatsApp",
                            btn_types: "See Visa B1 / C1 types"
                        },
                        why: {
                            title: "Why do it with us?",
                            subtitle: "Pain points solved with experts.",
                            reason1: {
                                title: "Real Accompaniment",
                                text: "We fill out the form with you live via video call. We resolve doubts instantly and avoid the language barrier."
                            },
                            reason2: {
                                title: "File Optimization",
                                text: "We adjust your photos and passport to the exact system requirements to ensure a flawless application."
                            },
                            reason3: {
                                title: "Zero Payment Stress",
                                text: "We pay for the visa using a local card, avoiding common foreign card rejections."
                            }
                        },
                        security: {
                            title: "Security and Responsibility",
                            subtitle: "Your peace of mind is our priority. Total transparency.",
                            item1: {
                                title: "Privacy Guaranteed",
                                text: "Documents are received via WhatsApp and deleted in real-time in front of you before ending the call."
                            },
                            item2: {
                                title: "Client Control",
                                text: "We create the account with your email and password so you maintain absolute ownership of the process."
                            },
                            item3: {
                                title: "Shared Responsibility",
                                text: "We validate data together. You have the final word before submission, and approval depends on the Indonesian government."
                            }
                        },
                        times: {
                            title: "Times and Delivery",
                            b1: {
                                title: "Visa B1 (General Tourism)",
                                text: "It usually arrives almost instantly to your email after payment."
                            },
                            c1: {
                                title: "Visa C1 (Extended Stay Tourism)",
                                text: "The estimated response time from Immigration is 5 to 10 business days."
                            },
                            completion: "Our advisory service concludes once the official government fee has been paid on the platform."
                        },
                        pricing: {
                            title: "Fees and Booking",
                            label: "Management",
                            plus_visa: "+ Visa Cost",
                            disclaimer: "The total amount is paid in advance (via Wise or Transfer) to reserve the technical appointment.",
                            btn: "Schedule via WhatsApp"
                        },
                        whatsapp_message: "Hi Cantik Tours! I have questions about the visas, can you help me?",
                        it_support: "Exclusive Offer! If you later book a tour with us, we will apply a special discount to your reservation.",
                        commitment: {
                            title: "Cantik Commitment",
                            text: "We handle your data with full security and confidentiality. Our reputation is built on trust and personalised service."
                        },
                        checklist: {
                            title: "Prerequisites",
                            subtitle: "Gather these documents in digital format (photo or PDF) before our video call.",
                            common: "For all visas:",
                            b1: "Specific for Visa B1 (Tourism - 60 days):",
                            c1: "Specific for Visa C1 (Long Stay - 180 days):",
                            item_passport: "Color photo of your passport's data page (minimum validity of 6 months).",
                            item_photo: "Passport-style photograph (clear plain background, color, no glasses).",
                            item_date: "Expected date of entry into Indonesia.",
                            item_hotel: "Name or address of your accommodation in Indonesia for the first few days.",
                            item_contact: "Personal email and active WhatsApp number.",
                            item_ticket: "Exit ticket from Indonesia. If you don't have one or don't know when you will leave, we help you create a temporary ticket (Onward Ticket).",
                            item_bank: "Bank statement from the last 3 months proving solvency."
                        },
                        form: {
                            title: "Schedule your video call",
                            subtitle: "Book your technical assistance slot from 10:00 to 14:00 (Spain Time).",
                            name: "Full Name",
                            visa_type: "Visa type to process",
                            visa_b1: "Visa B1 (Tourism 1 to 60 days)",
                            visa_c1: "Visa C1 (Tourism 1 to 180 days)",
                            date: "Appointment Day",
                            time: "Appointment Time",
                            btn: "Send request via WhatsApp",
                            success: "Request generated! You will be redirected to WhatsApp to confirm the appointment.",
                            message_template: "Hi Cantik Tours!\n\nI would like to schedule a video call to process my Indonesia visa.\n\n\uD83D\uDC64 *Name:* {{name}}\n\uD83D\uDEC2 *Visa Type:* {{type}}\n\uD83D\uDCC5 *Day:* {{date}}\n\u23F0 *Time:* {{time}} (Spain Time)\n\nCould you please confirm availability? Thank you!"
                        }
                    }
                }
            }
        }
    });

export default i18n;
