import React, { useState } from 'react';
import TourCard from '../components/TourCard';
import { Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { tours as allTours } from '../data/tours';
import CategoryChips from '../components/CategoryChips';


const TourList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('todos');

    const filteredTours = allTours.filter(tour => {
        const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'todos' || tour.category === activeCategory; // Assuming tour has 'category' field, or we need to add mock categories logic.

        return matchesSearch && matchesCategory;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-12 pb-24 px-6 max-w-7xl mx-auto"
        >
            <div className="mb-16">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-6xl font-black mb-6"
                >
                    Descubre <span className="text-primary italic">Bali.</span>
                </motion.h1>
                <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-500 font-medium max-w-2xl"
                >
                    Explora nuestras rutas privadas diseñadas para vivir la cultura balinesa en español con total seguridad y confort.
                </motion.p>
            </div>

            {/* Search & Filters */}
            <div className="space-y-8 mb-16">
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="¿Qué quieres descubrir hoy?"
                        className="w-full pl-16 pr-8 py-5 rounded-[2.5rem] bg-white dark:bg-gray-800 border border-black/5 dark:border-white/5 outline-none focus:border-primary/50 shadow-xl shadow-black/5 transition-all text-xl font-medium"
                    />
                </div>

                {/* Category Chips - Now functional */}
                <CategoryChips active={activeCategory} onSelect={setActiveCategory} />
            </div>

            {filteredTours.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredTours.map((tour, index) => (
                        <TourCard key={tour.id} tour={tour} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24">
                    <p className="text-2xl font-bold text-gray-400">No encontramos tours que coincidan con tu búsqueda.</p>
                </div>
            )}
        </motion.div>
    );
};

export default TourList;
