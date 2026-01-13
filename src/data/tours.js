export const tours = [
    {
        id: 'ubud-mystic',
        title: "Ubud Místico y Cascadas",
        description: "El tour más completo para conocer la esencia de Bali. Templos, arrozales y la espectacular cascada de Nungnung.",
        fullDescription: "Explora el corazón cultural de Bali en este recorrido privado. Visitaremos el Bosque de los Monos, caminaremos por las famosas terrazas de arroz de Tegalalang y nos refrescaremos en la imponente cascada de Nungnung. Para terminar, disfrutaremos de una ceremonia de purificación en Tirta Empul.",
        price: 50,
        duration: "8-10 horas",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        badge: "Más Popular",
        category: "Cultura",
        itinerary: [
            { time: "08:30", activity: "Recogida en tu hotel" },
            { time: "10:00", activity: "Bosque de los Monos de Ubud" },
            { time: "12:00", activity: "Terrazas de Arroz de Tegalalang" },
            { time: "13:30", activity: "Almuerzo con vistas al volcán" },
            { time: "15:30", activity: "Cascada de Nungnung" },
            { time: "17:30", activity: "Templo Tirta Empul" }
        ],
        location: "Ubud",
        included: ["Transporte privado", "Guía en español", "Agua mineral", "Entradas"],
        rating: 4.9,
        reviews: 128,
        reviewsList: [
            { name: "Marta y Jorge", date: "Hace 2 semanas", text: "El mejor día de nuestro viaje. La cascada Nungnung es impresionante, aunque cansa subir, vale cada escalón. Perty fue un guía excelente.", rating: 5 },
            { name: "Robert S.", date: "Hace 1 mes", text: "Muy bien organizado. El bosque de los monos es divertido y el templo Tirta Empul te llena de paz. Recomendado.", rating: 5 },
            { name: "Ana López", date: "Hace 2 meses", text: "Increíble experiencia cultural. El conductor hablaba español bastante bien y nos explicó muchas tradiciones.", rating: 5 }
        ]
    },
    {
        id: 'uluwatu-sunset',
        title: "Atardecer en Uluwatu y Danza Kecak",
        description: "Magia sobre los acantilados. Disfruta de la danza de fuego y una cena romántica en la playa de Jimbaran.",
        fullDescription: "Un tour dedicado a la belleza del sur de Bali. Visitaremos el templo de Uluwatu, situado en un acantilado de 70 metros. Al atardecer, presenciaremos la hipnótica danza Kecak con el sol hundiéndose en el Índico. Concluiremos con una cena de mariscos frescos en la arena de Jimbaran.",
        price: 40,
        duration: "6-7 horas",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        badge: "Recomendado",
        category: "Atardeceres",
        itinerary: [
            { time: "15:00", activity: "Recogida en el hotel" },
            { time: "16:30", activity: "Visita al Templo de Uluwatu" },
            { time: "18:00", activity: "Danza Kecak y Fuego" },
            { time: "20:00", activity: "Cena en Jimbaran" }
        ],
        location: "Sur de Bali",
        included: ["Transporte privado", "Guía en español", "Entradas al templo"],
        rating: 4.8,
        reviews: 95,
        reviewsList: [
            { name: "Lucía M.", date: "Hace 3 semanas", text: "La danza Kecak al atardecer fue inolvidable. Gracias por organizarlo todo tan bien y conseguirnos buenos asientos.", rating: 5 },
            { name: "Pablo R.", date: "Hace 1 mes", text: "La cena en Jimbaran fue romántica y deliciosa. El marisco fresquísimo. Un 10.", rating: 5 },
            { name: "Familia Ruiz", date: "Hace 2 meses", text: "Cuidado con los monos en Uluwatu, son traviesos jeje. El resto perfecto, vistas increíbles.", rating: 4 }
        ]
    },
    {
        id: 'gates-of-heaven',
        title: "Puertas del Cielo y Magia del Este",
        description: "Visita el icónico templo Lempuyang, Tirta Gangga y los jardines reales más hermosos de Bali.",
        fullDescription: "El tour favorito de los amantes de la fotografía. Comenzaremos temprano en Pura Lempuyang para capturar la famosa foto en las 'Puertas del Cielo' con el volcán Agung de fondo. Luego exploraremos el palacio de agua de Tirta Gangga y el palacio real de Taman Ujung.",
        price: 60,
        duration: "10-12 horas",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800&q=80",
        badge: "Imprescindible",
        category: "Fotografía",
        itinerary: [
            { time: "05:00", activity: "Salida temprana" },
            { time: "08:00", activity: "Templo Lempuyang (Puertas del Cielo)" },
            { time: "11:00", activity: "Palacio de Agua Tirta Gangga" },
            { time: "13:00", activity: "Almuerzo tradicional" },
            { time: "15:00", activity: "Taman Ujung" }
        ],
        location: "Este de Bali",
        included: ["Transporte privado", "Guía en español", "Sarong para templos"],
        rating: 4.7,
        reviews: 156,
        reviewsList: [
            { name: "Elena G.", date: "Hace 2 semanas", text: "Hay que madrugar mucho pero la foto en las puertas del cielo es icónica. El guía nos ayudó a hacer la fila.", rating: 5 },
            { name: "Carlos y Maria", date: "Hace 1 mes", text: "Tirta Gangga es precioso con los peces. Un día largo pero muy completo.", rating: 4 },
            { name: "Javier T.", date: "Hace 3 meses", text: "El palacio de agua es mi favorito. El conductor condujo muy seguro a pesar de las curvas.", rating: 5 }
        ]
    },
    {
        id: 'north-waterfalls',
        title: "Joyas del Norte y Lagos",
        description: "Cascadas escondidas, templos sobre el agua y los paisajes más verdes del norte de la isla.",
        fullDescription: "Descubre el lado más salvaje y fresco de Bali. Visitaremos el icónico templo Ulun Danu Beratan en el lago, las impresionantes cascadas de Munduk y el mirador de los lagos gemelos. Un día rodeado de naturaleza pura y paz.",
        price: 55,
        duration: "9-11 horas",
        image: "https://images.unsplash.com/photo-1596395819057-d37ff06eb9c5?auto=format&fit=crop&w=800&q=80",
        badge: "Naturaleza",
        category: "Aventura",
        itinerary: [
            { time: "08:00", activity: "Recogida" },
            { time: "09:30", activity: "Templo Ulun Danu Beratan" },
            { time: "11:30", activity: "Mirador de Lagos Gemelos" },
            { time: "13:00", activity: "Cascada Munduk" },
            { time: "15:30", activity: "Jatiluwih Rice Terraces" }
        ],
        location: "Norte de Bali",
        included: ["Transporte", "Guía", "Entradas"],
        rating: 4.9,
        reviews: 74,
        reviewsList: [
            { name: "Sofia M.", date: "Hace 1 semana", text: "El norte es mucho más tranquilo y verde. El templo del lago parece flotar. Precioso.", rating: 5 },
            { name: "David F.", date: "Hace 1 mes", text: "Munduk es espectacular. Lleven zapatos cómodos. Perty nos recomendó un sitio genial para comer buffet.", rating: 5 },
            { name: "Laura P.", date: "Hace 2 meses", text: "Aire fresco y naturaleza. Totalmente diferente al caos del sur. Muy recomendado.", rating: 5 }
        ]
    }
];
