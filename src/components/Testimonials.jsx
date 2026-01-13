import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Marta y Jorge",
        location: "España",
        text: "¡La mejor decisión de nuestro viaje! Perty es una guía excepcional, nos hizo sentir como en familia. Bali es mágica, pero verla con ellos es otro nivel.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Andrea R.",
        location: "México",
        text: "Servicio impecable. El conductor fue súper puntual y el coche muy cómodo. Nos llevaron a sitios que no salen en las guías turísticas. ¡100% recomendados!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Familia González",
        location: "Argentina",
        text: "Viajamos con dos niños y tuvieron muchísima paciencia y flexibilidad. Nos organizaron un itinerario perfecto para nosotros. Gracias por todo.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 px-6 bg-gray-50 dark:bg-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Testimonios</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4">Lo que dicen nuestros <span className="text-primary italic">viajeros</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Historias reales de personas que vivieron la magia de Bali con nosotros.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl shadow-black/5 relative border border-black/5 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20 rotate-180" size={40} />

                            <div className="flex items-center gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
