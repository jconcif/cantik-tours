export const tours = [
    {
        id: 'ubud-mystic',
        title: "Ubud Místico y Cascadas",
        title_en: "Mystic Ubud & Waterfalls",
        description: "El tour más completo para conocer la esencia de Bali. Templos, arrozales y la espectacular cascada de Nungnung.",
        description_en: "The most complete tour to discover the essence of Bali. Temples, rice paddies, and the spectacular Nungnung waterfall.",
        fullDescription: "Explora el corazón cultural de Bali en este recorrido privado. Visitaremos el Bosque de los Monos, caminaremos por las famosas terrazas de arroz de Tegalalang y nos refrescaremos en la imponente cascada de Nungnung. Para terminar, disfrutaremos de una ceremonia de purificación en Tirta Empul.",
        fullDescription_en: "Explore the cultural heart of Bali on this private tour. We will visit the Monkey Forest, walk through the famous Tegalalang rice terraces, and refresh ourselves at the impressive Nungnung waterfall. To finish, we will enjoy a purification ceremony at Tirta Empul.",
        price: 50,
        duration: "8-10 horas",
        duration_en: "8-10 hours",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        badge: "Más Popular",
        badge_en: "Most Popular",
        category: "cultura",
        itinerary: [
            { time: "08:30", activity: "Recogida en tu hotel", activity_en: "Hotel pickup" },
            { time: "10:00", activity: "Bosque de los Monos de Ubud", activity_en: "Ubud Monkey Forest" },
            { time: "12:00", activity: "Terrazas de Arroz de Tegalalang", activity_en: "Tegalalang Rice Terraces" },
            { time: "13:30", activity: "Almuerzo con vistas al volcán", activity_en: "Lunch with volcano views" },
            { time: "15:30", activity: "Cascada de Nungnung", activity_en: "Nungnung Waterfall" },
            { time: "17:30", activity: "Templo Tirta Empul", activity_en: "Tirta Empul Temple" }
        ],
        location: "Ubud",
        included: ["Transporte privado", "Guía en español", "Agua mineral", "Entradas"],
        included_en: ["Private transport", "Spanish/English guide", "Mineral water", "Entrance fees"],
        rating: 4.9,
        reviews: 128,
        reviewsList: [
            { name: "Marta y Jorge", date: "Hace 2 semanas", date_en: "2 weeks ago", text: "El mejor día de nuestro viaje. La cascada Nungnung es impresionante, aunque cansa subir, vale cada escalón. Perty fue un guía excelente.", text_en: "The best day of our trip. Nungnung waterfall is impressive, although it's tiring to climb, it's worth every step. Perty was an excellent guide.", rating: 5 },
            { name: "Robert S.", date: "Hace 1 mes", date_en: "1 month ago", text: "Muy bien organizado. El bosque de los monos es divertido y el templo Tirta Empul te llena de paz. Recomendado.", text_en: "Very well organized. The monkey forest is fun and Tirta Empul temple fills you with peace. Recommended.", rating: 5 }
        ]
    },
    {
        id: 'uluwatu-sunset',
        title: "Atardecer en Uluwatu y Danza Kecak",
        title_en: "Uluwatu Sunset & Kecak Dance",
        description: "Magia sobre los acantilados. Disfruta de la danza de fuego y una cena romántica en la playa de Jimbaran.",
        description_en: "Magic on the cliffs. Enjoy the fire dance and a romantic dinner on Jimbaran beach.",
        fullDescription: "Un tour dedicado a la belleza del sur de Bali. Visitaremos el templo de Uluwatu, situado en un acantilado de 70 metros. Al atardecer, presenciaremos la hipnótica danza Kecak con el sol hundiéndose en el Índico. Concluiremos con una cena de mariscos frescos en la arena de Jimbaran.",
        fullDescription_en: "A tour dedicated to the beauty of southern Bali. We will visit the Uluwatu temple, located on a 70-meter cliff. At sunset, we will witness the hypnotic Kecak dance with the sun sinking into the Indian Ocean. We will conclude with a fresh seafood dinner on the sand of Jimbaran.",
        price: 40,
        duration: "6-7 horas",
        duration_en: "6-7 hours",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        badge: "Recomendado",
        badge_en: "Recommended",
        category: "playas",
        itinerary: [
            { time: "15:00", activity: "Recogida en el hotel", activity_en: "Hotel pickup" },
            { time: "16:30", activity: "Visita al Templo de Uluwatu", activity_en: "Uluwatu Temple visit" },
            { time: "18:00", activity: "Danza Kecak y Fuego", activity_en: "Kecak & Fire Dance" },
            { time: "20:00", activity: "Cena en Jimbaran", activity_en: "Dinner in Jimbaran" }
        ],
        location: "Sur de Bali",
        location_en: "South Bali",
        included: ["Transporte privado", "Guía en español", "Entradas al templo"],
        included_en: ["Private transport", "Spanish/English guide", "Temple entry fees"],
        rating: 4.8,
        reviews: 95,
        reviewsList: [
            { name: "Lucía M.", date: "Hace 3 semanas", date_en: "3 weeks ago", text: "La danza Kecak al atardecer fue inolvidable. Gracias por organizarlo todo tan bien.", text_en: "The Kecak dance at sunset was unforgettable. Thanks for organizing everything so well.", rating: 5 }
        ]
    },
    {
        id: 'gates-of-heaven',
        title: "Puertas del Cielo y Magia del Este",
        title_en: "Gates of Heaven & East Magic",
        description: "Visita el icónico templo Lempuyang, Tirta Gangga y los jardines reales más hermosos de Bali.",
        description_en: "Visit the iconic Lempuyang temple, Tirta Gangga, and the most beautiful royal gardens in Bali.",
        fullDescription: "El tour favorito de los amantes de la fotografía. Comenzaremos temprano en Pura Lempuyang para capturar la famosa foto en las 'Puertas del Cielo' con el volcán Agung de fondo. Luego exploraremos el palacio de agua de Tirta Gangga y el palacio real de Taman Ujung.",
        fullDescription_en: "The favorite tour for photography lovers. We will start early at Pura Lempuyang to capture the famous photo at the 'Gates of Heaven' with the Agung volcano in the background. Then we will explore the Tirta Gangga water palace and the Taman Ujung royal palace.",
        price: 60,
        duration: "10-12 horas",
        duration_en: "10-12 hours",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800&q=80",
        badge: "Imprescindible",
        badge_en: "Must see",
        category: "fotografia",
        itinerary: [
            { time: "05:00", activity: "Salida temprana", activity_en: "Early departure" },
            { time: "08:00", activity: "Templo Lempuyang (Puertas del Cielo)", activity_en: "Lempuyang Temple (Gates of Heaven)" },
            { time: "11:00", activity: "Palacio de Agua Tirta Gangga", activity_en: "Tirta Gangga Water Palace" },
            { time: "13:00", activity: "Almuerzo tradicional", activity_en: "Traditional lunch" },
            { time: "15:00", activity: "Taman Ujung", activity_en: "Taman Ujung" }
        ],
        location: "Este de Bali",
        location_en: "East Bali",
        included: ["Transporte privado", "Guía en español", "Sarong para templos"],
        included_en: ["Private transport", "Spanish/English guide", "Sarong for temples"],
        rating: 4.7,
        reviews: 156,
        reviewsList: [
            { name: "Elena G.", date: "Hace 2 semanas", date_en: "2 weeks ago", text: "Hay que madrugar mucho pero la foto en las puertas del cielo es icónica.", text_en: "You have to wake up very early but the photo at the gates of heaven is iconic.", rating: 5 }
        ]
    }
];
