import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords, image, url, schema }) => {
    const { t, i18n } = useTranslation();
    const siteTitle = "Cantik Tours Bali";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = t('hero.subtitle');
    const metaDescription = description || defaultDescription;

    const baseUrl = "https://www.cantiktours.com";
    const metaImage = image
        ? (image.startsWith('http') ? image : `${baseUrl}${image}`)
        : `${baseUrl}/images/hero-og.webp`;

    // Calculate clean path without language prefix
    let cleanPath = window.location.pathname;
    if (cleanPath.startsWith('/es/') || cleanPath === '/es') {
        cleanPath = cleanPath.replace(/^\/es/, '');
    } else if (cleanPath.startsWith('/en/') || cleanPath === '/en') {
        cleanPath = cleanPath.replace(/^\/en/, '');
    }
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

    const urlEs = `${baseUrl}/es${cleanPath === '/' ? '' : cleanPath}`;
    const urlEn = `${baseUrl}/en${cleanPath === '/' ? '' : cleanPath}`;
    
    // The canonical URL is the active language URL
    const metaUrl = url || (i18n.language === 'en' ? urlEn : urlEs);

    return (
        <Helmet htmlAttributes={{ lang: i18n.language }}>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={metaUrl} />

            {/* Hreflang Tags for SEO Internationalization */}
            <link rel="alternate" hreflang="x-default" href={urlEs} />
            <link rel="alternate" hreflang="es" href={urlEs} />
            <link rel="alternate" hreflang="en" href={urlEn} />

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
