import React from 'react';
import Hero from '../components/Hero';

import TourCard from '../components/TourCard';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { tours } from '../data/tours';

const mainTours = tours.slice(0, 3);


import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div className="space-y-0">
            <Hero />


            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Nuestras Experiencias</span>
                        <h2 className="text-3xl md:text-4xl font-black">Tours Destacados</h2>
                    </div>

                    <Link to="/tours" className="flex items-center gap-1 text-primary font-bold group">
                        Ver todos <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {mainTours.map((tour, index) => (
                        <TourCard key={tour.id} tour={tour} index={index} />
                    ))}
                </div>
            </section>

            <WhyChooseUs />
            <Testimonials />
            <AboutUs />
        </div>
    );
};

export default Home;
