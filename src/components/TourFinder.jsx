import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, RotateCcw, Compass } from 'lucide-react';
import LocalLink from './LocalLink';
import { tours } from '../data/tours';

const questions = [
    {
        id: 'traveler',
        question: '¿Con quién viajas?',
        question_en: 'Who are you traveling with?',
        options: [
            { value: 'couple', label: 'Pareja o Solo', label_en: 'Couple or Solo', icon: '👩‍❤️‍👨' },
            { value: 'family', label: 'Familia o Relajado', label_en: 'Family or Relaxed', icon: '🌴' },
            { value: 'friends', label: 'Amigos o Aventura', label_en: 'Friends or Adventure', icon: '🌋' }
        ]
    },
    {
        id: 'interests',
        question: '¿Qué te emociona más?',
        question_en: 'What excites you the most?',
        options: [
            { value: 'culture', label: 'Templos y cultura antigua', label_en: 'Temples & ancient culture', icon: '🛕' },
            { value: 'nature', label: 'Cascadas, selva y fotos', label_en: 'Waterfalls, jungle & photos', icon: '💦' },
            { value: 'beaches', label: 'Atardeceres, playas y templos marinos', label_en: 'Sunsets, beaches & seaside temples', icon: '🌅' }
        ]
    },
    {
        id: 'pace',
        question: '¿Cuál es tu ritmo de viaje preferido?',
        question_en: 'What is your preferred travel pace?',
        options: [
            { value: 'relaxed', label: 'Tranquilo y sin prisa', label_en: 'Relaxed & unhurried', icon: '🧘' },
            { value: 'active', label: 'Activo para ver lo máximo posible', label_en: 'Active to see as much as possible', icon: '🏃' }
        ]
    }
];

