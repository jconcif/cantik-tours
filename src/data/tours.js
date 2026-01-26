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
                desc: "Elige entre la caída perfecta de Tibumana o la belleza escalonada de Kanto Lampo.",
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
        image: "/images/tours/east-bali-besakih/besakih-mother-temple-tour.jpg",
        images: ["/images/tours/east-bali-besakih/besakih-mother-temple-tour.jpg"],
        badge: "Imprescindible",
        badge_en: "Must See",
        category: "cultura",
        itinerary: [
            {
                type: 'pickup',
                duration: "15-30 min",
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
                desc: "Jardines reales con fuentes y peces koi gigantes.",
                desc_en: "Royal gardens with fountains and giant koi fish."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple",
                desc: "El complejo más grande y sagrado de Bali.",
                desc_en: "The largest and holiest complex in Bali."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo en Kintamani",
                activity_en: "Lunch in Kintamani",
                desc: "Comida con vistas al volcán y lago Batur.",
                desc_en: "Meal with views of the volcano and Lake Batur."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Aldea Penglipuran",
                activity_en: "Penglipuran Village",
                desc: "Aldea tradicional de bambú perfectamente conservada.",
                desc_en: "Perfectly preserved traditional bamboo village."
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel"
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
        description: "El tour más viral. Captura la foto icónica en Lempuyang y explora el Templo Madre.",
        description_en: "The most viral tour. Capture the iconic photo at Lempuyang and explore the Mother Temple.",
        fullDescription: "Prepárate para las vistas más espectaculares. Madrugaremos para llegar a las famosas Puertas del Cielo en Lempuyang, seguidas de la belleza real de Tirta Gangga y la grandiosidad del Templo Besakih.",
        fullDescription_en: "Get ready for the most spectacular views. We will start early to reach the famous Gates of Heaven at Lempuyang, followed by the royal beauty of Tirta Gangga and the grandeur of Besakih Temple.",
        price: 65,
        duration: "10-12 horas",
        duration_en: "10-12 hours",
        image: "/images/tours/lempuyang-gates/lempuyang-gates-of-heaven-tour.jpg",
        images: ["/images/tours/lempuyang-gates/lempuyang-gates-of-heaven-tour.jpg"],
        badge: "Más Popular",
        badge_en: "Most Popular",
        category: "fotografia",
        itinerary: [
            {
                type: 'pickup',
                duration: "15-30 min",
                activity: "Recogida temprana",
                activity_en: "Early pickup",
                desc: "Te pasaremos a recoger en tu hotel para evitar las colas.",
                desc_en: "We will pick you up at your hotel to avoid the queues."
            },
            {
                type: 'photo',
                duration: "2 horas",
                duration_en: "2 hours",
                activity: "Templo Lempuyang (Puertas del cielo)",
                activity_en: "Lempuyang Temple",
                desc: "Famosa puerta con vistas al volcán Agung.",
                desc_en: "Famous gate with views of Mount Agung."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Tirta Gangga",
                activity_en: "Tirta Gangga",
                desc: "Palacio de agua y jardines reales.",
                desc_en: "Water palace and royal gardens."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo local",
                activity_en: "Local lunch"
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple"
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel"
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
        id: 'transfer-amed',
        title: "Traslado Tour: De Ubud a Amed",
        title_en: "Tour Transfer: Ubud to Amed",
        description: "Aprovecha tu traslado a Amed para visitar cascadas y palacios reales.",
        description_en: "Make the most of your transfer to Amed by visiting waterfalls and royal palaces.",
        fullDescription: "No pierdas un día solo viajando. Convierte tu traslado de Ubud a Amed en una aventura visitando cascadas mágicas y el palacio de agua más famoso de Bali.",
        fullDescription_en: "Don't waste a day just traveling. Turn your transfer from Ubud to Amed into an adventure by visiting magical waterfalls and Bali's most famous water palace.",
        price: 55,
        duration: "8-9 horas",
        duration_en: "8-9 hours",
        image: "/images/tours/transfer-amed/bali-transfer-tour-amed.jpg",
        images: ["/images/tours/transfer-amed/bali-transfer-tour-amed.jpg"],
        badge: "Traslado + Tour",
        badge_en: "Transfer + Tour",
        category: "aventura",
        itinerary: [
            {
                type: 'pickup',
                duration: "15-30 min",
                activity: "Recogida en Ubud",
                activity_en: "Pickup in Ubud",
                desc: "Te pasaremos a recoger directamente en tu hotel a la hora acordada.",
                desc_en: "We will pick you up directly at your hotel at the agreed time."
            },
            {
                type: 'photo',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Cascada Kanto Lampo o Tibumana",
                activity_en: "Kanto Lampo or Tibumana waterfall",
                desc: "Parada para refrescarse y fotos en el agua.",
                desc_en: "Stop for a break and water photos."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Goa Lawah (opcional)",
                activity_en: "Goa Lawah temple (optional)",
                desc: "Cueva de murciélagos sagrados.",
                desc_en: "Sacred bat cave."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Tirta Gangga (water palace)",
                activity_en: "Tirta Gangga water palace"
            },
            {
                type: 'dropoff',
                activity: "Llegada al hotel en Amed",
                activity_en: "Arrival at Amed hotel",
                desc: "Te dejamos en tu nuevo alojamiento.",
                desc_en: "We drop you off at your new accommodation."
            }
        ],
        location: "Costa Este",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.7,
        reviews: 18,
        reviewsList: [
            { name: "Miguel A.", date: "Hace 2 meses", text: "La mejor forma de ir a Amed sin perder el día.", date_en: "2 months ago", text_en: "The best way to get to Amed without wasting the day." },
            { name: "Laura S.", date: "Hace 3 meses", text: "Muy cómodo el viaje y las paradas muy bien elegidas.", date_en: "3 months ago", text_en: "Very comfortable journey and very well chosen stops." },
            { name: "Esteban D.", date: "Hace 4 meses", text: "Fantastico trayecto, lo recomiendo 100%.", date_en: "4 months ago", text_en: "Fantastic journey, I recommend it 100%." }
        ]
    },
    {
        id: 'amed-volcano',
        title: "Amed y el Volcán: El Bali más Virgen",
        title_en: "Amed & Volcano: Untouched Bali",
        description: "Visita Besakih, admira el volcán Batur y termina con un atardecer mágico en Amed.",
        description_en: "Visit Besakih, admire Mt. Batur and end with a magical sunset in Amed.",
        fullDescription: "Una ruta completa por el este profundo. Desde las montañas y el Templo Madre hasta las playas de arena negra de Amed para ver uno de los mejores atardeceres de la isla con vistas al monte Agung.",
        fullDescription_en: "A complete route through the deep east. From the mountains and Mother Temple to the black sand beaches of Amed to watch one of the best sunsets with views of Mount Agung.",
        price: 65,
        duration: "12-13 horas",
        duration_en: "12-13 hours",
        image: "/images/tours/amed-volcano/amed-volcano-untouched-bali.jpg",
        images: ["/images/tours/amed-volcano/amed-volcano-untouched-bali.jpg"],
        badge: "Aventura Larga",
        badge_en: "Full Experience",
        category: "aventura",
        itinerary: [
            {
                type: 'pickup',
                duration: "15-30 min",
                activity: "Recogida temprana",
                activity_en: "Early pickup",
                desc: "Te pasaremos a recoger directamente en tu hotel a la hora acordada.",
                desc_en: "We will pick you up directly at your hotel at the agreed time."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Aldea Penglipuran",
                activity_en: "Penglipuran Village",
                desc: "Cultura tradicional intacta en una aldea de bambú.",
                desc_en: "Untouched traditional culture in a bamboo village."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Vistas Kintamani",
                activity_en: "Kintamani views",
                desc: "Vistas inolvidables del cráter del volcán Batur.",
                desc_en: "Unforgettable views of the Batur volcano crater."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple"
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Palacio Tirta Gangga",
                activity_en: "Tirta Gangga Palace"
            },
            {
                type: 'photo',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Atardecer en Amed",
                activity_en: "Sunset in Amed",
                desc: "Atardecer con vistas al coloso Agung.",
                desc_en: "Sunset with views of colossus Agung."
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel"
            }
        ],
        location: "Amed / Besakih",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.9,
        reviews: 32,
        reviewsList: [
            { name: "Pilar J.", date: "Hace 1 mes", text: "Amed tiene un encanto especial. El tour capturó todo perfectamente.", date_en: "1 month ago", text_en: "Amed has a special charm. The tour captured everything perfectly." },
            { name: "Francisco G.", date: "Hace 2 meses", text: "Un día largo pero vale la pena cada segundo. El atardecer es de otro mundo.", date_en: "2 months ago", text_en: "A long day but worth every second. The sunset is from another world." },
            { name: "Monica P.", date: "Hace 5 meses", text: "Muy buena comunicacion con Javi para organizar todo.", date_en: "5 months ago", text_en: "Very good communication with Javi to organize everything." },
            { name: "Raul O.", date: "Hace 1 semana", text: "Recomiendo mucho este tour si buscas algo fuera de lo comun.", date_en: "1 week ago", text_en: "I highly recommend this tour if you're looking for something out of the ordinary." }
        ]
    },
    {
        id: 'north-lake-temple',
        title: "Ubud Norte: Templos y Cascadas",
        title_en: "North Ubud: Temples & Waterfalls",
        description: "El icónico templo sobre el lago, las mayores cascadas y arrozales Patrimonio UNESCO.",
        description_en: "The iconic lake temple, biggest waterfalls and UNESCO rice terraces.",
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
        image: "/images/tours/lovina-dolphins/lovina-dolphins-sunrise-tour.jpg",
        images: ["/images/tours/lovina-dolphins/lovina-dolphins-sunrise-tour.jpg"],
        badge: "Aventura Épica",
        badge_en: "Epic Adventure",
        category: "aventura",
        itinerary: [
            {
                type: 'pickup',
                duration: "15-30 min",
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
                activity: "Vistas lagos gemelos",
                activity_en: "Twin lakes views"
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Ulun Danu Beratan",
                activity_en: "Ulun Danu Beratan temple"
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Terrazas de Jatiluwih",
                activity_en: "Jatiluwih rice terraces"
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel"
            }
        ],
        location: "Lovina / Norte",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Barca para delfines", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Dolphin boat", "Mineral water", "Snacks"],
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
        id: 'ubud-best-purification',
        title: "Lo Mejor de Ubud: Cascada y Purificación",
        title_en: "Best of Ubud: Waterfall & Purification",
        description: "El tour más solicitado: Purificación en Tirta Empul, monos, arrozales y cascada.",
        description_en: "The most requested tour: Purification at Tirta Empul, monkeys, rice terraces and waterfall.",
        fullDescription: "Perfecto para tu primer día en Ubud. Conocerás la espiritualidad balinesa en el ritual de Tirta Empul, la vibrante naturaleza del Bosque de los Monos y la belleza de Tegalalang y Tegenungan.",
        fullDescription_en: "Perfect for your first day in Ubud. Experience Balinese spirituality at the Tirta Empul ritual, the vibrant nature of the Monkey Forest and the beauty of Tegalalang and Tegenungan.",
        price: 55,
        duration: "9-10 horas",
        duration_en: "9-10 hours",
        image: "/images/tours/ubud-best-purification/ubud-waterfall-purification-tour.jpg",
        images: ["/images/tours/ubud-best-purification/ubud-waterfall-purification-tour.jpg"],
        badge: "Top Ventas",
        badge_en: "Best Seller",
        category: "cultura",
        itinerary: [
            {
                type: 'pickup',
                duration: "15-30 min",
                activity: "Recogida en hotel",
                activity_en: "Hotel pickup",
                desc: "Te pasaremos a recoger directamente en tu hotel a la hora acordada.",
                desc_en: "We will pick you up directly at your hotel at the agreed time."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Bosque de los monos",
                activity_en: "Monkey forest",
                desc: "Explora el santuario de monos en el centro de Ubud.",
                desc_en: "Explore the monkey sanctuary in central Ubud."
            },
            {
                type: 'photo',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Cascada Tegenungan",
                activity_en: "Tegenungan waterfall",
                desc: "Impresionante caída de agua rodeada de selva.",
                desc_en: "Impressive waterfall surrounded by jungle."
            },
            {
                type: 'visit',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Ritual Tirta Empul",
                activity_en: "Tirta Empul ritual",
                desc: "Participa en la purificación sagrada bajo las fuentes.",
                desc_en: "Participate in the sacred purification under the fountains."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo en Tis Café",
                activity_en: "Lunch at Tis Café",
                desc: "Relájate con vistas a los arrozales.",
                desc_en: "Relax with rice terrace views."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Terrazas de Tegalalang",
                activity_en: "Tegalalang terraces"
            },
            {
                type: 'dropoff',
                activity: "Regreso al hotel",
                activity_en: "Return to hotel"
            }
        ],
        location: "Ubud / Gianyar",
        included: ["Transporte privado", "Conductor / Guía", "Gasolina", "Parking / Peajes", "Agua mineral", "Snacks"],
        included_en: ["Private transport", "Driver / Guide", "Gasoline", "Parking / Tolls", "Mineral water", "Snacks"],
        not_included: ["Entradas / Tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals", "Travel insurance"],
        rating: 4.9,
        reviews: 62,
        reviewsList: [
            { name: "Paula V.", date: "Hace 1 semana", text: "Tirta Empul es una experiencia espiritual que hay que vivir.", date_en: "1 week ago", text_en: "Tirta Empul is a spiritual experience you must live." },
            { name: "Marcos L.", date: "Hace 3 semanas", text: "Ubud en un día, muy bien aprovechado el tiempo. El café Tis espectacular.", date_en: "3 weeks ago", text_en: "Ubud in one day, time very well used. Tis café spectacular." },
            { name: "Adriana S.", date: "Hace 1 mes", text: "Perty es una guía fantástica. Nos hizo sentir como en casa.", date_en: "1 month ago", text_en: "Perty is a fantastic guide. She made us feel at home." },
            { name: "Luis B.", date: "Hace 2 meses", text: "El bosque de los monos es divertidisimo, cuidado con las gafas!", date_en: "2 months ago", text_en: "The monkey forest is hilarious, watch your glasses!" },
            { name: "Clara G.", date: "Hace 3 meses", text: "Fue nuestro primer tour y nos encantó.", date_en: "3 months ago", text_en: "It was our first tour and we loved it." }
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
