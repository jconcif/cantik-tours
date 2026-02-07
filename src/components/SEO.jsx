import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords, image, url, schema }) => {
    const { t } = useTranslation();
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
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

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
