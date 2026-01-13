import React from 'react';
import { Instagram, Mail, Phone, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-bg-dark border-t border-black/5 dark:border-white/5 py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row flex-wrap justify-between gap-12 md:gap-16 mb-12">
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-3xl font-extrabold tracking-tighter text-primary">CANTIK</span>
                            <span className="text-3xl font-light tracking-widest uppercase">Tours</span>
                        </div>
                        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            Diseñado por viajeros para viajeros. Te mostramos el alma de Bali a través de los ojos de un local, con la comodidad que mereces.
                        </p>
                    </div>

                    <div className="flex flex-col gap-12 sm:flex-row sm:gap-24">
                        <div>
                            <h4 className="font-black mb-8 uppercase tracking-widest text-xs text-primary">Contacto</h4>
                            <div className="space-y-6">
                                <a href="mailto:info@cantiktours.com" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-primary transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <span className="font-bold">info@cantiktours.com</span>
                                </a>
                                <a href="tel:+376614535" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-primary transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone size={18} />
                                    </div>
                                    <span className="font-bold">+376 614 535</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-black mb-8 uppercase tracking-widest text-xs text-primary">Social</h4>
                            <a
                                href="https://instagram.com/CantikToursBali"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-primary transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <Instagram size={18} />
                                </div>
                                <span className="font-bold">@CantikToursBali</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400 font-bold">
                    <p>© {new Date().getFullYear()} Cantik Tours. Todos los derechos reservados.</p>
                    <p className="flex items-center gap-1">
                        Hecho con <Heart size={14} className="text-red-500 fill-red-500" /> en Bali
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
