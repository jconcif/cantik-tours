import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * LocalLink automatically prefixes the target 'to' route with the active language.
 * E.g., <LocalLink to="/tours"> with lang 'es' becomes <Link to="/es/tours">.
 */
const LocalLink = ({ to, children, ...props }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'es';
    
    // Ensure we don't double prefix if 'to' already starts with /es/ or /en/
    const isAlreadyPrefixed = /^\/(es|en)(\/|$)/.test(to);
    const finalTo = isAlreadyPrefixed ? to : `/${currentLang}${to.startsWith('/') ? to : `/${to}`}`;

    return (
        <Link to={finalTo} {...props}>
            {children}
        </Link>
    );
};

export default LocalLink;
