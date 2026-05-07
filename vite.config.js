import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Split vendor libraries into separate chunks for better caching
                    if (id.includes('node_modules')) {
                        // Separate large libraries into their own chunks
                        if (id.includes('framer-motion')) {
                            return 'framer-motion';
                        }
                        if (id.includes('react-router-dom')) {
                            return 'react-router';
                        }
                        if (id.includes('i18next') || id.includes('react-i18next')) {
                            return 'i18n';
                        }
                        // Everything else goes to vendor
                        return 'vendor';
                    }
                }
            }
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
        // Enable minification and compression
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.logs in production
                drop_debugger: true
            }
        },
        // Optimize CSS
        cssCodeSplit: true,
        // Source maps for production debugging (optional, can be disabled for smaller builds)
        sourcemap: false
    }
})
