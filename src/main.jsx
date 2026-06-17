import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

console.log("%c🚀 Cantik Tours Web Version:", "color: #11BDDB; font-weight: bold; font-size: 14px;", __BUILD_DATE__);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((reg) => {
            console.log('SW Registered successfully:', reg.scope);
        }).catch((err) => {
            console.error('SW Registration failed:', err);
        });
    });
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
