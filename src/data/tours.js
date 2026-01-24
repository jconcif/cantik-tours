export const tours = [
    {
        id: 'ubud-central',
        title: "Ubud Central: Templos y Arrozales",
        title_en: "Ubud Central: Temples & Rice Terraces",
        description: "Ritual de purificación, templos antiguos y las mejores terrazas de arroz de Ubud.",
        description_en: "Purification ritual, ancient temples and the best rice terraces in Ubud.",
        fullDescription: "Explora el corazón espiritual y natural de Bali. Este tour te lleva por templos sagrados menos transitados, cascadas refrescantes y los icónicos arrozales de Tegallalang, terminando con la opción de relajarte en los mejores cafés con vistas.",
        fullDescription_en: "Explore the spiritual and natural heart of Bali. This tour takes you through less-traveled sacred temples, refreshing waterfalls and the iconic Tegalalang rice terraces, ending with the option to relax in the best cafes with views.",
        price: 55,
        duration: "8-10 horas",
        duration_en: "8-10 hours",
        image: "/images/tours/waterfalls-circuit.jpg",
        badge: "Cultura Local",
        badge_en: "Local Culture",
        category: "cultura",
        itinerary: [
            { time: "08:30", activity: "Recogida en Hotel", activity_en: "Hotel Pickup" },
            {
                time: "09:30",
                activity: "Beji Griya o Cascada Tibumana",
                activity_en: "Beji Griya or Tibumana Waterfall",
                desc: "Beji Griya ofrece un ritual de purificación único en un entorno de cueva natural, mientras que Tibumana es conocida por su caída perfecta de agua rodeada de selva.",
                desc_en: "Beji Griya offers a unique purification ritual in a natural cave setting, while Tibumana is known for its perfect waterfall drop surrounded by jungle."
            },
            {
                time: "11:30",
                activity: "Templo Gunung Kawi Tampaksiring",
                activity_en: "Gunung Kawi Tampaksiring Temple",
                desc: "Impresionantes santuarios tallados directamente en la roca de un acantilado del siglo XI.",
                desc_en: "Stunning shrines carved directly into the rock of an 11th-century cliff."
            },
            {
                time: "13:30",
                activity: "Pura Mengening o Sebatu",
                activity_en: "Pura Mengening or Sebatu",
                desc: "Templos de purificación tradicionales mucho más tranquilos donde podrás observar o participar en rituales locales auténticos.",
                desc_en: "Much quieter traditional purification temples where you can observe or participate in authentic local rituals."
            },
            {
                time: "15:00",
                activity: "Tegalalang Rice Terrace",
                activity_en: "Tegalalang Rice Terrace",
                desc: "Pasea por los arrozales en terrazas más famosos de Bali, Patrimonio de la Humanidad.",
                desc_en: "Walk through the most famous terraced rice fields in Bali, a World Heritage site."
            },
            {
                time: "16:30",
                activity: "Atardecer en Tis Café o Cretya",
                activity_en: "Sunset at Tis Café or Cretya",
                desc: "Relájate en un club de piscina con las mejores vistas de las terrazas para terminar el día.",
                desc_en: "Relax at a pool club with the best views of the terraces to end the day."
            }
        ],
        location: "Ubud Central",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
        rating: 4.9,
        reviews: 45,
        reviewsList: [
            { name: "Carlos M.", date: "Hace 2 días", text: "Increíble experiencia, Perty nos explicó todo con muchísima paciencia.", date_en: "2 days ago", text_en: "Amazing experience, Perty explained everything with a lot of patience." },
            { name: "Lucía R.", date: "Hace 1 semana", text: "La purificación fue el momento más especial de mi viaje.", date_en: "1 week ago", text_en: "The purification was the most special moment of my trip." },
            { name: "Andrés G.", date: "Hace 3 semanas", text: "Ubud central es mágico con este tour. Sin prisas y muy auténtico.", date_en: "3 weeks ago", text_en: "Central Ubud is magical with this tour. No rush and very authentic." },
            { name: "Marta H.", date: "Hace 1 mes", text: "El conductor fue muy amable y el coche impecable. Repetiremos!", date_en: "1 month ago", text_en: "The driver was very kind and the car spotless. We will repeat!" },
            { name: "Santi F.", date: "Hace 2 meses", text: "Todo perfecto. Una forma distinta de ver Ubud lejos de las masas.", date_en: "2 months ago", text_en: "Everything perfect. A different way to see Ubud away from the crowds." }
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
        image: "/images/tours/besakih-kintamani.jpg",
        badge: "Imprescindible",
        badge_en: "Must See",
        category: "cultura",
        itinerary: [
            { time: "08:00", activity: "Salida desde Ubud", activity_en: "Departure from Ubud" },
            {
                time: "10:00",
                activity: "Palacio Tirta Gangga",
                activity_en: "Tirta Gangga Palace",
                desc: "Antiguo palacio real de agua con increíbles fuentes, estatuas y jardines llenos de peces koi gigantes.",
                desc_en: "Former royal water palace with incredible fountains, statues and gardens full of giant koi fish."
            },
            {
                time: "12:00",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple",
                desc: "El complejo de templos más grande y sagrado de Bali, ubicado majestuosamente en la ladera del volcán Agung.",
                desc_en: "The largest and holiest temple complex in Bali, majestically located on the slopes of Mount Agung."
            },
            {
                time: "14:00",
                activity: "Almuerzo con vistas al Volcán Batur",
                activity_en: "Lunch with Batur Volcano views",
                desc: "Disfruta de la gastronomía local con una de las mejores panorámicas del volcán activo Batur y su lago.",
                desc_en: "Enjoy local gastronomy with one of the best panoramas of the active Batur volcano and its lake."
            },
            {
                time: "16:00",
                activity: "Penglipuran Village",
                activity_en: "Penglipuran Village",
                desc: "Considerada una de las aldeas más limpias del mundo, es el ejemplo perfecto de cultura y arquitectura tradicional balinesa.",
                desc_en: "Considered one of the cleanest villages in the world, it is the perfect example of traditional Balinese culture and architecture."
            }
        ],
        location: "Este de Bali",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
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
        image: "/images/tours/instagram-gates.jpg",
        badge: "Más Popular",
        badge_en: "Most Popular",
        category: "fotografia",
        itinerary: [
            { time: "07:00", activity: "Salida de Ubud", activity_en: "Departure from Ubud" },
            {
                time: "09:30",
                activity: "Templo Lempuyang (Puertas del Cielo)",
                activity_en: "Lempuyang Temple",
                desc: "Famoso por su puerta icónica que enmarca el volcán Agung. Es un sitio de peregrinación sagrado.",
                desc_en: "Famous for its iconic gate that frames Mount Agung. It is a sacred pilgrimage site."
            },
            {
                time: "12:00",
                activity: "Tirta Gangga (Water Palace)",
                activity_en: "Tirta Gangga Water Palace",
                desc: "Un rincón de paz y belleza real perfecta para tus mejores fotos.",
                desc_en: "A corner of peace and royal beauty perfect for your best photos."
            },
            {
                time: "13:30",
                activity: "Almuerzo local",
                activity_en: "Local lunch"
            },
            {
                time: "15:30",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple",
                desc: "Explora el complejo central de la religión balinesa.",
                desc_en: "Explore the central complex of the Balinese religion."
            }
        ],
        location: "Lempuyang",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
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
        image: "/images/tours/tanah-lot-sunset.jpg",
        badge: "Traslado + Tour",
        badge_en: "Transfer + Tour",
        category: "aventura",
        itinerary: [
            { time: "08:00", activity: "Recogida en Ubud", activity_en: "Pickup in Ubud" },
            {
                time: "09:00",
                activity: "Cascada Kanto Lampo o Tibumana",
                activity_en: "Kanto Lampo or Tibumana Waterfall",
                desc: "Kanto Lampo es una cascada escalonada ideal para fotos artísticas en el agua.",
                desc_en: "Kanto Lampo is a stepped waterfall ideal for artistic water photos."
            },
            {
                time: "11:00",
                activity: "Templo Goa Lawah (Opcional)",
                activity_en: "Goa Lawah Temple (Optional)",
                desc: "Famoso templo en una cueva que alberga miles de murciélagos sagrados.",
                desc_en: "Famous cave temple that houses thousands of sacred bats."
            },
            {
                time: "13:00",
                activity: "Tirta Gangga (Water Palace)",
                activity_en: "Tirta Gangga Water Palace"
            },
            { time: "16:00", activity: "Llegada al Hotel en Amed", activity_en: "Arrival at Amed Hotel" }
        ],
        location: "Costa Este",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
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
        image: "/images/tours/penglipuran-village.jpg",
        badge: "Aventura Larga",
        badge_en: "Full Experience",
        category: "aventura",
        itinerary: [
            { time: "08:00", activity: "Salida desde Ubud", activity_en: "Departure from Ubud" },
            {
                time: "09:30",
                activity: "Penglipuran traditional village",
                activity_en: "Penglipuran Village",
                desc: "Cultura tradicional intacta en una aldea de bambú.",
                desc_en: "Untouched traditional culture in a bamboo village."
            },
            {
                time: "11:30",
                activity: "Vistas panorámicas Batur (Kintamani)",
                activity_en: "Batur Views (Kintamani)",
                desc: "Vistas inolvidables del cráter del volcán Batur.",
                desc_en: "Unforgettable views of the Batur volcano crater."
            },
            {
                time: "13:00",
                activity: "Templo Madre Besakih",
                activity_en: "Besakih Mother Temple"
            },
            {
                time: "15:00",
                activity: "Palacio Tirta Gangga",
                activity_en: "Tirta Gangga Palace"
            },
            {
                time: "18:00",
                activity: "Atardecer en Amed",
                activity_en: "Sunset in Amed",
                desc: "Relájate viendo como el sol baja tras el coloso Agung desde la costa.",
                desc_en: "Relax watching the sun go down behind the colossus Agung from the coast."
            }
        ],
        location: "Amed / Besakih",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
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
        title: "Norte de Bali: Templos y Cascadas",
        title_en: "North Bali: Lake Temples & Waterfalls",
        description: "El icónico templo sobre el lago, las mayores cascadas y arrozales Patrimonio UNESCO.",
        description_en: "The iconic lake temple, biggest waterfalls and UNESCO rice terraces.",
        fullDescription: "Descubre la exuberante naturaleza del norte. Visitaremos el templo Ulun Danu Beratan sobre el lago, la impresionante cascada Nungnung o Leke Leke, y caminaremos por los campos de arroz infinitos de Jatiluwih.",
        fullDescription_en: "Discover the lush nature of the north. We will visit the Ulun Danu Beratan temple on the lake, the impressive Nungnung or Leke Leke waterfall, and walk through the endless rice fields of Jatiluwih.",
        price: 65,
        duration: "10-12 horas",
        duration_en: "10-12 hours",
        image: "/images/tours/spiritual-cleansing.jpg",
        badge: "Paisajes Únicos",
        badge_en: "Unique Landscapes",
        category: "naturaleza",
        itinerary: [
            { time: "07:30", activity: "Salida desde Ubud", activity_en: "Departure from Ubud" },
            {
                time: "08:30",
                activity: "Cascada Nungnung o Leke Leke",
                activity_en: "Nungnung or Leke Leke Waterfall",
                desc: "Enormes saltos de agua con caídas espectaculares rodeadas de vegetación tropical.",
                desc_en: "Huge waterfalls with spectacular drops surrounded by tropical vegetation."
            },
            {
                time: "10:30",
                activity: "Templo Ulun Danu Beratan",
                activity_en: "Ulun Danu Beratan Temple",
                desc: "El famoso templo flotante sobre el lago Beratan dedicado a la diosa del agua.",
                desc_en: "The famous floating temple on Lake Beratan dedicated to the goddess of water."
            },
            {
                time: "13:00",
                activity: "Jatiluwih Rice Terraces (UNESCO)",
                activity_en: "Jatiluwih Rice Terraces (UNESCO)",
                desc: "Los campos de arroz más extensos de Bali con un sistema de riego milenario único.",
                desc_en: "Bali's most extensive rice fields with a unique ancient irrigation system."
            },
            {
                time: "14:30",
                activity: "Almuerzo con vistas",
                activity_en: "Lunch with views"
            },
            {
                time: "16:00",
                activity: "Templo Taman Ayun (Opcional)",
                activity_en: "Taman Ayun Temple",
                desc: "Templo real rodeado de jardines y hermosos estanques.",
                desc_en: "Royal temple surrounded by gardens and beautiful ponds."
            }
        ],
        location: "Norte de Bali",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
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
        image: "/images/tours/ayung-rafting-atv.jpg",
        badge: "Aventura Épica",
        badge_en: "Epic Adventure",
        category: "aventura",
        itinerary: [
            { time: "04:30", activity: "Recogida nocturna", activity_en: "Night Pickup" },
            {
                time: "06:30",
                activity: "Delfines en Lovina",
                activity_en: "Dolphins in Lovina",
                desc: "Sube a una barca local al amanecer para ver delfines saltando en mar abierto.",
                desc_en: "Board a local boat at sunrise to see dolphins jumping in the open sea."
            },
            {
                time: "09:30",
                activity: "Cascada Banyumala",
                activity_en: "Banyumala Waterfall",
                desc: "Una de las cascadas más hermosas y vírgenes para darte un baño refrescante.",
                desc_en: "One of the most beautiful and untouched waterfalls for a refreshing swim."
            },
            {
                time: "11:30",
                activity: "Vistas Lagos Gemelos",
                activity_en: "Twin Lakes Views",
                desc: "Panorámica aérea de los lagos Tamblingan y Buyan.",
                desc_en: "Aerial panorama of Tamblingan and Buyan lakes."
            },
            {
                time: "13:00",
                activity: "Templo Ulun Danu Beratan",
                activity_en: "Ulun Danu Beratan Temple"
            },
            { time: "15:00", activity: "Jatiluwih Rice Terraces", activity_en: "Jatiluwih Rice Terraces" }
        ],
        location: "Lovina / Norte",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Barca para delfines", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Dolphin boat", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
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
        image: "/images/tours/ubud-highlights.jpg",
        badge: "Top Ventas",
        badge_en: "Best Seller",
        category: "cultura",
        itinerary: [
            { time: "08:30", activity: "Encuentro en Hotel", activity_en: "Hotel Meeting" },
            {
                time: "09:00",
                activity: "Cascada Tegenungan",
                activity_en: "Tegenungan Waterfall",
                desc: "Una de las cascadas más accesibles y potentes cerca de Ubud.",
                desc_en: "One of the most accessible and powerful waterfalls near Ubud."
            },
            {
                time: "10:50",
                activity: "Cueva Goa Gajah",
                activity_en: "Goa Gajah Cave",
                desc: "Templo del siglo IX excavado en roca con un rostro demoníaco tallado en la entrada.",
                desc_en: "9th-century cave temple carved into rock with a demonic face carved at the entrance."
            },
            {
                time: "14:00",
                activity: "Ritual Purificación Tirta Empul",
                activity_en: "Tirta Empul Purification Ritual",
                desc: "Participa en el ritual sagrado de limpieza espiritual bajo fuentes milenarias.",
                desc_en: "Participate in the sacred spiritual cleansing ritual under millennial fountains."
            },
            {
                time: "15:45",
                activity: "Almuerzo en Tis Café",
                activity_en: "Lunch at Tis Café",
                desc: "Relájate con vistas directas a los arrozales infinitos.",
                desc_en: "Relax with direct views of the infinite rice fields."
            },
            {
                time: "17:00",
                activity: "Terrazas de Tegalalang",
                activity_en: "Tegalalang Terraces"
            }
        ],
        location: "Ubud / Gianyar",
        included: ["Transporte privado", "Conductor", "Gasolina y Parking", "Agua mineral"],
        included_en: ["Private transport", "Driver", "Gas and Parking", "Mineral water"],
        not_included: ["Entradas / tickets", "Comidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / tickets", "Meals", "Travel insurance"],
        rating: 4.9,
        reviews: 62,
        reviewsList: [
            { name: "Paula V.", date: "Hace 1 semana", text: "Tirta Empul es una experiencia espiritual que hay que vivir.", date_en: "1 week ago", text_en: "Tirta Empul is a spiritual experience you must live." },
            { name: "Marcos L.", date: "Hace 3 semanas", text: "Ubud en un día, muy bien aprovechado el tiempo. El café Tis espectacular.", date_en: "3 weeks ago", text_en: "Ubud in one day, time very well used. Tis café spectacular." },
            { name: "Adriana S.", date: "Hace 1 mes", text: "Perty es una guía fantástica. Nos hizo sentir como en casa.", date_en: "1 month ago", text_en: "Perty is a fantastic guide. She made us feel at home." },
            { name: "Luis B.", date: "Hace 2 meses", text: "El bosque de los monos es divertidisimo, cuidado con las gafas!", date_en: "2 months ago", text_en: "The monkey forest is hilarious, watch your glasses!" },
            { name: "Clara G.", date: "Hace 3 meses", text: "Fue nuestro primer tour y nos encantó.", date_en: "3 months ago", text_en: "It was our first tour and we loved it." }
        ]
    }
];
