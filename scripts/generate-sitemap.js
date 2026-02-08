
import fs from 'node:fs';
import { tours } from '../src/data/tours.js';

const baseUrl = 'https://www.cantiktours.com';

const staticRoutes = [
    { url: '/', priority: 1.0 },
    { url: '/tours', priority: 0.8 },
    { url: '/guia-bali', priority: 0.8 },
    { url: '/nosotros', priority: 0.7 }
];

const tourRoutes = tours.map(tour => ({
    url: `/tour/${tour.id}`,
    priority: 0.9,
    lastmod: new Date().toISOString()
}));

const allRoutes = [...staticRoutes, ...tourRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes.map(route => `
    <url>
        <loc>${baseUrl}${route.url}</loc>
        <lastmod>${route.lastmod || new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route.priority}</priority>
    </url>`).join('')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully at public/sitemap.xml');
