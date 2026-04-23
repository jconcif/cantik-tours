import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", currency: import.meta.env.VITE_PAYPAL_CURRENCY || "EUR" }}>
                    <App />
                </PayPalScriptProvider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
)
