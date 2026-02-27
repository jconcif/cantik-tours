import React, { useState } from 'react';
import { TreePine, Compass, Palette, Camera, Droplets, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const categories = [
    { id: 'todos', nameKey: 'tours.categories.todos', icon: Compass },
    { id: 'cultura', nameKey: 'tours.categories.cultura', icon: Palette },
    { id: 'cascadas', nameKey: 'tours.categories.cascadas', icon: Droplets },
    { id: 'fotografia', nameKey: 'tours.categories.fotografia', icon: Camera },
    { id: 'playas', nameKey: 'tours.categories.playas', icon: Sun },
    { id: 'aventura', nameKey: 'tours.categories.aventura', icon: TreePine },
];

const CategoryChips = ({ active = 'todos', onSelect }) => {
    const { t } = useTranslation();
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: index * 0.05,
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all whitespace-nowrap font-black text-sm ${currentActive === cat.id
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20'
                        : 'bg-white dark:bg-gray-800 border-black/5 dark:border-white/5 hover:border-primary/30 shadow-sm'
                        }`}
                >
                    <cat.icon size={20} className={currentActive === cat.id ? 'text-white' : 'text-primary'} />
                    <span>{t(cat.nameKey)}</span>
                </motion.button>
            ))}
        </div>
    );
};

export default CategoryChips;
