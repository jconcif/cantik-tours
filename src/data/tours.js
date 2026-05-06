export const tours = [
    {
        id: 'ubud-central',
        title: "Tegalalang: Arrozales y Esencia de Ubud",
        title_en: "Tegalalang: Rice Terraces & Ubud Essence",
        description: "Vive la esencia de Bali: visita cascadas, templos milenarios y los arrozales más icónicos.",
        description_en: "Experience the essence of Bali: visit waterfalls, ancient temples, and the most iconic rice terraces.",
        heroSubtitle: "Un día completo descubriendo el corazón espiritual de Bali, a tu ritmo y sin prisas.",
        heroSubtitle_en: "A full day discovering the spiritual heart of Bali, at your own pace and without rush.",
        fullDescription: "Sumérgete en el corazón espiritual de Bali. Este tour está diseñado para quienes buscan autenticidad, combinando templos históricos, cascadas escondidas y la belleza inigualable de Tegalalang Rice Terrace. Desde rituales de purificación tradicional hasta el relax en los mejores restaurantes con vistas a los arrozales, vive la experiencia completa de los alrededores de Ubud en un solo dia.",
        fullDescription_en: "Immerse yourself in Bali's spiritual heart. This tour is designed for those seeking authenticity, combining historic temples, hidden waterfalls, and the unparalleled beauty of Tegalalang Rice Terrace. From traditional purification rituals to relaxing in the best restaurants with views of the rice fields, live the complete experience of the surroundings of Ubud in a single day.",
        price: 59,
        duration: "8-10 hrs",
        duration_en: "8-10 hrs",
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
        category: ['cultura', 'cascadas', 'fotografia', 'aventura'],
        mapUrl: "https://www.google.com/maps/d/u/0/embed?mid=1fCrSJPI-3vT05KpsVYfAOidqrc0xlNQ",
        packingList: ['shoes', 'sunscreen', 'camera', 'money'],
        importantInfo: [
            "El código de vestimenta en templos requiere hombros cubiertos y sarong (nosotros te lo prestamos).",
            "La mayoría de las cascadas requieren bajar/subir bastantes escalones.",
            "Si llueve, el tour sigue adelante pero podemos ajustar paradas para mayor seguridad."
        ],
        importantInfo_en: [
            "Temple dress code requires covered shoulders and a sarong (we provide it for you).",
            "Most waterfalls require walking down/up many stairs.",
            "If it rains, the tour continues but we can adjust stops for safety."
        ],
        faqs: [
            { q: "¿Podemos cambiar el orden de las visitas?", a: "¡Claro! Todos nuestros tours son privados y 100% flexibles. Habla con tu guía ese mismo día.", q_en: "Can we change the order of visits?", a_en: "Sure! All our tours are private and 100% flexible. Talk to your guide that same day." },
            { q: "¿En qué idioma es el tour?", a: "La tarifa base es acompañado de un conductor local (Idioma Inglés). Puedes añadir Guía certificado (Idioma ingles o Español) por un suplemento adicional.", q_en: "What language is the tour in?", a_en: "The base rate is accompanied by a local driver (English Language). You can add a certified Guide (English or Spanish language) for an additional supplement." }
        ],
        routeUrl: "https://www.google.com/maps/dir/Ubud+Palace/Kanto+Lampo+Waterfall/Tibumana+Waterfall/Gunung+Kawi+Tampaksiring/Pura+Mengening/Pura+Gunung+Kawi+Sebatu/Bali+Pulina/Tis+Cafe/Ubud+Palace/@-8.4693985,115.2153627,12z",
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
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Goa Gajah (Cueva del Elefante)",
                activity_en: "Goa Gajah (Elephant Cave) Temple",
                desc: "Explora este sitio arqueológico del siglo XI, famoso por su cueva tallada con figuras demoníacas y sus antiguos baños rituales.",
                desc_en: "Explore this 11th-century archaeological site, famous for its carved cave with demonic figures and ancient ritual baths."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Tibumana o Kanto Lampo",
                activity_en: "Tibumana or Kanto Lampo waterfall",
                desc: "Sumérgete en la selva tropical. Tibumana es un oasis de paz con una caída perfecta, mientras que Kanto Lampo impresiona con sus aguas escalonadas sobre rocas volcánicas.",
                desc_en: "Immerse yourself in the tropical jungle. Tibumana is an oasis of peace with a perfect drop, while Kanto Lampo impresses with its waters cascading over volcanic rocks."
            },
            {
                type: 'visit',
                duration: "2 horas",
                duration_en: "2 hours",
                activity: "Templo Pura Tirta Empul - Ritual de purificación (Opcional)",
                activity_en: "Pura Tirta Empul temple - Purification ritual (Optional)",
                desc: "Sumerge tu alma en las aguas sagradas y vive el ritual de purificación balinés más auténtico en el corazón espiritual de la isla.",
                desc_en: "Immerse your soul in the sacred waters and experience the most authentic Balinese purification ritual in the spiritual heart of the island."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo en restaurante local",
                activity_en: "Lunch at local restaurant",
                desc: "Disfruta de la gastronomía balinesa con vistas a los arrozales o la selva.",
                desc_en: "Enjoy Balinese gastronomy with views of the rice fields or the jungle."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Tegalalang Rice Terrace (UNESCO)",
                activity_en: "Tegalalang Rice Terrace (UNESCO)",
                desc: "Camina entre los arrozales más famosos del mundo y siente la paz que emana de este paisaje.",
                desc_en: "Walk among the world's most famous rice terraces and feel the peace emanating from this landscape."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cretya, Alas Harum o Tis Cafe (Opcional)",
                activity_en: "Cretya, Alas Harum or Tis Cafe (Optional)",
                desc: "Finaliza el día en uno de los clubes o cafeterías con las piscinas infinitas y columpios más espectaculares de Tegalalang.",
                desc_en: "End the day at one of the clubs or cafes with the most spectacular infinity pools and swings in Tegalalang."
            },
            {
                type: 'dropoff',
                duration: "16:30 - 18:30",
                duration_en: "4:30 pm - 6:30 pm",
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 16:30 y 18:30, dependiendo del ritmo del día, el clima y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 4:30 PM and 6:30 PM, depending on the tour pace, weather, and traffic."
            }
        ],
        location: "Ubud Central",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
        rating: 4.9,
        reviews: 45,
        reviewsList: [
            { name: "Carlos M.", date: "Hace 2 días", text: "Increíble experiencia, el equipo nos explicó todo con muchísima paciencia.", date_en: "2 days ago", text_en: "Amazing experience, the team explained everything with a lot of patience." },
            { name: "Lucía R.", date: "Hace 1 semana", text: "La purificación en los templos menos conocidos fue lo mejor del viaje.", date_en: "1 week ago", text_en: "The purification at the lesser-known temples was the best part of the trip." }
        ]
    },
    {
        id: 'ubud-flexible',
        title: "Ubud a tu Aire: Ruta 100% Flexible",
        title_en: "Ubud at Your Pace: 100% Flexible Route",
        description: "Es la opción ideal para quienes tienen pocos dias en Bali o tienen una lista de lugares específica que visitar.",
        description_en: "The ideal option for those who have few days in Bali or have a specific list of places to visit.",
        heroSubtitle: "La libertad total de explorar Ubud eligiendo solo lo que más te apetece ver.",
        heroSubtitle_en: "Total freedom to explore Ubud by choosing only what you most want to see.",
        fullDescription: "Nuestra ruta más versátil y libre. Olvídate de itinerarios rígidos; con este tour tienes a tu disposición un conductor privado experto durante 10 horas para visitar hasta 5 lugares que tú elijas del área de Ubud. Es la opción ideal para quienes quieren optimizar su tiempo al máximo, tienen pocos días en la isla o simplemente prefieren seguir su propio ritmo sin seguir a la masa. Tú marcas los tiempos y nosotros nos encargamos de que el trayecto sea impecable.",
        fullDescription_en: "Our most versatile and free route. Forget about rigid itineraries; with this tour you have an expert private driver at your disposal for 10 hours to visit up to 5 places of your choice in the Ubud area. It is the ideal option for those who want to optimize their time to the fullest, have few days on the island or simply prefer to follow their own pace without following the crowd. You set the times and we make sure the journey is flawless.",
        price: 59,
        duration: "8-10 hrs",
        duration_en: "8-10 hrs",
        image: "/images/tours/ubud-central/ubud-central-rice-field.webp",
        images: [
            "/images/tours/ubud-central/ubud-central-rice-field.webp",
            "/images/tours/ubud-central/ubud-central-kanto-lampo.webp",
            "/images/tours/ubud-central/ubud-central-tirta-empul.webp"
        ],
        badge: "Personalizable",
        badge_en: "Customizable",
        category: ['cultura', 'aventura', 'fotografia'],
        mapUrl: "https://www.google.com/maps/d/u/0/embed?mid=1fCrSJPI-3vT05KpsVYfAOidqrc0xlNQ",
        availableStops: [
            { 
                id: 'goa-gajah', 
                name: 'Templo Goa Gajah (Cueva del Elefante)', 
                name_en: 'Goa Gajah Temple (Elephant Cave)', 
                duration: '1h',
                desc: 'Misterioso santuario arqueológico del siglo XI excavado en la roca, famoso por su imponente entrada tallada con figuras demoníacas y sus antiguos baños rituales.',
                desc_en: 'Mysterious 11th-century archaeological sanctuary carved into the rock, famous for its imposing entrance carved with demonic figures and its ancient ritual baths.',
                icon: 'MapPin'
            },
            { 
                id: 'monkey-forest', 
                name: 'Monkey Forest Ubud', 
                name_en: 'Monkey Forest Ubud', 
                duration: '1h',
                desc: 'Sumérgete en este bosque sagrado donde habitan cientos de macacos grises. Un paseo místico entre templos antiguos envueltos por la selva tropical.',
                desc_en: 'Immerse yourself in this sacred forest inhabited by hundreds of grey macaques. A mystical walk among ancient temples shrouded by tropical jungle.',
                icon: 'MapPin'
            },
            { 
                id: 'ubud-palace', 
                name: 'Palacio de Ubud (Puri Saren)', 
                name_en: 'Ubud Palace (Puri Saren)', 
                duration: '1h',
                desc: 'Descubre el corazón histórico de Ubud. Un palacio que sigue siendo la residencia de la familia real, con una arquitectura balinesa exquisitamente conservada.',
                desc_en: 'Discover the historical heart of Ubud. A palace that remains the residence of the royal family, with exquisitely preserved Balinese architecture.',
                icon: 'MapPin'
            },
            { 
                id: 'ubud-market', 
                name: 'Mercado de Ubud (Art Market)', 
                name_en: 'Ubud Art Market', 
                duration: '1h',
                desc: 'Un festín para los sentidos. Encuentra desde sarongs de seda hasta artesanías de madera talladas a mano en el mercado de arte más vibrante de la isla.',
                desc_en: 'A feast for the senses. Find everything from silk sarongs to hand-carved wood crafts in the island\'s most vibrant art market.',
                icon: 'MapPin'
            },
            { 
                id: 'tibumana', 
                name: 'Cascada Tibumana', 
                name_en: 'Tibumana Waterfall', 
                duration: '1h',
                desc: 'Una joya escondida. Esta cascada de caída vertical perfecta termina en una piscina natural de aguas tranquilas, ideal para un baño refrescante rodeado de selva.',
                desc_en: 'A perfect vertical drop waterfall ends in a natural pool of calm waters, ideal for a refreshing swim surrounded by jungle.',
                icon: 'MapPin'
            },
            { 
                id: 'kanto-lampo', 
                name: 'Cascada Kanto Lampo', 
                name_en: 'Kanto Lampo Waterfall', 
                duration: '1h',
                desc: 'Explora esta cascada única donde el agua fluye sobre rocas volcánicas escalonadas, creando un escenario fotográfico espectacular y una ducha natural refrescante.',
                desc_en: 'Explore this unique waterfall where water flows over stepped volcanic rocks, creating a spectacular photographic setting and a refreshing natural shower.',
                icon: 'MapPin'
            },
            { 
                id: 'tirta-empul', 
                name: 'Pura Tirta Empul (Ritual)', 
                name_en: 'Tirta Empul (Ritual)', 
                duration: '2h',
                desc: 'Vive una experiencia espiritual en este templo milenario. Sus manantiales sagrados son el escenario de los rituales de purificación más profundos de Bali.',
                desc_en: 'Experience a spiritual journey in this ancient temple. Its sacred springs are the setting for Bali\'s most profound purification rituals.',
                icon: 'MapPin'
            },
            { 
                id: 'tegalalang', 
                name: 'Tegalalang Rice Terrace', 
                name_en: 'Tegalalang Rice Terrace', 
                duration: '1h',
                desc: 'Camina entre las terrazas de arroz más famosas del mundo. Un paisaje esculpido a mano que es Patrimonio de la Humanidad por la UNESCO.',
                desc_en: 'Walk through the world\'s most famous rice terraces. A hand-sculpted landscape that is a UNESCO World Heritage site.',
                icon: 'MapPin'
            },
            { 
                id: 'alas-harum', 
                name: 'Alas Harum Bali', 
                name_en: 'Alas Harum Bali', 
                duration: '2h',
                desc: 'El complejo de aventura más completo de Ubud. Piscinas de tres niveles, columpios gigantes y las mejores vistas panorámicas de las terrazas de arroz.',
                desc_en: 'The most complete adventure complex in Ubud. Three-level pools, giant swings, and the best panoramic views of the rice terraces.',
                icon: 'MapPin'
            },
            { 
                id: 'cretya-ubud', 
                name: 'Cretya Ubud (Rice Club)', 
                name_en: 'Cretya Ubud (Rice Club)', 
                duration: '2h',
                desc: 'Relájate en el club de día más exclusivo de Tegalalang. Tres niveles de piscinas infinitas que parecen fundirse con el verde intenso de los arrozales.',
                desc_en: 'Relax at Tegalalang\'s most exclusive day club. Three levels of infinity pools that seem to merge with the intense green of the rice terraces.',
                icon: 'MapPin'
            },
            { 
                id: 'tis-cafe', 
                name: 'Tis Cafe Ubud', 
                name_en: 'Tis Cafe Ubud', 
                duration: '1.5h',
                desc: 'Disfruta de la mejor vista de Tegalalang desde su piscina infinita. Un lugar tranquilo para comer o tomar un café balinés con una panorámica inigualable.',
                desc_en: 'Enjoy the best view of Tegalalang from its infinity pool. A peaceful place to eat or have a Balinese coffee with an incomparable panoramic view.',
                icon: 'MapPin'
            },
            { 
                id: 'bali-pulina', 
                name: 'Bali Pulina Coffee Plantation', 
                name_en: 'Bali Pulina Coffee Plantation', 
                duration: '1h',
                desc: 'Descubre el proceso del café más caro del mundo (Luwak) y disfruta de una degustación gratuita de tés y cafés mientras contemplas el valle.',
                desc_en: 'Discover the process of the world\'s most expensive coffee (Luwak) and enjoy a free tasting of teas and coffees while gazing at the valley.',
                icon: 'MapPin'
            },
            { 
                id: 'gunung-kawi', 
                name: 'Gunung Kawi Tampaksiring', 
                name_en: 'Gunung Kawi Tampaksiring', 
                duration: '1h',
                desc: 'Impactante complejo funerario del siglo XI con altares de 7 metros tallados directamente en los acantilados de piedra del valle del río Pakerisan.',
                desc_en: 'Stunning 11th-century funerary complex with 7-meter altars carved directly into the stone cliffs of the Pakerisan River valley.',
                icon: 'MapPin'
            },
            { 
                id: 'sebatu', 
                name: 'Pura Gunung Kawi Sebatu', 
                name_en: 'Pura Gunung Kawi Sebatu', 
                duration: '1h',
                desc: 'Un remanso de paz poco conocido. Este templo destaca por sus manantiales cristalinos, estanques llenos de carpas koi y sus exquisitos jardines tallados.',
                desc_en: 'A little-known haven of peace. This temple stands out for its crystal-clear springs, ponds filled with koi carp, and its exquisite carved gardens.',
                icon: 'MapPin'
            },
            { 
                id: 'mengening', 
                name: 'Pura Mengening', 
                name_en: 'Pura Mengening', 
                duration: '1h',
                desc: 'Si buscas una conexión espiritual más íntima, este templo de agua es el lugar ideal. Aguas cristalinas y una atmósfera de calma absoluta lejos de las masas.',
                desc_en: 'If you are looking for a more intimate spiritual connection, this water temple is the ideal place. Crystal clear waters and an atmosphere of absolute calm away from the crowds.',
                icon: 'MapPin'
            }
        ],
        packingList: ['shoes', 'sunscreen', 'camera', 'money'],
        importantInfo: [
            "Puedes elegir hasta 5 paradas entre: Tegalalang, Tirta Empul, Cascada Tibumana, Kanto Lampo, Goa Gajah, Monkey Forest, Alas Harum, Coffee Plantation, Gunung Kawi, o centro de Ubud.",
            "El orden de la ruta lo decides tú junto con el guía al empezar el día.",
            "Si tienes una parada fuera de la zona de Ubud, consúltanos antes de reservar."
        ],
        importantInfo_en: [
            "Choose up to 5 stops from: Tegalalang, Tirta Empul, Tibumana Waterfall, Kanto Lampo, Goa Gajah, Monkey Forest, Alas Harum, Coffee Plantation, Gunung Kawi, or Ubud Center.",
            "You decide the route order with your guide at the start of the day.",
            "If you have a stop outside the Ubud area, please consult us before booking."
        ],
        itinerary: [
            {
                type: 'pickup',
                duration: "08:30",
                activity: "Recogida personalizada",
                activity_en: "Custom pickup",
                desc: "Te recogemos en tu alojamiento para empezar tu aventura a medida.",
                desc_en: "We pick you up at your accommodation to start your tailor-made adventure."
            },
            {
                type: 'visit',
                duration: "7 horas efectivas",
                duration_en: "7 effective hours",
                activity: "Tu Ruta, Tus Reglas",
                activity_en: "Your Route, Your Rules",
                desc: "Durante el día visitaremos los 5 puntos que hayas seleccionado. Sin prisas, disfrutando cada lugar el tiempo que necesites.",
                desc_en: "During the day we will visit the 5 points you have selected. No rush, enjoying each place as long as you need."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo Local",
                activity_en: "Local Lunch",
                desc: "Parada para disfrutar de la comida balinesa entre tus visitas.",
                desc_en: "Stop to enjoy Balinese food between your visits."
            },
            {
                type: 'dropoff',
                duration: "18:30",
                duration_en: "6:30 pm",
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos de vuelta en tu alojamiento con la satisfacción de un día diseñado para ti.",
                desc_en: "We drop you back at your accommodation with the satisfaction of a day designed for you.",
            }
        ],
        location: "Ubud Area",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
        rating: 5.0,
        reviews: 12,
        reviewsList: [
            { name: "Marta S.", date: "Hace 1 mes", text: "Pudimos elegir exactamente lo que queríamos ver. Fue el mejor día en Bali.", date_en: "1 month ago", text_en: "We could choose exactly what we wanted to see. It was the best day in Bali." }
        ]
    },
    {
        id: 'north-lake-temple',
        title: "Ubud Norte: Terrazas y Cascadas",
        title_en: "North Ubud: Terraces & Waterfalls",
        description: "El icónico templo sobre el lago, grandes cascadas y los arrozales Patrimonio UNESCO.",
        description_en: "The iconic lake temple, big waterfalls and UNESCO rice terraces.",
        heroSubtitle: "Explora la exuberancia del norte: un hermoso templo sobre el agua y arrozales infinitos.",
        heroSubtitle_en: "Explore the lush north: a beautiful temple over water and infinite rice fields.",
        fullDescription: "Descubre la exuberante naturaleza del norte de Ubud. Visitaremos el templo Ulun Danu Beratan, el templo sobre el lago, la impresionante cascada Nungnung o Leke Leke, y caminaremos por los campos de arroz infinitos de Jatiluwih.",
        fullDescription_en: "Discover the lush nature of north Ubud. We will visit the Ulun Danu Beratan temple on the lake, the impressive Nungnung or Leke Leke waterfall, and walk through the endless rice fields of Jatiluwih.",
        price: 69,
        duration: "8-10 hrs",
        duration_en: "8-10 hrs",
        image: "/images/tours/ubud-norte/leke-leke.webp",
        images: [
            "/images/tours/ubud-norte/leke-leke.webp",
            "/images/tours/ubud-norte/ulun-danu.webp",
            "/images/tours/ubud-norte/jatiluwih.webp",
            "/images/tours/ubud-norte/jatiluwi.webp"
        ],
        badge: "Paisajes Únicos",
        badge_en: "Unique Landscapes",
        category: ['cascadas', 'fotografia', 'aventura'],
        mapUrl: "https://maps.google.com/maps?q=Ulun%20Danu%20Beratan%20Temple&t=&z=13&ie=UTF8&iwloc=&output=embed",
        packingList: ['shoes', 'sunscreen', 'camera', 'money'],
        importantInfo: [
            "En las tierras altas (Bedugul) la temperatura es más fresca, recomendamos llevar una chaqueta ligera.",
            "Jatiluwih requiere una caminata suave por senderos de arroz.",
            "Templo Ulun Danu puede estar nublado o con neblina, lo que le da un toque místico."
        ],
        importantInfo_en: [
            "In the highlands (Bedugul) the temperature is cooler, we recommend bringing a light jacket.",
            "Jatiluwih requires a gentle walk along rice paths.",
            "Ulun Danu Temple can be cloudy or misty, which gives it a mystical touch."
        ],
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
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Cascada Nungnung o Cascada Leke Leke",
                activity_en: "Nungnung or Leke Leke Waterfall",
                desc: "Siente la fuerza de la naturaleza. Nungnung te envolverá con su potente caída de 50m, mientras que Leke Leke te cautivará con su belleza delicada escondida en un cañón tropical.",
                desc_en: "Feel the force of nature. Nungnung will envelope you with its powerful 50m drop, while Leke Leke will captivate you with its delicate beauty hidden in a tropical canyon."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Ulun Danu Beratan",
                activity_en: "Ulun Danu Beratan Temple",
                desc: "La imagen de postal de Bali. Este templo flotante del siglo XVII está dedicado a Dewi Danu, la diosa de los lagos, y parece emerger mágicamente de las aguas cristalinas.",
                desc_en: "The postcard image of Bali. This 17th-century floating temple is dedicated to Dewi Danu, the goddess of the lakes, and appears to magically emerge from the crystal clear waters."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Sabores del Mercado Local (Opcional)",
                activity_en: "Local Market Flavors (Optional)",
                desc: "Explora la explosión de colores y olores de las frutas exóticas de las tierras altas de Bedugul. El lugar perfecto para probar el mangostán o la fruta de la serpiente.",
                desc_en: "Explore the explosion of colors and smells of exotic fruits from the Bedugul highlands. The perfect place to try mangosteen or snake fruit."
            },
            {
                type: 'photo',
                duration: "45 min",
                duration_en: "45 min",
                activity: "Handara Gates (Opcional)",
                activity_en: "Handara Gates (Optional)",
                desc: "La alternativa perfecta al templo Lempuyang. Estas imponentes puertas balinesas ofrecen un encuadre espectacular con las montañas de fondo, sin las largas esperas.",
                desc_en: "The perfect alternative to Lempuyang temple. These imposing Balinese gates provide a spectacular frame with the misty mountains as a backdrop, without the long waits."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Terrazas de Jatiluwih (UNESCO)",
                activity_en: "Jatiluwih Rice Terraces (UNESCO)",
                desc: "Camina por el anfiteatro de arroz más grande de Bali. Sus inmensas terrazas esculpidas a mano son el ejemplo más puro del paisaje cultural protegido por la UNESCO.",
                desc_en: "Walk through Bali's largest rice amphitheater. Its immense, hand-sculpted terraces are the purest example of the UNESCO-protected cultural landscape."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo con vistas infinitas",
                activity_en: "Lunch with infinite views",
                desc: "Disfruta de una comida deliciosa mientras contemplas la inmensidad verde de Jatiluwih, un festín para los sentidos.",
                desc_en: "Enjoy a delicious meal while contemplating the green immensity of Jatiluwih, a feast for the senses."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Plantación de Café (Opcional)",
                activity_en: "Coffee Plantation (Optional)",
                desc: "Disfruta de un paseo por la plantación donde aprenderás sobre las plantas locales y finaliza con una degustación de té y café balinés.",
                desc_en: "Enjoy a walk through the plantation where you will learn about local plants and finish with a tasting of Balinese tea and coffee."
            },
            {
                type: 'dropoff',
                duration: "16:30 - 18:30",
                duration_en: "4:30 pm - 6:30 pm",
                activity: "Regreso al Hotel",
                activity_en: "Return to Hotel",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 16:30 y 18:30, dependiendo del ritmo del día, el clima y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 4:30 PM and 6:30 PM, depending on the tour pace, weather, and traffic."
            }
        ],
        location: "Norte de Bali",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
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
        heroSubtitle: "Una aventura mágica al amanecer conectando con la vida marina y la selva norteña.",
        heroSubtitle_en: "A magical adventure at sunrise connecting with marine life and the northern jungle.",
        fullDescription: "La aventura definitiva para los madrugadores. El precio incluye transporte privado y barca privada bajo reserva. En Cantik Tours practicamos un turismo responsable, para que disfrutes de una experiencia ética y tranquila. Nos alejamos de las persecuciones masivas de delfines, priorizando el respeto por los animales y su hábitat natural.",
        fullDescription_en: "The ultimate adventure for early birds. Price includes private transport and private boat with pre-booking. At Cantik Tours we practice responsible tourism: we keep our distance from massive dolphin chases, prioritizing respect for the animals and their natural habitat for an ethical and peaceful experience.",
        price: 97,
        duration: "10 hrs",
        duration_en: "10 hrs",
        image: "/images/tours/lovina-dolphins/lovina-sunrise.webp",
        images: [
            "/images/tours/lovina-dolphins/lovina-sea.webp",
            "/images/tours/lovina-dolphins/lovina-sunrise.webp",
            "/images/tours/lovina-dolphins/lovina-boat.webp",
            "/images/tours/lovina-dolphins/ulun-danu.webp"
        ],
        badge: "Aventura Épica",
        badge_en: "Epic Adventure",
        category: ['aventura', 'cascadas', 'fotografia'],
        mapUrl: "https://maps.google.com/maps?q=Lovina%20Beach%20Bali&t=&z=11&ie=UTF8&iwloc=&output=embed",
        packingList: ['swimwear', 'sunscreen', 'camera', 'shoes'],
        importantInfo: [
            "La salida en barco es muy temprano (amanecer). El mar suele estar tranquilo.",
            "Turismo Ético: No perseguimos a los delfines. Mantenemos una distancia de respeto para no estresarlos.",
            "Lleva bañador y toalla para la cascada Banyumala.",
            "El trayecto de regreso es largo, aprovechamos para descansar."
        ],
        importantInfo_en: [
            "The boat departure is very early (sunrise). The sea is usually calm.",
            "Ethical Tourism: We do not chase the dolphins. We maintain a respectful distance to avoid stressing them.",
            "Bring swimwear and a towel for the Banyumala waterfall.",
            "The return journey is long, we take the opportunity to rest."
        ],
        itinerary: [
            {
                type: 'pickup',
                duration: "4:30 am",
                activity: "Recogida nocturna",
                activity_en: "Night pickup",
                desc: "Te recogeremos de madrugada para llegar a Lovina antes del alba.",
                desc_en: "We will pick you up early to reach Lovina before sunrise."
            },
            {
                type: 'visit',
                duration: "2 horas",
                duration_en: "2 hours",
                activity: "Barca Privada: Delfines",
                activity_en: "Private Boat: Dolphins",
                desc: "Avistamiento de delfines en barca tradicional PRIVADA (incluida en el precio). Máximo relax y exclusividad al amanecer.",
                desc_en: "Dolphin watching on a PRIVATE traditional boat (included in the price). Maximum relaxation and exclusivity at sunrise."
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
                desc: "Refréscate en las Twin Waterfalls. Una cortina de agua mágica que se desliza por una pared de helechos y rocas hasta una piscina natural de aguas cristalinas.",
                desc_en: "Refresh yourself at the Twin Waterfalls. A magical curtain of water that slides down a wall of ferns and rocks into a natural pool of crystal clear waters."
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
                activity: "Templo Ulun Danu Beratan (Opcional)",
                activity_en: "Ulun Danu Beratan temple (Optional)",
                desc: "Si el grupo lo desea, visitaremos el emblemático templo flotante. Al ser opcional, permite ganar tiempo para el regreso si se prefiere.",
                desc_en: "If the group wishes, we will visit the iconic floating temple. Being optional, it allows to save time for the return journey if preferred."
            },
            {
                type: 'dropoff',
                duration: "14:30 - 15:30",
                duration_en: "2:30 pm - 3:30 pm",
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 14:30 y 15:30, dependiendo del ritmo del día, el clima y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 2:30 PM and 3:30 PM, depending on the tour pace, weather, and traffic."
            }
        ],
        location: "Lovina / Norte",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks", "Barca privada para delfines (incluida bajo reserva previa)"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks", "Private dolphin boat (included with pre-booking)"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
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
        description: "Visita el templo más grande de Bali, palacios de agua y una aldea tradicional única.",
        description_en: "Visit Bali's largest temple, water palaces and a unique traditional village.",
        heroSubtitle: "Viaja al pasado de Bali visitando el Templo Madre y aldeas tradicionales detenidas en el tiempo.",
        heroSubtitle_en: "Travel to Bali's past visiting the Mother Temple and traditional villages frozen in time.",
        fullDescription: "Una inmersión profunda en la historia de Bali. Visitaremos el Templo Madre Besakih, situado en las faldas del monte Agung, el volcán más sagrado de la isla. También descubriremos Kintamani, un mirador espectacular al volcán Batur donde almorzaremos, y caminaremos por el místico bosque de bambú tras visitar la aldea tradicional de Penglipuran.",
        fullDescription_en: "A deep immersion into Bali's history. We will visit the Besakih Mother Temple, located on the slopes of Mount Agung, the island's most sacred volcano. We will also discover Kintamani, a spectacular viewpoint of Mount Batur where we will have lunch, and walk through the mystical bamboo forest after visiting the traditional village of Penglipuran.",
        price: 69,
        duration: "8-10 hrs",
        duration_en: "8-10 hrs",
        image: "/images/tours/east-bali-besakih/besakih.webp",
        images: [
            "/images/tours/east-bali-besakih/besakih.webp",
            "/images/tours/east-bali-besakih/besakih-temple.webp",
            "/images/tours/east-bali-besakih/kintamani.webp",
            "/images/tours/east-bali-besakih/mount-batur.webp"
        ],
        badge: "Imprescindible",
        badge_en: "Must See",
        category: ['cultura', 'fotografia'],
        mapUrl: "https://maps.google.com/maps?q=Besakih%20Mother%20Temple%20Bali&t=&z=13&ie=UTF8&iwloc=&output=embed",
        packingList: ['shoes', 'sunscreen', 'camera', 'money'],
        importantInfo: [
            "Besakih es un complejo de 23 templos. Requiere caminar y subir escaleras.",
            "Se requiere Sarong y hombros cubiertos (te lo prestamos).",
            "Kintamani suele tener mejores vistas por la mañana antes de que suban las nubes volcánicas."
        ],
        importantInfo_en: [
            "Besakih is a complex of 23 temples. Requires walking and climbing stairs.",
            "Sarong and covered shoulders are required (we provide it for you).",
            "Kintamani usually has better views in the morning before volcanic clouds rise."
        ],
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
                activity: "Palacio de Agua Tirta Gangga",
                activity_en: "Tirta Gangga Water Palace",
                desc: "El legado del último Rey de Karangasem. Camina sobre las baldosas que flotan en el agua sagrada, rodeado de estatuas talladas y peces koi gigantes en un laberinto real de paz.",
                desc_en: "The legacy of the last King of Karangasem. Walk on the tiles floating in sacred water, surrounded by carved statues and giant koi fish in a royal labyrinth of peace."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple",
                desc: "Toca las nubes en el Templo Madre, el centro espiritual de Bali, situado majestuosamente a los pies del imponente volcán Agung.",
                desc_en: "Touch the clouds at the Mother Temple, Bali's spiritual heart, majestically perched at the foot of the imposing Mount Agung."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo en Kintamani",
                activity_en: "Lunch in Kintamani",
                desc: "Un festín visual. Degusta tu almuerzo con las vistas más espectaculares de Bali: el imponente Volcán Batur y su lago turquesa a tus pies.",
                desc_en: "A visual feast. Enjoy your lunch with Bali's most spectacular views: the imposing Batur Volcano and its turquoise lake at your feet."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Aldea Tradicional Penglipuran",
                activity_en: "Penglipuran Traditional Village",
                desc: "Viaja al pasado en una de las aldeas más limpias y hermosas del mundo. Admira su arquitectura simétrica perfectamente conservada y su atmósfera única.",
                desc_en: "Travel back in time in one of the world's cleanest and most beautiful villages. Admire its perfectly preserved symmetrical architecture and its unique atmosphere."
            },
            {
                type: 'visit',
                duration: "30 min",
                duration_en: "30 min",
                activity: "Bosque de Bambú (Opcional)",
                activity_en: "Bamboo Forest (Optional)",
                desc: "Camina por un sendero místico rodeado de imponentes tallos de bambú. Una parada perfecta para conectar con la naturaleza (entrada no incluida).",
                desc_en: "Walk through a mystical path surrounded by towering bamboo stalks. A perfect stop to connect with nature (entrance fee not included)."
            },
            {
                type: 'dropoff',
                duration: "16:30 - 18:30",
                duration_en: "4:30 pm - 6:30 pm",
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 16:30 y 18:30, dependiendo del ritmo del día, el clima y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 4:30 PM and 6:30 PM, depending on the tour pace, weather, and traffic."
            }
        ],
        location: "Este de Bali",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
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
        heroSubtitle: "Captura la esencia viral de Bali y relájate en playas vírgenes del este.",
        heroSubtitle_en: "Capture Bali's viral essence and relax on virgin eastern beaches.",
        fullDescription: "Prepárate para las vistas más espectaculares. Madrugaremos para llegar a las famosas Puertas del Cielo en Lempuyang, seguidas de la belleza real de Tirta Gangga y finalizar en una de las mejores playas de Bali.",
        fullDescription_en: "Get ready for the most spectacular views. We will start early to reach the famous Gates of Heaven at Lempuyang, followed by the royal beauty of Tirta Gangga and ending at one of Bali's best beaches.",
        price: 79,
        duration: "10 hrs",
        duration_en: "10 hrs",
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
        category: ['fotografia', 'playas', 'cultura'],
        mapUrl: "https://maps.google.com/maps?q=Lempuyang%20Temple%20Bali&t=&z=13&ie=UTF8&iwloc=&output=embed",
        packingList: ['shoes', 'sunscreen', 'camera', 'swimwear', 'money'],
        importantInfo: [
            "Lempuyang es extremadamente popular. El madrugón es esencial para no esperar horas.",
            "En Virgin Beach hay vestuarios y duchas básicas.",
            "El ticket de Lempuyang incluye un transporte en shuttle desde el parking hasta el templo."
        ],
        importantInfo_en: [
            "Lempuyang is extremely popular. Getting up early is essential to avoid waiting hours.",
            "At Virgin Beach there are basic changing rooms and showers.",
            "The Lempuyang ticket includes shuttle transport from the parking lot to the temple."
        ],
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
                desc: "Captura la foto de tu vida en las icónicas Puertas del Cielo y déjate maravillar por las vistas épicas del volcán Agung.",
                desc_en: "Capture the photo of a lifetime at the iconic Gates of Heaven and marvel at the epic views of Mount Agung."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Tirta Gangga",
                activity_en: "Tirta Gangga Water Palace",
                desc: "Camina sobre las baldosas que flotan en el agua sagrada y rodéate de peces koi gigantes en este fascinante palacio real de agua.",
                desc_en: "Walk on tiles floating in sacred water and surround yourself with giant koi fish in this fascinating royal water palace."
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
                duration: "1 hora",
                duration_en: "1 hour",
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
                duration: "17:00 - 18:00",
                duration_en: "5:00 pm - 6:00 pm",
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 17:00 y 18:00, dependiendo del ritmo del día, el clima y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 5:00 PM and 6:00 PM, depending on the tour pace, weather, and traffic."
            }
        ],
        location: "Lempuyang",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
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
        id: 'beji-griya-tanah-lot',
        title: "Oeste de Bali: Purificación, Templos y Atardecer",
        title_en: "West Bali: Purification, Temples & Sunset",
        description: "Vive una purificación espiritual intensa, el bosque Sangeh y el atardecer en Tanah Lot.",
        description_en: "Experience intense spiritual purification, explore Sangeh forest and marvel at Tanah Lot.",
        heroSubtitle: "Desde el ritual de agua en Beji Griya hasta la espectacular danza de fuego frente al océano.",
        heroSubtitle_en: "From the water ritual in Beji Griya to the spectacular fire dance facing the ocean.",
        fullDescription: "Prepárate para una inmersión cultural profunda. Empezaremos el día con un viaje interior realizando el ritual de purificación (Melukat) en la cascada y zona de esculturas escondidas de Beji Griya. Continuaremos paseando entre inmensos árboles de Nuez moscada en Sangeh, admiraremos la arquitectura del templo real de Taman Ayun y terminaremos con uno de los momentos más épicos de Bali: el atardecer en Tanah Lot, donde el templo parece flotar sobre el mar, coronado con el espectacular baile Kecak del fuego.",
        fullDescription_en: "Get ready for a deep cultural immersion. We will start the day with an inner journey performing the purification ritual (Melukat) at the hidden Beji Griya waterfall. We will continue walking among immense nutmeg trees in Sangeh, admire the royal temple of Taman Ayun and finish with sunset at Tanah Lot, crowned with the spectacular Kecak fire dance.",
        price: 69,
        duration: "10 hrs",
        duration_en: "10 hrs",
        image: "https://www.ministryofvillas.com/wp-content/uploads/2016/04/bali-tanah-lot-temple-sunset.jpg",
        images: [
            "https://www.ministryofvillas.com/wp-content/uploads/2016/04/bali-tanah-lot-temple-sunset.jpg",
            "https://static.mybalitrips.com/media/15699/brij-waterfall-1.jpg"
        ],
        badge: "Viaje Místico",
        badge_en: "Mystical Journey",
        category: ['cultura', 'fotografia'],
        mapUrl: "https://maps.google.com/maps?q=Tanah%20Lot%20Temple&t=&z=11&ie=UTF8&iwloc=&output=embed",
        packingList: ['swimwear', 'money', 'camera', 'sunscreen'],
        importantInfo: [
            "Para la purificación (Melukat), trae toalla y ropa interior/bañador. La cascada mojará toda tu ropa exterior (te facilitan un sarong para el agua).",
            "Taman Ayun es un recinto real; no ingresarás a los pabellones internos, la visita es por sus hermosos jardines exteriores.",
            "La danza Kecak tiene plazas limitadas, por lo que cumpliremos el horario con cierta puntualidad para asegurar vuestro asiento frente al atardecer."
        ],
        importantInfo_en: [
            "For the purification (Melukat), bring a towel and swimwear. You will receive a water sarong.",
            "Taman Ayun is a royal precinct; the innermost sanctum is not accessible.",
            "The Kecak dance has limited seats, so the day's pace must be kept to guarantee good spots."
        ],
        itinerary: [
            {
                type: 'pickup',
                duration: "11:00 am",
                activity: "Recogida tranquila",
                activity_en: "Relaxed pickup",
                desc: "Te pasamos a buscar al hotel un poco más tarde para disfrutar de una mañana relajada antes de empezar la ruta.",
                desc_en: "We pick you up at your hotel a bit later to enjoy a relaxed morning before starting the route."
            },
            {
                type: 'visit',
                duration: "2 horas",
                duration_en: "2 hours",
                activity: "Taman Beji Griya (Ritual de Purificación)",
                activity_en: "Taman Beji Griya (Purification Ritual)",
                desc: "Un ritual (Melukat) con gran poder emocional en un cañón tallado único. Esta increíble parada toma tiempo intencionalmente: cambiarte, disfrutar del recinto sagrado, participar en la ceremonia individual, y volver a vestirte en seco.",
                desc_en: "A deep emotional ritual (Melukat) in a unique carved canyon. Time is given to fully experience the blessing and change clothes afterward."
            },
            {
                type: 'photo',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Bosque de Monos de Sangeh",
                activity_en: "Sangeh Monkey Forest",
                desc: "Mucho más sereno e íntimo que otras opciones populares. Pasearás bajo un dosel altísimo con árboles milenarios, protegido por macacos balineses muy tranquilos.",
                desc_en: "Much more serene and intimate than other popular options. You will walk under towering ancient trees protected by peaceful macaques."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Taman Ayun",
                activity_en: "Taman Ayun Temple",
                desc: "Descubre la grandeza del antiguo imperio de Mengwi en este templo rodeado por fosos de agua, prados perfectos y altas pagodas oscuras (Meru).",
                desc_en: "Discover the grandeur of the ancient Mengwi empire in this temple surrounded by water moats, perfect lawns, and dark pagoda towers (Meru)."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo Local",
                activity_en: "Local Lunch",
                desc: "Parada estratégica para recargar energías disfrutando de la gastronomía de Bali.",
                desc_en: "Strategic stop to recharge energies enjoying Balinese gastronomy."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Llegada al Templo Tanah Lot",
                activity_en: "Tanah Lot Temple arrival",
                desc: "Llegaremos con margen al sur de la isla. Tendremos el tiempo perfecto para recorrer este icónico peñón sobre el mar y encontrar el encuadre ideal antes de que caiga el sol.",
                desc_en: "We will arrive with plenty of time to explore this iconic rock formation in the sea and find the perfect photo frame."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Atardecer de Fuego: Danza Kecak",
                activity_en: "Fire Sunset: Kecak Dance",
                desc: "A las 18:00, el anfiteatro cobra vida frente al mar. Déjate hipnotizar por el coro de 50 hombres que forman una orquesta humana única, mientras las llamas y el atardecer iluminan la legendaria danza del Ramayana en un escenario inolvidable.",
                desc_en: "At 6:00 PM, the oceanfront amphitheater comes alive. Be mesmerized by the choir of 50 men forming a unique human orchestra, as flames and the sunset illuminate the legendary Ramayana dance in an unforgettable setting."
            },
            {
                type: 'dropoff',
                duration: "20:00 - 21:00",
                duration_en: "8:00 pm - 9:00 pm",
                activity: "Regreso a casa",
                activity_en: "Return home",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 20:00 y 21:00, dependiendo de la ubicación de tu hotel y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 8:00 PM and 9:00 PM, depending on your hotel location and traffic."
            }
        ],
        location: "Mengwi / Tanah Lot",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
        rating: 5.0,
        reviews: 12,
        reviewsList: [
            { name: "Luciana G.", date: "Hace 1 semana", text: "Lloré purificándome en Beji Griya. Terminamos el día de forma brutal viendo el mar.", date_en: "1 week ago", text_en: "I cried during purification at Beji Griya. We ended the day in a brutal way facing the sea." },
            { name: "Miguel T.", date: "Hace 1 mes", text: "Menos mal que fuimos a Sangeh y no al Monkey Forest de Ubud. Super tranquilo.", date_en: "1 month ago", text_en: "Thank goodness we went to Sangeh instead of Ubud Monkey Forest. Super quiet." },
            { name: "Raúl P.", date: "Hace 2 meses", text: "La organización impecable, pudimos ver el atardecer antes del baile sin correr.", date_en: "2 months ago", text_en: "Impeccable organization, we could watch the sunset before the dance without rushing." }
        ]
    },
    {
        id: 'uluwatu-south-beaches',
        title: "Uluwatu: Acantilados, Playas y Atardeceres",
        title_en: "Uluwatu: Cliffs, Beaches & Sunsets",
        description: "Arena blanca, el templo sobre el abismo y el atardecer vibrante del sur.",
        description_en: "White sand, the cliff temple and the vibrant south sunset.",
        heroSubtitle: "El día perfecto: cálidas playas de arena blanca culminan en la magia del Templo Uluwatu.",
        heroSubtitle_en: "The perfect day: warm white sand beaches culminate in the magic of Uluwatu Temple.",
        fullDescription: "Explora la península de Bukit, el secreto mejor guardado para los amantes del sol y la brisa oceánica. Navegaremos por la costa sur para descubrir playas inmaculadas de arena blanca y agua turquesa protegidas por inmensos muros de piedra caliza. Terminaremos la jornada de la forma más épica posible: al borde de un acantilado de 70 metros de altura en el Templo de Uluwatu, donde la tradicional danza del fuego cobrará vida mientras el sol se hunde en el extenso Océano Índico.",
        fullDescription_en: "Explore the Bukit peninsula, the best kept secret for sun and ocean breeze lovers. We will navigate the south coast to discover immaculate white sand and turquoise water beaches protected by immense limestone walls. We will end the day in the most epic way possible: on the edge of a 70-meter-high cliff at the Uluwatu Temple, where the traditional fire dance will come alive as the sun sinks into the Indian Ocean.",
        price: 60,
        duration: "8-10 hrs",
        duration_en: "8-10 hrs",
        image: "/images/tours/uluwatu/uluwatu-temple.webp",
        images: [
            "/images/tours/uluwatu/uluwatu-temple.webp",
            "/images/tours/uluwatu/melasti-beach.webp",
            "/images/tours/uluwatu/melasti-beach.webp"
        ],
        badge: "Día de Playa",
        badge_en: "Beach Day",
        category: ['playas', 'cultura', 'fotografia'],
        mapUrl: "https://maps.google.com/maps?q=Uluwatu%20Temple&t=&z=11&ie=UTF8&iwloc=&output=embed",
        packingList: ['swimwear', 'sunscreen', 'camera', 'money'],
        importantInfo: [
            "El precio está optimizado para inicios/finales en el sur (Seminyak, Kuta, Jimbaran, Nusa Dua, Uluwatu). Salidas desde el área de Ubud tienen un pequeño suplemento por lejanía.",
            "Lleva ropa de baño lista y una muda para el templo. Se requiere Sarong para entrar a Uluwatu (nosotros te lo prestamos).",
            "Los monos de Uluwatu son extremadamente listos. Evita llevar gafas de sol sueltas, gorras o joyería colgante que puedan arrancar."
        ],
        importantInfo_en: [
            "The price is optimized for starts/ends in the south (Seminyak, Kuta, Nusa Dua, Uluwatu). Departures from Ubud have a small distance supplement.",
            "Wear swimwear under your clothes and bring a change for the temple. Sarong is required at Uluwatu (we provide it).",
            "Uluwatu monkeys are very smart. Avoid wearing loose sunglasses or pendants."
        ],
        itinerary: [
            {
                type: 'pickup',
                duration: "11:00",
                activity: "Salida Costera",
                activity_en: "Coastal Departure",
                desc: "Recogida tranquila a media mañana en tu hotel en Uluwatu, para poner rumbo a la preciosa península caliza del sur (Bukit).",
                desc_en: "Relaxed mid-morning pick-up at your hotel in Uluwatu, to head to the beautiful southern limestone peninsula (Bukit)."
            },
            {
                type: 'photo',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "GWK Cultural Park (Opcional)",
                activity_en: "GWK Cultural Park (Optional)",
                desc: "Si te impresiona la arquitectura monumental, podemos ver la masiva estatua del Dios Wisnu (de las más altas de Asia). Alternativamente, podemos saltarlo para dedicar más tiempo a descubrir lugares y relajarnos frente al mar.",
                desc_en: "If you are impressed by monumental architecture, we can see the massive Wisnu statue. Alternatively, we can skip it to spend more time discovering places and relaxing by the sea."
            },
            {
                type: 'beach',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Playa Melasti",
                activity_en: "Melasti Beach",
                desc: "La carretera en zig-zag tallada en el acantilado te dejará sin aliento. Un escenario de agua cristalina y arenas blancas donde relajarse al máximo estilo balinés.",
                desc_en: "The zig-zag road carved into the cliff will leave you breathless. Crystal clear waters and white sands to relax in true Balinese style."
            },
            {
                type: 'beach',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Playa Pandawa",
                activity_en: "Pandawa Beach",
                desc: "Conocida como la 'playa secreta', impresiona por las enormes estatuas talladas en la roca y su extensa costa de arena blanca perfecta para pasear.",
                desc_en: "Known as the 'secret beach', it impresses with massive statues carved into the rock and its extensive white sand coast perfect for strolling."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo cerca del mar",
                activity_en: "Lunch by the sea",
                desc: "Pausa para degustar mariscos frescos o cocina local en el ambiente playero del sur. Te recomendaremos las mejores opciones según tus gustos.",
                desc_en: "Take a break to taste fresh seafood or local cuisine in the beach atmosphere of the south. We will recommend the best options according to your tastes."
            },
            {
                type: 'beach',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Playa Padang Padang",
                activity_en: "Padang Padang Beach",
                desc: "Escondida entre cuevas, esta cala se hizo mundialmente famosa en Hollywood. Un rincón vibrante de arena dorada y el punto magnético para los grandes surfistas.",
                desc_en: "Hidden between caves, this cove became world famous in Hollywood. A vibrant spot of golden sand."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Pura Luhur Uluwatu",
                activity_en: "Uluwatu Temple",
                desc: "Siente el poder del océano desde este antiquísimo templo apoyado en un acantilado de corte vertical. Un paisaje visualmente imponente.",
                desc_en: "Feel the power of the ocean from this ancient temple perched on a vertical cliff. A visually stunning landscape."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Atardecer: Danza de Fuego Kecak",
                activity_en: "Sunset: Kecak Fire Dance",
                desc: "A las 18:00, viviremos el espectáculo más impactante de la isla. Con los tickets previstos con antelación, nos sentaremos a admirar cómo los cánticos crecen mientras el sol pinta el cielo de rojo.",
                desc_en: "At 6:00 PM, experience the island's most impactful show. With tickets ready, we sit to admire the chants grow as the sun paints the sky red."
            },
            {
                type: 'dropoff',
                duration: "20:00 - 21:00",
                duration_en: "8:00 pm - 9:00 pm",
                activity: "Regreso a casa",
                activity_en: "Return home",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 20:00 y 21:00, dependiendo de la ubicación de tu hotel y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 8:00 PM and 9:00 PM, depending on your hotel location and traffic."
            }
        ],
        location: "Península Sur (Bukit)",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
        rating: 4.8,
        reviews: 32,
        reviewsList: [
            { name: "Andrea V.", date: "Hace 2 semanas", text: "La playa Melasti me enamoró por completo. Nos tomamos algo relajados viendo el mar antes del templo.", date_en: "2 weeks ago", text_en: "Melasti beach completely made me fall in love. We drank seeing the sea." },
            { name: "Sebas F.", date: "Hace 1 mes", text: "El atardecer en ese acantilado no tiene nombre. Mucho ojo con los monos que me quitaron las gafas y Perty me ayudó a recuperarlas haha.", date_en: "1 month ago", text_en: "The sunset on that cliff has no name. Watch out for the monkeys, they stole my glasses and Perty helped get them back haha." }
        ]
    },
    {
        id: 'transfers-bali',
        title: "Traslados Privados: Aeropuerto y Puertos",
        title_en: "Private Transfers: Airport & Harbors",
        description: "Transporte puntual, sin estrés y con la calidad de Cantik Tours.",
        description_en: "Punctual, stress-free transport with Cantik Tours quality.",
        heroSubtitle: "Tu llegada o salida de Bali, con la tranquilidad y puntualidad que mereces.",
        heroSubtitle_en: "Your arrival or departure from Bali, with the peace of mind and punctuality you deserve.",
        fullDescription: "Viaja con total tranquilidad y comodidad. Evita las esperas y el estrés del transporte público o el regateo. Nuestro conductor privado te estará esperando con un cartel personalizado para llevarte directamente a tu destino en un vehículo moderno, limpio y con aire acondicionado. Servicio puntual, seguro y sin sorpresas, ideal para empezar o terminar tu viaje en Bali de la mejor manera.",
        fullDescription_en: "Travel with complete peace of mind and comfort. Avoid the wait and stress of public transport or haggling. Our private driver will be waiting for you with a personalized sign to take you directly to your destination in a modern, clean, and air-conditioned vehicle. Punctual, safe service with no surprises, ideal for starting or ending your Bali trip the best way.",
        price: 25,
        duration: "Flexible",
        duration_en: "Flexible",
        image: "/images/tours/transfers-bali/bali-private-airport-transfer.webp",
        images: ["/images/tours/transfers-bali/bali-private-airport-transfer.webp"],
        badge: "Servicio Directo",
        badge_en: "Direct Service",
        category: "traslados",
        isTransfer: true,
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Ayuda con maletas"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Help with bags"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
        rating: 5.0,
        reviews: 120
    },
    {
        id: 'waterfalls-route',
        title: "Ruta de las Cascadas",
        title_en: "Waterfalls Route",
        description: "Un tour dedicado exclusivamente a descubrir las cascadas más mágicas de Bali en un solo día.",
        description_en: "A tour dedicated exclusively to discovering Bali's most magical waterfalls in a single day.",
        heroSubtitle: "Kanto Lampo, Tibumana, Taman Sari, Goa Raja y Tukad Cepung: la esencia del agua en la selva.",
        heroSubtitle_en: "Kanto Lampo, Tibumana, Taman Sari, Goa Raja and Tukad Cepung: the essence of water in the jungle.",
        fullDescription: "Prepárate para mojarte y maravillarte. Este tour está diseñado para los amantes de la naturaleza y la fotografía que quieren evitar las rutas tradicionales y centrarse en la belleza de las cascadas de Bali. Desde la cueva iluminada de Tukad Cepung hasta la serenidad de Tibumana, vive un día refrescante rodeado de vegetación tropical exuberante.",
        fullDescription_en: "Get ready to get wet and marvel. This tour is designed for nature and photography lovers who want to avoid traditional routes and focus on the beauty of Bali's waterfalls. From the light-filled cave of Tukad Cepung to the serenity of Tibumana, experience a refreshing day surrounded by lush tropical vegetation.",
        price: 65,
        duration: "8-10 hrs",
        duration_en: "8-10 hrs",
        image: "/images/tours/ubud-central/ubud-central-kanto-lampo.webp",
        images: [
            "/images/tours/ubud-central/ubud-central-kanto-lampo.webp",
            "/images/tours/ubud-central/ubud-central-kanto-lampo.webp",
            "/images/tours/ubud-central/ubud-central-kanto-lampo.webp"
        ],
        badge: "Nuevo Tour",
        badge_en: "New Tour",
        category: ['cascadas', 'fotografia', 'aventura'],
        mapUrl: "https://www.google.com/maps/dir/Tukad+Cepung+Waterfall/Tibumana+Waterfall/Kanto+Lampo+Waterfall/Goa+Raja+Waterfall/@-8.4876612,115.3125642,13z",
        packingList: ['swimwear', 'shoes', 'camera', 'money'],
        importantInfo: [
            "Trae bañador, toalla y calzado que se pueda mojar (escarpines recomendados).",
            "Prepárate para subir y bajar bastantes escalones en cada cascada."
        ],
        importantInfo_en: [
            "Bring swimwear, a towel, and water shoes (recommended).",
            "Be prepared to walk up and down many stairs at each waterfall."
        ],
        itinerary: [
            {
                type: 'pickup',
                duration: "08:30",
                activity: "Recogida en hotel",
                activity_en: "Hotel pickup",
                desc: "Comenzamos el día con energía para explorar el lado más húmedo y bello de Bali.",
                desc_en: "We start the day with energy to explore the wettest and most beautiful side of Bali."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Kanto Lampo",
                activity_en: "Kanto Lampo Waterfall",
                desc: "Famosa por sus rocas escalonadas que crean una cortina de agua espectacular, perfecta para fotos creativas.",
                desc_en: "Famous for its stepping rocks that create a spectacular water curtain, perfect for creative photos."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Tibumana",
                activity_en: "Tibumana Waterfall",
                desc: "Un oasis de tranquilidad con una caída de agua perfecta y una piscina natural ideal para un baño refrescante.",
                desc_en: "An oasis of tranquility with a perfect waterfall drop and a natural pool ideal for a refreshing swim."
            },
            {
                type: 'photo',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Cascada Taman Sari",
                activity_en: "Taman Sari Waterfall",
                desc: "Una preciosa cascada de dos niveles rodeada de vegetación, con piscinas naturales muy limpias y perfectas para relajarse.",
                desc_en: "A beautiful two-level waterfall surrounded by greenery, with very clean natural pools perfect for relaxing."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo Local",
                activity_en: "Local Lunch",
                desc: "Pausa para disfrutar de la comida local y recargar fuerzas.",
                desc_en: "Break to enjoy local food and recharge."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Goa Raja",
                activity_en: "Goa Raja Waterfall",
                desc: "Una joya menos conocida con una cueva impresionante y un entorno selvático muy virgen.",
                desc_en: "A lesser-known gem with an impressive cave and a very pristine jungle setting."
            },
            {
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Tukad Cepung",
                activity_en: "Tukad Cepung Waterfall",
                desc: "Camina por un cañón para descubrir esta cascada única escondida dentro de una cueva, un final espectacular para la ruta.",
                desc_en: "Walk through a canyon to discover this unique waterfall hidden inside a cave, a spectacular end to the route."
            },
            {
                type: 'dropoff',
                duration: "17:30 - 18:30",
                duration_en: "5:30 pm - 6:30 pm",
                activity: "Regreso al hotel",
                activity_en: "Return to hotel",
                desc: "Te dejamos de vuelta en tu alojamiento para que descanses tras un día inolvidable. La llegada suele ser entre las 17:30 y 18:30, dependiendo del ritmo del día, el clima y el tráfico.",
                desc_en: "We drop you back at your accommodation to rest after an unforgettable day. Arrival is usually between 5:30 PM and 6:30 PM, depending on the tour pace, weather, and traffic."
            }
        ],
        location: "Bangli / Gianyar",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Tickets, entradas o donativos", "Comidas / Bebestibles", "Seguro médico (Se recomienda siempre tener un seguro medico internacional)"],
        not_included_en: ["Tickets, entrance fees or donations", "Meals / Drinks", "Medical insurance (International medical insurance is always recommended)"],
        rating: 5.0,
        reviews: 0
    }
];
