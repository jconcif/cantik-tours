import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { tours } from '../data/tours';
import TourCard from '../components/TourCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import AboutUs from '../components/AboutUs';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const featuredTours = tours.slice(0, 3);

    useEffect(() => {
        document.title = `Cantik Tours Bali | ${t('hero.title_2')}`;
    }, [t]);

    return (
        <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
            <Hero />

            {/* Featured Tours */}
            <div id="tours">
                <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4">
                                {t('tours.title')} <span className="text-primary italic">{t('tours.title_accent')}</span>
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-lg font-medium">
                                {t('tours.subtitle')}
                            </p>
                        </div>
                        <Link
                            to="/tours"
                            className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform"
                        >
                            {t('tours.see_all')} <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredTours.map((tour, index) => (
                            <TourCard key={tour.id} tour={tour} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            <WhyChooseUs />
            <AboutUs />

            {/* Testimonials */}
            <Testimonials reviews={tours[0].reviewsList} />

            {/* Final CTA */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                            {t('cta.title_1')} <br />
                            <span className="italic opacity-90">{t('cta.title_2')}</span>
                        </h2>
                        <p className="text-lg md:text-xl mb-10 text-white/80 max-w-md mx-auto font-medium">
                            {t('cta.subtitle')}
                        </p>
                        <a
                            href="https://wa.me/376614535"
                            className="inline-flex items-center gap-3 bg-white text-primary font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-all shadow-xl active:scale-95 group"
                        >
                            {t('cta.btn')}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
