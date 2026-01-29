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
            { q: "¿En qué idioma es el tour?", a: "La tarifa base es con conductor experto en Inglés. Puedes añadir Guía en Español por un suplemento.", q_en: "What language is the tour in?", a_en: "The base rate is with an expert English-speaking driver. You can add a Spanish Guide for a supplement." }
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
                type: 'photo',
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Tibumana o Cascada Kanto Lampo",
                activity_en: "Tibumana or Kanto Lampo waterfall",
                desc: "Sumérgete en la selva tropical. Tibumana es un oasis de paz con una caída perfecta, mientras que Kanto Lampo impresiona con sus aguas escalonadas sobre rocas volcánicas.",
                desc_en: "Immerse yourself in the tropical jungle. Tibumana is an oasis of peace with a perfect drop, while Kanto Lampo impresses with its waters cascading over volcanic rocks."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Templo Gunung Kawi Tampaksiring",
                activity_en: "Gunung Kawi Tampaksiring temple",
                desc: "Admira templos centenarios esculpidos en la roca y siente la energía espiritual de uno de los monumentos más antiguos de Bali.",
                desc_en: "Admire centuries-old temples carved into the rock and feel the spiritual energy of one of Bali's oldest monuments."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Pura Mengening",
                activity_en: "Pura Mengening temple",
                desc: "Un tesoro escondido. Este templo de purificación ofrece una atmósfera de paz absoluta y espiritualidad auténtica, lejos de las multitudes.",
                desc_en: "A hidden treasure. This purification temple offers an atmosphere of absolute peace and authentic spirituality, far from the crowds."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Pura Gunung Kawi Sebatu",
                activity_en: "Pura Gunung Kawi Sebatu",
                desc: "Conocido como el templo del agua jardín, es un remanso de tranquilidad donde manantiales sagrados alimentan estanques llenos de flores de loto y peces koi.",
                desc_en: "Known as the water garden temple, it is a haven of tranquility where sacred springs feed ponds filled with lotus flowers and koi fish."
            },
            {
                type: 'food',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Almuerzo local con vistas",
                activity_en: "Local lunch with views",
                desc: "Disfruta de la cocina balinesa en un entorno rural con vistas a la naturaleza exuberante de la isla.",
                desc_en: "Enjoy Balinese cuisine in a rural setting with views of the island's lush nature."
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
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Bali Pulina - El Arte del Café",
                activity_en: "Bali Pulina - The Art of Coffee",
                desc: "Degusta el famoso café Luwak mientras aprendes sobre su proceso artesanal en una terraza con vistas panorámicas a la selva tropical de Ubud.",
                desc_en: "Taste the famous Luwak coffee while learning about its artisanal process on a terrace with panoramic views of the Ubud tropical jungle."
            },
            {
                type: 'visit',
                duration: "1 hora",
                duration_en: "1 hour",
                activity: "Tegalalang Rice Terrace (UNESCO)",
                activity_en: "Tegalalang Rice Terrace (UNESCO)",
                desc: "Camina entre los arrozales más famosos del mundo y siente la paz que emana de este paisaje que refleja la armonía entre el hombre y los dioses.",
                desc_en: "Walk among the world's most famous rice terraces and feel the peace emanating from this landscape that reflects harmony between man and gods."
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
        not_included: ["Entradas / Tickets", "Comidas / Bebidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals / Drinks", "Travel insurance"],
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
                duration: "1.5 horas",
                duration_en: "1.5 hours",
                activity: "Cascada Nungnung o Leke Leke",
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
                activity: "Sabores del Mercado Local",
                activity_en: "Local Market Flavors",
                desc: "Explora la explosión de colores y olores de las frutas exóticas de las tierras altas de Bedugul. El lugar perfecto para probar el mangostán o la fruta de la serpiente.",
                desc_en: "Explore the explosion of colors and smells of exotic fruits from the Bedugul highlands. The perfect place to try mangosteen or snake fruit."
            },
            {
                type: 'photo',
                duration: "45 min",
                duration_en: "45 min",
                activity: "Handara Gates",
                activity_en: "Handara Gates",
                desc: "Cruza las 'Puertas al Camino de la Serenidad'. Estas imponentes puertas balinesas ofrecen un encuadre perfecto con las montañas llenas de niebla como telón de fondo.",
                desc_en: "Cross the 'Gates to the Path of Serenity'. These imposing Balinese gates provide a perfect frame with the misty mountains as a backdrop."
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
        not_included: ["Entradas / Tickets", "Comidas / Bebidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals / Drinks", "Travel insurance"],
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
        category: ['aventura', 'cascadas', 'fotografia'],
        mapUrl: "https://maps.google.com/maps?q=Lovina%20Beach%20Bali&t=&z=11&ie=UTF8&iwloc=&output=embed",
        packingList: ['swimwear', 'sunscreen', 'camera', 'shoes'],
        importantInfo: [
            "La salida en barco es muy temprano (amanecer). El mar suele estar tranquilo.",
            "Lleva bañador y toalla para la cascada Banyumala.",
            "El trayecto de regreso es largo, aprovechamos para descansar o ver los Lagos Gemelos."
        ],
        importantInfo_en: [
            "The boat departure is very early (sunrise). The sea is usually calm.",
            "Bring swimwear and a towel for the Banyumala waterfall.",
            "The return journey is long, we take the opportunity to rest or see the Twin Lakes."
        ],
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
                desc: "Refréscate en las Twin Waterfalls. Una cortina de agua mágica que se desliza por una pared de helechos y rocas hasta una piscina natural de aguas cristalinas.",
                desc_en: "Refresh yourself at the Twin Waterfalls. A magical curtain of water that slides down a wall of ferns and rocks into a natural pool of crystal clear waters."
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
        not_included: ["Entradas / Tickets", "Comidas / Bebidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals / Drinks", "Travel insurance"],
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
                desc: "Viaja al pasado en una de las aldeas más limpias y hermosas del mundo. Admira su arquitectura simétrica perfectamente conservada y su místico bosque de bambú.",
                desc_en: "Travel back in time in one of the world's cleanest and most beautiful villages. Admire its perfectly preserved symmetrical architecture and its mystical bamboo forest."
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
        not_included: ["Entradas / Tickets", "Comidas / Bebidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals / Drinks", "Travel insurance"],
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
                duration: "1.5 horas",
                duration_en: "1.5 hours",
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
        not_included: ["Entradas / Tickets", "Comidas / Bebidas", "Seguro de viaje"],
        not_included_en: ["Entrance fees / Tickets", "Meals / Drinks", "Travel insurance"],
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
