import React from 'react';
import Hero from '../components/Hero';
import { tours } from '../data/tours';
import TourCard from '../components/TourCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturesGrid from '../components/FeaturesGrid';
import Testimonials from '../components/Testimonials';
import AboutUs from '../components/AboutUs';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Cantik Tours Bali",
        "image": "https://www.cantiktours.com/images/hero.png",
        "@id": "https://www.cantiktours.com",
        "url": "https://www.cantiktours.com",
        "telephone": "+6281572451127",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ubud",
            "addressLocality": "Gianyar",
            "addressRegion": "Bali",
            "postalCode": "80571",
            "addressCountry": "ID"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -8.5069,
            "longitude": 115.2625
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.instagram.com/cantiktoursbali"
        ]
    };

    const featuredTours = tours.slice(0, 3);

    return (
        <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
            <SEO
                title={t('seo.home.title')}
                description={t('seo.home.description')}
                keywords={t('seo.home.keywords')}
                schema={businessSchema}
            />
            <Hero />

            {/* Featured Tours */}
            <div id="tours">
                <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 capitalize">
                            {t('tours.title')} <span className="text-primary italic">{t('tours.title_accent')}</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-lg font-medium">
                            {t('tours.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredTours.map((tour, index) => (
                            <TourCard key={tour.id} tour={tour} index={index} />
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <Link
                            to="/tours"
                            className="btn-primary group flex items-center gap-3 px-10 py-5 text-lg"
                        >
                            {t('tours.see_all')}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <WhyChooseUs />
            <FeaturesGrid />
            <AboutUs />

            {/* Testimonials */}
            <Testimonials reviews={tours[0].reviewsList} />

            {/* Final CTA */}
            <FinalCTA />
        </div>
    );
};

export default Home;
