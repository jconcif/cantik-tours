import React, { useState } from 'react';
import { Landmark, Waves, TreePine, Compass, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    { id: 'todos', name: 'Todos', icon: Compass },
    { id: 'templos', name: 'Templos', icon: Landmark },
    { id: 'cascadas', name: 'Cascadas', icon: Waves },
    { id: 'playas', name: 'Playas', icon: Waves },
    { id: 'aventura', name: 'Aventura', icon: TreePine },
    { id: 'cultura', name: 'Cultura', icon: Palette },
];

const CategoryChips = ({ active = 'todos', onSelect }) => {
    // If no props provided (like in Home), use local state logic or default props.
    // However, better to make it controlled or uncontrolled properly.
    // For now, if no onSelect is passed, it's just visual.
    // But since Home.jsx also uses it, we should update Home.jsx or make this smarter.

    // Let's assume for Home.jsx we might just want to link to /tours with that filter? 
    // Or just make it interactive there too? Let's make it interactive everywhere if possible or just links.
    // For now, let's keep it simple: Controlled component.

    // Actually, to make it work in Home without complexity, let's default to internal state if no props.
    const [internalActive, setInternalActive] = useState('todos');

    const currentActive = onSelect ? active : internalActive;
    const handleSelect = (id) => {
        if (onSelect) {
            onSelect(id);
        } else {
            setInternalActive(id);
        }
    };

    return (
        <div className="flex gap-4 overflow-x-auto py-8 px-6 no-scrollbar max-w-7xl mx-auto justify-start md:justify-center">
            {categories.map((cat, index) => (
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl shadow-sm border transition-all whitespace-nowrap ${currentActive === cat.id
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white dark:bg-gray-800 border-black/5 dark:border-white/5 hover:border-primary/30'
                        }`}
                >
                    <cat.icon size={20} className={currentActive === cat.id ? 'text-white' : 'text-primary'} />
                    <span className="font-bold text-sm">{cat.name}</span>
                </motion.button>
            ))}
        </div>
    );
};

export default CategoryChips;