const TourFinder = () => {
    const { i18n } = useTranslation();
    const isEs = i18n.language.startsWith('es');
    
    const [step, setStep] = useState(null); // null = welcome, 0-2 = questions, 3 = result
    const [answers, setAnswers] = useState({});

    const handleStart = () => {
        setAnswers({});
        setStep(0);
    };

    const handleOptionSelect = (qId, optionValue) => {
        const updatedAnswers = { ...answers, [qId]: optionValue };
        setAnswers(updatedAnswers);
        
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(3);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setStep(null);
    };

    const matchedTour = step === 3 ? (() => {
        if (answers.interests === 'nature') {
            return tours.find(t => t.id === 'north-lake-temple') || tours[0];
        }
        if (answers.interests === 'beaches') {
            return tours.find(t => t.id === 'beji-griya-tanah-lot') || tours[0];
        }
        return tours.find(t => t.id === 'ubud-central') || tours[0];
    })() : null;

    const whatsappNumber = '34642517787';
    const whatsappMessage = matchedTour
        ? isEs
            ? `¡Hola Cantik Tours! Hice el test de vuestra web y me recomendó el tour "${matchedTour.title}". Me gustaría consultar disponibilidad e información.`
            : `Hello Cantik Tours! I took the test on your website and it recommended the tour "${matchedTour.title_en || matchedTour.title}". I'd like to check availability and details.`
        : '';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-transparent rounded-[2.5rem] -z-10" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            
            <div className="glass dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {step === null && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="text-center py-6 flex flex-col items-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
                                <Compass size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                {isEs ? '¿No sabes por dónde empezar?' : 'Don\'t know where to start?'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium max-w-xl mb-8 leading-relaxed">
                                {isEs 
                                    ? 'Responde 3 preguntas rápidas y te recomendaremos la ruta perfecta para ti basada en tus gustos.'
                                    : 'Answer 3 quick questions and we\'ll recommend the perfect route for you based on your interests.'}
                            </p>
                            <button
                                onClick={handleStart}
                                className="btn-primary flex items-center gap-2 px-8 py-4 shadow-lg text-base"
                            >
                                {isEs ? 'Encontrar mi ruta ideal' : 'Find my ideal route'}
                                <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step !== null && step >= 0 && step < questions.length && (
                        <motion.div
                            key={`question-${step}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="py-2"
                        >
                            {/* Progress bar */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xs font-black text-primary uppercase tracking-widest">
                                    {isEs ? `Pregunta ${step + 1} de ${questions.length}` : `Question ${step + 1} of ${questions.length}`}
                                </span>
                                <button 
                                    onClick={handleReset} 
                                    className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    <RotateCcw size={12} />
                                    {isEs ? 'Reiniciar' : 'Reset'}
                                </button>
                            </div>
                            
                            <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full mb-8 overflow-hidden">
                                <motion.div 
                                    className="bg-primary h-full rounded-full"
                                    initial={{ width: `${(step / questions.length) * 100}%` }}
                                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-black mb-8 tracking-tight text-gray-900 dark:text-white">
                                {isEs ? questions[step].question : questions[step].question_en}
                            </h3>

                            <div className="grid sm:grid-cols-3 gap-4">
                                {questions[step].options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOptionSelect(questions[step].id, option.value)}
                                        className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-4 group active:scale-98"
                                    >
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{option.icon}</span>
                                        <span className="font-bold text-sm text-gray-800 dark:text-gray-200 tracking-tight leading-snug">
                                            {isEs ? option.label : option.label_en}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && matchedTour && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="py-2"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest mb-3 border border-primary/20">
                                    <Sparkles size={10} /> {isEs ? 'Ruta Recomendada' : 'Recommended Route'}
                                </div>
                                <h3 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                                    {isEs ? '¡Hemos encontrado tu tour ideal!' : 'We found your ideal tour!'}
                                </h3>
                            </div>

                            {/* Tour suggestion card */}
                            <div className="bg-white dark:bg-gray-850 rounded-3xl border border-black/5 dark:border-white/5 shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center mb-8">
                                <div className="w-full md:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg relative group shrink-0">
                                    <img 
                                        src={matchedTour.image} 
                                        alt={matchedTour.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                        {isEs ? 'Perfecto Para Ti' : 'Perfect Match'}
                                    </div>
                                </div>
                                
                                <div className="flex-1 text-left">
                                    <h4 className="text-2xl font-black mb-3 tracking-tight text-gray-900 dark:text-white leading-tight">
                                        {isEs ? matchedTour.title : (matchedTour.title_en || matchedTour.title)}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6 text-sm md:text-base">
                                        {isEs ? matchedTour.description : (matchedTour.description_en || matchedTour.description)}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <LocalLink 
                                            to={`/tour/${matchedTour.id}`}
                                            className="btn-primary flex items-center gap-2 px-6 py-3 text-sm shadow-md"
                                        >
                                            {isEs ? 'Ver Detalles del Tour' : 'View Tour Details'}
                                            <ArrowRight size={16} />
                                        </LocalLink>
                                        
                                        <a 
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-full text-sm font-bold border border-green-500/20 hover:border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 2.012 14.07 1.01 11.458 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.769.497 3.498 1.44 5.04l-.997 3.637 3.79-.982-.234-.143zM16.9 14.048c-.285-.143-1.687-.828-1.947-.923-.26-.095-.45-.143-.64.143-.19.285-.735.923-.9 1.112-.165.19-.33.213-.615.071-.285-.143-1.204-.44-2.292-1.405-.847-.752-1.42-1.68-1.585-1.966-.165-.285-.018-.44.124-.581.127-.127.285-.332.427-.497.143-.166.19-.285.285-.474.095-.19.047-.355-.024-.497-.071-.143-.64-1.536-.877-2.106-.23-.556-.466-.48-.64-.488-.166-.008-.356-.01-.546-.01-.19 0-.5.07-.76.355-.26.285-.997.971-.997 2.37 0 1.399 1.02 2.748 1.162 2.938.143.19 2.007 3.037 4.863 4.26.68.293 1.21.469 1.62.599.682.217 1.3.186 1.79.112.546-.08 1.687-.687 1.925-1.35.238-.663.238-1.232.166-1.35-.072-.119-.265-.19-.55-.333z"/>
                                            </svg>
                                            {isEs ? 'Reservar por WhatsApp' : 'Book via WhatsApp'}
                                        </a>
                                    </div>
                                </div>
                            </div>
 
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleReset} 
                                    className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary dark:hover:text-primary flex items-center gap-1.5 transition-colors py-2"
                                >
                                    <RotateCcw size={12} />
                                    {isEs ? 'Hacer el test de nuevo' : 'Take the test again'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
 
export default TourFinder;
