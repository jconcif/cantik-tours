import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords, image, url, schema }) => {
    const { t, i18n } = useTranslation();
    const siteTitle = "Cantik Tours Bali";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = t('hero.subtitle');
    const metaDescription = description || defaultDescription;

    // Use absolute URL for image
    const baseUrl = "https://www.cantiktours.com";
    const metaImage = image
        ? (image.startsWith('http') ? image : `${baseUrl}${image}`)
        : `${baseUrl}/images/hero.png`;

    const metaUrl = url || window.location.href;

    return (
        <Helmet htmlAttributes={{ lang: i18n.language }}>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={metaUrl} />

            {/* Hreflang Tags for SEO Internationalization */}
            {/* 
               Ideally we should have different URLs for different languages (e.g. /es/nosotros, /en/about).
               Since we are serving the same content on the same URL and changing language client-side,
               we are using x-default to point to the current page.
            */}
            <link rel="alternate" hreflang="x-default" href={metaUrl} />
            <link rel="alternate" hreflang="es" href={metaUrl} />
            <link rel="alternate" hreflang="en" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:locale" content={i18n.language === 'es' ? 'es_ES' : 'en_US'} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
