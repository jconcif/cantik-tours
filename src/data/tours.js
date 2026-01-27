export const tours = [
    {
        id: 'ubud-central',
        title: "Ubud Central: Templos Sagrados y Arrozales",
        title_en: "Ubud Central: Sacred Temples & Rice Terraces",
        description: "Vive la esencia de Bali: visita cascadas, templos milenarios y los arrozales más icónicos.",
        description_en: "Experience the essence of Bali: visit waterfalls, ancient temples, and the most iconic rice terraces.",
        fullDescription: "Sumérgete en el corazón espiritual de Bali. Este tour está diseñado para quienes buscan autenticidad, combinando templos históricos, cascadas escondidas y la belleza inigualable de Tegalalang Rice Terrace. Desde rituales de purificación tradicional hasta el relax en los mejores restaurantes con vistas a los arrozales, vive la experiencia completa de los alrededores de Ubud en un solo dia.",
        fullDescription_en: "Immerse yourself in Bali's spiritual heart. This tour is designed for those seeking authenticity, combining historic temples, hidden waterfalls, and the unparalleled beauty of Tegalalang Rice Terrace. From traditional purification rituals to relaxing in the best restaurants with views of the rice fields, live the complete experience of the surroundings of Ubud in a single day.",
        price: 55,
        duration: "8-10 horas",
        duration_en: "8-10 hours",
        image: "/images/tours/ubud-central/ubud-central-columpio.webp",
        images: [
            "/images/tours/ubud-central/ubud-central-columpio.webp",
            "/images/tours/ubud-central/ubud-central-rice-field.webp",
            "/images/tours/ubud-central/ubud-central-tirta-empul.webp",
            "/images/tours/ubud-central/ubud-central-kanto-lampo.webp",
            "/images/tours/ubud-central/ubud-central-alas-harum.webp"
        ],
        badge: "Más Popular",
        badge_en: "Most Popular",
        category: "cultura",
        itinerary: [
            {
                type: 'pickup',
                duration: "08:30",
                activity: "Recogida en hotel",
                activity_en: "Hotel pickup",
                desc: "Comenzamos el día recogiéndote directamente en tu alojamiento.",
                desc_en: "We start the day by picking you up directly at your accommodation."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Tibumana o Cascada Kanto Lampo",
                activity_en: "Tibumana or Kanto Lampo waterfall",
                desc: "Elige entre la caída perfecta de Tibumana or la belleza escalonada de Kanto Lampo.",
                desc_en: "Choose between Tibumana's perfect drop or Kanto Lampo's stepped beauty."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Gunung Kawi Tampaksiring (“Montaña Tallada\")",
                activity_en: "Gunung Kawi Tampaksiring temple (\"Carved Mountain\")",
                desc: "Impresionantes santuarios esculpidos directamente en el acantilado.",
                desc_en: "Stunning shrines sculpted directly into the cliffside."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Pura Mengening (Templo de purificación tradicional)",
                activity_en: "Pura Mengening temple (Traditional purification temple)",
                desc: "Lugar de paz y espiritualidad auténtica fuera de las rutas comunes.",
                desc_en: "A place of peace and authentic spirituality off the beaten path."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Pura Gunung Kawi Sebatu (Templo del siglo XI)",
                activity_en: "Pura Gunung Kawi Sebatu (11th century temple)",
                desc: "Joyas menos concurridas donde la espiritualidad y la naturaleza se funden.",
                desc_en: "Less crowded gems where spirituality and nature merge."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo local",
                activity_en: "Local lunch",
                desc: "Tiempo para disfrutar de la gastronomía balinesa.",
                desc_en: "Time to enjoy Balinese gastronomy."
            },
            {
                type: 'visit',
                duration: "2 horas",
                duration_en: "2 hours",
                activity: "Templo Pura Tirta Empul - Ritual de purificación (Opcional)",
                activity_en: "Pura Tirta Empul temple - Purification ritual (Optional)",
                desc: "El templo de agua más famoso de Bali.",
                desc_en: "Bali's most famous water temple."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Bali Pulina - Plantación de Café (Opcional)",
                activity_en: "Bali Pulina - Coffee plantation (Optional)",
                desc: "Conoce el proceso del café balinés en un entorno auténtico. Disfruta de una degustación en sus famosas terrazas de madera con vistas espectaculares a la selva.",
                desc_en: "Learn about the authentic Balinese coffee process. Enjoy a tasting on its famous wooden terraces with spectacular jungle views."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Tegalalang Rice Terrace",
                activity_en: "Tegalalang Rice Terrace",
                desc: "Para terminar la tarde con vistas a los arrozales más icónicos.",
                desc_en: "To end the afternoon with views of the most iconic rice terraces."
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos en tu alojamiento.",
                desc_en: "We drop you off at your accommodation."
            }
        ],
        location: "Ubud Central",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Ritual de purificación (Opcional)", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Purification ritual (Optional)", "Travel insurance"],
        rating: 4.9,
        reviews: 45,
        reviewsList: [
            { name: "Carlos M.", date: "Hace 2 días", text: "Increíble experiencia, el equipo nos explicó todo con muchísima paciencia.", date_en: "2 days ago", text_en: "Amazing experience, the team explained everything with a lot of patience." },
            { name: "Lucía R.", date: "Hace 1 semana", text: "La purificación en los templos menos conocidos fue lo mejor del viaje.", date_en: "1 week ago", text_en: "The purification at the lesser-known temples was the best part of the trip." }
        ]
    },
    {
        id: 'north-lake-temple',
        title: "Ubud Norte: Terrazas y Cascadas",
        title_en: "North Ubud: Terraces & Waterfalls",
        description: "El icónico templo sobre el lago, grandes cascadas y los arrozales Patrimonio UNESCO.",
        description_en: "The iconic lake temple, big waterfalls and UNESCO rice terraces.",
        fullDescription: "Descubre la exuberante naturaleza del norte de Ubud. Visitaremos el templo Ulun Danu Beratan sobre el lago, la impresionante cascada Nungnung o Leke Leke, y caminaremos por los campos de arroz infinitos de Jatiluwih.",
        fullDescription_en: "Discover the lush nature of north Ubud. We will visit the Ulun Danu Beratan temple on the lake, the impressive Nungnung or Leke Leke waterfall, and walk through the endless rice fields of Jatiluwih.",
        price: 65,
        duration: "10-12 horas",
        duration_en: "10-12 hours",
        image: "/images/tours/ubud-norte/leke-leke.webp",
        images: [
            "/images/tours/ubud-norte/leke-leke.webp",
            "/images/tours/ubud-norte/ulun-danu.webp",
            "/images/tours/ubud-norte/jatiluwih.webp",
            "/images/tours/ubud-norte/jatiluwi.webp"
        ],
        badge: "Paisajes Únicos",
        badge_en: "Unique Landscapes",
        category: "naturaleza",
        itinerary: [
            {
                type: 'pickup',
                duration: "8:30 am",
                activity: "Salida desde tu Hotel",
                activity_en: "Departure from your Hotel",
                desc: "Te pasaremos a recoger directamente en tu hotel a la hora acordada.",
                desc_en: "We will pick you up directly at your hotel at the agreed time."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Nungnung o Leke Leke",
                activity_en: "Nungnung or Leke Leke Waterfall",
                desc: "Enormes saltos de agua rodeados de vegetación tropical.",
                desc_en: "Huge waterfalls surrounded by tropical vegetation."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Ulun Danu Beratan",
                activity_en: "Ulun Danu Beratan Temple",
                desc: "El famoso templo flotante sobre el lago Beratan.",
                desc_en: "The famous floating temple on Lake Beratan."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Mercado de Frutas local",
                activity_en: "Local Fruit Market",
                desc: "Pintoresco mercado de frutas donde podrás hacer una degustación de cada una de ellas.",
                desc_en: "Picturesque fruit market where you can taste each one of them."
            },
            {
                type: 'photo',
                duration: "45 min",
                duration_en: "45 min",
                activity: "Handara Gates (Opcional)",
                activity_en: "Handara Gates (Optional)",
                desc: "Icónicas puertas balinesas con vistas a las montañas.",
                desc_en: "Iconic Balinese gates with mountain views."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Terrazas de Jatiluwih (UNESCO)",
                activity_en: "Jatiluwih Rice Terraces (UNESCO)",
                desc: "Inmensos Campos de arroz Patrimonio de la Humanidad.",
                desc_en: "Immense World Heritage rice fields."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo con vistas",
                activity_en: "Lunch with views",
                desc: "Almuerzo con vistas a los arrozales.",
                desc_en: "Lunch with views of the rice terraces."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Plantación de Café (Opcional)",
                activity_en: "Coffee Plantation (Optional)",
                desc: "Disfruta de una degustación de Té y café balinés.",
                desc_en: "Enjoy a tasting of Balinese tea and coffee."
            },
            {
                type: 'dropoff',
                activity: "Regreso al Hotel",
                activity_en: "Return to Hotel",
                desc: "El horario de regreso puede variar según el tráfico y las condiciones climáticas.",
                desc_en: "Return time may vary depending on traffic and weather conditions."
            }
        ],
        location: "Norte de Bali",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.9,
        reviews: 41,
        reviewsList: [
            { name: "Raquel M.", date: "Hace 2 semanas", text: "Nungnung es impresionante. Cansado por las escaleras pero increíble.", date_en: "2 weeks ago", text_en: "Nungnung is impressive. Tired from the stairs but incredible." },
            { name: "Esteban K.", date: "Hace 1 mes", text: "El templo del lago es de postal. Todo el tour super bien gestionado.", date_en: "1 month ago", text_en: "The lake temple is a postcard. The whole tour was super well managed." },
            { name: "Sofia T.", date: "Hace 2 meses", text: "Jatiluwih es infinito, que paz se respira.", date_en: "2 months ago", text_en: "Jatiluwih is infinite, such peace." },
            { name: "Manu X.", date: "Hace 5 meses", text: "Gracias por recomendarnos esta ruta, fue la mejor.", date_en: "5 months ago", text_en: "Thanks for recommending this route, it was the best." }
        ]
    },
    {
        id: 'lovina-dolphins',
        title: "Delfines en Lovina y Norte Profundo",
        title_en: "Lovina Dolphins & Deep North",
        description: "Una experiencia épica: avistamiento de delfines al amanecer y cascadas secretas.",
        description_en: "An epic experience: dolphin watching at sunrise and secret waterfalls.",
        fullDescription: "La aventura definitiva para los madrugadores. Empezaremos viendo delfines en su hábitat natural en Lovina, seguiremos con las cascadas de Banyumala, y visitaremos los lagos gemelos y el templo de Ulun Danu.",
        fullDescription_en: "The ultimate adventure for early birds. We start seeing dolphins in their natural habitat in Lovina, followed by Banyumala waterfalls, and visiting twin lakes and Ulun Danu temple.",
        price: 70,
        duration: "15 horas",
        duration_en: "15 hours",
        image: "/images/tours/lovina-dolphins/lovina-sunrise.webp",
        images: [
            "/images/tours/lovina-dolphins/lovina-sea.webp",
            "/images/tours/lovina-dolphins/lovina-sunrise.webp",
            "/images/tours/lovina-dolphins/lovina-boat.webp",
            "/images/tours/lovina-dolphins/ulun-danu.webp"
        ],
        badge: "Aventura Épica",
        badge_en: "Epic Adventure",
        category: "aventura",
        itinerary: [
            {
                type: 'pickup',
                duration: "4:30 am",
                activity: "Recogida nocturna",
                activity_en: "Night pickup",
                desc: "Te recogeremos temprano para llegar a Lovina antes del alba.",
                desc_en: "We will pick you up early to reach Lovina before sunrise."
            },
            {
                type: 'visit',
                duration: "2 horas",
                duration_en: "2 hours",
                activity: "Delfines en Lovina",
                activity_en: "Dolphins in Lovina",
                desc: "Avistamiento de delfines en barca tradicional durante el amanecer.",
                desc_en: "Dolphin watching on a traditional boat during sunrise."
            },
            {
                type: 'food',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Desayuno",
                activity_en: "Breakfast",
                desc: "Tiempo para recuperar energías frente a la playa principal.",
                desc_en: "Time to recharge energies in front of the main beach."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Banyumala",
                activity_en: "Banyumala waterfall",
                desc: "Darse un baño en una de las cascadas más bonitas de Bali.",
                desc_en: "Take a swim in one of Bali's most beautiful waterfalls."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Vistas lagos gemelos",
                activity_en: "Twin lakes views",
                desc: "Admira la impresionante vista de los lagos Buyan y Tamblingan desde las tierras altas.",
                desc_en: "Admire the stunning view of lakes Buyan and Tamblingan from the highlands."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo",
                activity_en: "Lunch",
                desc: "Disfruta de una deliciosa comida local con vistas espectaculares.",
                desc_en: "Enjoy a delicious local meal with spectacular views."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Ulun Danu Beratan",
                activity_en: "Ulun Danu Beratan temple",
                desc: "Visita el emblemático templo flotante sobre el lago Beratan, una de las imágenes más icónicas de Bali.",
                desc_en: "Visit the iconic floating temple on Lake Beratan, one of the most iconic images of Bali."
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Horario de regreso puede variar según tráfico y condiciones climáticas.",
                desc_en: "Return time may vary depending on traffic and weather conditions."
            }
        ],
        location: "Lovina / Norte",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking", "Agua mineral", "Snacks", "Barca privada para delfines (incluida bajo reserva previa)"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking", "Mineral water", "Snacks", "Private dolphin boat (included with pre-booking)"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.8,
        reviews: 25,
        reviewsList: [
            { name: "Isabel D.", date: "Hace 1 mes", text: "Ver los delfines fue un sueño hecho realidad. Gracias por todo.", date_en: "1 month ago", text_en: "Seeing the dolphins was a dream come true. Thanks for everything." },
            { name: "Pedro M.", date: "Hace 2 meses", text: "El madrugón merece la pena. Lovina y las cascadas del norte son lo mejor.", date_en: "2 months ago", text_en: "The early start is worth it. Lovina and the northern waterfalls are the best." },
            { name: "Cris R.", date: "Hace 3 meses", text: "Barca privada para nosotros dos, increible.", date_en: "3 months ago", text_en: "Private boat for the two of us, amazing." },
            { name: "Alex F.", date: "Hace 4 meses", text: "Banyumala es la cascada mas bonita de Bali sin duda.", date_en: "4 months ago", text_en: "Banyumala is the most beautiful waterfall in Bali without a doubt." }
        ]
    },
    {
        id: 'east-bali-besakih',
        title: "Este de Bali: El Templo Madre Besakih",
        title_en: "East Bali: Besakih Mother Temple",
        description: "Visita el templo más grande de Bali, palacios de agua y la aldea más limpia del mundo.",
        description_en: "Visit Bali's largest temple, water palaces and the world's cleanest village.",
        fullDescription: "Una inmersión profunda en la historia de Bali. Visitaremos Besakih, situado en la ladera del volcán Agung, el palacio acuático Tirta Gangga y la aldea tradicional Penglipuran, famosa por su arquitectura intacta.",
        fullDescription_en: "A deep dive into Bali's history. We will visit Besakih, located on the slopes of Mount Agung, the Tirta Gangga water palace and the traditional village of Penglipuran, famous for its untouched architecture.",
        price: 65,
        duration: "10-12 horas",
        duration_en: "10-12 hours",
        image: "/images/tours/east-bali-besakih/besakih.webp",
        images: [
            "/images/tours/east-bali-besakih/besakih.webp",
            "/images/tours/east-bali-besakih/besakih-temple.webp",
            "/images/tours/east-bali-besakih/kintamani.webp",
            "/images/tours/east-bali-besakih/mount-batur.webp"
        ],
        badge: "Imprescindible",
        badge_en: "Must See",
        category: "cultura",
        itinerary: [
            {
                type: 'pickup',
                duration: "8:30 am",
                activity: "Recogida en hotel",
                activity_en: "Hotel pickup",
                desc: "Te pasaremos a recoger directamente en tu hotel a la hora acordada.",
                desc_en: "We will pick you up directly at your hotel at the agreed time."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Palacio Tirta Gangga",
                activity_en: "Tirta Gangga Palace",
                desc: "Recorre los Jardines reales con fuentes y peces koi gigantes.",
                desc_en: "Explore the royal gardens with fountains and giant koi fish."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple",
                desc: "El complejo de templos más grande y sagrado de Bali. Recorrerás acompañado de un guía autorizado exclusivo para ti (disponible solo en inglés).",
                desc_en: "The largest and holiest temple complex in Bali. You will explore with an exclusive licensed guide (available in English only)."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo en Kintamani",
                activity_en: "Lunch in Kintamani",
                desc: "Disfruta de un almuerzo con espectaculares vistas al volcán Batur.",
                desc_en: "Enjoy lunch with spectacular views of Mount Batur."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Aldea Penglipuran",
                activity_en: "Penglipuran Village",
                desc: "Recorre una aldea tradicional balinesa perfectamente conservada, y camina por un bosque de bambú.",
                desc_en: "Explore a perfectly preserved traditional Balinese village and walk through a bamboo forest."
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "La hora de llegada puede variar dependiendo del tráfico y clima.",
                desc_en: "Arrival time may vary depending on traffic and weather conditions."
            }
        ],
        location: "Este de Bali",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.8,
        reviews: 28,
        reviewsList: [
            { name: "Juan P.", date: "Hace 2 meses", text: "Besakih es espectacular, la guía nos ayudó a evitar las multitudes.", date_en: "2 months ago", text_en: "Besakih is spectacular, the guide helped us avoid the crowds." },
            { name: "Elena B.", date: "Hace 1 mes", text: "El pueblo de Penglipuran es precioso. Muy bien organizado todo.", date_en: "1 month ago", text_en: "Penglipuran village is beautiful. Everything was very well organized." },
            { name: "Roberto F.", date: "Hace 3 semanas", text: "Las vistas de Kintamani valen cada euro. Un 10.", date_en: "3 weeks ago", text_en: "The views of Kintamani are worth every euro. A 10." },
            { name: "Carmen R.", date: "Hace 1 semana", text: "Fue increible ver el Templo Madre, muy recomendado.", date_en: "1 week ago", text_en: "It was amazing to see the Mother Temple, highly recommended." }
        ]
    },
    {
        id: 'lempuyang-gates',
        title: "Lempuyang: Las Puertas del Cielo",
        title_en: "Lempuyang: Gates of Heaven",
        description: "El tour más viral. Captura la foto icónica en Lempuyang y explora el este de Bali.",
        description_en: "The most viral tour. Capture the iconic photo at Lempuyang and explore east Bali.",
        fullDescription: "Prepárate para las vistas más espectaculares. Madrugaremos para llegar a las famosas Puertas del Cielo en Lempuyang, seguidas de la belleza real de Tirta Gangga y finalizar en una de las mejores playas de Bali.",
        fullDescription_en: "Get ready for the most spectacular views. We will start early to reach the famous Gates of Heaven at Lempuyang, followed by the royal beauty of Tirta Gangga and ending at one of Bali's best beaches.",
        price: 65,
        duration: "10-12 horas",
        duration_en: "10-12 hours",
        image: "/images/tours/lempuyang-gates/lempuyang-temple.webp",
        images: [
            "/images/tours/lempuyang-gates/lempuyang-temple.webp",
            "/images/tours/lempuyang-gates/lempuyang.webp",
            "/images/tours/lempuyang-gates/tirta-gangga-garden.webp",
            "/images/tours/lempuyang-gates/tirta-gangga.webp",
            "/images/tours/lempuyang-gates/virgin-beach.webp"
        ],
        badge: "Más Popular",
        badge_en: "Most Popular",
        category: "fotografia",
        itinerary: [
            {
                type: 'pickup',
                duration: "7 am",
                activity: "Recogida temprana",
                activity_en: "Early pickup",
                desc: "Te pasaremos a recoger temprano en tu hotel para evitar las colas y capturar la mejor luz.",
                desc_en: "We will pick you up early at your hotel to avoid the queues and capture the best light."
            },
            {
                type: 'photo',
                duration: "3 horas",
                duration_en: "3 hours",
                activity: "Templo Lempuyang (Puertas del Cielo)",
                activity_en: "Lempuyang Temple (Gates of Heaven)",
                desc: "Mucho más que una foto. Es uno de los 'Sad Kahyangan' (seis templos pilares) de Bali. Situado a 1,775m de altura, su nombre significa 'Luz de Dios' (Lempu-Hyang).",
                desc_en: "Much more than a photo. It is one of Bali's 'Sad Kahyangan' (six pillar temples). Located at 1,775m altitude, its name means 'Light of God' (Lempu-Hyang)."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Tirta Gangga",
                activity_en: "Tirta Gangga Water Palace",
                desc: "Laberinto de fuentes y estatuas construido en 1948 por el Raja de Karangasem. Su nombre significa literalmente 'Agua del Gange', un lugar sagrado para los balineses.",
                desc_en: "A maze of fountains and statues built in 1948 by the Raja of Karangasem. Its name literally means 'Water of the Ganges', a sacred site for Balinese people."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo local",
                activity_en: "Local Lunch",
                desc: "Disfruta de la auténtica gastronomía de Karangasem en un entorno rural rodeado de arrozales.",
                desc_en: "Enjoy authentic Karangasem gastronomy in a rural setting surrounded by rice terraces."
            },
            {
                type: 'beach',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Virgin Beach",
                activity_en: "Virgin Beach (Perasi)",
                desc: "Un paraíso de arena blanca y aguas turquesas escondido entre acantilados. Siéntete como un náufrago en una de las pocas playas vírgenes que quedan en Bali.",
                desc_en: "A paradise of white sand and turquoise waters hidden between cliffs. Feel like a castaway on one of the few remaining virgin beaches in Bali."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Goa Lawah (Opcional)",
                activity_en: "Goa Lawah (Bat Cave)",
                desc: "Templo milenario construido alrededor de una cueva habitada por miles de murciélagos sagrados. Es el guardián del este de la isla.",
                desc_en: "An ancient temple built around a cave inhabited by thousands of sacred bats. It is the guardian of the east of the island."
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Finalizamos el día dejándote en tu alojamiento después de una inmersión completa en el este de Bali.",
                desc_en: "We end the day by dropping you off at your accommodation after a complete immersion in East Bali."
            }
        ],
        location: "Lempuyang",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.9,
        reviews: 54,
        reviewsList: [
            { name: "Sara L.", date: "Hace 2 semanas", text: "Foto perfecta y trato inmejorable. Madrugar valió la pena.", date_en: "2 weeks ago", text_en: "Perfect photo and unbeatable service. Getting up early was worth it." },
            { name: "Diego V.", date: "Hace 1 mes", text: "Lempuyang es bellisimo. Perty nos ayudó con las fotos y quedaron increíbles.", date_en: "1 month ago", text_en: "Lempuyang is beautiful. Perty helped us with the photos and they turned out amazing." },
            { name: "Carmen T.", date: "Hace 2 meses", text: "Un tour muy completo. No solo son las puertas, todo el camino es genial.", date_en: "2 months ago", text_en: "A very complete tour. It's not just the gates, the whole way is great." },
            { name: "Jorge U.", date: "Hace 3 meses", text: "Si quieres la foto del volcan, este es el tour.", date_en: "3 months ago", text_en: "If you want the volcano photo, this is the tour." }
        ]
    },

    {
        id: 'transfers-bali',
        title: "Traslados Privados: Aeropuerto y Puertos",
        title_en: "Private Transfers: Airport & Harbors",
        description: "Transporte puntual, sin estrés y con la calidad de Cantik Tours.",
        description_en: "Punctual, stress-free transport with Cantik Tours quality.",
        fullDescription: "Viaja con total tranquilidad y comodidad. Evita las esperas y el estrés del transporte público o el regateo. Nuestro conductor privado te estará esperando con un cartel personalizado para llevarte directamente a tu destino en un vehículo moderno, limpio y con aire acondicionado. Servicio puntual, seguro y sin sorpresas, ideal para empezar o terminar tu viaje en Bali de la mejor manera.",
        fullDescription_en: "Travel with complete peace of mind and comfort. Avoid the wait and stress of public transport or haggling. Our private driver will be waiting for you with a personalized sign to take you directly to your destination in a modern, clean, and air-conditioned vehicle. Punctual, safe service with no surprises, ideal for starting or ending your Bali trip the best way.",
        price: 25,
        duration: "Flexible",
        duration_en: "Flexible",
        image: "/images/tours/transfers-bali/bali-private-airport-transfer.jpg",
        images: ["/images/tours/transfers-bali/bali-private-airport-transfer.jpg"],
        badge: "Servicio Directo",
        badge_en: "Direct Service",
        category: "traslados",
        isTransfer: true,
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Ayuda con maletas"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Help with bags"],
        not_included: ["Propinas (opcional)"],
        not_included_en: ["Tips (optional)"],
        rating: 5.0,
        reviews: 120
    }
];
