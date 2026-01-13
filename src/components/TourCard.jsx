import React from 'react';
import { Clock, Users, Languages, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const TourCard = ({ tour, index }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-xl shadow-black/5 flex flex-col group border border-transparent hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5"
        >
            <div className="relative h-72 overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span>4.9</span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                        {tour.badge}
                    </span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">{tour.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-2 text-sm leading-relaxed">
                    {tour.description}
                </p>

                <div className="grid grid-cols-2 gap-y-4 mb-8">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Clock size={14} />
                        </div>
                        <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Languages size={14} />
                        </div>
                        <span>Español/Inglés</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Users size={14} />
                        </div>
                        <span>Privado</span>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div>
                        <span className="text-sm text-gray-400 block mb-1">Desde</span>
                        <span className="text-3xl font-black text-bg-dark dark:text-bg-light">€{tour.price}</span>
                        <span className="text-xs text-gray-500 ml-1">/coche</span>
                    </div>
                    <Link
                        to={`/tour/${tour.id}`}
                        className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-all active:scale-95"
                    >
                        <ArrowRight size={22} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default TourCard;
